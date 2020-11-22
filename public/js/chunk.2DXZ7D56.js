class l {
  constructor(t) {
    (this.canvas = null),
      (this.gl = null),
      (this.clock = { oldTime: 0, isRunning: !1 }),
      this.init(t);
  }
  createShader(t, e) {
    if (!this.gl) throw new Error('webgl not initialized');
    if (e !== 'vertex' && e !== 'fragment')
      throw new Error('invalid shader type');
    const r = this.gl,
      i = e === 'vertex' ? r.VERTEX_SHADER : r.FRAGMENT_SHADER,
      a = r.createShader(i);
    return (
      r.shaderSource(a, t),
      r.compileShader(a),
      r.getShaderParameter(a, r.COMPILE_STATUS)
        ? a
        : (alert(r.getShaderInfoLog(a)), null)
    );
  }
  createProgram(t, e) {
    if (!this.gl) throw new Error('webgl not initialized');
    const r = this.gl,
      i = r.createProgram();
    return (
      r.attachShader(i, t),
      r.attachShader(i, e),
      r.linkProgram(i),
      r.getProgramParameter(i, r.LINK_STATUS)
        ? (r.useProgram(i), i)
        : (alert(r.getProgramInfoLog(i)), null)
    );
  }
  createVbo(t, e) {
    if (!this.gl) throw new Error('webgl not initialized');
    const r = this.gl,
      i = e || r.STATIC_DRAW,
      a = r.createBuffer();
    return (
      r.bindBuffer(r.ARRAY_BUFFER, a),
      r.bufferData(r.ARRAY_BUFFER, t, i),
      r.bindBuffer(r.ARRAY_BUFFER, null),
      a
    );
  }
  createIbo(t) {
    if (!this.gl) throw new Error('webgl not initialized');
    const e = this.gl,
      r = e.createBuffer();
    return (
      e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, r),
      e.bufferData(e.ELEMENT_ARRAY_BUFFER, new Int16Array(t), e.STATIC_DRAW),
      e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, null),
      r
    );
  }
  setAttribute(t, e, r, i) {
    if (!this.gl) throw new Error('webgl not initialized');
    const a = this.gl;
    t.forEach((o, n) => {
      a.bindBuffer(a.ARRAY_BUFFER, o),
        a.enableVertexAttribArray(e[n]),
        a.vertexAttribPointer(e[n], r[n], a.FLOAT, !1, 0, 0);
    }),
      i && a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, i);
  }
  setUniform(t, e, r) {
    if (!this.gl) throw new Error('webgl not initialized');
    const i = this.gl;
    t.forEach((a, o) => {
      const n = r[o];
      n.includes('Matrix') === !0 ? i[n](e[o], !1, a) : i[n](e[o], a);
    });
  }
  getDeltaTime() {
    const t = this.clock;
    if (!t.isRunning)
      return (t.isRunning = !0), (t.oldTime = performance.now()), 0;
    const e = performance.now(),
      r = (e - t.oldTime) / 1e3;
    return (t.oldTime = e), r;
  }
  init(t) {
    if (t instanceof HTMLCanvasElement) this.canvas = t;
    else if (Object.prototype.toString.call(t) === '[object String]') {
      const e = document.querySelector(t);
      e instanceof HTMLCanvasElement && (this.canvas = e);
    }
    if (!this.canvas) throw new Error('invalid argument');
    if (((this.gl = this.canvas.getContext('webgl')), !this.gl))
      throw new Error('webgl not supported');
  }
}
var c = `precision mediump float;
uniform float time;

void main(){
  // gl_PointCoord
  gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);

}
`,
  h = `attribute vec3 position;

void main(){
    gl_Position = vec4(position, 1.0);
    gl_PointSize = 16.0;
}
`;
export { l as a, c as b, h as c };
