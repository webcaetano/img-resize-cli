var _ = require('lodash');
var del = require('del');
var glob = require('glob');
var path = require('path');
var sizeOf = require('image-size');
var fs = require('fs');
var test = require('ava');

var self = require('./');

test.cb('should resize image with default values',function(t){
	var src = './test/wizz/*.png';
	var dest = './test/dist/test1'
	var inputFiles = glob.sync(src);
	var numOfInput = inputFiles.length;
	var inputImageSize = sizeOf(inputFiles[0]);

	del.sync(dest);

	self(src,dest,null,function(err,data){
		var outputFiles = glob.sync(dest+'/*');
		var numOutput = outputFiles.length;

		t.falsy(err);
		t.truthy(numOutput==numOfInput);
		t.pass();
		t.end();
	})
});

test.cb('should resize image with percent option',function(t){
	var src = './test/wizz/*.png';
	var dest = './test/dist/test2'
	var inputFiles = glob.sync(src);
	var numOfInput = inputFiles.length;
	var inputImageSize = sizeOf(inputFiles[0]);

	del.sync(dest);

	self(src,dest,{
		porcent:'50%'
	},function(err,data){
		var outputFiles = glob.sync(dest+'/*');
		var numOutput = outputFiles.length;
		console.log(outputFiles)
		// var outputImageSize = sizeOf(outputFiles[0]);

		t.falsy(err);
		t.truthy(numOutput==numOfInput);
		// t.truthy(outputImageSize.width==Math.floor(inputImageSize.width*(50/100)));
		// t.truthy(outputImageSize.height==Math.floor(inputImageSize.height*(50/100)));
		t.pass();
		t.end();
	})
});

// test.cb('should resize image with only one percent dimension',function(t){
// 	var src = './test/wizz/*.png';
// 	var dest = './test/dist/test3'
// 	var inputFiles = glob.sync(src);
// 	var numOfInput = inputFiles.length;
// 	var inputImageSize = sizeOf(inputFiles[0]);

// 	del.sync(dest);

// 	self(src,dest,{
// 		width:'50%'
// 	},function(err,data){
// 		var outputFiles = glob.sync(dest+'/*');
// 		var numOutput = outputFiles.length;
// 		var outputImageSize = sizeOf(outputFiles[0]);

// 		t.falsy(err);
// 		t.truthy(numOutput==numOfInput);
// 		t.truthy(outputImageSize.width==Math.floor(inputImageSize.width*(50/100)));
// 		t.truthy(outputImageSize.height==inputImageSize.height);
// 		t.pass();
// 		t.end();
// 	})
// });

// test.cb('should resize image with both px dimensions',function(t){
// 	var src = './test/wizz/*.png';
// 	var dest = './test/dist/test4'
// 	var inputFiles = glob.sync(src);
// 	var numOfInput = inputFiles.length;
// 	var inputImageSize = sizeOf(inputFiles[0]);

// 	del.sync(dest);

// 	self(src,dest,{
// 		width:100,
// 		height:100,
// 	},function(err,data){
// 		var outputFiles = glob.sync(dest+'/*');
// 		var numOutput = outputFiles.length;
// 		var outputImageSize = sizeOf(outputFiles[0]);

// 		t.falsy(err);
// 		t.truthy(numOutput==numOfInput);
// 		t.truthy(outputImageSize.width==100);
// 		t.truthy(outputImageSize.height==100);
// 		t.pass();
// 		t.end();
// 	})
// });

// test.cb('should resize image with both dimensions but one is percent',function(t){
// 	var src = './test/wizz/*.png';
// 	var dest = './test/dist/test5'
// 	var inputFiles = glob.sync(src);
// 	var numOfInput = inputFiles.length;
// 	var inputImageSize = sizeOf(inputFiles[0]);

// 	del.sync(dest);

// 	self(src,dest,{
// 		width:'50%',
// 		height:100,
// 	},function(err,data){
// 		var outputFiles = glob.sync(dest+'/*');
// 		var numOutput = outputFiles.length;
// 		var outputImageSize = sizeOf(outputFiles[0]);

