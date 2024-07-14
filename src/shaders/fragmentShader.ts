/**
 * This shader takes a 2D vertex position and outputs a 4D position,
 * where the z-coordinate is 0.0 and the w-coordinate is 1.0.
 */

const fragmentShader: string = `
  precision mediump float;

  varying vec3 fragColor;

  void main() {
    gl_FragColor = vec4(fragColor, 1.0);
  }
`;

export default fragmentShader;
