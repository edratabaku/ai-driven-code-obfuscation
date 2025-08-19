function y(a, b, c, d) {
    d = typeof d !== 'undefined' ? d : null;

    var e = new ConfigParser(path.join(ROOT, 'config.xml'));
    var f = [];
    var g = !(b || a);

    // Windows
    if (a || g) { // if --win or no arg
        var h = e.getWindowsTargetVersion();
        switch (h.toLowerCase()) {
            case '8':
            case '8.0':
                throw new CordovaError('windows8 platform is deprecated. To use windows-target-version=8.0 you must downgrade to cordova-windows@4.');
            case '8.1':
                f.push(projFiles.win);
                break;
            case '10.0':
            case 'uap':
            case 'uwp':
                f.push(projFiles.win10);
                break;
            default:
                throw new CordovaError('Unsupported windows-target-version value: ' + h);
        }
    }

    // Windows Phone
    if (b || g) { // if --phone or no arg
        var i = e.getWindowsPhoneTargetVersion();
        switch (i.toLowerCase()) {
            case '8.1':
                f.push(projFiles.phone);
                break;
            case '10.0':
            case 'uap':
            case 'uwp':
                if (f.indexOf(projFiles.win10) < 0) {
                    // Already built due to --win or no switches
                    // and since the same thing can be run on Phone as Windows,
                    // we can skip this one.
                    f.push(projFiles.win10);
                }
                break;
            default:
                throw new CordovaError('Unsupported windows-phone-target-version value: ' + i);
        }
    }

    // apply build target override if one was specified
    if (c) {
        switch (c.toLowerCase()) {
            case '8.1':
                f = [projFiles.win, projFiles.phone];
                break;
            case '8.1-phone':
                f = [projFiles.phone];
                break;
            case '8.1-win':
                f = [projFiles.win];
                break;
            case 'uap':
            case 'uwp':
                f = [projFiles.win10];
                break;
            default:
                events.emit('warn', 'Ignoring unrecognized --appx parameter passed to build: "' + c + '"');
                break;
        }
    }

    if (d !== null) {
        // As part of reworking how build and package determine the winning project, set the 'target type' project
        // as part of build configuration.  This will be used for determining the binary to 'run' after build is done.
        if (f.length > 0) {
            switch (f[0]) {
                case projFiles.phone:
                    d.targetProject = 'phone';
                    break;
                case projFiles.win10:
                    d.targetProject = 'windows10';
                    break;
                case projFiles.win:
                    /* falls through */
                default:
                    d.targetProject = 'windows';
                    break;
            }
        }
    }

    return f;
}