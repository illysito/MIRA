const disp_frag = `
#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;
uniform float u_resolution;
uniform float u_fMix;
uniform float u_iMix;
uniform float u_timeFactor;

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
    uv.x + 0.05 * sin(u_time),
    uv.y + 0.05 * cos(u_time)
  );

  // COLORS

  float grey = 0.08;
  // grey = 0.4;
  vec4 color1 = vec4(0.0, 0.0, 0.0, 1.0);
  vec4 color2 = vec4(grey, grey, grey, 1.0);

  float grain = mix(-0.12, 0.12, rand(uv));

  float h = 0.86 * fbm(40.0 * distortionUV);
  float f = fbm(20.0 * vec2(h,h));
  f *= 12.0;
  f += grain;
  f += u_timeFactor * u_time;
  f = fract(f);
  f += 0.32 * rand(uv);

  float i = 0.86 * fbm(2.0 * distortionUV);
  i *= 5.0;
  i += u_timeFactor * u_time;
  i = fract(i);

  float f_mixer = smoothstep(0.7, 0.8, f) - smoothstep(0.8, 1.0, f);
  float i_mixer = smoothstep(0.8, 0.9, i) - smoothstep(0.9, 1.0, i);

  float mixer = u_fMix * f_mixer + u_iMix * i_mixer;

  vec4 color = mix(color1, color2, mixer);

  gl_FragColor = color;
}
`
export default disp_frag
