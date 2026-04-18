export default {
  async fetch(request) {
    const host = request.headers.get('Host');

    // Intercepta a configuração de física das armas e mira
    if (host.includes('config.uca.cloud.unity3d.com')) {
      const xitVip = {
        "performance": {
          "enabled": true,
          "headshot_scale": 15.0,    // Puxa 100% na cabeça
          "hitbox_scale": 8.5,       // Hitbox gigante pra não errar tiro
          "recoil_scale": 0.0,       // ZERO RECOIL (A arma não sobe)
          "spread_scale": 0.0        // ZERO SPREAD (As balas não espalham)
        },
        "aimbot": {
          "aim_lock": "head_only",   // Trava magnética só na cabeça
          "aim_assist_distance": 500,// Puxa de longe e de perto
          "fov_radius": 180,         // Puxa o tiro mesmo se não tiver cravado no cara
          "near_hit_bias": "head"    // Resolve o problema de pegar no peito quando está perto
        }
      };
      return new Response(JSON.stringify(xitVip), {
        headers: { 'content-type': 'application/json' }
      });
    }

    // Bloqueia detecção da Garena
    if (host.includes('log') || host.includes('analytics')) {
      return new Response(null, { status: 403 });
    }

    return fetch(request);
  }
};
