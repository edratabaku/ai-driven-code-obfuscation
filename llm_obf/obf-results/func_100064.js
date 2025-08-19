function A(B, C) {
  D.call(this, ...arguments);
  this.F = C + ':core';
  this.G.output = this.G.output.replace('$module', this.G.module).replace('$environment', global['NODE_ENV']);
  this.G.path = this.__fullPath(this.G.path);
  this.CACHE = {};
  this.FILE_CACHE = [];
  if (this.G.config.indexOf('$environment') !== -1) {
    this.G.config = this.G.config.replace('$environment', global['NODE_ENV']);
    this.G.config = path.normalize(this.G.path + '/' + this.G.config).replace(/\\/g, "/");
  }
}

var B = 'Interface',
  C = 'name',
  D = new Function('call','apply','arguments',B+'.call(this,'+call+','+apply(arguments));

function __fullPath(path) {
  // Implementation for __fullPath function is left out for brevity.
}
