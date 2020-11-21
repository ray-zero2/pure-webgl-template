import WebGLUtils from './modules/webgl/WebGLUtils';
import vertexShaderSource from './modules/webgl/shaders/vertex.vert';
import fragmentShaderSource from './modules/webgl/shaders/fragment.frag';

class Index {
  constructor() {
    this.webGLUtils = new WebGLUtils('.canvas');
    this.canvas = this.webGLUtils.canvas;
    this.gl = this.webGLUtils.gl;
    this.program = null;

    this.time = 0;

    this.positions = [];
    this.vbo = [];
    this.attLocation = [];
    this.attStride = [];
    this.uniLocation = [];
    this.uniType = [];

    this.init();
  }

  createProgram() {
    const utils = this.webGLUtils;
    const vertexShader = utils.createShader(vertexShaderSource, 'vertex');
    const fragmentShader = utils.createShader(fragmentShaderSource, 'fragment');
    const program = utils.createProgram(vertexShader, fragmentShader);
    return program;
  }

  setAttributes() {
    const gl = this.gl;
    const utils = this.webGLUtils;
    this.positions.push(
      [0.0, 0.0, 0.0],
      [-0.5, 0.5, 0.0],
      [0.5, 0.5, 0.0],
      [-0.5, -0.5, 0.0],
      [0.5, -0.5, 0.0]
    );
    this.vbo = [utils.createVbo(new Float32Array(this.positions.flat()))];
    this.attLocation = [gl.getAttribLocation(this.program, 'position')];
    this.attStride = [this.positions[0].length];
  }

  setUniforms() {
    const gl = this.gl;
    this.uniLocation = [gl.getUniformLocation(this.program, 'time')];
    this.uniType = ['uniform1f'];
  }

  setData() {
    this.setAttributes();
    this.setUniforms();
  }

  setCanvasSize() {
    const gl = this.gl;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    gl.viewport(0, 0, this.canvas.width, this.canvas.height);
  }

  setup() {
    const gl = this.gl;
    gl.clearColor(0.1, 0.1, 0.1, 1.0);
    this.setCanvasSize();

    this.program = this.createProgram();
    if (!this.program) throw new Error('program object is not found');
    this.setData();
  }

  resize() {
    this.setCanvasSize();
  }

  bind() {
    window.addEventListener('resize', this.resize.bind(this));
  }

  render() {
    const gl = this.gl;
    const utils = this.webGLUtils;
    const deltaTime = utils.getDeltaTime();
    this.time += deltaTime;

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(this.program);
    utils.setAttribute(this.vbo, this.attLocation, this.attStride);
    utils.setUniform([this.time], this.uniLocation, this.uniType);
    gl.drawArrays(gl.POINTS, 0, this.positions.length);
  }

  animate() {
    this.render();
    requestAnimationFrame(this.animate.bind(this));
  }

  init() {
    this.setup();
    this.bind();
    this.animate();
  }
}

new Index();
