import context from '@/constants/context';
import { updateWindow } from './events';

function main() {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;

  if (!canvas) {
    throw new Error('Canvas element not found');
  }

  const gl = canvas.getContext('webgl')!;

  if (!gl) {
    throw new Error('Your browser does not support WebGL.');
  }

  context.canvas = canvas;
  context.gl = gl;

  updateWindow();
}

window.addEventListener('load', main);
