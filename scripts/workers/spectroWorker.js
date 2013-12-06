
/** * A handy class to calculate color values.
 *
 * @version 1.0
 * @author Robert Eisele <robert@xarg.org>
 * @copyright Copyright (c) 2010, Robert Eisele
 * @link http://www.xarg.org/2010/03/generate-client-side-png-files-using-javascript/
 * @license http://www.opensource.org/licenses/bsd-license.php BSD License
 *
 */

(function () {

	// helper functions for that ctx
	function write(buffer, offs) {
		for (var i = 2; i < arguments.length; i++) {
			for (var j = 0; j < arguments[i].length; j++) {
				buffer[offs++] = arguments[i].charAt(j);
			}
		}
	}

	function byte2(w) {
		return String.fromCharCode((w >> 8) & 255, w & 255);
	}

	function byte4(w) {
		return String.fromCharCode((w >> 24) & 255, (w >> 16) & 255, (w >> 8) & 255, w & 255);
	}

	function byte2lsb(w) {
		return String.fromCharCode(w & 255, (w >> 8) & 255);
	}

	PNGlib = function (width, height, depth) {
		var i;
		this.width = width;
		this.height = height;
		this.depth = depth;

		// pixel data and row filter identifier size
		this.pixSize = height * (width + 1);

		// deflate header, pixSize, block headers, adler32 checksum
		this.dataSize = 2 + this.pixSize + 5 * Math.floor((0xfffe + this.pixSize) / 0xffff) + 4;

		// offsets and sizes of Png chunks
		this.ihdrOffs = 0; // IHDR offset and size
		this.ihdrSize = 4 + 4 + 13 + 4;
		this.plteOffs = this.ihdrOffs + this.ihdrSize; // PLTE offset and size
		this.plteSize = 4 + 4 + 3 * depth + 4;
		this.trnsOffs = this.plteOffs + this.plteSize; // tRNS offset and size
		this.trnsSize = 4 + 4 + depth + 4;
		this.idatOffs = this.trnsOffs + this.trnsSize; // IDAT offset and size
		this.idatSize = 4 + 4 + this.dataSize + 4;
		this.iendOffs = this.idatOffs + this.idatSize; // IEND offset and size
		this.iendSize = 4 + 4 + 4;
		this.bufferSize = this.iendOffs + this.iendSize; // total PNG size

		this.buffer = [];
		this.palette = {};
		this.pindex = 0;

		var _crc32 = [];

		// initialize buffer with zero bytes
		for (i = 0; i < this.bufferSize; i++) {
			this.buffer[i] = '\x00';
		}

		// initialize non-zero elements
		write(this.buffer, this.ihdrOffs, byte4(this.ihdrSize - 12), 'IHDR', byte4(width), byte4(height), '\x08\x03');
		write(this.buffer, this.plteOffs, byte4(this.plteSize - 12), 'PLTE');
		write(this.buffer, this.trnsOffs, byte4(this.trnsSize - 12), 'tRNS');
		write(this.buffer, this.idatOffs, byte4(this.idatSize - 12), 'IDAT');
		write(this.buffer, this.iendOffs, byte4(this.iendSize - 12), 'IEND');

		// initialize deflate header
		var header = ((8 + (7 << 4)) << 8) | (3 << 6);
		header += 31 - (header % 31);

		write(this.buffer, this.idatOffs + 8, byte2(header));

		// initialize deflate block headers
		for (i = 0;
			(i << 16) - 1 < this.pixSize; i++) {
			var size, bits;
			if (i + 0xffff < this.pixSize) {
				size = 0xffff;
				bits = '\x00';
			} else {
				size = this.pixSize - (i << 16) - i;
				bits = '\x01';
			}
			write(this.buffer, this.idatOffs + 8 + 2 + (i << 16) + (i << 2), bits, byte2lsb(size), byte2lsb(~size));
		}

		/* Create crc32 lookup table */
		for (i = 0; i < 256; i++) {
			var c = i;
			for (var j = 0; j < 8; j++) {
				if (c & 1) {
					c = -306674912 ^ ((c >> 1) & 0x7fffffff);
				} else {
					c = (c >> 1) & 0x7fffffff;
				}
			}
			_crc32[i] = c;
		}

		// compute the index into a png for a given pixel
		this.index = function (x, y) {
			var i = y * (this.width + 1) + x + 1;
			var j = this.idatOffs + 8 + 2 + 5 * Math.floor((i / 0xffff) + 1) + i;
			return j;
		};

		// convert a color and build up the palette
		this.color = function (red, green, blue, alpha) {

			alpha = alpha >= 0 ? alpha : 255;
			var color = (((((alpha << 8) | red) << 8) | green) << 8) | blue;

			if (typeof this.palette[color] === 'undefined') {
				if (this.pindex === this.depth) {
					return '\x00';
				}

				var ndx = this.plteOffs + 8 + 3 * this.pindex;

				this.buffer[ndx + 0] = String.fromCharCode(red);
				this.buffer[ndx + 1] = String.fromCharCode(green);
				this.buffer[ndx + 2] = String.fromCharCode(blue);
				this.buffer[this.trnsOffs + 8 + this.pindex] = String.fromCharCode(alpha);

				this.palette[color] = String.fromCharCode(this.pindex++);
			}
			return this.palette[color];
		};

		// output a PNG string, Base64 encoded
		this.getBase64 = function () {

			var s = this.getDump();

			var ch = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
			var c1, c2, c3, e1, e2, e3, e4;
			var l = s.length;
			var i = 0;
			var r = '';

			do {
				c1 = s.charCodeAt(i);
				e1 = c1 >> 2;
				c2 = s.charCodeAt(i + 1);
				e2 = ((c1 & 3) << 4) | (c2 >> 4);
				c3 = s.charCodeAt(i + 2);
				if (l < i + 2) {
					e3 = 64;
				} else {
					e3 = ((c2 & 0xf) << 2) | (c3 >> 6);
				}
				if (l < i + 3) {
					e4 = 64;
				} else {
					e4 = c3 & 0x3f;
				}
				r += ch.charAt(e1) + ch.charAt(e2) + ch.charAt(e3) + ch.charAt(e4);
			} while ((i += 3) < l);
			return r;
		};

		// output a PNG string
		this.getDump = function () {

			// compute adler32 of output pixels + row filter bytes
			var BASE = 65521; /* largest prime smaller than 65536 */
			var NMAX = 5552; /* NMAX is the largest n such that 255n(n+1)/2 + (n+1)(BASE-1) <= 2^32-1 */
			var s1 = 1;
			var s2 = 0;
			var n = NMAX;

			for (var y = 0; y < this.height; y++) {
				for (var x = -1; x < this.width; x++) {
					s1 += this.buffer[this.index(x, y)].charCodeAt(0);
					s2 += s1;
					if ((n -= 1) === 0) {
						s1 %= BASE;
						s2 %= BASE;
						n = NMAX;
					}
				}
			}
			s1 %= BASE;
			s2 %= BASE;
			write(this.buffer, this.idatOffs + this.idatSize - 8, byte4((s2 << 16) | s1));

			// compute crc32 of the PNG chunks
			function crc32(png, offs, size) {
				var crc = -1;
				for (var i = 4; i < size - 4; i += 1) {
					crc = _crc32[(crc ^ png[offs + i].charCodeAt(0)) & 0xff] ^ ((crc >> 8) & 0x00ffffff);
				}
				write(png, offs + size - 4, byte4(crc ^ -1));
			}

			crc32(this.buffer, this.ihdrOffs, this.ihdrSize);
			crc32(this.buffer, this.plteOffs, this.plteSize);
			crc32(this.buffer, this.trnsOffs, this.trnsSize);
			crc32(this.buffer, this.idatOffs, this.idatSize);
			crc32(this.buffer, this.iendOffs, this.iendSize);

			// convert PNG to string
			return "\211PNG\r\n\032\n" + this.buffer.join('');
		};
	};

})();