// 		t.falsy(err);
// 		t.truthy(numOutput==numOfInput);
// 		t.truthy(outputImageSize.width==Math.floor(inputImageSize.width*(50/100)));
// 		t.truthy(outputImageSize.height==100);
// 		t.pass();
// 		t.end();
// 	})
// });

// test.cb('should resize image with both dimensions but one auto',function(t){
// 	var src = './test/wizz/*.png';
// 	var dest = './test/dist/test6'
// 	var inputFiles = glob.sync(src);
// 	var numOfInput = inputFiles.length;
// 	var inputImageSize = sizeOf(inputFiles[0]);

// 	del.sync(dest);

// 	self(src,dest,{
// 		width:'50%',
// 		height:'auto',
// 	},function(err,data){
// 		var outputFiles = glob.sync(dest+'/*');
// 		var numOutput = outputFiles.length;
// 		var outputImageSize = sizeOf(outputFiles[0]);

// 		t.falsy(err);
// 		t.truthy(numOutput==numOfInput);
// 		t.truthy(outputImageSize.width==Math.floor(inputImageSize.width*(50/100)));
// 		t.truthy(outputImageSize.height==Math.floor(outputImageSize.width*inputImageSize.height/inputImageSize.width));
// 		t.pass();
// 		t.end();
// 	})
// });

// test.cb('should resize image with percent option as number',function(t){
// 	var src = './test/wizz/*.png';
// 	var dest = './test/dist/test7'
// 	var inputFiles = glob.sync(src);
// 	var numOfInput = inputFiles.length;
// 	var inputImageSize = sizeOf(inputFiles[0]);

// 	del.sync(dest);

// 	self(src,dest,{
// 		porcent:50
// 	},function(err,data){
// 		var outputFiles = glob.sync(dest+'/*');
// 		var numOutput = outputFiles.length;
// 		var outputImageSize = sizeOf(outputFiles[0]);

// 		t.falsy(err);
// 		t.truthy(numOutput==numOfInput);
// 		t.truthy(outputImageSize.width==Math.floor(inputImageSize.width*(50/100)));
// 		t.truthy(outputImageSize.height==Math.floor(inputImageSize.height*(50/100)));
// 		t.pass();
// 		t.end();
// 	})
// });

// test.cb('should resize image with percent option as string without %',function(t){
// 	var src = './test/wizz/*.png';
// 	var dest = './test/dist/test8'
// 	var inputFiles = glob.sync(src);
// 	var numOfInput = inputFiles.length;
// 	var inputImageSize = sizeOf(inputFiles[0]);

// 	del.sync(dest);

// 	self(src,dest,{
// 		porcent:'50'
// 	},function(err,data){
// 		var outputFiles = glob.sync(dest+'/*');
// 		var numOutput = outputFiles.length;
// 		var outputImageSize = sizeOf(outputFiles[0]);

// 		t.falsy(err);
// 		t.truthy(numOutput==numOfInput);
// 		t.truthy(outputImageSize.width==Math.floor(inputImageSize.width*(50/100)));
// 		t.truthy(outputImageSize.height==Math.floor(inputImageSize.height*(50/100)));
// 		t.pass();
// 		t.end();
// 	})
// });

// test.cb('should resize image with percent and algo',function(t){
// 	var src = './test/wizz/*.png';
// 	var dest = './test/dist/test9'
// 	var inputFiles = glob.sync(src);
// 	var numOfInput = inputFiles.length;
// 	var inputImageSize = sizeOf(inputFiles[0]);

// 	del.sync(dest);

// 	self(src,dest,{
// 		porcent:'50%',
// 		algo:'bicubic',
// 	},function(err,data){
// 		var outputFiles = glob.sync(dest+'/*');
// 		var numOutput = outputFiles.length;
// 		var outputImageSize = sizeOf(outputFiles[0]);

// 		t.falsy(err);
// 		t.truthy(numOutput==numOfInput);
// 		t.truthy(outputImageSize.width==Math.floor(inputImageSize.width*(50/100)));
// 		t.truthy(outputImageSize.height==Math.floor(inputImageSize.height*(50/100)));
// 		t.pass();
// 		t.end();
// 	})
// });

