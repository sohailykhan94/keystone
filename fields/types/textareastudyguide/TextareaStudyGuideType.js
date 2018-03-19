var FieldType = require('../Type');
var TextType = require('../text/TextType');
var util = require('util');
var utils = require('keystone-utils');


/**
 * Text FieldType Constructor
 * @extends Field
 * @api public
 */
function textareastudyguide (list, path, options) {
	this._nativeType = String;
	this._underscoreMethods = ['format', 'crop'];
	this.height = options.height || 90;
	this.multiline = true;
	this._properties = ['height', 'multiline'];
	textareastudyguide.super_.call(this, list, path, options);
}
textareastudyguide.properName = 'TextareaStudyGuide';
util.inherits(textareastudyguide, FieldType);


textareastudyguide.prototype.validateInput = TextType.prototype.validateInput;
textareastudyguide.prototype.validateRequiredInput = TextType.prototype.validateRequiredInput;

/* Inherit from TextType prototype */
textareastudyguide.prototype.addFilterToQuery = TextType.prototype.addFilterToQuery;
textareastudyguide.prototype.crop = TextType.prototype.crop;

/**
 * Formats the field value
 * @api public
 */
textareastudyguide.prototype.format = function (item) {
	return utils.textToHTML(item.get(this.path));
};

/* Export Field Type */
module.exports = textareastudyguide;
