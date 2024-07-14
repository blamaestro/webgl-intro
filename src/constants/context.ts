type Context = {
  canvas: HTMLCanvasElement,
  gl: WebGLRenderingContext,
  worldMatrix: Float32Array,
  viewMatrix: Float32Array,
  projectionMatrix: Float32Array,
  matWorldUniformLocation: WebGLUniformLocation,
  matViewUniformLocation: WebGLUniformLocation,
  matProjectionUniformLocation: WebGLUniformLocation,
}

const context: Context = {
  canvas: {} as HTMLCanvasElement, // Hack
  gl: {} as WebGLRenderingContext, // Hack
  worldMatrix: new Float32Array(16),
  viewMatrix: new Float32Array(16),
  projectionMatrix: new Float32Array(16),
  matWorldUniformLocation: 0,
  matViewUniformLocation: 0,
  matProjectionUniformLocation: 0,
};

export default context;
