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
	porcent:75
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
			mkdirp(dest,callback);
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
		resize:['images','mkdir',function(results,callback){
			var run = [];

			_.each(results.images,function(imageFile){
				var data = path.parse(imageFile.file);

				var newName = path.format({
					dir:dest,
					name:data.name,
					ext:data.ext,
				});

				run.push(function(callback){
					var image = imageFile.image;
					var por = options.porcent/100; // porcent

					image
					.resize(Math.floor(image.bitmap.width*por),Math.floor(image.bitmap.height*por))
					.write(newName,callback);
				})
			})

			async.parallel(run,callback);
		}]
	},function(err,results){
		if(done) done(err,results);
	})
}

module.exports = self;
