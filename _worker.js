export default {
  async fetch(request) {
    const host = request.headers.get('Host');

    if (host.includes('config.uca.cloud.unity3d.com')) {
      const godModeVip = {
        "performance": {
          "enabled": true,
          "headshot_scale": 999.0,     // Força bruta máxima pro capa
          "hitbox_scale": 0.001,       // Trava no micro-pixel exato da testa
          "recoil_scale": 0.0,         // Arma imóvel
          "spread_scale": 0.0,
          "near_hit_bias": "head"
        },
        "aimbot": {
          "aim_lock": "head_only",
          "fov_radius": 360.0,         // Puxa independente de onde o inimigo estiver na tela
          "smooth": 0.0,               // Puxada seca, zero atraso
          "on_fire_magnetic": true,    // Força a mira pra cabeça no exato milissegundo do tiro
          "prediction": 3.0            // Antecipação extrema
        },
        "scopes": {
          "scope_2x_multiplier": 8.0,  // Sensibilidade e trava estourada só pra mira 2x
          "scope_4x_multiplier": 1.0,  // Mantém as outras normais pra não bugar
          "red_dot_multiplier": 1.5
        }
      };
      return new Response(JSON.stringify(godModeVip), {
        headers: { 'content-type': 'application/json' }
      });
    }

    if (host.includes('log') || host.includes('analytics') || host.includes('report') || host.includes('crash')) {
      return new Response(null, { status: 403 }); // Proteção anti-ban
    }

    return fetch(request);
  }
};
