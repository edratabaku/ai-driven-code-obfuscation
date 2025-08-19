function a(b) {
    var c = node.previousSibling,
        d = (b && b.nodeTypes) ? b.nodeTypes : defaultNodeTypes;

    if (!c) {
      return null;
    }

    if (
      !wysihtml5.lang.array(d).includes(c.nodeType) || // nodeTypes check.
      (b && b.ignoreBlankTexts && _isBlankText(c)) // Blank text nodes bypassed if set
    ) {
      return wysihtml5.dom.domNode(c).prev(b);
    }

    return c;
  }