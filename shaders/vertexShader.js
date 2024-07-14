/**
 * This shader takes a 2D vertex position and outputs a 4D position,
 * where the z-coordinate is 0.0 and the w-coordinate is 1.0.
 */

const vertexShader = `
  precision mediump float;
  attribute vec2 vertPosition;

  void main() {
    gl_Position = vec4(vertPosition, 0.0, 1.0);
  }
`;

export default vertexShader;
