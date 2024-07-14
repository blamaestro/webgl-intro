import context from './context.js';
import { render } from './render.js';

export function updateWindow() {
  const { canvas, gl } = context;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  gl.viewport(0, 0, canvas.width, canvas.height);

  render();
}

window.addEventListener('resize', updateWindow);
