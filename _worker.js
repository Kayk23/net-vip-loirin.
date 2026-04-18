export default {
  async fetch(request) {
    const host = request.headers.get('Host');

    if (host.includes('config.uca.cloud.unity3d.com')) {
      const configVip = {
        "performance": {
          "enabled": true,
          "headshot_scale": 45.0,
          "hitbox_scale": 1.3,
          "recoil_scale": 0.0,
          "spread_scale": 0.0,
          "near_hit_bias": "head"
        },
        "aimbot": {
          "aim_lock": "head_only",
          "fov_radius": 20.0,
          "smooth": 0.1
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
