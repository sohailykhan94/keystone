import Field from '../Field';
import React from 'react';
import { Button, FormInput } from '../../../admin/client/App/elemental';
import { btnStyling } from '../../styles';

module.exports = Field.create({
	displayName: 'TextareaKatexField',
	statics: {
		type: 'TextareaKatex',
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
	getButtonsTemplate () {
		return (
			<div>
				<Button variant="hollow" style={btnStyling} size="xsmall" onClick={() => this.triggerTemplater('\\\\')}>
					New Line
				</Button>
				<Button variant="hollow" style={btnStyling} size="xsmall" onClick={() => this.triggerTemplater('\\frac{x}{y}')}>
					Fraction
				</Button>
				<Button variant="hollow" style={btnStyling} size="xsmall" onClick={() => this.triggerTemplater('\\text{Enter text here}')}>
					Text
				</Button>
				<Button variant="hollow" style={btnStyling} size="xsmall" onClick={() => this.triggerTemplater('\\lim_{x \\to \\infty}')}>
					Limit
				</Button>
				<Button variant="hollow" style={btnStyling} size="xsmall" onClick={() => this.triggerTemplater('\\infty')}>
					Infinity Symbol
				</Button>
				<Button variant="hollow" style={btnStyling} size="xsmall" onClick={() => this.triggerTemplater('_{n+1}')}>
					Subscript
				</Button>
				<Button variant="hollow" style={btnStyling} size="xsmall" onClick={() => this.triggerTemplater('^{n+1}')}>
					Superscript
				</Button>
				<Button variant="hollow" style={btnStyling} size="xsmall" onClick={() => this.triggerTemplater('\\binom{n}{k}')}>
					Binomial
				</Button>
				<Button variant="hollow" style={btnStyling} size="xsmall" onClick={() => this.triggerTemplater('\\sqrt{x}')}>
					Square root
				</Button>
				<Button variant="hollow" style={btnStyling} size="xsmall" onClick={() => this.triggerTemplater('\\sqrt[n]{x}')}>
					n root
				</Button>
				<Button variant="hollow" style={btnStyling} size="xsmall" onClick={() => this.triggerTemplater('\\sum_{i=1}^{10} t_i')}>
					Sum
				</Button>
				<Button variant="hollow" style={btnStyling} size="xsmall" onClick={() => this.triggerTemplater('\\int\\limits_a^b')}>
					Integral
				</Button>
				<Button variant="hollow" style={btnStyling} size="xsmall" onClick={() => this.triggerTemplater('\\oint')}>
					O Integral
				</Button>
			</div>
		);
	},
	renderField () {
		const { height, path, style, value } = this.props;

		const styles = {
			height: height,
			...style,
			lineHeight: '1.3',
		};
		return (
			<div>
				{this.props.values.hasLatex ? this.getButtonsTemplate() : <div />}
				<FormInput
					autoComplete="off"
					multiline
					name={this.getInputName(path)}
					onChange={this.valueChanged}
					ref="focusTarget"
					style={styles}
					value={value}
				/>
			</div>
		);
	},
});
