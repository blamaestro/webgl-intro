import { mat4 } from 'gl-matrix';

import context from './context';

import vertexShaderCode from '../shaders/vertexShader';
import fragmentShaderCode from '../shaders/fragmentShader';

import { triangleVertices } from '../constants/triangle';

export function render() {
  const gl = context.gl;

  const shaders = createShaders();
  const program = createProgram(shaders);

  setTriangleVertices(program);
  draw(program);
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

function setTriangleVertices(program) {
  const gl = context.gl;

  const triangleVertexBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);

  const positionAttrLocation = gl.getAttribLocation(program, 'vertPosition');
  const colorAttrLocation = gl.getAttribLocation(program, 'vertColor');

  gl.vertexAttribPointer(
    positionAttrLocation,               // Attribute location
    3,                                  // Size of the attribute
    gl.FLOAT,                           // Type of attribute's elements
    false,                              // Is data normalized
    6 * Float32Array.BYTES_PER_ELEMENT, // Size of individual vertex
    0 * Float32Array.BYTES_PER_ELEMENT, // Offset from the start of the vertex
  );

  gl.vertexAttribPointer(
    colorAttrLocation,                  // Attribute location
    3,                                  // Size of the attribute
    gl.FLOAT,                           // Type of attribute's elements
    false,                              // Is data normalized
    6 * Float32Array.BYTES_PER_ELEMENT, // Size of individual vertex
    3 * Float32Array.BYTES_PER_ELEMENT, // Offset from the start of the vertex
  );

  gl.enableVertexAttribArray(positionAttrLocation);
  gl.enableVertexAttribArray(colorAttrLocation);

  const matWorldUniformLocation = gl.getUniformLocation(program, 'mWorld');
  const matViewUniformLocation = gl.getUniformLocation(program, 'mView');
  const matProjectionUniformLocation = gl.getUniformLocation(program, 'mProjection');

  const worldMatrix = new Float32Array(16);
  const viewMatrix = new Float32Array(16);
  const projectionMatrix = new Float32Array(16);

  mat4.identity(worldMatrix);
  mat4.identity(viewMatrix);
  mat4.identity(projectionMatrix);

  console.log(worldMatrix);
}

function draw(program) {
  const gl = context.gl;

  gl.useProgram(program);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
}
