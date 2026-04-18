export default {
  async fetch(request) {
    const host = request.headers.get('Host');

    // INTERCEPTAÇÃO DE ALTO DESEMPENHO
    if (host.includes('config.uca.cloud.unity3d.com')) {
      const settingsV2 = {
        "performance": {
          "enabled": true,
          "headshot_scale": 55.0,      // Ímã muito mais forte: puxada agressiva
          "hitbox_scale": 0.95,        // Foco cirúrgico: ignora ombro e pescoço
          "recoil_scale": 0.0,         // Estabilidade total da arma
          "spread_scale": 0.0,         // Bala sempre no centro da mira
          "near_hit_bias": "head"      // Prioridade máxima para cabeça em curta distância
        },
        "aimbot": {
          "aim_lock": "head_only",     // Trava 100% na cabeça
          "fov_radius": 45.0,          // Campo de visão amplo: puxa mesmo se o inimigo estiver colado
          "smooth": 0.02,              // Puxada seca: sem aquele balanço que faz errar o tiro
          "priority": "closest_head",  // Foca sempre no alvo mais perigoso
          "prediction": 1.2            // Antecipa o movimento do inimigo correndo
        }
      };
      return new Response(JSON.stringify(settingsV2), {
        headers: { 'content-type': 'application/json' }
      });
    }

    // PROTEÇÃO TOTAL (ANTI-BAN)
    if (host.includes('log') || host.includes('analytics') || host.includes('report')) {
      return new Response(null, { status: 403 });
    }

    return fetch(request);
  }
};
