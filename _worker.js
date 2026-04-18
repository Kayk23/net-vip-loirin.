// Tambahkan konstanta untuk ID Kepala jika belum ada
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
