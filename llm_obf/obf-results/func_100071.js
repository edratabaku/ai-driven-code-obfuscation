function c(nV, nA, bN, fV, mV, nO, i) {
    var r = nV.split('OPR/')[1].split(' ')[0];
    if (isOpera) return {
        fullVersion: r,
        version: parseInt(r.split('.')[0]),
        name: 'Opera',
        isPrivateBrowsing: false
    };

    var vO = nA.indexOf('rv:');
    if (vO > 0) {
        fV = nA.substring(vO + 3);
    } else {
        vO = nA.indexOf('MSIE');
        fV = nA.substring(vO + 5);
    }
    bN = 'IE';

    var eV = nA.indexOf('Chrome');
    if (eV !== -1) {
        bN = 'Chrome';
        fV = nA.substring(eV + 7);
    }

    if ((nO = nA.lastIndexOf(' ') + 1) < (vO = nA.lastIndexOf('/'))) {
        bN = nA.substring(nO, vO);
        fV = nA.substring(vO + 1);

        if (bN.toLowerCase() === bN.toUpperCase()) {
            bN = navigator.appName;
        }
    }

    if (isEdge) {
        bN = 'Edge';
        fV = nA.split('Edge/')[1];
    }

    if ((i = fV.search(/[; \)]/)) !== -1) {
        fV = fV.substring(0, i);
    }

    mV = parseInt('' + fV, 10);

    if (isNaN(mV)) {
        fV = '' + parseFloat(nV);
        mV = parseInt(nV, 10);
    }

    return {
        fullVersion: fV,
        version: mV,
        name: bN,
        isPrivateBrowsing: false
    };
}