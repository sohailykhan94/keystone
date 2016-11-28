import Field from '../Field';
import React from 'react';
import { Button, FormInput } from '../../../admin/client/App/elemental';
import MathDisplay from '../../components/MathDisplay';

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
				value: this.props.value + ' ' + templateString,
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
			width: 320,
			height: 568,
			backgroundColor: '#fff',
			border: '1px solid #666',
			padding: 15,
			fontSize: this.props.values.fontSize,
			overflowY: 'scroll',
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
					<MathDisplay data={value} a={this.props.values.optionA} b={this.props.values.optionB}
						c={this.props.values.optionC} d={this.props.values.optionD} />
				</p>
			</div>
		);
	},
});
