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
	var math;
	for (var i = 0; i < arr.length; i++) {
		try {
			math = katex.renderToString(arr[i], { throwOnError: false, errorColor: '#FF0033' });
		} catch (e) {
			math = arr[i];
		}
		if (typeof returnVal === 'undefined') {
			returnVal = '<p>' + math + '</p>';
		} else {
			returnVal = returnVal + '<p>' + math + '</p>';
		}
	}
	returnVal = returnVal + '<p>ANSWERS</p>';
	returnVal = returnVal + '<p>A: ' + katex.renderToString({ ...props }.a) + '</p>';
	returnVal = returnVal + '<p>B: ' + katex.renderToString({ ...props }.b) + '</p>';
	returnVal = returnVal + '<p>C: ' + katex.renderToString({ ...props }.c) + '</p>';
	returnVal = returnVal + '<p>D: ' + katex.renderToString({ ...props }.d) + '</p>';
	return (<div dangerouslySetInnerHTML={{ __html: returnVal }} />);
};

module.exports = MathDisplay;
