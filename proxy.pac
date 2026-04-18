function FindProxyForURL(url, host) {
    // Captura configurações de engine e de rede do jogo
    if (shExpMatch(host, "*.uca.cloud.unity3d.com") || 
        shExpMatch(host, "*.garena.com") || 
        shExpMatch(host, "dl.dir.freefiremobile.com")) {
        return "PROXY net-vip-loirin.marqueskayky81.workers.dev:80";
    }
    return "DIRECT";
}
