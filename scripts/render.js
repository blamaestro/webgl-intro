import context from './context.js';

import vertexShaderCode from '../shaders/vertexShader.js';
import fragmentShaderCode from '../shaders/fragmentShader.js';

export function render() {
  const gl = context.gl;

  gl.clearColor(0.1, 0.1, 0.1, 1);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  const shaders = createShaders();
  const program = createProgram(shaders);

  console.log('Program created', program);
}

function createShaders() {
  const gl = context.gl;

  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

  const shaders = [vertexShader, fragmentShader];
  const shaderNames = ['Vertex', 'Fragment'];

  gl.shaderSource(vertexShader, vertexShaderCode);
  gl.shaderSource(fragmentShader, fragmentShaderCode);

  shaders.forEach((shader, index) => {
    gl.compileShader(shader);
  
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const error = `${shaderNames[index]} shader compilation error: ${gl.getShaderInfoLog(shader)}`;
      throw new Error(error);
    }
  });

  return shaders;
}

function createProgram(shaders) {
  const gl = context.gl;

  const program = gl.createProgram();

  shaders.forEach(shader => gl.attachShader(program, shader));

  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const error = `Program linking error: ${gl.getProgramInfoLog(program)}`;
    throw new Error(error);
  }

  gl.validateProgram(program);

  if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
    const error = `Program validation error: ${gl.getProgramInfoLog(program)}`;
    throw new Error(error);
  }

  return program;
}
