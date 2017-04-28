var _ = require('lodash');
var del = require('del');
var glob = require('glob');
var path = require('path');
var fs = require('fs');
var test = require('ava');

var self = require('./');

test.cb('should resize image with default values',function(t){
	self('./test/wizz/*.png','./test/dist',null,function(err,data){
		t.falsy(err);
		// t.truthy(glob.sync(path.join(tmpFolder,'/*'),{nodir:true}).length);
		t.pass();
		t.end();
	})
});
