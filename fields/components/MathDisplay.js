var katex = require('katex');
var React = require('react');

function MathDisplay ({ ...props }) {
	var math = katex.renderToString({ ...props }.data);
	return (<p dangerouslySetInnerHTML={{ __html: math }}/>);
};

module.exports = MathDisplay;
