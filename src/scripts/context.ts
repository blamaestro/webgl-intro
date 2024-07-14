type Context = {
  canvas: HTMLCanvasElement | null,
  gl: WebGLRenderingContext | null,
}

const context: Context = {
  canvas: null,
  gl: null,
};

export default context;
