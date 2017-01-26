var TemplateEngine = function(html, data) {
    return TemplateEngine['render'].apply(TemplateEngine, arguments);
};

(function (exports, global) {
    exports.render = function(html, data) {
        var re = /<%([^%]+)?%>/g, reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g, code = 'var r=[];\n', cursor = 0;
        var add = function(line, js) {
            js? (code += line.match(/^=/g) ? 'r.push(' + line.replace(/^=/g, "") + ');\n' : line + '\n') :
                (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');

            return add;
        }

        while(match = re.exec(html)) {
            add(html.slice(cursor+1, match.index))(match[1], true);
            cursor = match.index + match[0].length;
        }

        add(html.substr(cursor, html.length - cursor));
        code += 'return r.join("");';

        return new Function(code.replace(/[\r\t\n]/g, '')).apply( data );
    }

    exports.helper = function (name, helper) {
        global[name] = helper;
    };

})(TemplateEngine, window);