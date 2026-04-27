const disp_frag = `
#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;
uniform float u_resolution;

varying vec2 v_texcoord;

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
	for (int i = 0; i < 5; ++i) {
		v += a * noise(x);
		x = rot * x * 2.0 + shift;
		a *= 0.5;
	}
	return v;
}


void main()
{

  // CREO EL VECTOR UV Y LO AJUSTO A RESOLLUCION

  vec2 uv = v_texcoord;
  uv.x *= u_resolution;

  vec2 distortionUV = vec2(
    uv.x + 0.1 * sin(u_time),
    uv.y + 0.1 * cos(u_time)
  );

  // COLORS

  float grey = 0.1;
  vec4 color1 = vec4(0.0, 0.0, 0.0, 1.0);
  vec4 color2 = vec4(grey, grey, grey, 1.0);

  float f = 0.86 * fbm(200.0 * distortionUV + sin(u_time));
  f += 0.5 * rand(uv);

  vec4 color = mix(color1, color2, f);

  gl_FragColor = color2 * rand(uv);
}
`
export default disp_frag
