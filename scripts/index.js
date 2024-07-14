import context from './context.js';
import { updateWindow } from './events.js';

function main() {
  context.canvas = document.getElementById('canvas');
  context.gl = canvas.getContext('webgl');

  if (!context.gl) {
    console.error('Your browser does not support WebGL.');
  }

  updateWindow();
}

window.addEventListener('load', main);
