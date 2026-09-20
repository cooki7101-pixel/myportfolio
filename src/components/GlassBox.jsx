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
    vec2 uv = v_uv;
    float wave = noise(uv * 5.0 + vec2(u_time * 0.07, -u_time * 0.04));
    wave += noise(uv * 11.0 - vec2(u_time * 0.03, u_time * 0.05)) * 0.45;
    float edge = smoothstep(0.0, 0.28, uv.x) * smoothstep(1.0, 0.72, uv.x);
    float glow = smoothstep(0.82, 0.18, distance(uv, vec2(0.22, 0.12)));
    vec3 tint = mix(vec3(0.85, 0.96, 1.0), vec3(1.0), wave * 0.35 + glow * 0.22);
    float alpha = 0.08 + wave * 0.045 + glow * 0.05;
    gl_FragColor = vec4(tint, alpha * edge);
  }
`

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
  width = '100%',
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
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      frameId = requestAnimationFrame(render)
    }
    frameId = requestAnimationFrame(render)

    return () => cancelAnimationFrame(frameId)
  }, [])

  return (
    <div
      className={`glass-box ${className}`.trim()}
      style={{ width }}
      data-node-id="396:4253"
    >
      <canvas className="glass-box__liquid" ref={canvasRef} aria-hidden="true" />
      <div className="glass-box__icon" aria-hidden="true">
        <img src={iconSrc} alt="" />
      </div>
      <div className="glass-box__label">
        {lines.map((line, index) => (
          <span key={`${line}-${index}`}>{line}</span>
        ))}
      </div>
    </div>
  )
}
