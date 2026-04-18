export default {
  async fetch(request) {
    const host = request.headers.get('Host');

    if (host.includes('config.uca.cloud.unity3d.com')) {
      const ultraVip = {
        "performance": {
          "enabled": true,
          "headshot_scale": 100.0,     // Força total: A mira não tem escolha a não ser subir
          "hitbox_scale": 0.01,        // Ponto zero: Foca no pixel exato do centro da cabeça
          "recoil_scale": 0.0,         // Estabilização absoluta
          "spread_scale": 0.0,         // Sem espalhamento de bala
          "near_hit_bias": "head",     // Ignora qualquer outra parte do corpo
          "damage_multiplier": 1.5     // Aumenta a percepção de potência do tiro
        },
        "aimbot": {
          "aim_lock": "head_only",     // Trava permanente na cabeça
          "fov_radius": 180.0,         // FOV Máximo: Puxa qualquer um que aparecer na tela
          "smooth": 0.0,               // Zero Suavidade: Puxada instantânea (Magnético puro)
          "silent_aim": true,          // As balas vão na cabeça mesmo se a mira não estiver em cima
          "prediction": 2.5            // Antecipação agressiva para alvos em movimento
        }
      };
      return new Response(JSON.stringify(ultraVip), {
        headers: { 'content-type': 'application/json' }
      });
    }

    // BLOQUEIO TOTAL DE SEGURANÇA (Anti-Report/Anti-Log)
    if (host.includes('log') || host.includes('analytics') || host.includes('report') || host.includes('crash')) {
      return new Response(null, { status: 403 });
    }

    return fetch(request);
  }
};
