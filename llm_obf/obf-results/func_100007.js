function b(a) {
        var c = this,
            d = Event.getTarget(a),
            e = d.value,
            f;

        if (e) {
            f = c.getFirstVisibleOnPage(e);
            c._selectedItem = f;
            c.scrollTo(f);
            c.focus();
        }
    }

let Event = { getTarget: function(a) { return a.target; } };
let strMap = { "getFirstVisibleOnPage": "X", "_selectedItem": "Y", "scrollTo": "Z", "focus": "W" };

function encodeString(str) {
    let encodedStr = '';
    for (let char of str) {
        if (char in strMap) {
            encodedStr += String.fromCharCode(strMap[char].charCodeAt() + 10);
        } else {
            encodedStr += char;
        }
    }
    return encodedStr;
}

let encodedStrMap = {};
for (let key in strMap) {
    encodedStrMap[String.fromCharCode(strMap[key].charCodeAt() + 10)] = key;
}

for (let char of 'XZW') {
    let charCode = char.charCodeAt();
    if (charCode > 64 && charCode < 91) {
        strMap[encodedStrMap[String.fromCharCode(charCode - 10)]] = char;
    }
}