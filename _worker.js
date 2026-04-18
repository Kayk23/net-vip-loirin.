export default {
  async fetch(request) {
    const host = request.headers.get('Host');

    // MIRA GRUDADA + SEM RECOIL
    if (host.includes('config.uca.cloud.unity3d.com')) {
      const configVip = {
        "performance": {
          "enabled": true,
          "headshot_scale": 45.0,    // Força magnética na cabeça
          "hitbox_scale": 1.3,       // Evita que a mira "atropele" a cabeça
          "recoil_scale": 0.0,       // Zero Recoil (Arma não treme)
          "spread_scale": 0.0,       // Bala não espalha
          "near_hit_bias": "head"    // Garante HS mesmo colado no inimigo
        },
        "aimbot": {
          "aim_lock": "head_only",   // Ignora o peito
          "fov_radius": 20.0,        // Raio de atração curto pra ser discreto e eficiente
          "smooth": 0.1              // Puxada instantânea
        }
      };
      return new Response(JSON.stringify(configVip), {
        headers: { 'content-type': 'application/json' }
      });
    }

    // BLOQUEIO DE BAN (Logs da Garena)
    if (host.includes('log') || host.includes('analytics')) {
      return new Response(null, { status: 403 });
    }

    return fetch(request);
  }
};
