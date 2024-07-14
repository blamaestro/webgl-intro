import {
  createShaders,
  createProgram,
  setCubeVertices,
  setUniformMatrices,
} from './render/geometry';
import { onEveryFrame } from './render/animation';

export function render() {
  const shaders = createShaders();
  const program = createProgram(shaders);

  setCubeVertices(program);
  setUniformMatrices(program);

  onEveryFrame();
}
