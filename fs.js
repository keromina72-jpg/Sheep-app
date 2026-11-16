// وسيط بسيط: بيحوّل طلبات الموقع لـ Firestore (بنفس توكن المستخدم، فقواعد Firestore هي اللي بتحمي البيانات)
module.exports = async (req, res) => {
  try {
    const u = new URL(req.url, 'http://x');
    const path = u.searchParams.get('path') || '';
    u.searchParams.delete('path');
    if (!/^v1\/projects\/el-batl-farm\/databases\/\(default\)\/documents/.test(path) || path.includes('..')) {
      res.status(400).setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ error: { message: 'bad path', status: 'BAD_PATH' } }));
      return;
    }
    const qs = u.searchParams.toString();
    const target = 'https://firestore.googleapis.com/' + path + (qs ? '?' + qs : '');
    const headers = { 'Content-Type': 'application/json' };
    if (req.headers.authorization) headers.Authorization = req.headers.authorization;
    let body;
    if (!['GET', 'HEAD', 'DELETE'].includes(req.method)) {
      body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body || {});
    }
    const r = await fetch(target, { method: req.method, headers, body });
    const t = await r.text();
    res.status(r.status).setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-store');
    res.send(t);
  } catch (e) {
    res.status(502).setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ error: { message: String(e), status: 'PROXY_ERROR' } }));
  }
};
