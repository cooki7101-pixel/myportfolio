import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { memo, useRef, useId, useState, useEffect, useCallback, useMemo } from 'react';

/**
 * LiquidGlass component creates a liquid glassmorphism effect using SVG filters and canvas displacement maps.
 *
 * This component generates a glass-like surface that shows content beneath it with a liquid distortion effect.
 * It uses:
 * - Canvas to generate displacement maps dynamically
 * - SVG filters with feDisplacementMap for distortion
 * - CSS backdrop-filter for blur, contrast, brightness, and saturation
 * - ResizeObserver to automatically adjust to container size changes
 *
 * The effect creates a morphing, liquid-like appearance that simulates glass with liquid beneath it,
 * similar to Apple's Liquid Glass design system.
 *
 * @param borderRadius - Border radius in pixels (default: 20)
 * @param blur - Blur amount in pixels (default: 0.25)
 * @param contrast - Contrast multiplier (default: 1.2)
 * @param brightness - Brightness multiplier (default: 1.05)
 * @param saturation - Saturation multiplier (default: 1.1)
 * @param shadowIntensity - Shadow opacity (default: 0.25)
 * @param swirlIntensity - Swirl intensity for vortex effect (default: 8)
 * @param swirlScale - Swirl scale controls size/zoom (default: 1.0)
 * @param swirlRadius - Swirl radius controls extent from center/edges (default: 1.0)
 * @param edgeThicknessPx - Thickness in pixels of edge band where swirl is applied (default: 12)
 * @param swirlOffset - Swirl offset controls gap from edges: 0.0=no gap (edges), 1.0=max gap (center) (default: 0.0)
 * @param swirlEdges - Which corner/edge region should have swirl effect (default: 'all')
     * @param zIndex - Z-index for layering (default: 9999)
     * @param textShadow - Text shadow for text inside (default: false, or custom CSS value)
     * @param textColor - Text color for text inside (default: undefined, inherits from parent if not specified)
 * @param tintColor - Tint color for the glass overlay (default: undefined, any valid CSS color)
 * @param shiningBorder - Enable shining glass effect on borders (default: false)
 * @param shiningIntensity - Intensity of shining effect 0.0-1.0 (default: 0.8)
 * @param elasticity - Elasticity factor for mouse interaction (default: 0.15)
 * @param globalMousePos - External global mouse position (default: undefined)
 * @param mouseOffset - External mouse offset relative to center (default: undefined)
 * @param mouseContainer - Container ref for mouse tracking (default: undefined)
 * @param elasticityActivationZone - Activation zone in pixels from edges (default: 200)
 * @param enablePressState - Enable press state tracking for tactile feedback (default: false)
 * @param enableScrollAdaptation - Enable scroll-based adaptive properties (default: false)
 * @param scrollContainer - Scroll container selector or ref for scroll-based adaptation (default: undefined)
 * @param enableInnerGlow - Enable interactive inner glow effect at touch/mouse point (default: false)
 * @param enableMorphicTransitions - Enable morphic transitions (expand/collapse) (default: false)
 * @param isExpanded - Expanded state for morphic transitions (default: false)
 * @param expandedWidth - Expanded width in pixels (default: 400)
 * @param expandedHeight - Expanded height in pixels (default: 320)
 * @param collapsedWidth - Collapsed width in pixels (default: undefined, uses container width)
 * @param collapsedHeight - Collapsed height in pixels (default: undefined, uses container height)
 * @param onPressStateChange - Callback fired when press state changes (default: undefined)
 * @param onClick - Callback fired when component is clicked (default: undefined)
 * @param className - Additional CSS classes
 * @param style - Additional inline styles
 * @param children - Content to render inside the glass container
 *
 * @example
 * ```tsx
 * <LiquidGlass borderRadius={20} blur={10} className="p-6">
 *   <div>Your content here</div>
 * </LiquidGlass>
 * ```
 */