/**
 * A handy class to draw a spectrom (calculate a fft)
 *
 *
 * @version 1.0
 * @author Georg raess <graess@phonetik.uni-muenchen.de>
 * @link http://www.phonetik.uni-muenchen.de/
 *
 */



function FFT(fftSize) {
	var n, m, sin, cos, alpha, func, i;
	n = fftSize;
	m = parseInt((Math.log(n) / 0.6931471805599453)); // Math.log(n) / Math.log(2) 
	if (n !== (1 << m)) { // Make sure n is a power of 2
		self.postMessage('ERROR : FFT length must be power of 2');
	}
	cos = new Float32Array(n / 2); // precompute cos table
	sin = new Float32Array(n / 2); // precompute sin table
	for (var x = 0; x < n / 2; x++) {
		cos[x] = Math.cos(-2 * PI * x / n);
		sin[x] = Math.sin(-2 * PI * x / n);
	}

	/*   
    // choose window function set alpha and execute it on the buffer 
    //
	// [parameters]
	//
	// type			-> chosen Window Function
	// alpha		-> alpha for Window Functions (default 0.16)
	// buffer		-> current fft window data
	//
	// [return]
	//	
	// calculated FFT Window
	*/
	this.wFunction = function (type, alpha, buffer) {
		var length = buffer.length;
		this.alpha = alpha;
		switch (type) {
		case myWindow.BARTLETT:
			for (i = 0; i < length; i++) {
				buffer[i] *= this.wFunctionBartlett(length, i);
			}
			break;
		case myWindow.BARTLETTHANN:
			for (i = 0; i < length; i++) {
				buffer[i] *= this.wFunctionBartlettHann(length, i);
			}
			break;
		case myWindow.BLACKMAN:
			this.alpha = this.alpha || 0.16;
			for (i = 0; i < length; i++) {
				buffer[i] *= this.wFunctionBlackman(length, i, alpha);
			}
			break;
		case myWindow.COSINE:
			for (i = 0; i < length; i++) {
				buffer[i] *= this.wFunctionCosine(length, i);
			}
			break;
		case myWindow.GAUSS:
			this.alpha = this.alpha || 0.25;
			for (i = 0; i < length; i++) {
				buffer[i] *= this.wFunctionGauss(length, i, alpha);
			}
			break;
		case myWindow.HAMMING:
			for (i = 0; i < length; i++) {
				buffer[i] *= this.wFunctionHamming(length, i);
			}
			break;
		case myWindow.HANN:
			for (i = 0; i < length; i++) {
				buffer[i] *= this.wFunctionHann(length, i);
			}
			break;
		case myWindow.LANCZOS:
			for (i = 0; i < length; i++) {
				buffer[i] *= this.wFunctionLanczos(length, i);
			}
			break;
		case myWindow.RECTANGULAR:
			for (i = 0; i < length; i++) {
				buffer[i] *= this.wFunctionRectangular(length, i);
			}
			break;
		case myWindow.TRIANGULAR:
			for (i = 0; i < length; i++) {
				buffer[i] *= this.wFunctionTriangular(length, i);
			}
			break;
		}
		return buffer;
	};

	// the Window Functions

	this.wFunctionBartlett = function (length, index) {
		return 2 / (length - 1) * ((length - 1) / 2 - Math.abs(index - (length - 1) / 2));
	};

	this.wFunctionBartlettHann = function (length, index) {
		return 0.62 - 0.48 * Math.abs(index / (length - 1) - 0.5) - 0.38 * Math.cos(TWO_PI * index / (length - 1));
	};

	this.wFunctionBlackman = function (length, index, alpha) {
		var a0 = (1 - alpha) / 2;
		var a1 = 0.5;
		var a2 = alpha / 2;
		return a0 - a1 * Math.cos(TWO_PI * index / (length - 1)) + a2 * Math.cos(4 * PI * index / (length - 1));
	};

	this.wFunctionCosine = function (length, index) {
		return Math.cos(PI * index / (length - 1) - PI / 2);
	};

	this.wFunctionGauss = function (length, index, alpha) {
		return Math.pow(Math.E, -0.5 * Math.pow((index - (length - 1) / 2) / (alpha * (length - 1) / 2), 2));
	};

	this.wFunctionHamming = function (length, index) {
		return 0.54 - 0.46 * Math.cos(TWO_PI * index / (length - 1));
	};

	this.wFunctionHann = function (length, index) {
		return 0.5 * (1 - Math.cos(TWO_PI * index / (length - 1)));
	};

	this.wFunctionLanczos = function (length, index) {
		var x = 2 * index / (length - 1) - 1;
		return Math.sin(PI * x) / (PI * x);
	};

	this.wFunctionRectangular = function (length, index) {
		return 1;
	};

	this.wFunctionTriangular = function (length, index) {
		return 2 / length * (length / 2 - Math.abs(index - (length - 1) / 2));
	};

	// the FFT calculation
	this.fft = function (x, y) {
		// Bit-reverse
		var i, j, k, n1, n2, a, c, s, t1, t2;
		// Bit-reverse
		j = 0;
		n2 = n / 2;
		for (i = 1; i < n - 1; i++) {
			n1 = n2;
			while (j >= n1) {
				j = j - n1;
				n1 = n1 / 2;
			}
			j = j + n1;

			if (i < j) {
				t1 = x[i];
				x[i] = x[j];
				x[j] = t1;
				t1 = y[i];
				y[i] = y[j];
				y[j] = t1;
			}
		}

		// FFT
		n1 = 0;
		n2 = 1;

		for (i = 0; i < m; i++) {
			n1 = n2;
			n2 = n2 + n2;
			a = 0;

			for (j = 0; j < n1; j++) {
				c = cos[a];
				s = sin[a];
				a += 1 << (m - i - 1);

				for (k = j; k < n; k = k + n2) {
					t1 = c * x[k + n1] - s * y[k + n1];
					t2 = s * x[k + n1] + c * y[k + n1];
					x[k + n1] = x[k] - t1;
					y[k + n1] = y[k] - t2;
					x[k] = x[k] + t1;
					y[k] = y[k] + t2;
				}
			}
		}
	};
}



