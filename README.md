# img-resize-cli

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
<!-- [![Test coverage][coveralls-image]][coveralls-url] -->

> Image resize cli using jimp

## Installation

```
npm install img-resize-cli --save
```

## CLI

```
npm install img-resize-cli -g
```

```
Usage
	$ rsize <glob>

Options
	--porcent image porcentage resize
	--width new image width, (numbers or auto)
	--height new image height, (numbers or auto)
	--algo resize algorithm, default: bilinear
	algorithms: bilinear | neighbor | bicubic | hermite | bezier

Examples
	rsize "**/*.png" "destFolder/" --porcent 50
	rsize "**/*.png" "destFolder/" --width 100
	rsize "**/*.png" "destFolder/" --width 100 --height 100
	rsize "**/*.png" "destFolder/" --width 100 --height auto
	rsize "**/*.png" "destFolder/" --porcent 25 --algo bicubic
```

## Options

<table>
<tr>
<td><strong>Option</strong></td>
<td width="300"><strong>Description</strong></td>
<td><strong>Default</strong></td>
</tr>
<tr>
<td><code>porcent</code></td>
<td>Image porcentage resize</td>
<td><code>75</code></td>
</tr>
<tr>
<td><code>width</code></td>
<td>new image width, (numbers or auto)</td>
<td><code>null</code></td>
</tr>
<tr>
<td><code>height</code></td>
<td>new image height, (numbers or auto)</td>
<td><code>null</code></td>
</tr>
<tr>
<td><code>algo</code></td>
<td>resize algorithm<br>
algorithms: bilinear | neighbor | bicubic | hermite | bezier</td>
<td><code>bilinear</code></td>
</tr>
</table>

## Node Usage

```
rsize(src,dest,options)
```

## Example 

```javascript
var rsize = require('img-resize-cli');

// width porcent
rsize(src,dest,{
	porcent:'50%'
},function(err,data){

});

// width dimensions
rsize(src,dest,{
	width:100,
	height:100, 
},function(err,data){

});

// full options 
rsize(src,dest,{
	width:'50%',
	height:'auto', 
	alog:'bicubic', 
},function(err,data){

});
```

## License

MIT

[npm-image]: https://img.shields.io/npm/v/img-resize-cli.svg?style=flat-square
[npm-url]: https://npmjs.org/package/img-resize-cli
[travis-image]: https://img.shields.io/travis/webcaetano/img-resize-cli.svg?style=flat-square
[travis-url]: https://travis-ci.org/webcaetano/img-resize-cli
