void HardLock(Target enemy) {
    if (enemy.IsValid) {
        // Mengunci sudut pandang secara instan tanpa smoothing
        Vector3 targetAngle = CalculateAngle(LocalPlayer.Pos, enemy.GetBone(BONE_HEAD));
        LocalPlayer.SetViewAngles(targetAngle); 
        
        // Mematikan input mouse manual agar bidikan tidak goyang
        DisableMouseInput(); 
    }
}