var executed = false;
var PI = 3.141592653589793; // value : Math.PI
var TWO_PI = 6.283185307179586; // value : 2 * Math.PI
var OCTAVE_FACTOR = 3.321928094887363; // value : 1.0/log10(2)	
var emphasisPerOctave = 3.9810717055349722; // value : toLinearLevel(6);		
var internalalpha = 0.16;
var totalMax = 0;
var dynRangeInDB = 50;
var myOffset = 0;
var mywidth = 0;
var myDrawOffset = 0;
var pixelRatio = 1;
var myFFT, renderWidth, paint, p, HzStep, c, d, maxPsd, pixelHeight;
var myWindow = {
	BARTLETT: 1,
	BARTLETTHANN: 2,
	BLACKMAN: 3,
	COSINE: 4,
	GAUSS: 5,
	HAMMING: 6,
	HANN: 7,
	LANCZOS: 8,
	RECTANGULAR: 9,
	TRIANGULAR: 10
};
/* 
	// initial function call for calculating and drawing Spectrogram
	// input PCM data is coming from the buffer "localSoundBuffer"
	// which has to be filled before.
	// - first loop calculates magnitudes to draw (getMagnitude())
	// - second loop draws values on canvas  (drawOfflineSpectogram())
	//
	// [parameters]
	//
	// N			-> window Size
	// upperFreq	-> upper boundry in Hz
	// start		-> start time
	// end			-> end time
	// cWidth		-> width of canvas element
	// cHeight		-> height of canvas element
	// octx			-> Context of Canvas Element used for drawing 
	*/

