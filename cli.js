#!/usr/bin/env node
'use strict';
var meow = require('meow');
var _ = require('lodash');
var self = require('./');

var cli = meow([
	'Usage',
		'$ rsize <src> <dest (optional)>',
	'',
	'Options',
		'--porcent image porcentage resize',
		'--width new image width, (numbers or auto)',
		'--height new image height, (numbers or auto)',
		'--algo resize algorithm, default: bilinear',
		'algorithms: bilinear | neighbor | bicubic | hermite | bezier',
	'',
	'Examples',
		'rsize "**/*.png" "destFolder/" --porcent 50',
		'rsize "**/*.png" "destFolder/" --width 100',
		'rsize "**/*.png" "destFolder/" --width 100 --height 100',
		'rsize "**/*.png" "destFolder/" --width 100 --height auto',
		'rsize "**/*.png" "destFolder/" --porcent 25 --algo bicubic',
], {
	string: ['_']
});


var defaults = {
}

var options = _.extend({},defaults,{
	porcent: cli.flags.porcent,
	width: cli.flags.width,
	height: cli.flags.height,
	algo: cli.flags.algo,
})

options = _.omitBy(options,_.isUndefined);

var glob = _.nth(cli.input,0);
var dest = _.nth(cli.input,1);

self(glob,dest,options);
