import context from './context.js';
import { resizeWindow } from './events.js';

function main() {
  context.canvas = document.getElementById('canvas');
  context.gl = canvas.getContext('webgl');

  if (!context.gl) {
    console.error('Your browser does not support WebGL.');
  }

  resizeWindow();
}

window.addEventListener('load', main);
