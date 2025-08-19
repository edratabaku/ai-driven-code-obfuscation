function a(b, c, d, e, f) {
  var g = (c.type == common.DEBUG);

  // Standard options:
  var h = [
    '-jar',
    JS_COMPILER_PATH,
    '--compilation_level',
    g ? 'SIMPLE_OPTIMIZATIONS' : 'ADVANCED_OPTIMIZATIONS',
    '--module_output_path_prefix',
    d.tmp
  ];

  // Debug- and release-specific options:
  if (g) {
    h.push('--formatting');
    h.push('PRETTY_PRINT');
  } else {
    h.push('--define');
    h.push('goog.DEBUG=false');
  }

  if (b.jsWarningsWhitelistFile) {
    h.push('--warnings_whitelist_file');
    h.push(b.jsWarningsWhitelistFile);
  }

  b.jsExterns.forEach(function(i) {
    h.push('--externs');
    h.push(i);
  });

  // TODO: Consider support for --process_jquery_primitives.

  // No-op if there is no JS that needs to be compiled.
  var j = getModulesToCompile(f, e);
  if (j.length == 0) {
    return kew.resolve(null);
  }

  // List input files for each module with JS files to be compiled.
  j.forEach(function(k) {
    h.push('--module');
    h.push(k.name + ':' +
        k.compiledInputFiles.length + ':' +
        k.alwaysLoadedAfterModules.join(','));

    k.compiledInputFiles.forEach(function(l) {
      h.push('--js');
      h.push(l);
    });
  });

  // Launch JS compiler in a child process.
  var m = buildOptions.javaCommand, n = stderrBehavior = buildOptions.suppressOutput ? 'ignore' : process.stderr;
  var o = child_process.spawn(m, h, {stdio: ['ignore', 'pipe', n]});

  var p = kew.defer();
  o.on('close', function(q) {
    if (q == common.EXIT_SUCCESS) {
      p.resolve(null);
    } else {
      p.reject(new Error('Had errors compiling JavaScript'));
    }
  });
  return p;
}