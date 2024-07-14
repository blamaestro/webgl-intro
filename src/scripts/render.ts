import { mat4 } from 'gl-matrix';

import vertexShaderCode from '@/shaders/vertexShader';
import fragmentShaderCode from '@/shaders/fragmentShader';

import { triangleVertices } from '@/constants/triangle';

import context from './context';

const missingContextError = new Error('WebGL context is missing');

export function render() {
  const shaders = createShaders();
  const program = createProgram(shaders);

  setTriangleVertices(program);
  draw(program);
}

function createShaders() {
  const gl = context.gl;

  if (!gl) throw missingContextError;

  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

  if (!vertexShader) throw new Error('Vertex shader cannot not be created');
  if (!fragmentShader) throw new Error('Fragment shader cannot not be created');

  const shaders = [vertexShader, fragmentShader] as WebGLShader[];
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

function createProgram(shaders: WebGLShader[]) {
  const gl = context.gl;

  if (!gl) throw missingContextError;

  const program = gl.createProgram();

  if (!program) throw new Error('WebGL program cannot not be created');

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

function setTriangleVertices(program: WebGLProgram) {
  const gl = context.gl;

  if (!gl) throw missingContextError;

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

function draw(program: WebGLProgram) {
  const gl = context.gl;

  if (!gl) throw missingContextError;

  gl.useProgram(program);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
}
