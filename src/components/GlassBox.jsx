import { useEffect, useRef } from 'react'
import '../componentsStyle/glassBox.css'

const vertexShaderSource = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`

const fragmentShaderSource = `
  precision mediump float;
  uniform float u_time;
  uniform float u_refraction;
  uniform float u_distortion;
  uniform float u_fresnel;
  uniform float u_dispersion;
  uniform float u_speed;
  uniform float u_wave_strength;
  varying vec2 v_uv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
  }

  void main() {
    vec2 centered = v_uv - 0.5;
    float edgeDistance = max(abs(centered.x), abs(centered.y)) * 2.0;
    float edge = smoothstep(0.42, 1.0, edgeDistance);
    float animatedTime = u_time * u_speed;
    vec2 distortion = vec2(
      noise(v_uv * 4.0 + animatedTime * 0.16),
      noise(v_uv * 4.0 - animatedTime * 0.13)
    ) - 0.5;
    vec2 uv = v_uv + centered * edge * u_refraction * 0.08;
    uv += distortion * edge * u_distortion * 0.035;
    float wave = noise(uv * 5.0 + vec2(animatedTime * 0.22, -animatedTime * 0.14));
    wave += noise(uv * 11.0 - vec2(animatedTime * 0.1, animatedTime * 0.17)) * 0.45;
    wave *= u_wave_strength;
    float sideFade = smoothstep(0.0, 0.28, uv.x) * smoothstep(1.0, 0.72, uv.x);
    float rim = smoothstep(0.5, 1.0, edgeDistance) * u_refraction;
    float glow = smoothstep(0.82, 0.18, distance(uv, vec2(0.22, 0.12)));
    float fresnel = pow(edgeDistance, 3.0) * u_fresnel;
    float red = noise((uv + vec2(u_dispersion * 0.018, 0.0)) * 7.0);
    float blue = noise((uv - vec2(u_dispersion * 0.018, 0.0)) * 7.0);
    vec3 spectral = vec3(red, wave, blue) * u_dispersion * 0.12;
    vec3 tint = mix(vec3(0.85, 0.96, 1.0), vec3(1.0), wave * 0.35 + glow * 0.22);
    float alpha = 0.08 + wave * 0.045 + glow * 0.05 + rim * 0.18 + fresnel * 0.16;
    gl_FragColor = vec4(tint + spectral + vec3(fresnel * 0.12), (alpha + fresnel * 0.08) * sideFade);
  }
`

const GLASS_DEFAULTS = {
  curvature: 10,
  opacity: 0,
  blur: 0,
}

function addToDefault(value, defaultValue, unit = '') {
  const adjustment = Number.parseFloat(value)
  return `${defaultValue + (Number.isNaN(adjustment) ? 0 : adjustment)}${unit}`
}

function createShader(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    return null
  }
  return shader
}

function createProgram(gl) {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)
  if (!vertexShader || !fragmentShader) return null
  const program = gl.createProgram()
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null
  return program
}

// 유리처럼 투명하게 비치는 아이콘과 두 줄의 라벨을 담는 카드입니다.
export default function GlassBox({
  iconSrc = '/assets/glass-box-icon.png',
  lines = ['product', 'DESIGNER'],
  items = null,
  width = '100%',
  curvature = 0,
  opacity = 0,
  blur = 0,
  edgeRefraction = 0,
  distortion = 0,
  fresnel = 0,
  dispersion = 0,
  animationSpeed = 1,
  waveStrength = 1,
  flexDirection = 'row',
  className = '',
}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const gl = canvas?.getContext('webgl', { alpha: true, antialias: true })
    if (!gl) return undefined

    const program = createProgram(gl)
    if (!program) return undefined

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    gl.useProgram(program)
    const position = gl.getAttribLocation(program, 'a_position')
    const time = gl.getUniformLocation(program, 'u_time')
    const refraction = gl.getUniformLocation(program, 'u_refraction')
    const distortionUniform = gl.getUniformLocation(program, 'u_distortion')
    const fresnelUniform = gl.getUniformLocation(program, 'u_fresnel')
    const dispersionUniform = gl.getUniformLocation(program, 'u_dispersion')
    const speedUniform = gl.getUniformLocation(program, 'u_speed')
    const waveStrengthUniform = gl.getUniformLocation(program, 'u_wave_strength')
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

    let frameId
    const render = (now) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const width = canvas.clientWidth * dpr
      const height = canvas.clientHeight * dpr
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
        gl.viewport(0, 0, width, height)
      }
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.uniform1f(time, now * 0.001)
      gl.uniform1f(refraction, Number(edgeRefraction) || 0)
      gl.uniform1f(distortionUniform, Number(distortion) || 0)
      gl.uniform1f(fresnelUniform, Number(fresnel) || 0)
      gl.uniform1f(dispersionUniform, Number(dispersion) || 0)
      gl.uniform1f(speedUniform, Number(animationSpeed) || 0)
      gl.uniform1f(waveStrengthUniform, Number(waveStrength) || 0)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      frameId = requestAnimationFrame(render)
    }
    frameId = requestAnimationFrame(render)

    return () => cancelAnimationFrame(frameId)
  }, [edgeRefraction, distortion, fresnel, dispersion, animationSpeed, waveStrength])

  return (
    <div
      className={`glass-box ${className}`.trim()}
      style={{
        width,
        flexDirection,
        // property 값은 기본 유리 효과에 더해지는 보정값으로 적용합니다.
        '--glass-box-curvature': addToDefault(curvature, GLASS_DEFAULTS.curvature, 'px'),
        '--glass-box-opacity': Math.min(Math.max(GLASS_DEFAULTS.opacity + Number(opacity || 0), 0), 1),
        '--glass-box-blur': addToDefault(blur, GLASS_DEFAULTS.blur, 'px'),
      }}
      data-node-id="396:4253"
    >
      <canvas className="glass-box__liquid" ref={canvasRef} aria-hidden="true" />
      {Array.isArray(items) && items.length > 0 ? (
        <div className="glass-box__items">
          {items.map((item, index) => (
            <div className="glass-box__item" key={`${item.text || 'item'}-${index}`}>
              <div className="glass-box__item-icon" aria-hidden="true">
                <img src={item.iconSrc} alt="" />
              </div>
              <span className="glass-box__item-text">{item.text}</span>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="glass-box__icon" aria-hidden="true">
            <img src={iconSrc} alt="" />
          </div>
          <div className="glass-box__label">
            {lines.map((line, index) => (
              <span key={`${line}-${index}`}>{line}</span>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
