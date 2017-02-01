import Field from '../Field';
import React from 'react';
import { Button, FormInput } from '../../../admin/client/App/elemental';
var MathJax = require('react-mathjax/src');

module.exports = Field.create({
	defaultValue: 'HelloWorlds',
	displayName: 'TextareaMathField',
	statics: {
		type: 'TextareaMath',
	},

	// HELPERS
	triggerTemplater (templateString) {
		var val = {
			target: {
				value: this.props.value ? (this.props.value + ' ' + templateString) : templateString,
			},
		};
		this.valueChanged(val);
	},
	renderField () {
		const { height, path, style, value } = this.props;
		const styles = {
			marginTop: '1em',
			height: height,
			...style,
		};

		const stylesIphone = {
			width: 358,
			height: 568,
			backgroundColor: '#fff',
			border: '1px solid #666',
			padding: 15,
			fontSize: this.props.values.fontSize,
			overflowY: 'scroll',
			boxShadow: 'inset 0 0 0 15px rgba(144, 0, 0, 0.5)',
		};
		return (
			<div>
				<Button variant="hollow" size="xsmall" onClick={() => this.triggerTemplater('\\\\')}>
					New Line
				</Button>
				<Button variant="hollow" size="xsmall" onClick={() => this.triggerTemplater('\\frac{x}{y}')}>
					Fraction
				</Button>
				<Button variant="hollow" size="xsmall" onClick={() => this.triggerTemplater('\\text{Enter text here}')}>
					Text
				</Button>
				<Button variant="hollow" size="xsmall" onClick={() => this.triggerTemplater('\\lim_{x \\to \\infty}')}>
					Limit
				</Button>
				<Button variant="hollow" size="xsmall" onClick={() => this.triggerTemplater('\\infty')}>
					Infinity Symbol
				</Button>
				<Button variant="hollow" size="xsmall" onClick={() => this.triggerTemplater('_{n+1}')}>
					Subscript
				</Button>
				<Button variant="hollow" size="xsmall" onClick={() => this.triggerTemplater('^{n+1}')}>
					Superscript
				</Button>
				<Button variant="hollow" size="xsmall" onClick={() => this.triggerTemplater('\\binom{n}{k}')}>
					Binomial
				</Button>
				<Button variant="hollow" size="xsmall" onClick={() => this.triggerTemplater('\\sqrt{x}')}>
					Square root
				</Button>
				<Button variant="hollow" size="xsmall" onClick={() => this.triggerTemplater('\\sqrt[n]{x}')}>
					n root
				</Button>
				<Button variant="hollow" size="xsmall" onClick={() => this.triggerTemplater('\\sum_{i=1}^{10} t_i')}>
					Sum
				</Button>
				<Button variant="hollow" size="xsmall" onClick={() => this.triggerTemplater('\\int\\limits_a^b')}>
					Integral
				</Button>
				<Button variant="hollow" size="xsmall" onClick={() => this.triggerTemplater('\\oint')}>
					O Integral
				</Button>
				<FormInput
					autoComplete="off"
					multiline
					name={this.getInputName(path)}
					onChange={this.valueChanged}
					ref="focusTarget"
					style={styles}
					value={value}
				/>
				<p style={stylesIphone}>
					<div>
						<MathJax.Context>
							<span><MathJax.Node inline>{value}</MathJax.Node></span>
						</MathJax.Context>
						<MathJax.Context>
							<div style={{ marginTop: '16px', border: '1px solid #DBDBDB' }}><span style={{ padding: '30px 22px', textAlign: 'center', backgroundColor: '#f6f6f6', display: 'inline-block', color: '#41AADB' }}>A</span><span style={{ marginLeft: 16 + 'px' }}><MathJax.Node inline>{ this.props.values.optionA }</MathJax.Node></span></div>
						</MathJax.Context>
						<MathJax.Context>
							<div style={{ marginTop: '16px', border: '1px solid #DBDBDB' }}><span style={{ padding: '30px 22px', textAlign: 'center', backgroundColor: '#f6f6f6', display: 'inline-block', color: '#41AADB' }}>A</span><span style={{ marginLeft: 16 + 'px' }}><MathJax.Node inline>{ this.props.values.optionB }</MathJax.Node></span></div>
						</MathJax.Context>
						<MathJax.Context>
							<div style={{ marginTop: '16px', border: '1px solid #DBDBDB' }}><span style={{ padding: '30px 22px', textAlign: 'center', backgroundColor: '#f6f6f6', display: 'inline-block', color: '#41AADB' }}>A</span><span style={{ marginLeft: 16 + 'px' }}><MathJax.Node inline>{ this.props.values.optionC }</MathJax.Node></span></div>
						</MathJax.Context>
						<MathJax.Context>
							<div style={{ marginTop: '16px', border: '1px solid #DBDBDB' }}><span style={{ padding: '30px 22px', textAlign: 'center', backgroundColor: '#f6f6f6', display: 'inline-block', color: '#41AADB' }}>A</span><span style={{ marginLeft: 16 + 'px' }}><MathJax.Node inline>{ this.props.values.optionD }</MathJax.Node></span></div>
						</MathJax.Context>
						<MathJax.Context>
							<div style={{ marginTop: '16px', backgroundColor: '#f6f6f6', padding: '15px' }}><MathJax.Node inline>{ this.props.values.explanation }</MathJax.Node></div>
						</MathJax.Context>
					</div>
				</p>
			</div>
		);
	},
});
