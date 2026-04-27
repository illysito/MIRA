const coreFrag = `
#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform float u_offset;

uniform float u_displacementCoef;
uniform float u_noiseFrequency;

uniform float u_mouseX;
uniform float u_mouseY;

uniform sampler2D u_innerCircle;
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




  // CENTER LUMINANCE

  vec2 center = vec2(0.5, 0.5);
  vec2 mouse = vec2(u_mouseX, u_mouseY);
  float dist = distance(mouse, center);
  float centerLuminance = 1.0 - smoothstep(0.1, 1.0, dist);




  // DISTORTIONS

  float distortionX = 0.0022 * sin(12.0 * u_time) * perlinImg.r;
  float distortionY = 0.0022 * cos(12.0 * u_time) * perlinImg.r;


  float displaceForce1 = perlinImg.r * u_offset * u_displacementCoef;
  vec2 uvDisplaced1 = vec2(coords.x + 0.02 * sin(u_time) * displaceForce1 + distortionX, coords.y - 0.06 * displaceForce1 * cos(u_time) + distortionY);
  
  
  float displaceForce2 = perlinImg.r * (1.0 - u_offset) * u_displacementCoef;
  vec2 uvDisplaced2 = vec2(coords.x - 0.1 * displaceForce2, coords.y + 0.1 * displaceForce2);




  // IMAGE SAMPLING

  vec4 displacedImg1 = texture2D(u_innerCircle, uvDisplaced1);
  vec4 displacedBG = texture2D(u_bg, uvDisplaced2);




  // LINES

  vec4 finalImg = (displacedImg1 * (1.0 - u_offset) + displacedBG * u_offset);
  // vec4 anotherImg = (displacedImg1 * (1.0 - u_offset) + displacedBG * u_offset);
  // finalImg += anotherImg;




  // BRIGHTNESS & COLOR ADJUSTMENT

  finalImg.g *= 0.88;
  finalImg.b *= 0.88;



  // FINAL 

  vec4 finalColor = vec4(finalImg.rgb * color * 1.9 * centerLuminance, finalImg.a);
  gl_FragColor = finalColor;

}
`
export default coreFrag
