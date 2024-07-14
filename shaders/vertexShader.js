/**
 * This shader takes a 2D vertex position and outputs a 4D position,
 * where the z-coordinate is 0.0 and the w-coordinate is 1.0.
 */

const vertexShader = `
  precision mediump float;

  attribute vec3 vertPosition;
  attribute vec3 vertColor;

  varying vec3 fragColor;

  uniform mat4 mWorld;
  uniform mat4 mView;
  uniform mat4 mProjection;

  void main() {
    fragColor = vertColor;
    gl_Position = mProjection * mView * mWorld * vec4(vertPosition, 1.0);
  }
`;

export default vertexShader;
