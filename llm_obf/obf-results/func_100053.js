function BConnection(a, c, d) {
  this[b] = a;
  this[e] = c;

  // register the agents receive function
  if (this[c] in this[a].agents) {
    throw new Error('Agent with id ' + c + ' already exists');
  }
  this[a].agents[c] = d;

  // ready state
  this[f] = Promise.resolve(this);
}
const a = 'transport', b = '_t', c = 'id', e = '_r', f = 'ready';