var path = require('path');
var fs = require('fs');
var glob = require('glob');
var cpFile = require('cp-file');
var async = require('async');
var Jimp = require('jimp');
var mkdirp = require('mkdirp');
var _ = require('lodash');

// insert defaults here
var defaults = {
	porcent:75,
	width:null,
	height:null,
	algo:'bilinear',
}


var algorithms = {
	'bilinear':Jimp.RESIZE_BILINEAR,
	'neighbor':Jimp.RESIZE_NEAREST_NEIGHBOR,
	'bicubic':Jimp.RESIZE_BICUBIC,
	'hermite':Jimp.RESIZE_HERMITE,
	'bezier':Jimp.RESIZE_BEZIER,
}

var self = function(src, dest, options, done){
	if(typeof options==='function') {
		var tmpVar = options;
		options = done ? done : {};
		done = tmpVar;
	}

	options = _.extend({},defaults,options);

	async.auto({
		files:function(callback){
			glob(src,{nodir:true},callback);
		},
		mkdir:function(callback){
			if(dest){
				mkdirp(dest,callback);
			} else {
				callback();
			}
		},
		images:['files',function(results,callback){
			var run = [];

			_.each(results.files,function(file){

				run.push(function(callback){
					new Jimp(file,function(err,image){
						callback(err,{
							file,
							image,
						})
					});
				})
			})

			async.parallel(run,callback);
		}],
		folders:['files',function(results,callback){
			var run = [];
			var folders = _.uniq(_.map(results.files,function(file){
				return path.dirname(file);
			}));

			var destFolder = dest ? dest : '';

			_.each(folders,function(folder){
				run.push(function(callback){
					mkdirp(path.join(destFolder,folder),callback);
				})
			})

			async.parallel(run,callback);
		}],
		resize:['images','mkdir','folders',function(results,callback){
			var run = [];

			_.each(results.images,function(imageFile){
				var data = path.parse(imageFile.file);

				if(dest){
					var newName = path.format({
						dir:path.join(dest,data.dir),
						name:data.name,
						ext:data.ext,
					});
				} else {
					var newName = imageFile.file
				}

				run.push(function(callback){
					var image = imageFile.image;
					var width;
					var height;
					var size = {
						width:null,
						height:null,
					}

					if(options.width || options.height){
						_.each(['width','height'],function(dimension){
							if(options[dimension]=='auto'){
								size[dimension] = Jimp.AUTO;
							} else if(typeof options[dimension]==='string' && options[dimension].match(/%/g).length){
								var por = Number(options[dimension].replace(/%/g,''))/100;
								size[dimension] = Math.floor(image.bitmap[dimension]*por);
							} else if(!options[dimension]) {
								size[dimension] = image.bitmap[dimension];
							} else {
								size[dimension] = Number(options[dimension]);
							}
						});
					} else {
						// porcent
						if(typeof options.porcent=='string'){
							var porcent = Number(options.porcent.replace(/%/g,''));
						} else {
							var porcent = options.porcent;
						}

						var por = porcent/100; // porcent
						size.width = Math.floor(image.bitmap.width*por);
						size.height = Math.floor(image.bitmap.height*por);
					}

					image
					.resize(size.width,size.height,algorithms[options.algo])
					.write(newName,callback);
				})
			})

			async.parallelLimit(run,5,callback);
		}]
	},function(err,results){
		if(done) done(err,results);
	})
}

module.exports = self;
