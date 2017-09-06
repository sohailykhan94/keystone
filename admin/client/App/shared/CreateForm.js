/**
 * The form that's visible when "Create <ItemName>" is clicked on either the
 * List screen or the Item screen
 */

import React from 'react';
import assign from 'object-assign';
import vkey from 'vkey';
import AlertMessages from './AlertMessages';
import { Fields } from 'FieldTypes';
import InvalidFieldType from './InvalidFieldType';
import { Button, Form, Modal } from '../elemental';
import _ from 'lodash';

const CreateForm = React.createClass({
	displayName: 'CreateForm',
	propTypes: {
		err: React.PropTypes.object,
		isOpen: React.PropTypes.bool,
		list: React.PropTypes.object,
		onCancel: React.PropTypes.func,
		onCreate: React.PropTypes.func,
	},
	getDefaultProps () {
		return {
			err: null,
			isOpen: false,
		};
	},
	getInitialState () {
		// Set the field values to their default values when first rendering the
		// form. (If they have a default value, that is)
		var values = {};
		Object.keys(this.props.list.fields).forEach(key => {
			var field = this.props.list.fields[key];
			var FieldComponent = Fields[field.type];
			values[field.path] = FieldComponent.getDefaultValue(field);
		});

		Object.keys(this.props.list.fields).forEach(key => {
			var field = this.props.list.fields[key];
			if (field.type === 'relationship' && typeof field.filters === 'object') {
				var reg = /^:/;
				Object.keys(field.filters).forEach(filterKey => {
					var filterField = field.filters[filterKey];
					if (reg.test(filterField)) {
						if (!_.has(this.dependsMap, filterKey)) {
							this.dependsMap[filterKey] = [];
						}
						this.dependsMap[filterKey].push(key);
						this.props.list.fields[filterKey].cacheAsyncOptions = false;
					}
				});
			}
		});

		return {
			values: values,
			alerts: {},
		};
	},
	componentDidMount () {
		document.body.addEventListener('keyup', this.handleKeyPress, false);
	},
	componentWillUnmount () {
		document.body.removeEventListener('keyup', this.handleKeyPress, false);
	},
	dependsMap: {},
	resetDependentFieldsOfField: function (fieldName, values) {
		if (_.has(this.dependsMap, fieldName)) {
			var fieldNames = this.dependsMap[fieldName];
			Object.keys(fieldNames).forEach(key => {
				var dependentFieldName = fieldNames[key];
				values[dependentFieldName] = null;
				this.resetDependentFieldsOfField(dependentFieldName, values);
			});
		}
	},
	handleKeyPress (evt) {
		if (vkey[evt.keyCode] === '<escape>') {
			this.props.onCancel();
		}
	},
	// Handle input change events
	handleChange (event) {
		var values = assign({}, this.state.values);
		values[event.path] = event.value;
		this.resetDependentFieldsOfField(event.path, values);
		this.setState({
			values: values,
		});
	},
	// Set the props of a field
	getFieldProps (field) {
		var props = assign({}, field);
		props.value = this.state.values[field.path];
		props.values = this.state.values;
		props.onChange = this.handleChange;
		props.mode = 'create';
		props.key = field.path;
		return props;
	},
	// Create a new item when the form is submitted
	submitForm (event) {
		event.preventDefault();
		const createForm = event.target;
		const formData = new FormData(createForm);
		this.props.list.createItem(formData, (err, data) => {
			if (data) {
				if (this.props.onCreate) {
					this.props.onCreate(data);
				} else {
					// Clear form
					this.setState({
						values: {},
						alerts: {
							success: {
								success: 'Item created',
							},
						},
					});
				}
			} else {
				if (!err) {
					err = {
						error: 'connection error',
					};
				}
				// If we get a database error, show the database error message
				// instead of only saying "Database error"
				if (err.error === 'database error') {
					err.error = err.detail.errmsg ? err.detail.errmsg : err.detail;
				}
				this.setState({
					alerts: {
						error: err,
					},
				});
			}
		});
	},
	// Render the form itself
	renderForm () {
		if (!this.props.isOpen) return;

		var form = [];
		var list = this.props.list;
		var nameField = this.props.list.nameField;
		var focusWasSet;

		// If the name field is an initial one, we need to render a proper
		// input for it
		if (list.nameIsInitial) {
			var nameFieldProps = this.getFieldProps(nameField);
			nameFieldProps.autoFocus = focusWasSet = true;
			if (nameField.type === 'text') {
				nameFieldProps.className = 'item-name-field';
				nameFieldProps.placeholder = nameField.label;
				nameFieldProps.label = '';
			}
			form.push(React.createElement(Fields[nameField.type], nameFieldProps));
		}

		// Render inputs for all initial fields
		Object.keys(list.initialFields).forEach(key => {
			var field = list.fields[list.initialFields[key]];
			// If there's something weird passed in as field type, render the
			// invalid field type component
			if (typeof Fields[field.type] !== 'function') {
				form.push(React.createElement(InvalidFieldType, { type: field.type, path: field.path, key: field.path }));
				return;
			}
			// Get the props for the input field
			var fieldProps = this.getFieldProps(field);
			// If there was no focusRef set previously, set the current field to
			// be the one to be focussed. Generally the first input field, if
			// there's an initial name field that takes precedence.
			if (!focusWasSet) {
				fieldProps.autoFocus = focusWasSet = true;
			}
			form.push(React.createElement(Fields[field.type], fieldProps));
		});

		return (
			<Form layout="horizontal" onSubmit={this.submitForm}>
				<Modal.Header
					text={'Create a new ' + list.singular}
					showCloseButton
				/>
				<Modal.Body>
					<AlertMessages alerts={this.state.alerts} />
					{form}
				</Modal.Body>
				<Modal.Footer>
					<Button color="success" type="submit" data-button-type="submit">
						Create
					</Button>
					<Button
						variant="link"
						color="cancel"
						data-button-type="cancel"
						onClick={this.props.onCancel}
					>
						Cancel
					</Button>
				</Modal.Footer>
			</Form>
		);
	},
	render () {
		return (
			<Modal.Dialog
				isOpen={this.props.isOpen}
				onClose={this.props.onCancel}
				backdropClosesModal
			>
				{this.renderForm()}
			</Modal.Dialog>
		);
	},
});

module.exports = CreateForm;
