export default {
  async fetch(request, env) {
    const userID = 'd342d11e-d424-4583-b36e-524ab1f0afa4';
    const url = new URL(request.url);
    const host = request.headers.get('Host');

    if (url.pathname === `/${userID}`) {
      return new Response(`vless://${userID}@${host}:443?encryption=none&security=tls&sni=${host}&fp=random&type=ws&host=${host}&path=%2F%3Fed%3D2048#LOIRIN-VIP`, {
        headers: { 'content-type': 'text/plain; charset=utf-8' },
      });
    }
    return new Response('Servidor Online ', { status: 200 });
  },
};
