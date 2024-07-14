import {
  createShaders,
  createProgram,
  setTriangleVertices,
  setUniformMatrices,
} from './render/geometry';
import { onEveryFrame } from './render/animation';

export function render() {
  const shaders = createShaders();
  const program = createProgram(shaders);

  setTriangleVertices(program);
  setUniformMatrices(program);

  onEveryFrame();
}