var parseData = (function (N, upperFreq, lowerFreq, start, end, cWidth, cHeight, cacheWidth, cacheSide, pixelRatio) {
	return function (N, upperFreq, lowerFreq, start, end, cWidth, cHeight, cacheWidth, cacheSide, pixelRatio) {
	
		if (!executed) {
			//cWidth *= pixelRatio;
			//cHeight *= pixelRatio;

			// start execution once
			executed = true;

			// instance of FFT with windowSize N
			myFFT = new FFT(N);

			renderWidth = cWidth - cacheWidth;
			if (renderWidth < 0) {
				renderWidth = 0;
			}

			// array holding FFT results paint[canvas width][canvas height]
			paint = new Array(renderWidth);

			// create new png picture from pnglib witth color depth=256
			p = new PNGlib(cWidth, cHeight, 256);

			// Hz per pixel height
			HzStep = (sampleRate / 2) / cHeight;

			// uper Hz boundry to display
			c = Math.floor(upperFreq / HzStep);

			// lower Hz boundry to display
			d = Math.floor(lowerFreq / HzStep); // -1 for value below display when lower>0

			// offset in pcm stream if cache is on right side
			if (cacheSide === 2) {
				myOffset = cacheWidth * myStep;
			}

			// calculate i FFT runs, save result into paint and set maxPsd while doing so
			for (var i = 0; i < renderWidth; i++) {
				paint[i] = getMagnitude(0, (i * myStep) + myOffset, N, c, d);
				maxPsd = (2 * Math.pow(totalMax, 2)) / N;
			}

			// height between two interpolation points
			pixelHeight = cHeight / (c - d - 2);

			// offset if cache is on right side
			if (cacheSide === 2) {
				myDrawOffset = cacheWidth;
			}

			// draw spectrogram on png image with canvas width
			// (one column is drawn in drawOfflineSpectogram)
			for (var j = 0; j < renderWidth; j++) {
				drawOfflineSpectogram(j, p, c, d, myDrawOffset);
			}

			// post generated image block with settings back
			self.postMessage({
				'window': wFunction,
				'start': start,
				'end': end,
				'myStep': myStep,
				'cacheWidth': cacheWidth,
				'cacheSide': cacheSide,
				'img': 'data:image/png;base64,' + p.getBase64()
			});

			// free vars
			myFFT = null;

			// stop execution
			executed = false;
		}
	};
})();

