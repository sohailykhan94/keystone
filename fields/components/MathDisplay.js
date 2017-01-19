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
	var	explanation = ({ ...props }.explanation);
	returnVal = returnVal;
	try {
		returnVal = returnVal + '<div style="margin-top: 16px; border: 1px solid #DBDBDB;"><span style="padding: 30px 22px; text-align: center; background-color: #f6f6f6; display: inline-block; color: #41AADB;">A</span><span style="margin-left: 16px;" id="inputMath">' + translateMath(a) + '</span></div>';
		returnVal = returnVal + '<div style="margin-top: 16px; border: 1px solid #DBDBDB;"><span style="padding: 30px 22px; text-align: center; background-color: #f6f6f6; display: inline-block; color: #41AADB;">B</span><span style="margin-left: 16px;" id="inputMath">' + translateMath(b) + '</span></div>';
		returnVal = returnVal + '<div style="margin-top: 16px; border: 1px solid #DBDBDB;"><span style="padding: 30px 22px; text-align: center; background-color: #f6f6f6; display: inline-block; color: #41AADB;">C</span><span style="margin-left: 16px;" id="inputMath">' + translateMath(c) + '</span></div>';
		returnVal = returnVal + '<div style="margin-top: 16px; border: 1px solid #DBDBDB;"><span style="padding: 30px 22px; text-align: center; background-color: #f6f6f6; display: inline-block; color: #41AADB;">D</span><span style="margin-left: 16px;" id="inputMath">' + translateMath(d) + '</span></div>';
		returnVal = returnVal + '<div style="margin-top: 16px; background-color: #f6f6f6; padding: 15px;">' + translateMath(explanation) + '</div>';
	} catch (e) {
		returnVal = returnVal + '<div style="margin-top: 16px; border: 1px solid #DBDBDB;"><span style="padding: 30px 22px; text-align: center; background-color: #f6f6f6; display: inline-block; color: #41AADB;">A</span><span style="margin-left: 16px;" id="inputMath">' + a + '</span></div>';
		returnVal = returnVal + '<div style="margin-top: 16px; border: 1px solid #DBDBDB;"><span style="padding: 30px 22px; text-align: center; background-color: #f6f6f6; display: inline-block; color: #41AADB;">A</span><span style="margin-left: 16px;" id="inputMath">' + b + '</span></div>';
		returnVal = returnVal + '<div style="margin-top: 16px; border: 1px solid #DBDBDB;"><span style="padding: 30px 22px; text-align: center; background-color: #f6f6f6; display: inline-block; color: #41AADB;">A</span><span style="margin-left: 16px;" id="inputMath">' + c + '</span></div>';
		returnVal = returnVal + '<div style="margin-top: 16px; border: 1px solid #DBDBDB;"><span style="padding: 30px 22px; text-align: center; background-color: #f6f6f6; display: inline-block; color: #41AADB;">A</span><span style="margin-left: 16px;" id="inputMath">' + d + '</span></div>';
		returnVal = returnVal + '<div style="margin-top: 16px; background-color: #f6f6f6; padding: 15px;">' + explanation + '</div>';
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
			returnVal = '<span>' + returnVal + '<br/>' + math + '</span>';
		}
	}
	return returnVal;
}

module.exports = MathDisplay;
