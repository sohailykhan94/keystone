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
		console.log(this);
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
			fontSize: this.props.values.fontSize
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
					<MathDisplay data={value} />
				</p>
			</div>
		);
	},
});
