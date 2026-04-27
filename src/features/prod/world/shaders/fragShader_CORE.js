const disp_frag_lifecycle = `
#ifdef GL_ES
precision highp float;
#endif

// #include <common>
// #include <colorspace_pars_fragment>

uniform float u_time;
uniform vec2 u_resolution;
uniform float u_offset;

uniform float u_displacementCoef;
uniform float u_noiseFrequency;

uniform float u_mixer_1;
uniform float u_mixer_2;
uniform float u_mixer_3;
uniform float u_mixer_4;

uniform sampler2D u_core_1;
uniform sampler2D u_core_2;
uniform sampler2D u_core_3;
uniform sampler2D u_core_4;
uniform sampler2D u_core_5;
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

float rand(vec2 uv) {
  return fract(sin(dot(uv.xy,
      vec2(12.9898,78.233))) *
          43758.5453123);
}

float noise(vec2 p){
	vec2 ip = floor(p);
	vec2 u = fract(p);
	u = u*u*(3.0-2.0*u);
	
	float res = mix(
		mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
		mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
	return res*res;
}

float fbm(vec2 x) {
	float v = 0.0;
	float a = 0.5;
	vec2 shift = vec2(100);
	// Rotate to reduce axial bias
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
	for (int i = 0; i < 12; ++i) {
		v += a * noise(x);
		x = rot * x * 2.0 + shift;
		a *= 0.5;
	}
	return v;
}











void main()
{

  // COORDS

  vec2 uv = v_texcoord;
  //uv.x *= u_resolution.x / u_resolution.y;

  // find out the ratios
  float image_ratio = 1200.0 / 1200.0;
  float canvas_ratio = u_resolution.x / u_resolution.y;

  vec2 coords = aspect(uv, image_ratio, canvas_ratio);
  coords = clamp(coords, 0.01, 0.99);

  float blocks = 800.0;
  float xBlocks = floor(coords.x * blocks) / blocks;
  float yBlocks = floor(coords.y * blocks) / blocks;
  vec2 blockCoords = vec2(xBlocks, yBlocks);
  
  vec2 distortionCoords = vec2(
    coords.x + 0.02 * sin(u_time),
    coords.y + 0.04 * cos(u_time)
  );






  // NOISE

  float noise = fbm(uv * 2.0 + 2.0 * sin(0.25 * u_time));
  float color = smoothstep(-1.0, 2.0, noise);




  // DISPLACEMENT WITH PERLIN

  vec4 backgroundImg = texture2D(u_bg, coords);

  vec2 perlinUV = fract(blockCoords * u_noiseFrequency);
  vec4 perlinImg = texture2D(u_noiseTexture, perlinUV);




  // DISTORTIONS

  float distortionX = 0.0018 * sin(12.0 * u_time) * perlinImg.r;
  float distortionY = 0.0018 * cos(12.0 * u_time) * perlinImg.r;


  float displaceForce1 = perlinImg.r * u_offset * u_displacementCoef;
  vec2 uvDisplaced1 = vec2(coords.x + 0.02 * sin(u_time) * displaceForce1 + distortionX, coords.y - 0.06 * displaceForce1 * cos(u_time) + distortionY);
  
  
  float displaceForce2 = perlinImg.r * (1.0 - u_offset) * u_displacementCoef;
  vec2 uvDisplaced2 = vec2(coords.x - 0.1 * displaceForce2, coords.y + 0.1 * displaceForce2);


  // IMAGE SAMPLING

  vec4 displacedImg1 = texture2D(u_core_1, uvDisplaced1);
  vec4 displacedImg2 = texture2D(u_core_2, uvDisplaced1);
  vec4 displacedImg3 = texture2D(u_core_3, uvDisplaced1);
  vec4 displacedImg4 = texture2D(u_core_4, uvDisplaced1);
  vec4 displacedImg5 = texture2D(u_core_5, uvDisplaced1);
  vec4 displacedBG = texture2D(u_bg, uvDisplaced2);


  // IMAGE MIX TO SWAP THEM

  // From 1 to 2
  vec4 pair_1 = mix(displacedImg1, displacedImg2, u_mixer_1);
  // From 2 to 3
  vec4 pair_2 = mix(pair_1, displacedImg3, u_mixer_2);
  // From 3 to 4
  vec4 pair_3 = mix(pair_2, displacedImg4, u_mixer_3);
  // From 4 to 5
  vec4 pair_4 = mix(pair_3, displacedImg5, u_mixer_4);


  // LINES

  vec4 finalImg = (pair_4 * (1.0 - u_offset) + displacedBG * u_offset);
  // vec4 anotherImg = (displacedImg1 * (1.0 - u_offset) + displacedBG * u_offset);

  // finalImg += anotherImg;


  // BRIGHTNESS ADJUSTMENT

  finalImg.g *= 0.88;
  finalImg.b *= 0.88;

  // if(finalImg.r < 0.1){
  //   finalImg.r = 0.0;
  // }
  // if(finalImg.g < 0.1){
  //   finalImg.g = 0.0;
  // }
  // if(finalImg.b < 0.1){
  //   finalImg.b = 0.0;
  // }


  // FINAL 

  vec4 finalColor = vec4(finalImg.rgb * color * 1.72, finalImg.a);

  // // compute brightness
  // float luma = max(max(finalImg.r, finalImg.g), finalImg.b);

  // // kill near-black
  // float mask = smoothstep(0.05, 0.15, luma);

  // // apply
  // finalColor.rgb *= mask;
  // displacedBG.rgb *= mask;
  gl_FragColor = finalColor;
  
  // #include <colorspace_fragment>
}
`
export default disp_frag_lifecycle