/*
	// calculates Magnitude by 
	// - reading the current (defined with offset) data from localSoundBuffer
	// - applying the current Window Function to the selected data
	// - calculating the actual FFT
	// - (and saving the biggest value in totalMax)
	//
	// [parameters]
	//
	// channel			-> Number of Channels
	// offset			-> Calculated offset in PCM Stream
	// windowSize		-> Size of Window used for calculation
	// c				-> Upper Boundry (c = Math.floor(upperFreq/HzStep);)
	//
	// [return]
	//
	// calculated FFT data as Float32Array
	*/

function getMagnitude(channel, offset, windowSize, c, d) {
	// imaginary array of length N
	imag = new Float32Array(N);

	// real array of length N
	real = new Float32Array(N);

	// result array of length N
	result = new Float32Array(c - d);

	// set real values by reading local sound buffer
	for (var j = 0; j < windowSize; j++) {
		real[j] = threadSoundBuffer[offset + j];
	}

	// calculate FFT window function over real 
	myFFT.wFunction(wFunction, internalalpha, real);

	// calculate FFT over real and save to result
	myFFT.fft(real, imag);
	for (var low = 0; low <= c - d; low++) {
		result[low] = magnitude(real[low + d], imag[low + d]);
		if (totalMax < result[low]) {
			totalMax = result[low];
		}
	}
	return result;
}

/*
	// draws a single Line on the Canvas Element
	// by calculating the RGB value of the current pixel with:
	// 255-(255*scaled)
	// function has to be called in an outer loop (according to canvas_width)
	// the inner loop draws a single line on the canvas (according to canvas_height)
	//
	// [parameters]
	//
	// line			-> calculated FFT Data
	//
	*/

function drawOfflineSpectogram(line, p, c, d, cacheOffet) {

	// set upper boundry for linear interpolation
	var x1 = pixelHeight;
	// value for first interpolation at lower boundry (height=0)
	psd = (2 * Math.pow(paint[line][1], 2)) / N;
	psdLog = 10 * log10(psd / maxPsd);
	scaledVal = ((psdLog + dynRangeInDB) / dynRangeInDB);
	if (scaledVal > 1) {
		scaledVal = 1;
	}
	if (scaledVal < 0) {
		scaledVal = 0;
	}


	for (var i = 1; i < paint[line].length; i++) {

		var y0 = scaledVal; // !!!! set y0 to previous scaled value

		// for each value in paint[] calculate pixelHeight interpolation points
		// x0=0
		// x1=pixelHeight
		// if(paint[i-1]<0) paint[i-1] = 1
		// y0=paint[i-1]    
		// y1=paint[i]


		// !!!! calculate next scaledValue [0...1] 
		psd = (2 * Math.pow(paint[line][i], 2)) / N;
		psdLog = 10 * log10(psd / maxPsd);
		scaledVal = ((psdLog + dynRangeInDB) / dynRangeInDB);
		if (scaledVal > 1) {
			scaledVal = 1;
		}
		if (scaledVal < 0) {
			scaledVal = 0;
		}

		// !!!! set y1 to this scaled value
		var y1 = scaledVal;

		if (pixelHeight >= 1) {
			// do interpolation between y0 (previous scaledValue) and y1 (scaledValue now)
			for (var b = 0; b < pixelHeight; b++) {
				y2 = y0 + (y1 - y0) / x1 * b;

				// calculate corresponding color value for interpolation point [0...255]
				rgb = 255 - Math.round(255 * y2);

				// calculate hex value of corresponding color value
				rgb = '0x' + d2h(rgb);

				// set internal image buffer to calculated & interpolated value
				p.buffer[p.index(Math.floor(line + cacheOffet), Math.floor(myheight - ((pixelHeight * (i - 2)) + b)))] = p.color(rgb, rgb, rgb);
			}
		} else {

		}
	}
}



/**
 *various helper functions for calculation
 */

// decimal color [0...255] to hex color
function d2h(d) {
	return (+d).toString(16);
}

// used by FFT
function toLevelInDB(linearLevel) {
	if (linearLevel < 0) {
		alert('Linear level argument must be positive.');
	}
	return 10 * log10(linearLevel);
}

