var FieldType = require('../Type');
var TextType = require('../text/TextType');
var util = require('util');
var utils = require('keystone-utils');


/**
 * Text FieldType Constructor
 * @extends Field
 * @api public
 */
function textareakatex (list, path, options) {
	this._nativeType = String;
	this._underscoreMethods = ['format', 'crop'];
	this.height = options.height || 90;
	this.multiline = true;
	this._properties = ['height', 'multiline'];
	textareakatex.super_.call(this, list, path, options);
}
textareakatex.properName = 'TextareaKatex';
util.inherits(textareakatex, FieldType);


textareakatex.prototype.validateInput = TextType.prototype.validateInput;
textareakatex.prototype.validateRequiredInput = TextType.prototype.validateRequiredInput;

/* Inherit from TextType prototype */
textareakatex.prototype.addFilterToQuery = TextType.prototype.addFilterToQuery;
textareakatex.prototype.crop = TextType.prototype.crop;

/**
 * Formats the field value
 * @api public
 */
textareakatex.prototype.format = function (item) {
	return utils.textToHTML(item.get(this.path));
};

/* Export Field Type */
module.exports = textareakatex;
