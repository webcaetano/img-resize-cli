# pad-rename

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
<!-- [![Test coverage][coveralls-image]][coveralls-url] -->

> Rename files with pads splited on folders

## Installation

```
npm install pad-rename --save
```

## Usage

```
rpad(glob,options,callback)
```

## Example 

```javascript
var rpad = require('pad-rename');


rpad('**/*.png',function(){

});

// or
rpad(['**/*.png'],{start:0},function(){

});

// or
rpad(['**/*.png'],function(){

},{start:0});

// with all options
rpad(['**/*.png'],function(err,data){

},{
	prefix:'lulu_',
	sufix:'_purple',
	start:0,
	length:5,
	val:'o',
});
```

## Options


<table>
<tr>
<td><strong>Option</strong></td>
<td width="300"><strong>Description</strong></td>
<td><strong>Default</strong></td>
</tr>
<tr>
<td><code>start</code></td>
<td>The inital pad start.</td>
<td><code>1</code></td>
</tr>
<tr>
<td><code>length</code></td>
<td>The padding length.</td>
<td><code>3</code></td>
</tr>
<tr>
<td><code>val</code></td>
<td>The string used as padding.</td>
<td><code>0</code></td>
</tr>
<tr>
<td><code>sufix</code></td>
<td>The string used as sufix.</td>
<td><code>""</code></td>
</tr>
<tr>
<td><code>prefix</code></td>
<td>The string used as prefix.</td>
<td><code>""</code></td>
</tr>
</table>


## CLI

```
npm install pad-rename -g
```

```
Usage
	$ rpad <glob>

Options
	--start inital pad start. Default: 1
	--length the padding length. Default: 3
	--val string used as padding. Default: "0"
	--prefix string used as prefix. Default: ""
	--sufix string used as sufix. Default: ""

Examples
	rpad "**/*.png"
	rpad "**/*.png" --start 0 --length 5 --val "0" --prefix "img_" --sufix "_end"
```


## License

MIT

[npm-image]: https://img.shields.io/npm/v/pad-rename.svg?style=flat-square
[npm-url]: https://npmjs.org/package/pad-rename
[travis-image]: https://img.shields.io/travis/webcaetano/pad-rename.svg?style=flat-square
[travis-url]: https://travis-ci.org/webcaetano/pad-rename
<!-- [coveralls-image]: https://img.shields.io/coveralls/blakeembrey/pad-rename.svg?style=flat 
[coveralls-url]: https://coveralls.io/r/blakeembrey/pad-rename?branch=master
-->
