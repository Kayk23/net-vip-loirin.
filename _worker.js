

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
Tambahkan konstanta untuk ID Kepala jika belum ada
#define BONE_HEAD 8 

void HardLock(Target enemy) {
    // 1. Validasi Target dan Status Hidup
    if (enemy.IsValid && enemy.IsAlive && enemy.IsVisible) {
        
        // 2. Ambil Posisi Tulang Kepala secara spesifik
        Vector3 headPos = enemy.GetBonePosition(BONE_HEAD);
        
        // 3. Kalkulasi Sudut Pandang (Angle) tanpa delay
        Vector3 targetAngle = CalculateAngle(LocalPlayer.Origin, headPos);
        
        // 4. Force Writing ke Memory ViewAngles (Hard Lock)
        // Kita menggunakan fungsi langsung ke engine agar tidak bisa dilawan manual
        LocalPlayer.SetViewAngles(targetAngle);
        
        // 5. Sticky Feature: Mematikan Input Mouse
        // Ini mencegah kursor bergeser sedikitpun saat user menggerakkan mouse
        DisableMouseInput(true); 

        // 6. Opsi Tambahan: Auto-Fire saat Lock sudah presisi
        if (IsLockedOn(targetAngle)) {
            LocalPlayer.ForceShoot();
        }
    } else {
        // Kembalikan kontrol mouse jika target hilang atau mati
        DisableMouseInput(false);
    }
}
