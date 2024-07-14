import { mat4 } from 'gl-matrix';

import context from '@/constants/context';
import { cubeTriangleIndices } from '@/constants/cube';

import { getIdentityMatrix } from '@/utils/matrices';

const identityMatrix = getIdentityMatrix();

export function onEveryFrame() {
  const gl = context.gl;
  
  const angle = performance.now() / 1000 / 6 * 2 * Math.PI;

  const xRotationMatrix = new Float32Array(16);
  const yRotationMatrix = new Float32Array(16);

  mat4.rotate(yRotationMatrix, identityMatrix, angle, [0, 1, 0]);
  mat4.rotate(xRotationMatrix, identityMatrix, angle / 4, [1, 0, 0]);
  mat4.multiply(context.worldMatrix, yRotationMatrix, xRotationMatrix);

  gl.uniformMatrix4fv(context.matWorldUniformLocation, false, context.worldMatrix);

  gl.clearColor(0.1, 0.1, 0.1, 1);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.drawElements(gl.TRIANGLES, cubeTriangleIndices.length, gl.UNSIGNED_SHORT, 0);

  requestAnimationFrame(onEveryFrame);
}
