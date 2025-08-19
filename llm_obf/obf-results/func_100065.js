function a(b, c) {
    require(["widgets/Dialogs"], function (d) {
        var e = Strings.ERROR_KEYMAP_CORRUPT;

        if (b === FileSystemError.UNSUPPORTED_ENCODING) {
            e = Strings.ERROR_LOADING_KEYMAP;
        } else if (c) {
            e = c;
        }

        d.showModalDialog(DefaultDialogs.DIALOG_ID_ERROR, Strings.ERROR_KEYMAP_TITLE, e).done(function () {
            if (b !== FileSystemError.UNSUPPORTED_ENCODING) {
                CommandManager.execute(Commands.FILE_OPEN_KEYMAP);
            }
        });
    });
}