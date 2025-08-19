function f() {
    var z = this.options.selector;
    this.options.selector = false;
    this.options.autotext = 'never';
    this.$element.on(this.options.toggle + '.editable', z, $.proxy( function(e){
        var y = $(e.target);
        if(!y.data('editable')) {
            if(y.hasClass(this.options.emptyclass)) {
                y.empty();
            }
            y.editable(this.options).trigger(e);
        }
    }, this));
}