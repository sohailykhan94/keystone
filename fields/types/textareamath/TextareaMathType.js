var FieldType = require('../Type');
var TextType = require('../text/TextType');
var util = require('util');
var utils = require('keystone-utils');


/**
 * Text FieldType Constructor
 * @extends Field
 * @api public
 */
function textareamath (list, path, options) {
	this._nativeType = String;
	this._underscoreMethods = ['format', 'crop'];
	this.height = options.height || 90;
	this.multiline = true;
	this._properties = ['height', 'multiline'];
	textareamath.super_.call(this, list, path, options);
}
textareamath.properName = 'TextareaMath';
util.inherits(textareamath, FieldType);


textareamath.prototype.validateInput = TextType.prototype.validateInput;
textareamath.prototype.validateRequiredInput = TextType.prototype.validateRequiredInput;

/* Inherit from TextType prototype */
textareamath.prototype.addFilterToQuery = TextType.prototype.addFilterToQuery;
textareamath.prototype.crop = TextType.prototype.crop;

/**
 * Formats the field value
 * @api public
 */
textareamath.prototype.format = function (item) {
	return utils.textToHTML(item.get(this.path));
};

/* Export Field Type */
module.exports = textareamath;
