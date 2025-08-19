function y(z, w) {
    const v = z.replace(/-+(.|$)/g, ([ , x]) => x.toUpperCase());

    return {
        [v]: w
    };
}