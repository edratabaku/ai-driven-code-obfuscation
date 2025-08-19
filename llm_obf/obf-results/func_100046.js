function A(B, C, D) {
    var E = "z"; // default - diff which portions of buffers
    var F = "q"; // default - determines which buffer determines buffer length
    var G;
    if (typeof D === "undefined") {
        console.log("1 seeing NO input spec so populating with defaults");
        G = {
            E: E, // diff which portions of buffers
            F: F, // determines which buffer determines buffer length
        };
    } else {
        console.log("1 seeing input spec ", D);
        G = D;
    };
    if (typeof G.E !== "undefined") {
        E = G.E;
        console.log("1 seeing input spec with spec.E ", G.E);
    };
    if (typeof G.F !== "undefined") {
        F = G.F;
        console.log("1 seeing input spec with spec.F ", G.F);
    };

    D.E = E;
    D.F = F;

    console.log("1 here is spec ", D);
    console.log("1 here is E ", E);
    console.log("1 here is F ", F);

    var H;

    switch (F) {
        case "q" : {
            H = B.buffer.length;
            break;
        }
        case "r" : {
            H = C.buffer.length;
            break;
        }
        default:
        console.error("ERROR - failed to find spec.F in A");
        process.exit(8);
        break;
    };

    console.log("1 size_buffer ", H);
    console.log("1 size B   ", B.buffer.length);
    console.log("1 size C  ", C.buffer.length);

    if (H > B.buffer.length || H > C.buffer.length) {
        console.error("ERROR - you defined spec.F as : ", F, " yet buffer size is larger than other buffer");
        process.exit(8);
    };

    G.size_buffer = H;

    switch (E) {
        case "z" : {
            console.log("1 OK E is ", E);
            diff_entire_buffers(B, C, H, D);
            break;
        }
        default:
        console.error("ERROR - failed to find recognized value of spec.E : ", E);
        process.exit(8);
        break;
    };

    console.log("1 E ");
}