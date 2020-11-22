import{a}from"./chunk.LKWNCN5Z.js";var e=`attribute vec3 position;

void main(){
    gl_Position = vec4(position, 1.0);
    gl_PointSize = 16.0;
}
`,o=`precision mediump float;
uniform float time;

void main(){
  // gl_PointCoord
  gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);

}
`;class n{constructor(){this.webGLUtils=new a(".canvas"),this.canvas=this.webGLUtils.canvas,this.gl=this.webGLUtils.gl,this.program=null,this.time=0,this.positions=[],this.vbo=[],this.attLocation=[],this.attStride=[],this.uniLocation=[],this.uniType=[],this.init()}createProgram(){const t=this.webGLUtils,i=t.createShader(e,"vertex"),s=t.createShader(o,"fragment"),r=t.createProgram(i,s);return r}setAttributes(){const t=this.gl,i=this.webGLUtils;this.positions.push([0,0,0],[-.5,.5,0],[.5,.5,0],[-.5,-.5,0],[.5,-.5,0]),this.vbo.push(i.createVbo(new Float32Array(this.positions.flat()))),this.attLocation.push(t.getAttribLocation(this.program,"position")),this.attStride.push(this.positions[0].length)}setUniforms(){const t=this.gl;this.uniLocation=[t.getUniformLocation(this.program,"time")],this.uniType=["uniform1f"]}setData(){this.setAttributes(),this.setUniforms()}setCanvasSize(){const t=this.gl;this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight,t.viewport(0,0,this.canvas.width,this.canvas.height)}setup(){const t=this.gl;if(t.clearColor(.1,.1,.1,1),this.setCanvasSize(),this.program=this.createProgram(),!this.program)throw new Error("program object is not found");this.setData()}resize(){this.setCanvasSize()}bind(){window.addEventListener("resize",this.resize.bind(this))}render(){const t=this.gl,i=this.webGLUtils,s=i.getDeltaTime();this.time+=s,t.clear(t.COLOR_BUFFER_BIT),t.useProgram(this.program),i.setAttribute(this.vbo,this.attLocation,this.attStride),i.setUniform([this.time],this.uniLocation,this.uniType),t.drawArrays(t.POINTS,0,this.positions.length)}animate(){this.render(),requestAnimationFrame(this.animate.bind(this))}init(){this.setup(),this.bind(),this.animate()}}new n;
