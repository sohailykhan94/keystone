import Field from '../Field';
import React from 'react';
import { FormInput } from '../../../admin/client/App/elemental';
import MathDisplay from '../../components/MathDisplay';

import FileChangeMessage from '../../components/FileChangeMessage';
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
				<MathDisplay data={value} />
			</div>
		);
	},
});
