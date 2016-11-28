var katex = require('katex');
var React = require('react');

function MathDisplay ({ ...props }) {
	if (typeof { ...props }.data === 'undefined') {
		var noInput = '<p>Please input a question...</p>';
		return (<div dangerouslySetInnerHTML={{ __html: noInput }} />);
	}
	var returnVal;
	returnVal = translateMath({ ...props }.data);
	var a = ({ ...props }.a);
	var	b = ({ ...props }.b);
	var	c = ({ ...props }.c);
	var	d = ({ ...props }.d);
	returnVal = returnVal + '<p><strong>ANSWERS</strong></p>';
	try {
		returnVal = returnVal + '<span>A: ' + translateMath(a) + '</span>';
		returnVal = returnVal + '<span><br />B: ' + translateMath(b) + '</span>';
		returnVal = returnVal + '<span><br />C: ' + translateMath(c) + '</span>';
		returnVal = returnVal + '<span><br />D: ' + translateMath(d) + '</span>';
	} catch (e) {
		returnVal = returnVal + '<span>A: ' + a + '</span>';
		returnVal = returnVal + '<span><br />B: ' + b + '</span>';
		returnVal = returnVal + '<span><br />C: ' + c + '</span>';
		returnVal = returnVal + '<span><br />D: ' + d + '</span>';
	}
	return (<div dangerouslySetInnerHTML={{ __html: returnVal }} />);
};

function translateMath (input) {
	var returnVal;
	var arr = input.split('\\\\');
	var math;
	for (var i = 0; i < arr.length; i++) {
		try {
			math = katex.renderToString(arr[i], { throwOnError: false, errorColor: '#FF0033' });
		} catch (e) {
			math = arr[i];
		}
		if (typeof returnVal === 'undefined') {
			returnVal = '<span>' + math + '</span>';
		} else {
			returnVal = returnVal + '<span><br />' + math + '</span>';
		}
	}
	return returnVal;
}

module.exports = MathDisplay;
