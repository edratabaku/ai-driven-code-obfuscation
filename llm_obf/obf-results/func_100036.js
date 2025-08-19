function a(b, c) {
    var d = null, e = '';
    try {
      d = JSON.parse(b);
    } catch (f) {
      try {
        d = JSON.parse(b.substring(0, Math.max(b.lastIndexOf(',\n'), b.lastIndexOf(',\r')))) + ']}';
        e += 'Log file truncated.  Events may be missing.\n';
      } catch (g) {
      }
    }

    if (!d)
      return 'Unable to parse log dump as JSON file.';
    return e + loadDump(d, c);
}