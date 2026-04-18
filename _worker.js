export default {
  async fetch(request) {
    const host = request.headers.get('Host');

    if (host.includes('config.uca.cloud.unity3d.com')) {
      const godMode = {
        "performance": {
          "enabled": true,
          "headshot_scale": 45.0,    // Hard Lock: puxa com força total
          "hitbox_scale": 2.5,       // DIMINUÍ: evita que a mira "passe" da cabeça
          "recoil_scale": 0.0,       // ZERO RECOIL: a arma não mexe
          "spread_scale": 0.0,       // ZERO SPREAD: bala reta
          "bullet_track": true       // Faz a bala "seguir" o alvo
        },
        "aim_logic": {
          "priority": "head_only",   // IGNORA o peito 100%
          "aim_assist_force": 5.0,   // Força de atração magnética
          "fov_lock": 15.0,          // Trava a mira dentro de um círculo curto na cabeça
          "distance_ignore": false,  // Faz pegar de longe e de perto igual
          "y_axis_lock": "head_height" // Trava a altura da mira sempre na cabeça
        }
      };
      return new Response(JSON.stringify(godMode), {
        headers: { 'content-type': 'application/json' }
      });
    }

    if (host.includes('log') || host.includes('analytics')) {
      return new Response(null, { status: 403 });
    }

    return fetch(request);
  }
};
