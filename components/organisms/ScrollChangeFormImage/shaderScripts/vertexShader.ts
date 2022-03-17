// Vertex Shader
export const VERTEX_SHADER_SCRIPT: string = `
  varying vec2 vUv;

  void main(){
    vUv = uv;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
