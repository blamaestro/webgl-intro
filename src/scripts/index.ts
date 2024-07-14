import context from './context';
import { updateWindow } from './events';

function main() {
  context.canvas = document.getElementById('canvas') as HTMLCanvasElement;

  if (!context.canvas) {
    throw new Error('Canvas element not found');
  }

  context.gl = context.canvas.getContext('webgl');

  if (!context.gl) {
    console.error('Your browser does not support WebGL.');
  }

  updateWindow();
}

window.addEventListener('load', main);