// used by FFT
function getLevelInDB(linearLevel) {
	return toLevelInDB(linearLevel);
}

// used by FFT
function toLinearLevel(dbLevel) {
	return Math.pow(10, (dbLevel / 10));
}

// used by FFT
function log10(arg) {
	return Math.log(arg) / 2.302585092994046; // Math.log(x) / Math.LN10
}

// used by FFT
function magnitude(real, imag) {
	return Math.sqrt((real * real) + (imag * imag));
}

// used to calculate current packet
function getPacketInPercent(packets, percent) {
	return Math.floor(packets / 100 * percent);
}

/*
    // Web Worker Communication
    //
    // Steps:
    // ------
    //
    // (1)	Setup Web Worker by calling "config" and corresponding parameter
    //		N		--> window Size
    //		freq	--> upper Frequency Boundry
    //		start	--> start Value in
    //		end		--> end Value in 
    //		window	-->	window Function (please use myWindow enum)
    //		width	--> height of canvas used to display
    //		height	--> width of canvas used to display
    //
    //		- example: primeWorker.postMessage({'cmd': 'config', 'N': N});
    //
    //
    // (2)	Send PCM Configuration Data (ie header of pcm data) to Web Worker by calling "pcm","config"
    //
    //		- example:	var data = JSON.stringify(sourceBuffer);
    //					primeWorker.postMessage({'cmd': 'pcm', 'config': data});		
    //
    //
    // (3)	Send PCM Data by calling "pcm","stream"
    //
    //		- example:	primeWorker.postMessage({'cmd': 'pcm', 'stream': sourceBuffer.getChannelData(0)});		
    //
    //
    // (4)	Start complete calculation by calling "render"
    //
    //		- example	primeWorker.postMessage({'cmd': 'render'});
    //
    //
    //	--> Wait for callback of Web Worker sending you Base64 encoded spectrogram image
    */

self.addEventListener('message', function (e) {
	var data = e.data;
	switch (data.cmd) {
	case 'config':
		if (data.N !== undefined) {
			N = data.N;
		}
		if (data.alpha !== undefined) {
			internalalpha = data.alpha;
		}
		if (data.freq !== undefined) {
			upperFreq = data.freq;
		}
		if (data.freqLow !== undefined) {
			lowerFreq = data.freqLow;
		}
		if (data.start !== undefined) {
			start = data.start;
		}
		if (data.end !== undefined) {
			end = data.end;
		}
		if (data.myStep !== undefined) {
			myStep = data.myStep;
		}
		if (data.window !== undefined) {
			switch (data.window) {
			case 1:
				wFunction = myWindow.BARTLETT;
				break;
			case 2:
				wFunction = myWindow.BARTLETTHANN;
				break;
			case 3:
				wFunction = myWindow.BLACKMAN;
				break;
			case 4:
				wFunction = myWindow.COSINE;
				break;
			case 5:
				wFunction = myWindow.GAUSS;
				break;
			case 6:
				wFunction = myWindow.HAMMING;
				break;
			case 7:
				wFunction = myWindow.HANN;
				break;
			case 8:
				wFunction = myWindow.LANCZOS;
				break;
			case 9:
				wFunction = myWindow.RECTANGULAR;
				break;
			case 10:
				wFunction = myWindow.TRIANGULAR;
				break;
			}
		}
		if (data.cacheSide !== undefined) {
			cacheSide = data.cacheSide;
		}
		if (data.width !== undefined) {
			mywidth = data.width;
		}
		if (data.height !== undefined) {
			myheight = data.height;
		}
		if (data.cacheWidth !== undefined) {
			cacheWidth = data.cacheWidth;
		}
		if (data.dynRangeInDB !== undefined) {
			dynRangeInDB = data.dynRangeInDB;
		}
		if (data.pixelRatio !== undefined) {
			pixelRatio = data.pixelRatio;
		}
		if (data.sampleRate !== undefined) {
			sampleRate = data.sampleRate;
		}
		if (data.streamChannels !== undefined) {
			streamChannels = data.streamChannels;
		}
		break;
	case 'pcm':
		if (data.stream !== undefined) {
			threadSoundBuffer = data.stream;
		}
		break;
	case 'render':
		parseData(N, upperFreq, lowerFreq, start, end, mywidth, myheight, cacheWidth, cacheSide, pixelRatio);
		break;
	default:
		self.postMessage('Unknown command: ' + data.msg);
		break;
	}
}, false);