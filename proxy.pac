function FindProxyForURL(url, host) {
    if (shExpMatch(host, "config.uca.cloud.unity3d.com")) {
        return "PROXY net-vip-loirin.marqueskayky81.workers.dev:80";
    }
    return "DIRECT";
}
