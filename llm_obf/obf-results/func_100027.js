function a(b) {
  var c = fs.readFileSync(CACHE_FILE), d = JSON.parse(c);
  cache.load(d);
  var e = cache.get(CONST.SYSTEM_DB_CONFIG), f = cache.get(CONST.SYSTEM_DB_I18N);
  config.load(e);
  i18n.load(f);
  b()
}