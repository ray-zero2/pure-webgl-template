import{a as v}from"./chunk.LKWNCN5Z.js";var l=`precision highp float;
attribute vec2 circlePoint;
attribute float theta;
varying vec3 vColor;
uniform vec2 resolution;
uniform float time;
const float PI = 3.1415926535;
float random (in vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}
void main () {
    // Use lots of sines and cosines to place the circles
    vec2 circleCenter = vec2(cos(theta), sin(theta))
    * (0.6 + 0.2 * cos(theta * 6.0 + cos(theta * 8.0 + time)));

    // Modulate the circle sizes around the circle and in time
    float rnd = random(circlePoint.xy * theta) ;
    float circleSize = 0.2 + 0.12  * cos(theta * 9.0  - time * 0.5);

    vec2 xy = circleCenter + circlePoint * circleSize;

    // Define some pretty colors
    float th = 8.0 * theta + time * 0.5;
    vColor = 0.6 + 0.2 * vec3(
    cos(th),
    cos(th - PI / 3.0),
    cos(th - PI * 2.0 / 3.0)
    ) + 0.2 * rnd;

    //   gl_Position = vec4(xy / aspectRatio, 0, 1);
    float aspectRatio = resolution.y / resolution.x;
    gl_Position = vec4(xy, 0.0, 1.0);
    // gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
}
`,m=`precision highp float;
varying vec3 vColor;
uniform float alpha;
uniform float time;

void main () {
  gl_FragColor = vec4(vColor, alpha);
}
`;const c=3,n=3e3;class L{constructor(){this.webGLUtils=new v(".canvas"),this.canvas=this.webGLUtils.canvas,this.gl=this.webGLUtils.gl;const{instancing:t}=this.webGLUtils.getWebGLExtensions();this.gl_ext=t,this.program=null,this.time=0,this.uniLocation=[],this.uniType=[],this.init()}createProgram(){const t=this.webGLUtils,e=t.createShader(l,"vertex"),i=t.createShader(m,"fragment"),o=t.createProgram(e,i);return o}setAttributes(){const t=this.gl,e=this.webGLUtils,i=Array.from(Array(c).keys()).map(r=>{var s=Math.PI*2*r/c;return[Math.cos(s),Math.sin(s)]}),o=Array.from(Array(n).keys()).map(r=>r/n*2*Math.PI),h=[e.createVbo(new Float32Array(i.flat())),e.createVbo(new Float32Array(o))],g=[t.getAttribLocation(this.program,"circlePoint"),t.getAttribLocation(this.program,"theta")],f=[i[0].length,1],d=h.length-1;h.forEach((r,s)=>{const a=g[s],u=f[s];t.bindBuffer(t.ARRAY_BUFFER,r),t.enableVertexAttribArray(a),t.vertexAttribPointer(a,u,t.FLOAT,!1,0,0),s===d&&this.gl_ext.vertexAttribDivisorANGLE(a,1)})}setUniforms(){const t=this.gl,e=this.webGLUtils;this.uniLocation=[t.getUniformLocation(this.program,"time"),t.getUniformLocation(this.program,"alpha"),t.getUniformLocation(this.program,"resolution")];const i=["uniform1f","uniform1f","uniform2fv"];e.setUniform([[this.time],[Math.max(0,Math.min(1,.15*2e3/n))],[window.innerWidth,window.innerHeight]],this.uniLocation,i)}setData(){this.setAttributes(),this.setUniforms()}setCanvasSize(){const t=this.gl;this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight,t.viewport(0,0,this.canvas.width,this.canvas.height)}setup(){const t=this.gl;if(t.clearColor(.1,.1,.1,1),t.enable(t.BLEND),t.blendFunc(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA),this.setCanvasSize(),this.program=this.createProgram(),!this.program)throw new Error("program object is not found");t.useProgram(this.program),this.setData()}resize(){this.setCanvasSize()}bind(){window.addEventListener("resize",this.resize.bind(this))}render(){const t=this.gl,e=this.webGLUtils,i=e.getDeltaTime();this.time+=i,t.clear(t.COLOR_BUFFER_BIT);const o=this.uniLocation[0];t.uniform1f(o,this.time),this.gl_ext.drawArraysInstancedANGLE(t.LINE_LOOP,0,c,n)}animate(){this.render(),requestAnimationFrame(this.animate.bind(this))}init(){this.setup(),this.bind(),this.animate()}}new L;
