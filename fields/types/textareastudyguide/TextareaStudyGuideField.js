import Field from '../Field';
import React from 'react';
import { FormInput } from '../../../admin/client/App/elemental';
var MathJax = require('react-mathjax/src');

module.exports = Field.create({
	defaultValue: 'HelloWorlds',
	displayName: 'TextareaStudyGuide',
	statics: {
		type: 'TextareaStudyGuide',
	},

	renderImages (value, imagesArr) {
		let currentValue = value;
		const imageStyle = {
			maxWidth: '246px',
			margin: '0 auto',
			display: 'block',
			marginTop: '1rem',
			marginBottom: '1rem',
		};

		return (
			<div>
				{
					imagesArr.map((image, index) => {
						const imageSplit = currentValue.split(image);
						const preImgString = imageSplit[0];
						currentValue = imageSplit[1];
						const FIELD_REGEX = /{([^\s}]+)}/g;
						const fieldName = FIELD_REGEX.exec(image)[1];
						const uploadedImage = this.props.values[fieldName];

						return (
							<div key={index}>
								{
									!!preImgString && (
										<MathJax.Context>
											<span><MathJax.Node inline>{preImgString}</MathJax.Node></span>
										</MathJax.Context>
									)
								}
								{
									uploadedImage && (
										<img style={imageStyle} src={uploadedImage.url} />
									)
								}
							</div>
						);
					})
				}
				{
					!!currentValue && (
						<MathJax.Context>
							<span><MathJax.Node inline>{currentValue}</MathJax.Node></span>
						</MathJax.Context>
					)
				}
			</div>
		);
	},

	getPreviewTemplate (value) {
		const stylesIphone = {
			width: 328,
			backgroundColor: '#fff',
			border: '1px solid #666',
			padding: 24,
			fontSize: this.props.values.fontSize,
			overflowY: 'scroll',
			position: 'relative',
		};

		const absoluteBorder = {
			position: 'absolute',
			top: 0,
			left: 0,
			height: '100%',
			width: '100%',
			border: '24px solid rgba(144, 0, 0, 0.5)',
		};

		const IMAGE_REGEX = /\/image\s*{([^\s}]+)}/g;

		return (
			<p style={stylesIphone}>
				<div style={absoluteBorder} />
				<div>
					{
						value && value.match(IMAGE_REGEX) ? (
							this.renderImages(value, value.match(IMAGE_REGEX))
						) : (
							<MathJax.Context>
								<span><MathJax.Node inline>{value}</MathJax.Node></span>
							</MathJax.Context>
						)
					}
				</div>
			</p>
		);
	},

	renderField () {
		const { height, path, style, value } = this.props;
		const styles = {
			marginTop: '1em',
			height: height,
			lineHeight: '1.3',
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
				{ this.getPreviewTemplate(value) }
			</div>
		);
	},
});
