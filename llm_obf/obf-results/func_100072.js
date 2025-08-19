function b(a, c) {
    var d;
    c = Microloader.parseResult(c);
    Microloader.remainingCachedAssets--;

    if (!c.error) {
        d = Microloader.checksum(c.content, a.assetConfig.hash);
        if (!d) {
            _warn("Error in cached Asset '" + a.assetConfig.path + "'. This asset will be uncached for future loading");

            // Un cache this asset so it is loaded next time
            a.uncache();
        }

        //<debug>
            _debug("Checksum for Cached Asset: " + a.assetConfig.path + " is " + d);
        //</debug>
        Boot.registerContent(a.assetConfig.path, a.type, c.content);
        a.updateContent(c.content);
        a.cache();
    } else {
        _warn("Error in pre-loading the asset '" + a.assetConfig.path + "'. This asset will be uncached for future loading");

        // Un cache this asset so it is loaded next time
        a.uncache();
    }

    if (Microloader.remainingCachedAssets === 0) {
        Microloader.onCachedAssetsReady();
    }
}