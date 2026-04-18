export default {
  async fetch(request) {
    const host = request.headers.get('Host');

    if (host.includes('config.uca.cloud.unity3d.com')) {
      const configVip = {
        "performance": {
          "enabled": true,
          "headshot_scale": 38.5,    // Ajustado para não passar da testa
          "hitbox_scale": 1.02,     // Foco total no centro do crânio
          "recoil_scale": 0.0,
          "spread_scale": 0.0,
          "near_hit_bias": "head"
        },
        "aimbot": {
          "aim_lock": "head_only",
          "fov_radius": 35.0,        // Aumentado para rastrear melhor de perto
          "smooth": 0.15,            // Mais suavidade para parar no alvo
          "priority": "closest"      // Foca no que está mais perto
        }
      };
      return new Response(JSON.stringify(configVip), {
        headers: { 'content-type': 'application/json' }
      });
    }

    if (host.includes('log') || host.includes('analytics')) {
      return new Response(null, { status: 403 });
    }

    return fetch(request);
  }
};
