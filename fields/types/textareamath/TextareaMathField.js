import Field from '../Field';
import React from 'react';
import { FormInput } from '../../../admin/client/App/elemental';
import MathDisplay from '../../components/MathDisplay';

module.exports = Field.create({
	displayName: 'TextareaMathField',
	statics: {
		type: 'TextareaMath',
	},
	renderField () {
		const { height, path, style, value } = this.props;
		const styles = {
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
