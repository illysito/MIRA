const disp_frag = `
#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
// uniform float u_offset;
// uniform float u_mouseX;
// uniform float u_mouseY;
// uniform float u_displacementCoef;
// uniform float u_noiseFrequency;
// uniform sampler2D u_img;
// uniform sampler2D u_noiseTexture;
// uniform sampler2D u_bg;

varying vec2 v_texcoord;

float random(vec2 uv) {
  return fract(sin(dot(uv.xy,
      vec2(12.9898,78.233))) *
          43758.5453123);
}

void main()
{

  // CREO EL VECTOR UV Y LO AJUSTO A RESOLLUCION

  vec2 uv = v_texcoord;
  //uv.x *= u_resolution.x / u_resolution.y;

  // NOISE

  float noise = random(uv + sin(u_time));
  float noiseFactor = 0.14;

  vec4 img = vec4(0.0, 0.0, 0.0, 1.0);
  
  img += noise * noiseFactor;

  gl_FragColor = img;
}
`
export default disp_frag
