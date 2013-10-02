//filename js2nl.js

var cssFolder = 'css/';

var scriptEl = document.currentScript;
var stylesheet = cssFolder + scriptEl.getAttribute('data-css');

xmlhttp = new XMLHttpRequest();
xmlhttp.open('GET', stylesheet, false);
xmlhttp.send();

var css = xmlhttp.response;
var parser = {
	parseCSS: function(css) {
	    var rules = {};
	    css = this.removeComments(css);
	    var blocks = css.split('}');
	    blocks.pop();
	    var len = blocks.length;
	    for (var i = 0; i < len; i++)
	    {
	        var pair = blocks[i].split('{');

	        //console.log(pair);
	       rules[pair[0].trim()] = this.parseCSSBlock(pair[1]);
	    }
	    return rules;
	},

	parseCSSBlock: function(css) { 
	    var rule = {};
	    var declarations = css.split(';');
	    declarations.pop();
	    var len = declarations.length;
	    for (var i = 0; i < len; i++)
	    {
	        var loc = declarations[i].indexOf(':');
	        var property = declarations[i].substring(0, loc).trim();
	        var value = declarations[i].substring(loc + 1).trim();

	        if (property != "" && value != "")
	            rule[property] = value;
	    }
	    return rule;
	},

	removeComments: function(css) {
	    return css.replace(/\/\*(\r|\n|.)*\*\//g,"");
	}
}

window.onload = function() {
	var rules = parser.parseCSS(css);
	for (var rule in rules) {
		var finalStyle = '';
		var el = document.querySelectorAll(rule);
		var styleBlock = rules[rule];

		for (var style in styleBlock) {
			finalStyle += style+':'+styleBlock[style]+';';
		}
		
		// apply the styles
		for (i=0;i<el.length;i++) {
			el[i].setAttribute('style', finalStyle);
		}
		
	}
};






