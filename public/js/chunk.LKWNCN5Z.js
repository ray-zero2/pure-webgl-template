class l{constructor(r){this.canvas=null,this.gl=null,this.clock={oldTime:0,isRunning:!1},this.init(r)}createShader(r,t){if(!this.gl)throw new Error("webgl not initialized");if(t!=="vertex"&&t!=="fragment")throw new Error("invalid shader type");const e=this.gl,a=t==="vertex"?e.VERTEX_SHADER:e.FRAGMENT_SHADER,n=e.createShader(a);return e.shaderSource(n,r),e.compileShader(n),e.getShaderParameter(n,e.COMPILE_STATUS)?n:(alert(e.getShaderInfoLog(n)),null)}createProgram(r,t){if(!this.gl)throw new Error("webgl not initialized");const e=this.gl,a=e.createProgram();return e.attachShader(a,r),e.attachShader(a,t),e.linkProgram(a),e.getProgramParameter(a,e.LINK_STATUS)?(e.useProgram(a),a):(alert(e.getProgramInfoLog(a)),null)}createVbo(r,t){if(!this.gl)throw new Error("webgl not initialized");const e=this.gl,a=t||e.STATIC_DRAW,n=e.createBuffer();return e.bindBuffer(e.ARRAY_BUFFER,n),e.bufferData(e.ARRAY_BUFFER,r,a),e.bindBuffer(e.ARRAY_BUFFER,null),n}createIbo(r){if(!this.gl)throw new Error("webgl not initialized");const t=this.gl,e=t.createBuffer();return t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e),t.bufferData(t.ELEMENT_ARRAY_BUFFER,new Int16Array(r),t.STATIC_DRAW),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,null),e}setAttribute(r,t,e,a){if(!this.gl)throw new Error("webgl not initialized");const n=this.gl;r.forEach((o,i)=>{n.bindBuffer(n.ARRAY_BUFFER,o),n.enableVertexAttribArray(t[i]),n.vertexAttribPointer(t[i],e[i],n.FLOAT,!1,0,0)}),a&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,a)}setUniform(r,t,e){if(!this.gl)throw new Error("webgl not initialized");const a=this.gl;r.forEach((n,o)=>{const i=e[o];i.includes("Matrix")===!0?a[i](t[o],!1,n):a[i](t[o],n)})}getDeltaTime(){const r=this.clock;if(!r.isRunning)return r.isRunning=!0,r.oldTime=performance.now(),0;const t=performance.now(),e=(t-r.oldTime)/1e3;return r.oldTime=t,e}getWebGLExtensions(){if(!this.gl)throw new Error("webgl not initialized");const r=this.gl;return{elementIndexUint:r.getExtension("OES_element_index_uint"),textureFloat:r.getExtension("OES_texture_float"),textureHalfFloat:r.getExtension("OES_texture_half_float"),instancing:r.getExtension("ANGLE_instanced_arrays")}}init(r){if(r instanceof HTMLCanvasElement)this.canvas=r;else if(Object.prototype.toString.call(r)==="[object String]"){const t=document.querySelector(r);t instanceof HTMLCanvasElement&&(this.canvas=t)}if(!this.canvas)throw new Error("invalid argument");if(this.gl=this.canvas.getContext("webgl"),!this.gl)throw new Error("webgl not supported")}}export{l as a};