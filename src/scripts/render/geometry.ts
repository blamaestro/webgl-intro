import { mat4, glMatrix } from 'gl-matrix';

import context from '@/constants/context';

import vertexShaderCode from '@/shaders/vertexShader';
import fragmentShaderCode from '@/shaders/fragmentShader';

import { cubeVertices, cubeTriangleIndices } from '@/constants/cube';

export function createShaders() {
  const gl = context.gl;

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

export function createProgram(shaders: WebGLShader[]) {
  const gl = context.gl;

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

export function setCubeVertices(program: WebGLProgram) {
  const gl = context.gl;

  const cubeVertexBuffer = gl.createBuffer();
  const cubeIndexBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubeVertices), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeIndexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeTriangleIndices), gl.STATIC_DRAW);

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

  gl.useProgram(program);
}

export function setUniformMatrices(program: WebGLProgram) {
  const { gl, canvas } = context;

  context.matWorldUniformLocation = gl.getUniformLocation(program, 'mWorld') || 0;
  context.matViewUniformLocation = gl.getUniformLocation(program, 'mView') || 0;
  context.matProjectionUniformLocation = gl.getUniformLocation(program, 'mProjection') || 0;

  context.worldMatrix = new Float32Array(16);
  context.viewMatrix = new Float32Array(16);
  context.projectionMatrix = new Float32Array(16);
  
  const aspectRatio = canvas ? canvas.width / canvas.height : 1;

  mat4.identity(context.worldMatrix);
  mat4.lookAt(context.viewMatrix, [0, 0, -8], [0, 0, 0], [0, 1, 0]);
  mat4.perspective(context.projectionMatrix, glMatrix.toRadian(45), aspectRatio, 0.1, 1000.0);

  gl.uniformMatrix4fv(context.matWorldUniformLocation, false, context.worldMatrix);
  gl.uniformMatrix4fv(context.matViewUniformLocation, false, context.viewMatrix);
  gl.uniformMatrix4fv(context.matProjectionUniformLocation, false, context.projectionMatrix);
}
