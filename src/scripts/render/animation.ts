import { mat4 } from 'gl-matrix';

import context from '@/constants/context';

import { getIdentityMatrix } from '@/utils/matrices';

const identityMatrix = getIdentityMatrix();

let angle = 0;

export function onEveryFrame() {
  const gl = context.gl;
  
  angle = performance.now() / 1000 / 6 * 2 * Math.PI;

  mat4.rotate(context.worldMatrix, identityMatrix, angle, [0, 1, 0]);

  gl.uniformMatrix4fv(context.matWorldUniformLocation, false, context.worldMatrix);

  gl.clearColor(0.1, 0.1, 0.1, 1);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, 3);

  requestAnimationFrame(onEveryFrame);
}
