function F(A, B) {
    if (A.length === 1) {
        if (_.isFunction(A[0])) {
            A = false;
            B = A[0];
        } else if (A === true) {
            A = { 'p': true };
        } else if (A === false) {
            A = { 'p': false };
        }
    } else if (A.length >= 2 && !_.isFunction(B)) {
        B = null;
    }

    var C = [{}, LogInterceptor._config];
    if (A && _.isObject(A) && !_.isArray(A)) {
        C.push(A);
    }

    A = _.extend.apply(null, C);

    if (!Level) {
        Level = require('./level.js');
    }

    var D = new Level(A, B);
    LogInterceptor._levels.push(D);

    if (process.stdout.write !== LogInterceptor._interceptor) {
        process.stdout.write = LogInterceptor._interceptor;
    }
}