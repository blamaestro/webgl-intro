import { mat4 } from 'gl-matrix';

export function getIdentityMatrix() {
  const identityMatrix = new Float32Array(16);
  return mat4.identity(identityMatrix);
}
