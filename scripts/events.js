import context from './context';
import { render } from './render';

export function updateWindow() {
  const { canvas, gl } = context;
  
  if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    gl.viewport(0, 0, canvas.width, canvas.height);
  }

  gl.clearColor(0.1, 0.1, 0.1, 1);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  render();
}

window.addEventListener('resize', updateWindow);
