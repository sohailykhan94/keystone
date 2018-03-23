import Field from '../Field';
import React from 'react';
import { Button, FormInput } from '../../../admin/client/App/elemental';
import { btnStyling } from '../../styles';
var MathJax = require('react-mathjax/src');

module.exports = Field.create({
	defaultValue: 'HelloWorlds',
	displayName: 'TextareaStudyGuide',
	statics: {
		type: 'TextareaStudyGuide',
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
				<Button variant="hollow" style={btnStyling} size="xsmall" onClick={() => this.triggerTemplater('/image {image_1}')}>
					Image 1
				</Button>
				<Button variant="hollow" style={btnStyling} size="xsmall" onClick={() => this.triggerTemplater('/image {image_2}')}>
					Image 2
				</Button>
				<Button variant="hollow" style={btnStyling} size="xsmall" onClick={() => this.triggerTemplater('/image {image_3}')}>
					Image 3
				</Button>
				<Button variant="hollow" style={btnStyling} size="xsmall" onClick={() => this.triggerTemplater('/image {image_4}')}>
					Image 4
				</Button>
				<Button variant="hollow" style={btnStyling} size="xsmall" onClick={() => this.triggerTemplater('/image {image_5}')}>
					Image 5
				</Button>
			</div>
		);
	},

	renderImages (value, imagesArr) {
		let currentValue = value;
		const { hasLatex } = this.props.values;
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
									hasLatex ? (
										<MathJax.Context>
											<span><MathJax.Node inline>{preImgString}</MathJax.Node></span>
										</MathJax.Context>
									) : <p>{preImgString}</p>
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
					hasLatex ? (
						<MathJax.Context>
							<span><MathJax.Node inline>{currentValue}</MathJax.Node></span>
						</MathJax.Context>
					) : <p>{ currentValue }</p>
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

		const { hasLatex } = this.props.values;

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
							hasLatex ? (
								<MathJax.Context>
									<span><MathJax.Node inline>{value}</MathJax.Node></span>
								</MathJax.Context>
							) : <p>{ value }</p>
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
				{ this.getButtonsTemplate() }
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
