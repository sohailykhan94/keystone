var katex = require('katex');
var React = require('react');

function MathDisplay ({ ...props }) {
	if (typeof { ...props }.data === 'undefined') {
		var noInput = '<p>Please input a question...</p>';
		return (<div dangerouslySetInnerHTML={{ __html: noInput }} />);
	}
	var returnVal;
	var text = { ...props }.data;
	var arr = text.split('\\\\');
	for (var i = 0; i < arr.length; i++) {
		var math = katex.renderToString(arr[i], { throwOnError: false, errorColor: '#FF0033' });
		if (typeof returnVal === 'undefined') {
			returnVal = '<p>' + math + '</p>';
		} else {
			returnVal = returnVal + '<p>' + math + '</p>';
		}
	}
	return (<div dangerouslySetInnerHTML={{ __html: returnVal }} />);
};

module.exports = MathDisplay;