const LiquidGlass = ({ borderRadius = 20, blur = 0.25, contrast = 1.2, brightness = 1.05, saturation = 1.1, shadowIntensity = 0.25, swirlIntensity = 8, swirlScale = 1.0, swirlRadius = 1.0, edgeThicknessPx = 12, swirlOffset = 0.0, swirlEdges = 'all', zIndex = 9999, textShadow = false, textColor, tintColor, shiningBorder = false, shiningIntensity = 0.8, elasticity = 0.15, globalMousePos: externalGlobalMousePos, mouseOffset: _externalMouseOffset, mouseContainer = null, elasticityActivationZone = 200, enablePressState = false, enableScrollAdaptation = false, scrollContainer, enableInnerGlow = false, enableMorphicTransitions = false, isExpanded: externalIsExpanded = false, expandedWidth = 400, expandedHeight = 320, collapsedWidth, collapsedHeight, onPressStateChange, onClick, className = '', style = {}, children, }) => {
    const containerRef = useRef(null);
    const svgRef = useRef(null);
    const canvasRef = useRef(null);
    const feImageRef = useRef(null);
    const feDisplacementMapRef = useRef(null);
    const reactId = useId();
    const id = `liquid-glass-${reactId.replace(/:/g, '-')}`;
    const [width, setWidth] = useState(300);
    const [height, setHeight] = useState(200);
    const [canvasDPI, setCanvasDPI] = useState(1);
    const lastSizeRef = useRef({ width: 300, height: 200 });
    // Elasticity state
    const [internalGlobalMousePos, setInternalGlobalMousePos] = useState(null);
    const rafIdRef = useRef(null);
    // Press state tracking
    const [isPressed, setIsPressed] = useState(false);
    const [touchPoint, setTouchPoint] = useState({ x: 0, y: 0 });
    // Initialize touch point to center when component mounts
    useEffect(() => {
        if (enableInnerGlow && containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            setTouchPoint({ x: rect.width / 2, y: rect.height / 2 });
        }
    }, [enableInnerGlow]);
    // Scroll-based adaptation state
    const [scrollY, setScrollY] = useState(0);
    // Internal expanded state (if not controlled externally)
    const [internalIsExpanded, setInternalIsExpanded] = useState(false);
    const isExpanded = enableMorphicTransitions
        ? (externalIsExpanded !== undefined ? externalIsExpanded : internalIsExpanded)
        : false;
    // Use external mouse position if provided, otherwise use internal
    const globalMousePos = externalGlobalMousePos || internalGlobalMousePos;
    /**
     * Smooth step interpolation function for easing
     * @param a - Lower bound
     * @param b - Upper bound
     * @param t - Interpolation value (0-1)
     * @returns Interpolated value between a and b
     */
    const smoothStep = (a, b, t) => {
        t = Math.max(0, Math.min(1, (t - a) / (b - a)));
        return t * t * (3 - 2 * t);
    };
    /**
     * Internal mouse tracking handler
     * Calculates mouse position relative to component center
     */
    const handleMouseMove = useCallback((e) => {
        if (rafIdRef.current !== null)
            return; // Throttle with requestAnimationFrame
        rafIdRef.current = requestAnimationFrame(() => {
            rafIdRef.current = null;
            const container = mouseContainer?.current || containerRef.current;
            if (!container) {
                return;
            }
            setInternalGlobalMousePos({
                x: e.clientX,
                y: e.clientY,
            });
        });
    }, [mouseContainer]);
    /**
     * Helper function to calculate fade-in factor and component bounds
     * Returns fade-in factor (0-1) and component bounds
     * @returns Object with fadeInFactor and component bounds, or null if invalid
     */
    const getComponentBounds = useCallback(() => {
        if (!globalMousePos || !containerRef.current) {
            return null;
        }
        const rect = containerRef.current.getBoundingClientRect();
        const componentCenterX = rect.left + rect.width / 2;
        const componentCenterY = rect.top + rect.height / 2;
        const componentWidth = width;
        const componentHeight = height;
        // Calculate distance from mouse to component edges (not center)
        const edgeDistanceX = Math.max(0, Math.abs(globalMousePos.x - componentCenterX) - componentWidth / 2);
        const edgeDistanceY = Math.max(0, Math.abs(globalMousePos.y - componentCenterY) - componentHeight / 2);
        const edgeDistance = Math.sqrt(edgeDistanceX * edgeDistanceX + edgeDistanceY * edgeDistanceY);
        // If outside activation zone, no effect
        if (edgeDistance > elasticityActivationZone) {
            return null;
        }
        // Calculate fade-in factor (1 at edge, 0 at activation zone boundary)
        const fadeInFactor = 1 - edgeDistance / elasticityActivationZone;
        return { fadeInFactor, centerX: componentCenterX, centerY: componentCenterY };
    }, [globalMousePos, width, height, elasticityActivationZone]);
    /**
     * Calculate directional scaling based on mouse position
     * Creates elastic stretching effect that responds to mouse movement
     * @returns CSS transform scale string
     */
    const calculateDirectionalScale = useCallback(() => {
        const bounds = getComponentBounds();
        if (!bounds) {
            return 'scale(1)';
        }
        const deltaX = globalMousePos.x - bounds.centerX;
        const deltaY = globalMousePos.y - bounds.centerY;
        // Normalize the deltas for direction
        const centerDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        if (centerDistance === 0) {
            return 'scale(1)';
        }
        const normalizedX = deltaX / centerDistance;
        const normalizedY = deltaY / centerDistance;
        // Calculate stretch factors with fade-in
        const stretchIntensity = Math.min(centerDistance / 300, 1) * elasticity * bounds.fadeInFactor;
        // X-axis scaling: stretch horizontally when moving left/right, compress when moving up/down
        const scaleX = 1 + Math.abs(normalizedX) * stretchIntensity * 0.3 - Math.abs(normalizedY) * stretchIntensity * 0.15;
        // Y-axis scaling: stretch vertically when moving up/down, compress when moving left/right
        const scaleY = 1 + Math.abs(normalizedY) * stretchIntensity * 0.3 - Math.abs(normalizedX) * stretchIntensity * 0.15;
        return `scaleX(${Math.max(0.8, Math.min(1.2, scaleX))}) scaleY(${Math.max(0.8, Math.min(1.2, scaleY))})`;
    }, [globalMousePos, elasticity, getComponentBounds]);
    /**
     * Calculate elastic translation based on mouse position
     * Creates subtle movement toward the mouse cursor
     * @returns Translation offset in pixels
     */
    const calculateElasticTranslation = useCallback(() => {
        const bounds = getComponentBounds();
        if (!bounds) {
            return { x: 0, y: 0 };
        }
        return {
            x: (globalMousePos.x - bounds.centerX) * elasticity * 0.1 * bounds.fadeInFactor,
            y: (globalMousePos.y - bounds.centerY) * elasticity * 0.1 * bounds.fadeInFactor,
        };
    }, [globalMousePos, elasticity, getComponentBounds]);
    /**
     * Handle interaction point tracking
     * Updates touch point coordinates relative to component
     * @param e - Mouse or touch event
     */
    const handleInteraction = useCallback((e) => {
        if (!containerRef.current)
            return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX || e.clientX) - rect.left;
        const y = (e.clientY || e.clientY) - rect.top;
        setTouchPoint({ x, y });
    }, []);
    /**
     * Handle press start
     * Sets pressed state and tracks interaction point
     * @param e - Mouse event
     */
    const handlePress = useCallback((e) => {
        if (!enablePressState)
            return;
        setIsPressed(true);
        handleInteraction(e);
        onPressStateChange?.(true);
    }, [enablePressState, handleInteraction, onPressStateChange]);
    /**
     * Handle press release
     * Resets pressed state
     */
    const handleRelease = useCallback(() => {
        if (!enablePressState)
            return;
        setIsPressed(false);
        onPressStateChange?.(false);
    }, [enablePressState, onPressStateChange]);
    /**
     * Handle click for morphic transitions
     * Toggles expanded state if morphic transitions are enabled
     * @param e - Mouse event
     */
    const handleClick = useCallback((e) => {
        if (enableMorphicTransitions && externalIsExpanded === undefined) {
            setInternalIsExpanded(prev => !prev);
        }
        onClick?.(e);
    }, [enableMorphicTransitions, externalIsExpanded, onClick]);
    /**
     * Update the shader displacement map based on current dimensions and parameters
     * Generates a canvas-based displacement map that creates the liquid distortion effect
     */
    const updateShader = useCallback(() => {
        const canvas = canvasRef.current;
        const feImage = feImageRef.current;
        const feDisplacementMap = feDisplacementMapRef.current;
        if (!canvas || !feImage || !feDisplacementMap)
            return;
        const context = canvas.getContext('2d');
        if (!context)
            return;
        // [패치] 컨테이너 크기가 순간적으로 비정상적으로 커지면(검사모드 기기 전환/줌 등)
        // 배열 할당이 실패해(RangeError) 화면 전체가 비는 문제가 있어서, 총 픽셀 수에 상한을 둡니다.
        // 변위 맵은 feImage가 늘려서 쓰기 때문에 해상도가 조금 낮아져도 모양은 같습니다.
        let w = Math.max(1, Math.floor(width * canvasDPI));
        let h = Math.max(1, Math.floor(height * canvasDPI));
        if (!Number.isFinite(w) || !Number.isFinite(h)) return;
        const MAX_PIXELS = 1000000;
        if (w * h > MAX_PIXELS) {
            const k = Math.sqrt(MAX_PIXELS / (w * h));
            w = Math.max(1, Math.floor(w * k));
            h = Math.max(1, Math.floor(h * k));
        }
        // Ensure we have valid dimensions
        if (w <= 0 || h <= 0)
            return;
        // Update canvas size if needed
        if (canvas.width !== w || canvas.height !== h) {
            canvas.width = w;
            canvas.height = h;
        }
        const data = new Uint8ClampedArray(w * h * 4);
        // Preallocate typed array for better performance
        const totalPixels = w * h;
        const rawValues = new Float32Array(totalPixels * 2);
        // Hoist invariant calculations outside the loop for better performance
        const containerW = w;
        const containerH = h;
        const halfW = containerW / 2;
        const halfH = containerH / 2;
        const maxRadius = Math.sqrt(0.5 * 0.5 + 0.5 * 0.5); // Max distance from center
        const minDimension = Math.min(w, h);
        // Make threshold adaptive to component size for small components
        // CRITICAL: Threshold must never exceed the maximum possible distance from any edge
        // Maximum distance from an edge is half the smallest dimension (minDimension / 2)
        const maxPossibleDistance = minDimension / 2;
        // Calculate adaptive threshold based on component size
        // For very small components (< 60px), use larger percentage to ensure visibility
        // For small components (60-100px), use moderate percentage
        // For larger components, use the configured edgeThicknessPx
        let adaptiveThreshold;
        if (minDimension < 60) {
            // For very small components (floating buttons), use 80% of smallest dimension
            // But cap at maxPossibleDistance to ensure it works
            adaptiveThreshold = Math.min(minDimension * 0.8, maxPossibleDistance);
        }
        else if (minDimension < 100) {
            // For small components (buttons), use 60% of smallest dimension
            adaptiveThreshold = Math.min(minDimension * 0.6, maxPossibleDistance);
        }
        else {
            // For larger components, use configured value
            adaptiveThreshold = Math.min(edgeThicknessPx * canvasDPI, minDimension * 0.4, maxPossibleDistance);
        }
        // Ensure threshold is at least 1 pixel but never exceeds max possible distance
        const threshold = Math.max(Math.min(adaptiveThreshold, maxPossibleDistance), 1);
        // Calculate base displacement factor, ensuring minimum for small components
        // This ensures swirl effect is visible on buttons and small components
        const baseDisplacementFactor = Math.max((minDimension / 100.0) * 0.05, 0.01);
        const displacementFactor = baseDisplacementFactor * (swirlIntensity / 10.0);
        const swirlScaleClamped = Math.max(swirlScale, 0.1);
        const swirlRadiusClamped = Math.max(swirlRadius, 0.1);
        const swirlIntensityFactor = swirlIntensity / 10;
        const twoPi = Math.PI * 2;
        // Precompute swirl region checks if needed
        const isSwirlEdgesArray = Array.isArray(swirlEdges);
        const isSwirlEdgesAll = swirlEdges === 'all';
        let maxScale = 0;
        // Generate displacement map data with swirly vortex effect
        // Use nested loops for better cache locality
        for (let y = 0; y < h; y++) {
            const pxY = y + 0.5;
            const uvY = y / h;
            const iy = uvY - 0.5;
            const isTopHalf = pxY < halfH;
            const isBottomHalf = pxY >= halfH;
            for (let x = 0; x < w; x++) {
                const pxX = x + 0.5;
                const uvX = x / w;
                const uv = { x: uvX, y: uvY };
                const ix = uvX - 0.5;
                // Distance from container edges (straight edges) - not rounded boundary
                // This ensures swirl effect stays at edges regardless of border radius
                const distFromLeft = pxX;
                const distFromRight = containerW - pxX;
                const distFromTop = pxY;
                const distFromBottom = containerH - pxY;
                // Calculate maximum distance from edges to center for offset calculation
                const maxDistanceToCenter = Math.min(halfW, halfH);
                // Calculate offset distance: gap between component edges and swirl effect band
                // swirlOffset = 0.0 means no gap (swirl at edges)
                // swirlOffset > 0.0 creates a gap (swirl moves inward from edges)
                const offsetDistance = swirlOffset * maxDistanceToCenter;
                // Calculate adjusted distance for each edge separately
                // This ensures swirl effect applies to ALL edges, not just the closest one
                const adjustedDistFromLeft = distFromLeft - offsetDistance;
                const adjustedDistFromRight = distFromRight - offsetDistance;
                const adjustedDistFromTop = distFromTop - offsetDistance;
                const adjustedDistFromBottom = distFromBottom - offsetDistance;
                // Calculate influence from each edge separately
                // This ensures all edges get the swirl effect, especially important for small components
                // For very small components, ensure we can still see the effect even at the edges
                // Use a minimum threshold of at least 2 pixels to ensure visibility
                const minThreshold = Math.max(threshold, 2);
                const influenceFromLeft = (adjustedDistFromLeft >= 0)
                    ? smoothStep(minThreshold, 0, adjustedDistFromLeft) : 0;
                const influenceFromRight = (adjustedDistFromRight >= 0)
                    ? smoothStep(minThreshold, 0, adjustedDistFromRight) : 0;
                const influenceFromTop = (adjustedDistFromTop >= 0)
                    ? smoothStep(minThreshold, 0, adjustedDistFromTop) : 0;
                const influenceFromBottom = (adjustedDistFromBottom >= 0)
                    ? smoothStep(minThreshold, 0, adjustedDistFromBottom) : 0;
                // Use maximum influence from any edge
                // This ensures the swirl effect is visible on all edges
                const maxEdgeInfluence = Math.max(influenceFromLeft, influenceFromRight, influenceFromTop, influenceFromBottom);
                // Determine which corner/edge region this pixel is in
                const isLeftHalf = pxX < halfW;
                const isRightHalf = pxX >= halfW;
                // Check if this pixel is in the selected swirl region(s)
                let isInSwirlRegion = true;
                if (!isSwirlEdgesAll) {
                    if (isSwirlEdgesArray) {
                        // Multi-select: check if pixel matches any of the selected regions
                        isInSwirlRegion = swirlEdges.some(edge => {
                            if (edge === 'top-left')
                                return isLeftHalf && isTopHalf;
                            if (edge === 'top-right')
                                return isRightHalf && isTopHalf;
                            if (edge === 'bottom-right')
                                return isRightHalf && isBottomHalf;
                            if (edge === 'bottom-left')
                                return isLeftHalf && isBottomHalf;
                            return false;
                        });
                    }
                    else {
                        // Single select
                        if (swirlEdges === 'top-left') {
                            isInSwirlRegion = isLeftHalf && isTopHalf;
                        }
                        else if (swirlEdges === 'top-right') {
                            isInSwirlRegion = isRightHalf && isTopHalf;
                        }
                        else if (swirlEdges === 'bottom-right') {
                            isInSwirlRegion = isRightHalf && isBottomHalf;
                        }
                        else if (swirlEdges === 'bottom-left') {
                            isInSwirlRegion = isLeftHalf && isBottomHalf;
                        }
                    }
                }
                // Apply swirl effect based on edge influence
                // Use maximum influence from any edge to ensure all edges get the swirl effect
                // This is especially important for small components where all edges should be visible
                const borderInfluence = isInSwirlRegion ? maxEdgeInfluence : 0.0;
                // Convert to polar coordinates for vortex effect
                const angle = Math.atan2(iy, ix);
                const radius = Math.sqrt(ix * ix + iy * iy);
                const normalizedRadius = Math.min(radius / maxRadius, 1.0);
                // Apply swirl scale and radius
                const scaledRadius = normalizedRadius / swirlScaleClamped;
                const effectiveRadius = normalizedRadius * swirlRadiusClamped;
                // Create vortex effect
                const swirlStrength = borderInfluence * scaledRadius * effectiveRadius * swirlIntensityFactor;
                // Calculate final angle with vortex rotation
                const finalAngle = angle + swirlStrength * twoPi;
                // Slight radius variation for more organic feel
                const radiusVariation = 1.0 + swirlStrength * 0.1 * Math.sin(angle * 3);
                const newRadius = radius * radiusVariation;
                // Convert back to Cartesian with vortex distortion
                const swirlX = Math.cos(finalAngle) * newRadius;
                const swirlY = Math.sin(finalAngle) * newRadius;
                const pos = {
                    x: (swirlX * displacementFactor * borderInfluence + ix * (1 - displacementFactor * borderInfluence * 0.3)) + 0.5,
                    y: (swirlY * displacementFactor * borderInfluence + iy * (1 - displacementFactor * borderInfluence * 0.3)) + 0.5,
                };
                const dx = (pos.x - uv.x) * w;
                const dy = (pos.y - uv.y) * h;
                const absDx = Math.abs(dx);
                const absDy = Math.abs(dy);
                maxScale = Math.max(maxScale, absDx, absDy);
                // Store in preallocated array
                const pixelIndex = y * w + x;
                rawValues[pixelIndex * 2] = dx;
                rawValues[pixelIndex * 2 + 1] = dy;
            }
        }
        // Calculate optimal scale automatically based on displacement values
        // Ensure minimum scale for visible effect while maximizing the output
        maxScale = Math.max(maxScale * 0.5, 1.0);
        // Convert displacement values to RGB channels
        // Normalize to [-0.5, 0.5] range, then shift to [0, 1] for RGB
        const maxScaleInv = maxScale > 0 ? 1.0 / maxScale : 0;
        for (let i = 0; i < data.length; i += 4) {
            const pixelIndex = i / 4;
            const arrayIndex = pixelIndex * 2;
            // Normalize displacement values
            const normalizedDx = rawValues[arrayIndex] * maxScaleInv;
            const normalizedDy = rawValues[arrayIndex + 1] * maxScaleInv;
            // Convert to [0, 1] range for RGB channels
            const r = Math.max(0, Math.min(1, normalizedDx * 0.5 + 0.5));
            const g = Math.max(0, Math.min(1, normalizedDy * 0.5 + 0.5));
            data[i] = r * 255;
            data[i + 1] = g * 255;
            data[i + 2] = 0;
            data[i + 3] = 255;
        }
        // Ensure data length is correct for ImageData
        const expectedLength = w * h * 4;
        if (data.length !== expectedLength) {
            return;
        }
        context.putImageData(new ImageData(data, w, h), 0, 0);
        feImage.setAttributeNS('http://www.w3.org/1999/xlink', 'href', canvas.toDataURL());
        // Set the SVG filter scale to use the displacement range
        // The scale attribute determines how much the displacement map affects the image
        const filterScale = Math.max(maxScale / canvasDPI, 1.0);
        const currentScale = feDisplacementMap.getAttribute('scale');
        // Only update if scale actually changed
        if (currentScale !== filterScale.toString()) {
            feDisplacementMap.setAttribute('scale', filterScale.toString());
        }
    }, [
        width,
        height,
        canvasDPI,
        borderRadius,
        swirlIntensity,
        swirlScale,
        swirlRadius,
        edgeThicknessPx,
        swirlOffset,
        swirlEdges,
        smoothStep,
    ]);
    // ResizeObserver to track container size changes with throttling
    useEffect(() => {
        const container = containerRef.current;
        if (!container)
            return;
        let rafId = null;
        const MIN_SIZE_CHANGE = 2; // Only update if size changed by at least 2px
        const resizeObserver = new ResizeObserver((entries) => {
            if (rafId !== null)
                return; // Throttle with requestAnimationFrame
            rafId = requestAnimationFrame(() => {
                rafId = null;
                for (const entry of entries) {
                    const { width: newWidth, height: newHeight } = entry.contentRect;
                    const clampedW = Math.max(newWidth, 100);
                    const clampedH = Math.max(newHeight, 100);
                    // Only update if size changed meaningfully
                    const lastSize = lastSizeRef.current;
                    if (Math.abs(clampedW - lastSize.width) >= MIN_SIZE_CHANGE ||
                        Math.abs(clampedH - lastSize.height) >= MIN_SIZE_CHANGE) {
                        lastSizeRef.current = { width: clampedW, height: clampedH };
                        setWidth(clampedW);
                        setHeight(clampedH);
                    }
                }
            });
        });
        resizeObserver.observe(container);
        return () => {
            if (rafId !== null) {
                cancelAnimationFrame(rafId);
            }
            resizeObserver.disconnect();
        };
    }, []);
    // Sync device pixel ratio after mount so the first render stays SSR-safe.
    useEffect(() => {
        let resolutionQuery = null;
        const syncCanvasDPI = () => {
            const nextCanvasDPI = Math.max(window.devicePixelRatio || 1, 1);
            setCanvasDPI(currentCanvasDPI => currentCanvasDPI === nextCanvasDPI ? currentCanvasDPI : nextCanvasDPI);
            if (resolutionQuery) {
                resolutionQuery.removeEventListener('change', syncCanvasDPI);
            }
            if (typeof window.matchMedia === 'function') {
                resolutionQuery = window.matchMedia(`(resolution: ${nextCanvasDPI}dppx)`);
                resolutionQuery.addEventListener('change', syncCanvasDPI);
            }
        };
        syncCanvasDPI();
        window.addEventListener('resize', syncCanvasDPI);
        return () => {
            window.removeEventListener('resize', syncCanvasDPI);
            resolutionQuery?.removeEventListener('change', syncCanvasDPI);
        };
    }, []);
    // Update shader when component mounts or parameters change
    useEffect(() => {
        updateShader();
    }, [updateShader]);
    // Set up mouse tracking if no external mouse position is provided
    useEffect(() => {
        if (externalGlobalMousePos) {
            // External mouse tracking is provided, don't set up internal tracking
            return;
        }
        const container = mouseContainer?.current || containerRef.current;
        if (!container) {
            return;
        }
        // Only set up mouse tracking if elasticity is enabled (non-zero)
        if (elasticity === 0) {
            return;
        }
        // Mouse leave handler to reset mouse position
        const handleMouseLeave = () => {
            setInternalGlobalMousePos(null);
        };
        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);
        return () => {
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseleave', handleMouseLeave);
            if (rafIdRef.current !== null) {
                cancelAnimationFrame(rafIdRef.current);
                rafIdRef.current = null;
            }
        };
    }, [handleMouseMove, mouseContainer, externalGlobalMousePos, elasticity]);
    // Set up scroll tracking for adaptive properties
    useEffect(() => {
        if (!enableScrollAdaptation)
            return;
        const handleScroll = (e) => {
            const target = e.target;
            if (target) {
                setScrollY(target.scrollTop || 0);
            }
        };
        let scrollElement = null;
        // Find scroll container
        if (scrollContainer) {
            if (typeof scrollContainer === 'string') {
                scrollElement = document.querySelector(scrollContainer);
            }
            else if (scrollContainer.current) {
                scrollElement = scrollContainer.current;
            }
        }
        else {
            // Try to find scrollable parent
            let parent = containerRef.current?.parentElement;
            while (parent) {
                const style = window.getComputedStyle(parent);
                if (style.overflowY === 'auto' || style.overflowY === 'scroll' ||
                    style.overflow === 'auto' || style.overflow === 'scroll') {
                    scrollElement = parent;
                    break;
                }
                parent = parent.parentElement;
            }
        }
        if (scrollElement) {
            scrollElement.addEventListener('scroll', handleScroll, { passive: true });
            // Initialize scroll position
            setScrollY(scrollElement.scrollTop || 0);
            return () => {
                scrollElement?.removeEventListener('scroll', handleScroll);
            };
        }
    }, [enableScrollAdaptation, scrollContainer]);
    // Calculate adaptive properties based on scroll position
    const adaptiveOpacity = enableScrollAdaptation ? Math.min(1, 0.7 + (scrollY / 500) * 0.3) : undefined;
    const adaptiveSaturation = enableScrollAdaptation ? Math.min(1.5, 1 + (scrollY / 300) * 0.5) : saturation;
    const adaptiveBlur = enableScrollAdaptation ? Math.min(30, 20 + (scrollY / 200) * 10) : blur;
    // Calculate text shadow value for CSS injection
    const textShadowValue = textShadow === false
        ? 'none'
        : typeof textShadow === 'string'
            ? textShadow
            : '0 1px 2px rgba(0, 0, 0, 0.6), 0 2px 4px rgba(0, 0, 0, 0.4)';
    // Clamp shining intensity
    const clampedShiningIntensity = Math.min(shiningIntensity, 1);
    // Calculate transform style for elasticity effect and press state
    const transformStyle = useMemo(() => {
        let transforms = [];
        // Press state scaling
        if (enablePressState && isPressed) {
            transforms.push('scale(0.98)');
        }
        // Elasticity effect
        if (elasticity !== 0 && globalMousePos) {
            const translation = calculateElasticTranslation();
            const scale = calculateDirectionalScale();
            transforms.push(`translate(${translation.x}px, ${translation.y}px) ${scale}`);
        }
        return transforms.length > 0 ? transforms.join(' ') : undefined;
    }, [enablePressState, isPressed, elasticity, globalMousePos, calculateElasticTranslation, calculateDirectionalScale]);
    // Calculate morphic transition dimensions
    const morphicDimensions = enableMorphicTransitions ? {
        width: isExpanded ? expandedWidth : (collapsedWidth || '100%'),
        height: isExpanded ? expandedHeight : (collapsedHeight || '100%'),
    } : undefined;
    return (jsxs(Fragment, { children: [jsx("style", { children: `
					[data-liquid-glass-content="${id}"] *,
					[data-liquid-glass-content="${id}"] button,
					[data-liquid-glass-content="${id}"] input,
					[data-liquid-glass-content="${id}"] textarea,
					[data-liquid-glass-content="${id}"] select,
					[data-liquid-glass-content="${id}"] a,
					[data-liquid-glass-content="${id}"] span,
					[data-liquid-glass-content="${id}"] p,
					[data-liquid-glass-content="${id}"] h1,
					[data-liquid-glass-content="${id}"] h2,
					[data-liquid-glass-content="${id}"] h3,
					[data-liquid-glass-content="${id}"] h4,
					[data-liquid-glass-content="${id}"] h5,
					[data-liquid-glass-content="${id}"] h6,
					[data-liquid-glass-content="${id}"] div,
					[data-liquid-glass-content="${id}"] label {
						${textColor ? `color: ${textColor} !important;` : ''}
						${textShadow !== false ? `text-shadow: ${textShadowValue} !important;` : ''}
					}
				` }), jsx("svg", { ref: svgRef, xmlns: "http://www.w3.org/2000/svg", width: "0", height: "0", style: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    pointerEvents: 'none',
                    zIndex: zIndex - 1,
                }, children: jsx("defs", { children: jsxs("filter", { id: `${id}_filter`, filterUnits: "userSpaceOnUse", colorInterpolationFilters: "sRGB", x: "0%", y: "0%", width: "100%", height: "100%", children: [jsx("feImage", { ref: feImageRef, id: `${id}_map`, x: "0", y: "0", width: width.toString(), height: height.toString(), result: "displacementMap", preserveAspectRatio: "none" }), jsx("feDisplacementMap", { ref: feDisplacementMapRef, in: "SourceGraphic", in2: "displacementMap", xChannelSelector: "R", yChannelSelector: "G" })] }) }) }), jsx("canvas", { ref: canvasRef, width: width * canvasDPI, height: height * canvasDPI, style: {
                    display: 'none',
                } }), jsxs("div", { ref: containerRef, className: className, "data-liquid-glass": "true", onMouseDown: enablePressState ? handlePress : undefined, onMouseUp: enablePressState ? handleRelease : undefined, onMouseLeave: enablePressState ? handleRelease : undefined, onMouseMove: (enablePressState && isPressed) || enableInnerGlow ? handleInteraction : undefined, onClick: enableMorphicTransitions || onClick ? handleClick : undefined, style: {
                    position: 'relative',
                    width: morphicDimensions?.width || '100%',
                    height: morphicDimensions?.height || '100%',
                    overflow: 'hidden',
                    borderRadius: `${borderRadius}px`,
                    zIndex: zIndex,
                    transform: transformStyle,
                    transition: enableMorphicTransitions
                        ? 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
                        : transformStyle
                            ? 'transform 0.2s ease-out'
                            : undefined,
                    cursor: enablePressState || enableMorphicTransitions ? 'pointer' : undefined,
                    ...style,
                }, children: [jsx("div", { style: {
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            pointerEvents: 'none',
                            backgroundColor: enablePressState
                                ? `rgba(255, 255, 255, ${isPressed ? 0.25 : 0.15})`
                                : adaptiveOpacity !== undefined
                                    ? `rgba(255, 255, 255, ${adaptiveOpacity * 0.15})`
                                    : 'rgba(255, 255, 255, 0.02)',
                            backdropFilter: `blur(${adaptiveBlur}px) contrast(${contrast}) brightness(${brightness}) saturate(${adaptiveSaturation})`,
                            WebkitBackdropFilter: `blur(${adaptiveBlur}px) contrast(${contrast}) brightness(${brightness}) saturate(${adaptiveSaturation})`,
                            filter: `url(#${id}_filter)`,
                            borderRadius: `${borderRadius}px`,
                            opacity: adaptiveOpacity !== undefined ? adaptiveOpacity : undefined,
                            transition: enablePressState || enableScrollAdaptation
                                ? 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
                                : undefined,
                        } }), jsx("div", { style: {
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            pointerEvents: 'none',
                            borderRadius: `${borderRadius}px`,
                            boxShadow: `
							0 2px 8px rgba(0, 0, 0, ${shadowIntensity * (enablePressState && isPressed ? 0.6 : 0.4)}), 
							0 4px 16px rgba(0, 0, 0, ${shadowIntensity * (enablePressState && isPressed ? 0.45 : 0.3)}), 
							0 0 0 0.5px rgba(255, 255, 255, 0.08),
							inset 0 1px 2px rgba(255, 255, 255, 0.1),
							inset 0 -1px 2px rgba(0, 0, 0, 0.1)
						`,
                            transform: enablePressState && isPressed ? 'scale(0.95)' : 'scale(1)',
                            transition: enablePressState ? 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' : undefined,
                        } }), enablePressState && (jsx("div", { style: {
                            position: 'absolute',
                            top: '-8px',
                            left: '-8px',
                            right: '-8px',
                            bottom: '-8px',
                            pointerEvents: 'none',
                            borderRadius: `${borderRadius + 8}px`,
                            background: 'radial-gradient(circle, rgba(0,0,0,0.4), transparent 70%)',
                            filter: 'blur(20px)',
                            opacity: isPressed ? 0.6 : 0.3,
                            transform: isPressed ? 'scale(0.95)' : 'scale(1)',
                            transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        } })), jsx("div", { style: {
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '40%',
                            pointerEvents: 'none',
                            zIndex: 1,
                            background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.04), transparent)',
                            borderRadius: `${borderRadius}px ${borderRadius}px 0 0`,
                        } }), tintColor && (jsx("div", { style: {
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            pointerEvents: 'none',
                            zIndex: 1,
                            backgroundColor: tintColor,
                            borderRadius: `${borderRadius}px`,
                        } })), enableInnerGlow && (jsx("div", { style: {
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            pointerEvents: 'none',
                            zIndex: 1,
                            borderRadius: `${borderRadius}px`,
                            background: `radial-gradient(circle at ${touchPoint.x}px ${touchPoint.y}px,
								rgba(255, 255, 255, ${isPressed ? 0.4 : 0}),
								transparent 60%)`,
                            transition: 'background 0.2s ease',
                        } })), shiningBorder && (jsxs(Fragment, { children: [jsx("div", { style: {
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    pointerEvents: 'none',
                                    zIndex: 3,
                                    borderRadius: `${borderRadius}px`,
                                    background: `
									radial-gradient(circle at top left, 
										rgba(255, 255, 255, ${0.6 * clampedShiningIntensity}) 0%, 
										rgba(255, 255, 255, ${0.3 * clampedShiningIntensity}) 30%,
										transparent 70%
									),
									radial-gradient(circle at top right, 
										rgba(255, 255, 255, ${0.6 * clampedShiningIntensity}) 0%, 
										rgba(255, 255, 255, ${0.3 * clampedShiningIntensity}) 30%,
										transparent 70%
									),
									radial-gradient(circle at bottom left, 
										rgba(255, 255, 255, ${0.6 * clampedShiningIntensity}) 0%, 
										rgba(255, 255, 255, ${0.3 * clampedShiningIntensity}) 30%,
										transparent 70%
									),
									radial-gradient(circle at bottom right, 
										rgba(255, 255, 255, ${0.6 * clampedShiningIntensity}) 0%, 
										rgba(255, 255, 255, ${0.3 * clampedShiningIntensity}) 30%,
										transparent 70%
									),
									linear-gradient(to right, 
										transparent 0%, 
										rgba(255, 255, 255, ${0.2 * clampedShiningIntensity}) 50%, 
										transparent 100%
									),
									linear-gradient(to bottom, 
										transparent 0%, 
										rgba(255, 255, 255, ${0.2 * clampedShiningIntensity}) 50%, 
										transparent 100%
									)
								`,
                                    maskImage: `
									linear-gradient(#fff 0 0) content-box, 
									linear-gradient(#fff 0 0)
								`,
                                    maskComposite: 'exclude',
                                    WebkitMask: `
									linear-gradient(#fff 0 0) content-box, 
									linear-gradient(#fff 0 0)
								`,
                                    WebkitMaskComposite: 'xor',
                                    padding: '1px',
                                } }), jsx("div", { style: {
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    pointerEvents: 'none',
                                    zIndex: 3,
                                    borderRadius: `${borderRadius}px`,
                                    boxShadow: `
									inset 0 0 0 1px rgba(255, 255, 255, ${0.3 * clampedShiningIntensity}),
									0 0 ${borderRadius * 0.4}px rgba(255, 255, 255, ${0.25 * clampedShiningIntensity}),
									0 0 ${borderRadius * 0.8}px rgba(255, 255, 255, ${0.15 * clampedShiningIntensity})
								`,
                                } })] })), jsx("div", { "data-liquid-glass-content": id, style: {
                            position: 'relative',
                            width: '100%',
                            height: '100%',
                            zIndex: 2,
                            // Apply text shadow to all text inside (inherited property)
                            textShadow: textShadowValue,
                        }, children: children })] })] }));
};
var LiquidGlass$1 = memo(LiquidGlass);

export { LiquidGlass$1 as LiquidGlass };
//# sourceMappingURL=index.esm.js.map
