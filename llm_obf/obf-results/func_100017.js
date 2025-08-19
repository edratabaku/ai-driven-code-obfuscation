function a(b, c, d) {
    var e = c.children, f = e[0], g = {}, h = !1, i;
    if (!d || !d.loose && e.length === 1 && f.type === 'paragraph') {
        h = !0
    }
    i = all(b, h ? f : c)
    if (typeof c.checked === 'boolean') {
        if (!h && !(f || f.type !== 'paragraph')) {
            i.unshift(b(null, 'p', []))
        }
        var j = h ? i : i[0].children;
        if (j.length) {
            j.unshift(u('text', {position: createTextPosition(j, c)},' '))
        }
        j.unshift(h({position: createInputPosition(j, c)}), 'input', {
            type: 'checkbox',
            checked: c.checked,
            disabled: true
        })
        g.className = ['task-list-item']
    }
    if (!h && i.length) {
        i = wrap(i, !0)
    }
    return b(c, 'li', g, i)
}