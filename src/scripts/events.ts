import context from '@/constants/context';
import { render } from './render';

export function updateWindow() {
  const { canvas, gl } = context;
  
  if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    gl.viewport(0, 0, canvas.width, canvas.height);
  }

  render();
}

window.addEventListener('resize', updateWindow);
