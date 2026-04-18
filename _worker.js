export default {
  async fetch(request) {
    const host = request.headers.get('Host') || "";

    if (host.includes('config.uca.cloud.unity3d.com') || host.includes('freefire')) {
      const godModeVip = {
        "performance": {
          "enabled": true,
          "headshot_scale": 1500.0,    // Valor acima do limite para ignorar colisão de peito
          "hitbox_scale": 0.0001,      // Reduz a área do corpo para quase zero
          "recoil_scale": 0.0,
          "spread_scale": 0.0,
          "near_hit_bias": "head_top", // Força o desvio do tiro para o topo da cabeça
          "auto_aim_offset": [0, 0.25, 0] // Ajuste de altura (Eixo Y) para acima do pescoço
        },
        "aimbot": {
          "aim_lock": "head_only",
          "fov_radius": 180.0,         // 180 é mais estável que 360 (evita que a mira gire 180º do nada)
          "smooth": 0.0,
          "on_fire_magnetic": true,
          "prediction": 5.0,           // Aumentado para compensar o ping do proxy
          "prioritize_distance": false // Foca na cabeça, não no inimigo mais perto
        },
        "protection": {
          "anti_cheat_bypass": "enabled",
          "silent_mode": true
        }
      };
      return new Response(JSON.stringify(godModeVip), {
        headers: { 
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*' 
        }
      });
    }

    // Bloqueio Total de Denúncias e Logs (Anti-Ban)
    const logs = ['log', 'analytics', 'report', 'crash', 'telemetry', 'stat'];
    if (logs.some(word => host.toLowerCase().includes(word))) {
      return new Response(JSON.stringify({ status: "success" }), { status: 200 }); 
      // Retorna 200 "fake" para o jogo achar que enviou o log, mas o dado é descartado.
    }

    return fetch(request);
  }
};
