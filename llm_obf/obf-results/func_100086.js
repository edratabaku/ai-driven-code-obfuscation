function a(params) {
    this.b = 'graphic';
    this.c = []; // Position dependency added later if relative positioning is true.

    params = _.extend({
        d: 1,
        e: {
            x: 0.5,
            y: 0.5
        },
        f: true,
        g: {
            x: 1,
            y: 1
        },
        h: 0xffffff,
        i: {
            x: 0,
            y: 0
        },
        j: true,
        k: 0
    }, params);

    if (params.f) {
        this.c.push('position');
    }

    this.d = params.d;
    this.e = params.e;
    this.f = params.f;
    this.g = params.g;
    this.h = params.h;
    this.i = params.i;
    this.j = params.j;
    this.k = params.k;

}