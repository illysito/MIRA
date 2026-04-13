const disp_frag = `
#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform float u_offset;
uniform float u_mouseX;
uniform float u_mouseY;
uniform float u_displacementCoef;
uniform float u_noiseFrequency;
uniform float u_blocks;
uniform sampler2D u_img;
uniform sampler2D u_noiseTexture;
uniform sampler2D u_bg;

varying vec2 v_texcoord;

float random(vec2 uv) {
  return fract(sin(dot(uv.xy,
      vec2(12.9898,78.233))) *
          43758.5453123);
}

vec2 aspect(vec2 uv, float image_ratio, float canvas_ratio){
  // if canvas is taller than image, stretch downwards
  // if canvas is landscape to the image, stretch across
  if(image_ratio >= canvas_ratio){
    float ratio = canvas_ratio / image_ratio;
    uv.x *= ratio;
    uv.x += (1.0 - ratio) / 2.0; 
  } else {
    float ratio = image_ratio / canvas_ratio;
    uv.y *= ratio;
    uv.y += (1.0 - ratio) / 2.0; 
  }
  return uv;
}

void main()
{

  // CREO EL VECTOR UV Y LO AJUSTO A RESOLLUCION

  vec2 uv = v_texcoord;
  //uv.x *= u_resolution.x / u_resolution.y;

  // find out the ratios
  float image_ratio = 1200.0 / 1200.0;
  float canvas_ratio = u_resolution.x / u_resolution.y;

  vec2 coords = aspect(uv, image_ratio, canvas_ratio);

  // float blocks = 600.0;
  float xBlocks = floor(coords.x * u_blocks) / u_blocks;
  float yBlocks = floor(coords.y * u_blocks) / u_blocks;
  vec2 blockCoords = vec2(xBlocks, yBlocks);
  
  vec2 distortionCoords = vec2(
    coords.x + 0.02 * sin(u_time) - 0.15 * u_mouseX + 0.12,
    coords.y + 0.04 * cos(u_time) + 0.15 * u_mouseY
  );

  // NOISE

  float noise = random(uv + sin(u_time));
  float noiseFactor = 0.02;

  vec4 img = texture2D(u_img, coords);
  
  img += noise * noiseFactor;

  // DISPLACEMENT WITH PERLIN

  // float displacementCoef = 0.4;

  vec4 backgroundImg = texture2D(u_bg, coords);

  // float u_noiseFrequency = 8.0;   // higher = more high frequency
  vec2 perlinUV = fract(blockCoords * u_noiseFrequency);
  vec4 perlinImg = texture2D(u_noiseTexture, perlinUV);

  // Hold Distortion
  float distortionX = 0.0018 * sin(12.0 * u_time) * perlinImg.r;
  float distortionY = 0.0018 * cos(12.0 * u_time) * perlinImg.r;

  float displaceForce1 = perlinImg.r * u_offset * u_displacementCoef;
  vec2 uvDisplaced1 = vec2(coords.x + 0.02 * sin(u_time) * displaceForce1 + distortionX, coords.y - 0.06 * displaceForce1 * cos(u_time) + distortionY);
  float displaceForce2 = perlinImg.r * (1.0 - u_offset) * u_displacementCoef;
  vec2 uvDisplaced2 = vec2(coords.x - 0.1 * displaceForce2, coords.y + 0.1 * displaceForce2);

  vec4 displacedImgOmy = texture2D(u_img, uvDisplaced1);
  vec4 displacedBG = texture2D(u_bg, uvDisplaced2);

  vec4 finalImg = (displacedImgOmy * (1.0 - u_offset) + displacedBG * u_offset);

  gl_FragColor = finalImg * 0.92;
  // gl_ragColor = perlinImg;
}
`
export default disp_frag
