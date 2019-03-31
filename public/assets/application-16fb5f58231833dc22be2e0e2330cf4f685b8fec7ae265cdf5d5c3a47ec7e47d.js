/*!
 * jQuery JavaScript Library v1.11.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-04-28T16:19Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.11.3",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];
	nodeType = context.nodeType;

	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	if ( !seed && documentIsHTML ) {

		// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
		if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType !== 1 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;
	parent = doc.defaultView;

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Support tests
	---------------------------------------------------------------------- */
	documentIsHTML = !isXML( doc );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\f]' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery(function() {
	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	// Minified: var a,b,c
	var input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		fragment = document.createDocumentFragment();

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== strundefined ) {
			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		if ( elem.ownerDocument.defaultView.opener ) {
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		}

		return window.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	// Minified: var b,c,d,e,f,g, h,i
	var div, style, a, pixelPositionVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal;

	// Setup
	div = document.createElement( "div" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];
	style = a && a.style;

	// Finish early in limited (non-browser) environments
	if ( !style ) {
		return;
	}

	style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
		style.WebkitBoxSizing === "";

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		// Support: Android 2.3
		reliableMarginRight: function() {
			if ( reliableMarginRightVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		// Minified: var b,c,d,j
		var div, body, container, contents;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = false;
		reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		contents = div.getElementsByTagName( "td" );
		contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
		reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		if ( reliableHiddenOffsetsVal ) {
			contents[ 0 ].style.display = "";
			contents[ 1 ].style.display = "none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		}

		body.removeChild( container );
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	// Minified: var a,b,c,d,e
	var input, div, select, a, opt;

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote], a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not(form button), button[data-confirm]:not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]),textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // making sure that all forms have actual up-to-date token(cached forms contain old one)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.attr('method');
          url = element.attr('action');
          data = element.serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      element.data('ujs:enable-with', element[method]());
      if (replacement !== undefined) {
        element[method](replacement);
      }

      element.prop('disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (typeof element.data('ujs:enable-with') !== 'undefined') element[method](element.data('ujs:enable-with'));
      element.prop('disabled', false);
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var inputs = $(), input, valueToCheck,
          selector = specifiedSelector || 'input,textarea',
          allInputs = form.find(selector);

      allInputs.each(function() {
        input = $(this);
        valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
        if (valueToCheck === nonBlank) {

          // Don't count unchecked required radio if other radio with same name is checked
          if (input.is('input[type=radio]') && allInputs.filter('input[type=radio]:checked[name="' + input.attr('name') + '"]').length) {
            return true; // Skip to next input
          }

          inputs = inputs.add(input);
        }
      });
      return inputs.length ? inputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      element.data('ujs:enable-with', element.html()); // store enabled state
      if (replacement !== undefined) {
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
    },

    // restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:enable-with')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:enable-with')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.buttonDisableSelector, 'ajax:complete', function() {
        rails.enableFormElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
        if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
          return rails.stopEverything(e);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      button.closest('form').data('ujs:submit-button', data);
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:send.rails', function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
/* ========================================================================
 * Bootstrap: transition.js v3.3.4
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: alert.js v3.3.4
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.4'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);
/* ========================================================================
 * Bootstrap: button.js v3.3.4
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.4'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state = state + 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked') && this.$element.hasClass('active')) changed = false
        else $parent.find('.active').removeClass('active')
      }
      if (changed) $input.prop('checked', !this.$element.hasClass('active')).trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
    }

    if (changed) this.$element.toggleClass('active')
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target)
      if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
      Plugin.call($btn, 'toggle')
      e.preventDefault()
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);
/* ========================================================================
 * Bootstrap: carousel.js v3.3.4
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.4'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: collapse.js v3.3.4
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.4'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: dropdown.js v3.3.4
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.4'

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger('shown.bs.dropdown', relatedTarget)
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if ((!isActive && e.which != 27) || (isActive && e.which == 27)) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('[role="menu"]' + desc + ', [role="listbox"]' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--                        // up
    if (e.which == 40 && index < $items.length - 1) index++                        // down
    if (!~index)                                      index = 0

    $items.eq(index).trigger('focus')
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget)
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '[role="menu"]', Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '[role="listbox"]', Dropdown.prototype.keydown)

}(jQuery);
/* ========================================================================
 * Bootstrap: modal.js v3.3.4
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.4'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element
        .addClass('in')
        .attr('aria-hidden', false)

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .attr('aria-hidden', true)
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: tooltip.js v3.3.4
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.4'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $(this.options.viewport.selector || this.options.viewport)

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (self && self.$tip && self.$tip.is(':visible')) {
      self.hoverState = 'in'
      return
    }

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var $container   = this.options.container ? $(this.options.container) : this.$element.parent()
        var containerDim = this.getPosition($container)

        placement = placement == 'bottom' && pos.bottom + actualHeight > containerDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < containerDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > containerDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < containerDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  = offset.top  + marginTop
    offset.left = offset.left + marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      that.$element
        .removeAttr('aria-describedby')
        .trigger('hidden.bs.' + that.type)
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof ($e.attr('data-original-title')) != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var elOffset  = isBody ? { top: 0, left: 0 } : $element.offset()
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.width) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    return (this.$tip = this.$tip || $(this.options.template))
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);
/* ========================================================================
 * Bootstrap: popover.js v3.3.4
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.4'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);
/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.4
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.4'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: tab.js v3.3.4
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    this.element = $(element)
  }

  Tab.VERSION = '3.3.4'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && (($active.length && $active.hasClass('fade')) || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);
/* ========================================================================
 * Bootstrap: affix.js v3.3.4
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.4'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = $(document.body).height()

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);
// Bootstrap
// Bootswatch
// loader.js













;
// Bootstrap
// Bootswatch
// bootswatch.js
;












/**
 * @version: 1.3.4
 * @author: Dan Grossman http://www.dangrossman.info/
 * @date: 2014-03-19
 * @copyright: Copyright (c) 2012-2014 Dan Grossman. All rights reserved.
 * @license: Licensed under Apache License v2.0. See http://www.apache.org/licenses/LICENSE-2.0
 * @website: http://www.improvely.com/
 */

!function ($, moment) {

    var DateRangePicker = function (element, options, cb) {

        // by default, the daterangepicker element is placed at the bottom of HTML body
        this.parentEl = 'body';

        //element that triggered the date range picker
        this.element = $(element);

        //create the picker HTML object
        var DRPTemplate = '<div class="daterangepicker dropdown-menu">' +
            '<div class="calendar left"></div>' +
            '<div class="calendar right"></div>' +
            '<div class="ranges">' +
            '<div class="range_inputs">' +
            '<div class="daterangepicker_start_input">' +
            '<label for="daterangepicker_start"></label>' +
            '<input class="input-mini" type="text" name="daterangepicker_start" value="" disabled="disabled" />' +
            '</div>' +
            '<div class="daterangepicker_end_input">' +
            '<label for="daterangepicker_end"></label>' +
            '<input class="input-mini" type="text" name="daterangepicker_end" value="" disabled="disabled" />' +
            '</div>' +
            '<button class="applyBtn" disabled="disabled"></button>&nbsp;' +
            '<button class="cancelBtn"></button>' +
            '</div>' +
            '</div>' +
            '</div>';

        //custom options
        if (typeof options !== 'object' || options === null)
            options = {};

        this.parentEl = (typeof options === 'object' && options.parentEl && $(options.parentEl).length) || $(this.parentEl);
        this.container = $(DRPTemplate).appendTo(this.parentEl);

        this.setOptions(options, cb);

        //apply CSS classes and labels to buttons
        var c = this.container;
        $.each(this.buttonClasses, function (idx, val) {
            c.find('button').addClass(val);
        });
        this.container.find('.daterangepicker_start_input label').html(this.locale.fromLabel);
        this.container.find('.daterangepicker_end_input label').html(this.locale.toLabel);
        if (this.applyClass.length)
            this.container.find('.applyBtn').addClass(this.applyClass);
        if (this.cancelClass.length)
            this.container.find('.cancelBtn').addClass(this.cancelClass);
        this.container.find('.applyBtn').html(this.locale.applyLabel);
        this.container.find('.cancelBtn').html(this.locale.cancelLabel);

        //event listeners

        this.container.find('.calendar')
            .on('click.daterangepicker', '.prev', $.proxy(this.clickPrev, this))
            .on('click.daterangepicker', '.next', $.proxy(this.clickNext, this))
            .on('click.daterangepicker', 'td.available', $.proxy(this.clickDate, this))
            .on('mouseenter.daterangepicker', 'td.available', $.proxy(this.enterDate, this))
            .on('mouseleave.daterangepicker', 'td.available', $.proxy(this.updateFormInputs, this))
            .on('change.daterangepicker', 'select.yearselect', $.proxy(this.updateMonthYear, this))
            .on('change.daterangepicker', 'select.monthselect', $.proxy(this.updateMonthYear, this))
            .on('change.daterangepicker', 'select.hourselect,select.minuteselect,select.ampmselect', $.proxy(this.updateTime, this));

        this.container.find('.ranges')
            .on('click.daterangepicker', 'button.applyBtn', $.proxy(this.clickApply, this))
            .on('click.daterangepicker', 'button.cancelBtn', $.proxy(this.clickCancel, this))
            .on('click.daterangepicker', '.daterangepicker_start_input,.daterangepicker_end_input', $.proxy(this.showCalendars, this))
            .on('click.daterangepicker', 'li', $.proxy(this.clickRange, this))
            .on('mouseenter.daterangepicker', 'li', $.proxy(this.enterRange, this))
            .on('mouseleave.daterangepicker', 'li', $.proxy(this.updateFormInputs, this));

        if (this.element.is('input')) {
            this.element.on({
                'click.daterangepicker': $.proxy(this.show, this),
                'focus.daterangepicker': $.proxy(this.show, this),
                'keyup.daterangepicker': $.proxy(this.updateFromControl, this)
            });
        } else {
            this.element.on('click.daterangepicker', $.proxy(this.toggle, this));
        }

    };

    DateRangePicker.prototype = {

        constructor: DateRangePicker,

        setOptions: function(options, callback) {

            this.startDate = moment().startOf('day');
            this.endDate = moment().endOf('day');
            this.minDate = false;
            this.maxDate = false;
            this.dateLimit = false;

            this.showDropdowns = false;
            this.showWeekNumbers = false;
            this.timePicker = false;
            this.timePickerIncrement = 30;
            this.timePicker12Hour = true;
            this.singleDatePicker = false;
            this.ranges = {};

            this.opens = 'right';
            if (this.element.hasClass('pull-right'))
                this.opens = 'left';

            this.buttonClasses = ['btn', 'btn-small'];
            this.applyClass = 'btn-success';
            this.cancelClass = 'btn-default';

            this.format = 'YYYY-MM-DD';
            this.separator = ' 到 ';

            this.locale = {
                applyLabel: '确定',
                cancelLabel: '取消',
                fromLabel: '从',
                toLabel: '到',
                weekLabel: 'W',
                customRangeLabel: 'Custom Range',
                daysOfWeek: moment()._lang._weekdaysMin.slice(),
                monthNames: moment()._lang._monthsShort.slice(),
                firstDay: 0
            };

            this.cb = function () { };

            if (typeof options.format === 'string')
                this.format = options.format;

            if (typeof options.separator === 'string')
                this.separator = options.separator;

            if (typeof options.startDate === 'string')
                this.startDate = moment(options.startDate, this.format);

            if (typeof options.endDate === 'string')
                this.endDate = moment(options.endDate, this.format);

            if (typeof options.minDate === 'string')
                this.minDate = moment(options.minDate, this.format);

            if (typeof options.maxDate === 'string')
                this.maxDate = moment(options.maxDate, this.format);

            if (typeof options.startDate === 'object')
                this.startDate = moment(options.startDate);

            if (typeof options.endDate === 'object')
                this.endDate = moment(options.endDate);

            if (typeof options.minDate === 'object')
                this.minDate = moment(options.minDate);

            if (typeof options.maxDate === 'object')
                this.maxDate = moment(options.maxDate);

            if (typeof options.applyClass === 'string')
                this.applyClass = options.applyClass;

            if (typeof options.cancelClass === 'string')
                this.cancelClass = options.cancelClass;

            if (typeof options.dateLimit === 'object')
                this.dateLimit = options.dateLimit;

            // update day names order to firstDay
            if (typeof options.locale === 'object') {

                if (typeof options.locale.daysOfWeek === 'object') {
                    // Create a copy of daysOfWeek to avoid modification of original
                    // options object for reusability in multiple daterangepicker instances
                    this.locale.daysOfWeek = options.locale.daysOfWeek.slice();
                }

                if (typeof options.locale.monthNames === 'object') {
                    this.locale.monthNames = options.locale.monthNames.slice();
                }

                if (typeof options.locale.firstDay === 'number') {
                    this.locale.firstDay = options.locale.firstDay;
                    var iterator = options.locale.firstDay;
                    while (iterator > 0) {
                        this.locale.daysOfWeek.push(this.locale.daysOfWeek.shift());
                        iterator--;
                    }
                }

                if (typeof options.locale.applyLabel === 'string') {
                    this.locale.applyLabel = options.locale.applyLabel;
                }

                if (typeof options.locale.cancelLabel === 'string') {
                    this.locale.cancelLabel = options.locale.cancelLabel;
                }

                if (typeof options.locale.fromLabel === 'string') {
                    this.locale.fromLabel = options.locale.fromLabel;
                }

                if (typeof options.locale.toLabel === 'string') {
                    this.locale.toLabel = options.locale.toLabel;
                }

                if (typeof options.locale.weekLabel === 'string') {
                    this.locale.weekLabel = options.locale.weekLabel;
                }

                if (typeof options.locale.customRangeLabel === 'string') {
                    this.locale.customRangeLabel = options.locale.customRangeLabel;
                }
            }

            if (typeof options.opens === 'string')
                this.opens = options.opens;

            if (typeof options.showWeekNumbers === 'boolean') {
                this.showWeekNumbers = options.showWeekNumbers;
            }

            if (typeof options.buttonClasses === 'string') {
                this.buttonClasses = [options.buttonClasses];
            }

            if (typeof options.buttonClasses === 'object') {
                this.buttonClasses = options.buttonClasses;
            }

            if (typeof options.showDropdowns === 'boolean') {
                this.showDropdowns = options.showDropdowns;
            }

            if (typeof options.singleDatePicker === 'boolean') {
                this.singleDatePicker = options.singleDatePicker;
            }

            if (typeof options.timePicker === 'boolean') {
                this.timePicker = options.timePicker;
            }

            if (typeof options.timePickerIncrement === 'number') {
                this.timePickerIncrement = options.timePickerIncrement;
            }

            if (typeof options.timePicker12Hour === 'boolean') {
                this.timePicker12Hour = options.timePicker12Hour;
            }

            var start, end, range;

            //if no start/end dates set, check if an input element contains initial values
            if (typeof options.startDate === 'undefined' && typeof options.endDate === 'undefined') {
                if ($(this.element).is('input[type=text]')) {
                    var val = $(this.element).val();
                    var split = val.split(this.separator);
                    start = end = null;
                    if (split.length == 2) {
                        start = moment(split[0], this.format);
                        end = moment(split[1], this.format);
                    } else if (this.singleDatePicker) {
                        start = moment(val, this.format);
                        end = moment(val, this.format);
                    }
                    if (start !== null && end !== null) {
                        this.startDate = start;
                        this.endDate = end;
                    }
                }
            }

            if (typeof options.ranges === 'object') {
                for (range in options.ranges) {

                    start = moment(options.ranges[range][0]);
                    end = moment(options.ranges[range][1]);

                    // If we have a min/max date set, bound this range
                    // to it, but only if it would otherwise fall
                    // outside of the min/max.
                    if (this.minDate && start.isBefore(this.minDate))
                        start = moment(this.minDate);

                    if (this.maxDate && end.isAfter(this.maxDate))
                        end = moment(this.maxDate);

                    // If the end of the range is before the minimum (if min is set) OR
                    // the start of the range is after the max (also if set) don't display this
                    // range option.
                    if ((this.minDate && end.isBefore(this.minDate)) || (this.maxDate && start.isAfter(this.maxDate))) {
                        continue;
                    }

                    this.ranges[range] = [start, end];
                }

                var list = '<ul>';
                for (range in this.ranges) {
                    list += '<li>' + range + '</li>';
                }
                list += '<li>' + this.locale.customRangeLabel + '</li>';
                list += '</ul>';
                this.container.find('.ranges ul').remove();
                this.container.find('.ranges').prepend(list);
            }

            if (typeof callback === 'function') {
                this.cb = callback;
            }

            if (!this.timePicker) {
                this.startDate = this.startDate.startOf('day');
                this.endDate = this.endDate.endOf('day');
            }

            if (this.singleDatePicker) {
                this.opens = 'right';
                this.container.find('.calendar.right').show();
                this.container.find('.calendar.left').hide();
                this.container.find('.ranges').hide();
                if (!this.container.find('.calendar.right').hasClass('single'))
                    this.container.find('.calendar.right').addClass('single');
            } else {
                this.container.find('.calendar.right').removeClass('single');
                this.container.find('.ranges').show();
            }

            this.oldStartDate = this.startDate.clone();
            this.oldEndDate = this.endDate.clone();
            this.oldChosenLabel = this.chosenLabel;

            this.leftCalendar = {
                month: moment([this.startDate.year(), this.startDate.month(), 1, this.startDate.hour(), this.startDate.minute()]),
                calendar: []
            };

            this.rightCalendar = {
                month: moment([this.endDate.year(), this.endDate.month(), 1, this.endDate.hour(), this.endDate.minute()]),
                calendar: []
            };

            if (this.opens == 'right') {
                //swap calendar positions
                var left = this.container.find('.calendar.left');
                var right = this.container.find('.calendar.right');
                left.removeClass('left').addClass('right');
                right.removeClass('right').addClass('left');
            }

            if (typeof options.ranges === 'undefined' && !this.singleDatePicker) {
                this.container.addClass('show-calendar');
            }

            this.container.addClass('opens' + this.opens);

            this.updateView();
            this.updateCalendars();

        },

        setStartDate: function(startDate) {
            if (typeof startDate === 'string')
                this.startDate = moment(startDate, this.format);

            if (typeof startDate === 'object')
                this.startDate = moment(startDate);

            if (!this.timePicker)
                this.startDate = this.startDate.startOf('day');

            this.oldStartDate = this.startDate.clone();

            this.updateView();
            this.updateCalendars();
        },

        setEndDate: function(endDate) {
            if (typeof endDate === 'string')
                this.endDate = moment(endDate, this.format);

            if (typeof endDate === 'object')
                this.endDate = moment(endDate);

            if (!this.timePicker)
                this.endDate = this.endDate.endOf('day');

            this.oldEndDate = this.endDate.clone();

            this.updateView();
            this.updateCalendars();
        },

        updateView: function () {
            this.leftCalendar.month.month(this.startDate.month()).year(this.startDate.year());
            this.rightCalendar.month.month(this.endDate.month()).year(this.endDate.year());
            this.updateFormInputs();
        },

        updateFormInputs: function () {
            this.container.find('input[name=daterangepicker_start]').val(this.startDate.format(this.format));
            this.container.find('input[name=daterangepicker_end]').val(this.endDate.format(this.format));

            if (this.startDate.isSame(this.endDate) || this.startDate.isBefore(this.endDate)) {
                this.container.find('button.applyBtn').removeAttr('disabled');
            } else {
                this.container.find('button.applyBtn').attr('disabled', 'disabled');
            }
        },

        updateFromControl: function () {
            if (!this.element.is('input')) return;
            if (!this.element.val().length) return;

            var dateString = this.element.val().split(this.separator);
            var start = moment(dateString[0], this.format);
            var end = moment(dateString[1], this.format);

            if (this.singleDatePicker) {
                start = moment(this.element.val(), this.format);
                end = start;
            }

            if (end.isBefore(start)) return;

            this.oldStartDate = this.startDate.clone();
            this.oldEndDate = this.endDate.clone();

            this.startDate = start;
            this.endDate = end;

            if (!this.startDate.isSame(this.oldStartDate) || !this.endDate.isSame(this.oldEndDate))
                this.notify();

            this.updateCalendars();
        },

        notify: function () {
            this.updateView();
            this.cb(this.startDate, this.endDate, this.chosenLabel);
        },

        move: function () {
            var parentOffset = { top: 0, left: 0 };
            if (!this.parentEl.is('body')) {
                parentOffset = {
                    top: this.parentEl.offset().top - this.parentEl.scrollTop(),
                    left: this.parentEl.offset().left - this.parentEl.scrollLeft()
                };
            }

            if (this.opens == 'left') {
                this.container.css({
                    top: this.element.offset().top + this.element.outerHeight() - parentOffset.top,
                    right: $(window).width() - this.element.offset().left - this.element.outerWidth() - parentOffset.left,
                    left: 'auto'
                });
                if (this.container.offset().left < 0) {
                    this.container.css({
                        right: 'auto',
                        left: 9
                    });
                }
            } else {
                this.container.css({
                    top: this.element.offset().top + this.element.outerHeight() - parentOffset.top,
                    left: this.element.offset().left - parentOffset.left,
                    right: 'auto'
                });
                if (this.container.offset().left + this.container.outerWidth() > $(window).width()) {
                    this.container.css({
                        left: 'auto',
                        right: 0
                    });
                }
            }
        },

        toggle: function (e) {
            if (this.element.hasClass('active')) {
                this.hide();
            } else {
                this.show();
            }
        },

        show: function (e) {
            this.element.addClass('active');
            this.container.show();
            this.move();

            $(document).on('click.daterangepicker', $.proxy(this.outsideClick, this));
            // also explicitly play nice with Bootstrap dropdowns, which stopPropagation when clicking them
            $(document).on('click.daterangepicker', '[data-toggle=dropdown]', $.proxy(this.outsideClick, this));

            this.element.trigger('show.daterangepicker', this);
        },

        outsideClick: function (e) {
            var target = $(e.target);
            // if the page is clicked anywhere except within the daterangerpicker/button
            // itself then call this.hide()
            if (
                target.closest(this.element).length ||
                target.closest(this.container).length ||
                target.closest('.calendar-date').length
            ) return;
            this.hide();
        },

        hide: function (e) {
            this.element.removeClass('active');
            this.container.hide();

            if (!this.startDate.isSame(this.oldStartDate) || !this.endDate.isSame(this.oldEndDate))
                this.notify();

            this.oldStartDate = this.startDate.clone();
            this.oldEndDate = this.endDate.clone();

            $(document).off('click.daterangepicker', this.outsideClick);
            this.element.trigger('hide.daterangepicker', this);
        },

        enterRange: function (e) {
            // mouse pointer has entered a range label
            var label = e.target.innerHTML;
            if (label == this.locale.customRangeLabel) {
                this.updateView();
            } else {
                var dates = this.ranges[label];
                this.container.find('input[name=daterangepicker_start]').val(dates[0].format(this.format));
                this.container.find('input[name=daterangepicker_end]').val(dates[1].format(this.format));
            }
        },

        showCalendars: function() {
            this.container.addClass('show-calendar');
            this.move();
        },

        hideCalendars: function() {
            this.container.removeClass('show-calendar');
        },

        updateInputText: function() {
            if (this.element.is('input') && !this.singleDatePicker) {
                this.element.val(this.startDate.format(this.format) + this.separator + this.endDate.format(this.format));
            } else if (this.element.is('input')) {
                this.element.val(this.startDate.format(this.format));
            }
        },

        clickRange: function (e) {
            var label = e.target.innerHTML;
            this.chosenLabel = label;
            if (label == this.locale.customRangeLabel) {
                this.showCalendars();
            } else {
                var dates = this.ranges[label];

                this.startDate = dates[0];
                this.endDate = dates[1];

                if (!this.timePicker) {
                    this.startDate.startOf('day');
                    this.endDate.endOf('day');
                }

                this.leftCalendar.month.month(this.startDate.month()).year(this.startDate.year()).hour(this.startDate.hour()).minute(this.startDate.minute());
                this.rightCalendar.month.month(this.endDate.month()).year(this.endDate.year()).hour(this.endDate.hour()).minute(this.endDate.minute());
                this.updateCalendars();

                this.updateInputText();

                this.hideCalendars();
                this.hide();
                this.element.trigger('apply.daterangepicker', this);
            }
        },

        clickPrev: function (e) {
            var cal = $(e.target).parents('.calendar');
            if (cal.hasClass('left')) {
                this.leftCalendar.month.subtract('month', 1);
            } else {
                this.rightCalendar.month.subtract('month', 1);
            }
            this.updateCalendars();
        },

        clickNext: function (e) {
            var cal = $(e.target).parents('.calendar');
            if (cal.hasClass('left')) {
                this.leftCalendar.month.add('month', 1);
            } else {
                this.rightCalendar.month.add('month', 1);
            }
            this.updateCalendars();
        },

        enterDate: function (e) {

            var title = $(e.target).attr('data-title');
            var row = title.substr(1, 1);
            var col = title.substr(3, 1);
            var cal = $(e.target).parents('.calendar');

            if (cal.hasClass('left')) {
                this.container.find('input[name=daterangepicker_start]').val(this.leftCalendar.calendar[row][col].format(this.format));
            } else {
                this.container.find('input[name=daterangepicker_end]').val(this.rightCalendar.calendar[row][col].format(this.format));
            }

        },

        clickDate: function (e) {
            var title = $(e.target).attr('data-title');
            var row = title.substr(1, 1);
            var col = title.substr(3, 1);
            var cal = $(e.target).parents('.calendar');

            var startDate, endDate;
            if (cal.hasClass('left')) {
                startDate = this.leftCalendar.calendar[row][col];
                endDate = this.endDate;
                if (typeof this.dateLimit === 'object') {
                    var maxDate = moment(startDate).add(this.dateLimit).startOf('day');
                    if (endDate.isAfter(maxDate)) {
                        endDate = maxDate;
                    }
                }
            } else {
                startDate = this.startDate;
                endDate = this.rightCalendar.calendar[row][col];
                if (typeof this.dateLimit === 'object') {
                    var minDate = moment(endDate).subtract(this.dateLimit).startOf('day');
                    if (startDate.isBefore(minDate)) {
                        startDate = minDate;
                    }
                }
            }

            if (this.singleDatePicker && cal.hasClass('left')) {
                endDate = startDate.clone();
            } else if (this.singleDatePicker && cal.hasClass('right')) {
                startDate = endDate.clone();
            }

            cal.find('td').removeClass('active');

            if (startDate.isSame(endDate) || startDate.isBefore(endDate)) {
                $(e.target).addClass('active');
                this.startDate = startDate;
                this.endDate = endDate;
                this.chosenLabel = this.locale.customRangeLabel;
            } else if (startDate.isAfter(endDate)) {
                $(e.target).addClass('active');
                var difference = this.endDate.diff(this.startDate);
                this.startDate = startDate;
                this.endDate = moment(startDate).add('ms', difference);
                this.chosenLabel = this.locale.customRangeLabel;
            }

            this.leftCalendar.month.month(this.startDate.month()).year(this.startDate.year());
            this.rightCalendar.month.month(this.endDate.month()).year(this.endDate.year());
            this.updateCalendars();

            endDate.endOf('day');

            if (this.singleDatePicker)
                this.clickApply();
        },

        clickApply: function (e) {
            this.updateInputText();
            this.hide();
            this.element.trigger('apply.daterangepicker', this);
        },

        clickCancel: function (e) {
            this.startDate = this.oldStartDate;
            this.endDate = this.oldEndDate;
            this.chosenLabel = this.oldChosenLabel;
            this.updateView();
            this.updateCalendars();
            this.hide();
            this.element.trigger('cancel.daterangepicker', this);
        },

        updateMonthYear: function (e) {
            var isLeft = $(e.target).closest('.calendar').hasClass('left'),
                leftOrRight = isLeft ? 'left' : 'right',
                cal = this.container.find('.calendar.'+leftOrRight);

            // Month must be Number for new moment versions
            var month = parseInt(cal.find('.monthselect').val(), 10);
            var year = cal.find('.yearselect').val();

            this[leftOrRight+'Calendar'].month.month(month).year(year);
            this.updateCalendars();
        },

        updateTime: function(e) {
            var isLeft = $(e.target).closest('.calendar').hasClass('left'),
                leftOrRight = isLeft ? 'left' : 'right',
                cal = this.container.find('.calendar.'+leftOrRight);

            var hour = parseInt(cal.find('.hourselect').val(), 10);
            var minute = parseInt(cal.find('.minuteselect').val(), 10);

            if (this.timePicker12Hour) {
                var ampm = cal.find('.ampmselect').val();
                if (ampm === 'PM' && hour < 12)
                    hour += 12;
                if (ampm === 'AM' && hour === 12)
                    hour = 0;
            }

            if (isLeft) {
                var start = this.startDate.clone();
                start.hour(hour);
                start.minute(minute);
                this.startDate = start;
                this.leftCalendar.month.hour(hour).minute(minute);
            } else {
                var end = this.endDate.clone();
                end.hour(hour);
                end.minute(minute);
                this.endDate = end;
                this.rightCalendar.month.hour(hour).minute(minute);
            }

            this.updateCalendars();
        },

        updateCalendars: function () {
            this.leftCalendar.calendar = this.buildCalendar(this.leftCalendar.month.month(), this.leftCalendar.month.year(), this.leftCalendar.month.hour(), this.leftCalendar.month.minute(), 'left');
            this.rightCalendar.calendar = this.buildCalendar(this.rightCalendar.month.month(), this.rightCalendar.month.year(), this.rightCalendar.month.hour(), this.rightCalendar.month.minute(), 'right');
            this.container.find('.calendar.left').html(this.renderCalendar(this.leftCalendar.calendar, this.startDate, this.minDate, this.maxDate));
            this.container.find('.calendar.right').html(this.renderCalendar(this.rightCalendar.calendar, this.endDate, this.startDate, this.maxDate));

            this.container.find('.ranges li').removeClass('active');
            var customRange = true;
            var i = 0;
            for (var range in this.ranges) {
                if (this.timePicker) {
                    if (this.startDate.isSame(this.ranges[range][0]) && this.endDate.isSame(this.ranges[range][1])) {
                        customRange = false;
                        this.chosenLabel = this.container.find('.ranges li:eq(' + i + ')')
                            .addClass('active').html();
                    }
                } else {
                    //ignore times when comparing dates if time picker is not enabled
                    if (this.startDate.format('YYYY-MM-DD') == this.ranges[range][0].format('YYYY-MM-DD') && this.endDate.format('YYYY-MM-DD') == this.ranges[range][1].format('YYYY-MM-DD')) {
                        customRange = false;
                        this.chosenLabel = this.container.find('.ranges li:eq(' + i + ')')
                            .addClass('active').html();
                    }
                }
                i++;
            }
            if (customRange) {
                this.chosenLabel = this.container.find('.ranges li:last')
                    .addClass('active').html();
            }
        },

        buildCalendar: function (month, year, hour, minute, side) {
            var firstDay = moment([year, month, 1]);
            var lastMonth = moment(firstDay).subtract('month', 1).month();
            var lastYear = moment(firstDay).subtract('month', 1).year();

            var daysInLastMonth = moment([lastYear, lastMonth]).daysInMonth();

            var dayOfWeek = firstDay.day();

            var i;

            //initialize a 6 rows x 7 columns array for the calendar
            var calendar = [];
            for (i = 0; i < 6; i++) {
                calendar[i] = [];
            }

            //populate the calendar with date objects
            var startDay = daysInLastMonth - dayOfWeek + this.locale.firstDay + 1;
            if (startDay > daysInLastMonth)
                startDay -= 7;

            if (dayOfWeek == this.locale.firstDay)
                startDay = daysInLastMonth - 6;

            var curDate = moment([lastYear, lastMonth, startDay, 12, minute]);
            var col, row;
            for (i = 0, col = 0, row = 0; i < 42; i++, col++, curDate = moment(curDate).add('hour', 24)) {
                if (i > 0 && col % 7 === 0) {
                    col = 0;
                    row++;
                }
                calendar[row][col] = curDate.clone().hour(hour);
                curDate.hour(12);
            }

            return calendar;
        },

        renderDropdowns: function (selected, minDate, maxDate) {
            var currentMonth = selected.month();
            var monthHtml = '<select class="monthselect">';
            var inMinYear = false;
            var inMaxYear = false;

            for (var m = 0; m < 12; m++) {
                if ((!inMinYear || m >= minDate.month()) && (!inMaxYear || m <= maxDate.month())) {
                    monthHtml += "<option value='" + m + "'" +
                    (m === currentMonth ? " selected='selected'" : "") +
                    ">" + this.locale.monthNames[m] + "</option>";
                }
            }
            monthHtml += "</select>";

            var currentYear = selected.year();
            var maxYear = (maxDate && maxDate.year()) || (currentYear + 5);
            var minYear = (minDate && minDate.year()) || (currentYear - 50);
            var yearHtml = '<select class="yearselect">';

            for (var y = minYear; y <= maxYear; y++) {
                yearHtml += '<option value="' + y + '"' +
                (y === currentYear ? ' selected="selected"' : '') +
                '>' + y + '</option>';
            }

            yearHtml += '</select>';

            return monthHtml + yearHtml;
        },

        renderCalendar: function (calendar, selected, minDate, maxDate) {

            var html = '<div class="calendar-date">';
            html += '<table class="table-condensed">';
            html += '<thead>';
            html += '<tr>';

            // add empty cell for week number
            if (this.showWeekNumbers)
                html += '<th></th>';

            if (!minDate || minDate.isBefore(calendar[1][1])) {
                html += '<th class="prev available"><i class="fa fa-arrow-left icon-arrow-left glyphicon glyphicon-arrow-left"></i></th>';
            } else {
                html += '<th></th>';
            }

            var dateHtml = this.locale.monthNames[calendar[1][1].month()] + calendar[1][1].format(" YYYY");

            if (this.showDropdowns) {
                dateHtml = this.renderDropdowns(calendar[1][1], minDate, maxDate);
            }

            html += '<th colspan="5" class="month">' + dateHtml + '</th>';
            if (!maxDate || maxDate.isAfter(calendar[1][1])) {
                html += '<th class="next available"><i class="fa fa-arrow-right icon-arrow-right glyphicon glyphicon-arrow-right"></i></th>';
            } else {
                html += '<th></th>';
            }

            html += '</tr>';
            html += '<tr>';

            // add week number label
            if (this.showWeekNumbers)
                html += '<th class="week">' + this.locale.weekLabel + '</th>';

            $.each(this.locale.daysOfWeek, function (index, dayOfWeek) {
                html += '<th>' + dayOfWeek + '</th>';
            });

            html += '</tr>';
            html += '</thead>';
            html += '<tbody>';

            for (var row = 0; row < 6; row++) {
                html += '<tr>';

                // add week number
                if (this.showWeekNumbers)
                    html += '<td class="week">' + calendar[row][0].week() + '</td>';

                for (var col = 0; col < 7; col++) {
                    var cname = 'available ';
                    cname += (calendar[row][col].month() == calendar[1][1].month()) ? '' : 'off';

                    if ((minDate && calendar[row][col].isBefore(minDate)) || (maxDate && calendar[row][col].isAfter(maxDate))) {
                        cname = ' off disabled ';
                    } else if (calendar[row][col].format('YYYY-MM-DD') == selected.format('YYYY-MM-DD')) {
                        cname += ' active ';
                        if (calendar[row][col].format('YYYY-MM-DD') == this.startDate.format('YYYY-MM-DD')) {
                            cname += ' start-date ';
                        }
                        if (calendar[row][col].format('YYYY-MM-DD') == this.endDate.format('YYYY-MM-DD')) {
                            cname += ' end-date ';
                        }
                    } else if (calendar[row][col] >= this.startDate && calendar[row][col] <= this.endDate) {
                        cname += ' in-range ';
                        if (calendar[row][col].isSame(this.startDate)) { cname += ' start-date '; }
                        if (calendar[row][col].isSame(this.endDate)) { cname += ' end-date '; }
                    }

                    var title = 'r' + row + 'c' + col;
                    html += '<td class="' + cname.replace(/\s+/g, ' ').replace(/^\s?(.*?)\s?$/, '$1') + '" data-title="' + title + '">' + calendar[row][col].date() + '</td>';
                }
                html += '</tr>';
            }

            html += '</tbody>';
            html += '</table>';
            html += '</div>';

            var i;
            if (this.timePicker) {

                html += '<div class="calendar-time">';
                html += '<select class="hourselect">';
                var start = 0;
                var end = 23;
                var selected_hour = selected.hour();
                if (this.timePicker12Hour) {
                    start = 1;
                    end = 12;
                    if (selected_hour >= 12)
                        selected_hour -= 12;
                    if (selected_hour === 0)
                        selected_hour = 12;
                }

                for (i = start; i <= end; i++) {
                    if (i == selected_hour) {
                        html += '<option value="' + i + '" selected="selected">' + i + '</option>';
                    } else {
                        html += '<option value="' + i + '">' + i + '</option>';
                    }
                }

                html += '</select> : ';

                html += '<select class="minuteselect">';

                for (i = 0; i < 60; i += this.timePickerIncrement) {
                    var num = i;
                    if (num < 10)
                        num = '0' + num;
                    if (i == selected.minute()) {
                        html += '<option value="' + i + '" selected="selected">' + num + '</option>';
                    } else {
                        html += '<option value="' + i + '">' + num + '</option>';
                    }
                }

                html += '</select> ';

                if (this.timePicker12Hour) {
                    html += '<select class="ampmselect">';
                    if (selected.hour() >= 12) {
                        html += '<option value="AM">AM</option><option value="PM" selected="selected">PM</option>';
                    } else {
                        html += '<option value="AM" selected="selected">AM</option><option value="PM">PM</option>';
                    }
                    html += '</select>';
                }

                html += '</div>';

            }

            return html;

        },

        remove: function() {

            this.container.remove();
            this.element.off('.daterangepicker');
            this.element.removeData('daterangepicker');

        }

    };

    $.fn.daterangepicker = function (options, cb) {
        this.each(function () {
            var el = $(this);
            if (el.data('daterangepicker'))
                el.data('daterangepicker').remove();
            el.data('daterangepicker', new DateRangePicker(el, options, cb));
        });
        return this;
    };

}(window.jQuery, window.moment);
//! moment.js
//! version : 2.5.1
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

(function (undefined) {

    /************************************
        Constants
    ************************************/

    var moment,
        VERSION = "2.5.1",
        global = this,
        round = Math.round,
        i,

        YEAR = 0,
        MONTH = 1,
        DATE = 2,
        HOUR = 3,
        MINUTE = 4,
        SECOND = 5,
        MILLISECOND = 6,

        // internal storage for language config files
        languages = {},

        // moment internal properties
        momentProperties = {
            _isAMomentObject: null,
            _i : null,
            _f : null,
            _l : null,
            _strict : null,
            _isUTC : null,
            _offset : null,  // optional. Combine with _isUTC
            _pf : null,
            _lang : null  // optional
        },

        // check for nodeJS
        hasModule = (typeof module !== 'undefined' && module.exports && typeof require !== 'undefined'),

        // ASP.NET json date format regex
        aspNetJsonRegex = /^\/?Date\((\-?\d+)/i,
        aspNetTimeSpanJsonRegex = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,

        // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
        // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
        isoDurationRegex = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/,

        // format tokens
        formattingTokens = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|X|zz?|ZZ?|.)/g,
        localFormattingTokens = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g,

        // parsing token regexes
        parseTokenOneOrTwoDigits = /\d\d?/, // 0 - 99
        parseTokenOneToThreeDigits = /\d{1,3}/, // 0 - 999
        parseTokenOneToFourDigits = /\d{1,4}/, // 0 - 9999
        parseTokenOneToSixDigits = /[+\-]?\d{1,6}/, // -999,999 - 999,999
        parseTokenDigits = /\d+/, // nonzero number of digits
        parseTokenWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, // any word (or two) characters or numbers including two/three word month in arabic.
        parseTokenTimezone = /Z|[\+\-]\d\d:?\d\d/gi, // +00:00 -00:00 +0000 -0000 or Z
        parseTokenT = /T/i, // T (ISO separator)
        parseTokenTimestampMs = /[\+\-]?\d+(\.\d{1,3})?/, // 123456789 123456789.123

        //strict parsing regexes
        parseTokenOneDigit = /\d/, // 0 - 9
        parseTokenTwoDigits = /\d\d/, // 00 - 99
        parseTokenThreeDigits = /\d{3}/, // 000 - 999
        parseTokenFourDigits = /\d{4}/, // 0000 - 9999
        parseTokenSixDigits = /[+-]?\d{6}/, // -999,999 - 999,999
        parseTokenSignedNumber = /[+-]?\d+/, // -inf - inf

        // iso 8601 regex
        // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
        isoRegex = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,

        isoFormat = 'YYYY-MM-DDTHH:mm:ssZ',

        isoDates = [
            ['YYYYYY-MM-DD', /[+-]\d{6}-\d{2}-\d{2}/],
            ['YYYY-MM-DD', /\d{4}-\d{2}-\d{2}/],
            ['GGGG-[W]WW-E', /\d{4}-W\d{2}-\d/],
            ['GGGG-[W]WW', /\d{4}-W\d{2}/],
            ['YYYY-DDD', /\d{4}-\d{3}/]
        ],

        // iso time formats and regexes
        isoTimes = [
            ['HH:mm:ss.SSSS', /(T| )\d\d:\d\d:\d\d\.\d{1,3}/],
            ['HH:mm:ss', /(T| )\d\d:\d\d:\d\d/],
            ['HH:mm', /(T| )\d\d:\d\d/],
            ['HH', /(T| )\d\d/]
        ],

        // timezone chunker "+10:00" > ["10", "00"] or "-1530" > ["-15", "30"]
        parseTimezoneChunker = /([\+\-]|\d\d)/gi,

        // getter and setter names
        proxyGettersAndSetters = 'Date|Hours|Minutes|Seconds|Milliseconds'.split('|'),
        unitMillisecondFactors = {
            'Milliseconds' : 1,
            'Seconds' : 1e3,
            'Minutes' : 6e4,
            'Hours' : 36e5,
            'Days' : 864e5,
            'Months' : 2592e6,
            'Years' : 31536e6
        },

        unitAliases = {
            ms : 'millisecond',
            s : 'second',
            m : 'minute',
            h : 'hour',
            d : 'day',
            D : 'date',
            w : 'week',
            W : 'isoWeek',
            M : 'month',
            y : 'year',
            DDD : 'dayOfYear',
            e : 'weekday',
            E : 'isoWeekday',
            gg: 'weekYear',
            GG: 'isoWeekYear'
        },

        camelFunctions = {
            dayofyear : 'dayOfYear',
            isoweekday : 'isoWeekday',
            isoweek : 'isoWeek',
            weekyear : 'weekYear',
            isoweekyear : 'isoWeekYear'
        },

        // format function strings
        formatFunctions = {},

        // tokens to ordinalize and pad
        ordinalizeTokens = 'DDD w W M D d'.split(' '),
        paddedTokens = 'M D H h m s w W'.split(' '),

        formatTokenFunctions = {
            M    : function () {
                return this.month() + 1;
            },
            MMM  : function (format) {
                return this.lang().monthsShort(this, format);
            },
            MMMM : function (format) {
                return this.lang().months(this, format);
            },
            D    : function () {
                return this.date();
            },
            DDD  : function () {
                return this.dayOfYear();
            },
            d    : function () {
                return this.day();
            },
            dd   : function (format) {
                return this.lang().weekdaysMin(this, format);
            },
            ddd  : function (format) {
                return this.lang().weekdaysShort(this, format);
            },
            dddd : function (format) {
                return this.lang().weekdays(this, format);
            },
            w    : function () {
                return this.week();
            },
            W    : function () {
                return this.isoWeek();
            },
            YY   : function () {
                return leftZeroFill(this.year() % 100, 2);
            },
            YYYY : function () {
                return leftZeroFill(this.year(), 4);
            },
            YYYYY : function () {
                return leftZeroFill(this.year(), 5);
            },
            YYYYYY : function () {
                var y = this.year(), sign = y >= 0 ? '+' : '-';
                return sign + leftZeroFill(Math.abs(y), 6);
            },
            gg   : function () {
                return leftZeroFill(this.weekYear() % 100, 2);
            },
            gggg : function () {
                return leftZeroFill(this.weekYear(), 4);
            },
            ggggg : function () {
                return leftZeroFill(this.weekYear(), 5);
            },
            GG   : function () {
                return leftZeroFill(this.isoWeekYear() % 100, 2);
            },
            GGGG : function () {
                return leftZeroFill(this.isoWeekYear(), 4);
            },
            GGGGG : function () {
                return leftZeroFill(this.isoWeekYear(), 5);
            },
            e : function () {
                return this.weekday();
            },
            E : function () {
                return this.isoWeekday();
            },
            a    : function () {
                return this.lang().meridiem(this.hours(), this.minutes(), true);
            },
            A    : function () {
                return this.lang().meridiem(this.hours(), this.minutes(), false);
            },
            H    : function () {
                return this.hours();
            },
            h    : function () {
                return this.hours() % 12 || 12;
            },
            m    : function () {
                return this.minutes();
            },
            s    : function () {
                return this.seconds();
            },
            S    : function () {
                return toInt(this.milliseconds() / 100);
            },
            SS   : function () {
                return leftZeroFill(toInt(this.milliseconds() / 10), 2);
            },
            SSS  : function () {
                return leftZeroFill(this.milliseconds(), 3);
            },
            SSSS : function () {
                return leftZeroFill(this.milliseconds(), 3);
            },
            Z    : function () {
                var a = -this.zone(),
                    b = "+";
                if (a < 0) {
                    a = -a;
                    b = "-";
                }
                return b + leftZeroFill(toInt(a / 60), 2) + ":" + leftZeroFill(toInt(a) % 60, 2);
            },
            ZZ   : function () {
                var a = -this.zone(),
                    b = "+";
                if (a < 0) {
                    a = -a;
                    b = "-";
                }
                return b + leftZeroFill(toInt(a / 60), 2) + leftZeroFill(toInt(a) % 60, 2);
            },
            z : function () {
                return this.zoneAbbr();
            },
            zz : function () {
                return this.zoneName();
            },
            X    : function () {
                return this.unix();
            },
            Q : function () {
                return this.quarter();
            }
        },

        lists = ['months', 'monthsShort', 'weekdays', 'weekdaysShort', 'weekdaysMin'];

    function defaultParsingFlags() {
        // We need to deep clone this object, and es5 standard is not very
        // helpful.
        return {
            empty : false,
            unusedTokens : [],
            unusedInput : [],
            overflow : -2,
            charsLeftOver : 0,
            nullInput : false,
            invalidMonth : null,
            invalidFormat : false,
            userInvalidated : false,
            iso: false
        };
    }

    function padToken(func, count) {
        return function (a) {
            return leftZeroFill(func.call(this, a), count);
        };
    }
    function ordinalizeToken(func, period) {
        return function (a) {
            return this.lang().ordinal(func.call(this, a), period);
        };
    }

    while (ordinalizeTokens.length) {
        i = ordinalizeTokens.pop();
        formatTokenFunctions[i + 'o'] = ordinalizeToken(formatTokenFunctions[i], i);
    }
    while (paddedTokens.length) {
        i = paddedTokens.pop();
        formatTokenFunctions[i + i] = padToken(formatTokenFunctions[i], 2);
    }
    formatTokenFunctions.DDDD = padToken(formatTokenFunctions.DDD, 3);


    /************************************
        Constructors
    ************************************/

    function Language() {

    }

    // Moment prototype object
    function Moment(config) {
        checkOverflow(config);
        extend(this, config);
    }

    // Duration Constructor
    function Duration(duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        // representation for dateAddRemove
        this._milliseconds = +milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 36e5; // 1000 * 60 * 60
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days +
            weeks * 7;
        // It is impossible translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months +
            years * 12;

        this._data = {};

        this._bubble();
    }

    /************************************
        Helpers
    ************************************/


    function extend(a, b) {
        for (var i in b) {
            if (b.hasOwnProperty(i)) {
                a[i] = b[i];
            }
        }

        if (b.hasOwnProperty("toString")) {
            a.toString = b.toString;
        }

        if (b.hasOwnProperty("valueOf")) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function cloneMoment(m) {
        var result = {}, i;
        for (i in m) {
            if (m.hasOwnProperty(i) && momentProperties.hasOwnProperty(i)) {
                result[i] = m[i];
            }
        }

        return result;
    }

    function absRound(number) {
        if (number < 0) {
            return Math.ceil(number);
        } else {
            return Math.floor(number);
        }
    }

    // left zero fill a number
    // see http://jsperf.com/left-zero-filling for performance comparison
    function leftZeroFill(number, targetLength, forceSign) {
        var output = '' + Math.abs(number),
            sign = number >= 0;

        while (output.length < targetLength) {
            output = '0' + output;
        }
        return (sign ? (forceSign ? '+' : '') : '-') + output;
    }

    // helper function for _.addTime and _.subtractTime
    function addOrSubtractDurationFromMoment(mom, duration, isAdding, ignoreUpdateOffset) {
        var milliseconds = duration._milliseconds,
            days = duration._days,
            months = duration._months,
            minutes,
            hours;

        if (milliseconds) {
            mom._d.setTime(+mom._d + milliseconds * isAdding);
        }
        // store the minutes and hours so we can restore them
        if (days || months) {
            minutes = mom.minute();
            hours = mom.hour();
        }
        if (days) {
            mom.date(mom.date() + days * isAdding);
        }
        if (months) {
            mom.month(mom.month() + months * isAdding);
        }
        if (milliseconds && !ignoreUpdateOffset) {
            moment.updateOffset(mom);
        }
        // restore the minutes and hours after possibly changing dst
        if (days || months) {
            mom.minute(minutes);
            mom.hour(hours);
        }
    }

    // check if is an array
    function isArray(input) {
        return Object.prototype.toString.call(input) === '[object Array]';
    }

    function isDate(input) {
        return  Object.prototype.toString.call(input) === '[object Date]' ||
                input instanceof Date;
    }

    // compare two arrays, return the number of differences
    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if ((dontConvert && array1[i] !== array2[i]) ||
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    function normalizeUnits(units) {
        if (units) {
            var lowered = units.toLowerCase().replace(/(.)s$/, '$1');
            units = unitAliases[units] || camelFunctions[lowered] || lowered;
        }
        return units;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop;

        for (prop in inputObject) {
            if (inputObject.hasOwnProperty(prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }

        return normalizedInput;
    }

    function makeList(field) {
        var count, setter;

        if (field.indexOf('week') === 0) {
            count = 7;
            setter = 'day';
        }
        else if (field.indexOf('month') === 0) {
            count = 12;
            setter = 'month';
        }
        else {
            return;
        }

        moment[field] = function (format, index) {
            var i, getter,
                method = moment.fn._lang[field],
                results = [];

            if (typeof format === 'number') {
                index = format;
                format = undefined;
            }

            getter = function (i) {
                var m = moment().utc().set(setter, i);
                return method.call(moment.fn._lang, m, format || '');
            };

            if (index != null) {
                return getter(index);
            }
            else {
                for (i = 0; i < count; i++) {
                    results.push(getter(i));
                }
                return results;
            }
        };
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            if (coercedNumber >= 0) {
                value = Math.floor(coercedNumber);
            } else {
                value = Math.ceil(coercedNumber);
            }
        }

        return value;
    }

    function daysInMonth(year, month) {
        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    }

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    function checkOverflow(m) {
        var overflow;
        if (m._a && m._pf.overflow === -2) {
            overflow =
                m._a[MONTH] < 0 || m._a[MONTH] > 11 ? MONTH :
                m._a[DATE] < 1 || m._a[DATE] > daysInMonth(m._a[YEAR], m._a[MONTH]) ? DATE :
                m._a[HOUR] < 0 || m._a[HOUR] > 23 ? HOUR :
                m._a[MINUTE] < 0 || m._a[MINUTE] > 59 ? MINUTE :
                m._a[SECOND] < 0 || m._a[SECOND] > 59 ? SECOND :
                m._a[MILLISECOND] < 0 || m._a[MILLISECOND] > 999 ? MILLISECOND :
                -1;

            if (m._pf._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
                overflow = DATE;
            }

            m._pf.overflow = overflow;
        }
    }

    function isValid(m) {
        if (m._isValid == null) {
            m._isValid = !isNaN(m._d.getTime()) &&
                m._pf.overflow < 0 &&
                !m._pf.empty &&
                !m._pf.invalidMonth &&
                !m._pf.nullInput &&
                !m._pf.invalidFormat &&
                !m._pf.userInvalidated;

            if (m._strict) {
                m._isValid = m._isValid &&
                    m._pf.charsLeftOver === 0 &&
                    m._pf.unusedTokens.length === 0;
            }
        }
        return m._isValid;
    }

    function normalizeLanguage(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

    // Return a moment from input, that is local/utc/zone equivalent to model.
    function makeAs(input, model) {
        return model._isUTC ? moment(input).zone(model._offset || 0) :
            moment(input).local();
    }

    /************************************
        Languages
    ************************************/


    extend(Language.prototype, {

        set : function (config) {
            var prop, i;
            for (i in config) {
                prop = config[i];
                if (typeof prop === 'function') {
                    this[i] = prop;
                } else {
                    this['_' + i] = prop;
                }
            }
        },

        _months : "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),
        months : function (m) {
            return this._months[m.month()];
        },

        _monthsShort : "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
        monthsShort : function (m) {
            return this._monthsShort[m.month()];
        },

        monthsParse : function (monthName) {
            var i, mom, regex;

            if (!this._monthsParse) {
                this._monthsParse = [];
            }

            for (i = 0; i < 12; i++) {
                // make the regex if we don't have it already
                if (!this._monthsParse[i]) {
                    mom = moment.utc([2000, i]);
                    regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                    this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
                }
                // test the regex
                if (this._monthsParse[i].test(monthName)) {
                    return i;
                }
            }
        },

        _weekdays : "星期天_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),
        weekdays : function (m) {
            return this._weekdays[m.day()];
        },

        _weekdaysShort : "周天_周一_周二_周三_周四_周五_周六".split("_"),
        weekdaysShort : function (m) {
            return this._weekdaysShort[m.day()];
        },

        _weekdaysMin : "七_一_二_三_四_五_六".split("_"),
        weekdaysMin : function (m) {
            return this._weekdaysMin[m.day()];
        },

        weekdaysParse : function (weekdayName) {
            var i, mom, regex;

            if (!this._weekdaysParse) {
                this._weekdaysParse = [];
            }

            for (i = 0; i < 7; i++) {
                // make the regex if we don't have it already
                if (!this._weekdaysParse[i]) {
                    mom = moment([2000, 1]).day(i);
                    regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                    this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
                }
                // test the regex
                if (this._weekdaysParse[i].test(weekdayName)) {
                    return i;
                }
            }
        },

        _longDateFormat : {
            LT : "h:mm A",
            L : "MM/DD/YYYY",
            LL : "MMMM D YYYY",
            LLL : "MMMM D YYYY LT",
            LLLL : "dddd, MMMM D YYYY LT"
        },
        longDateFormat : function (key) {
            var output = this._longDateFormat[key];
            if (!output && this._longDateFormat[key.toUpperCase()]) {
                output = this._longDateFormat[key.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function (val) {
                    return val.slice(1);
                });
                this._longDateFormat[key] = output;
            }
            return output;
        },

        isPM : function (input) {
            // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
            // Using charAt should be more compatible.
            return ((input + '').toLowerCase().charAt(0) === 'p');
        },

        _meridiemParse : /[ap]\.?m?\.?/i,
        meridiem : function (hours, minutes, isLower) {
            if (hours > 11) {
                return isLower ? 'pm' : 'PM';
            } else {
                return isLower ? 'am' : 'AM';
            }
        },

        _calendar : {
            sameDay : '[Today at] LT',
            nextDay : '[Tomorrow at] LT',
            nextWeek : 'dddd [at] LT',
            lastDay : '[Yesterday at] LT',
            lastWeek : '[Last] dddd [at] LT',
            sameElse : 'L'
        },
        calendar : function (key, mom) {
            var output = this._calendar[key];
            return typeof output === 'function' ? output.apply(mom) : output;
        },

        _relativeTime : {
            future : "in %s",
            past : "%s ago",
            s : "a few seconds",
            m : "a minute",
            mm : "%d minutes",
            h : "an hour",
            hh : "%d hours",
            d : "a day",
            dd : "%d days",
            M : "a month",
            MM : "%d months",
            y : "a year",
            yy : "%d years"
        },
        relativeTime : function (number, withoutSuffix, string, isFuture) {
            var output = this._relativeTime[string];
            return (typeof output === 'function') ?
                output(number, withoutSuffix, string, isFuture) :
                output.replace(/%d/i, number);
        },
        pastFuture : function (diff, output) {
            var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
            return typeof format === 'function' ? format(output) : format.replace(/%s/i, output);
        },

        ordinal : function (number) {
            return this._ordinal.replace("%d", number);
        },
        _ordinal : "%d",

        preparse : function (string) {
            return string;
        },

        postformat : function (string) {
            return string;
        },

        week : function (mom) {
            return weekOfYear(mom, this._week.dow, this._week.doy).week;
        },

        _week : {
            dow : 0, // Sunday is the first day of the week.
            doy : 6  // The week that contains Jan 1st is the first week of the year.
        },

        _invalidDate: 'Invalid date',
        invalidDate: function () {
            return this._invalidDate;
        }
    });

    // Loads a language definition into the `languages` cache.  The function
    // takes a key and optionally values.  If not in the browser and no values
    // are provided, it will load the language file module.  As a convenience,
    // this function also returns the language values.
    function loadLang(key, values) {
        values.abbr = key;
        if (!languages[key]) {
            languages[key] = new Language();
        }
        languages[key].set(values);
        return languages[key];
    }

    // Remove a language from the `languages` cache. Mostly useful in tests.
    function unloadLang(key) {
        delete languages[key];
    }

    // Determines which language definition to use and returns it.
    //
    // With no parameters, it will return the global language.  If you
    // pass in a language key, such as 'en', it will return the
    // definition for 'en', so long as 'en' has already been loaded using
    // moment.lang.
    function getLangDefinition(key) {
        var i = 0, j, lang, next, split,
            get = function (k) {
                if (!languages[k] && hasModule) {
                    try {
                        require('./lang/' + k);
                    } catch (e) { }
                }
                return languages[k];
            };

        if (!key) {
            return moment.fn._lang;
        }

        if (!isArray(key)) {
            //short-circuit everything else
            lang = get(key);
            if (lang) {
                return lang;
            }
            key = [key];
        }

        //pick the language from the array
        //try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
        //substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
        while (i < key.length) {
            split = normalizeLanguage(key[i]).split('-');
            j = split.length;
            next = normalizeLanguage(key[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                lang = get(split.slice(0, j).join('-'));
                if (lang) {
                    return lang;
                }
                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                    //the next array item is better than a shallower substring of this one
                    break;
                }
                j--;
            }
            i++;
        }
        return moment.fn._lang;
    }

    /************************************
        Formatting
    ************************************/


    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, "");
        }
        return input.replace(/\\/g, "");
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens), i, length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = "";
            for (i = 0; i < length; i++) {
                output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {

        if (!m.isValid()) {
            return m.lang().invalidDate();
        }

        format = expandFormat(format, m.lang());

        if (!formatFunctions[format]) {
            formatFunctions[format] = makeFormatFunction(format);
        }

        return formatFunctions[format](m);
    }

    function expandFormat(format, lang) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return lang.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }

        return format;
    }


    /************************************
        Parsing
    ************************************/


    // get the regex to find the next token
    function getParseRegexForToken(token, config) {
        var a, strict = config._strict;
        switch (token) {
        case 'DDDD':
            return parseTokenThreeDigits;
        case 'YYYY':
        case 'GGGG':
        case 'gggg':
            return strict ? parseTokenFourDigits : parseTokenOneToFourDigits;
        case 'Y':
        case 'G':
        case 'g':
            return parseTokenSignedNumber;
        case 'YYYYYY':
        case 'YYYYY':
        case 'GGGGG':
        case 'ggggg':
            return strict ? parseTokenSixDigits : parseTokenOneToSixDigits;
        case 'S':
            if (strict) { return parseTokenOneDigit; }
            /* falls through */
        case 'SS':
            if (strict) { return parseTokenTwoDigits; }
            /* falls through */
        case 'SSS':
            if (strict) { return parseTokenThreeDigits; }
            /* falls through */
        case 'DDD':
            return parseTokenOneToThreeDigits;
        case 'MMM':
        case 'MMMM':
        case 'dd':
        case 'ddd':
        case 'dddd':
            return parseTokenWord;
        case 'a':
        case 'A':
            return getLangDefinition(config._l)._meridiemParse;
        case 'X':
            return parseTokenTimestampMs;
        case 'Z':
        case 'ZZ':
            return parseTokenTimezone;
        case 'T':
            return parseTokenT;
        case 'SSSS':
            return parseTokenDigits;
        case 'MM':
        case 'DD':
        case 'YY':
        case 'GG':
        case 'gg':
        case 'HH':
        case 'hh':
        case 'mm':
        case 'ss':
        case 'ww':
        case 'WW':
            return strict ? parseTokenTwoDigits : parseTokenOneOrTwoDigits;
        case 'M':
        case 'D':
        case 'd':
        case 'H':
        case 'h':
        case 'm':
        case 's':
        case 'w':
        case 'W':
        case 'e':
        case 'E':
            return parseTokenOneOrTwoDigits;
        default :
            a = new RegExp(regexpEscape(unescapeFormat(token.replace('\\', '')), "i"));
            return a;
        }
    }

    function timezoneMinutesFromString(string) {
        string = string || "";
        var possibleTzMatches = (string.match(parseTokenTimezone) || []),
            tzChunk = possibleTzMatches[possibleTzMatches.length - 1] || [],
            parts = (tzChunk + '').match(parseTimezoneChunker) || ['-', 0, 0],
            minutes = +(parts[1] * 60) + toInt(parts[2]);

        return parts[0] === '+' ? -minutes : minutes;
    }

    // function to convert string input to date
    function addTimeToArrayFromToken(token, input, config) {
        var a, datePartArray = config._a;

        switch (token) {
        // MONTH
        case 'M' : // fall through to MM
        case 'MM' :
            if (input != null) {
                datePartArray[MONTH] = toInt(input) - 1;
            }
            break;
        case 'MMM' : // fall through to MMMM
        case 'MMMM' :
            a = getLangDefinition(config._l).monthsParse(input);
            // if we didn't find a month name, mark the date as invalid.
            if (a != null) {
                datePartArray[MONTH] = a;
            } else {
                config._pf.invalidMonth = input;
            }
            break;
        // DAY OF MONTH
        case 'D' : // fall through to DD
        case 'DD' :
            if (input != null) {
                datePartArray[DATE] = toInt(input);
            }
            break;
        // DAY OF YEAR
        case 'DDD' : // fall through to DDDD
        case 'DDDD' :
            if (input != null) {
                config._dayOfYear = toInt(input);
            }

            break;
        // YEAR
        case 'YY' :
            datePartArray[YEAR] = toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
            break;
        case 'YYYY' :
        case 'YYYYY' :
        case 'YYYYYY' :
            datePartArray[YEAR] = toInt(input);
            break;
        // AM / PM
        case 'a' : // fall through to A
        case 'A' :
            config._isPm = getLangDefinition(config._l).isPM(input);
            break;
        // 24 HOUR
        case 'H' : // fall through to hh
        case 'HH' : // fall through to hh
        case 'h' : // fall through to hh
        case 'hh' :
            datePartArray[HOUR] = toInt(input);
            break;
        // MINUTE
        case 'm' : // fall through to mm
        case 'mm' :
            datePartArray[MINUTE] = toInt(input);
            break;
        // SECOND
        case 's' : // fall through to ss
        case 'ss' :
            datePartArray[SECOND] = toInt(input);
            break;
        // MILLISECOND
        case 'S' :
        case 'SS' :
        case 'SSS' :
        case 'SSSS' :
            datePartArray[MILLISECOND] = toInt(('0.' + input) * 1000);
            break;
        // UNIX TIMESTAMP WITH MS
        case 'X':
            config._d = new Date(parseFloat(input) * 1000);
            break;
        // TIMEZONE
        case 'Z' : // fall through to ZZ
        case 'ZZ' :
            config._useUTC = true;
            config._tzm = timezoneMinutesFromString(input);
            break;
        case 'w':
        case 'ww':
        case 'W':
        case 'WW':
        case 'd':
        case 'dd':
        case 'ddd':
        case 'dddd':
        case 'e':
        case 'E':
            token = token.substr(0, 1);
            /* falls through */
        case 'gg':
        case 'gggg':
        case 'GG':
        case 'GGGG':
        case 'GGGGG':
            token = token.substr(0, 2);
            if (input) {
                config._w = config._w || {};
                config._w[token] = input;
            }
            break;
        }
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function dateFromConfig(config) {
        var i, date, input = [], currentDate,
            yearToUse, fixYear, w, temp, lang, weekday, week;

        if (config._d) {
            return;
        }

        currentDate = currentDateArray(config);

        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            fixYear = function (val) {
                var int_val = parseInt(val, 10);
                return val ?
                  (val.length < 3 ? (int_val > 68 ? 1900 + int_val : 2000 + int_val) : int_val) :
                  (config._a[YEAR] == null ? moment().weekYear() : config._a[YEAR]);
            };

            w = config._w;
            if (w.GG != null || w.W != null || w.E != null) {
                temp = dayOfYearFromWeeks(fixYear(w.GG), w.W || 1, w.E, 4, 1);
            }
            else {
                lang = getLangDefinition(config._l);
                weekday = w.d != null ?  parseWeekday(w.d, lang) :
                  (w.e != null ?  parseInt(w.e, 10) + lang._week.dow : 0);

                week = parseInt(w.w, 10) || 1;

                //if we're parsing 'd', then the low day numbers may be next week
                if (w.d != null && weekday < lang._week.dow) {
                    week++;
                }

                temp = dayOfYearFromWeeks(fixYear(w.gg), week, weekday, lang._week.doy, lang._week.dow);
            }

            config._a[YEAR] = temp.year;
            config._dayOfYear = temp.dayOfYear;
        }

        //if the day of the year is set, figure out what it is
        if (config._dayOfYear) {
            yearToUse = config._a[YEAR] == null ? currentDate[YEAR] : config._a[YEAR];

            if (config._dayOfYear > daysInYear(yearToUse)) {
                config._pf._overflowDayOfYear = true;
            }

            date = makeUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }

        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }

        // Zero out whatever was not defaulted, including time
        for (; i < 7; i++) {
            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
        }

        // add the offsets to the time to be parsed so that we can have a clean array for checking isValid
        input[HOUR] += toInt((config._tzm || 0) / 60);
        input[MINUTE] += toInt((config._tzm || 0) % 60);

        config._d = (config._useUTC ? makeUTCDate : makeDate).apply(null, input);
    }

    function dateFromObject(config) {
        var normalizedInput;

        if (config._d) {
            return;
        }

        normalizedInput = normalizeObjectUnits(config._i);
        config._a = [
            normalizedInput.year,
            normalizedInput.month,
            normalizedInput.day,
            normalizedInput.hour,
            normalizedInput.minute,
            normalizedInput.second,
            normalizedInput.millisecond
        ];

        dateFromConfig(config);
    }

    function currentDateArray(config) {
        var now = new Date();
        if (config._useUTC) {
            return [
                now.getUTCFullYear(),
                now.getUTCMonth(),
                now.getUTCDate()
            ];
        } else {
            return [now.getFullYear(), now.getMonth(), now.getDate()];
        }
    }

    // date from string and format string
    function makeDateFromStringAndFormat(config) {

        config._a = [];
        config._pf.empty = true;

        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var lang = getLangDefinition(config._l),
            string = '' + config._i,
            i, parsedInput, tokens, token, skipped,
            stringLength = string.length,
            totalParsedInputLength = 0;

        tokens = expandFormat(config._f, lang).match(formattingTokens) || [];

        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    config._pf.unusedInput.push(skipped);
                }
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    config._pf.empty = false;
                }
                else {
                    config._pf.unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            }
            else if (config._strict && !parsedInput) {
                config._pf.unusedTokens.push(token);
            }
        }

        // add remaining unparsed input length to the string
        config._pf.charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) {
            config._pf.unusedInput.push(string);
        }

        // handle am pm
        if (config._isPm && config._a[HOUR] < 12) {
            config._a[HOUR] += 12;
        }
        // if is 12 am, change hours to 0
        if (config._isPm === false && config._a[HOUR] === 12) {
            config._a[HOUR] = 0;
        }

        dateFromConfig(config);
        checkOverflow(config);
    }

    function unescapeFormat(s) {
        return s.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
        });
    }

    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function regexpEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    // date from string and array of format strings
    function makeDateFromStringAndArray(config) {
        var tempConfig,
            bestMoment,

            scoreToBeat,
            i,
            currentScore;

        if (config._f.length === 0) {
            config._pf.invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }

        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            tempConfig = extend({}, config);
            tempConfig._pf = defaultParsingFlags();
            tempConfig._f = config._f[i];
            makeDateFromStringAndFormat(tempConfig);

            if (!isValid(tempConfig)) {
                continue;
            }

            // if there is any input that was not parsed add a penalty for that format
            currentScore += tempConfig._pf.charsLeftOver;

            //or tokens
            currentScore += tempConfig._pf.unusedTokens.length * 10;

            tempConfig._pf.score = currentScore;

            if (scoreToBeat == null || currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
            }
        }

        extend(config, bestMoment || tempConfig);
    }

    // date from iso format
    function makeDateFromString(config) {
        var i, l,
            string = config._i,
            match = isoRegex.exec(string);

        if (match) {
            config._pf.iso = true;
            for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(string)) {
                    // match[5] should be "T" or undefined
                    config._f = isoDates[i][0] + (match[6] || " ");
                    break;
                }
            }
            for (i = 0, l = isoTimes.length; i < l; i++) {
                if (isoTimes[i][1].exec(string)) {
                    config._f += isoTimes[i][0];
                    break;
                }
            }
            if (string.match(parseTokenTimezone)) {
                config._f += "Z";
            }
            makeDateFromStringAndFormat(config);
        }
        else {
            config._d = new Date(string);
        }
    }

    function makeDateFromInput(config) {
        var input = config._i,
            matched = aspNetJsonRegex.exec(input);

        if (input === undefined) {
            config._d = new Date();
        } else if (matched) {
            config._d = new Date(+matched[1]);
        } else if (typeof input === 'string') {
            makeDateFromString(config);
        } else if (isArray(input)) {
            config._a = input.slice(0);
            dateFromConfig(config);
        } else if (isDate(input)) {
            config._d = new Date(+input);
        } else if (typeof(input) === 'object') {
            dateFromObject(config);
        } else {
            config._d = new Date(input);
        }
    }

    function makeDate(y, m, d, h, M, s, ms) {
        //can't just apply() to create a date:
        //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
        var date = new Date(y, m, d, h, M, s, ms);

        //the date constructor doesn't accept years < 1970
        if (y < 1970) {
            date.setFullYear(y);
        }
        return date;
    }

    function makeUTCDate(y) {
        var date = new Date(Date.UTC.apply(null, arguments));
        if (y < 1970) {
            date.setUTCFullYear(y);
        }
        return date;
    }

    function parseWeekday(input, language) {
        if (typeof input === 'string') {
            if (!isNaN(input)) {
                input = parseInt(input, 10);
            }
            else {
                input = language.weekdaysParse(input);
                if (typeof input !== 'number') {
                    return null;
                }
            }
        }
        return input;
    }

    /************************************
        Relative Time
    ************************************/


    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, lang) {
        return lang.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function relativeTime(milliseconds, withoutSuffix, lang) {
        var seconds = round(Math.abs(milliseconds) / 1000),
            minutes = round(seconds / 60),
            hours = round(minutes / 60),
            days = round(hours / 24),
            years = round(days / 365),
            args = seconds < 45 && ['s', seconds] ||
                minutes === 1 && ['m'] ||
                minutes < 45 && ['mm', minutes] ||
                hours === 1 && ['h'] ||
                hours < 22 && ['hh', hours] ||
                days === 1 && ['d'] ||
                days <= 25 && ['dd', days] ||
                days <= 45 && ['M'] ||
                days < 345 && ['MM', round(days / 30)] ||
                years === 1 && ['y'] || ['yy', years];
        args[2] = withoutSuffix;
        args[3] = milliseconds > 0;
        args[4] = lang;
        return substituteTimeAgo.apply({}, args);
    }


    /************************************
        Week of Year
    ************************************/


    // firstDayOfWeek       0 = sun, 6 = sat
    //                      the day of the week that starts the week
    //                      (usually sunday or monday)
    // firstDayOfWeekOfYear 0 = sun, 6 = sat
    //                      the first week is the week that contains the first
    //                      of this day of the week
    //                      (eg. ISO weeks use thursday (4))
    function weekOfYear(mom, firstDayOfWeek, firstDayOfWeekOfYear) {
        var end = firstDayOfWeekOfYear - firstDayOfWeek,
            daysToDayOfWeek = firstDayOfWeekOfYear - mom.day(),
            adjustedMoment;


        if (daysToDayOfWeek > end) {
            daysToDayOfWeek -= 7;
        }

        if (daysToDayOfWeek < end - 7) {
            daysToDayOfWeek += 7;
        }

        adjustedMoment = moment(mom).add('d', daysToDayOfWeek);
        return {
            week: Math.ceil(adjustedMoment.dayOfYear() / 7),
            year: adjustedMoment.year()
        };
    }

    //http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, firstDayOfWeekOfYear, firstDayOfWeek) {
        var d = makeUTCDate(year, 0, 1).getUTCDay(), daysToAdd, dayOfYear;

        weekday = weekday != null ? weekday : firstDayOfWeek;
        daysToAdd = firstDayOfWeek - d + (d > firstDayOfWeekOfYear ? 7 : 0) - (d < firstDayOfWeek ? 7 : 0);
        dayOfYear = 7 * (week - 1) + (weekday - firstDayOfWeek) + daysToAdd + 1;

        return {
            year: dayOfYear > 0 ? year : year - 1,
            dayOfYear: dayOfYear > 0 ?  dayOfYear : daysInYear(year - 1) + dayOfYear
        };
    }

    /************************************
        Top Level Functions
    ************************************/

    function makeMoment(config) {
        var input = config._i,
            format = config._f;

        if (input === null) {
            return moment.invalid({nullInput: true});
        }

        if (typeof input === 'string') {
            config._i = input = getLangDefinition().preparse(input);
        }

        if (moment.isMoment(input)) {
            config = cloneMoment(input);

            config._d = new Date(+input._d);
        } else if (format) {
            if (isArray(format)) {
                makeDateFromStringAndArray(config);
            } else {
                makeDateFromStringAndFormat(config);
            }
        } else {
            makeDateFromInput(config);
        }

        return new Moment(config);
    }

    moment = function (input, format, lang, strict) {
        var c;

        if (typeof(lang) === "boolean") {
            strict = lang;
            lang = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c = {};
        c._isAMomentObject = true;
        c._i = input;
        c._f = format;
        c._l = lang;
        c._strict = strict;
        c._isUTC = false;
        c._pf = defaultParsingFlags();

        return makeMoment(c);
    };

    // creating with utc
    moment.utc = function (input, format, lang, strict) {
        var c;

        if (typeof(lang) === "boolean") {
            strict = lang;
            lang = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c = {};
        c._isAMomentObject = true;
        c._useUTC = true;
        c._isUTC = true;
        c._l = lang;
        c._i = input;
        c._f = format;
        c._strict = strict;
        c._pf = defaultParsingFlags();

        return makeMoment(c).utc();
    };

    // creating with unix timestamp (in seconds)
    moment.unix = function (input) {
        return moment(input * 1000);
    };

    // duration
    moment.duration = function (input, key) {
        var duration = input,
            // matching against regexp is expensive, do it on demand
            match = null,
            sign,
            ret,
            parseIso;

        if (moment.isDuration(input)) {
            duration = {
                ms: input._milliseconds,
                d: input._days,
                M: input._months
            };
        } else if (typeof input === 'number') {
            duration = {};
            if (key) {
                duration[key] = input;
            } else {
                duration.milliseconds = input;
            }
        } else if (!!(match = aspNetTimeSpanJsonRegex.exec(input))) {
            sign = (match[1] === "-") ? -1 : 1;
            duration = {
                y: 0,
                d: toInt(match[DATE]) * sign,
                h: toInt(match[HOUR]) * sign,
                m: toInt(match[MINUTE]) * sign,
                s: toInt(match[SECOND]) * sign,
                ms: toInt(match[MILLISECOND]) * sign
            };
        } else if (!!(match = isoDurationRegex.exec(input))) {
            sign = (match[1] === "-") ? -1 : 1;
            parseIso = function (inp) {
                // We'd normally use ~~inp for this, but unfortunately it also
                // converts floats to ints.
                // inp may be undefined, so careful calling replace on it.
                var res = inp && parseFloat(inp.replace(',', '.'));
                // apply sign while we're at it
                return (isNaN(res) ? 0 : res) * sign;
            };
            duration = {
                y: parseIso(match[2]),
                M: parseIso(match[3]),
                d: parseIso(match[4]),
                h: parseIso(match[5]),
                m: parseIso(match[6]),
                s: parseIso(match[7]),
                w: parseIso(match[8])
            };
        }

        ret = new Duration(duration);

        if (moment.isDuration(input) && input.hasOwnProperty('_lang')) {
            ret._lang = input._lang;
        }

        return ret;
    };

    // version number
    moment.version = VERSION;

    // default format
    moment.defaultFormat = isoFormat;

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    moment.updateOffset = function () {};

    // This function will load languages and then set the global language.  If
    // no arguments are passed in, it will simply return the current global
    // language key.
    moment.lang = function (key, values) {
        var r;
        if (!key) {
            return moment.fn._lang._abbr;
        }
        if (values) {
            loadLang(normalizeLanguage(key), values);
        } else if (values === null) {
            unloadLang(key);
            key = 'en';
        } else if (!languages[key]) {
            getLangDefinition(key);
        }
        r = moment.duration.fn._lang = moment.fn._lang = getLangDefinition(key);
        return r._abbr;
    };

    // returns language data
    moment.langData = function (key) {
        if (key && key._lang && key._lang._abbr) {
            key = key._lang._abbr;
        }
        return getLangDefinition(key);
    };

    // compare moment object
    moment.isMoment = function (obj) {
        return obj instanceof Moment ||
            (obj != null &&  obj.hasOwnProperty('_isAMomentObject'));
    };

    // for typechecking Duration objects
    moment.isDuration = function (obj) {
        return obj instanceof Duration;
    };

    for (i = lists.length - 1; i >= 0; --i) {
        makeList(lists[i]);
    }

    moment.normalizeUnits = function (units) {
        return normalizeUnits(units);
    };

    moment.invalid = function (flags) {
        var m = moment.utc(NaN);
        if (flags != null) {
            extend(m._pf, flags);
        }
        else {
            m._pf.userInvalidated = true;
        }

        return m;
    };

    moment.parseZone = function (input) {
        return moment(input).parseZone();
    };

    /************************************
        Moment Prototype
    ************************************/


    extend(moment.fn = Moment.prototype, {

        clone : function () {
            return moment(this);
        },

        valueOf : function () {
            return +this._d + ((this._offset || 0) * 60000);
        },

        unix : function () {
            return Math.floor(+this / 1000);
        },

        toString : function () {
            return this.clone().lang('en').format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
        },

        toDate : function () {
            return this._offset ? new Date(+this) : this._d;
        },

        toISOString : function () {
            var m = moment(this).utc();
            if (0 < m.year() && m.year() <= 9999) {
                return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
            } else {
                return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
            }
        },

        toArray : function () {
            var m = this;
            return [
                m.year(),
                m.month(),
                m.date(),
                m.hours(),
                m.minutes(),
                m.seconds(),
                m.milliseconds()
            ];
        },

        isValid : function () {
            return isValid(this);
        },

        isDSTShifted : function () {

            if (this._a) {
                return this.isValid() && compareArrays(this._a, (this._isUTC ? moment.utc(this._a) : moment(this._a)).toArray()) > 0;
            }

            return false;
        },

        parsingFlags : function () {
            return extend({}, this._pf);
        },

        invalidAt: function () {
            return this._pf.overflow;
        },

        utc : function () {
            return this.zone(0);
        },

        local : function () {
            this.zone(0);
            this._isUTC = false;
            return this;
        },

        format : function (inputString) {
            var output = formatMoment(this, inputString || moment.defaultFormat);
            return this.lang().postformat(output);
        },

        add : function (input, val) {
            var dur;
            // switch args to support add('s', 1) and add(1, 's')
            if (typeof input === 'string') {
                dur = moment.duration(+val, input);
            } else {
                dur = moment.duration(input, val);
            }
            addOrSubtractDurationFromMoment(this, dur, 1);
            return this;
        },

        subtract : function (input, val) {
            var dur;
            // switch args to support subtract('s', 1) and subtract(1, 's')
            if (typeof input === 'string') {
                dur = moment.duration(+val, input);
            } else {
                dur = moment.duration(input, val);
            }
            addOrSubtractDurationFromMoment(this, dur, -1);
            return this;
        },

        diff : function (input, units, asFloat) {
            var that = makeAs(input, this),
                zoneDiff = (this.zone() - that.zone()) * 6e4,
                diff, output;

            units = normalizeUnits(units);

            if (units === 'year' || units === 'month') {
                // average number of days in the months in the given dates
                diff = (this.daysInMonth() + that.daysInMonth()) * 432e5; // 24 * 60 * 60 * 1000 / 2
                // difference in months
                output = ((this.year() - that.year()) * 12) + (this.month() - that.month());
                // adjust by taking difference in days, average number of days
                // and dst in the given months.
                output += ((this - moment(this).startOf('month')) -
                        (that - moment(that).startOf('month'))) / diff;
                // same as above but with zones, to negate all dst
                output -= ((this.zone() - moment(this).startOf('month').zone()) -
                        (that.zone() - moment(that).startOf('month').zone())) * 6e4 / diff;
                if (units === 'year') {
                    output = output / 12;
                }
            } else {
                diff = (this - that);
                output = units === 'second' ? diff / 1e3 : // 1000
                    units === 'minute' ? diff / 6e4 : // 1000 * 60
                    units === 'hour' ? diff / 36e5 : // 1000 * 60 * 60
                    units === 'day' ? (diff - zoneDiff) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
                    units === 'week' ? (diff - zoneDiff) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
                    diff;
            }
            return asFloat ? output : absRound(output);
        },

        from : function (time, withoutSuffix) {
            return moment.duration(this.diff(time)).lang(this.lang()._abbr).humanize(!withoutSuffix);
        },

        fromNow : function (withoutSuffix) {
            return this.from(moment(), withoutSuffix);
        },

        calendar : function () {
            // We want to compare the start of today, vs this.
            // Getting start-of-today depends on whether we're zone'd or not.
            var sod = makeAs(moment(), this).startOf('day'),
                diff = this.diff(sod, 'days', true),
                format = diff < -6 ? 'sameElse' :
                    diff < -1 ? 'lastWeek' :
                    diff < 0 ? 'lastDay' :
                    diff < 1 ? 'sameDay' :
                    diff < 2 ? 'nextDay' :
                    diff < 7 ? 'nextWeek' : 'sameElse';
            return this.format(this.lang().calendar(format, this));
        },

        isLeapYear : function () {
            return isLeapYear(this.year());
        },

        isDST : function () {
            return (this.zone() < this.clone().month(0).zone() ||
                this.zone() < this.clone().month(5).zone());
        },

        day : function (input) {
            var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
            if (input != null) {
                input = parseWeekday(input, this.lang());
                return this.add({ d : input - day });
            } else {
                return day;
            }
        },

        month : function (input) {
            var utc = this._isUTC ? 'UTC' : '',
                dayOfMonth;

            if (input != null) {
                if (typeof input === 'string') {
                    input = this.lang().monthsParse(input);
                    if (typeof input !== 'number') {
                        return this;
                    }
                }

                dayOfMonth = this.date();
                this.date(1);
                this._d['set' + utc + 'Month'](input);
                this.date(Math.min(dayOfMonth, this.daysInMonth()));

                moment.updateOffset(this);
                return this;
            } else {
                return this._d['get' + utc + 'Month']();
            }
        },

        startOf: function (units) {
            units = normalizeUnits(units);
            // the following switch intentionally omits break keywords
            // to utilize falling through the cases.
            switch (units) {
            case 'year':
                this.month(0);
                /* falls through */
            case 'month':
                this.date(1);
                /* falls through */
            case 'week':
            case 'isoWeek':
            case 'day':
                this.hours(0);
                /* falls through */
            case 'hour':
                this.minutes(0);
                /* falls through */
            case 'minute':
                this.seconds(0);
                /* falls through */
            case 'second':
                this.milliseconds(0);
                /* falls through */
            }

            // weeks are a special case
            if (units === 'week') {
                this.weekday(0);
            } else if (units === 'isoWeek') {
                this.isoWeekday(1);
            }

            return this;
        },

        endOf: function (units) {
            units = normalizeUnits(units);
            return this.startOf(units).add((units === 'isoWeek' ? 'week' : units), 1).subtract('ms', 1);
        },

        isAfter: function (input, units) {
            units = typeof units !== 'undefined' ? units : 'millisecond';
            return +this.clone().startOf(units) > +moment(input).startOf(units);
        },

        isBefore: function (input, units) {
            units = typeof units !== 'undefined' ? units : 'millisecond';
            return +this.clone().startOf(units) < +moment(input).startOf(units);
        },

        isSame: function (input, units) {
            units = units || 'ms';
            return +this.clone().startOf(units) === +makeAs(input, this).startOf(units);
        },

        min: function (other) {
            other = moment.apply(null, arguments);
            return other < this ? this : other;
        },

        max: function (other) {
            other = moment.apply(null, arguments);
            return other > this ? this : other;
        },

        zone : function (input) {
            var offset = this._offset || 0;
            if (input != null) {
                if (typeof input === "string") {
                    input = timezoneMinutesFromString(input);
                }
                if (Math.abs(input) < 16) {
                    input = input * 60;
                }
                this._offset = input;
                this._isUTC = true;
                if (offset !== input) {
                    addOrSubtractDurationFromMoment(this, moment.duration(offset - input, 'm'), 1, true);
                }
            } else {
                return this._isUTC ? offset : this._d.getTimezoneOffset();
            }
            return this;
        },

        zoneAbbr : function () {
            return this._isUTC ? "UTC" : "";
        },

        zoneName : function () {
            return this._isUTC ? "Coordinated Universal Time" : "";
        },

        parseZone : function () {
            if (this._tzm) {
                this.zone(this._tzm);
            } else if (typeof this._i === 'string') {
                this.zone(this._i);
            }
            return this;
        },

        hasAlignedHourOffset : function (input) {
            if (!input) {
                input = 0;
            }
            else {
                input = moment(input).zone();
            }

            return (this.zone() - input) % 60 === 0;
        },

        daysInMonth : function () {
            return daysInMonth(this.year(), this.month());
        },

        dayOfYear : function (input) {
            var dayOfYear = round((moment(this).startOf('day') - moment(this).startOf('year')) / 864e5) + 1;
            return input == null ? dayOfYear : this.add("d", (input - dayOfYear));
        },

        quarter : function () {
            return Math.ceil((this.month() + 1.0) / 3.0);
        },

        weekYear : function (input) {
            var year = weekOfYear(this, this.lang()._week.dow, this.lang()._week.doy).year;
            return input == null ? year : this.add("y", (input - year));
        },

        isoWeekYear : function (input) {
            var year = weekOfYear(this, 1, 4).year;
            return input == null ? year : this.add("y", (input - year));
        },

        week : function (input) {
            var week = this.lang().week(this);
            return input == null ? week : this.add("d", (input - week) * 7);
        },

        isoWeek : function (input) {
            var week = weekOfYear(this, 1, 4).week;
            return input == null ? week : this.add("d", (input - week) * 7);
        },

        weekday : function (input) {
            var weekday = (this.day() + 7 - this.lang()._week.dow) % 7;
            return input == null ? weekday : this.add("d", input - weekday);
        },

        isoWeekday : function (input) {
            // behaves the same as moment#day except
            // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
            // as a setter, sunday should belong to the previous week.
            return input == null ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7);
        },

        get : function (units) {
            units = normalizeUnits(units);
            return this[units]();
        },

        set : function (units, value) {
            units = normalizeUnits(units);
            if (typeof this[units] === 'function') {
                this[units](value);
            }
            return this;
        },

        // If passed a language key, it will set the language for this
        // instance.  Otherwise, it will return the language configuration
        // variables for this instance.
        lang : function (key) {
            if (key === undefined) {
                return this._lang;
            } else {
                this._lang = getLangDefinition(key);
                return this;
            }
        }
    });

    // helper for adding shortcuts
    function makeGetterAndSetter(name, key) {
        moment.fn[name] = moment.fn[name + 's'] = function (input) {
            var utc = this._isUTC ? 'UTC' : '';
            if (input != null) {
                this._d['set' + utc + key](input);
                moment.updateOffset(this);
                return this;
            } else {
                return this._d['get' + utc + key]();
            }
        };
    }

    // loop through and add shortcuts (Month, Date, Hours, Minutes, Seconds, Milliseconds)
    for (i = 0; i < proxyGettersAndSetters.length; i ++) {
        makeGetterAndSetter(proxyGettersAndSetters[i].toLowerCase().replace(/s$/, ''), proxyGettersAndSetters[i]);
    }

    // add shortcut for year (uses different syntax than the getter/setter 'year' == 'FullYear')
    makeGetterAndSetter('year', 'FullYear');

    // add plural methods
    moment.fn.days = moment.fn.day;
    moment.fn.months = moment.fn.month;
    moment.fn.weeks = moment.fn.week;
    moment.fn.isoWeeks = moment.fn.isoWeek;

    // add aliased format methods
    moment.fn.toJSON = moment.fn.toISOString;

    /************************************
        Duration Prototype
    ************************************/


    extend(moment.duration.fn = Duration.prototype, {

        _bubble : function () {
            var milliseconds = this._milliseconds,
                days = this._days,
                months = this._months,
                data = this._data,
                seconds, minutes, hours, years;

            // The following code bubbles up values, see the tests for
            // examples of what that means.
            data.milliseconds = milliseconds % 1000;

            seconds = absRound(milliseconds / 1000);
            data.seconds = seconds % 60;

            minutes = absRound(seconds / 60);
            data.minutes = minutes % 60;

            hours = absRound(minutes / 60);
            data.hours = hours % 24;

            days += absRound(hours / 24);
            data.days = days % 30;

            months += absRound(days / 30);
            data.months = months % 12;

            years = absRound(months / 12);
            data.years = years;
        },

        weeks : function () {
            return absRound(this.days() / 7);
        },

        valueOf : function () {
            return this._milliseconds +
              this._days * 864e5 +
              (this._months % 12) * 2592e6 +
              toInt(this._months / 12) * 31536e6;
        },

        humanize : function (withSuffix) {
            var difference = +this,
                output = relativeTime(difference, !withSuffix, this.lang());

            if (withSuffix) {
                output = this.lang().pastFuture(difference, output);
            }

            return this.lang().postformat(output);
        },

        add : function (input, val) {
            // supports only 2.0-style add(1, 's') or add(moment)
            var dur = moment.duration(input, val);

            this._milliseconds += dur._milliseconds;
            this._days += dur._days;
            this._months += dur._months;

            this._bubble();

            return this;
        },

        subtract : function (input, val) {
            var dur = moment.duration(input, val);

            this._milliseconds -= dur._milliseconds;
            this._days -= dur._days;
            this._months -= dur._months;

            this._bubble();

            return this;
        },

        get : function (units) {
            units = normalizeUnits(units);
            return this[units.toLowerCase() + 's']();
        },

        as : function (units) {
            units = normalizeUnits(units);
            return this['as' + units.charAt(0).toUpperCase() + units.slice(1) + 's']();
        },

        lang : moment.fn.lang,

        toIsoString : function () {
            // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
            var years = Math.abs(this.years()),
                months = Math.abs(this.months()),
                days = Math.abs(this.days()),
                hours = Math.abs(this.hours()),
                minutes = Math.abs(this.minutes()),
                seconds = Math.abs(this.seconds() + this.milliseconds() / 1000);

            if (!this.asSeconds()) {
                // this is the same as C#'s (Noda) and python (isodate)...
                // but not other JS (goog.date)
                return 'P0D';
            }

            return (this.asSeconds() < 0 ? '-' : '') +
                'P' +
                (years ? years + 'Y' : '') +
                (months ? months + 'M' : '') +
                (days ? days + 'D' : '') +
                ((hours || minutes || seconds) ? 'T' : '') +
                (hours ? hours + 'H' : '') +
                (minutes ? minutes + 'M' : '') +
                (seconds ? seconds + 'S' : '');
        }
    });

    function makeDurationGetter(name) {
        moment.duration.fn[name] = function () {
            return this._data[name];
        };
    }

    function makeDurationAsGetter(name, factor) {
        moment.duration.fn['as' + name] = function () {
            return +this / factor;
        };
    }

    for (i in unitMillisecondFactors) {
        if (unitMillisecondFactors.hasOwnProperty(i)) {
            makeDurationAsGetter(i, unitMillisecondFactors[i]);
            makeDurationGetter(i.toLowerCase());
        }
    }

    makeDurationAsGetter('Weeks', 6048e5);
    moment.duration.fn.asMonths = function () {
        return (+this - this.years() * 31536e6) / 2592e6 + this.years() * 12;
    };


    /************************************
        Default Lang
    ************************************/


    // Set default language, other languages will inherit from English.
    moment.lang('en', {
        ordinal : function (number) {
            var b = number % 10,
                output = (toInt(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });

    /* EMBED_LANGUAGES */

    /************************************
        Exposing Moment
    ************************************/

    function makeGlobal(deprecate) {
        var warned = false, local_moment = moment;
        /*global ender:false */
        if (typeof ender !== 'undefined') {
            return;
        }
        // here, `this` means `window` in the browser, or `global` on the server
        // add `moment` as a global object via a string identifier,
        // for Closure Compiler "advanced" mode
        if (deprecate) {
            global.moment = function () {
                if (!warned && console && console.warn) {
                    warned = true;
                    console.warn(
                            "Accessing Moment through the global scope is " +
                            "deprecated, and will be removed in an upcoming " +
                            "release.");
                }
                return local_moment.apply(null, arguments);
            };
            extend(global.moment, local_moment);
        } else {
            global['moment'] = moment;
        }
    }

    // CommonJS module is defined
    if (hasModule) {
        module.exports = moment;
        makeGlobal(true);
    } else if (typeof define === "function" && define.amd) {
        define("moment", function (require, exports, module) {
            if (module.config && module.config() && module.config().noGlobal !== true) {
                // If user provided noGlobal, he is aware of global
                makeGlobal(module.config().noGlobal === undefined);
            }

            return moment;
        });
    } else {
        makeGlobal();
    }
}).call(this);
var define,require,esl;!function(e){function t(e){m(e,J)||(O[e]=1)}function i(e,t){function i(e){0===e.indexOf(".")&&a.push(e)}var a=[];if("string"==typeof e?i(e):C(e,function(e){i(e)}),a.length>0)throw new Error("[REQUIRE_FATAL]Relative ID is not allowed in global require: "+a.join(", "));var o=N.waitSeconds;return o&&e instanceof Array&&(E&&clearTimeout(E),E=setTimeout(n,1e3*o)),D(e,t)}function n(){function e(r,s){if(!o[r]&&!m(r,J)){o[r]=1,m(r,F)||n[r]||(n[r]=1,t.push(r));var l=z[r];l?s&&(n[r]||(n[r]=1,t.push(r)),C(l.depMs,function(t){e(t.absId,t.hard)})):a[r]||(a[r]=1,i.push(r))}}var t=[],i=[],n={},a={},o={};for(var r in O)e(r,1);if(t.length||i.length)throw new Error("[MODULE_TIMEOUT]Hang( "+(t.join(", ")||"none")+" ) Miss( "+(i.join(", ")||"none")+" )")}function a(e){C(B,function(t){s(e,t.deps,t.factory)}),B.length=0}function o(e,t,i){if(null==i&&(null==t?(i=e,e=null):(i=t,t=null,e instanceof Array&&(t=e,e=null))),null!=i){var n=window.opera;if(!e&&document.attachEvent&&(!n||"[object Opera]"!==n.toString())){var a=I();e=a&&a.getAttribute("data-require-id")}e?s(e,t,i):B[0]={deps:t,factory:i}}}function r(){var e=N.config[this.id];return e&&"object"==typeof e?e:{}}function s(e,t,i){z[e]||(z[e]={id:e,depsDec:t,deps:t||["require","exports","module"],factoryDeps:[],factory:i,exports:{},config:r,state:A,require:v(e),depMs:[],depMkv:{},depRs:[]})}function l(e){var t=z[e];if(t&&!m(e,M)){var i=t.deps,n=t.factory,a=0;"function"==typeof n&&(a=Math.min(n.length,i.length),!t.depsDec&&n.toString().replace(/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,"").replace(/require\(\s*(['"'])([^'"]+)\1\s*\)/g,function(e,t,n){i.push(n)}));var o=[],r=[];C(i,function(i,n){var s,l,h=W(i),d=L(h.mod,e);d&&!P[d]?(h.res&&(l={id:i,mod:d,res:h.res},r.push(i),t.depRs.push(l)),s=t.depMkv[d],s||(s={id:h.mod,absId:d,hard:a>n},t.depMs.push(s),t.depMkv[d]=s,o.push(d))):s={absId:d},a>n&&t.factoryDeps.push(l||s)}),t.state=M,c(e),g(o),r.length&&t.require(r,function(){C(t.depRs,function(t){t.absId||(t.absId=L(t.id,e))}),h()})}}function h(){for(var e in O)l(e),d(e),p(e)}function d(e){function t(e){if(l(e),!m(e,M))return!1;if(m(e,F)||i[e])return!0;i[e]=1;var n=z[e],a=!0;return C(n.depMs,function(e){return a=t(e.absId)}),a&&C(n.depRs,function(e){return a=!!e.absId}),a&&(n.state=F),a}var i={};t(e)}function c(t){function i(){if(!n&&a.state===F){n=1;var i=1;if(C(a.factoryDeps,function(e){var t=e.absId;return P[t]?void 0:(p(t),i=m(t,J))}),i){try{var o=a.factory,r="function"==typeof o?o.apply(e,u(a.factoryDeps,{require:a.require,exports:a.exports,module:a})):o;null!=r&&(a.exports=r),a.invokeFactory=null}catch(s){if(/^\[MODULE_MISS\]"([^"]+)/.test(s.message)){var l=a.depMkv[RegExp.$1];return l&&(l.hard=1),void(n=0)}throw s}U(t)}}}var n,a=z[t];a.invokeFactory=i}function m(e,t){return z[e]&&z[e].state>=t}function p(e){var t=z[e];t&&t.invokeFactory&&t.invokeFactory()}function u(e,t){var i=[];return C(e,function(e,n){"object"==typeof e&&(e=e.absId),i[n]=t[e]||z[e].exports}),i}function V(e,t){if(m(e,J))return void t();var i=H[e];i||(i=H[e]=[]),i.push(t)}function U(e){var t=z[e];t.state=J,delete O[e];for(var i=H[e]||[],n=i.length;n--;)i[n]();i.length=0,H[e]=null}function g(t,i,n){function a(){if("function"==typeof i&&!o){var n=1;C(t,function(e){return P[e]?void 0:n=!!m(e,J)}),n&&(o=1,i.apply(e,u(t,P)))}}var o=0;C(t,function(e){P[e]||m(e,J)||(V(e,a),(e.indexOf("!")>0?y:f)(e,n))}),a()}function f(t){function i(){var e=Q[t];S(e||t,n)}function n(){if(r){var i;"function"==typeof r.init&&(i=r.init.apply(e,u(s,P))),null==i&&r.exports&&(i=e,C(r.exports.split("."),function(e){return i=i[e],!!i})),o(t,s,i||{})}else a(t);h()}if(!R[t]&&!z[t]){R[t]=1;var r=N.shim[t];r instanceof Array&&(N.shim[t]=r={deps:r});var s=r&&(r.deps||[]);s?(C(s,function(e){N.shim[e]||(N.shim[e]={})}),D(s,i)):i()}}function y(e,t){function i(t){l.exports=t||!0,U(e)}function n(n){var a=t?z[t].require:D;n.load(s.res,a,i,r.call({id:e}))}if(!z[e]){var o=Q[e];if(o)return void f(o);var s=W(e),l={id:e,state:M};z[e]=l,i.fromText=function(e,t){new Function(t)(),a(e)},n(D(s.mod))}}function b(e,t){var i=X(e,1,t);return i.sort(T),i}function _(){function e(e){Q[e]=t}N.baseUrl=N.baseUrl.replace(/\/$/,"")+"/",G=b(N.paths),Z=b(N.map,1),C(Z,function(e){e.v=b(e.v)}),Y=[],C(N.packages,function(e){var t=e;"string"==typeof e&&(t={name:e.split("/")[0],location:e,main:"main"}),t.location=t.location||t.name,t.main=(t.main||"main").replace(/\.js$/i,""),t.reg=K(t.name),Y.push(t)}),Y.sort(T),q=b(N.urlArgs,1),Q={};for(var t in N.bundles)C(N.bundles[t],e)}function x(e,t,i){C(t,function(t){return t.reg.test(e)?(i(t.v,t.k,t),!1):void 0})}function k(e){var t=/(\.[a-z0-9]+)$/i,i=/(\?[^#]*)$/,n="",a=e,o="";i.test(e)&&(o=RegExp.$1,e=e.replace(i,"")),t.test(e)&&(n=RegExp.$1,a=e.replace(t,""));var r,s=a;return x(a,G,function(e,t){s=s.replace(t,e),r=1}),r||x(a,Y,function(e,t,i){s=s.replace(i.name,i.location)}),/^([a-z]{2,10}:\/)?\//i.test(s)||(s=N.baseUrl+s),s+=n+o,x(a,q,function(e){s+=(s.indexOf("?")>0?"&":"?")+e}),s}function v(e){function i(i,a){if("string"==typeof i){if(!n[i]){var o=L(i,e);if(p(o),!m(o,J))throw new Error('[MODULE_MISS]"'+o+'" is not exists!');n[i]=z[o].exports}return n[i]}if(i instanceof Array){var r=[],s=[];C(i,function(i,n){var a=W(i),o=L(a.mod,e),l=a.res,h=o;if(l){var d=o+"!"+l;0!==l.indexOf(".")&&Q[d]?o=h=d:h=null}s[n]=h,t(o),r.push(o)}),g(r,function(){C(s,function(n,a){null==n&&(n=s[a]=L(i[a],e),t(n))}),g(s,a,e),h()},e),h()}}var n={};return i.toUrl=function(t){return k(L(t,e))},i}function L(e,t){if(!e)return"";t=t||"";var i=W(e);if(!i)return e;var n=i.res,a=w(i.mod,t);if(C(Y,function(e){var t=e.name;return t===a?(a=t+"/"+e.main,!1):void 0}),x(t,Z,function(e){x(a,e,function(e,t){a=a.replace(t,e)})}),n){var o=m(a,J)&&D(a);n=o&&o.normalize?o.normalize(n,function(e){return L(e,t)}):L(n,t),a+="!"+n}return a}function w(e,t){if(0===e.indexOf(".")){var i=t.split("/"),n=e.split("/"),a=i.length-1,o=n.length,r=0,s=0;e:for(var l=0;o>l;l++)switch(n[l]){case"..":if(!(a>r))break e;r++,s++;break;case".":s++;break;default:break e}return i.length=a-r,n=n.slice(s),i.concat(n).join("/")}return e}function W(e){var t=e.split("!");return t[0]?{mod:t[0],res:t[1]}:void 0}function X(e,t,i){var n=[];for(var a in e)if(e.hasOwnProperty(a)){var o={k:a,v:e[a]};n.push(o),t&&(o.reg="*"===a&&i?/^/:K(a))}return n}function I(){if(j)return j;if($&&"interactive"===$.readyState)return $;for(var e=document.getElementsByTagName("script"),t=e.length;t--;){var i=e[t];if("interactive"===i.readyState)return $=i,i}}function S(e,t){function i(){var e=n.readyState;("undefined"==typeof e||/^(loaded|complete)$/.test(e))&&(n.onload=n.onreadystatechange=null,n=null,t())}var n=document.createElement("script");n.setAttribute("data-require-id",e),n.src=k(e+".js"),n.async=!0,n.readyState?n.onreadystatechange=i:n.onload=i,j=n,te?ee.insertBefore(n,te):ee.appendChild(n),j=null}function K(e){return new RegExp("^"+e+"(/|$)")}function C(e,t){if(e instanceof Array)for(var i=0,n=e.length;n>i&&t(e[i],i)!==!1;i++);}function T(e,t){var i=e.k||e.name,n=t.k||t.name;return"*"===n?-1:"*"===i?1:n.length-i.length}var E,z={},A=1,M=2,F=3,J=4,O={},P={require:i,exports:1,module:1},D=v(),N={baseUrl:"./",paths:{},config:{},map:{},packages:[],shim:{},waitSeconds:0,bundles:{},urlArgs:{}};i.version="2.0.2",i.loader="esl",i.toUrl=D.toUrl;var B=[];o.amd={};var H={},R={};i.config=function(e){if(e){for(var t in N){var i=e[t],n=N[t];if(i)if("urlArgs"===t&&"string"==typeof i)N.urlArgs["*"]=i;else if(n instanceof Array)n.push.apply(n,i);else if("object"==typeof n)for(var a in i)n[a]=i[a];else N[t]=i}_()}},_();var G,Y,Z,Q,q,j,$,ee=document.getElementsByTagName("head")[0],te=document.getElementsByTagName("base")[0];te&&(ee=te.parentNode),define||(define=o,require||(require=i),esl=i)}(this),define("echarts",["echarts/echarts"],function(e){return e}),define("echarts/echarts",["require","./config","zrender/tool/util","zrender/tool/event","zrender/tool/env","zrender","zrender/config","./chart/island","./component/toolbox","./component","./component/title","./component/tooltip","./component/legend","./util/ecData","./chart","zrender/tool/color","./component/timeline","zrender/shape/Image","zrender/loadingEffect/Bar","zrender/loadingEffect/Bubble","zrender/loadingEffect/DynamicLine","zrender/loadingEffect/Ring","zrender/loadingEffect/Spin","zrender/loadingEffect/Whirling","./theme/macarons","./theme/infographic"],function(e){function t(){r.Dispatcher.call(this)}function i(e){e.innerHTML="",this._themeConfig={},this.dom=e,this._connected=!1,this._status={dragIn:!1,dragOut:!1,needRefresh:!1},this._curEventType=!1,this._chartList=[],this._messageCenter=new t,this._messageCenterOutSide=new t,this.resize=this.resize(),this._init()}function n(e,t,i,n,a){for(var o=e._chartList,r=o.length;r--;){var s=o[r];"function"==typeof s[t]&&s[t](i,n,a)}}var a=e("./config"),o=e("zrender/tool/util"),r=e("zrender/tool/event"),s={},l=e("zrender/tool/env").canvasSupported,h=new Date-0,d={},c="_echarts_instance_";s.version="2.2.7",s.dependencies={zrender:"2.1.1"},s.init=function(t,n){var a=e("zrender");a.version.replace(".","")-0<s.dependencies.zrender.replace(".","")-0&&console.error("ZRender "+a.version+" is too old for ECharts "+s.version+". Current version need ZRender "+s.dependencies.zrender+"+"),t=t instanceof Array?t[0]:t;var o=t.getAttribute(c);return o||(o=h++,t.setAttribute(c,o)),d[o]&&d[o].dispose(),d[o]=new i(t),d[o].id=o,d[o].canvasSupported=l,d[o].setTheme(n),d[o]},s.getInstanceById=function(e){return d[e]},o.merge(t.prototype,r.Dispatcher.prototype,!0);var m=e("zrender/config").EVENT,p=["CLICK","DBLCLICK","MOUSEOVER","MOUSEOUT","DRAGSTART","DRAGEND","DRAGENTER","DRAGOVER","DRAGLEAVE","DROP"];return i.prototype={_init:function(){var t=this,i=e("zrender").init(this.dom);this._zr=i,this._messageCenter.dispatch=function(e,i,n,a){n=n||{},n.type=e,n.event=i,t._messageCenter.dispatchWithContext(e,n,a),t._messageCenterOutSide.dispatchWithContext(e,n,a)},this._onevent=function(e){return t.__onevent(e)};for(var n in a.EVENT)"CLICK"!=n&&"DBLCLICK"!=n&&"HOVER"!=n&&"MOUSEOUT"!=n&&"MAP_ROAM"!=n&&this._messageCenter.bind(a.EVENT[n],this._onevent,this);var o={};this._onzrevent=function(e){return t[o[e.type]](e)};for(var r=0,s=p.length;s>r;r++){var l=p[r],h=m[l];o[h]="_on"+l.toLowerCase(),i.on(h,this._onzrevent)}this.chart={},this.component={};var d=e("./chart/island");this._island=new d(this._themeConfig,this._messageCenter,i,{},this),this.chart.island=this._island;var c=e("./component/toolbox");this._toolbox=new c(this._themeConfig,this._messageCenter,i,{},this),this.component.toolbox=this._toolbox;var u=e("./component");u.define("title",e("./component/title")),u.define("tooltip",e("./component/tooltip")),u.define("legend",e("./component/legend")),(0===i.getWidth()||0===i.getHeight())&&console.error("Domâ€™s width & height should be ready before init.")},__onevent:function(e){e.__echartsId=e.__echartsId||this.id;var t=e.__echartsId===this.id;switch(this._curEventType||(this._curEventType=e.type),e.type){case a.EVENT.LEGEND_SELECTED:this._onlegendSelected(e);break;case a.EVENT.DATA_ZOOM:if(!t){var i=this.component.dataZoom;i&&(i.silence(!0),i.absoluteZoom(e.zoom),i.silence(!1))}this._ondataZoom(e);break;case a.EVENT.DATA_RANGE:t&&this._ondataRange(e);break;case a.EVENT.MAGIC_TYPE_CHANGED:if(!t){var n=this.component.toolbox;n&&(n.silence(!0),n.setMagicType(e.magicType),n.silence(!1))}this._onmagicTypeChanged(e);break;case a.EVENT.DATA_VIEW_CHANGED:t&&this._ondataViewChanged(e);break;case a.EVENT.TOOLTIP_HOVER:t&&this._tooltipHover(e);break;case a.EVENT.RESTORE:this._onrestore();break;case a.EVENT.REFRESH:t&&this._onrefresh(e);break;case a.EVENT.TOOLTIP_IN_GRID:case a.EVENT.TOOLTIP_OUT_GRID:if(t){if(this._connected){var o=this.component.grid;o&&(e.x=(e.event.zrenderX-o.getX())/o.getWidth(),e.y=(e.event.zrenderY-o.getY())/o.getHeight())}}else{var o=this.component.grid;o&&this._zr.trigger("mousemove",{connectTrigger:!0,zrenderX:o.getX()+e.x*o.getWidth(),zrenderY:o.getY()+e.y*o.getHeight()})}}if(this._connected&&t&&this._curEventType===e.type){for(var r in this._connected)this._connected[r].connectedEventHandler(e);this._curEventType=null}(!t||!this._connected&&t)&&(this._curEventType=null)},_onclick:function(e){if(n(this,"onclick",e),e.target){var t=this._eventPackage(e.target);t&&null!=t.seriesIndex&&this._messageCenter.dispatch(a.EVENT.CLICK,e.event,t,this)}},_ondblclick:function(e){if(n(this,"ondblclick",e),e.target){var t=this._eventPackage(e.target);t&&null!=t.seriesIndex&&this._messageCenter.dispatch(a.EVENT.DBLCLICK,e.event,t,this)}},_onmouseover:function(e){if(e.target){var t=this._eventPackage(e.target);t&&null!=t.seriesIndex&&this._messageCenter.dispatch(a.EVENT.HOVER,e.event,t,this)}},_onmouseout:function(e){if(e.target){var t=this._eventPackage(e.target);t&&null!=t.seriesIndex&&this._messageCenter.dispatch(a.EVENT.MOUSEOUT,e.event,t,this)}},_ondragstart:function(e){this._status={dragIn:!1,dragOut:!1,needRefresh:!1},n(this,"ondragstart",e)},_ondragenter:function(e){n(this,"ondragenter",e)},_ondragover:function(e){n(this,"ondragover",e)},_ondragleave:function(e){n(this,"ondragleave",e)},_ondrop:function(e){n(this,"ondrop",e,this._status),this._island.ondrop(e,this._status)},_ondragend:function(e){if(n(this,"ondragend",e,this._status),this._timeline&&this._timeline.ondragend(e,this._status),this._island.ondragend(e,this._status),this._status.needRefresh){this._syncBackupData(this._option);var t=this._messageCenter;t.dispatch(a.EVENT.DATA_CHANGED,e.event,this._eventPackage(e.target),this),t.dispatch(a.EVENT.REFRESH,null,null,this)}},_onlegendSelected:function(e){this._status.needRefresh=!1,n(this,"onlegendSelected",e,this._status),this._status.needRefresh&&this._messageCenter.dispatch(a.EVENT.REFRESH,null,null,this)},_ondataZoom:function(e){this._status.needRefresh=!1,n(this,"ondataZoom",e,this._status),this._status.needRefresh&&this._messageCenter.dispatch(a.EVENT.REFRESH,null,null,this)},_ondataRange:function(e){this._clearEffect(),this._status.needRefresh=!1,n(this,"ondataRange",e,this._status),this._status.needRefresh&&this._zr.refreshNextFrame()},_onmagicTypeChanged:function(){this._clearEffect(),this._render(this._toolbox.getMagicOption())},_ondataViewChanged:function(e){this._syncBackupData(e.option),this._messageCenter.dispatch(a.EVENT.DATA_CHANGED,null,e,this),this._messageCenter.dispatch(a.EVENT.REFRESH,null,null,this)},_tooltipHover:function(e){var t=[];n(this,"ontooltipHover",e,t)},_onrestore:function(){this.restore()},_onrefresh:function(e){this._refreshInside=!0,this.refresh(e),this._refreshInside=!1},_syncBackupData:function(e){this.component.dataZoom&&this.component.dataZoom.syncBackupData(e)},_eventPackage:function(t){if(t){var i=e("./util/ecData"),n=i.get(t,"seriesIndex"),a=i.get(t,"dataIndex");return a=-1!=n&&this.component.dataZoom?this.component.dataZoom.getRealDataIndex(n,a):a,{seriesIndex:n,seriesName:(i.get(t,"series")||{}).name,dataIndex:a,data:i.get(t,"data"),name:i.get(t,"name"),value:i.get(t,"value"),special:i.get(t,"special")}}},_noDataCheck:function(e){for(var t=e.series,i=0,n=t.length;n>i;i++)if(t[i].type==a.CHART_TYPE_MAP||t[i].data&&t[i].data.length>0||t[i].markPoint&&t[i].markPoint.data&&t[i].markPoint.data.length>0||t[i].markLine&&t[i].markLine.data&&t[i].markLine.data.length>0||t[i].nodes&&t[i].nodes.length>0||t[i].links&&t[i].links.length>0||t[i].matrix&&t[i].matrix.length>0||t[i].eventList&&t[i].eventList.length>0)return!1;var o=this._option&&this._option.noDataLoadingOption||this._themeConfig.noDataLoadingOption||a.noDataLoadingOption||{text:this._option&&this._option.noDataText||this._themeConfig.noDataText||a.noDataText,effect:this._option&&this._option.noDataEffect||this._themeConfig.noDataEffect||a.noDataEffect};return this.clear(),this.showLoading(o),!0},_render:function(t){if(this._mergeGlobalConifg(t),!this._noDataCheck(t)){var i=t.backgroundColor;if(i)if(l||-1==i.indexOf("rgba"))this.dom.style.backgroundColor=i;else{var n=i.split(",");this.dom.style.filter="alpha(opacity="+100*n[3].substring(0,n[3].lastIndexOf(")"))+")",n.length=3,n[0]=n[0].replace("a",""),this.dom.style.backgroundColor=n.join(",")+")"}this._zr.clearAnimation(),this._chartList=[];var o=e("./chart"),r=e("./component");(t.xAxis||t.yAxis)&&(t.grid=t.grid||{},t.dataZoom=t.dataZoom||{});for(var s,h,d,c=["title","legend","tooltip","dataRange","roamController","grid","dataZoom","xAxis","yAxis","polar"],m=0,p=c.length;p>m;m++)h=c[m],d=this.component[h],t[h]?(d?d.refresh&&d.refresh(t):(s=r.get(/^[xy]Axis$/.test(h)?"axis":h),d=new s(this._themeConfig,this._messageCenter,this._zr,t,this,h),this.component[h]=d),this._chartList.push(d)):d&&(d.dispose(),this.component[h]=null,delete this.component[h]);for(var u,V,U,g={},m=0,p=t.series.length;p>m;m++)V=t.series[m].type,V?g[V]||(g[V]=!0,u=o.get(V),u?(this.chart[V]?(U=this.chart[V],U.refresh(t)):U=new u(this._themeConfig,this._messageCenter,this._zr,t,this),this._chartList.push(U),this.chart[V]=U):console.error(V+" has not been required.")):console.error("series["+m+"] chart type has not been defined.");for(V in this.chart)V==a.CHART_TYPE_ISLAND||g[V]||(this.chart[V].dispose(),this.chart[V]=null,delete this.chart[V]);this.component.grid&&this.component.grid.refixAxisShape(this.component),this._island.refresh(t),this._toolbox.refresh(t),t.animation&&!t.renderAsImage?this._zr.refresh():this._zr.render();var f="IMG"+this.id,y=document.getElementById(f);t.renderAsImage&&l?(y?y.src=this.getDataURL(t.renderAsImage):(y=this.getImage(t.renderAsImage),y.id=f,y.style.position="absolute",y.style.left=0,y.style.top=0,this.dom.firstChild.appendChild(y)),this.un(),this._zr.un(),this._disposeChartList(),this._zr.clear()):y&&y.parentNode.removeChild(y),y=null,this._option=t}},restore:function(){this._clearEffect(),this._option=o.clone(this._optionRestore),this._disposeChartList(),this._island.clear(),this._toolbox.reset(this._option,!0),this._render(this._option)},refresh:function(e){this._clearEffect(),e=e||{};var t=e.option;!this._refreshInside&&t&&(t=this.getOption(),o.merge(t,e.option,!0),o.merge(this._optionRestore,e.option,!0),this._toolbox.reset(t)),this._island.refresh(t),this._toolbox.refresh(t),this._zr.clearAnimation();for(var i=0,n=this._chartList.length;n>i;i++)this._chartList[i].refresh&&this._chartList[i].refresh(t);this.component.grid&&this.component.grid.refixAxisShape(this.component),this._zr.refresh()},_disposeChartList:function(){this._clearEffect(),this._zr.clearAnimation();for(var e=this._chartList.length;e--;){var t=this._chartList[e];if(t){var i=t.type;this.chart[i]&&delete this.chart[i],this.component[i]&&delete this.component[i],t.dispose&&t.dispose()}}this._chartList=[]},_mergeGlobalConifg:function(t){for(var i=["backgroundColor","calculable","calculableColor","calculableHolderColor","nameConnector","valueConnector","animation","animationThreshold","animationDuration","animationDurationUpdate","animationEasing","addDataAnimation","symbolList","DRAG_ENABLE_TIME"],n=i.length;n--;){var o=i[n];null==t[o]&&(t[o]=null!=this._themeConfig[o]?this._themeConfig[o]:a[o])}var r=t.color;r&&r.length||(r=this._themeConfig.color||a.color),this._zr.getColor=function(t){var i=e("zrender/tool/color");return i.getColor(t,r)},l||(t.animation=!1,t.addDataAnimation=!1)},setOption:function(e,t){return e.timeline?this._setTimelineOption(e):this._setOption(e,t)},_setOption:function(e,t,i){return!t&&this._option?this._option=o.merge(this.getOption(),o.clone(e),!0):(this._option=o.clone(e),!i&&this._timeline&&this._timeline.dispose()),this._optionRestore=o.clone(this._option),this._option.series&&0!==this._option.series.length?(this.component.dataZoom&&(this._option.dataZoom||this._option.toolbox&&this._option.toolbox.feature&&this._option.toolbox.feature.dataZoom&&this._option.toolbox.feature.dataZoom.show)&&this.component.dataZoom.syncOption(this._option),this._toolbox.reset(this._option),this._render(this._option),this):void this._zr.clear()},getOption:function(){function e(e){var n=i._optionRestore[e];if(n)if(n instanceof Array)for(var a=n.length;a--;)t[e][a].data=o.clone(n[a].data);else t[e].data=o.clone(n.data)}var t=o.clone(this._option),i=this;return e("xAxis"),e("yAxis"),e("series"),t},setSeries:function(e,t){return t?(this._option.series=e,this.setOption(this._option,t)):this.setOption({series:e}),this},getSeries:function(){return this.getOption().series},_setTimelineOption:function(t){this._timeline&&this._timeline.dispose();var i=e("./component/timeline"),n=new i(this._themeConfig,this._messageCenter,this._zr,t,this);return this._timeline=n,this.component.timeline=this._timeline,this},addData:function(e,t,i,n,r){function s(){if(c._zr){c._zr.clearAnimation();for(var e=0,t=w.length;t>e;e++)w[e].motionlessOnce=h.addDataAnimation&&w[e].addDataAnimation;c._messageCenter.dispatch(a.EVENT.REFRESH,null,{option:h},c)}}for(var l=e instanceof Array?e:[[e,t,i,n,r]],h=this.getOption(),d=this._optionRestore,c=this,m=0,p=l.length;p>m;m++){e=l[m][0],t=l[m][1],i=l[m][2],n=l[m][3],r=l[m][4];var u=d.series[e],V=i?"unshift":"push",U=i?"pop":"shift";if(u){var g=u.data,f=h.series[e].data;if(g[V](t),f[V](t),n||(g[U](),t=f[U]()),null!=r){var y,b;if(u.type===a.CHART_TYPE_PIE&&(y=d.legend)&&(b=y.data)){var _=h.legend.data;if(b[V](r),_[V](r),!n){var x=o.indexOf(b,t.name);-1!=x&&b.splice(x,1),x=o.indexOf(_,t.name),-1!=x&&_.splice(x,1)}}else if(null!=d.xAxis&&null!=d.yAxis){var k,v,L=u.xAxisIndex||0;(null==d.xAxis[L].type||"category"===d.xAxis[L].type)&&(k=d.xAxis[L].data,v=h.xAxis[L].data,k[V](r),v[V](r),n||(k[U](),v[U]())),L=u.yAxisIndex||0,"category"===d.yAxis[L].type&&(k=d.yAxis[L].data,v=h.yAxis[L].data,k[V](r),v[V](r),n||(k[U](),v[U]()))}}this._option.series[e].data=h.series[e].data}}this._zr.clearAnimation();for(var w=this._chartList,W=0,X=function(){W--,0===W&&s()},m=0,p=w.length;p>m;m++)h.addDataAnimation&&w[m].addDataAnimation&&(W++,w[m].addDataAnimation(l,X));return this.component.dataZoom&&this.component.dataZoom.syncOption(h),this._option=h,h.addDataAnimation||setTimeout(s,0),this},addMarkPoint:function(e,t){return this._addMark(e,t,"markPoint")},addMarkLine:function(e,t){return this._addMark(e,t,"markLine")},_addMark:function(e,t,i){var n,a=this._option.series;if(a&&(n=a[e])){var r=this._optionRestore.series,s=r[e],l=n[i],h=s[i];l=n[i]=l||{data:[]},h=s[i]=h||{data:[]};for(var d in t)"data"===d?(l.data=l.data.concat(t.data),h.data=h.data.concat(t.data)):"object"!=typeof t[d]||null==l[d]?l[d]=h[d]=t[d]:(o.merge(l[d],t[d],!0),o.merge(h[d],t[d],!0));var c=this.chart[n.type];c&&c.addMark(e,t,i)}return this},delMarkPoint:function(e,t){return this._delMark(e,t,"markPoint")},delMarkLine:function(e,t){return this._delMark(e,t,"markLine")},_delMark:function(e,t,i){var n,a,o,r=this._option.series;if(!(r&&(n=r[e])&&(a=n[i])&&(o=a.data)))return this;t=t.split(" > ");for(var s=-1,l=0,h=o.length;h>l;l++){var d=o[l];if(d instanceof Array){if(d[0].name===t[0]&&d[1].name===t[1]){s=l;break}}else if(d.name===t[0]){s=l;break}}if(s>-1){o.splice(s,1),this._optionRestore.series[e][i].data.splice(s,1);var c=this.chart[n.type];c&&c.delMark(e,t.join(" > "),i)}return this},getDom:function(){return this.dom},getZrender:function(){return this._zr},getDataURL:function(e){if(!l)return"";if(0===this._chartList.length){var t="IMG"+this.id,i=document.getElementById(t);if(i)return i.src}var n=this.component.tooltip;switch(n&&n.hideTip(),e){case"jpeg":break;default:e="png"}var a=this._option.backgroundColor;return a&&"rgba(0,0,0,0)"===a.replace(" ","")&&(a="#fff"),this._zr.toDataURL("image/"+e,a)},getImage:function(e){var t=this._optionRestore.title,i=document.createElement("img");return i.src=this.getDataURL(e),i.title=t&&t.text||"ECharts",i},getConnectedDataURL:function(t){if(!this.isConnected())return this.getDataURL(t);var i=this.dom,n={self:{img:this.getDataURL(t),left:i.offsetLeft,top:i.offsetTop,right:i.offsetLeft+i.offsetWidth,bottom:i.offsetTop+i.offsetHeight}},a=n.self.left,o=n.self.top,r=n.self.right,s=n.self.bottom;for(var l in this._connected)i=this._connected[l].getDom(),n[l]={img:this._connected[l].getDataURL(t),left:i.offsetLeft,top:i.offsetTop,right:i.offsetLeft+i.offsetWidth,bottom:i.offsetTop+i.offsetHeight},a=Math.min(a,n[l].left),o=Math.min(o,n[l].top),r=Math.max(r,n[l].right),s=Math.max(s,n[l].bottom);var h=document.createElement("div");h.style.position="absolute",h.style.left="-4000px",h.style.width=r-a+"px",h.style.height=s-o+"px",document.body.appendChild(h);var d=e("zrender").init(h),c=e("zrender/shape/Image");for(var l in n)d.addShape(new c({style:{x:n[l].left-a,y:n[l].top-o,image:n[l].img}}));d.render();var m=this._option.backgroundColor;m&&"rgba(0,0,0,0)"===m.replace(/ /g,"")&&(m="#fff");var p=d.toDataURL("image/png",m);return setTimeout(function(){d.dispose(),h.parentNode.removeChild(h),h=null},100),p},getConnectedImage:function(e){var t=this._optionRestore.title,i=document.createElement("img");return i.src=this.getConnectedDataURL(e),i.title=t&&t.text||"ECharts",i},on:function(e,t){return this._messageCenterOutSide.bind(e,t,this),this},un:function(e,t){return this._messageCenterOutSide.unbind(e,t),this},connect:function(e){if(!e)return this;if(this._connected||(this._connected={}),e instanceof Array)for(var t=0,i=e.length;i>t;t++)this._connected[e[t].id]=e[t];else this._connected[e.id]=e;return this},disConnect:function(e){if(!e||!this._connected)return this;if(e instanceof Array)for(var t=0,i=e.length;i>t;t++)delete this._connected[e[t].id];else delete this._connected[e.id];for(var n in this._connected)return this;return this._connected=!1,this},connectedEventHandler:function(e){e.__echartsId!=this.id&&this._onevent(e)},isConnected:function(){return!!this._connected},showLoading:function(t){var i={bar:e("zrender/loadingEffect/Bar"),bubble:e("zrender/loadingEffect/Bubble"),dynamicLine:e("zrender/loadingEffect/DynamicLine"),ring:e("zrender/loadingEffect/Ring"),spin:e("zrender/loadingEffect/Spin"),whirling:e("zrender/loadingEffect/Whirling")};this._toolbox.hideDataView(),t=t||{};var n=t.textStyle||{};t.textStyle=n;var r=o.merge(o.merge(o.clone(n),this._themeConfig.textStyle),a.textStyle);n.textFont=r.fontStyle+" "+r.fontWeight+" "+r.fontSize+"px "+r.fontFamily,n.text=t.text||this._option&&this._option.loadingText||this._themeConfig.loadingText||a.loadingText,null!=t.x&&(n.x=t.x),null!=t.y&&(n.y=t.y),t.effectOption=t.effectOption||{},t.effectOption.textStyle=n;var s=t.effect;return("string"==typeof s||null==s)&&(s=i[t.effect||this._option&&this._option.loadingEffect||this._themeConfig.loadingEffect||a.loadingEffect]||i.spin),this._zr.showLoading(new s(t.effectOption)),this},hideLoading:function(){return this._zr.hideLoading(),this},setTheme:function(t){if(t){if("string"==typeof t)switch(t){case"macarons":t=e("./theme/macarons");break;case"infographic":t=e("./theme/infographic");break;default:t={}}else t=t||{};this._themeConfig=t}if(!l){var i=this._themeConfig.textStyle;i&&i.fontFamily&&i.fontFamily2&&(i.fontFamily=i.fontFamily2),i=a.textStyle,i.fontFamily=i.fontFamily2}this._timeline&&this._timeline.setTheme(!0),this._optionRestore&&this.restore()},resize:function(){var e=this;return function(){if(e._clearEffect(),e._zr.resize(),e._option&&e._option.renderAsImage&&l)return e._render(e._option),e;e._zr.clearAnimation(),e._island.resize(),e._toolbox.resize(),e._timeline&&e._timeline.resize();for(var t=0,i=e._chartList.length;i>t;t++)e._chartList[t].resize&&e._chartList[t].resize();return e.component.grid&&e.component.grid.refixAxisShape(e.component),e._zr.refresh(),e._messageCenter.dispatch(a.EVENT.RESIZE,null,null,e),e}},_clearEffect:function(){this._zr.modLayer(a.EFFECT_ZLEVEL,{motionBlur:!1}),this._zr.painter.clearLayer(a.EFFECT_ZLEVEL)},clear:function(){return this._disposeChartList(),this._zr.clear(),this._option={},this._optionRestore={},this.dom.style.backgroundColor=null,this},dispose:function(){var e=this.dom.getAttribute(c);e&&delete d[e],this._island.dispose(),this._toolbox.dispose(),this._timeline&&this._timeline.dispose(),this._messageCenter.unbind(),this.clear(),this._zr.dispose(),this._zr=null}},s}),define("echarts/config",[],function(){var e={CHART_TYPE_LINE:"line",CHART_TYPE_BAR:"bar",CHART_TYPE_SCATTER:"scatter",CHART_TYPE_PIE:"pie",CHART_TYPE_RADAR:"radar",CHART_TYPE_VENN:"venn",CHART_TYPE_TREEMAP:"treemap",CHART_TYPE_TREE:"tree",CHART_TYPE_MAP:"map",CHART_TYPE_K:"k",CHART_TYPE_ISLAND:"island",CHART_TYPE_FORCE:"force",CHART_TYPE_CHORD:"chord",CHART_TYPE_GAUGE:"gauge",CHART_TYPE_FUNNEL:"funnel",CHART_TYPE_EVENTRIVER:"eventRiver",CHART_TYPE_WORDCLOUD:"wordCloud",CHART_TYPE_HEATMAP:"heatmap",COMPONENT_TYPE_TITLE:"title",COMPONENT_TYPE_LEGEND:"legend",COMPONENT_TYPE_DATARANGE:"dataRange",COMPONENT_TYPE_DATAVIEW:"dataView",COMPONENT_TYPE_DATAZOOM:"dataZoom",COMPONENT_TYPE_TOOLBOX:"toolbox",COMPONENT_TYPE_TOOLTIP:"tooltip",COMPONENT_TYPE_GRID:"grid",COMPONENT_TYPE_AXIS:"axis",COMPONENT_TYPE_POLAR:"polar",COMPONENT_TYPE_X_AXIS:"xAxis",COMPONENT_TYPE_Y_AXIS:"yAxis",COMPONENT_TYPE_AXIS_CATEGORY:"categoryAxis",COMPONENT_TYPE_AXIS_VALUE:"valueAxis",COMPONENT_TYPE_TIMELINE:"timeline",COMPONENT_TYPE_ROAMCONTROLLER:"roamController",backgroundColor:"rgba(0,0,0,0)",color:["#ff7f50","#87cefa","#da70d6","#32cd32","#6495ed","#ff69b4","#ba55d3","#cd5c5c","#ffa500","#40e0d0","#1e90ff","#ff6347","#7b68ee","#00fa9a","#ffd700","#6699FF","#ff6666","#3cb371","#b8860b","#30e0e0"],markPoint:{clickable:!0,symbol:"pin",symbolSize:10,large:!1,effect:{show:!1,loop:!0,period:15,type:"scale",scaleSize:2,bounceDistance:10},itemStyle:{normal:{borderWidth:2,label:{show:!0,position:"inside"}},emphasis:{label:{show:!0}}}},markLine:{clickable:!0,symbol:["circle","arrow"],symbolSize:[2,4],smoothness:.2,precision:2,effect:{show:!1,loop:!0,period:15,scaleSize:2},bundling:{enable:!1,maxTurningAngle:45},itemStyle:{normal:{borderWidth:1.5,label:{show:!0,position:"end"},lineStyle:{type:"dashed"}},emphasis:{label:{show:!1},lineStyle:{}}}},textStyle:{decoration:"none",fontFamily:"Arial, Verdana, sans-serif",fontFamily2:"å¾®è½¯é›…é»‘",fontSize:12,fontStyle:"normal",fontWeight:"normal"},EVENT:{REFRESH:"refresh",RESTORE:"restore",RESIZE:"resize",CLICK:"click",DBLCLICK:"dblclick",HOVER:"hover",MOUSEOUT:"mouseout",DATA_CHANGED:"dataChanged",DATA_ZOOM:"dataZoom",DATA_RANGE:"dataRange",DATA_RANGE_SELECTED:"dataRangeSelected",DATA_RANGE_HOVERLINK:"dataRangeHoverLink",LEGEND_SELECTED:"legendSelected",LEGEND_HOVERLINK:"legendHoverLink",MAP_SELECTED:"mapSelected",PIE_SELECTED:"pieSelected",MAGIC_TYPE_CHANGED:"magicTypeChanged",DATA_VIEW_CHANGED:"dataViewChanged",TIMELINE_CHANGED:"timelineChanged",MAP_ROAM:"mapRoam",FORCE_LAYOUT_END:"forceLayoutEnd",TOOLTIP_HOVER:"tooltipHover",TOOLTIP_IN_GRID:"tooltipInGrid",TOOLTIP_OUT_GRID:"tooltipOutGrid",ROAMCONTROLLER:"roamController"},DRAG_ENABLE_TIME:120,EFFECT_ZLEVEL:10,effectBlendAlpha:.95,symbolList:["circle","rectangle","triangle","diamond","emptyCircle","emptyRectangle","emptyTriangle","emptyDiamond"],loadingEffect:"spin",loadingText:"æ•°æ®è¯»å–ä¸­...",noDataEffect:"bubble",noDataText:"æš‚æ— æ•°æ®",calculable:!1,calculableColor:"rgba(255,165,0,0.6)",calculableHolderColor:"#ccc",nameConnector:" & ",valueConnector:": ",animation:!0,addDataAnimation:!0,animationThreshold:2e3,animationDuration:2e3,animationDurationUpdate:500,animationEasing:"ExponentialOut"};return e}),define("zrender/tool/util",["require","../dep/excanvas"],function(e){function t(e){return e&&1===e.nodeType&&"string"==typeof e.nodeName}function i(e){if("object"==typeof e&&null!==e){var n=e;if(e instanceof Array){n=[];for(var a=0,o=e.length;o>a;a++)n[a]=i(e[a])}else if(!g[f.call(e)]&&!t(e)){n={};for(var r in e)e.hasOwnProperty(r)&&(n[r]=i(e[r]))}return n}return e}function n(e,i,n,o){if(i.hasOwnProperty(n)){var r=e[n];"object"!=typeof r||g[f.call(r)]||t(r)?!o&&n in e||(e[n]=i[n]):a(e[n],i[n],o)}}function a(e,t,i){for(var a in t)n(e,t,a,i);return e}function o(){if(!m)if(e("../dep/excanvas"),window.G_vmlCanvasManager){var t=document.createElement("div");t.style.position="absolute",t.style.top="-1000px",document.body.appendChild(t),m=G_vmlCanvasManager.initElement(t).getContext("2d");

}else m=document.createElement("canvas").getContext("2d");return m}function r(e,t){if(e.indexOf)return e.indexOf(t);for(var i=0,n=e.length;n>i;i++)if(e[i]===t)return i;return-1}function s(e,t){function i(){}var n=e.prototype;i.prototype=t.prototype,e.prototype=new i;for(var a in n)e.prototype[a]=n[a];e.constructor=e}function l(e,t,i){if(e&&t)if(e.forEach&&e.forEach===u)e.forEach(t,i);else if(e.length===+e.length)for(var n=0,a=e.length;a>n;n++)t.call(i,e[n],n,e);else for(var o in e)e.hasOwnProperty(o)&&t.call(i,e[o],o,e)}function h(e,t,i){if(e&&t){if(e.map&&e.map===V)return e.map(t,i);for(var n=[],a=0,o=e.length;o>a;a++)n.push(t.call(i,e[a],a,e));return n}}function d(e,t,i){if(e&&t){if(e.filter&&e.filter===U)return e.filter(t,i);for(var n=[],a=0,o=e.length;o>a;a++)t.call(i,e[a],a,e)&&n.push(e[a]);return n}}function c(e,t){return function(){e.apply(t,arguments)}}var m,p=Array.prototype,u=p.forEach,V=p.map,U=p.filter,g={"[object Function]":1,"[object RegExp]":1,"[object Date]":1,"[object Error]":1,"[object CanvasGradient]":1},f=Object.prototype.toString;return{inherits:s,clone:i,merge:a,getContext:o,indexOf:r,each:l,map:h,filter:d,bind:c}}),define("zrender/tool/event",["require","../mixin/Eventful"],function(e){"use strict";function t(e){return"undefined"!=typeof e.zrenderX&&e.zrenderX||"undefined"!=typeof e.offsetX&&e.offsetX||"undefined"!=typeof e.layerX&&e.layerX||"undefined"!=typeof e.clientX&&e.clientX}function i(e){return"undefined"!=typeof e.zrenderY&&e.zrenderY||"undefined"!=typeof e.offsetY&&e.offsetY||"undefined"!=typeof e.layerY&&e.layerY||"undefined"!=typeof e.clientY&&e.clientY}function n(e){return"undefined"!=typeof e.zrenderDelta&&e.zrenderDelta||"undefined"!=typeof e.wheelDelta&&e.wheelDelta||"undefined"!=typeof e.detail&&-e.detail}var a=e("../mixin/Eventful"),o="function"==typeof window.addEventListener?function(e){e.preventDefault(),e.stopPropagation(),e.cancelBubble=!0}:function(e){e.returnValue=!1,e.cancelBubble=!0};return{getX:t,getY:i,getDelta:n,stop:o,Dispatcher:a}}),define("zrender/tool/env",[],function(){function e(e){var t=this.os={},i=this.browser={},n=e.match(/Web[kK]it[\/]{0,1}([\d.]+)/),a=e.match(/(Android);?[\s\/]+([\d.]+)?/),o=e.match(/(iPad).*OS\s([\d_]+)/),r=e.match(/(iPod)(.*OS\s([\d_]+))?/),s=!o&&e.match(/(iPhone\sOS)\s([\d_]+)/),l=e.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),h=l&&e.match(/TouchPad/),d=e.match(/Kindle\/([\d.]+)/),c=e.match(/Silk\/([\d._]+)/),m=e.match(/(BlackBerry).*Version\/([\d.]+)/),p=e.match(/(BB10).*Version\/([\d.]+)/),u=e.match(/(RIM\sTablet\sOS)\s([\d.]+)/),V=e.match(/PlayBook/),U=e.match(/Chrome\/([\d.]+)/)||e.match(/CriOS\/([\d.]+)/),g=e.match(/Firefox\/([\d.]+)/),f=e.match(/MSIE ([\d.]+)/),y=n&&e.match(/Mobile\//)&&!U,b=e.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/)&&!U,f=e.match(/MSIE\s([\d.]+)/);return(i.webkit=!!n)&&(i.version=n[1]),a&&(t.android=!0,t.version=a[2]),s&&!r&&(t.ios=t.iphone=!0,t.version=s[2].replace(/_/g,".")),o&&(t.ios=t.ipad=!0,t.version=o[2].replace(/_/g,".")),r&&(t.ios=t.ipod=!0,t.version=r[3]?r[3].replace(/_/g,"."):null),l&&(t.webos=!0,t.version=l[2]),h&&(t.touchpad=!0),m&&(t.blackberry=!0,t.version=m[2]),p&&(t.bb10=!0,t.version=p[2]),u&&(t.rimtabletos=!0,t.version=u[2]),V&&(i.playbook=!0),d&&(t.kindle=!0,t.version=d[1]),c&&(i.silk=!0,i.version=c[1]),!c&&t.android&&e.match(/Kindle Fire/)&&(i.silk=!0),U&&(i.chrome=!0,i.version=U[1]),g&&(i.firefox=!0,i.version=g[1]),f&&(i.ie=!0,i.version=f[1]),y&&(e.match(/Safari/)||t.ios)&&(i.safari=!0),b&&(i.webview=!0),f&&(i.ie=!0,i.version=f[1]),t.tablet=!!(o||V||a&&!e.match(/Mobile/)||g&&e.match(/Tablet/)||f&&!e.match(/Phone/)&&e.match(/Touch/)),t.phone=!(t.tablet||t.ipod||!(a||s||l||m||p||U&&e.match(/Android/)||U&&e.match(/CriOS\/([\d.]+)/)||g&&e.match(/Mobile/)||f&&e.match(/Touch/))),{browser:i,os:t,canvasSupported:document.createElement("canvas").getContext?!0:!1}}return e(navigator.userAgent)}),define("zrender",["zrender/zrender"],function(e){return e}),define("zrender/zrender",["require","./dep/excanvas","./tool/util","./tool/log","./tool/guid","./Handler","./Painter","./Storage","./animation/Animation","./tool/env"],function(e){function t(e){return function(){e._needsRefreshNextFrame&&e.refresh()}}e("./dep/excanvas");var i=e("./tool/util"),n=e("./tool/log"),a=e("./tool/guid"),o=e("./Handler"),r=e("./Painter"),s=e("./Storage"),l=e("./animation/Animation"),h={},d={};d.version="2.1.1",d.init=function(e){var t=new c(a(),e);return h[t.id]=t,t},d.dispose=function(e){if(e)e.dispose();else{for(var t in h)h[t].dispose();h={}}return d},d.getInstance=function(e){return h[e]},d.delInstance=function(e){return delete h[e],d};var c=function(i,n){this.id=i,this.env=e("./tool/env"),this.storage=new s,this.painter=new r(n,this.storage),this.handler=new o(n,this.storage,this.painter),this.animation=new l({stage:{update:t(this)}}),this.animation.start();var a=this;this.painter.refreshNextFrame=function(){a.refreshNextFrame()},this._needsRefreshNextFrame=!1;var a=this,h=this.storage,d=h.delFromMap;h.delFromMap=function(e){var t=h.get(e);a.stopAnimation(t),d.call(h,e)}};return c.prototype.getId=function(){return this.id},c.prototype.addShape=function(e){return this.addElement(e),this},c.prototype.addGroup=function(e){return this.addElement(e),this},c.prototype.delShape=function(e){return this.delElement(e),this},c.prototype.delGroup=function(e){return this.delElement(e),this},c.prototype.modShape=function(e,t){return this.modElement(e,t),this},c.prototype.modGroup=function(e,t){return this.modElement(e,t),this},c.prototype.addElement=function(e){return this.storage.addRoot(e),this._needsRefreshNextFrame=!0,this},c.prototype.delElement=function(e){return this.storage.delRoot(e),this._needsRefreshNextFrame=!0,this},c.prototype.modElement=function(e,t){return this.storage.mod(e,t),this._needsRefreshNextFrame=!0,this},c.prototype.modLayer=function(e,t){return this.painter.modLayer(e,t),this._needsRefreshNextFrame=!0,this},c.prototype.addHoverShape=function(e){return this.storage.addHover(e),this},c.prototype.render=function(e){return this.painter.render(e),this._needsRefreshNextFrame=!1,this},c.prototype.refresh=function(e){return this.painter.refresh(e),this._needsRefreshNextFrame=!1,this},c.prototype.refreshNextFrame=function(){return this._needsRefreshNextFrame=!0,this},c.prototype.refreshHover=function(e){return this.painter.refreshHover(e),this},c.prototype.refreshShapes=function(e,t){return this.painter.refreshShapes(e,t),this},c.prototype.resize=function(){return this.painter.resize(),this},c.prototype.animate=function(e,t,a){var o=this;if("string"==typeof e&&(e=this.storage.get(e)),e){var r;if(t){for(var s=t.split("."),l=e,h=0,d=s.length;d>h;h++)l&&(l=l[s[h]]);l&&(r=l)}else r=e;if(!r)return void n('Property "'+t+'" is not existed in element '+e.id);null==e.__animators&&(e.__animators=[]);var c=e.__animators,m=this.animation.animate(r,{loop:a}).during(function(){o.modShape(e)}).done(function(){var t=i.indexOf(e.__animators,m);t>=0&&c.splice(t,1)});return c.push(m),m}n("Element not existed")},c.prototype.stopAnimation=function(e){if(e.__animators){for(var t=e.__animators,i=t.length,n=0;i>n;n++)t[n].stop();t.length=0}return this},c.prototype.clearAnimation=function(){return this.animation.clear(),this},c.prototype.showLoading=function(e){return this.painter.showLoading(e),this},c.prototype.hideLoading=function(){return this.painter.hideLoading(),this},c.prototype.getWidth=function(){return this.painter.getWidth()},c.prototype.getHeight=function(){return this.painter.getHeight()},c.prototype.toDataURL=function(e,t,i){return this.painter.toDataURL(e,t,i)},c.prototype.shapeToImage=function(e,t,i){var n=a();return this.painter.shapeToImage(n,e,t,i)},c.prototype.on=function(e,t,i){return this.handler.on(e,t,i),this},c.prototype.un=function(e,t){return this.handler.un(e,t),this},c.prototype.trigger=function(e,t){return this.handler.trigger(e,t),this},c.prototype.clear=function(){return this.storage.delRoot(),this.painter.clear(),this},c.prototype.dispose=function(){this.animation.stop(),this.clear(),this.storage.dispose(),this.painter.dispose(),this.handler.dispose(),this.animation=this.storage=this.painter=this.handler=null,d.delInstance(this.id)},d}),define("zrender/config",[],function(){var e={EVENT:{RESIZE:"resize",CLICK:"click",DBLCLICK:"dblclick",MOUSEWHEEL:"mousewheel",MOUSEMOVE:"mousemove",MOUSEOVER:"mouseover",MOUSEOUT:"mouseout",MOUSEDOWN:"mousedown",MOUSEUP:"mouseup",GLOBALOUT:"globalout",DRAGSTART:"dragstart",DRAGEND:"dragend",DRAGENTER:"dragenter",DRAGOVER:"dragover",DRAGLEAVE:"dragleave",DROP:"drop",touchClickDelay:300},elementClassName:"zr-element",catchBrushException:!1,debugMode:0,devicePixelRatio:Math.max(window.devicePixelRatio||1,1)};return e}),define("echarts/chart/island",["require","./base","zrender/shape/Circle","../config","../util/ecData","zrender/tool/util","zrender/tool/event","zrender/tool/color","../util/accMath","../chart"],function(e){function t(e,t,n,a,r){i.call(this,e,t,n,a,r),this._nameConnector,this._valueConnector,this._zrHeight=this.zr.getHeight(),this._zrWidth=this.zr.getWidth();var l=this;l.shapeHandler.onmousewheel=function(e){var t=e.target,i=e.event,n=s.getDelta(i);n=n>0?-1:1,t.style.r-=n,t.style.r=t.style.r<5?5:t.style.r;var a=o.get(t,"value"),r=a*l.option.island.calculateStep;a=r>1?Math.round(a-r*n):+(a-r*n).toFixed(2);var h=o.get(t,"name");t.style.text=h+":"+a,o.set(t,"value",a),o.set(t,"name",h),l.zr.modShape(t.id),l.zr.refreshNextFrame(),s.stop(i)}}var i=e("./base"),n=e("zrender/shape/Circle"),a=e("../config");a.island={zlevel:0,z:5,r:15,calculateStep:.1};var o=e("../util/ecData"),r=e("zrender/tool/util"),s=e("zrender/tool/event");return t.prototype={type:a.CHART_TYPE_ISLAND,_combine:function(t,i){var n=e("zrender/tool/color"),a=e("../util/accMath"),r=a.accAdd(o.get(t,"value"),o.get(i,"value")),s=o.get(t,"name")+this._nameConnector+o.get(i,"name");t.style.text=s+this._valueConnector+r,o.set(t,"value",r),o.set(t,"name",s),t.style.r=this.option.island.r,t.style.color=n.mix(t.style.color,i.style.color)},refresh:function(e){e&&(e.island=this.reformOption(e.island),this.option=e,this._nameConnector=this.option.nameConnector,this._valueConnector=this.option.valueConnector)},getOption:function(){return this.option},resize:function(){var e=this.zr.getWidth(),t=this.zr.getHeight(),i=e/(this._zrWidth||e),n=t/(this._zrHeight||t);if(1!==i||1!==n){this._zrWidth=e,this._zrHeight=t;for(var a=0,o=this.shapeList.length;o>a;a++)this.zr.modShape(this.shapeList[a].id,{style:{x:Math.round(this.shapeList[a].style.x*i),y:Math.round(this.shapeList[a].style.y*n)}})}},add:function(e){var t=o.get(e,"name"),i=o.get(e,"value"),a=null!=o.get(e,"series")?o.get(e,"series").name:"",r=this.getFont(this.option.island.textStyle),s=this.option.island,l={zlevel:s.zlevel,z:s.z,style:{x:e.style.x,y:e.style.y,r:this.option.island.r,color:e.style.color||e.style.strokeColor,text:t+this._valueConnector+i,textFont:r},draggable:!0,hoverable:!0,onmousewheel:this.shapeHandler.onmousewheel,_type:"island"};"#fff"===l.style.color&&(l.style.color=e.style.strokeColor),this.setCalculable(l),l.dragEnableTime=0,o.pack(l,{name:a},-1,i,-1,t),l=new n(l),this.shapeList.push(l),this.zr.addShape(l)},del:function(e){this.zr.delShape(e.id);for(var t=[],i=0,n=this.shapeList.length;n>i;i++)this.shapeList[i].id!=e.id&&t.push(this.shapeList[i]);this.shapeList=t},ondrop:function(e,t){if(this.isDrop&&e.target){var i=e.target,n=e.dragged;this._combine(i,n),this.zr.modShape(i.id),t.dragIn=!0,this.isDrop=!1}},ondragend:function(e,t){var i=e.target;this.isDragend?t.dragIn&&(this.del(i),t.needRefresh=!0):t.dragIn||(i.style.x=s.getX(e.event),i.style.y=s.getY(e.event),this.add(i),t.needRefresh=!0),this.isDragend=!1}},r.inherits(t,i),e("../chart").define("island",t),t}),define("echarts/component/toolbox",["require","./base","zrender/shape/Line","zrender/shape/Image","zrender/shape/Rectangle","../util/shape/Icon","../config","zrender/tool/util","zrender/config","zrender/tool/event","./dataView","../component"],function(e){function t(e,t,n,a,o){i.call(this,e,t,n,a,o),this.dom=o.dom,this._magicType={},this._magicMap={},this._isSilence=!1,this._iconList,this._iconShapeMap={},this._featureTitle={},this._featureIcon={},this._featureColor={},this._featureOption={},this._enableColor="red",this._disableColor="#ccc",this._markShapeList=[];var r=this;r._onMark=function(e){r.__onMark(e)},r._onMarkUndo=function(e){r.__onMarkUndo(e)},r._onMarkClear=function(e){r.__onMarkClear(e)},r._onDataZoom=function(e){r.__onDataZoom(e)},r._onDataZoomReset=function(e){r.__onDataZoomReset(e)},r._onDataView=function(e){r.__onDataView(e)},r._onRestore=function(e){r.__onRestore(e)},r._onSaveAsImage=function(e){r.__onSaveAsImage(e)},r._onMagicType=function(e){r.__onMagicType(e)},r._onCustomHandler=function(e){r.__onCustomHandler(e)},r._onmousemove=function(e){return r.__onmousemove(e)},r._onmousedown=function(e){return r.__onmousedown(e)},r._onmouseup=function(e){return r.__onmouseup(e)},r._onclick=function(e){return r.__onclick(e)}}var i=e("./base"),n=e("zrender/shape/Line"),a=e("zrender/shape/Image"),o=e("zrender/shape/Rectangle"),r=e("../util/shape/Icon"),s=e("../config");s.toolbox={zlevel:0,z:6,show:!1,orient:"horizontal",x:"right",y:"top",color:["#1e90ff","#22bb22","#4b0082","#d2691e"],disableColor:"#ddd",effectiveColor:"red",backgroundColor:"rgba(0,0,0,0)",borderColor:"#ccc",borderWidth:0,padding:5,itemGap:10,itemSize:16,showTitle:!0,feature:{mark:{show:!1,title:{mark:"è¾…åŠ©çº¿å¼€å…³",markUndo:"åˆ é™¤è¾…åŠ©çº¿",markClear:"æ¸…ç©ºè¾…åŠ©çº¿"},lineStyle:{width:1,color:"#1e90ff",type:"dashed"}},dataZoom:{show:!1,title:{dataZoom:"åŒºåŸŸç¼©æ”¾",dataZoomReset:"åŒºåŸŸç¼©æ”¾åŽé€€"}},dataView:{show:!1,title:"æ•°æ®è§†å›¾",readOnly:!1,lang:["æ•°æ®è§†å›¾","å…³é—­","åˆ·æ–°"]},magicType:{show:!1,title:{line:"æŠ˜çº¿å›¾åˆ‡æ¢",bar:"æŸ±å½¢å›¾åˆ‡æ¢",stack:"å †ç§¯",tiled:"å¹³é“º",force:"åŠ›å¯¼å‘å¸ƒå±€å›¾åˆ‡æ¢",chord:"å’Œå¼¦å›¾åˆ‡æ¢",pie:"é¥¼å›¾åˆ‡æ¢",funnel:"æ¼æ–—å›¾åˆ‡æ¢"},type:[]},restore:{show:!1,title:"è¿˜åŽŸ"},saveAsImage:{show:!1,title:"ä¿å­˜ä¸ºå›¾ç‰‡",type:"png",lang:["ç‚¹å‡»ä¿å­˜"]}}};var l=e("zrender/tool/util"),h=e("zrender/config"),d=e("zrender/tool/event"),c="stack",m="tiled";return t.prototype={type:s.COMPONENT_TYPE_TOOLBOX,_buildShape:function(){this._iconList=[];var e=this.option.toolbox;this._enableColor=e.effectiveColor,this._disableColor=e.disableColor;var t=e.feature,i=[];for(var n in t)if(t[n].show)switch(n){case"mark":i.push({key:n,name:"mark"}),i.push({key:n,name:"markUndo"}),i.push({key:n,name:"markClear"});break;case"magicType":for(var a=0,o=t[n].type.length;o>a;a++)t[n].title[t[n].type[a]+"Chart"]=t[n].title[t[n].type[a]],t[n].option&&(t[n].option[t[n].type[a]+"Chart"]=t[n].option[t[n].type[a]]),i.push({key:n,name:t[n].type[a]+"Chart"});break;case"dataZoom":i.push({key:n,name:"dataZoom"}),i.push({key:n,name:"dataZoomReset"});break;case"saveAsImage":this.canvasSupported&&i.push({key:n,name:"saveAsImage"});break;default:i.push({key:n,name:n})}if(i.length>0){for(var r,n,a=0,o=i.length;o>a;a++)r=i[a].name,n=i[a].key,this._iconList.push(r),this._featureTitle[r]=t[n].title[r]||t[n].title,t[n].icon&&(this._featureIcon[r]=t[n].icon[r]||t[n].icon),t[n].color&&(this._featureColor[r]=t[n].color[r]||t[n].color),t[n].option&&(this._featureOption[r]=t[n].option[r]||t[n].option);this._itemGroupLocation=this._getItemGroupLocation(),this._buildBackground(),this._buildItem();for(var a=0,o=this.shapeList.length;o>a;a++)this.zr.addShape(this.shapeList[a]);this._iconShapeMap.mark&&(this._iconDisable(this._iconShapeMap.markUndo),this._iconDisable(this._iconShapeMap.markClear)),this._iconShapeMap.dataZoomReset&&0===this._zoomQueue.length&&this._iconDisable(this._iconShapeMap.dataZoomReset)}},_buildItem:function(){var t,i,n,o,s=this.option.toolbox,l=this._iconList.length,h=this._itemGroupLocation.x,d=this._itemGroupLocation.y,c=s.itemSize,m=s.itemGap,p=s.color instanceof Array?s.color:[s.color],u=this.getFont(s.textStyle);"horizontal"===s.orient?(i=this._itemGroupLocation.y/this.zr.getHeight()<.5?"bottom":"top",n=this._itemGroupLocation.x/this.zr.getWidth()<.5?"left":"right",o=this._itemGroupLocation.y/this.zr.getHeight()<.5?"top":"bottom"):i=this._itemGroupLocation.x/this.zr.getWidth()<.5?"right":"left",this._iconShapeMap={};for(var V=this,U=0;l>U;U++){switch(t={type:"icon",zlevel:this.getZlevelBase(),z:this.getZBase(),style:{x:h,y:d,width:c,height:c,iconType:this._iconList[U],lineWidth:1,strokeColor:this._featureColor[this._iconList[U]]||p[U%p.length],brushType:"stroke"},highlightStyle:{lineWidth:1,text:s.showTitle?this._featureTitle[this._iconList[U]]:void 0,textFont:u,textPosition:i,strokeColor:this._featureColor[this._iconList[U]]||p[U%p.length]},hoverable:!0,clickable:!0},this._featureIcon[this._iconList[U]]&&(t.style.image=this._featureIcon[this._iconList[U]].replace(new RegExp("^image:\\/\\/"),""),t.style.opacity=.8,t.highlightStyle.opacity=1,t.type="image"),"horizontal"===s.orient&&(0===U&&"left"===n&&(t.highlightStyle.textPosition="specific",t.highlightStyle.textAlign=n,t.highlightStyle.textBaseline=o,t.highlightStyle.textX=h,t.highlightStyle.textY="top"===o?d+c+10:d-10),U===l-1&&"right"===n&&(t.highlightStyle.textPosition="specific",t.highlightStyle.textAlign=n,t.highlightStyle.textBaseline=o,t.highlightStyle.textX=h+c,t.highlightStyle.textY="top"===o?d+c+10:d-10)),this._iconList[U]){case"mark":t.onclick=V._onMark;break;case"markUndo":t.onclick=V._onMarkUndo;break;case"markClear":t.onclick=V._onMarkClear;break;case"dataZoom":t.onclick=V._onDataZoom;break;case"dataZoomReset":t.onclick=V._onDataZoomReset;break;case"dataView":if(!this._dataView){var g=e("./dataView");this._dataView=new g(this.ecTheme,this.messageCenter,this.zr,this.option,this.myChart)}t.onclick=V._onDataView;break;case"restore":t.onclick=V._onRestore;break;case"saveAsImage":t.onclick=V._onSaveAsImage;break;default:this._iconList[U].match("Chart")?(t._name=this._iconList[U].replace("Chart",""),t.onclick=V._onMagicType):t.onclick=V._onCustomHandler}"icon"===t.type?t=new r(t):"image"===t.type&&(t=new a(t)),this.shapeList.push(t),this._iconShapeMap[this._iconList[U]]=t,"horizontal"===s.orient?h+=c+m:d+=c+m}},_buildBackground:function(){var e=this.option.toolbox,t=this.reformCssArray(this.option.toolbox.padding);this.shapeList.push(new o({zlevel:this.getZlevelBase(),z:this.getZBase(),hoverable:!1,style:{x:this._itemGroupLocation.x-t[3],y:this._itemGroupLocation.y-t[0],width:this._itemGroupLocation.width+t[3]+t[1],height:this._itemGroupLocation.height+t[0]+t[2],brushType:0===e.borderWidth?"fill":"both",color:e.backgroundColor,strokeColor:e.borderColor,lineWidth:e.borderWidth}}))},_getItemGroupLocation:function(){var e=this.option.toolbox,t=this.reformCssArray(this.option.toolbox.padding),i=this._iconList.length,n=e.itemGap,a=e.itemSize,o=0,r=0;"horizontal"===e.orient?(o=(a+n)*i-n,r=a):(r=(a+n)*i-n,o=a);var s,l=this.zr.getWidth();switch(e.x){case"center":s=Math.floor((l-o)/2);break;case"left":s=t[3]+e.borderWidth;break;case"right":s=l-o-t[1]-e.borderWidth;break;default:s=e.x-0,s=isNaN(s)?0:s}var h,d=this.zr.getHeight();switch(e.y){case"top":h=t[0]+e.borderWidth;break;case"bottom":h=d-r-t[2]-e.borderWidth;break;case"center":h=Math.floor((d-r)/2);break;default:h=e.y-0,h=isNaN(h)?0:h}return{x:s,y:h,width:o,height:r}},__onmousemove:function(e){this._marking&&(this._markShape.style.xEnd=d.getX(e.event),this._markShape.style.yEnd=d.getY(e.event),this.zr.addHoverShape(this._markShape)),this._zooming&&(this._zoomShape.style.width=d.getX(e.event)-this._zoomShape.style.x,this._zoomShape.style.height=d.getY(e.event)-this._zoomShape.style.y,this.zr.addHoverShape(this._zoomShape),this.dom.style.cursor="crosshair",d.stop(e.event)),this._zoomStart&&"pointer"!=this.dom.style.cursor&&"move"!=this.dom.style.cursor&&(this.dom.style.cursor="crosshair")},__onmousedown:function(e){if(!e.target){this._zooming=!0;var t=d.getX(e.event),i=d.getY(e.event),n=this.option.dataZoom||{};return this._zoomShape=new o({zlevel:this.getZlevelBase(),z:this.getZBase(),style:{x:t,y:i,width:1,height:1,brushType:"both"},highlightStyle:{lineWidth:2,color:n.fillerColor||s.dataZoom.fillerColor,strokeColor:n.handleColor||s.dataZoom.handleColor,brushType:"both"}}),this.zr.addHoverShape(this._zoomShape),!0}},__onmouseup:function(){if(!this._zoomShape||Math.abs(this._zoomShape.style.width)<10||Math.abs(this._zoomShape.style.height)<10)return this._zooming=!1,!0;if(this._zooming&&this.component.dataZoom){this._zooming=!1;var e=this.component.dataZoom.rectZoom(this._zoomShape.style);e&&(this._zoomQueue.push({start:e.start,end:e.end,start2:e.start2,end2:e.end2}),this._iconEnable(this._iconShapeMap.dataZoomReset),this.zr.refreshNextFrame())}return!0},__onclick:function(e){if(!e.target)if(this._marking)this._marking=!1,this._markShapeList.push(this._markShape),this._iconEnable(this._iconShapeMap.markUndo),this._iconEnable(this._iconShapeMap.markClear),this.zr.addShape(this._markShape),this.zr.refreshNextFrame();else if(this._markStart){this._marking=!0;var t=d.getX(e.event),i=d.getY(e.event);this._markShape=new n({zlevel:this.getZlevelBase(),z:this.getZBase(),style:{xStart:t,yStart:i,xEnd:t,yEnd:i,lineWidth:this.query(this.option,"toolbox.feature.mark.lineStyle.width"),strokeColor:this.query(this.option,"toolbox.feature.mark.lineStyle.color"),lineType:this.query(this.option,"toolbox.feature.mark.lineStyle.type")}}),this.zr.addHoverShape(this._markShape)}},__onMark:function(e){var t=e.target;if(this._marking||this._markStart)this._resetMark(),this.zr.refreshNextFrame();else{this._resetZoom(),this.zr.modShape(t.id,{style:{strokeColor:this._enableColor}}),this.zr.refreshNextFrame(),this._markStart=!0;var i=this;setTimeout(function(){i.zr&&i.zr.on(h.EVENT.CLICK,i._onclick)&&i.zr.on(h.EVENT.MOUSEMOVE,i._onmousemove)},10)}return!0},__onMarkUndo:function(){if(this._marking)this._marking=!1;else{var e=this._markShapeList.length;if(e>=1){var t=this._markShapeList[e-1];this.zr.delShape(t.id),this.zr.refreshNextFrame(),this._markShapeList.pop(),1===e&&(this._iconDisable(this._iconShapeMap.markUndo),this._iconDisable(this._iconShapeMap.markClear))}}return!0},__onMarkClear:function(){this._marking&&(this._marking=!1);var e=this._markShapeList.length;if(e>0){for(;e--;)this.zr.delShape(this._markShapeList.pop().id);this._iconDisable(this._iconShapeMap.markUndo),this._iconDisable(this._iconShapeMap.markClear),this.zr.refreshNextFrame()}return!0},__onDataZoom:function(e){var t=e.target;if(this._zooming||this._zoomStart)this._resetZoom(),this.zr.refreshNextFrame(),this.dom.style.cursor="default";else{this._resetMark(),this.zr.modShape(t.id,{style:{strokeColor:this._enableColor}}),this.zr.refreshNextFrame(),this._zoomStart=!0;var i=this;setTimeout(function(){i.zr&&i.zr.on(h.EVENT.MOUSEDOWN,i._onmousedown)&&i.zr.on(h.EVENT.MOUSEUP,i._onmouseup)&&i.zr.on(h.EVENT.MOUSEMOVE,i._onmousemove)},10),this.dom.style.cursor="crosshair"}return!0},__onDataZoomReset:function(){return this._zooming&&(this._zooming=!1),this._zoomQueue.pop(),this._zoomQueue.length>0?this.component.dataZoom.absoluteZoom(this._zoomQueue[this._zoomQueue.length-1]):(this.component.dataZoom.rectZoom(),this._iconDisable(this._iconShapeMap.dataZoomReset),this.zr.refreshNextFrame()),!0},_resetMark:function(){this._marking=!1,this._markStart&&(this._markStart=!1,this._iconShapeMap.mark&&this.zr.modShape(this._iconShapeMap.mark.id,{style:{strokeColor:this._iconShapeMap.mark.highlightStyle.strokeColor}}),this.zr.un(h.EVENT.CLICK,this._onclick),this.zr.un(h.EVENT.MOUSEMOVE,this._onmousemove))},_resetZoom:function(){this._zooming=!1,this._zoomStart&&(this._zoomStart=!1,this._iconShapeMap.dataZoom&&this.zr.modShape(this._iconShapeMap.dataZoom.id,{style:{strokeColor:this._iconShapeMap.dataZoom.highlightStyle.strokeColor}}),this.zr.un(h.EVENT.MOUSEDOWN,this._onmousedown),this.zr.un(h.EVENT.MOUSEUP,this._onmouseup),this.zr.un(h.EVENT.MOUSEMOVE,this._onmousemove))},_iconDisable:function(e){"image"!=e.type?this.zr.modShape(e.id,{hoverable:!1,clickable:!1,style:{strokeColor:this._disableColor}}):this.zr.modShape(e.id,{hoverable:!1,clickable:!1,style:{opacity:.3}})},_iconEnable:function(e){"image"!=e.type?this.zr.modShape(e.id,{hoverable:!0,clickable:!0,style:{strokeColor:e.highlightStyle.strokeColor}}):this.zr.modShape(e.id,{hoverable:!0,clickable:!0,style:{opacity:.8}})},__onDataView:function(){return this._dataView.show(this.option),!0},__onRestore:function(){return this._resetMark(),this._resetZoom(),this.messageCenter.dispatch(s.EVENT.RESTORE,null,null,this.myChart),!0},__onSaveAsImage:function(){var e=this.option.toolbox.feature.saveAsImage,t=e.type||"png";"png"!=t&&"jpeg"!=t&&(t="png");var i;i=this.myChart.isConnected()?this.myChart.getConnectedDataURL(t):this.zr.toDataURL("image/"+t,this.option.backgroundColor&&"rgba(0,0,0,0)"===this.option.backgroundColor.replace(" ","")?"#fff":this.option.backgroundColor);var n=document.createElement("div");n.id="__echarts_download_wrap__",n.style.cssText="position:fixed;z-index:99999;display:block;top:0;left:0;background-color:rgba(33,33,33,0.5);text-align:center;width:100%;height:100%;line-height:"+document.documentElement.clientHeight+"px;";var a=document.createElement("a");a.href=i,a.setAttribute("download",(e.name?e.name:this.option.title&&(this.option.title.text||this.option.title.subtext)?this.option.title.text||this.option.title.subtext:"ECharts")+"."+t),a.innerHTML='<img style="vertical-align:middle" src="'+i+'" title="'+(window.ActiveXObject||"ActiveXObject"in window?"å³é”®->å›¾ç‰‡å¦å­˜ä¸º":e.lang?e.lang[0]:"ç‚¹å‡»ä¿å­˜")+'"/>',n.appendChild(a),document.body.appendChild(n),a=null,n=null,setTimeout(function(){var e=document.getElementById("__echarts_download_wrap__");e&&(e.onclick=function(){var e=document.getElementById("__echarts_download_wrap__");e.onclick=null,e.innerHTML="",document.body.removeChild(e),e=null},e=null)},500)},__onMagicType:function(e){this._resetMark();var t=e.target._name;return this._magicType[t]||(this._magicType[t]=!0,t===s.CHART_TYPE_LINE?this._magicType[s.CHART_TYPE_BAR]=!1:t===s.CHART_TYPE_BAR&&(this._magicType[s.CHART_TYPE_LINE]=!1),t===s.CHART_TYPE_PIE?this._magicType[s.CHART_TYPE_FUNNEL]=!1:t===s.CHART_TYPE_FUNNEL&&(this._magicType[s.CHART_TYPE_PIE]=!1),t===s.CHART_TYPE_FORCE?this._magicType[s.CHART_TYPE_CHORD]=!1:t===s.CHART_TYPE_CHORD&&(this._magicType[s.CHART_TYPE_FORCE]=!1),t===c?this._magicType[m]=!1:t===m&&(this._magicType[c]=!1),this.messageCenter.dispatch(s.EVENT.MAGIC_TYPE_CHANGED,e.event,{magicType:this._magicType},this.myChart)),!0},setMagicType:function(e){this._resetMark(),this._magicType=e,!this._isSilence&&this.messageCenter.dispatch(s.EVENT.MAGIC_TYPE_CHANGED,null,{magicType:this._magicType},this.myChart)},__onCustomHandler:function(e){var t=e.target.style.iconType,i=this.option.toolbox.feature[t].onclick;"function"==typeof i&&i.call(this,this.option)},reset:function(e,t){if(t&&this.clear(),this.query(e,"toolbox.show")&&this.query(e,"toolbox.feature.magicType.show")){var i=e.toolbox.feature.magicType.type,n=i.length;for(this._magicMap={};n--;)this._magicMap[i[n]]=!0;n=e.series.length;for(var a,o;n--;)a=e.series[n].type,this._magicMap[a]&&(o=e.xAxis instanceof Array?e.xAxis[e.series[n].xAxisIndex||0]:e.xAxis,o&&"category"===(o.type||"category")&&(o.__boundaryGap=null!=o.boundaryGap?o.boundaryGap:!0),o=e.yAxis instanceof Array?e.yAxis[e.series[n].yAxisIndex||0]:e.yAxis,o&&"category"===o.type&&(o.__boundaryGap=null!=o.boundaryGap?o.boundaryGap:!0),e.series[n].__type=a,e.series[n].__itemStyle=l.clone(e.series[n].itemStyle||{})),(this._magicMap[c]||this._magicMap[m])&&(e.series[n].__stack=e.series[n].stack)}this._magicType=t?{}:this._magicType||{};for(var r in this._magicType)if(this._magicType[r]){this.option=e,this.getMagicOption();break}var s=e.dataZoom;if(s&&s.show){var h=null!=s.start&&s.start>=0&&s.start<=100?s.start:0,d=null!=s.end&&s.end>=0&&s.end<=100?s.end:100;h>d&&(h+=d,d=h-d,h-=d),this._zoomQueue=[{start:h,end:d,start2:0,end2:100}]}else this._zoomQueue=[]},getMagicOption:function(){var e,t;if(this._magicType[s.CHART_TYPE_LINE]||this._magicType[s.CHART_TYPE_BAR]){for(var i=this._magicType[s.CHART_TYPE_LINE]?!1:!0,n=0,a=this.option.series.length;a>n;n++)t=this.option.series[n].type,(t==s.CHART_TYPE_LINE||t==s.CHART_TYPE_BAR)&&(e=this.option.xAxis instanceof Array?this.option.xAxis[this.option.series[n].xAxisIndex||0]:this.option.xAxis,e&&"category"===(e.type||"category")&&(e.boundaryGap=i?!0:e.__boundaryGap),e=this.option.yAxis instanceof Array?this.option.yAxis[this.option.series[n].yAxisIndex||0]:this.option.yAxis,e&&"category"===e.type&&(e.boundaryGap=i?!0:e.__boundaryGap));this._defaultMagic(s.CHART_TYPE_LINE,s.CHART_TYPE_BAR)}if(this._defaultMagic(s.CHART_TYPE_CHORD,s.CHART_TYPE_FORCE),this._defaultMagic(s.CHART_TYPE_PIE,s.CHART_TYPE_FUNNEL),this._magicType[c]||this._magicType[m])for(var n=0,a=this.option.series.length;a>n;n++)this._magicType[c]?(this.option.series[n].stack="_ECHARTS_STACK_KENER_2014_",t=c):this._magicType[m]&&(this.option.series[n].stack=null,t=m),this._featureOption[t+"Chart"]&&l.merge(this.option.series[n],this._featureOption[t+"Chart"]||{},!0);return this.option},_defaultMagic:function(e,t){if(this._magicType[e]||this._magicType[t])for(var i=0,n=this.option.series.length;n>i;i++){var a=this.option.series[i].type;(a==e||a==t)&&(this.option.series[i].type=this._magicType[e]?e:t,this.option.series[i].itemStyle=l.clone(this.option.series[i].__itemStyle),a=this.option.series[i].type,this._featureOption[a+"Chart"]&&l.merge(this.option.series[i],this._featureOption[a+"Chart"]||{},!0))}},silence:function(e){this._isSilence=e},resize:function(){this._resetMark(),this.clear(),this.option&&this.option.toolbox&&this.option.toolbox.show&&this._buildShape(),this._dataView&&this._dataView.resize()},hideDataView:function(){this._dataView&&this._dataView.hide()},clear:function(e){this.zr&&(this.zr.delShape(this.shapeList),this.shapeList=[],e||(this.zr.delShape(this._markShapeList),this._markShapeList=[]))},onbeforDispose:function(){this._dataView&&(this._dataView.dispose(),this._dataView=null),this._markShapeList=null},refresh:function(e){e&&(this._resetMark(),this._resetZoom(),e.toolbox=this.reformOption(e.toolbox),this.option=e,this.clear(!0),e.toolbox.show&&this._buildShape(),this.hideDataView())}},l.inherits(t,i),e("../component").define("toolbox",t),t}),define("echarts/component",[],function(){var e={},t={};return e.define=function(i,n){return t[i]=n,e},e.get=function(e){return t[e]},e}),define("echarts/component/title",["require","./base","zrender/shape/Text","zrender/shape/Rectangle","../config","zrender/tool/util","zrender/tool/area","zrender/tool/color","../component"],function(e){function t(e,t,n,a,o){i.call(this,e,t,n,a,o),this.refresh(a)}var i=e("./base"),n=e("zrender/shape/Text"),a=e("zrender/shape/Rectangle"),o=e("../config");o.title={zlevel:0,z:6,show:!0,text:"",subtext:"",x:"left",y:"top",backgroundColor:"rgba(0,0,0,0)",borderColor:"#ccc",borderWidth:0,padding:5,itemGap:5,textStyle:{fontSize:18,fontWeight:"bolder",color:"#333"},subtextStyle:{color:"#aaa"}};var r=e("zrender/tool/util"),s=e("zrender/tool/area"),l=e("zrender/tool/color");return t.prototype={type:o.COMPONENT_TYPE_TITLE,_buildShape:function(){if(this.titleOption.show){this._itemGroupLocation=this._getItemGroupLocation(),this._buildBackground(),this._buildItem();for(var e=0,t=this.shapeList.length;t>e;e++)this.zr.addShape(this.shapeList[e])}},_buildItem:function(){var e=this.titleOption.text,t=this.titleOption.link,i=this.titleOption.target,a=this.titleOption.subtext,o=this.titleOption.sublink,r=this.titleOption.subtarget,s=this.getFont(this.titleOption.textStyle),h=this.getFont(this.titleOption.subtextStyle),d=this._itemGroupLocation.x,c=this._itemGroupLocation.y,m=this._itemGroupLocation.width,p=this._itemGroupLocation.height,u={zlevel:this.getZlevelBase(),z:this.getZBase(),style:{y:c,color:this.titleOption.textStyle.color,text:e,textFont:s,textBaseline:"top"},highlightStyle:{color:l.lift(this.titleOption.textStyle.color,1),brushType:"fill"},hoverable:!1};t&&(u.hoverable=!0,u.clickable=!0,u.onclick=function(){i&&"self"==i?window.location=t:window.open(t)});var V={zlevel:this.getZlevelBase(),z:this.getZBase(),
style:{y:c+p,color:this.titleOption.subtextStyle.color,text:a,textFont:h,textBaseline:"bottom"},highlightStyle:{color:l.lift(this.titleOption.subtextStyle.color,1),brushType:"fill"},hoverable:!1};switch(o&&(V.hoverable=!0,V.clickable=!0,V.onclick=function(){r&&"self"==r?window.location=o:window.open(o)}),this.titleOption.x){case"center":u.style.x=V.style.x=d+m/2,u.style.textAlign=V.style.textAlign="center";break;case"left":u.style.x=V.style.x=d,u.style.textAlign=V.style.textAlign="left";break;case"right":u.style.x=V.style.x=d+m,u.style.textAlign=V.style.textAlign="right";break;default:d=this.titleOption.x-0,d=isNaN(d)?0:d,u.style.x=V.style.x=d}this.titleOption.textAlign&&(u.style.textAlign=V.style.textAlign=this.titleOption.textAlign),this.shapeList.push(new n(u)),""!==a&&this.shapeList.push(new n(V))},_buildBackground:function(){var e=this.reformCssArray(this.titleOption.padding);this.shapeList.push(new a({zlevel:this.getZlevelBase(),z:this.getZBase(),hoverable:!1,style:{x:this._itemGroupLocation.x-e[3],y:this._itemGroupLocation.y-e[0],width:this._itemGroupLocation.width+e[3]+e[1],height:this._itemGroupLocation.height+e[0]+e[2],brushType:0===this.titleOption.borderWidth?"fill":"both",color:this.titleOption.backgroundColor,strokeColor:this.titleOption.borderColor,lineWidth:this.titleOption.borderWidth}}))},_getItemGroupLocation:function(){var e,t=this.reformCssArray(this.titleOption.padding),i=this.titleOption.text,n=this.titleOption.subtext,a=this.getFont(this.titleOption.textStyle),o=this.getFont(this.titleOption.subtextStyle),r=Math.max(s.getTextWidth(i,a),s.getTextWidth(n,o)),l=s.getTextHeight(i,a)+(""===n?0:this.titleOption.itemGap+s.getTextHeight(n,o)),h=this.zr.getWidth();switch(this.titleOption.x){case"center":e=Math.floor((h-r)/2);break;case"left":e=t[3]+this.titleOption.borderWidth;break;case"right":e=h-r-t[1]-this.titleOption.borderWidth;break;default:e=this.titleOption.x-0,e=isNaN(e)?0:e}var d,c=this.zr.getHeight();switch(this.titleOption.y){case"top":d=t[0]+this.titleOption.borderWidth;break;case"bottom":d=c-l-t[2]-this.titleOption.borderWidth;break;case"center":d=Math.floor((c-l)/2);break;default:d=this.titleOption.y-0,d=isNaN(d)?0:d}return{x:e,y:d,width:r,height:l}},refresh:function(e){e&&(this.option=e,this.option.title=this.reformOption(this.option.title),this.titleOption=this.option.title,this.titleOption.textStyle=this.getTextStyle(this.titleOption.textStyle),this.titleOption.subtextStyle=this.getTextStyle(this.titleOption.subtextStyle)),this.clear(),this._buildShape()}},r.inherits(t,i),e("../component").define("title",t),t}),define("echarts/component/tooltip",["require","./base","../util/shape/Cross","zrender/shape/Line","zrender/shape/Rectangle","../config","../util/ecData","zrender/config","zrender/tool/event","zrender/tool/area","zrender/tool/color","zrender/tool/util","zrender/shape/Base","../component"],function(e){function t(e,t,o,r,s){i.call(this,e,t,o,r,s),this.dom=s.dom;var l=this;l._onmousemove=function(e){return l.__onmousemove(e)},l._onglobalout=function(e){return l.__onglobalout(e)},this.zr.on(h.EVENT.MOUSEMOVE,l._onmousemove),this.zr.on(h.EVENT.GLOBALOUT,l._onglobalout),l._hide=function(e){return l.__hide(e)},l._tryShow=function(e){return l.__tryShow(e)},l._refixed=function(e){return l.__refixed(e)},l._setContent=function(e,t){return l.__setContent(e,t)},this._tDom=this._tDom||document.createElement("div"),this._tDom.onselectstart=function(){return!1},this._tDom.onmouseover=function(){l._mousein=!0},this._tDom.onmouseout=function(){l._mousein=!1},this._tDom.className="echarts-tooltip",this._tDom.style.position="absolute",this.hasAppend=!1,this._axisLineShape&&this.zr.delShape(this._axisLineShape.id),this._axisLineShape=new a({zlevel:this.getZlevelBase(),z:this.getZBase(),invisible:!0,hoverable:!1}),this.shapeList.push(this._axisLineShape),this.zr.addShape(this._axisLineShape),this._axisShadowShape&&this.zr.delShape(this._axisShadowShape.id),this._axisShadowShape=new a({zlevel:this.getZlevelBase(),z:1,invisible:!0,hoverable:!1}),this.shapeList.push(this._axisShadowShape),this.zr.addShape(this._axisShadowShape),this._axisCrossShape&&this.zr.delShape(this._axisCrossShape.id),this._axisCrossShape=new n({zlevel:this.getZlevelBase(),z:this.getZBase(),invisible:!0,hoverable:!1}),this.shapeList.push(this._axisCrossShape),this.zr.addShape(this._axisCrossShape),this.showing=!1,this.refresh(r)}var i=e("./base"),n=e("../util/shape/Cross"),a=e("zrender/shape/Line"),o=e("zrender/shape/Rectangle"),r=new o({}),s=e("../config");s.tooltip={zlevel:1,z:8,show:!0,showContent:!0,trigger:"item",islandFormatter:"{a} <br/>{b} : {c}",showDelay:20,hideDelay:100,transitionDuration:.4,enterable:!1,backgroundColor:"rgba(0,0,0,0.7)",borderColor:"#333",borderRadius:4,borderWidth:0,padding:5,axisPointer:{type:"line",lineStyle:{color:"#48b",width:2,type:"solid"},crossStyle:{color:"#1e90ff",width:1,type:"dashed"},shadowStyle:{color:"rgba(150,150,150,0.3)",width:"auto",type:"default"}},textStyle:{color:"#fff"}};var l=e("../util/ecData"),h=e("zrender/config"),d=e("zrender/tool/event"),c=e("zrender/tool/area"),m=e("zrender/tool/color"),p=e("zrender/tool/util"),u=e("zrender/shape/Base");return t.prototype={type:s.COMPONENT_TYPE_TOOLTIP,_gCssText:"position:absolute;display:block;border-style:solid;white-space:nowrap;",_style:function(e){if(!e)return"";var t=[];if(e.transitionDuration){var i="left "+e.transitionDuration+"s,top "+e.transitionDuration+"s";t.push("transition:"+i),t.push("-moz-transition:"+i),t.push("-webkit-transition:"+i),t.push("-o-transition:"+i)}e.backgroundColor&&(t.push("background-Color:"+m.toHex(e.backgroundColor)),t.push("filter:alpha(opacity=70)"),t.push("background-Color:"+e.backgroundColor)),null!=e.borderWidth&&t.push("border-width:"+e.borderWidth+"px"),null!=e.borderColor&&t.push("border-color:"+e.borderColor),null!=e.borderRadius&&(t.push("border-radius:"+e.borderRadius+"px"),t.push("-moz-border-radius:"+e.borderRadius+"px"),t.push("-webkit-border-radius:"+e.borderRadius+"px"),t.push("-o-border-radius:"+e.borderRadius+"px"));var n=e.textStyle;n&&(n.color&&t.push("color:"+n.color),n.decoration&&t.push("text-decoration:"+n.decoration),n.align&&t.push("text-align:"+n.align),n.fontFamily&&t.push("font-family:"+n.fontFamily),n.fontSize&&t.push("font-size:"+n.fontSize+"px"),n.fontSize&&t.push("line-height:"+Math.round(3*n.fontSize/2)+"px"),n.fontStyle&&t.push("font-style:"+n.fontStyle),n.fontWeight&&t.push("font-weight:"+n.fontWeight));var a=e.padding;return null!=a&&(a=this.reformCssArray(a),t.push("padding:"+a[0]+"px "+a[1]+"px "+a[2]+"px "+a[3]+"px")),t=t.join(";")+";"},__hide:function(){this._lastDataIndex=-1,this._lastSeriesIndex=-1,this._lastItemTriggerId=-1,this._tDom&&(this._tDom.style.display="none");var e=!1;this._axisLineShape.invisible||(this._axisLineShape.invisible=!0,this.zr.modShape(this._axisLineShape.id),e=!0),this._axisShadowShape.invisible||(this._axisShadowShape.invisible=!0,this.zr.modShape(this._axisShadowShape.id),e=!0),this._axisCrossShape.invisible||(this._axisCrossShape.invisible=!0,this.zr.modShape(this._axisCrossShape.id),e=!0),this._lastTipShape&&this._lastTipShape.tipShape.length>0&&(this.zr.delShape(this._lastTipShape.tipShape),this._lastTipShape=!1,this.shapeList.length=2),e&&this.zr.refreshNextFrame(),this.showing=!1},_show:function(e,t,i,n){var a=this._tDom.offsetHeight,o=this._tDom.offsetWidth;e&&("function"==typeof e&&(e=e([t,i])),e instanceof Array&&(t=e[0],i=e[1])),t+o>this._zrWidth&&(t-=o+40),i+a>this._zrHeight&&(i-=a-20),20>i&&(i=0),this._tDom.style.cssText=this._gCssText+this._defaultCssText+(n?n:"")+"left:"+t+"px;top:"+i+"px;",(10>a||10>o)&&setTimeout(this._refixed,20),this.showing=!0},__refixed:function(){if(this._tDom){var e="",t=this._tDom.offsetHeight,i=this._tDom.offsetWidth;this._tDom.offsetLeft+i>this._zrWidth&&(e+="left:"+(this._zrWidth-i-20)+"px;"),this._tDom.offsetTop+t>this._zrHeight&&(e+="top:"+(this._zrHeight-t-10)+"px;"),""!==e&&(this._tDom.style.cssText+=e)}},__tryShow:function(){var e,t;if(this._curTarget){if("island"===this._curTarget._type&&this.option.tooltip.show)return void this._showItemTrigger();var i=l.get(this._curTarget,"series"),n=l.get(this._curTarget,"data");e=this.deepQuery([n,i,this.option],"tooltip.show"),null!=i&&null!=n&&e?(t=this.deepQuery([n,i,this.option],"tooltip.trigger"),"axis"===t?this._showAxisTrigger(i.xAxisIndex,i.yAxisIndex,l.get(this._curTarget,"dataIndex")):this._showItemTrigger()):(clearTimeout(this._hidingTicket),clearTimeout(this._showingTicket),this._hidingTicket=setTimeout(this._hide,this._hideDelay))}else this._findPolarTrigger()||this._findAxisTrigger()},_findAxisTrigger:function(){if(!this.component.xAxis||!this.component.yAxis)return void(this._hidingTicket=setTimeout(this._hide,this._hideDelay));for(var e,t,i=this.option.series,n=0,a=i.length;a>n;n++)if("axis"===this.deepQuery([i[n],this.option],"tooltip.trigger"))return e=i[n].xAxisIndex||0,t=i[n].yAxisIndex||0,this.component.xAxis.getAxis(e)&&this.component.xAxis.getAxis(e).type===s.COMPONENT_TYPE_AXIS_CATEGORY?void this._showAxisTrigger(e,t,this._getNearestDataIndex("x",this.component.xAxis.getAxis(e))):this.component.yAxis.getAxis(t)&&this.component.yAxis.getAxis(t).type===s.COMPONENT_TYPE_AXIS_CATEGORY?void this._showAxisTrigger(e,t,this._getNearestDataIndex("y",this.component.yAxis.getAxis(t))):void this._showAxisTrigger(e,t,-1);"cross"===this.option.tooltip.axisPointer.type&&this._showAxisTrigger(-1,-1,-1)},_findPolarTrigger:function(){if(!this.component.polar)return!1;var e,t=d.getX(this._event),i=d.getY(this._event),n=this.component.polar.getNearestIndex([t,i]);return n?(e=n.valueIndex,n=n.polarIndex):n=-1,-1!=n?this._showPolarTrigger(n,e):!1},_getNearestDataIndex:function(e,t){var i=-1,n=d.getX(this._event),a=d.getY(this._event);if("x"===e){for(var o,r,s=this.component.grid.getXend(),l=t.getCoordByIndex(i);s>l&&(r=l,n>=l);)o=l,l=t.getCoordByIndex(++i);return 0>=i?i=0:r-n>=n-o?i-=1:null==t.getNameByIndex(i)&&(i-=1),i}for(var h,c,m=this.component.grid.getY(),l=t.getCoordByIndex(i);l>m&&(h=l,l>=a);)c=l,l=t.getCoordByIndex(++i);return 0>=i?i=0:a-h>=c-a?i-=1:null==t.getNameByIndex(i)&&(i-=1),i},_showAxisTrigger:function(e,t,i){if(!this._event.connectTrigger&&this.messageCenter.dispatch(s.EVENT.TOOLTIP_IN_GRID,this._event,null,this.myChart),null==this.component.xAxis||null==this.component.yAxis||null==e||null==t)return clearTimeout(this._hidingTicket),clearTimeout(this._showingTicket),void(this._hidingTicket=setTimeout(this._hide,this._hideDelay));var n,a,o,r,l=this.option.series,h=[],c=[],m="";if("axis"===this.option.tooltip.trigger){if(!this.option.tooltip.show)return;a=this.option.tooltip.formatter,o=this.option.tooltip.position}var p,u,V=-1!=e&&this.component.xAxis.getAxis(e).type===s.COMPONENT_TYPE_AXIS_CATEGORY?"xAxis":-1!=t&&this.component.yAxis.getAxis(t).type===s.COMPONENT_TYPE_AXIS_CATEGORY?"yAxis":!1;if(V){var U="xAxis"==V?e:t;n=this.component[V].getAxis(U);for(var g=0,f=l.length;f>g;g++)this._isSelected(l[g].name)&&l[g][V+"Index"]===U&&"axis"===this.deepQuery([l[g],this.option],"tooltip.trigger")&&(r=this.query(l[g],"tooltip.showContent")||r,a=this.query(l[g],"tooltip.formatter")||a,o=this.query(l[g],"tooltip.position")||o,m+=this._style(this.query(l[g],"tooltip")),null!=l[g].stack&&"xAxis"==V?(h.unshift(l[g]),c.unshift(g)):(h.push(l[g]),c.push(g)));this.messageCenter.dispatch(s.EVENT.TOOLTIP_HOVER,this._event,{seriesIndex:c,dataIndex:i},this.myChart);var y;"xAxis"==V?(p=this.subPixelOptimize(n.getCoordByIndex(i),this._axisLineWidth),u=d.getY(this._event),y=[p,this.component.grid.getY(),p,this.component.grid.getYend()]):(p=d.getX(this._event),u=this.subPixelOptimize(n.getCoordByIndex(i),this._axisLineWidth),y=[this.component.grid.getX(),u,this.component.grid.getXend(),u]),this._styleAxisPointer(h,y[0],y[1],y[2],y[3],n.getGap(),p,u)}else p=d.getX(this._event),u=d.getY(this._event),this._styleAxisPointer(l,this.component.grid.getX(),u,this.component.grid.getXend(),u,0,p,u),i>=0?this._showItemTrigger(!0):(clearTimeout(this._hidingTicket),clearTimeout(this._showingTicket),this._tDom.style.display="none");if(h.length>0){if(this._lastItemTriggerId=-1,this._lastDataIndex!=i||this._lastSeriesIndex!=c[0]){this._lastDataIndex=i,this._lastSeriesIndex=c[0];var b,_;if("function"==typeof a){for(var x=[],g=0,f=h.length;f>g;g++)b=h[g].data[i],_=this.getDataFromOption(b,"-"),x.push({seriesIndex:c[g],seriesName:h[g].name||"",series:h[g],dataIndex:i,data:b,name:n.getNameByIndex(i),value:_,0:h[g].name||"",1:n.getNameByIndex(i),2:_,3:b});this._curTicket="axis:"+i,this._tDom.innerHTML=a.call(this.myChart,x,this._curTicket,this._setContent)}else if("string"==typeof a){this._curTicket=0/0,a=a.replace("{a}","{a0}").replace("{b}","{b0}").replace("{c}","{c0}");for(var g=0,f=h.length;f>g;g++)a=a.replace("{a"+g+"}",this._encodeHTML(h[g].name||"")),a=a.replace("{b"+g+"}",this._encodeHTML(n.getNameByIndex(i))),b=h[g].data[i],b=this.getDataFromOption(b,"-"),a=a.replace("{c"+g+"}",b instanceof Array?b:this.numAddCommas(b));this._tDom.innerHTML=a}else{this._curTicket=0/0,a=this._encodeHTML(n.getNameByIndex(i));for(var g=0,f=h.length;f>g;g++)a+="<br/>"+this._encodeHTML(h[g].name||"")+" : ",b=h[g].data[i],b=this.getDataFromOption(b,"-"),a+=b instanceof Array?b:this.numAddCommas(b);this._tDom.innerHTML=a}}if(r===!1||!this.option.tooltip.showContent)return;this.hasAppend||(this._tDom.style.left=this._zrWidth/2+"px",this._tDom.style.top=this._zrHeight/2+"px",this.dom.firstChild.appendChild(this._tDom),this.hasAppend=!0),this._show(o,p+10,u+10,m)}},_showPolarTrigger:function(e,t){if(null==this.component.polar||null==e||null==t||0>t)return!1;var i,n,a,o=this.option.series,r=[],s=[],l="";if("axis"===this.option.tooltip.trigger){if(!this.option.tooltip.show)return!1;i=this.option.tooltip.formatter,n=this.option.tooltip.position}for(var h=this.option.polar[e].indicator[t].text,c=0,m=o.length;m>c;c++)this._isSelected(o[c].name)&&o[c].polarIndex===e&&"axis"===this.deepQuery([o[c],this.option],"tooltip.trigger")&&(a=this.query(o[c],"tooltip.showContent")||a,i=this.query(o[c],"tooltip.formatter")||i,n=this.query(o[c],"tooltip.position")||n,l+=this._style(this.query(o[c],"tooltip")),r.push(o[c]),s.push(c));if(r.length>0){for(var p,u,V,U=[],c=0,m=r.length;m>c;c++){p=r[c].data;for(var g=0,f=p.length;f>g;g++)u=p[g],this._isSelected(u.name)&&(u=null!=u?u:{name:"",value:{dataIndex:"-"}},V=this.getDataFromOption(u.value[t]),U.push({seriesIndex:s[c],seriesName:r[c].name||"",series:r[c],dataIndex:t,data:u,name:u.name,indicator:h,value:V,0:r[c].name||"",1:u.name,2:V,3:h}))}if(U.length<=0)return;if(this._lastItemTriggerId=-1,this._lastDataIndex!=t||this._lastSeriesIndex!=s[0])if(this._lastDataIndex=t,this._lastSeriesIndex=s[0],"function"==typeof i)this._curTicket="axis:"+t,this._tDom.innerHTML=i.call(this.myChart,U,this._curTicket,this._setContent);else if("string"==typeof i){i=i.replace("{a}","{a0}").replace("{b}","{b0}").replace("{c}","{c0}").replace("{d}","{d0}");for(var c=0,m=U.length;m>c;c++)i=i.replace("{a"+c+"}",this._encodeHTML(U[c].seriesName)),i=i.replace("{b"+c+"}",this._encodeHTML(U[c].name)),i=i.replace("{c"+c+"}",this.numAddCommas(U[c].value)),i=i.replace("{d"+c+"}",this._encodeHTML(U[c].indicator));this._tDom.innerHTML=i}else{i=this._encodeHTML(U[0].name)+"<br/>"+this._encodeHTML(U[0].indicator)+" : "+this.numAddCommas(U[0].value);for(var c=1,m=U.length;m>c;c++)i+="<br/>"+this._encodeHTML(U[c].name)+"<br/>",i+=this._encodeHTML(U[c].indicator)+" : "+this.numAddCommas(U[c].value);this._tDom.innerHTML=i}if(a===!1||!this.option.tooltip.showContent)return;return this.hasAppend||(this._tDom.style.left=this._zrWidth/2+"px",this._tDom.style.top=this._zrHeight/2+"px",this.dom.firstChild.appendChild(this._tDom),this.hasAppend=!0),this._show(n,d.getX(this._event),d.getY(this._event),l),!0}},_showItemTrigger:function(e){if(this._curTarget){var t,i,n,a=l.get(this._curTarget,"series"),o=l.get(this._curTarget,"seriesIndex"),r=l.get(this._curTarget,"data"),h=l.get(this._curTarget,"dataIndex"),c=l.get(this._curTarget,"name"),m=l.get(this._curTarget,"value"),p=l.get(this._curTarget,"special"),u=l.get(this._curTarget,"special2"),V=[r,a,this.option],U="";if("island"!=this._curTarget._type){var g=e?"axis":"item";this.option.tooltip.trigger===g&&(t=this.option.tooltip.formatter,i=this.option.tooltip.position),this.query(a,"tooltip.trigger")===g&&(n=this.query(a,"tooltip.showContent")||n,t=this.query(a,"tooltip.formatter")||t,i=this.query(a,"tooltip.position")||i,U+=this._style(this.query(a,"tooltip"))),n=this.query(r,"tooltip.showContent")||n,t=this.query(r,"tooltip.formatter")||t,i=this.query(r,"tooltip.position")||i,U+=this._style(this.query(r,"tooltip"))}else this._lastItemTriggerId=0/0,n=this.deepQuery(V,"tooltip.showContent"),t=this.deepQuery(V,"tooltip.islandFormatter"),i=this.deepQuery(V,"tooltip.islandPosition");this._lastDataIndex=-1,this._lastSeriesIndex=-1,this._lastItemTriggerId!==this._curTarget.id&&(this._lastItemTriggerId=this._curTarget.id,"function"==typeof t?(this._curTicket=(a.name||"")+":"+h,this._tDom.innerHTML=t.call(this.myChart,{seriesIndex:o,seriesName:a.name||"",series:a,dataIndex:h,data:r,name:c,value:m,percent:p,indicator:p,value2:u,indicator2:u,0:a.name||"",1:c,2:m,3:p,4:u,5:r,6:o,7:h},this._curTicket,this._setContent)):"string"==typeof t?(this._curTicket=0/0,t=t.replace("{a}","{a0}").replace("{b}","{b0}").replace("{c}","{c0}"),t=t.replace("{a0}",this._encodeHTML(a.name||"")).replace("{b0}",this._encodeHTML(c)).replace("{c0}",m instanceof Array?m:this.numAddCommas(m)),t=t.replace("{d}","{d0}").replace("{d0}",p||""),t=t.replace("{e}","{e0}").replace("{e0}",l.get(this._curTarget,"special2")||""),this._tDom.innerHTML=t):(this._curTicket=0/0,this._tDom.innerHTML=a.type===s.CHART_TYPE_RADAR&&p?this._itemFormatter.radar.call(this,a,c,m,p):a.type===s.CHART_TYPE_EVENTRIVER?this._itemFormatter.eventRiver.call(this,a,c,m,r):""+(null!=a.name?this._encodeHTML(a.name)+"<br/>":"")+(""===c?"":this._encodeHTML(c)+" : ")+(m instanceof Array?m:this.numAddCommas(m))));var f=d.getX(this._event),y=d.getY(this._event);this.deepQuery(V,"tooltip.axisPointer.show")&&this.component.grid?this._styleAxisPointer([a],this.component.grid.getX(),y,this.component.grid.getXend(),y,0,f,y):this._hide(),n!==!1&&this.option.tooltip.showContent&&(this.hasAppend||(this._tDom.style.left=this._zrWidth/2+"px",this._tDom.style.top=this._zrHeight/2+"px",this.dom.firstChild.appendChild(this._tDom),this.hasAppend=!0),this._show(i,f+20,y-20,U))}},_itemFormatter:{radar:function(e,t,i,n){var a="";a+=this._encodeHTML(""===t?e.name||"":t),a+=""===a?"":"<br />";for(var o=0;o<n.length;o++)a+=this._encodeHTML(n[o].text)+" : "+this.numAddCommas(i[o])+"<br />";return a},chord:function(e,t,i,n,a){if(null==a)return this._encodeHTML(t)+" ("+this.numAddCommas(i)+")";var o=this._encodeHTML(t),r=this._encodeHTML(n);return""+(null!=e.name?this._encodeHTML(e.name)+"<br/>":"")+o+" -> "+r+" ("+this.numAddCommas(i)+")<br />"+r+" -> "+o+" ("+this.numAddCommas(a)+")"},eventRiver:function(e,t,i,n){var a="";a+=this._encodeHTML(""===e.name?"":e.name+" : "),a+=this._encodeHTML(t),a+=""===a?"":"<br />",n=n.evolution;for(var o=0,r=n.length;r>o;o++)a+='<div style="padding-top:5px;">',n[o].detail&&(n[o].detail.img&&(a+='<img src="'+n[o].detail.img+'" style="float:left;width:40px;height:40px;">'),a+='<div style="margin-left:45px;">'+n[o].time+"<br/>",a+='<a href="'+n[o].detail.link+'" target="_blank">',a+=n[o].detail.text+"</a></div>",a+="</div>");return a}},_styleAxisPointer:function(e,t,i,n,a,o,r,s){if(e.length>0){var l,h,d=this.option.tooltip.axisPointer,c=d.type,m={line:{},cross:{},shadow:{}};for(var p in m)m[p].color=d[p+"Style"].color,m[p].width=d[p+"Style"].width,m[p].type=d[p+"Style"].type;for(var u=0,V=e.length;V>u;u++)l=e[u],h=this.query(l,"tooltip.axisPointer.type"),c=h||c,h&&(m[h].color=this.query(l,"tooltip.axisPointer."+h+"Style.color")||m[h].color,m[h].width=this.query(l,"tooltip.axisPointer."+h+"Style.width")||m[h].width,m[h].type=this.query(l,"tooltip.axisPointer."+h+"Style.type")||m[h].type);if("line"===c){var U=m.line.width,g=t==n;this._axisLineShape.style={xStart:g?this.subPixelOptimize(t,U):t,yStart:g?i:this.subPixelOptimize(i,U),xEnd:g?this.subPixelOptimize(n,U):n,yEnd:g?a:this.subPixelOptimize(a,U),strokeColor:m.line.color,lineWidth:U,lineType:m.line.type},this._axisLineShape.invisible=!1,this.zr.modShape(this._axisLineShape.id)}else if("cross"===c){var f=m.cross.width;this._axisCrossShape.style={brushType:"stroke",rect:this.component.grid.getArea(),x:this.subPixelOptimize(r,f),y:this.subPixelOptimize(s,f),text:("( "+this.component.xAxis.getAxis(0).getValueFromCoord(r)+" , "+this.component.yAxis.getAxis(0).getValueFromCoord(s)+" )").replace("  , "," ").replace(" ,  "," "),textPosition:"specific",strokeColor:m.cross.color,lineWidth:f,lineType:m.cross.type},this.component.grid.getXend()-r>100?(this._axisCrossShape.style.textAlign="left",this._axisCrossShape.style.textX=r+10):(this._axisCrossShape.style.textAlign="right",this._axisCrossShape.style.textX=r-10),s-this.component.grid.getY()>50?(this._axisCrossShape.style.textBaseline="bottom",this._axisCrossShape.style.textY=s-10):(this._axisCrossShape.style.textBaseline="top",this._axisCrossShape.style.textY=s+10),this._axisCrossShape.invisible=!1,this.zr.modShape(this._axisCrossShape.id)}else"shadow"===c&&((null==m.shadow.width||"auto"===m.shadow.width||isNaN(m.shadow.width))&&(m.shadow.width=o),t===n?Math.abs(this.component.grid.getX()-t)<2?(m.shadow.width/=2,t=n+=m.shadow.width/2):Math.abs(this.component.grid.getXend()-t)<2&&(m.shadow.width/=2,t=n-=m.shadow.width/2):i===a&&(Math.abs(this.component.grid.getY()-i)<2?(m.shadow.width/=2,i=a+=m.shadow.width/2):Math.abs(this.component.grid.getYend()-i)<2&&(m.shadow.width/=2,i=a-=m.shadow.width/2)),this._axisShadowShape.style={xStart:t,yStart:i,xEnd:n,yEnd:a,strokeColor:m.shadow.color,lineWidth:m.shadow.width},this._axisShadowShape.invisible=!1,this.zr.modShape(this._axisShadowShape.id));this.zr.refreshNextFrame()}},__onmousemove:function(e){if(clearTimeout(this._hidingTicket),clearTimeout(this._showingTicket),!this._mousein||!this._enterable){var t=e.target,i=d.getX(e.event),n=d.getY(e.event);if(t){this._curTarget=t,this._event=e.event,this._event.zrenderX=i,this._event.zrenderY=n;var a;if(this._needAxisTrigger&&this.component.polar&&-1!=(a=this.component.polar.isInside([i,n])))for(var o=this.option.series,l=0,h=o.length;h>l;l++)if(o[l].polarIndex===a&&"axis"===this.deepQuery([o[l],this.option],"tooltip.trigger")){this._curTarget=null;break}this._showingTicket=setTimeout(this._tryShow,this._showDelay)}else this._curTarget=!1,this._event=e.event,this._event.zrenderX=i,this._event.zrenderY=n,this._needAxisTrigger&&this.component.grid&&c.isInside(r,this.component.grid.getArea(),i,n)?this._showingTicket=setTimeout(this._tryShow,this._showDelay):this._needAxisTrigger&&this.component.polar&&-1!=this.component.polar.isInside([i,n])?this._showingTicket=setTimeout(this._tryShow,this._showDelay):(!this._event.connectTrigger&&this.messageCenter.dispatch(s.EVENT.TOOLTIP_OUT_GRID,this._event,null,this.myChart),this._hidingTicket=setTimeout(this._hide,this._hideDelay))}},__onglobalout:function(){clearTimeout(this._hidingTicket),clearTimeout(this._showingTicket),this._hidingTicket=setTimeout(this._hide,this._hideDelay)},__setContent:function(e,t){this._tDom&&(e===this._curTicket&&(this._tDom.innerHTML=t),setTimeout(this._refixed,20))},ontooltipHover:function(e,t){if(!this._lastTipShape||this._lastTipShape&&this._lastTipShape.dataIndex!=e.dataIndex){this._lastTipShape&&this._lastTipShape.tipShape.length>0&&(this.zr.delShape(this._lastTipShape.tipShape),this.shapeList.length=2);for(var i=0,n=t.length;n>i;i++)t[i].zlevel=this.getZlevelBase(),t[i].z=this.getZBase(),t[i].style=u.prototype.getHighlightStyle(t[i].style,t[i].highlightStyle),t[i].draggable=!1,t[i].hoverable=!1,t[i].clickable=!1,t[i].ondragend=null,t[i].ondragover=null,t[i].ondrop=null,this.shapeList.push(t[i]),this.zr.addShape(t[i]);this._lastTipShape={dataIndex:e.dataIndex,tipShape:t}}},ondragend:function(){this._hide()},onlegendSelected:function(e){this._selectedMap=e.selected},_setSelectedMap:function(){this._selectedMap=this.component.legend?p.clone(this.component.legend.getSelectedMap()):{}},_isSelected:function(e){return null!=this._selectedMap[e]?this._selectedMap[e]:!0},showTip:function(e){if(e){var t,i=this.option.series;if(null!=e.seriesIndex)t=e.seriesIndex;else for(var n=e.seriesName,a=0,o=i.length;o>a;a++)if(i[a].name===n){t=a;break}var r=i[t];if(null!=r){var d=this.myChart.chart[r.type],c="axis"===this.deepQuery([r,this.option],"tooltip.trigger");if(d)if(c){var m=e.dataIndex;switch(d.type){case s.CHART_TYPE_LINE:case s.CHART_TYPE_BAR:case s.CHART_TYPE_K:case s.CHART_TYPE_RADAR:if(null==this.component.polar||r.data[0].value.length<=m)return;var p=r.polarIndex||0,u=this.component.polar.getVector(p,m,"max");this._event={zrenderX:u[0],zrenderY:u[1]},this._showPolarTrigger(p,m)}}else{var V,U,g=d.shapeList;switch(d.type){case s.CHART_TYPE_LINE:case s.CHART_TYPE_BAR:case s.CHART_TYPE_K:case s.CHART_TYPE_TREEMAP:case s.CHART_TYPE_SCATTER:for(var m=e.dataIndex,a=0,o=g.length;o>a;a++)if(null==g[a]._mark&&l.get(g[a],"seriesIndex")==t&&l.get(g[a],"dataIndex")==m){this._curTarget=g[a],V=g[a].style.x,U=d.type!=s.CHART_TYPE_K?g[a].style.y:g[a].style.y[0];break}break;case s.CHART_TYPE_RADAR:for(var m=e.dataIndex,a=0,o=g.length;o>a;a++)if("polygon"===g[a].type&&l.get(g[a],"seriesIndex")==t&&l.get(g[a],"dataIndex")==m){this._curTarget=g[a];var u=this.component.polar.getCenter(r.polarIndex||0);V=u[0],U=u[1];break}break;case s.CHART_TYPE_PIE:for(var f=e.name,a=0,o=g.length;o>a;a++)if("sector"===g[a].type&&l.get(g[a],"seriesIndex")==t&&l.get(g[a],"name")==f){this._curTarget=g[a];var y=this._curTarget.style,b=(y.startAngle+y.endAngle)/2*Math.PI/180;V=this._curTarget.style.x+Math.cos(b)*y.r/1.5,U=this._curTarget.style.y-Math.sin(b)*y.r/1.5;break}break;case s.CHART_TYPE_MAP:for(var f=e.name,_=r.mapType,a=0,o=g.length;o>a;a++)if("text"===g[a].type&&g[a]._mapType===_&&g[a].style._name===f){this._curTarget=g[a],V=this._curTarget.style.x+this._curTarget.position[0],U=this._curTarget.style.y+this._curTarget.position[1];break}break;case s.CHART_TYPE_CHORD:for(var f=e.name,a=0,o=g.length;o>a;a++)if("sector"===g[a].type&&l.get(g[a],"name")==f){this._curTarget=g[a];var y=this._curTarget.style,b=(y.startAngle+y.endAngle)/2*Math.PI/180;return V=this._curTarget.style.x+Math.cos(b)*(y.r-2),U=this._curTarget.style.y-Math.sin(b)*(y.r-2),void this.zr.trigger(h.EVENT.MOUSEMOVE,{zrenderX:V,zrenderY:U})}break;case s.CHART_TYPE_FORCE:for(var f=e.name,a=0,o=g.length;o>a;a++)if("circle"===g[a].type&&l.get(g[a],"name")==f){this._curTarget=g[a],V=this._curTarget.position[0],U=this._curTarget.position[1];break}}null!=V&&null!=U&&(this._event={zrenderX:V,zrenderY:U},this.zr.addHoverShape(this._curTarget),this.zr.refreshHover(),this._showItemTrigger())}}}},hideTip:function(){this._hide()},refresh:function(e){if(this._zrHeight=this.zr.getHeight(),this._zrWidth=this.zr.getWidth(),this._lastTipShape&&this._lastTipShape.tipShape.length>0&&this.zr.delShape(this._lastTipShape.tipShape),this._lastTipShape=!1,this.shapeList.length=2,this._lastDataIndex=-1,this._lastSeriesIndex=-1,this._lastItemTriggerId=-1,e){this.option=e,this.option.tooltip=this.reformOption(this.option.tooltip),this.option.tooltip.textStyle=p.merge(this.option.tooltip.textStyle,this.ecTheme.textStyle),this._needAxisTrigger=!1,"axis"===this.option.tooltip.trigger&&(this._needAxisTrigger=!0);for(var t=this.option.series,i=0,n=t.length;n>i;i++)if("axis"===this.query(t[i],"tooltip.trigger")){this._needAxisTrigger=!0;break}this._showDelay=this.option.tooltip.showDelay,this._hideDelay=this.option.tooltip.hideDelay,this._defaultCssText=this._style(this.option.tooltip),this._setSelectedMap(),this._axisLineWidth=this.option.tooltip.axisPointer.lineStyle.width,this._enterable=this.option.tooltip.enterable,!this._enterable&&this._tDom.className.indexOf(h.elementClassName)<0&&(this._tDom.className+=" "+h.elementClassName)}if(this.showing){var a=this;setTimeout(function(){a.zr.trigger(h.EVENT.MOUSEMOVE,a.zr.handler._event)},50)}},onbeforDispose:function(){this._lastTipShape&&this._lastTipShape.tipShape.length>0&&this.zr.delShape(this._lastTipShape.tipShape),clearTimeout(this._hidingTicket),clearTimeout(this._showingTicket),this.zr.un(h.EVENT.MOUSEMOVE,this._onmousemove),this.zr.un(h.EVENT.GLOBALOUT,this._onglobalout),this.hasAppend&&this.dom.firstChild&&this.dom.firstChild.removeChild(this._tDom),this._tDom=null},_encodeHTML:function(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}},p.inherits(t,i),e("../component").define("tooltip",t),t}),define("echarts/component/legend",["require","./base","zrender/shape/Text","zrender/shape/Rectangle","zrender/shape/Sector","../util/shape/Icon","../util/shape/Candle","../config","zrender/tool/util","zrender/tool/area","../component"],function(e){function t(e,t,n,a,o){if(!this.query(a,"legend.data"))return void console.error("option.legend.data has not been defined.");i.call(this,e,t,n,a,o);var r=this;r._legendSelected=function(e){r.__legendSelected(e)},r._dispatchHoverLink=function(e){return r.__dispatchHoverLink(e)},this._colorIndex=0,this._colorMap={},this._selectedMap={},this._hasDataMap={},this.refresh(a)}var i=e("./base"),n=e("zrender/shape/Text"),a=e("zrender/shape/Rectangle"),o=e("zrender/shape/Sector"),r=e("../util/shape/Icon"),s=e("../util/shape/Candle"),l=e("../config");l.legend={zlevel:0,z:4,show:!0,orient:"horizontal",x:"center",y:"top",backgroundColor:"rgba(0,0,0,0)",borderColor:"#ccc",borderWidth:0,padding:5,itemGap:10,itemWidth:20,itemHeight:14,textStyle:{color:"#333"},selectedMode:!0};var h=e("zrender/tool/util"),d=e("zrender/tool/area");t.prototype={type:l.COMPONENT_TYPE_LEGEND,_buildShape:function(){if(this.legendOption.show){this._itemGroupLocation=this._getItemGroupLocation(),this._buildBackground(),this._buildItem();for(var e=0,t=this.shapeList.length;t>e;e++)this.zr.addShape(this.shapeList[e])}},_buildItem:function(){var e,t,i,a,o,s,l,c,m=this.legendOption.data,p=m.length,u=this.legendOption.textStyle,V=this.zr.getWidth(),U=this.zr.getHeight(),g=this._itemGroupLocation.x,f=this._itemGroupLocation.y,y=this.legendOption.itemWidth,b=this.legendOption.itemHeight,_=this.legendOption.itemGap;"vertical"===this.legendOption.orient&&"right"===this.legendOption.x&&(g=this._itemGroupLocation.x+this._itemGroupLocation.width-y);for(var x=0;p>x;x++)o=h.merge(m[x].textStyle||{},u),s=this.getFont(o),e=this._getName(m[x]),l=this._getFormatterName(e),""!==e?(t=m[x].icon||this._getSomethingByName(e).type,c=this.getColor(e),"horizontal"===this.legendOption.orient?200>V-g&&y+5+d.getTextWidth(l,s)+(x===p-1||""===m[x+1]?0:_)>=V-g&&(g=this._itemGroupLocation.x,f+=b+_):200>U-f&&b+(x===p-1||""===m[x+1]?0:_)>=U-f&&("right"===this.legendOption.x?g-=this._itemGroupLocation.maxWidth+_:g+=this._itemGroupLocation.maxWidth+_,f=this._itemGroupLocation.y),i=this._getItemShapeByType(g,f,y,b,this._selectedMap[e]&&this._hasDataMap[e]?c:"#ccc",t,c),i._name=e,i=new r(i),a={zlevel:this.getZlevelBase(),z:this.getZBase(),style:{x:g+y+5,y:f+b/2,color:this._selectedMap[e]?"auto"===o.color?c:o.color:"#ccc",text:l,textFont:s,textBaseline:"middle"},highlightStyle:{color:c,brushType:"fill"},hoverable:!!this.legendOption.selectedMode,clickable:!!this.legendOption.selectedMode},"vertical"===this.legendOption.orient&&"right"===this.legendOption.x&&(a.style.x-=y+10,a.style.textAlign="right"),a._name=e,a=new n(a),this.legendOption.selectedMode&&(i.onclick=a.onclick=this._legendSelected,i.onmouseover=a.onmouseover=this._dispatchHoverLink,i.hoverConnect=a.id,a.hoverConnect=i.id),this.shapeList.push(i),this.shapeList.push(a),"horizontal"===this.legendOption.orient?g+=y+5+d.getTextWidth(l,s)+_:f+=b+_):"horizontal"===this.legendOption.orient?(g=this._itemGroupLocation.x,
f+=b+_):("right"===this.legendOption.x?g-=this._itemGroupLocation.maxWidth+_:g+=this._itemGroupLocation.maxWidth+_,f=this._itemGroupLocation.y);"horizontal"===this.legendOption.orient&&"center"===this.legendOption.x&&f!=this._itemGroupLocation.y&&this._mLineOptimize()},_getName:function(e){return"undefined"!=typeof e.name?e.name:e},_getFormatterName:function(e){var t,i=this.legendOption.formatter;return t="function"==typeof i?i.call(this.myChart,e):"string"==typeof i?i.replace("{name}",e):e},_getFormatterNameFromData:function(e){var t=this._getName(e);return this._getFormatterName(t)},_mLineOptimize:function(){for(var e=[],t=this._itemGroupLocation.x,i=2,n=this.shapeList.length;n>i;i++)this.shapeList[i].style.x===t?e.push((this._itemGroupLocation.width-(this.shapeList[i-1].style.x+d.getTextWidth(this.shapeList[i-1].style.text,this.shapeList[i-1].style.textFont)-t))/2):i===n-1&&e.push((this._itemGroupLocation.width-(this.shapeList[i].style.x+d.getTextWidth(this.shapeList[i].style.text,this.shapeList[i].style.textFont)-t))/2);for(var a=-1,i=1,n=this.shapeList.length;n>i;i++)this.shapeList[i].style.x===t&&a++,0!==e[a]&&(this.shapeList[i].style.x+=e[a])},_buildBackground:function(){var e=this.reformCssArray(this.legendOption.padding);this.shapeList.push(new a({zlevel:this.getZlevelBase(),z:this.getZBase(),hoverable:!1,style:{x:this._itemGroupLocation.x-e[3],y:this._itemGroupLocation.y-e[0],width:this._itemGroupLocation.width+e[3]+e[1],height:this._itemGroupLocation.height+e[0]+e[2],brushType:0===this.legendOption.borderWidth?"fill":"both",color:this.legendOption.backgroundColor,strokeColor:this.legendOption.borderColor,lineWidth:this.legendOption.borderWidth}}))},_getItemGroupLocation:function(){var e=this.legendOption.data,t=e.length,i=this.legendOption.itemGap,n=this.legendOption.itemWidth+5,a=this.legendOption.itemHeight,o=this.legendOption.textStyle,r=this.getFont(o),s=0,l=0,c=this.reformCssArray(this.legendOption.padding),m=this.zr.getWidth()-c[1]-c[3],p=this.zr.getHeight()-c[0]-c[2],u=0,V=0;if("horizontal"===this.legendOption.orient){l=a;for(var U=0;t>U;U++)if(""!==this._getName(e[U])){var g=d.getTextWidth(this._getFormatterNameFromData(e[U]),e[U].textStyle?this.getFont(h.merge(e[U].textStyle||{},o)):r);u+n+g+i>m?(u-=i,s=Math.max(s,u),l+=a+i,u=0):(u+=n+g+i,s=Math.max(s,u-i))}else u-=i,s=Math.max(s,u),l+=a+i,u=0}else{for(var U=0;t>U;U++)V=Math.max(V,d.getTextWidth(this._getFormatterNameFromData(e[U]),e[U].textStyle?this.getFont(h.merge(e[U].textStyle||{},o)):r));V+=n,s=V;for(var U=0;t>U;U++)""!==this._getName(e[U])?u+a+i>p?(s+=V+i,u-=i,l=Math.max(l,u),u=0):(u+=a+i,l=Math.max(l,u-i)):(s+=V+i,u-=i,l=Math.max(l,u),u=0)}m=this.zr.getWidth(),p=this.zr.getHeight();var f;switch(this.legendOption.x){case"center":f=Math.floor((m-s)/2);break;case"left":f=c[3]+this.legendOption.borderWidth;break;case"right":f=m-s-c[1]-c[3]-2*this.legendOption.borderWidth;break;default:f=this.parsePercent(this.legendOption.x,m)}var y;switch(this.legendOption.y){case"top":y=c[0]+this.legendOption.borderWidth;break;case"bottom":y=p-l-c[0]-c[2]-2*this.legendOption.borderWidth;break;case"center":y=Math.floor((p-l)/2);break;default:y=this.parsePercent(this.legendOption.y,p)}return{x:f,y:y,width:s,height:l,maxWidth:V}},_getSomethingByName:function(e){for(var t,i=this.option.series,n=0,a=i.length;a>n;n++){if(i[n].name===e)return{type:i[n].type,series:i[n],seriesIndex:n,data:null,dataIndex:-1};if(i[n].type===l.CHART_TYPE_PIE||i[n].type===l.CHART_TYPE_RADAR||i[n].type===l.CHART_TYPE_CHORD||i[n].type===l.CHART_TYPE_FORCE||i[n].type===l.CHART_TYPE_FUNNEL||i[n].type===l.CHART_TYPE_TREEMAP){t=i[n].categories||i[n].data||i[n].nodes;for(var o=0,r=t.length;r>o;o++)if(t[o].name===e)return{type:i[n].type,series:i[n],seriesIndex:n,data:t[o],dataIndex:o}}}return{type:"bar",series:null,seriesIndex:-1,data:null,dataIndex:-1}},_getItemShapeByType:function(e,t,i,n,a,o,r){var s,h="#ccc"===a?r:a,d={zlevel:this.getZlevelBase(),z:this.getZBase(),style:{iconType:"legendicon"+o,x:e,y:t,width:i,height:n,color:a,strokeColor:a,lineWidth:2},highlightStyle:{color:h,strokeColor:h,lineWidth:1},hoverable:this.legendOption.selectedMode,clickable:this.legendOption.selectedMode};if(o.match("image")){var s=o.replace(new RegExp("^image:\\/\\/"),"");o="image"}switch(o){case"line":d.style.brushType="stroke",d.highlightStyle.lineWidth=3;break;case"radar":case"venn":case"tree":case"treemap":case"scatter":d.highlightStyle.lineWidth=3;break;case"k":d.style.brushType="both",d.highlightStyle.lineWidth=3,d.highlightStyle.color=d.style.color=this.deepQuery([this.ecTheme,l],"k.itemStyle.normal.color")||"#fff",d.style.strokeColor="#ccc"!=a?this.deepQuery([this.ecTheme,l],"k.itemStyle.normal.lineStyle.color")||"#ff3200":a;break;case"image":d.style.iconType="image",d.style.image=s,"#ccc"===a&&(d.style.opacity=.5)}return d},__legendSelected:function(e){var t=e.target._name;if("single"===this.legendOption.selectedMode)for(var i in this._selectedMap)this._selectedMap[i]=!1;this._selectedMap[t]=!this._selectedMap[t],this.messageCenter.dispatch(l.EVENT.LEGEND_SELECTED,e.event,{selected:this._selectedMap,target:t},this.myChart)},__dispatchHoverLink:function(e){this.messageCenter.dispatch(l.EVENT.LEGEND_HOVERLINK,e.event,{target:e.target._name},this.myChart)},refresh:function(e){if(e){this.option=e||this.option,this.option.legend=this.reformOption(this.option.legend),this.legendOption=this.option.legend;var t,i,n,a,o=this.legendOption.data||[];if(this.legendOption.selected)for(var r in this.legendOption.selected)this._selectedMap[r]="undefined"!=typeof this._selectedMap[r]?this._selectedMap[r]:this.legendOption.selected[r];for(var s=0,h=o.length;h>s;s++)t=this._getName(o[s]),""!==t&&(i=this._getSomethingByName(t),i.series?(this._hasDataMap[t]=!0,a=!i.data||i.type!==l.CHART_TYPE_PIE&&i.type!==l.CHART_TYPE_FORCE&&i.type!==l.CHART_TYPE_FUNNEL?[i.series]:[i.data,i.series],n=this.getItemStyleColor(this.deepQuery(a,"itemStyle.normal.color"),i.seriesIndex,i.dataIndex,i.data),n&&i.type!=l.CHART_TYPE_K&&this.setColor(t,n),this._selectedMap[t]=null!=this._selectedMap[t]?this._selectedMap[t]:!0):this._hasDataMap[t]=!1)}this.clear(),this._buildShape()},getRelatedAmount:function(e){for(var t,i=0,n=this.option.series,a=0,o=n.length;o>a;a++)if(n[a].name===e&&i++,n[a].type===l.CHART_TYPE_PIE||n[a].type===l.CHART_TYPE_RADAR||n[a].type===l.CHART_TYPE_CHORD||n[a].type===l.CHART_TYPE_FORCE||n[a].type===l.CHART_TYPE_FUNNEL){t=n[a].type!=l.CHART_TYPE_FORCE?n[a].data:n[a].categories;for(var r=0,s=t.length;s>r;r++)t[r].name===e&&"-"!=t[r].value&&i++}return i},setColor:function(e,t){this._colorMap[e]=t},getColor:function(e){return this._colorMap[e]||(this._colorMap[e]=this.zr.getColor(this._colorIndex++)),this._colorMap[e]},hasColor:function(e){return this._colorMap[e]?this._colorMap[e]:!1},add:function(e,t){for(var i=this.legendOption.data,n=0,a=i.length;a>n;n++)if(this._getName(i[n])===e)return;this.legendOption.data.push(e),this.setColor(e,t),this._selectedMap[e]=!0,this._hasDataMap[e]=!0},del:function(e){for(var t=this.legendOption.data,i=0,n=t.length;n>i;i++)if(this._getName(t[i])===e)return this.legendOption.data.splice(i,1)},getItemShape:function(e){if(null!=e)for(var t,i=0,n=this.shapeList.length;n>i;i++)if(t=this.shapeList[i],t._name===e&&"text"!=t.type)return t},setItemShape:function(e,t){for(var i,n=0,a=this.shapeList.length;a>n;n++)i=this.shapeList[n],i._name===e&&"text"!=i.type&&(this._selectedMap[e]||(t.style.color="#ccc",t.style.strokeColor="#ccc"),this.zr.modShape(i.id,t))},isSelected:function(e){return"undefined"!=typeof this._selectedMap[e]?this._selectedMap[e]:!0},getSelectedMap:function(){return this._selectedMap},setSelected:function(e,t){if("single"===this.legendOption.selectedMode)for(var i in this._selectedMap)this._selectedMap[i]=!1;this._selectedMap[e]=t,this.messageCenter.dispatch(l.EVENT.LEGEND_SELECTED,null,{selected:this._selectedMap,target:e},this.myChart)},onlegendSelected:function(e,t){var i=e.selected;for(var n in i)this._selectedMap[n]!=i[n]&&(t.needRefresh=!0),this._selectedMap[n]=i[n]}};var c={line:function(e,t){var i=t.height/2;e.moveTo(t.x,t.y+i),e.lineTo(t.x+t.width,t.y+i)},pie:function(e,t){var i=t.x,n=t.y,a=t.width,r=t.height;o.prototype.buildPath(e,{x:i+a/2,y:n+r+2,r:r,r0:6,startAngle:45,endAngle:135})},eventRiver:function(e,t){var i=t.x,n=t.y,a=t.width,o=t.height;e.moveTo(i,n+o),e.bezierCurveTo(i+a,n+o,i,n+4,i+a,n+4),e.lineTo(i+a,n),e.bezierCurveTo(i,n,i+a,n+o-4,i,n+o-4),e.lineTo(i,n+o)},k:function(e,t){var i=t.x,n=t.y,a=t.width,o=t.height;s.prototype.buildPath(e,{x:i+a/2,y:[n+1,n+1,n+o-6,n+o],width:a-6})},bar:function(e,t){var i=t.x,n=t.y+1,a=t.width,o=t.height-2,r=3;e.moveTo(i+r,n),e.lineTo(i+a-r,n),e.quadraticCurveTo(i+a,n,i+a,n+r),e.lineTo(i+a,n+o-r),e.quadraticCurveTo(i+a,n+o,i+a-r,n+o),e.lineTo(i+r,n+o),e.quadraticCurveTo(i,n+o,i,n+o-r),e.lineTo(i,n+r),e.quadraticCurveTo(i,n,i+r,n)},force:function(e,t){r.prototype.iconLibrary.circle(e,t)},radar:function(e,t){var i=6,n=t.x+t.width/2,a=t.y+t.height/2,o=t.height/2,r=2*Math.PI/i,s=-Math.PI/2,l=n+o*Math.cos(s),h=a+o*Math.sin(s);e.moveTo(l,h),s+=r;for(var d=0,c=i-1;c>d;d++)e.lineTo(n+o*Math.cos(s),a+o*Math.sin(s)),s+=r;e.lineTo(l,h)}};c.chord=c.pie,c.map=c.bar;for(var m in c)r.prototype.iconLibrary["legendicon"+m]=c[m];return h.inherits(t,i),e("../component").define("legend",t),t}),define("echarts/util/ecData",[],function(){function e(e,t,i,n,a,o,r,s){var l;return"undefined"!=typeof n&&(l=null==n.value?n:n.value),e._echartsData={_series:t,_seriesIndex:i,_data:n,_dataIndex:a,_name:o,_value:l,_special:r,_special2:s},e._echartsData}function t(e,t){var i=e._echartsData;if(!t)return i;switch(t){case"series":case"seriesIndex":case"data":case"dataIndex":case"name":case"value":case"special":case"special2":return i&&i["_"+t]}return null}function i(e,t,i){switch(e._echartsData=e._echartsData||{},t){case"series":case"seriesIndex":case"data":case"dataIndex":case"name":case"value":case"special":case"special2":e._echartsData["_"+t]=i}}function n(e,t){t._echartsData={_series:e._echartsData._series,_seriesIndex:e._echartsData._seriesIndex,_data:e._echartsData._data,_dataIndex:e._echartsData._dataIndex,_name:e._echartsData._name,_value:e._echartsData._value,_special:e._echartsData._special,_special2:e._echartsData._special2}}return{pack:e,set:i,get:t,clone:n}}),define("echarts/chart",[],function(){var e={},t={};return e.define=function(i,n){return t[i]=n,e},e.get=function(e){return t[e]},e}),define("zrender/tool/color",["require","../tool/util"],function(e){function t(e){D=e}function i(){D=N}function n(e,t){return e=0|e,t=t||D,t[e%t.length]}function a(e){B=e}function o(){H=B}function r(){return B}function s(e,t,i,n,a,o,r){O||(O=P.getContext());for(var s=O.createRadialGradient(e,t,i,n,a,o),l=0,h=r.length;h>l;l++)s.addColorStop(r[l][0],r[l][1]);return s.__nonRecursion=!0,s}function l(e,t,i,n,a){O||(O=P.getContext());for(var o=O.createLinearGradient(e,t,i,n),r=0,s=a.length;s>r;r++)o.addColorStop(a[r][0],a[r][1]);return o.__nonRecursion=!0,o}function h(e,t,i){e=u(e),t=u(t),e=S(e),t=S(t);for(var n=[],a=(t[0]-e[0])/i,o=(t[1]-e[1])/i,r=(t[2]-e[2])/i,s=(t[3]-e[3])/i,l=0,h=e[0],d=e[1],m=e[2],p=e[3];i>l;l++)n[l]=c([T(Math.floor(h),[0,255]),T(Math.floor(d),[0,255]),T(Math.floor(m),[0,255]),p.toFixed(4)-0],"rgba"),h+=a,d+=o,m+=r,p+=s;return h=t[0],d=t[1],m=t[2],p=t[3],n[l]=c([h,d,m,p],"rgba"),n}function d(e,t){var i=[],n=e.length;if(void 0===t&&(t=20),1===n)i=h(e[0],e[0],t);else if(n>1)for(var a=0,o=n-1;o>a;a++){var r=h(e[a],e[a+1],t);o-1>a&&r.pop(),i=i.concat(r)}return i}function c(e,t){if(t=t||"rgb",e&&(3===e.length||4===e.length)){if(e=C(e,function(e){return e>1?Math.ceil(e):e}),t.indexOf("hex")>-1)return"#"+((1<<24)+(e[0]<<16)+(e[1]<<8)+ +e[2]).toString(16).slice(1);if(t.indexOf("hs")>-1){var i=C(e.slice(1,3),function(e){return e+"%"});e[1]=i[0],e[2]=i[1]}return t.indexOf("a")>-1?(3===e.length&&e.push(1),e[3]=T(e[3],[0,1]),t+"("+e.slice(0,4).join(",")+")"):t+"("+e.slice(0,3).join(",")+")"}}function m(e){e=v(e),e.indexOf("rgba")<0&&(e=u(e));var t=[],i=0;return e.replace(/[\d.]+/g,function(e){e=3>i?0|e:+e,t[i++]=e}),t}function p(e,t){if(!E(e))return e;var i=S(e),n=i[3];return"undefined"==typeof n&&(n=1),e.indexOf("hsb")>-1?i=z(i):e.indexOf("hsl")>-1&&(i=A(i)),t.indexOf("hsb")>-1||t.indexOf("hsv")>-1?i=F(i):t.indexOf("hsl")>-1&&(i=J(i)),i[3]=n,c(i,t)}function u(e){return p(e,"rgba")}function V(e){return p(e,"rgb")}function U(e){return p(e,"hex")}function g(e){return p(e,"hsva")}function f(e){return p(e,"hsv")}function y(e){return p(e,"hsba")}function b(e){return p(e,"hsb")}function _(e){return p(e,"hsla")}function x(e){return p(e,"hsl")}function k(e){for(var t in G)if(U(G[t])===U(e))return t;return null}function v(e){return String(e).replace(/\s+/g,"")}function L(e){if(G[e]&&(e=G[e]),e=v(e),e=e.replace(/hsv/i,"hsb"),/^#[\da-f]{3}$/i.test(e)){e=parseInt(e.slice(1),16);var t=(3840&e)<<8,i=(240&e)<<4,n=15&e;e="#"+((1<<24)+(t<<4)+t+(i<<4)+i+(n<<4)+n).toString(16).slice(1)}return e}function w(e,t){if(!E(e))return e;var i=t>0?1:-1;"undefined"==typeof t&&(t=0),t=Math.abs(t)>1?1:Math.abs(t),e=V(e);for(var n=S(e),a=0;3>a;a++)n[a]=1===i?n[a]*(1-t)|0:(255-n[a])*t+n[a]|0;return"rgb("+n.join(",")+")"}function W(e){if(!E(e))return e;var t=S(u(e));return t=C(t,function(e){return 255-e}),c(t,"rgb")}function X(e,t,i){if(!E(e)||!E(t))return e;"undefined"==typeof i&&(i=.5),i=1-T(i,[0,1]);for(var n=2*i-1,a=S(u(e)),o=S(u(t)),r=a[3]-o[3],s=((n*r===-1?n:(n+r)/(1+n*r))+1)/2,l=1-s,h=[],d=0;3>d;d++)h[d]=a[d]*s+o[d]*l;var m=a[3]*i+o[3]*(1-i);return m=Math.max(0,Math.min(1,m)),1===a[3]&&1===o[3]?c(h,"rgb"):(h[3]=m,c(h,"rgba"))}function I(){return"#"+(Math.random().toString(16)+"0000").slice(2,8)}function S(e){e=L(e);var t=e.match(R);if(null===t)throw new Error("The color format error");var i,n,a,o=[];if(t[2])i=t[2].replace("#","").split(""),a=[i[0]+i[1],i[2]+i[3],i[4]+i[5]],o=C(a,function(e){return T(parseInt(e,16),[0,255])});else if(t[4]){var r=t[4].split(",");n=r[3],a=r.slice(0,3),o=C(a,function(e){return e=Math.floor(e.indexOf("%")>0?2.55*parseInt(e,0):e),T(e,[0,255])}),"undefined"!=typeof n&&o.push(T(parseFloat(n),[0,1]))}else if(t[5]||t[6]){var s=(t[5]||t[6]).split(","),l=parseInt(s[0],0)/360,h=s[1],d=s[2];n=s[3],o=C([h,d],function(e){return T(parseFloat(e)/100,[0,1])}),o.unshift(l),"undefined"!=typeof n&&o.push(T(parseFloat(n),[0,1]))}return o}function K(e,t){if(!E(e))return e;null===t&&(t=1);var i=S(u(e));return i[3]=T(Number(t).toFixed(4),[0,1]),c(i,"rgba")}function C(e,t){if("function"!=typeof t)throw new TypeError;for(var i=e?e.length:0,n=0;i>n;n++)e[n]=t(e[n]);return e}function T(e,t){return e<=t[0]?e=t[0]:e>=t[1]&&(e=t[1]),e}function E(e){return e instanceof Array||"string"==typeof e}function z(e){var t,i,n,a=e[0],o=e[1],r=e[2];if(0===o)t=255*r,i=255*r,n=255*r;else{var s=6*a;6===s&&(s=0);var l=0|s,h=r*(1-o),d=r*(1-o*(s-l)),c=r*(1-o*(1-(s-l))),m=0,p=0,u=0;0===l?(m=r,p=c,u=h):1===l?(m=d,p=r,u=h):2===l?(m=h,p=r,u=c):3===l?(m=h,p=d,u=r):4===l?(m=c,p=h,u=r):(m=r,p=h,u=d),t=255*m,i=255*p,n=255*u}return[t,i,n]}function A(e){var t,i,n,a=e[0],o=e[1],r=e[2];if(0===o)t=255*r,i=255*r,n=255*r;else{var s;s=.5>r?r*(1+o):r+o-o*r;var l=2*r-s;t=255*M(l,s,a+1/3),i=255*M(l,s,a),n=255*M(l,s,a-1/3)}return[t,i,n]}function M(e,t,i){return 0>i&&(i+=1),i>1&&(i-=1),1>6*i?e+6*(t-e)*i:1>2*i?t:2>3*i?e+(t-e)*(2/3-i)*6:e}function F(e){var t,i,n=e[0]/255,a=e[1]/255,o=e[2]/255,r=Math.min(n,a,o),s=Math.max(n,a,o),l=s-r,h=s;if(0===l)t=0,i=0;else{i=l/s;var d=((s-n)/6+l/2)/l,c=((s-a)/6+l/2)/l,m=((s-o)/6+l/2)/l;n===s?t=m-c:a===s?t=1/3+d-m:o===s&&(t=2/3+c-d),0>t&&(t+=1),t>1&&(t-=1)}return t=360*t,i=100*i,h=100*h,[t,i,h]}function J(e){var t,i,n=e[0]/255,a=e[1]/255,o=e[2]/255,r=Math.min(n,a,o),s=Math.max(n,a,o),l=s-r,h=(s+r)/2;if(0===l)t=0,i=0;else{i=.5>h?l/(s+r):l/(2-s-r);var d=((s-n)/6+l/2)/l,c=((s-a)/6+l/2)/l,m=((s-o)/6+l/2)/l;n===s?t=m-c:a===s?t=1/3+d-m:o===s&&(t=2/3+c-d),0>t&&(t+=1),t>1&&(t-=1)}return t=360*t,i=100*i,h=100*h,[t,i,h]}var O,P=e("../tool/util"),D=["#ff9277"," #dddd00"," #ffc877"," #bbe3ff"," #d5ffbb","#bbbbff"," #ddb000"," #b0dd00"," #e2bbff"," #ffbbe3","#ff7777"," #ff9900"," #83dd00"," #77e3ff"," #778fff","#c877ff"," #ff77ab"," #ff6600"," #aa8800"," #77c7ff","#ad77ff"," #ff77ff"," #dd0083"," #777700"," #00aa00","#0088aa"," #8400dd"," #aa0088"," #dd0000"," #772e00"],N=D,B="rgba(255,255,0,0.5)",H=B,R=/^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i,G={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#0ff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000",blanchedalmond:"#ffebcd",blue:"#00f",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#0ff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgrey:"#a9a9a9",darkgreen:"#006400",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#f0f",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",gold:"#ffd700",goldenrod:"#daa520",gray:"#808080",grey:"#808080",green:"#008000",greenyellow:"#adff2f",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavender:"#e6e6fa",lavenderblush:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgrey:"#d3d3d3",lightgreen:"#90ee90",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#789",lightslategrey:"#789",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#0f0",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#f0f",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370d8",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#d87093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",red:"#f00",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#fff",whitesmoke:"#f5f5f5",yellow:"#ff0",yellowgreen:"#9acd32"};return{customPalette:t,resetPalette:i,getColor:n,getHighlightColor:r,customHighlight:a,resetHighlight:o,getRadialGradient:s,getLinearGradient:l,getGradientColors:d,getStepColors:h,reverse:W,mix:X,lift:w,trim:v,random:I,toRGB:V,toRGBA:u,toHex:U,toHSL:x,toHSLA:_,toHSB:b,toHSBA:y,toHSV:f,toHSVA:g,toName:k,toColor:c,toArray:m,alpha:K,getData:S}}),define("echarts/component/timeline",["require","./base","zrender/shape/Rectangle","../util/shape/Icon","../util/shape/Chain","../config","zrender/tool/util","zrender/tool/area","zrender/tool/event","../component"],function(e){function t(e,t,i,a,o){n.call(this,e,t,i,a,o);var r=this;if(r._onclick=function(e){return r.__onclick(e)},r._ondrift=function(e,t){return r.__ondrift(this,e,t)},r._ondragend=function(){return r.__ondragend()},r._setCurrentOption=function(){var e=r.timelineOption;r.currentIndex%=e.data.length;var t=r.options[r.currentIndex]||{};r.myChart._setOption(t,e.notMerge,!0),r.messageCenter.dispatch(s.EVENT.TIMELINE_CHANGED,null,{currentIndex:r.currentIndex,data:null!=e.data[r.currentIndex].name?e.data[r.currentIndex].name:e.data[r.currentIndex]},r.myChart)},r._onFrame=function(){r._setCurrentOption(),r._syncHandleShape(),r.timelineOption.autoPlay&&(r.playTicket=setTimeout(function(){return r.currentIndex+=1,!r.timelineOption.loop&&r.currentIndex>=r.timelineOption.data.length?(r.currentIndex=r.timelineOption.data.length-1,void r.stop()):void r._onFrame()},r.timelineOption.playInterval))},this.setTheme(!1),this.options=this.option.options,this.currentIndex=this.timelineOption.currentIndex%this.timelineOption.data.length,this.timelineOption.notMerge||0===this.currentIndex||(this.options[this.currentIndex]=l.merge(this.options[this.currentIndex],this.options[0])),this.timelineOption.show&&(this._buildShape(),this._syncHandleShape()),this._setCurrentOption(),this.timelineOption.autoPlay){var r=this;this.playTicket=setTimeout(function(){r.play()},null!=this.ecTheme.animationDuration?this.ecTheme.animationDuration:s.animationDuration)}}function i(e,t){var i=2,n=t.x+i,a=t.y+i+2,r=t.width-i,s=t.height-i,l=t.symbol;if("last"===l)e.moveTo(n+r-2,a+s/3),e.lineTo(n+r-2,a),e.lineTo(n+2,a+s/2),e.lineTo(n+r-2,a+s),e.lineTo(n+r-2,a+s/3*2),e.moveTo(n,a),e.lineTo(n,a);else if("next"===l)e.moveTo(n+2,a+s/3),e.lineTo(n+2,a),e.lineTo(n+r-2,a+s/2),e.lineTo(n+2,a+s),e.lineTo(n+2,a+s/3*2),e.moveTo(n,a),e.lineTo(n,a);else if("play"===l)if("stop"===t.status)e.moveTo(n+2,a),e.lineTo(n+r-2,a+s/2),e.lineTo(n+2,a+s),e.lineTo(n+2,a);else{var h="both"===t.brushType?2:3;e.rect(n+2,a,h,s),e.rect(n+r-h-2,a,h,s)}else if(l.match("image")){var d="";d=l.replace(new RegExp("^image:\\/\\/"),""),l=o.prototype.iconLibrary.image,l(e,{x:n,y:a,width:r,height:s,image:d})}}var n=e("./base"),a=e("zrender/shape/Rectangle"),o=e("../util/shape/Icon"),r=e("../util/shape/Chain"),s=e("../config");s.timeline={zlevel:0,z:4,show:!0,type:"time",notMerge:!1,realtime:!0,x:80,x2:80,y2:0,height:50,backgroundColor:"rgba(0,0,0,0)",borderColor:"#ccc",borderWidth:0,padding:5,controlPosition:"left",autoPlay:!1,loop:!0,playInterval:2e3,lineStyle:{width:1,color:"#666",type:"dashed"},label:{show:!0,interval:"auto",rotate:0,textStyle:{color:"#333"}},checkpointStyle:{symbol:"auto",symbolSize:"auto",color:"auto",borderColor:"auto",borderWidth:"auto",label:{show:!1,textStyle:{color:"auto"}}},controlStyle:{itemSize:15,itemGap:5,normal:{color:"#333"},emphasis:{color:"#1e90ff"}},symbol:"emptyDiamond",symbolSize:4,currentIndex:0};var l=e("zrender/tool/util"),h=e("zrender/tool/area"),d=e("zrender/tool/event");return t.prototype={type:s.COMPONENT_TYPE_TIMELINE,_buildShape:function(){if(this._location=this._getLocation(),this._buildBackground(),this._buildControl(),this._chainPoint=this._getChainPoint(),this.timelineOption.label.show)for(var e=this._getInterval(),t=0,i=this._chainPoint.length;i>t;t+=e)this._chainPoint[t].showLabel=!0;this._buildChain(),this._buildHandle();for(var t=0,n=this.shapeList.length;n>t;t++)this.zr.addShape(this.shapeList[t])},_getLocation:function(){var e,t=this.timelineOption,i=this.reformCssArray(this.timelineOption.padding),n=this.zr.getWidth(),a=this.parsePercent(t.x,n),o=this.parsePercent(t.x2,n);null==t.width?(e=n-a-o,o=n-o):(e=this.parsePercent(t.width,n),o=a+e);var r,s,l=this.zr.getHeight(),h=this.parsePercent(t.height,l);return null!=t.y?(r=this.parsePercent(t.y,l),s=r+h):(s=l-this.parsePercent(t.y2,l),r=s-h),{x:a+i[3],y:r+i[0],x2:o-i[1],y2:s-i[2],width:e-i[1]-i[3],height:h-i[0]-i[2]}},_getReformedLabel:function(e){var t=this.timelineOption,i=null!=t.data[e].name?t.data[e].name:t.data[e],n=t.data[e].formatter||t.label.formatter;return n&&("function"==typeof n?i=n.call(this.myChart,i):"string"==typeof n&&(i=n.replace("{value}",i))),i},_getInterval:function(){var e=this._chainPoint,t=this.timelineOption,i=t.label.interval;if("auto"===i){var n=t.label.textStyle.fontSize,a=t.data,o=t.data.length;if(o>3){var r,s,l=!1;for(i=0;!l&&o>i;){i++,l=!0;for(var d=i;o>d;d+=i){if(r=e[d].x-e[d-i].x,0!==t.label.rotate)s=n;else if(a[d].textStyle)s=h.getTextWidth(e[d].name,e[d].textFont);else{var c=e[d].name+"",m=(c.match(/\w/g)||"").length,p=c.length-m;s=m*n*2/3+p*n}if(s>r){l=!1;break}}}}else i=1}else i=i-0+1;return i},_getChainPoint:function(){function e(e){return null!=h[e].name?h[e].name:h[e]+""}var t,i=this.timelineOption,n=i.symbol.toLowerCase(),a=i.symbolSize,o=i.label.rotate,r=i.label.textStyle,s=this.getFont(r),h=i.data,d=this._location.x,c=this._location.y+this._location.height/4*3,m=this._location.x2-this._location.x,p=h.length,u=[];if(p>1){var V=m/p;if(V=V>50?50:20>V?5:V,m-=2*V,"number"===i.type)for(var U=0;p>U;U++)u.push(d+V+m/(p-1)*U);else{u[0]=new Date(e(0).replace(/-/g,"/")),u[p-1]=new Date(e(p-1).replace(/-/g,"/"))-u[0];for(var U=1;p>U;U++)u[U]=d+V+m*(new Date(e(U).replace(/-/g,"/"))-u[0])/u[p-1];u[0]=d+V}}else u.push(d+m/2);for(var g,f,y,b,_,x=[],U=0;p>U;U++)d=u[U],g=h[U].symbol&&h[U].symbol.toLowerCase()||n,g.match("empty")?(g=g.replace("empty",""),y=!0):y=!1,g.match("star")&&(f=g.replace("star","")-0||5,g="star"),t=h[U].textStyle?l.merge(h[U].textStyle||{},r):r,b=t.align||"center",o?(b=o>0?"right":"left",_=[o*Math.PI/180,d,c-5]):_=!1,x.push({x:d,n:f,isEmpty:y,symbol:g,symbolSize:h[U].symbolSize||a,color:h[U].color,borderColor:h[U].borderColor,borderWidth:h[U].borderWidth,name:this._getReformedLabel(U),textColor:t.color,textAlign:b,textBaseline:t.baseline||"middle",textX:d,textY:c-(o?5:0),textFont:h[U].textStyle?this.getFont(t):s,rotation:_,showLabel:!1});return x},_buildBackground:function(){var e=this.timelineOption,t=this.reformCssArray(this.timelineOption.padding),i=this._location.width,n=this._location.height;(0!==e.borderWidth||"rgba(0,0,0,0)"!=e.backgroundColor.replace(/\s/g,""))&&this.shapeList.push(new a({zlevel:this.getZlevelBase(),z:this.getZBase(),hoverable:!1,style:{x:this._location.x-t[3],y:this._location.y-t[0],width:i+t[1]+t[3],height:n+t[0]+t[2],brushType:0===e.borderWidth?"fill":"both",color:e.backgroundColor,strokeColor:e.borderColor,lineWidth:e.borderWidth}}))},_buildControl:function(){var e=this,t=this.timelineOption,i=t.lineStyle,n=t.controlStyle;if("none"!==t.controlPosition){var a,r=n.itemSize,s=n.itemGap;"left"===t.controlPosition?(a=this._location.x,this._location.x+=3*(r+s)):(a=this._location.x2-(3*(r+s)-s),this._location.x2-=3*(r+s));var h=this._location.y,d={zlevel:this.getZlevelBase(),z:this.getZBase()+1,style:{iconType:"timelineControl",symbol:"last",x:a,y:h,width:r,height:r,brushType:"stroke",color:n.normal.color,strokeColor:n.normal.color,lineWidth:i.width},highlightStyle:{color:n.emphasis.color,strokeColor:n.emphasis.color,lineWidth:i.width+1},clickable:!0};this._ctrLastShape=new o(d),this._ctrLastShape.onclick=function(){e.last()},this.shapeList.push(this._ctrLastShape),a+=r+s,this._ctrPlayShape=new o(l.clone(d)),this._ctrPlayShape.style.brushType="fill",this._ctrPlayShape.style.symbol="play",this._ctrPlayShape.style.status=this.timelineOption.autoPlay?"playing":"stop",this._ctrPlayShape.style.x=a,this._ctrPlayShape.onclick=function(){"stop"===e._ctrPlayShape.style.status?e.play():e.stop()},this.shapeList.push(this._ctrPlayShape),a+=r+s,this._ctrNextShape=new o(l.clone(d)),this._ctrNextShape.style.symbol="next",this._ctrNextShape.style.x=a,this._ctrNextShape.onclick=function(){e.next()},this.shapeList.push(this._ctrNextShape)}},_buildChain:function(){var e=this.timelineOption,t=e.lineStyle;this._timelineShae={zlevel:this.getZlevelBase(),z:this.getZBase(),style:{x:this._location.x,y:this.subPixelOptimize(this._location.y,t.width),width:this._location.x2-this._location.x,height:this._location.height,chainPoint:this._chainPoint,brushType:"both",strokeColor:t.color,lineWidth:t.width,lineType:t.type},hoverable:!1,clickable:!0,onclick:this._onclick},this._timelineShae=new r(this._timelineShae),this.shapeList.push(this._timelineShae)},_buildHandle:function(){var e=this._chainPoint[this.currentIndex],t=e.symbolSize+1;t=5>t?5:t,this._handleShape={zlevel:this.getZlevelBase(),z:this.getZBase()+1,hoverable:!1,draggable:!0,style:{iconType:"diamond",n:e.n,x:e.x-t,y:this._location.y+this._location.height/4-t,width:2*t,height:2*t,brushType:"both",textPosition:"specific",textX:e.x,textY:this._location.y-this._location.height/4,textAlign:"center",textBaseline:"middle"},highlightStyle:{},ondrift:this._ondrift,ondragend:this._ondragend},this._handleShape=new o(this._handleShape),this.shapeList.push(this._handleShape)},_syncHandleShape:function(){if(this.timelineOption.show){var e=this.timelineOption,t=e.checkpointStyle,i=this._chainPoint[this.currentIndex];this._handleShape.style.text=t.label.show?i.name:"",this._handleShape.style.textFont=i.textFont,this._handleShape.style.n=i.n,"auto"===t.symbol?this._handleShape.style.iconType="none"!=i.symbol?i.symbol:"diamond":(this._handleShape.style.iconType=t.symbol,t.symbol.match("star")&&(this._handleShape.style.n=t.symbol.replace("star","")-0||5,this._handleShape.style.iconType="star"));var n;"auto"===t.symbolSize?(n=i.symbolSize+2,n=5>n?5:n):n=t.symbolSize-0,this._handleShape.style.color="auto"===t.color?i.color?i.color:e.controlStyle.emphasis.color:t.color,this._handleShape.style.textColor="auto"===t.label.textStyle.color?this._handleShape.style.color:t.label.textStyle.color,this._handleShape.highlightStyle.strokeColor=this._handleShape.style.strokeColor="auto"===t.borderColor?i.borderColor?i.borderColor:"#fff":t.borderColor,this._handleShape.style.lineWidth="auto"===t.borderWidth?i.borderWidth?i.borderWidth:0:t.borderWidth-0,this._handleShape.highlightStyle.lineWidth=this._handleShape.style.lineWidth+1,this.zr.animate(this._handleShape.id,"style").when(500,{x:i.x-n,textX:i.x,y:this._location.y+this._location.height/4-n,width:2*n,height:2*n}).start("ExponentialOut")}},_findChainIndex:function(e){var t=this._chainPoint,i=t.length;if(e<=t[0].x)return 0;if(e>=t[i-1].x)return i-1;for(var n=0;i-1>n;n++)if(e>=t[n].x&&e<=t[n+1].x)return Math.abs(e-t[n].x)<Math.abs(e-t[n+1].x)?n:n+1},__onclick:function(e){var t=d.getX(e.event),i=this._findChainIndex(t);return i===this.currentIndex?!0:(this.currentIndex=i,this.timelineOption.autoPlay&&this.stop(),clearTimeout(this.playTicket),void this._onFrame())},__ondrift:function(e,t){this.timelineOption.autoPlay&&this.stop();var i,n=this._chainPoint,a=n.length;e.style.x+t<=n[0].x-n[0].symbolSize?(e.style.x=n[0].x-n[0].symbolSize,i=0):e.style.x+t>=n[a-1].x-n[a-1].symbolSize?(e.style.x=n[a-1].x-n[a-1].symbolSize,i=a-1):(e.style.x+=t,i=this._findChainIndex(e.style.x));var o=n[i],r=o.symbolSize+2;if(e.style.iconType=o.symbol,e.style.n=o.n,e.style.textX=e.style.x+r/2,e.style.y=this._location.y+this._location.height/4-r,e.style.width=2*r,e.style.height=2*r,e.style.text=o.name,i===this.currentIndex)return!0;if(this.currentIndex=i,this.timelineOption.realtime){clearTimeout(this.playTicket);var s=this;this.playTicket=setTimeout(function(){s._setCurrentOption()},200)}return!0},__ondragend:function(){this.isDragend=!0},ondragend:function(e,t){this.isDragend&&e.target&&(!this.timelineOption.realtime&&this._setCurrentOption(),t.dragOut=!0,t.dragIn=!0,t.needRefresh=!1,this.isDragend=!1,this._syncHandleShape())},last:function(){return this.timelineOption.autoPlay&&this.stop(),this.currentIndex-=1,this.currentIndex<0&&(this.currentIndex=this.timelineOption.data.length-1),this._onFrame(),this.currentIndex},next:function(){return this.timelineOption.autoPlay&&this.stop(),this.currentIndex+=1,this.currentIndex>=this.timelineOption.data.length&&(this.currentIndex=0),
this._onFrame(),this.currentIndex},play:function(e,t){return this._ctrPlayShape&&"playing"!=this._ctrPlayShape.style.status&&(this._ctrPlayShape.style.status="playing",this.zr.modShape(this._ctrPlayShape.id),this.zr.refreshNextFrame()),this.timelineOption.autoPlay=null!=t?t:!0,this.timelineOption.autoPlay||clearTimeout(this.playTicket),this.currentIndex=null!=e?e:this.currentIndex+1,this.currentIndex>=this.timelineOption.data.length&&(this.currentIndex=0),this._onFrame(),this.currentIndex},stop:function(){return this._ctrPlayShape&&"stop"!=this._ctrPlayShape.style.status&&(this._ctrPlayShape.style.status="stop",this.zr.modShape(this._ctrPlayShape.id),this.zr.refreshNextFrame()),this.timelineOption.autoPlay=!1,clearTimeout(this.playTicket),this.currentIndex},resize:function(){this.timelineOption.show&&(this.clear(),this._buildShape(),this._syncHandleShape())},setTheme:function(e){this.timelineOption=this.reformOption(l.clone(this.option.timeline)),this.timelineOption.label.textStyle=this.getTextStyle(this.timelineOption.label.textStyle),this.timelineOption.checkpointStyle.label.textStyle=this.getTextStyle(this.timelineOption.checkpointStyle.label.textStyle),this.myChart.canvasSupported||(this.timelineOption.realtime=!1),this.timelineOption.show&&e&&(this.clear(),this._buildShape(),this._syncHandleShape())},onbeforDispose:function(){clearTimeout(this.playTicket)}},o.prototype.iconLibrary.timelineControl=i,l.inherits(t,n),e("../component").define("timeline",t),t}),define("zrender/shape/Image",["require","./Base","../tool/util"],function(e){var t=e("./Base"),i=function(e){t.call(this,e)};return i.prototype={type:"image",brush:function(e,t,i){var n=this.style||{};t&&(n=this.getHighlightStyle(n,this.highlightStyle||{}));var a=n.image,o=this;if(this._imageCache||(this._imageCache={}),"string"==typeof a){var r=a;this._imageCache[r]?a=this._imageCache[r]:(a=new Image,a.onload=function(){a.onload=null,o.modSelf(),i()},a.src=r,this._imageCache[r]=a)}if(a){if("IMG"==a.nodeName.toUpperCase())if(window.ActiveXObject){if("complete"!=a.readyState)return}else if(!a.complete)return;var s=n.width||a.width,l=n.height||a.height,h=n.x,d=n.y;if(!a.width||!a.height)return;if(e.save(),this.doClip(e),this.setContext(e,n),this.setTransform(e),n.sWidth&&n.sHeight){var c=n.sx||0,m=n.sy||0;e.drawImage(a,c,m,n.sWidth,n.sHeight,h,d,s,l)}else if(n.sx&&n.sy){var c=n.sx,m=n.sy,p=s-c,u=l-m;e.drawImage(a,c,m,p,u,h,d,s,l)}else e.drawImage(a,h,d,s,l);n.width||(n.width=s),n.height||(n.height=l),this.style.width||(this.style.width=s),this.style.height||(this.style.height=l),this.drawText(e,n,this.style),e.restore()}},getRect:function(e){return{x:e.x,y:e.y,width:e.width,height:e.height}},clearCache:function(){this._imageCache={}}},e("../tool/util").inherits(i,t),i}),define("zrender/loadingEffect/Bar",["require","./Base","../tool/util","../tool/color","../shape/Rectangle"],function(e){function t(e){i.call(this,e)}var i=e("./Base"),n=e("../tool/util"),a=e("../tool/color"),o=e("../shape/Rectangle");return n.inherits(t,i),t.prototype._start=function(e,t){var i=n.merge(this.options,{textStyle:{color:"#888"},backgroundColor:"rgba(250, 250, 250, 0.8)",effectOption:{x:0,y:this.canvasHeight/2-30,width:this.canvasWidth,height:5,brushType:"fill",timeInterval:100}}),r=this.createTextShape(i.textStyle),s=this.createBackgroundShape(i.backgroundColor),l=i.effectOption,h=new o({highlightStyle:n.clone(l)});return h.highlightStyle.color=l.color||a.getLinearGradient(l.x,l.y,l.x+l.width,l.y+l.height,[[0,"#ff6400"],[.5,"#ffe100"],[1,"#b1ff00"]]),null!=i.progress?(e(s),h.highlightStyle.width=this.adjust(i.progress,[0,1])*i.effectOption.width,e(h),e(r),void t()):(h.highlightStyle.width=0,setInterval(function(){e(s),h.highlightStyle.width<l.width?h.highlightStyle.width+=8:h.highlightStyle.width=0,e(h),e(r),t()},l.timeInterval))},t}),define("zrender/loadingEffect/Bubble",["require","./Base","../tool/util","../tool/color","../shape/Circle"],function(e){function t(e){i.call(this,e)}var i=e("./Base"),n=e("../tool/util"),a=e("../tool/color"),o=e("../shape/Circle");return n.inherits(t,i),t.prototype._start=function(e,t){for(var i=n.merge(this.options,{textStyle:{color:"#888"},backgroundColor:"rgba(250, 250, 250, 0.8)",effect:{n:50,lineWidth:2,brushType:"stroke",color:"random",timeInterval:100}}),r=this.createTextShape(i.textStyle),s=this.createBackgroundShape(i.backgroundColor),l=i.effect,h=l.n,d=l.brushType,c=l.lineWidth,m=[],p=this.canvasWidth,u=this.canvasHeight,V=0;h>V;V++){var U="random"==l.color?a.alpha(a.random(),.3):l.color;m[V]=new o({highlightStyle:{x:Math.ceil(Math.random()*p),y:Math.ceil(Math.random()*u),r:Math.ceil(40*Math.random()),brushType:d,color:U,strokeColor:U,lineWidth:c},animationY:Math.ceil(20*Math.random())})}return setInterval(function(){e(s);for(var i=0;h>i;i++){var n=m[i].highlightStyle;n.y-m[i].animationY+n.r<=0&&(m[i].highlightStyle.y=u+n.r,m[i].highlightStyle.x=Math.ceil(Math.random()*p)),m[i].highlightStyle.y-=m[i].animationY,e(m[i])}e(r),t()},l.timeInterval)},t}),define("zrender/loadingEffect/DynamicLine",["require","./Base","../tool/util","../tool/color","../shape/Line"],function(e){function t(e){i.call(this,e)}var i=e("./Base"),n=e("../tool/util"),a=e("../tool/color"),o=e("../shape/Line");return n.inherits(t,i),t.prototype._start=function(e,t){for(var i=n.merge(this.options,{textStyle:{color:"#fff"},backgroundColor:"rgba(0, 0, 0, 0.8)",effectOption:{n:30,lineWidth:1,color:"random",timeInterval:100}}),r=this.createTextShape(i.textStyle),s=this.createBackgroundShape(i.backgroundColor),l=i.effectOption,h=l.n,d=l.lineWidth,c=[],m=this.canvasWidth,p=this.canvasHeight,u=0;h>u;u++){var V=-Math.ceil(1e3*Math.random()),U=Math.ceil(400*Math.random()),g=Math.ceil(Math.random()*p),f="random"==l.color?a.random():l.color;c[u]=new o({highlightStyle:{xStart:V,yStart:g,xEnd:V+U,yEnd:g,strokeColor:f,lineWidth:d},animationX:Math.ceil(100*Math.random()),len:U})}return setInterval(function(){e(s);for(var i=0;h>i;i++){var n=c[i].highlightStyle;n.xStart>=m&&(c[i].len=Math.ceil(400*Math.random()),n.xStart=-400,n.xEnd=-400+c[i].len,n.yStart=Math.ceil(Math.random()*p),n.yEnd=n.yStart),n.xStart+=c[i].animationX,n.xEnd+=c[i].animationX,e(c[i])}e(r),t()},l.timeInterval)},t}),define("zrender/loadingEffect/Ring",["require","./Base","../tool/util","../tool/color","../shape/Ring","../shape/Sector"],function(e){function t(e){i.call(this,e)}var i=e("./Base"),n=e("../tool/util"),a=e("../tool/color"),o=e("../shape/Ring"),r=e("../shape/Sector");return n.inherits(t,i),t.prototype._start=function(e,t){var i=n.merge(this.options,{textStyle:{color:"#07a"},backgroundColor:"rgba(250, 250, 250, 0.8)",effect:{x:this.canvasWidth/2,y:this.canvasHeight/2,r0:60,r:100,color:"#bbdcff",brushType:"fill",textPosition:"inside",textFont:"normal 30px verdana",textColor:"rgba(30, 144, 255, 0.6)",timeInterval:100}}),s=i.effect,l=i.textStyle;null==l.x&&(l.x=s.x),null==l.y&&(l.y=s.y+(s.r0+s.r)/2-5);for(var h=this.createTextShape(i.textStyle),d=this.createBackgroundShape(i.backgroundColor),c=s.x,m=s.y,p=s.r0+6,u=s.r-6,V=s.color,U=a.lift(V,.1),g=new o({highlightStyle:n.clone(s)}),f=[],y=a.getGradientColors(["#ff6400","#ffe100","#97ff00"],25),b=15,_=240,x=0;16>x;x++)f.push(new r({highlightStyle:{x:c,y:m,r0:p,r:u,startAngle:_-b,endAngle:_,brushType:"fill",color:U},_color:a.getLinearGradient(c+p*Math.cos(_,!0),m-p*Math.sin(_,!0),c+p*Math.cos(_-b,!0),m-p*Math.sin(_-b,!0),[[0,y[2*x]],[1,y[2*x+1]]])})),_-=b;_=360;for(var x=0;4>x;x++)f.push(new r({highlightStyle:{x:c,y:m,r0:p,r:u,startAngle:_-b,endAngle:_,brushType:"fill",color:U},_color:a.getLinearGradient(c+p*Math.cos(_,!0),m-p*Math.sin(_,!0),c+p*Math.cos(_-b,!0),m-p*Math.sin(_-b,!0),[[0,y[2*x+32]],[1,y[2*x+33]]])})),_-=b;var k=0;if(null!=i.progress){e(d),k=100*this.adjust(i.progress,[0,1]).toFixed(2)/5,g.highlightStyle.text=5*k+"%",e(g);for(var x=0;20>x;x++)f[x].highlightStyle.color=k>x?f[x]._color:U,e(f[x]);return e(h),void t()}return setInterval(function(){e(d),k+=k>=20?-20:1,e(g);for(var i=0;20>i;i++)f[i].highlightStyle.color=k>i?f[i]._color:U,e(f[i]);e(h),t()},s.timeInterval)},t}),define("zrender/loadingEffect/Spin",["require","./Base","../tool/util","../tool/color","../tool/area","../shape/Sector"],function(e){function t(e){i.call(this,e)}var i=e("./Base"),n=e("../tool/util"),a=e("../tool/color"),o=e("../tool/area"),r=e("../shape/Sector");return n.inherits(t,i),t.prototype._start=function(e,t){var i=n.merge(this.options,{textStyle:{color:"#fff",textAlign:"start"},backgroundColor:"rgba(0, 0, 0, 0.8)"}),s=this.createTextShape(i.textStyle),l=10,h=o.getTextWidth(s.highlightStyle.text,s.highlightStyle.textFont),d=o.getTextHeight(s.highlightStyle.text,s.highlightStyle.textFont),c=n.merge(this.options.effect||{},{r0:9,r:15,n:18,color:"#fff",timeInterval:100}),m=this.getLocation(this.options.textStyle,h+l+2*c.r,Math.max(2*c.r,d));c.x=m.x+c.r,c.y=s.highlightStyle.y=m.y+m.height/2,s.highlightStyle.x=c.x+c.r+l;for(var p=this.createBackgroundShape(i.backgroundColor),u=c.n,V=c.x,U=c.y,g=c.r0,f=c.r,y=c.color,b=[],_=Math.round(180/u),x=0;u>x;x++)b[x]=new r({highlightStyle:{x:V,y:U,r0:g,r:f,startAngle:_*x*2,endAngle:_*x*2+_,color:a.alpha(y,(x+1)/u),brushType:"fill"}});var k=[0,V,U];return setInterval(function(){e(p),k[0]-=.3;for(var i=0;u>i;i++)b[i].rotation=k,e(b[i]);e(s),t()},c.timeInterval)},t}),define("zrender/loadingEffect/Whirling",["require","./Base","../tool/util","../tool/area","../shape/Ring","../shape/Droplet","../shape/Circle"],function(e){function t(e){i.call(this,e)}var i=e("./Base"),n=e("../tool/util"),a=e("../tool/area"),o=e("../shape/Ring"),r=e("../shape/Droplet"),s=e("../shape/Circle");return n.inherits(t,i),t.prototype._start=function(e,t){var i=n.merge(this.options,{textStyle:{color:"#888",textAlign:"start"},backgroundColor:"rgba(250, 250, 250, 0.8)"}),l=this.createTextShape(i.textStyle),h=10,d=a.getTextWidth(l.highlightStyle.text,l.highlightStyle.textFont),c=a.getTextHeight(l.highlightStyle.text,l.highlightStyle.textFont),m=n.merge(this.options.effect||{},{r:18,colorIn:"#fff",colorOut:"#555",colorWhirl:"#6cf",timeInterval:50}),p=this.getLocation(this.options.textStyle,d+h+2*m.r,Math.max(2*m.r,c));m.x=p.x+m.r,m.y=l.highlightStyle.y=p.y+p.height/2,l.highlightStyle.x=m.x+m.r+h;var u=this.createBackgroundShape(i.backgroundColor),V=new r({highlightStyle:{a:Math.round(m.r/2),b:Math.round(m.r-m.r/6),brushType:"fill",color:m.colorWhirl}}),U=new s({highlightStyle:{r:Math.round(m.r/6),brushType:"fill",color:m.colorIn}}),g=new o({highlightStyle:{r0:Math.round(m.r-m.r/3),r:m.r,brushType:"fill",color:m.colorOut}}),f=[0,m.x,m.y];return V.highlightStyle.x=U.highlightStyle.x=g.highlightStyle.x=f[1],V.highlightStyle.y=U.highlightStyle.y=g.highlightStyle.y=f[2],setInterval(function(){e(u),e(g),f[0]-=.3,V.rotation=f,e(V),e(U),e(l),t()},m.timeInterval)},t}),define("echarts/theme/macarons",[],function(){var e={color:["#2ec7c9","#b6a2de","#5ab1ef","#ffb980","#d87a80","#8d98b3","#e5cf0d","#97b552","#95706d","#dc69aa","#07a2a4","#9a7fd1","#588dd5","#f5994e","#c05050","#59678c","#c9ab00","#7eb00a","#6f5553","#c14089"],title:{textStyle:{fontWeight:"normal",color:"#008acd"}},dataRange:{itemWidth:15,color:["#5ab1ef","#e0ffff"]},toolbox:{color:["#1e90ff","#1e90ff","#1e90ff","#1e90ff"],effectiveColor:"#ff4500"},tooltip:{backgroundColor:"rgba(50,50,50,0.5)",axisPointer:{type:"line",lineStyle:{color:"#008acd"},crossStyle:{color:"#008acd"},shadowStyle:{color:"rgba(200,200,200,0.2)"}}},dataZoom:{dataBackgroundColor:"#efefff",fillerColor:"rgba(182,162,222,0.2)",handleColor:"#008acd"},grid:{borderColor:"#eee"},categoryAxis:{axisLine:{lineStyle:{color:"#008acd"}},splitLine:{lineStyle:{color:["#eee"]}}},valueAxis:{axisLine:{lineStyle:{color:"#008acd"}},splitArea:{show:!0,areaStyle:{color:["rgba(250,250,250,0.1)","rgba(200,200,200,0.1)"]}},splitLine:{lineStyle:{color:["#eee"]}}},polar:{axisLine:{lineStyle:{color:"#ddd"}},splitArea:{show:!0,areaStyle:{color:["rgba(250,250,250,0.2)","rgba(200,200,200,0.2)"]}},splitLine:{lineStyle:{color:"#ddd"}}},timeline:{lineStyle:{color:"#008acd"},controlStyle:{normal:{color:"#008acd"},emphasis:{color:"#008acd"}},symbol:"emptyCircle",symbolSize:3},bar:{itemStyle:{normal:{barBorderRadius:5},emphasis:{barBorderRadius:5}}},line:{smooth:!0,symbol:"emptyCircle",symbolSize:3},k:{itemStyle:{normal:{color:"#d87a80",color0:"#2ec7c9",lineStyle:{color:"#d87a80",color0:"#2ec7c9"}}}},scatter:{symbol:"circle",symbolSize:4},radar:{symbol:"emptyCircle",symbolSize:3},map:{itemStyle:{normal:{areaStyle:{color:"#ddd"},label:{textStyle:{color:"#d87a80"}}},emphasis:{areaStyle:{color:"#fe994e"}}}},force:{itemStyle:{normal:{linkStyle:{color:"#1e90ff"}}}},chord:{itemStyle:{normal:{borderWidth:1,borderColor:"rgba(128, 128, 128, 0.5)",chordStyle:{lineStyle:{color:"rgba(128, 128, 128, 0.5)"}}},emphasis:{borderWidth:1,borderColor:"rgba(128, 128, 128, 0.5)",chordStyle:{lineStyle:{color:"rgba(128, 128, 128, 0.5)"}}}}},gauge:{axisLine:{lineStyle:{color:[[.2,"#2ec7c9"],[.8,"#5ab1ef"],[1,"#d87a80"]],width:10}},axisTick:{splitNumber:10,length:15,lineStyle:{color:"auto"}},splitLine:{length:22,lineStyle:{color:"auto"}},pointer:{width:5}},textStyle:{fontFamily:"å¾®è½¯é›…é»‘, Arial, Verdana, sans-serif"}};return e}),define("echarts/theme/infographic",[],function(){var e={color:["#C1232B","#B5C334","#FCCE10","#E87C25","#27727B","#FE8463","#9BCA63","#FAD860","#F3A43B","#60C0DD","#D7504B","#C6E579","#F4E001","#F0805A","#26C0C0"],title:{textStyle:{fontWeight:"normal",color:"#27727B"}},dataRange:{x:"right",y:"center",itemWidth:5,itemHeight:25,color:["#C1232B","#FCCE10"]},toolbox:{color:["#C1232B","#B5C334","#FCCE10","#E87C25","#27727B","#FE8463","#9BCA63","#FAD860","#F3A43B","#60C0DD"],effectiveColor:"#ff4500"},tooltip:{backgroundColor:"rgba(50,50,50,0.5)",axisPointer:{type:"line",lineStyle:{color:"#27727B",type:"dashed"},crossStyle:{color:"#27727B"},shadowStyle:{color:"rgba(200,200,200,0.3)"}}},dataZoom:{dataBackgroundColor:"rgba(181,195,52,0.3)",fillerColor:"rgba(181,195,52,0.2)",handleColor:"#27727B"},grid:{borderWidth:0},categoryAxis:{axisLine:{lineStyle:{color:"#27727B"}},splitLine:{show:!1}},valueAxis:{axisLine:{show:!1},splitArea:{show:!1},splitLine:{lineStyle:{color:["#ccc"],type:"dashed"}}},polar:{axisLine:{lineStyle:{color:"#ddd"}},splitArea:{show:!0,areaStyle:{color:["rgba(250,250,250,0.2)","rgba(200,200,200,0.2)"]}},splitLine:{lineStyle:{color:"#ddd"}}},timeline:{lineStyle:{color:"#27727B"},controlStyle:{normal:{color:"#27727B"},emphasis:{color:"#27727B"}},symbol:"emptyCircle",symbolSize:3},line:{itemStyle:{normal:{borderWidth:2,borderColor:"#fff",lineStyle:{width:3}},emphasis:{borderWidth:0}},symbol:"circle",symbolSize:3.5},k:{itemStyle:{normal:{color:"#C1232B",color0:"#B5C334",lineStyle:{width:1,color:"#C1232B",color0:"#B5C334"}}}},scatter:{itemStyle:{normal:{borderWidth:1,borderColor:"rgba(200,200,200,0.5)"},emphasis:{borderWidth:0}},symbol:"star4",symbolSize:4},radar:{symbol:"emptyCircle",symbolSize:3},map:{itemStyle:{normal:{areaStyle:{color:"#ddd"},label:{textStyle:{color:"#C1232B"}}},emphasis:{areaStyle:{color:"#fe994e"},label:{textStyle:{color:"rgb(100,0,0)"}}}}},force:{itemStyle:{normal:{linkStyle:{color:"#27727B"}}}},chord:{itemStyle:{normal:{borderWidth:1,borderColor:"rgba(128, 128, 128, 0.5)",chordStyle:{lineStyle:{color:"rgba(128, 128, 128, 0.5)"}}},emphasis:{borderWidth:1,borderColor:"rgba(128, 128, 128, 0.5)",chordStyle:{lineStyle:{color:"rgba(128, 128, 128, 0.5)"}}}}},gauge:{center:["50%","80%"],radius:"100%",startAngle:180,endAngle:0,axisLine:{show:!0,lineStyle:{color:[[.2,"#B5C334"],[.8,"#27727B"],[1,"#C1232B"]],width:"40%"}},axisTick:{splitNumber:2,length:5,lineStyle:{color:"#fff"}},axisLabel:{textStyle:{color:"#fff",fontWeight:"bolder"}},splitLine:{length:"5%",lineStyle:{color:"#fff"}},pointer:{width:"40%",length:"80%",color:"#fff"},title:{offsetCenter:[0,-20],textStyle:{color:"auto",fontSize:20}},detail:{offsetCenter:[0,0],textStyle:{color:"auto",fontSize:40}}},textStyle:{fontFamily:"å¾®è½¯é›…é»‘, Arial, Verdana, sans-serif"}};return e}),define("zrender/dep/excanvas",["require"],function(){return document.createElement("canvas").getContext?G_vmlCanvasManager=!1:!function(){function e(){return this.context_||(this.context_=new b(this))}function t(e,t){var i=O.call(arguments,2);return function(){return e.apply(t,i.concat(O.call(arguments)))}}function i(e){return String(e).replace(/&/g,"&amp;").replace(/"/g,"&quot;")}function n(e,t,i){e.namespaces[t]||e.namespaces.add(t,i,"#default#VML")}function a(e){if(n(e,"g_vml_","urn:schemas-microsoft-com:vml"),n(e,"g_o_","urn:schemas-microsoft-com:office:office"),!e.styleSheets.ex_canvas_){var t=e.createStyleSheet();t.owningElement.id="ex_canvas_",t.cssText="canvas{display:inline-block;overflow:hidden;text-align:left;width:300px;height:150px}"}}function o(e){var t=e.srcElement;switch(e.propertyName){case"width":t.getContext().clearRect(),t.style.width=t.attributes.width.nodeValue+"px",t.firstChild.style.width=t.clientWidth+"px";break;case"height":t.getContext().clearRect(),t.style.height=t.attributes.height.nodeValue+"px",t.firstChild.style.height=t.clientHeight+"px"}}function r(e){var t=e.srcElement;t.firstChild&&(t.firstChild.style.width=t.clientWidth+"px",t.firstChild.style.height=t.clientHeight+"px")}function s(){return[[1,0,0],[0,1,0],[0,0,1]]}function l(e,t){for(var i=s(),n=0;3>n;n++)for(var a=0;3>a;a++){for(var o=0,r=0;3>r;r++)o+=e[n][r]*t[r][a];i[n][a]=o}return i}function h(e,t){t.fillStyle=e.fillStyle,t.lineCap=e.lineCap,t.lineJoin=e.lineJoin,t.lineWidth=e.lineWidth,t.miterLimit=e.miterLimit,t.shadowBlur=e.shadowBlur,t.shadowColor=e.shadowColor,t.shadowOffsetX=e.shadowOffsetX,t.shadowOffsetY=e.shadowOffsetY,t.strokeStyle=e.strokeStyle,t.globalAlpha=e.globalAlpha,t.font=e.font,t.textAlign=e.textAlign,t.textBaseline=e.textBaseline,t.scaleX_=e.scaleX_,t.scaleY_=e.scaleY_,t.lineScale_=e.lineScale_}function d(e){var t=e.indexOf("(",3),i=e.indexOf(")",t+1),n=e.substring(t+1,i).split(",");return(4!=n.length||"a"!=e.charAt(3))&&(n[3]=1),n}function c(e){return parseFloat(e)/100}function m(e,t,i){return Math.min(i,Math.max(t,e))}function p(e){var t,i,n,a,o,r;if(a=parseFloat(e[0])/360%360,0>a&&a++,o=m(c(e[1]),0,1),r=m(c(e[2]),0,1),0==o)t=i=n=r;else{var s=.5>r?r*(1+o):r+o-r*o,l=2*r-s;t=u(l,s,a+1/3),i=u(l,s,a),n=u(l,s,a-1/3)}return"#"+D[Math.floor(255*t)]+D[Math.floor(255*i)]+D[Math.floor(255*n)]}function u(e,t,i){return 0>i&&i++,i>1&&i--,1>6*i?e+6*(t-e)*i:1>2*i?t:2>3*i?e+(t-e)*(2/3-i)*6:e}function V(e){if(e in R)return R[e];var t,i=1;if(e=String(e),"#"==e.charAt(0))t=e;else if(/^rgb/.test(e)){for(var n,a=d(e),t="#",o=0;3>o;o++)n=-1!=a[o].indexOf("%")?Math.floor(255*c(a[o])):+a[o],t+=D[m(n,0,255)];i=+a[3]}else if(/^hsl/.test(e)){var a=d(e);t=p(a),i=a[3]}else t=H[e]||e;return R[e]={color:t,alpha:i}}function U(e){if(Y[e])return Y[e];var t,i=document.createElement("div"),n=i.style;try{n.font=e,t=n.fontFamily.split(",")[0]}catch(a){}return Y[e]={style:n.fontStyle||G.style,variant:n.fontVariant||G.variant,weight:n.fontWeight||G.weight,size:n.fontSize||G.size,family:t||G.family}}function g(e,t){var i={};for(var n in e)i[n]=e[n];var a=parseFloat(t.currentStyle.fontSize),o=parseFloat(e.size);return i.size="number"==typeof e.size?e.size:-1!=e.size.indexOf("px")?o:-1!=e.size.indexOf("em")?a*o:-1!=e.size.indexOf("%")?a/100*o:-1!=e.size.indexOf("pt")?o/.75:a,i}function f(e){return e.style+" "+e.variant+" "+e.weight+" "+e.size+"px '"+e.family+"'"}function y(e){return Z[e]||"square"}function b(e){this.m_=s(),this.mStack_=[],this.aStack_=[],this.currentPath_=[],this.strokeStyle="#000",this.fillStyle="#000",this.lineWidth=1,this.lineJoin="miter",this.lineCap="butt",this.miterLimit=1*F,this.globalAlpha=1,this.font="12px å¾®è½¯é›…é»‘",this.textAlign="left",this.textBaseline="alphabetic",this.canvas=e;var t="width:"+e.clientWidth+"px;height:"+e.clientHeight+"px;overflow:hidden;position:absolute",i=e.ownerDocument.createElement("div");i.style.cssText=t,e.appendChild(i);var n=i.cloneNode(!1);n.style.backgroundColor="#fff",n.style.filter="alpha(opacity=0)",e.appendChild(n),this.element_=i,this.scaleX_=1,this.scaleY_=1,this.lineScale_=1}function _(e,t,i,n){e.currentPath_.push({type:"bezierCurveTo",cp1x:t.x,cp1y:t.y,cp2x:i.x,cp2y:i.y,x:n.x,y:n.y}),e.currentX_=n.x,e.currentY_=n.y}function x(e,t){var i=V(e.strokeStyle),n=i.color,a=i.alpha*e.globalAlpha,o=e.lineScale_*e.lineWidth;1>o&&(a*=o),t.push("<g_vml_:stroke",' opacity="',a,'"',' joinstyle="',e.lineJoin,'"',' miterlimit="',e.miterLimit,'"',' endcap="',y(e.lineCap),'"',' weight="',o,'px"',' color="',n,'" />')}function k(e,t,i,n){var a=e.fillStyle,o=e.scaleX_,r=e.scaleY_,s=n.x-i.x,l=n.y-i.y;if(a instanceof W){var h=0,d={x:0,y:0},c=0,m=1;if("gradient"==a.type_){var p=a.x0_/o,u=a.y0_/r,U=a.x1_/o,g=a.y1_/r,f=v(e,p,u),y=v(e,U,g),b=y.x-f.x,_=y.y-f.y;h=180*Math.atan2(b,_)/Math.PI,0>h&&(h+=360),1e-6>h&&(h=0)}else{var f=v(e,a.x0_,a.y0_);d={x:(f.x-i.x)/s,y:(f.y-i.y)/l},s/=o*F,l/=r*F;var x=C.max(s,l);c=2*a.r0_/x,m=2*a.r1_/x-c}var k=a.colors_;k.sort(function(e,t){return e.offset-t.offset});for(var L=k.length,w=k[0].color,I=k[L-1].color,S=k[0].alpha*e.globalAlpha,K=k[L-1].alpha*e.globalAlpha,T=[],E=0;L>E;E++){var z=k[E];T.push(z.offset*m+c+" "+z.color)}t.push('<g_vml_:fill type="',a.type_,'"',' method="none" focus="100%"',' color="',w,'"',' color2="',I,'"',' colors="',T.join(","),'"',' opacity="',K,'"',' g_o_:opacity2="',S,'"',' angle="',h,'"',' focusposition="',d.x,",",d.y,'" />')}else if(a instanceof X){if(s&&l){var A=-i.x,M=-i.y;t.push("<g_vml_:fill",' position="',A/s*o*o,",",M/l*r*r,'"',' type="tile"',' src="',a.src_,'" />')}}else{var J=V(e.fillStyle),O=J.color,P=J.alpha*e.globalAlpha;t.push('<g_vml_:fill color="',O,'" opacity="',P,'" />')}}function v(e,t,i){var n=e.m_;return{x:F*(t*n[0][0]+i*n[1][0]+n[2][0])-J,y:F*(t*n[0][1]+i*n[1][1]+n[2][1])-J}}function L(e){return isFinite(e[0][0])&&isFinite(e[0][1])&&isFinite(e[1][0])&&isFinite(e[1][1])&&isFinite(e[2][0])&&isFinite(e[2][1])}function w(e,t,i){if(L(t)&&(e.m_=t,e.scaleX_=Math.sqrt(t[0][0]*t[0][0]+t[0][1]*t[0][1]),e.scaleY_=Math.sqrt(t[1][0]*t[1][0]+t[1][1]*t[1][1]),i)){var n=t[0][0]*t[1][1]-t[0][1]*t[1][0];e.lineScale_=M(A(n))}}function W(e){this.type_=e,this.x0_=0,this.y0_=0,this.r0_=0,this.x1_=0,this.y1_=0,this.r1_=0,this.colors_=[]}function X(e,t){switch(S(e),t){case"repeat":case null:case"":this.repetition_="repeat";break;case"repeat-x":case"repeat-y":case"no-repeat":this.repetition_=t;break;default:I("SYNTAX_ERR")}this.src_=e.src,this.width_=e.width,this.height_=e.height}function I(e){throw new K(e)}function S(e){e&&1==e.nodeType&&"IMG"==e.tagName||I("TYPE_MISMATCH_ERR"),"complete"!=e.readyState&&I("INVALID_STATE_ERR")}function K(e){this.code=this[e],this.message=e+": DOM Exception "+this.code}var C=Math,T=C.round,E=C.sin,z=C.cos,A=C.abs,M=C.sqrt,F=10,J=F/2,O=(+navigator.userAgent.match(/MSIE ([\d.]+)?/)[1],Array.prototype.slice);a(document);var P={init:function(e){var i=e||document;i.createElement("canvas"),i.attachEvent("onreadystatechange",t(this.init_,this,i))},init_:function(e){for(var t=e.getElementsByTagName("canvas"),i=0;i<t.length;i++)this.initElement(t[i])},initElement:function(t){if(!t.getContext){t.getContext=e,a(t.ownerDocument),t.innerHTML="",t.attachEvent("onpropertychange",o),t.attachEvent("onresize",r);var i=t.attributes;i.width&&i.width.specified?t.style.width=i.width.nodeValue+"px":t.width=t.clientWidth,i.height&&i.height.specified?t.style.height=i.height.nodeValue+"px":t.height=t.clientHeight}return t}};P.init();for(var D=[],N=0;16>N;N++)for(var B=0;16>B;B++)D[16*N+B]=N.toString(16)+B.toString(16);var H={aliceblue:"#F0F8FF",antiquewhite:"#FAEBD7",aquamarine:"#7FFFD4",azure:"#F0FFFF",beige:"#F5F5DC",bisque:"#FFE4C4",black:"#000000",blanchedalmond:"#FFEBCD",blueviolet:"#8A2BE2",brown:"#A52A2A",burlywood:"#DEB887",cadetblue:"#5F9EA0",chartreuse:"#7FFF00",chocolate:"#D2691E",coral:"#FF7F50",cornflowerblue:"#6495ED",cornsilk:"#FFF8DC",crimson:"#DC143C",cyan:"#00FFFF",darkblue:"#00008B",darkcyan:"#008B8B",darkgoldenrod:"#B8860B",darkgray:"#A9A9A9",darkgreen:"#006400",darkgrey:"#A9A9A9",darkkhaki:"#BDB76B",darkmagenta:"#8B008B",darkolivegreen:"#556B2F",darkorange:"#FF8C00",darkorchid:"#9932CC",darkred:"#8B0000",darksalmon:"#E9967A",darkseagreen:"#8FBC8F",darkslateblue:"#483D8B",darkslategray:"#2F4F4F",darkslategrey:"#2F4F4F",darkturquoise:"#00CED1",darkviolet:"#9400D3",deeppink:"#FF1493",deepskyblue:"#00BFFF",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1E90FF",firebrick:"#B22222",floralwhite:"#FFFAF0",forestgreen:"#228B22",gainsboro:"#DCDCDC",ghostwhite:"#F8F8FF",gold:"#FFD700",goldenrod:"#DAA520",grey:"#808080",greenyellow:"#ADFF2F",honeydew:"#F0FFF0",hotpink:"#FF69B4",indianred:"#CD5C5C",indigo:"#4B0082",ivory:"#FFFFF0",khaki:"#F0E68C",lavender:"#E6E6FA",lavenderblush:"#FFF0F5",lawngreen:"#7CFC00",lemonchiffon:"#FFFACD",lightblue:"#ADD8E6",lightcoral:"#F08080",lightcyan:"#E0FFFF",lightgoldenrodyellow:"#FAFAD2",lightgreen:"#90EE90",lightgrey:"#D3D3D3",lightpink:"#FFB6C1",lightsalmon:"#FFA07A",lightseagreen:"#20B2AA",lightskyblue:"#87CEFA",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#B0C4DE",lightyellow:"#FFFFE0",limegreen:"#32CD32",linen:"#FAF0E6",magenta:"#FF00FF",mediumaquamarine:"#66CDAA",mediumblue:"#0000CD",mediumorchid:"#BA55D3",mediumpurple:"#9370DB",mediumseagreen:"#3CB371",mediumslateblue:"#7B68EE",mediumspringgreen:"#00FA9A",mediumturquoise:"#48D1CC",mediumvioletred:"#C71585",midnightblue:"#191970",mintcream:"#F5FFFA",mistyrose:"#FFE4E1",moccasin:"#FFE4B5",navajowhite:"#FFDEAD",oldlace:"#FDF5E6",olivedrab:"#6B8E23",orange:"#FFA500",orangered:"#FF4500",orchid:"#DA70D6",palegoldenrod:"#EEE8AA",palegreen:"#98FB98",paleturquoise:"#AFEEEE",palevioletred:"#DB7093",papayawhip:"#FFEFD5",peachpuff:"#FFDAB9",peru:"#CD853F",pink:"#FFC0CB",plum:"#DDA0DD",powderblue:"#B0E0E6",rosybrown:"#BC8F8F",royalblue:"#4169E1",saddlebrown:"#8B4513",salmon:"#FA8072",sandybrown:"#F4A460",seagreen:"#2E8B57",seashell:"#FFF5EE",sienna:"#A0522D",skyblue:"#87CEEB",slateblue:"#6A5ACD",slategray:"#708090",slategrey:"#708090",snow:"#FFFAFA",springgreen:"#00FF7F",steelblue:"#4682B4",tan:"#D2B48C",thistle:"#D8BFD8",tomato:"#FF6347",turquoise:"#40E0D0",violet:"#EE82EE",wheat:"#F5DEB3",whitesmoke:"#F5F5F5",yellowgreen:"#9ACD32"},R={},G={style:"normal",variant:"normal",weight:"normal",size:12,family:"å¾®è½¯é›…é»‘"},Y={},Z={butt:"flat",round:"round"},Q=b.prototype;Q.clearRect=function(){this.textMeasureEl_&&(this.textMeasureEl_.removeNode(!0),this.textMeasureEl_=null),this.element_.innerHTML=""},Q.beginPath=function(){this.currentPath_=[]},Q.moveTo=function(e,t){var i=v(this,e,t);this.currentPath_.push({type:"moveTo",x:i.x,y:i.y}),this.currentX_=i.x,this.currentY_=i.y},Q.lineTo=function(e,t){var i=v(this,e,t);this.currentPath_.push({type:"lineTo",x:i.x,y:i.y}),this.currentX_=i.x,this.currentY_=i.y},Q.bezierCurveTo=function(e,t,i,n,a,o){var r=v(this,a,o),s=v(this,e,t),l=v(this,i,n);_(this,s,l,r)},Q.quadraticCurveTo=function(e,t,i,n){var a=v(this,e,t),o=v(this,i,n),r={x:this.currentX_+2/3*(a.x-this.currentX_),y:this.currentY_+2/3*(a.y-this.currentY_)},s={x:r.x+(o.x-this.currentX_)/3,y:r.y+(o.y-this.currentY_)/3};_(this,r,s,o)},Q.arc=function(e,t,i,n,a,o){i*=F;var r=o?"at":"wa",s=e+z(n)*i-J,l=t+E(n)*i-J,h=e+z(a)*i-J,d=t+E(a)*i-J;s!=h||o||(s+=.125);var c=v(this,e,t),m=v(this,s,l),p=v(this,h,d);this.currentPath_.push({type:r,x:c.x,y:c.y,radius:i,xStart:m.x,yStart:m.y,xEnd:p.x,yEnd:p.y})},Q.rect=function(e,t,i,n){this.moveTo(e,t),this.lineTo(e+i,t),this.lineTo(e+i,t+n),this.lineTo(e,t+n),this.closePath()},Q.strokeRect=function(e,t,i,n){var a=this.currentPath_;this.beginPath(),this.moveTo(e,t),this.lineTo(e+i,t),this.lineTo(e+i,t+n),this.lineTo(e,t+n),this.closePath(),this.stroke(),this.currentPath_=a},Q.fillRect=function(e,t,i,n){var a=this.currentPath_;this.beginPath(),this.moveTo(e,t),this.lineTo(e+i,t),this.lineTo(e+i,t+n),this.lineTo(e,t+n),this.closePath(),this.fill(),this.currentPath_=a},Q.createLinearGradient=function(e,t,i,n){var a=new W("gradient");return a.x0_=e,a.y0_=t,a.x1_=i,a.y1_=n,a},Q.createRadialGradient=function(e,t,i,n,a,o){var r=new W("gradientradial");return r.x0_=e,r.y0_=t,r.r0_=i,r.x1_=n,r.y1_=a,r.r1_=o,r},Q.drawImage=function(e){var t,i,n,a,o,r,s,l,h=e.runtimeStyle.width,d=e.runtimeStyle.height;e.runtimeStyle.width="auto",e.runtimeStyle.height="auto";var c=e.width,m=e.height;if(e.runtimeStyle.width=h,e.runtimeStyle.height=d,3==arguments.length)t=arguments[1],i=arguments[2],o=r=0,s=n=c,l=a=m;else if(5==arguments.length)t=arguments[1],i=arguments[2],n=arguments[3],a=arguments[4],o=r=0,s=c,l=m;else{if(9!=arguments.length)throw Error("Invalid number of arguments");o=arguments[1],r=arguments[2],s=arguments[3],l=arguments[4],t=arguments[5],i=arguments[6],n=arguments[7],a=arguments[8]}var p=v(this,t,i),u=[],V=10,U=10,g=y=1;if(u.push(" <g_vml_:group",' coordsize="',F*V,",",F*U,'"',' coordorigin="0,0"',' style="width:',V,"px;height:",U,"px;position:absolute;"),1!=this.m_[0][0]||this.m_[0][1]||1!=this.m_[1][1]||this.m_[1][0]){var f=[],g=this.scaleX_,y=this.scaleY_;f.push("M11=",this.m_[0][0]/g,",","M12=",this.m_[1][0]/y,",","M21=",this.m_[0][1]/g,",","M22=",this.m_[1][1]/y,",","Dx=",T(p.x/F),",","Dy=",T(p.y/F),"");var b=p,_=v(this,t+n,i),x=v(this,t,i+a),k=v(this,t+n,i+a);b.x=C.max(b.x,_.x,x.x,k.x),b.y=C.max(b.y,_.y,x.y,k.y),u.push("padding:0 ",T(b.x/F),"px ",T(b.y/F),"px 0;filter:progid:DXImageTransform.Microsoft.Matrix(",f.join(""),", SizingMethod='clip');")}else u.push("top:",T(p.y/F),"px;left:",T(p.x/F),"px;");u.push(' ">'),(o||r)&&u.push('<div style="overflow: hidden; width:',Math.ceil((n+o*n/s)*g),"px;"," height:",Math.ceil((a+r*a/l)*y),"px;"," filter:progid:DxImageTransform.Microsoft.Matrix(Dx=",-o*n/s*g,",Dy=",-r*a/l*y,');">'),u.push('<div style="width:',Math.round(g*c*n/s),"px;"," height:",Math.round(y*m*a/l),"px;"," filter:"),this.globalAlpha<1&&u.push(" progid:DXImageTransform.Microsoft.Alpha(opacity="+100*this.globalAlpha+")"),u.push(" progid:DXImageTransform.Microsoft.AlphaImageLoader(src=",e.src,',sizingMethod=scale)">'),(o||r)&&u.push("</div>"),u.push("</div></div>"),this.element_.insertAdjacentHTML("BeforeEnd",u.join(""))},Q.stroke=function(e){var t=[],i=10,n=10;t.push("<g_vml_:shape",' filled="',!!e,'"',' style="position:absolute;width:',i,"px;height:",n,'px;"',' coordorigin="0,0"',' coordsize="',F*i,",",F*n,'"',' stroked="',!e,'"',' path="');for(var a={x:null,y:null},o={x:null,y:null},r=0;r<this.currentPath_.length;r++){var s,l=this.currentPath_[r];switch(l.type){case"moveTo":s=l,t.push(" m ",T(l.x),",",T(l.y));break;case"lineTo":t.push(" l ",T(l.x),",",T(l.y));break;case"close":t.push(" x "),l=null;break;case"bezierCurveTo":t.push(" c ",T(l.cp1x),",",T(l.cp1y),",",T(l.cp2x),",",T(l.cp2y),",",T(l.x),",",T(l.y));break;case"at":case"wa":t.push(" ",l.type," ",T(l.x-this.scaleX_*l.radius),",",T(l.y-this.scaleY_*l.radius)," ",T(l.x+this.scaleX_*l.radius),",",T(l.y+this.scaleY_*l.radius)," ",T(l.xStart),",",T(l.yStart)," ",T(l.xEnd),",",T(l.yEnd))}l&&((null==a.x||l.x<a.x)&&(a.x=l.x),(null==o.x||l.x>o.x)&&(o.x=l.x),(null==a.y||l.y<a.y)&&(a.y=l.y),(null==o.y||l.y>o.y)&&(o.y=l.y))}t.push(' ">'),e?k(this,t,a,o):x(this,t),t.push("</g_vml_:shape>"),this.element_.insertAdjacentHTML("beforeEnd",t.join(""))},Q.fill=function(){this.stroke(!0)},Q.closePath=function(){this.currentPath_.push({type:"close"})},Q.save=function(){var e={};h(this,e),this.aStack_.push(e),this.mStack_.push(this.m_),this.m_=l(s(),this.m_)},Q.restore=function(){this.aStack_.length&&(h(this.aStack_.pop(),this),this.m_=this.mStack_.pop())},Q.translate=function(e,t){var i=[[1,0,0],[0,1,0],[e,t,1]];w(this,l(i,this.m_),!1)},Q.rotate=function(e){var t=z(e),i=E(e),n=[[t,i,0],[-i,t,0],[0,0,1]];w(this,l(n,this.m_),!1)},Q.scale=function(e,t){var i=[[e,0,0],[0,t,0],[0,0,1]];w(this,l(i,this.m_),!0)},Q.transform=function(e,t,i,n,a,o){var r=[[e,t,0],[i,n,0],[a,o,1]];w(this,l(r,this.m_),!0)},Q.setTransform=function(e,t,i,n,a,o){var r=[[e,t,0],[i,n,0],[a,o,1]];w(this,r,!0)},Q.drawText_=function(e,t,n,a,o){var r=this.m_,s=1e3,l=0,h=s,d={x:0,y:0},c=[],m=g(U(this.font),this.element_),p=f(m),u=this.element_.currentStyle,V=this.textAlign.toLowerCase();

switch(V){case"left":case"center":case"right":break;case"end":V="ltr"==u.direction?"right":"left";break;case"start":V="rtl"==u.direction?"right":"left";break;default:V="left"}switch(this.textBaseline){case"hanging":case"top":d.y=m.size/1.75;break;case"middle":break;default:case null:case"alphabetic":case"ideographic":case"bottom":d.y=-m.size/2.25}switch(V){case"right":l=s,h=.05;break;case"center":l=h=s/2}var y=v(this,t+d.x,n+d.y);c.push('<g_vml_:line from="',-l,' 0" to="',h,' 0.05" ',' coordsize="100 100" coordorigin="0 0"',' filled="',!o,'" stroked="',!!o,'" style="position:absolute;width:1px;height:1px;">'),o?x(this,c):k(this,c,{x:-l,y:0},{x:h,y:m.size});var b=r[0][0].toFixed(3)+","+r[1][0].toFixed(3)+","+r[0][1].toFixed(3)+","+r[1][1].toFixed(3)+",0,0",_=T(y.x/F)+","+T(y.y/F);c.push('<g_vml_:skew on="t" matrix="',b,'" ',' offset="',_,'" origin="',l,' 0" />','<g_vml_:path textpathok="true" />','<g_vml_:textpath on="true" string="',i(e),'" style="v-text-align:',V,";font:",i(p),'" /></g_vml_:line>'),this.element_.insertAdjacentHTML("beforeEnd",c.join(""))},Q.fillText=function(e,t,i,n){this.drawText_(e,t,i,n,!1)},Q.strokeText=function(e,t,i,n){this.drawText_(e,t,i,n,!0)},Q.measureText=function(e){if(!this.textMeasureEl_){var t='<span style="position:absolute;top:-20000px;left:0;padding:0;margin:0;border:none;white-space:pre;"></span>';this.element_.insertAdjacentHTML("beforeEnd",t),this.textMeasureEl_=this.element_.lastChild}var i=this.element_.ownerDocument;this.textMeasureEl_.innerHTML="";try{this.textMeasureEl_.style.font=this.font}catch(n){}return this.textMeasureEl_.appendChild(i.createTextNode(e)),{width:this.textMeasureEl_.offsetWidth}},Q.clip=function(){},Q.arcTo=function(){},Q.createPattern=function(e,t){return new X(e,t)},W.prototype.addColorStop=function(e,t){t=V(t),this.colors_.push({offset:e,color:t.color,alpha:t.alpha})};var q=K.prototype=new Error;q.INDEX_SIZE_ERR=1,q.DOMSTRING_SIZE_ERR=2,q.HIERARCHY_REQUEST_ERR=3,q.WRONG_DOCUMENT_ERR=4,q.INVALID_CHARACTER_ERR=5,q.NO_DATA_ALLOWED_ERR=6,q.NO_MODIFICATION_ALLOWED_ERR=7,q.NOT_FOUND_ERR=8,q.NOT_SUPPORTED_ERR=9,q.INUSE_ATTRIBUTE_ERR=10,q.INVALID_STATE_ERR=11,q.SYNTAX_ERR=12,q.INVALID_MODIFICATION_ERR=13,q.NAMESPACE_ERR=14,q.INVALID_ACCESS_ERR=15,q.VALIDATION_ERR=16,q.TYPE_MISMATCH_ERR=17,G_vmlCanvasManager=P,CanvasRenderingContext2D=b,CanvasGradient=W,CanvasPattern=X,DOMException=K}(),G_vmlCanvasManager}),define("zrender/mixin/Eventful",["require"],function(){var e=function(){this._handlers={}};return e.prototype.one=function(e,t,i){var n=this._handlers;return t&&e?(n[e]||(n[e]=[]),n[e].push({h:t,one:!0,ctx:i||this}),this):this},e.prototype.bind=function(e,t,i){var n=this._handlers;return t&&e?(n[e]||(n[e]=[]),n[e].push({h:t,one:!1,ctx:i||this}),this):this},e.prototype.unbind=function(e,t){var i=this._handlers;if(!e)return this._handlers={},this;if(t){if(i[e]){for(var n=[],a=0,o=i[e].length;o>a;a++)i[e][a].h!=t&&n.push(i[e][a]);i[e]=n}i[e]&&0===i[e].length&&delete i[e]}else delete i[e];return this},e.prototype.dispatch=function(e){if(this._handlers[e]){var t=arguments,i=t.length;i>3&&(t=Array.prototype.slice.call(t,1));for(var n=this._handlers[e],a=n.length,o=0;a>o;){switch(i){case 1:n[o].h.call(n[o].ctx);break;case 2:n[o].h.call(n[o].ctx,t[1]);break;case 3:n[o].h.call(n[o].ctx,t[1],t[2]);break;default:n[o].h.apply(n[o].ctx,t)}n[o].one?(n.splice(o,1),a--):o++}}return this},e.prototype.dispatchWithContext=function(e){if(this._handlers[e]){var t=arguments,i=t.length;i>4&&(t=Array.prototype.slice.call(t,1,t.length-1));for(var n=t[t.length-1],a=this._handlers[e],o=a.length,r=0;o>r;){switch(i){case 1:a[r].h.call(n);break;case 2:a[r].h.call(n,t[1]);break;case 3:a[r].h.call(n,t[1],t[2]);break;default:a[r].h.apply(n,t)}a[r].one?(a.splice(r,1),o--):r++}}return this},e}),define("zrender/tool/log",["require","../config"],function(e){var t=e("../config");return function(){if(0!==t.debugMode)if(1==t.debugMode)for(var e in arguments)throw new Error(arguments[e]);else if(t.debugMode>1)for(var e in arguments)console.log(arguments[e])}}),define("zrender/tool/guid",[],function(){var e=2311;return function(){return"zrender__"+e++}}),define("zrender/Handler",["require","./config","./tool/env","./tool/event","./tool/util","./tool/vector","./tool/matrix","./mixin/Eventful"],function(e){"use strict";function t(e,t){return function(i,n){return e.call(t,i,n)}}function i(e,t){return function(i,n,a){return e.call(t,i,n,a)}}function n(e){for(var i=p.length;i--;){var n=p[i];e["_"+n+"Handler"]=t(V[n],e)}}function a(e,t,i){if(this._draggingTarget&&this._draggingTarget.id==e.id||e.isSilent())return!1;var n=this._event;if(e.isCover(t,i)){e.hoverable&&this.storage.addHover(e);for(var a=e.parent;a;){if(a.clipShape&&!a.clipShape.isCover(this._mouseX,this._mouseY))return!1;a=a.parent}return this._lastHover!=e&&(this._processOutShape(n),this._processDragLeave(n),this._lastHover=e,this._processDragEnter(n)),this._processOverShape(n),this._processDragOver(n),this._hasfound=1,!0}return!1}var o=e("./config"),r=e("./tool/env"),s=e("./tool/event"),l=e("./tool/util"),h=e("./tool/vector"),d=e("./tool/matrix"),c=o.EVENT,m=e("./mixin/Eventful"),p=["resize","click","dblclick","mousewheel","mousemove","mouseout","mouseup","mousedown","touchstart","touchend","touchmove"],u=function(e){if(window.G_vmlCanvasManager)return!0;e=e||window.event;var t=e.toElement||e.relatedTarget||e.srcElement||e.target;return t&&t.className.match(o.elementClassName)},V={resize:function(e){e=e||window.event,this._lastHover=null,this._isMouseDown=0,this.dispatch(c.RESIZE,e)},click:function(e,t){if(u(e)||t){e=this._zrenderEventFixed(e);var i=this._lastHover;(i&&i.clickable||!i)&&this._clickThreshold<5&&this._dispatchAgency(i,c.CLICK,e),this._mousemoveHandler(e)}},dblclick:function(e,t){if(u(e)||t){e=e||window.event,e=this._zrenderEventFixed(e);var i=this._lastHover;(i&&i.clickable||!i)&&this._clickThreshold<5&&this._dispatchAgency(i,c.DBLCLICK,e),this._mousemoveHandler(e)}},mousewheel:function(e,t){if(u(e)||t){e=this._zrenderEventFixed(e);var i=e.wheelDelta||-e.detail,n=i>0?1.1:1/1.1,a=!1,o=this._mouseX,r=this._mouseY;this.painter.eachBuildinLayer(function(t){var i=t.position;if(t.zoomable){t.__zoom=t.__zoom||1;var l=t.__zoom;l*=n,l=Math.max(Math.min(t.maxZoom,l),t.minZoom),n=l/t.__zoom,t.__zoom=l,i[0]-=(o-i[0])*(n-1),i[1]-=(r-i[1])*(n-1),t.scale[0]*=n,t.scale[1]*=n,t.dirty=!0,a=!0,s.stop(e)}}),a&&this.painter.refresh(),this._dispatchAgency(this._lastHover,c.MOUSEWHEEL,e),this._mousemoveHandler(e)}},mousemove:function(e,t){if((u(e)||t)&&!this.painter.isLoading()){e=this._zrenderEventFixed(e),this._lastX=this._mouseX,this._lastY=this._mouseY,this._mouseX=s.getX(e),this._mouseY=s.getY(e);var i=this._mouseX-this._lastX,n=this._mouseY-this._lastY;this._processDragStart(e),this._hasfound=0,this._event=e,this._iterateAndFindHover(),this._hasfound||((!this._draggingTarget||this._lastHover&&this._lastHover!=this._draggingTarget)&&(this._processOutShape(e),this._processDragLeave(e)),this._lastHover=null,this.storage.delHover(),this.painter.clearHover());var a="default";if(this._draggingTarget)this.storage.drift(this._draggingTarget.id,i,n),this._draggingTarget.modSelf(),this.storage.addHover(this._draggingTarget),this._clickThreshold++;else if(this._isMouseDown){var o=!1;this.painter.eachBuildinLayer(function(e){e.panable&&(a="move",e.position[0]+=i,e.position[1]+=n,o=!0,e.dirty=!0)}),o&&this.painter.refresh()}this._draggingTarget||this._hasfound&&this._lastHover.draggable?a="move":this._hasfound&&this._lastHover.clickable&&(a="pointer"),this.root.style.cursor=a,this._dispatchAgency(this._lastHover,c.MOUSEMOVE,e),(this._draggingTarget||this._hasfound||this.storage.hasHoverShape())&&this.painter.refreshHover()}},mouseout:function(e,t){if(u(e)||t){e=this._zrenderEventFixed(e);var i=e.toElement||e.relatedTarget;if(i!=this.root)for(;i&&9!=i.nodeType;){if(i==this.root)return void this._mousemoveHandler(e);i=i.parentNode}e.zrenderX=this._lastX,e.zrenderY=this._lastY,this.root.style.cursor="default",this._isMouseDown=0,this._processOutShape(e),this._processDrop(e),this._processDragEnd(e),this.painter.isLoading()||this.painter.refreshHover(),this.dispatch(c.GLOBALOUT,e)}},mousedown:function(e,t){if(u(e)||t){if(this._clickThreshold=0,2==this._lastDownButton)return this._lastDownButton=e.button,void(this._mouseDownTarget=null);this._lastMouseDownMoment=new Date,e=this._zrenderEventFixed(e),this._isMouseDown=1,this._mouseDownTarget=this._lastHover,this._dispatchAgency(this._lastHover,c.MOUSEDOWN,e),this._lastDownButton=e.button}},mouseup:function(e,t){(u(e)||t)&&(e=this._zrenderEventFixed(e),this.root.style.cursor="default",this._isMouseDown=0,this._mouseDownTarget=null,this._dispatchAgency(this._lastHover,c.MOUSEUP,e),this._processDrop(e),this._processDragEnd(e))},touchstart:function(e,t){(u(e)||t)&&(e=this._zrenderEventFixed(e,!0),this._lastTouchMoment=new Date,this._mobileFindFixed(e),this._mousedownHandler(e))},touchmove:function(e,t){(u(e)||t)&&(e=this._zrenderEventFixed(e,!0),this._mousemoveHandler(e),this._isDragging&&s.stop(e))},touchend:function(e,t){if(u(e)||t){e=this._zrenderEventFixed(e,!0),this._mouseupHandler(e);var i=new Date;i-this._lastTouchMoment<c.touchClickDelay&&(this._mobileFindFixed(e),this._clickHandler(e),i-this._lastClickMoment<c.touchClickDelay/2&&(this._dblclickHandler(e),this._lastHover&&this._lastHover.clickable&&s.stop(e)),this._lastClickMoment=i),this.painter.clearHover()}}},U=function(e,t,o){m.call(this),this.root=e,this.storage=t,this.painter=o,this._lastX=this._lastY=this._mouseX=this._mouseY=0,this._findHover=i(a,this),this._domHover=o.getDomHover(),n(this),window.addEventListener?(window.addEventListener("resize",this._resizeHandler),r.os.tablet||r.os.phone?(e.addEventListener("touchstart",this._touchstartHandler),e.addEventListener("touchmove",this._touchmoveHandler),e.addEventListener("touchend",this._touchendHandler)):(e.addEventListener("click",this._clickHandler),e.addEventListener("dblclick",this._dblclickHandler),e.addEventListener("mousewheel",this._mousewheelHandler),e.addEventListener("mousemove",this._mousemoveHandler),e.addEventListener("mousedown",this._mousedownHandler),e.addEventListener("mouseup",this._mouseupHandler)),e.addEventListener("DOMMouseScroll",this._mousewheelHandler),e.addEventListener("mouseout",this._mouseoutHandler)):(window.attachEvent("onresize",this._resizeHandler),e.attachEvent("onclick",this._clickHandler),e.ondblclick=this._dblclickHandler,e.attachEvent("onmousewheel",this._mousewheelHandler),e.attachEvent("onmousemove",this._mousemoveHandler),e.attachEvent("onmouseout",this._mouseoutHandler),e.attachEvent("onmousedown",this._mousedownHandler),e.attachEvent("onmouseup",this._mouseupHandler))};U.prototype.on=function(e,t,i){return this.bind(e,t,i),this},U.prototype.un=function(e,t){return this.unbind(e,t),this},U.prototype.trigger=function(e,t){switch(e){case c.RESIZE:case c.CLICK:case c.DBLCLICK:case c.MOUSEWHEEL:case c.MOUSEMOVE:case c.MOUSEDOWN:case c.MOUSEUP:case c.MOUSEOUT:this["_"+e+"Handler"](t,!0)}},U.prototype.dispose=function(){var e=this.root;window.removeEventListener?(window.removeEventListener("resize",this._resizeHandler),r.os.tablet||r.os.phone?(e.removeEventListener("touchstart",this._touchstartHandler),e.removeEventListener("touchmove",this._touchmoveHandler),e.removeEventListener("touchend",this._touchendHandler)):(e.removeEventListener("click",this._clickHandler),e.removeEventListener("dblclick",this._dblclickHandler),e.removeEventListener("mousewheel",this._mousewheelHandler),e.removeEventListener("mousemove",this._mousemoveHandler),e.removeEventListener("mousedown",this._mousedownHandler),e.removeEventListener("mouseup",this._mouseupHandler)),e.removeEventListener("DOMMouseScroll",this._mousewheelHandler),e.removeEventListener("mouseout",this._mouseoutHandler)):(window.detachEvent("onresize",this._resizeHandler),e.detachEvent("onclick",this._clickHandler),e.detachEvent("dblclick",this._dblclickHandler),e.detachEvent("onmousewheel",this._mousewheelHandler),e.detachEvent("onmousemove",this._mousemoveHandler),e.detachEvent("onmouseout",this._mouseoutHandler),e.detachEvent("onmousedown",this._mousedownHandler),e.detachEvent("onmouseup",this._mouseupHandler)),this.root=this._domHover=this.storage=this.painter=null,this.un()},U.prototype._processDragStart=function(e){var t=this._lastHover;if(this._isMouseDown&&t&&t.draggable&&!this._draggingTarget&&this._mouseDownTarget==t){if(t.dragEnableTime&&new Date-this._lastMouseDownMoment<t.dragEnableTime)return;var i=t;this._draggingTarget=i,this._isDragging=1,i.invisible=!0,this.storage.mod(i.id),this._dispatchAgency(i,c.DRAGSTART,e),this.painter.refresh()}},U.prototype._processDragEnter=function(e){this._draggingTarget&&this._dispatchAgency(this._lastHover,c.DRAGENTER,e,this._draggingTarget)},U.prototype._processDragOver=function(e){this._draggingTarget&&this._dispatchAgency(this._lastHover,c.DRAGOVER,e,this._draggingTarget)},U.prototype._processDragLeave=function(e){this._draggingTarget&&this._dispatchAgency(this._lastHover,c.DRAGLEAVE,e,this._draggingTarget)},U.prototype._processDrop=function(e){this._draggingTarget&&(this._draggingTarget.invisible=!1,this.storage.mod(this._draggingTarget.id),this.painter.refresh(),this._dispatchAgency(this._lastHover,c.DROP,e,this._draggingTarget))},U.prototype._processDragEnd=function(e){this._draggingTarget&&(this._dispatchAgency(this._draggingTarget,c.DRAGEND,e),this._lastHover=null),this._isDragging=0,this._draggingTarget=null},U.prototype._processOverShape=function(e){this._dispatchAgency(this._lastHover,c.MOUSEOVER,e)},U.prototype._processOutShape=function(e){this._dispatchAgency(this._lastHover,c.MOUSEOUT,e)},U.prototype._dispatchAgency=function(e,t,i,n){var a="on"+t,o={type:t,event:i,target:e,cancelBubble:!1},r=e;for(n&&(o.dragged=n);r&&(r[a]&&(o.cancelBubble=r[a](o)),r.dispatch(t,o),r=r.parent,!o.cancelBubble););if(e)o.cancelBubble||this.dispatch(t,o);else if(!n){var s={type:t,event:i};this.dispatch(t,s),this.painter.eachOtherLayer(function(e){"function"==typeof e[a]&&e[a](s),e.dispatch&&e.dispatch(t,s)})}},U.prototype._iterateAndFindHover=function(){var e=d.create();return function(){for(var t,i,n=this.storage.getShapeList(),a=[0,0],o=n.length-1;o>=0;o--){var r=n[o];if(t!==r.zlevel&&(i=this.painter.getLayer(r.zlevel,i),a[0]=this._mouseX,a[1]=this._mouseY,i.needTransform&&(d.invert(e,i.transform),h.applyTransform(a,a,e))),this._findHover(r,a[0],a[1]))break}}}();var g=[{x:10},{x:-20},{x:10,y:10},{y:-20}];return U.prototype._mobileFindFixed=function(e){this._lastHover=null,this._mouseX=e.zrenderX,this._mouseY=e.zrenderY,this._event=e,this._iterateAndFindHover();for(var t=0;!this._lastHover&&t<g.length;t++){var i=g[t];i.x&&(this._mouseX+=i.x),i.y&&(this._mouseY+=i.y),this._iterateAndFindHover()}this._lastHover&&(e.zrenderX=this._mouseX,e.zrenderY=this._mouseY)},U.prototype._zrenderEventFixed=function(e,t){if(e.zrenderFixed)return e;if(t){var i="touchend"!=e.type?e.targetTouches[0]:e.changedTouches[0];if(i){var n=this.painter._domRoot.getBoundingClientRect();e.zrenderX=i.clientX-n.left,e.zrenderY=i.clientY-n.top}}else{e=e||window.event;var a=e.toElement||e.relatedTarget||e.srcElement||e.target;a&&a!=this._domHover&&(e.zrenderX=("undefined"!=typeof e.offsetX?e.offsetX:e.layerX)+a.offsetLeft,e.zrenderY=("undefined"!=typeof e.offsetY?e.offsetY:e.layerY)+a.offsetTop)}return e.zrenderFixed=1,e},l.merge(U.prototype,m.prototype,!0),U}),define("zrender/Painter",["require","./config","./tool/util","./tool/log","./loadingEffect/Base","./Layer","./shape/Image"],function(e){"use strict";function t(){return!1}function i(){}function n(e){return e?e.isBuildin?!0:"function"!=typeof e.resize||"function"!=typeof e.refresh?!1:!0:!1}var a=e("./config"),o=e("./tool/util"),r=e("./tool/log"),s=e("./loadingEffect/Base"),l=e("./Layer"),h=function(e,i){this.root=e,e.style["-webkit-tap-highlight-color"]="transparent",e.style["-webkit-user-select"]="none",e.style["user-select"]="none",e.style["-webkit-touch-callout"]="none",this.storage=i,e.innerHTML="",this._width=this._getWidth(),this._height=this._getHeight();var n=document.createElement("div");this._domRoot=n,n.style.position="relative",n.style.overflow="hidden",n.style.width=this._width+"px",n.style.height=this._height+"px",e.appendChild(n),this._layers={},this._zlevelList=[],this._layerConfig={},this._loadingEffect=new s({}),this.shapeToImage=this._createShapeToImageProcessor(),this._bgDom=document.createElement("div"),this._bgDom.style.cssText=["position:absolute;left:0px;top:0px;width:",this._width,"px;height:",this._height+"px;","-webkit-user-select:none;user-select;none;","-webkit-touch-callout:none;"].join(""),this._bgDom.setAttribute("data-zr-dom-id","bg"),this._bgDom.className=a.elementClassName,n.appendChild(this._bgDom),this._bgDom.onselectstart=t;var o=new l("_zrender_hover_",this);this._layers.hover=o,n.appendChild(o.dom),o.initContext(),o.dom.onselectstart=t,o.dom.style["-webkit-user-select"]="none",o.dom.style["user-select"]="none",o.dom.style["-webkit-touch-callout"]="none",this.refreshNextFrame=null};return h.prototype.render=function(e){return this.isLoading()&&this.hideLoading(),this.refresh(e,!0),this},h.prototype.refresh=function(e,t){var i=this.storage.getShapeList(!0);this._paintList(i,t);for(var n=0;n<this._zlevelList.length;n++){var a=this._zlevelList[n],o=this._layers[a];!o.isBuildin&&o.refresh&&o.refresh()}return"function"==typeof e&&e(),this},h.prototype._preProcessLayer=function(e){e.unusedCount++,e.updateTransform()},h.prototype._postProcessLayer=function(e){e.dirty=!1,1==e.unusedCount&&e.clear()},h.prototype._paintList=function(e,t){"undefined"==typeof t&&(t=!1),this._updateLayerStatus(e);var i,n,o;this.eachBuildinLayer(this._preProcessLayer);for(var s=0,l=e.length;l>s;s++){var h=e[s];if(n!==h.zlevel&&(i&&(i.needTransform&&o.restore(),o.flush&&o.flush()),n=h.zlevel,i=this.getLayer(n),i.isBuildin||r("ZLevel "+n+" has been used by unkown layer "+i.id),o=i.ctx,i.unusedCount=0,(i.dirty||t)&&i.clear(),i.needTransform&&(o.save(),i.setTransform(o))),(i.dirty||t)&&!h.invisible&&(!h.onbrush||h.onbrush&&!h.onbrush(o,!1)))if(a.catchBrushException)try{h.brush(o,!1,this.refreshNextFrame)}catch(d){r(d,"brush error of "+h.type,h)}else h.brush(o,!1,this.refreshNextFrame);h.__dirty=!1}i&&(i.needTransform&&o.restore(),o.flush&&o.flush()),this.eachBuildinLayer(this._postProcessLayer)},h.prototype.getLayer=function(e){var t=this._layers[e];return t||(t=new l(e,this),t.isBuildin=!0,this._layerConfig[e]&&o.merge(t,this._layerConfig[e],!0),t.updateTransform(),this.insertLayer(e,t),t.initContext()),t},h.prototype.insertLayer=function(e,t){if(this._layers[e])return void r("ZLevel "+e+" has been used already");if(!n(t))return void r("Layer of zlevel "+e+" is not valid");var i=this._zlevelList.length,a=null,o=-1;if(i>0&&e>this._zlevelList[0]){for(o=0;i-1>o&&!(this._zlevelList[o]<e&&this._zlevelList[o+1]>e);o++);a=this._layers[this._zlevelList[o]]}this._zlevelList.splice(o+1,0,e);var s=a?a.dom:this._bgDom;s.nextSibling?s.parentNode.insertBefore(t.dom,s.nextSibling):s.parentNode.appendChild(t.dom),this._layers[e]=t},h.prototype.eachLayer=function(e,t){for(var i=0;i<this._zlevelList.length;i++){var n=this._zlevelList[i];e.call(t,this._layers[n],n)}},h.prototype.eachBuildinLayer=function(e,t){for(var i=0;i<this._zlevelList.length;i++){var n=this._zlevelList[i],a=this._layers[n];a.isBuildin&&e.call(t,a,n)}},h.prototype.eachOtherLayer=function(e,t){for(var i=0;i<this._zlevelList.length;i++){var n=this._zlevelList[i],a=this._layers[n];a.isBuildin||e.call(t,a,n)}},h.prototype.getLayers=function(){return this._layers},h.prototype._updateLayerStatus=function(e){var t=this._layers,i={};this.eachBuildinLayer(function(e,t){i[t]=e.elCount,e.elCount=0});for(var n=0,a=e.length;a>n;n++){var o=e[n],r=o.zlevel,s=t[r];if(s){if(s.elCount++,s.dirty)continue;s.dirty=o.__dirty}}this.eachBuildinLayer(function(e,t){i[t]!==e.elCount&&(e.dirty=!0)})},h.prototype.refreshShapes=function(e,t){for(var i=0,n=e.length;n>i;i++){var a=e[i];a.modSelf()}return this.refresh(t),this},h.prototype.setLoadingEffect=function(e){return this._loadingEffect=e,this},h.prototype.clear=function(){return this.eachBuildinLayer(this._clearLayer),this},h.prototype._clearLayer=function(e){e.clear()},h.prototype.modLayer=function(e,t){if(t){this._layerConfig[e]?o.merge(this._layerConfig[e],t,!0):this._layerConfig[e]=t;var i=this._layers[e];i&&o.merge(i,this._layerConfig[e],!0)}},h.prototype.delLayer=function(e){var t=this._layers[e];t&&(this.modLayer(e,{position:t.position,rotation:t.rotation,scale:t.scale}),t.dom.parentNode.removeChild(t.dom),delete this._layers[e],this._zlevelList.splice(o.indexOf(this._zlevelList,e),1))},h.prototype.refreshHover=function(){this.clearHover();for(var e=this.storage.getHoverShapes(!0),t=0,i=e.length;i>t;t++)this._brushHover(e[t]);var n=this._layers.hover.ctx;return n.flush&&n.flush(),this.storage.delHover(),this},h.prototype.clearHover=function(){var e=this._layers.hover;return e&&e.clear(),this},h.prototype.showLoading=function(e){return this._loadingEffect&&this._loadingEffect.stop(),e&&this.setLoadingEffect(e),this._loadingEffect.start(this),this.loading=!0,this},h.prototype.hideLoading=function(){return this._loadingEffect.stop(),this.clearHover(),this.loading=!1,this},h.prototype.isLoading=function(){return this.loading},h.prototype.resize=function(){var e=this._domRoot;e.style.display="none";var t=this._getWidth(),i=this._getHeight();if(e.style.display="",this._width!=t||i!=this._height){this._width=t,this._height=i,e.style.width=t+"px",e.style.height=i+"px";for(var n in this._layers)this._layers[n].resize(t,i);this.refresh(null,!0)}return this},h.prototype.clearLayer=function(e){var t=this._layers[e];t&&t.clear()},h.prototype.dispose=function(){this.isLoading()&&this.hideLoading(),this.root.innerHTML="",this.root=this.storage=this._domRoot=this._layers=null},h.prototype.getDomHover=function(){return this._layers.hover.dom},h.prototype.toDataURL=function(e,t,i){if(window.G_vmlCanvasManager)return null;var n=new l("image",this);this._bgDom.appendChild(n.dom),n.initContext();var o=n.ctx;n.clearColor=t||"#fff",n.clear();var s=this;this.storage.iterShape(function(e){if(!e.invisible&&(!e.onbrush||e.onbrush&&!e.onbrush(o,!1)))if(a.catchBrushException)try{e.brush(o,!1,s.refreshNextFrame)}catch(t){r(t,"brush error of "+e.type,e)}else e.brush(o,!1,s.refreshNextFrame)},{normal:"up",update:!0});var h=n.dom.toDataURL(e,i);return o=null,this._bgDom.removeChild(n.dom),h},h.prototype.getWidth=function(){return this._width},h.prototype.getHeight=function(){return this._height},h.prototype._getWidth=function(){var e=this.root,t=e.currentStyle||document.defaultView.getComputedStyle(e);return((e.clientWidth||parseInt(t.width,10))-parseInt(t.paddingLeft,10)-parseInt(t.paddingRight,10)).toFixed(0)-0},h.prototype._getHeight=function(){var e=this.root,t=e.currentStyle||document.defaultView.getComputedStyle(e);return((e.clientHeight||parseInt(t.height,10))-parseInt(t.paddingTop,10)-parseInt(t.paddingBottom,10)).toFixed(0)-0},h.prototype._brushHover=function(e){var t=this._layers.hover.ctx;if(!e.onbrush||e.onbrush&&!e.onbrush(t,!0)){var i=this.getLayer(e.zlevel);if(i.needTransform&&(t.save(),i.setTransform(t)),a.catchBrushException)try{e.brush(t,!0,this.refreshNextFrame)}catch(n){r(n,"hoverBrush error of "+e.type,e)}else e.brush(t,!0,this.refreshNextFrame);i.needTransform&&t.restore()}},h.prototype._shapeToImage=function(t,i,n,a,o){var r=document.createElement("canvas"),s=r.getContext("2d");r.style.width=n+"px",r.style.height=a+"px",r.setAttribute("width",n*o),r.setAttribute("height",a*o),s.clearRect(0,0,n*o,a*o);var l={position:i.position,rotation:i.rotation,scale:i.scale};i.position=[0,0,0],i.rotation=0,i.scale=[1,1],i&&i.brush(s,!1);var h=e("./shape/Image"),d=new h({id:t,style:{x:0,y:0,image:r}});return null!=l.position&&(d.position=i.position=l.position),null!=l.rotation&&(d.rotation=i.rotation=l.rotation),null!=l.scale&&(d.scale=i.scale=l.scale),d},h.prototype._createShapeToImageProcessor=function(){if(window.G_vmlCanvasManager)return i;var e=this;return function(t,i,n,o){return e._shapeToImage(t,i,n,o,a.devicePixelRatio)}},h}),define("zrender/Storage",["require","./tool/util","./Group"],function(e){"use strict";function t(e,t){return e.zlevel==t.zlevel?e.z==t.z?e.__renderidx-t.__renderidx:e.z-t.z:e.zlevel-t.zlevel}var i=e("./tool/util"),n=e("./Group"),a={hover:!1,normal:"down",update:!1},o=function(){this._elements={},this._hoverElements=[],this._roots=[],this._shapeList=[],this._shapeListOffset=0};return o.prototype.iterShape=function(e,t){if(t||(t=a),t.hover)for(var i=0,n=this._hoverElements.length;n>i;i++){var o=this._hoverElements[i];if(o.updateTransform(),e(o))return this}switch(t.update&&this.updateShapeList(),t.normal){case"down":for(var n=this._shapeList.length;n--;)if(e(this._shapeList[n]))return this;break;default:for(var i=0,n=this._shapeList.length;n>i;i++)if(e(this._shapeList[i]))return this}return this},o.prototype.getHoverShapes=function(e){for(var i=[],n=0,a=this._hoverElements.length;a>n;n++){i.push(this._hoverElements[n]);var o=this._hoverElements[n].hoverConnect;if(o){var r;o=o instanceof Array?o:[o];for(var s=0,l=o.length;l>s;s++)r=o[s].id?o[s]:this.get(o[s]),r&&i.push(r)}}if(i.sort(t),e)for(var n=0,a=i.length;a>n;n++)i[n].updateTransform();return i},o.prototype.getShapeList=function(e){return e&&this.updateShapeList(),this._shapeList},o.prototype.updateShapeList=function(){this._shapeListOffset=0;for(var e=0,i=this._roots.length;i>e;e++){var n=this._roots[e];this._updateAndAddShape(n)}this._shapeList.length=this._shapeListOffset;for(var e=0,i=this._shapeList.length;i>e;e++)this._shapeList[e].__renderidx=e;this._shapeList.sort(t)},o.prototype._updateAndAddShape=function(e,t){if(!e.ignore)if(e.updateTransform(),e.clipShape&&(e.clipShape.parent=e,e.clipShape.updateTransform(),t?(t=t.slice(),t.push(e.clipShape)):t=[e.clipShape]),"group"==e.type){for(var i=0;i<e._children.length;i++){var n=e._children[i];n.__dirty=e.__dirty||n.__dirty,this._updateAndAddShape(n,t)}e.__dirty=!1}else e.__clipShapes=t,this._shapeList[this._shapeListOffset++]=e},o.prototype.mod=function(e,t){if("string"==typeof e&&(e=this._elements[e]),e&&(e.modSelf(),t))if(t.parent||t._storage||t.__clipShapes){var n={};for(var a in t)"parent"!==a&&"_storage"!==a&&"__clipShapes"!==a&&t.hasOwnProperty(a)&&(n[a]=t[a]);i.merge(e,n,!0)}else i.merge(e,t,!0);return this},o.prototype.drift=function(e,t,i){var n=this._elements[e];return n&&(n.needTransform=!0,"horizontal"===n.draggable?i=0:"vertical"===n.draggable&&(t=0),(!n.ondrift||n.ondrift&&!n.ondrift(t,i))&&n.drift(t,i)),this},o.prototype.addHover=function(e){return e.updateNeedTransform(),this._hoverElements.push(e),this},o.prototype.delHover=function(){return this._hoverElements=[],this},o.prototype.hasHoverShape=function(){return this._hoverElements.length>0},o.prototype.addRoot=function(e){this._elements[e.id]||(e instanceof n&&e.addChildrenToStorage(this),this.addToMap(e),this._roots.push(e))},o.prototype.delRoot=function(e){if("undefined"==typeof e){for(var t=0;t<this._roots.length;t++){var a=this._roots[t];a instanceof n&&a.delChildrenFromStorage(this)}return this._elements={},this._hoverElements=[],this._roots=[],this._shapeList=[],void(this._shapeListOffset=0)}if(e instanceof Array)for(var t=0,o=e.length;o>t;t++)this.delRoot(e[t]);else{var r;r="string"==typeof e?this._elements[e]:e;var s=i.indexOf(this._roots,r);s>=0&&(this.delFromMap(r.id),this._roots.splice(s,1),r instanceof n&&r.delChildrenFromStorage(this))}},o.prototype.addToMap=function(e){return e instanceof n&&(e._storage=this),e.modSelf(),this._elements[e.id]=e,this},o.prototype.get=function(e){return this._elements[e]},o.prototype.delFromMap=function(e){var t=this._elements[e];return t&&(delete this._elements[e],t instanceof n&&(t._storage=null)),this},o.prototype.dispose=function(){this._elements=this._renderList=this._roots=this._hoverElements=null},o}),define("zrender/animation/Animation",["require","./Clip","../tool/color","../tool/util","../tool/event"],function(e){"use strict";function t(e,t){return e[t]}function i(e,t,i){e[t]=i}function n(e,t,i){return(t-e)*i+e}function a(e,t,i,a,o){var r=e.length;if(1==o)for(var s=0;r>s;s++)a[s]=n(e[s],t[s],i);else for(var l=e[0].length,s=0;r>s;s++)for(var h=0;l>h;h++)a[s][h]=n(e[s][h],t[s][h],i)}function o(e){switch(typeof e){case"undefined":case"string":return!1}return"undefined"!=typeof e.length}function r(e,t,i,n,a,o,r,l,h){var d=e.length;if(1==h)for(var c=0;d>c;c++)l[c]=s(e[c],t[c],i[c],n[c],a,o,r);else for(var m=e[0].length,c=0;d>c;c++)for(var p=0;m>p;p++)l[c][p]=s(e[c][p],t[c][p],i[c][p],n[c][p],a,o,r)}function s(e,t,i,n,a,o,r){var s=.5*(i-e),l=.5*(n-t);return(2*(t-i)+s+l)*r+(-3*(t-i)-2*s-l)*o+s*a+t}function l(e){if(o(e)){var t=e.length;if(o(e[0])){for(var i=[],n=0;t>n;n++)i.push(V.call(e[n]));return i}return V.call(e)}return e}function h(e){return e[0]=Math.floor(e[0]),e[1]=Math.floor(e[1]),e[2]=Math.floor(e[2]),"rgba("+e.join(",")+")"}var d=e("./Clip"),c=e("../tool/color"),m=e("../tool/util"),p=e("../tool/event").Dispatcher,u=window.requestAnimationFrame||window.msRequestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||function(e){setTimeout(e,16)},V=Array.prototype.slice,U=function(e){e=e||{},this.stage=e.stage||{},this.onframe=e.onframe||function(){},this._clips=[],this._running=!1,this._time=0,p.call(this)};U.prototype={add:function(e){this._clips.push(e)},remove:function(e){if(e.__inStep)e.__needsRemove=!0;else{var t=m.indexOf(this._clips,e);t>=0&&this._clips.splice(t,1)}},_update:function(){for(var e=(new Date).getTime(),t=e-this._time,i=this._clips,n=i.length,a=[],o=[],r=0;n>r;r++){var s=i[r];s.__inStep=!0;var l=s.step(e);s.__inStep=!1,l&&(a.push(l),o.push(s))}for(var r=0;n>r;)i[r].__needsRemove?(i[r]=i[n-1],i.pop(),n--):r++;n=a.length;for(var r=0;n>r;r++)o[r].fire(a[r]);this._time=e,this.onframe(t),this.dispatch("frame",t),this.stage.update&&this.stage.update()},start:function(){function e(){t._running&&(u(e),t._update())}var t=this;this._running=!0,this._time=(new Date).getTime(),u(e)},stop:function(){this._running=!1},clear:function(){this._clips=[]},animate:function(e,t){t=t||{};var i=new g(e,t.loop,t.getter,t.setter);return i.animation=this,i},constructor:U},m.merge(U.prototype,p.prototype,!0);var g=function(e,n,a,o){this._tracks={},this._target=e,this._loop=n||!1,this._getter=a||t,this._setter=o||i,this._clipCount=0,this._delay=0,this._doneList=[],this._onframeList=[],this._clipList=[]};return g.prototype={when:function(e,t){for(var i in t)this._tracks[i]||(this._tracks[i]=[],0!==e&&this._tracks[i].push({time:0,value:l(this._getter(this._target,i))})),this._tracks[i].push({time:parseInt(e,10),value:t[i]});return this},during:function(e){return this._onframeList.push(e),this},start:function(e){var t=this,i=this._setter,l=this._getter,m="spline"===e,p=function(){if(t._clipCount--,0===t._clipCount){t._tracks={};for(var e=t._doneList.length,i=0;e>i;i++)t._doneList[i].call(t)}},u=function(u,V){var U=u.length;if(U){var g=u[0].value,f=o(g),y=!1,b=f&&o(g[0])?2:1;u.sort(function(e,t){return e.time-t.time});var _;if(U){_=u[U-1].time;for(var x=[],k=[],v=0;U>v;v++){x.push(u[v].time/_);var L=u[v].value;"string"==typeof L&&(L=c.toArray(L),0===L.length&&(L[0]=L[1]=L[2]=0,L[3]=1),y=!0),k.push(L)}var w,v,W,X,I,S,K,C=0,T=0;if(y)var E=[0,0,0,0];var z=function(e,o){if(T>o){for(w=Math.min(C+1,U-1),v=w;v>=0&&!(x[v]<=o);v--);v=Math.min(v,U-2)}else{for(v=C;U>v&&!(x[v]>o);v++);v=Math.min(v-1,U-2)}C=v,T=o;var d=x[v+1]-x[v];if(0!==d){if(W=(o-x[v])/d,m)if(I=k[v],X=k[0===v?v:v-1],S=k[v>U-2?U-1:v+1],K=k[v>U-3?U-1:v+2],f)r(X,I,S,K,W,W*W,W*W*W,l(e,V),b);else{var c;y?(c=r(X,I,S,K,W,W*W,W*W*W,E,1),c=h(E)):c=s(X,I,S,K,W,W*W,W*W*W),i(e,V,c)}else if(f)a(k[v],k[v+1],W,l(e,V),b);else{var c;y?(a(k[v],k[v+1],W,E,1),c=h(E)):c=n(k[v],k[v+1],W),i(e,V,c)}for(v=0;v<t._onframeList.length;v++)t._onframeList[v](e,o);

}},A=new d({target:t._target,life:_,loop:t._loop,delay:t._delay,onframe:z,ondestroy:p});e&&"spline"!==e&&(A.easing=e),t._clipList.push(A),t._clipCount++,t.animation.add(A)}}};for(var V in this._tracks)u(this._tracks[V],V);return this},stop:function(){for(var e=0;e<this._clipList.length;e++){var t=this._clipList[e];this.animation.remove(t)}this._clipList=[]},delay:function(e){return this._delay=e,this},done:function(e){return e&&this._doneList.push(e),this}},U}),define("zrender/tool/vector",[],function(){var e="undefined"==typeof Float32Array?Array:Float32Array,t={create:function(t,i){var n=new e(2);return n[0]=t||0,n[1]=i||0,n},copy:function(e,t){return e[0]=t[0],e[1]=t[1],e},clone:function(t){var i=new e(2);return i[0]=t[0],i[1]=t[1],i},set:function(e,t,i){return e[0]=t,e[1]=i,e},add:function(e,t,i){return e[0]=t[0]+i[0],e[1]=t[1]+i[1],e},scaleAndAdd:function(e,t,i,n){return e[0]=t[0]+i[0]*n,e[1]=t[1]+i[1]*n,e},sub:function(e,t,i){return e[0]=t[0]-i[0],e[1]=t[1]-i[1],e},len:function(e){return Math.sqrt(this.lenSquare(e))},lenSquare:function(e){return e[0]*e[0]+e[1]*e[1]},mul:function(e,t,i){return e[0]=t[0]*i[0],e[1]=t[1]*i[1],e},div:function(e,t,i){return e[0]=t[0]/i[0],e[1]=t[1]/i[1],e},dot:function(e,t){return e[0]*t[0]+e[1]*t[1]},scale:function(e,t,i){return e[0]=t[0]*i,e[1]=t[1]*i,e},normalize:function(e,i){var n=t.len(i);return 0===n?(e[0]=0,e[1]=0):(e[0]=i[0]/n,e[1]=i[1]/n),e},distance:function(e,t){return Math.sqrt((e[0]-t[0])*(e[0]-t[0])+(e[1]-t[1])*(e[1]-t[1]))},distanceSquare:function(e,t){return(e[0]-t[0])*(e[0]-t[0])+(e[1]-t[1])*(e[1]-t[1])},negate:function(e,t){return e[0]=-t[0],e[1]=-t[1],e},lerp:function(e,t,i,n){return e[0]=t[0]+n*(i[0]-t[0]),e[1]=t[1]+n*(i[1]-t[1]),e},applyTransform:function(e,t,i){var n=t[0],a=t[1];return e[0]=i[0]*n+i[2]*a+i[4],e[1]=i[1]*n+i[3]*a+i[5],e},min:function(e,t,i){return e[0]=Math.min(t[0],i[0]),e[1]=Math.min(t[1],i[1]),e},max:function(e,t,i){return e[0]=Math.max(t[0],i[0]),e[1]=Math.max(t[1],i[1]),e}};return t.length=t.len,t.lengthSquare=t.lenSquare,t.dist=t.distance,t.distSquare=t.distanceSquare,t}),define("zrender/tool/matrix",[],function(){var e="undefined"==typeof Float32Array?Array:Float32Array,t={create:function(){var i=new e(6);return t.identity(i),i},identity:function(e){return e[0]=1,e[1]=0,e[2]=0,e[3]=1,e[4]=0,e[5]=0,e},copy:function(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[4]=t[4],e[5]=t[5],e},mul:function(e,t,i){return e[0]=t[0]*i[0]+t[2]*i[1],e[1]=t[1]*i[0]+t[3]*i[1],e[2]=t[0]*i[2]+t[2]*i[3],e[3]=t[1]*i[2]+t[3]*i[3],e[4]=t[0]*i[4]+t[2]*i[5]+t[4],e[5]=t[1]*i[4]+t[3]*i[5]+t[5],e},translate:function(e,t,i){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[4]=t[4]+i[0],e[5]=t[5]+i[1],e},rotate:function(e,t,i){var n=t[0],a=t[2],o=t[4],r=t[1],s=t[3],l=t[5],h=Math.sin(i),d=Math.cos(i);return e[0]=n*d+r*h,e[1]=-n*h+r*d,e[2]=a*d+s*h,e[3]=-a*h+d*s,e[4]=d*o+h*l,e[5]=d*l-h*o,e},scale:function(e,t,i){var n=i[0],a=i[1];return e[0]=t[0]*n,e[1]=t[1]*a,e[2]=t[2]*n,e[3]=t[3]*a,e[4]=t[4]*n,e[5]=t[5]*a,e},invert:function(e,t){var i=t[0],n=t[2],a=t[4],o=t[1],r=t[3],s=t[5],l=i*r-o*n;return l?(l=1/l,e[0]=r*l,e[1]=-o*l,e[2]=-n*l,e[3]=i*l,e[4]=(n*s-r*a)*l,e[5]=(o*a-i*s)*l,e):null}};return t}),define("zrender/loadingEffect/Base",["require","../tool/util","../shape/Text","../shape/Rectangle"],function(e){function t(e){this.setOptions(e)}var i=e("../tool/util"),n=e("../shape/Text"),a=e("../shape/Rectangle"),o="Loading...",r="normal 16px Arial";return t.prototype.createTextShape=function(e){return new n({highlightStyle:i.merge({x:this.canvasWidth/2,y:this.canvasHeight/2,text:o,textAlign:"center",textBaseline:"middle",textFont:r,color:"#333",brushType:"fill"},e,!0)})},t.prototype.createBackgroundShape=function(e){return new a({highlightStyle:{x:0,y:0,width:this.canvasWidth,height:this.canvasHeight,brushType:"fill",color:e}})},t.prototype.start=function(e){function t(t){e.storage.addHover(t)}function i(){e.refreshHover()}this.canvasWidth=e._width,this.canvasHeight=e._height,this.loadingTimer=this._start(t,i)},t.prototype._start=function(){return setInterval(function(){},1e4)},t.prototype.stop=function(){clearInterval(this.loadingTimer)},t.prototype.setOptions=function(e){this.options=e||{}},t.prototype.adjust=function(e,t){return e<=t[0]?e=t[0]:e>=t[1]&&(e=t[1]),e},t.prototype.getLocation=function(e,t,i){var n=null!=e.x?e.x:"center";switch(n){case"center":n=Math.floor((this.canvasWidth-t)/2);break;case"left":n=0;break;case"right":n=this.canvasWidth-t}var a=null!=e.y?e.y:"center";switch(a){case"center":a=Math.floor((this.canvasHeight-i)/2);break;case"top":a=0;break;case"bottom":a=this.canvasHeight-i}return{x:n,y:a,width:t,height:i}},t}),define("zrender/Layer",["require","./mixin/Transformable","./tool/util","./config"],function(e){function t(){return!1}function i(e,t,i){var n=document.createElement(t),a=i.getWidth(),o=i.getHeight();return n.style.position="absolute",n.style.left=0,n.style.top=0,n.style.width=a+"px",n.style.height=o+"px",n.width=a*r.devicePixelRatio,n.height=o*r.devicePixelRatio,n.setAttribute("data-zr-dom-id",e),n}var n=e("./mixin/Transformable"),a=e("./tool/util"),o=window.G_vmlCanvasManager,r=e("./config"),s=function(e,a){this.id=e,this.dom=i(e,"canvas",a),this.dom.onselectstart=t,this.dom.style["-webkit-user-select"]="none",this.dom.style["user-select"]="none",this.dom.style["-webkit-touch-callout"]="none",this.dom.style["-webkit-tap-highlight-color"]="rgba(0,0,0,0)",this.dom.className=r.elementClassName,o&&o.initElement(this.dom),this.domBack=null,this.ctxBack=null,this.painter=a,this.unusedCount=0,this.config=null,this.dirty=!0,this.elCount=0,this.clearColor=0,this.motionBlur=!1,this.lastFrameAlpha=.7,this.zoomable=!1,this.panable=!1,this.maxZoom=1/0,this.minZoom=0,n.call(this)};return s.prototype.initContext=function(){this.ctx=this.dom.getContext("2d");var e=r.devicePixelRatio;1!=e&&this.ctx.scale(e,e)},s.prototype.createBackBuffer=function(){if(!o){this.domBack=i("back-"+this.id,"canvas",this.painter),this.ctxBack=this.domBack.getContext("2d");var e=r.devicePixelRatio;1!=e&&this.ctxBack.scale(e,e)}},s.prototype.resize=function(e,t){var i=r.devicePixelRatio;this.dom.style.width=e+"px",this.dom.style.height=t+"px",this.dom.setAttribute("width",e*i),this.dom.setAttribute("height",t*i),1!=i&&this.ctx.scale(i,i),this.domBack&&(this.domBack.setAttribute("width",e*i),this.domBack.setAttribute("height",t*i),1!=i&&this.ctxBack.scale(i,i))},s.prototype.clear=function(){var e=this.dom,t=this.ctx,i=e.width,n=e.height,a=this.clearColor&&!o,s=this.motionBlur&&!o,l=this.lastFrameAlpha,h=r.devicePixelRatio;if(s&&(this.domBack||this.createBackBuffer(),this.ctxBack.globalCompositeOperation="copy",this.ctxBack.drawImage(e,0,0,i/h,n/h)),t.clearRect(0,0,i/h,n/h),a&&(t.save(),t.fillStyle=this.clearColor,t.fillRect(0,0,i/h,n/h),t.restore()),s){var d=this.domBack;t.save(),t.globalAlpha=l,t.drawImage(d,0,0,i/h,n/h),t.restore()}},a.merge(s.prototype,n.prototype),s}),define("zrender/shape/Text",["require","../tool/area","./Base","../tool/util"],function(e){var t=e("../tool/area"),i=e("./Base"),n=function(e){i.call(this,e)};return n.prototype={type:"text",brush:function(e,i){var n=this.style;if(i&&(n=this.getHighlightStyle(n,this.highlightStyle||{})),"undefined"!=typeof n.text&&n.text!==!1){e.save(),this.doClip(e),this.setContext(e,n),this.setTransform(e),n.textFont&&(e.font=n.textFont),e.textAlign=n.textAlign||"start",e.textBaseline=n.textBaseline||"middle";var a,o=(n.text+"").split("\n"),r=t.getTextHeight("å›½",n.textFont),s=this.getRect(n),l=n.x;a="top"==n.textBaseline?s.y:"bottom"==n.textBaseline?s.y+r:s.y+r/2;for(var h=0,d=o.length;d>h;h++){if(n.maxWidth)switch(n.brushType){case"fill":e.fillText(o[h],l,a,n.maxWidth);break;case"stroke":e.strokeText(o[h],l,a,n.maxWidth);break;case"both":e.fillText(o[h],l,a,n.maxWidth),e.strokeText(o[h],l,a,n.maxWidth);break;default:e.fillText(o[h],l,a,n.maxWidth)}else switch(n.brushType){case"fill":e.fillText(o[h],l,a);break;case"stroke":e.strokeText(o[h],l,a);break;case"both":e.fillText(o[h],l,a),e.strokeText(o[h],l,a);break;default:e.fillText(o[h],l,a)}a+=r}e.restore()}},getRect:function(e){if(e.__rect)return e.__rect;var i=t.getTextWidth(e.text,e.textFont),n=t.getTextHeight(e.text,e.textFont),a=e.x;"end"==e.textAlign||"right"==e.textAlign?a-=i:"center"==e.textAlign&&(a-=i/2);var o;return o="top"==e.textBaseline?e.y:"bottom"==e.textBaseline?e.y-n:e.y-n/2,e.__rect={x:a,y:o,width:i,height:n},e.__rect}},e("../tool/util").inherits(n,i),n}),define("zrender/shape/Rectangle",["require","./Base","../tool/util"],function(e){var t=e("./Base"),i=function(e){t.call(this,e)};return i.prototype={type:"rectangle",_buildRadiusPath:function(e,t){var i,n,a,o,r=t.x,s=t.y,l=t.width,h=t.height,d=t.radius;"number"==typeof d?i=n=a=o=d:d instanceof Array?1===d.length?i=n=a=o=d[0]:2===d.length?(i=a=d[0],n=o=d[1]):3===d.length?(i=d[0],n=o=d[1],a=d[2]):(i=d[0],n=d[1],a=d[2],o=d[3]):i=n=a=o=0;var c;i+n>l&&(c=i+n,i*=l/c,n*=l/c),a+o>l&&(c=a+o,a*=l/c,o*=l/c),n+a>h&&(c=n+a,n*=h/c,a*=h/c),i+o>h&&(c=i+o,i*=h/c,o*=h/c),e.moveTo(r+i,s),e.lineTo(r+l-n,s),0!==n&&e.quadraticCurveTo(r+l,s,r+l,s+n),e.lineTo(r+l,s+h-a),0!==a&&e.quadraticCurveTo(r+l,s+h,r+l-a,s+h),e.lineTo(r+o,s+h),0!==o&&e.quadraticCurveTo(r,s+h,r,s+h-o),e.lineTo(r,s+i),0!==i&&e.quadraticCurveTo(r,s,r+i,s)},buildPath:function(e,t){t.radius?this._buildRadiusPath(e,t):(e.moveTo(t.x,t.y),e.lineTo(t.x+t.width,t.y),e.lineTo(t.x+t.width,t.y+t.height),e.lineTo(t.x,t.y+t.height),e.lineTo(t.x,t.y)),e.closePath()},getRect:function(e){if(e.__rect)return e.__rect;var t;return t="stroke"==e.brushType||"fill"==e.brushType?e.lineWidth||1:0,e.__rect={x:Math.round(e.x-t/2),y:Math.round(e.y-t/2),width:e.width+t,height:e.height+t},e.__rect}},e("../tool/util").inherits(i,t),i}),define("zrender/tool/area",["require","./util","./curve"],function(e){"use strict";function t(e){return e%=C,0>e&&(e+=C),e}function i(e,t,i,o){if(!t||!e)return!1;var r=e.type;v=v||L.getContext();var s=n(e,t,i,o);if("undefined"!=typeof s)return s;if(e.buildPath&&v.isPointInPath)return a(e,v,t,i,o);switch(r){case"ellipse":return!0;case"trochoid":var l="out"==t.location?t.r1+t.r2+t.d:t.r1-t.r2+t.d;return p(t,i,o,l);case"rose":return p(t,i,o,t.maxr);default:return!1}}function n(e,t,i,n){var a=e.type;switch(a){case"bezier-curve":return"undefined"==typeof t.cpX2?l(t.xStart,t.yStart,t.cpX1,t.cpY1,t.xEnd,t.yEnd,t.lineWidth,i,n):s(t.xStart,t.yStart,t.cpX1,t.cpY1,t.cpX2,t.cpY2,t.xEnd,t.yEnd,t.lineWidth,i,n);case"line":return r(t.xStart,t.yStart,t.xEnd,t.yEnd,t.lineWidth,i,n);case"polyline":return d(t.pointList,t.lineWidth,i,n);case"ring":return c(t.x,t.y,t.r0,t.r,i,n);case"circle":return p(t.x,t.y,t.r,i,n);case"sector":var o=t.startAngle*Math.PI/180,h=t.endAngle*Math.PI/180;return t.clockWise||(o=-o,h=-h),u(t.x,t.y,t.r0,t.r,o,h,!t.clockWise,i,n);case"path":return t.pathArray&&_(t.pathArray,Math.max(t.lineWidth,5),t.brushType,i,n);case"polygon":case"star":case"isogon":return V(t.pointList,i,n);case"text":var U=t.__rect||e.getRect(t);return m(U.x,U.y,U.width,U.height,i,n);case"rectangle":case"image":return m(t.x,t.y,t.width,t.height,i,n)}}function a(e,t,i,n,a){return t.beginPath(),e.buildPath(t,i),t.closePath(),t.isPointInPath(n,a)}function o(e,t,n,a){return!i(e,t,n,a)}function r(e,t,i,n,a,o,r){if(0===a)return!1;var s=Math.max(a,5),l=0,h=e;if(r>t+s&&r>n+s||t-s>r&&n-s>r||o>e+s&&o>i+s||e-s>o&&i-s>o)return!1;if(e===i)return Math.abs(o-e)<=s/2;l=(t-n)/(e-i),h=(e*n-i*t)/(e-i);var d=l*o-r+h,c=d*d/(l*l+1);return s/2*s/2>=c}function s(e,t,i,n,a,o,r,s,l,h,d){if(0===l)return!1;var c=Math.max(l,5);if(d>t+c&&d>n+c&&d>o+c&&d>s+c||t-c>d&&n-c>d&&o-c>d&&s-c>d||h>e+c&&h>i+c&&h>a+c&&h>r+c||e-c>h&&i-c>h&&a-c>h&&r-c>h)return!1;var m=w.cubicProjectPoint(e,t,i,n,a,o,r,s,h,d,null);return c/2>=m}function l(e,t,i,n,a,o,r,s,l){if(0===r)return!1;var h=Math.max(r,5);if(l>t+h&&l>n+h&&l>o+h||t-h>l&&n-h>l&&o-h>l||s>e+h&&s>i+h&&s>a+h||e-h>s&&i-h>s&&a-h>s)return!1;var d=w.quadraticProjectPoint(e,t,i,n,a,o,s,l,null);return h/2>=d}function h(e,i,n,a,o,r,s,l,h){if(0===s)return!1;var d=Math.max(s,5);l-=e,h-=i;var c=Math.sqrt(l*l+h*h);if(c-d>n||n>c+d)return!1;if(Math.abs(a-o)>=C)return!0;if(r){var m=a;a=t(o),o=t(m)}else a=t(a),o=t(o);a>o&&(o+=C);var p=Math.atan2(h,l);return 0>p&&(p+=C),p>=a&&o>=p||p+C>=a&&o>=p+C}function d(e,t,i,n){for(var t=Math.max(t,10),a=0,o=e.length-1;o>a;a++){var s=e[a][0],l=e[a][1],h=e[a+1][0],d=e[a+1][1];if(r(s,l,h,d,t,i,n))return!0}return!1}function c(e,t,i,n,a,o){var r=(a-e)*(a-e)+(o-t)*(o-t);return n*n>r&&r>i*i}function m(e,t,i,n,a,o){return a>=e&&e+i>=a&&o>=t&&t+n>=o}function p(e,t,i,n,a){return i*i>(n-e)*(n-e)+(a-t)*(a-t)}function u(e,t,i,n,a,o,r,s,l){return h(e,t,(i+n)/2,a,o,r,n-i,s,l)}function V(e,t,i){for(var n=e.length,a=0,o=0,r=n-1;n>o;o++){var s=e[r][0],l=e[r][1],h=e[o][0],d=e[o][1];a+=U(s,l,h,d,t,i),r=o}return 0!==a}function U(e,t,i,n,a,o){if(o>t&&o>n||t>o&&n>o)return 0;if(n==t)return 0;var r=t>n?1:-1,s=(o-t)/(n-t),l=s*(i-e)+e;return l>a?r:0}function g(){var e=E[0];E[0]=E[1],E[1]=e}function f(e,t,i,n,a,o,r,s,l,h){if(h>t&&h>n&&h>o&&h>s||t>h&&n>h&&o>h&&s>h)return 0;var d=w.cubicRootAt(t,n,o,s,h,T);if(0===d)return 0;for(var c,m,p=0,u=-1,V=0;d>V;V++){var U=T[V],f=w.cubicAt(e,i,a,r,U);l>f||(0>u&&(u=w.cubicExtrema(t,n,o,s,E),E[1]<E[0]&&u>1&&g(),c=w.cubicAt(t,n,o,s,E[0]),u>1&&(m=w.cubicAt(t,n,o,s,E[1]))),p+=2==u?U<E[0]?t>c?1:-1:U<E[1]?c>m?1:-1:m>s?1:-1:U<E[0]?t>c?1:-1:c>s?1:-1)}return p}function y(e,t,i,n,a,o,r,s){if(s>t&&s>n&&s>o||t>s&&n>s&&o>s)return 0;var l=w.quadraticRootAt(t,n,o,s,T);if(0===l)return 0;var h=w.quadraticExtremum(t,n,o);if(h>=0&&1>=h){for(var d=0,c=w.quadraticAt(t,n,o,h),m=0;l>m;m++){var p=w.quadraticAt(e,i,a,T[m]);r>p||(d+=T[m]<h?t>c?1:-1:c>o?1:-1)}return d}var p=w.quadraticAt(e,i,a,T[0]);return r>p?0:t>o?1:-1}function b(e,i,n,a,o,r,s,l){if(l-=i,l>n||-n>l)return 0;var h=Math.sqrt(n*n-l*l);if(T[0]=-h,T[1]=h,Math.abs(a-o)>=C){a=0,o=C;var d=r?1:-1;return s>=T[0]+e&&s<=T[1]+e?d:0}if(r){var h=a;a=t(o),o=t(h)}else a=t(a),o=t(o);a>o&&(o+=C);for(var c=0,m=0;2>m;m++){var p=T[m];if(p+e>s){var u=Math.atan2(l,p),d=r?1:-1;0>u&&(u=C+u),(u>=a&&o>=u||u+C>=a&&o>=u+C)&&(u>Math.PI/2&&u<1.5*Math.PI&&(d=-d),c+=d)}}return c}function _(e,t,i,n,a){var o=0,d=0,c=0,m=0,p=0,u=!0,V=!0;i=i||"fill";for(var g="stroke"===i||"both"===i,_="fill"===i||"both"===i,x=0;x<e.length;x++){var k=e[x],v=k.points;if(u||"M"===k.command){if(x>0&&(_&&(o+=U(d,c,m,p,n,a)),0!==o))return!0;m=v[v.length-2],p=v[v.length-1],u=!1,V&&"A"!==k.command&&(V=!1,d=m,c=p)}switch(k.command){case"M":d=v[0],c=v[1];break;case"L":if(g&&r(d,c,v[0],v[1],t,n,a))return!0;_&&(o+=U(d,c,v[0],v[1],n,a)),d=v[0],c=v[1];break;case"C":if(g&&s(d,c,v[0],v[1],v[2],v[3],v[4],v[5],t,n,a))return!0;_&&(o+=f(d,c,v[0],v[1],v[2],v[3],v[4],v[5],n,a)),d=v[4],c=v[5];break;case"Q":if(g&&l(d,c,v[0],v[1],v[2],v[3],t,n,a))return!0;_&&(o+=y(d,c,v[0],v[1],v[2],v[3],n,a)),d=v[2],c=v[3];break;case"A":var L=v[0],w=v[1],W=v[2],X=v[3],I=v[4],S=v[5],K=Math.cos(I)*W+L,C=Math.sin(I)*X+w;V?(V=!1,m=K,p=C):o+=U(d,c,K,C);var T=(n-L)*X/W+L;if(g&&h(L,w,X,I,I+S,1-v[7],t,T,a))return!0;_&&(o+=b(L,w,X,I,I+S,1-v[7],T,a)),d=Math.cos(I+S)*W+L,c=Math.sin(I+S)*X+w;break;case"z":if(g&&r(d,c,m,p,t,n,a))return!0;u=!0}}return _&&(o+=U(d,c,m,p,n,a)),0!==o}function x(e,t){var i=e+":"+t;if(W[i])return W[i];v=v||L.getContext(),v.save(),t&&(v.font=t),e=(e+"").split("\n");for(var n=0,a=0,o=e.length;o>a;a++)n=Math.max(v.measureText(e[a]).width,n);return v.restore(),W[i]=n,++I>K&&(I=0,W={}),n}function k(e,t){var i=e+":"+t;if(X[i])return X[i];v=v||L.getContext(),v.save(),t&&(v.font=t),e=(e+"").split("\n");var n=(v.measureText("å›½").width+2)*e.length;return v.restore(),X[i]=n,++S>K&&(S=0,X={}),n}var v,L=e("./util"),w=e("./curve"),W={},X={},I=0,S=0,K=5e3,C=2*Math.PI,T=[-1,-1,-1],E=[-1,-1];return{isInside:i,isOutside:o,getTextWidth:x,getTextHeight:k,isInsidePath:_,isInsidePolygon:V,isInsideSector:u,isInsideCircle:p,isInsideLine:r,isInsideRect:m,isInsidePolyline:d,isInsideCubicStroke:s,isInsideQuadraticStroke:l}}),define("zrender/shape/Base",["require","../tool/matrix","../tool/guid","../tool/util","../tool/log","../mixin/Transformable","../mixin/Eventful","../tool/area","../tool/color"],function(e){function t(t,n,a,o,r,s,l){r&&(t.font=r),t.textAlign=s,t.textBaseline=l;var h=i(n,a,o,r,s,l);n=(n+"").split("\n");var d=e("../tool/area").getTextHeight("å›½",r);switch(l){case"top":o=h.y;break;case"bottom":o=h.y+d;break;default:o=h.y+d/2}for(var c=0,m=n.length;m>c;c++)t.fillText(n[c],a,o),o+=d}function i(t,i,n,a,o,r){var s=e("../tool/area"),l=s.getTextWidth(t,a),h=s.getTextHeight("å›½",a);switch(t=(t+"").split("\n"),o){case"end":case"right":i-=l;break;case"center":i-=l/2}switch(r){case"top":break;case"bottom":n-=h*t.length;break;default:n-=h*t.length/2}return{x:i,y:n,width:l,height:h*t.length}}var n=window.G_vmlCanvasManager,a=e("../tool/matrix"),o=e("../tool/guid"),r=e("../tool/util"),s=e("../tool/log"),l=e("../mixin/Transformable"),h=e("../mixin/Eventful"),d=function(e){e=e||{},this.id=e.id||o();for(var t in e)this[t]=e[t];this.style=this.style||{},this.highlightStyle=this.highlightStyle||null,this.parent=null,this.__dirty=!0,this.__clipShapes=[],l.call(this),h.call(this)};d.prototype.invisible=!1,d.prototype.ignore=!1,d.prototype.zlevel=0,d.prototype.draggable=!1,d.prototype.clickable=!1,d.prototype.hoverable=!0,d.prototype.z=0,d.prototype.brush=function(e,t){var i=this.beforeBrush(e,t);switch(e.beginPath(),this.buildPath(e,i),i.brushType){case"both":e.fill();case"stroke":i.lineWidth>0&&e.stroke();break;default:e.fill()}this.drawText(e,i,this.style),this.afterBrush(e)},d.prototype.beforeBrush=function(e,t){var i=this.style;return this.brushTypeOnly&&(i.brushType=this.brushTypeOnly),t&&(i=this.getHighlightStyle(i,this.highlightStyle||{},this.brushTypeOnly)),"stroke"==this.brushTypeOnly&&(i.strokeColor=i.strokeColor||i.color),e.save(),this.doClip(e),this.setContext(e,i),this.setTransform(e),i},d.prototype.afterBrush=function(e){e.restore()};var c=[["color","fillStyle"],["strokeColor","strokeStyle"],["opacity","globalAlpha"],["lineCap","lineCap"],["lineJoin","lineJoin"],["miterLimit","miterLimit"],["lineWidth","lineWidth"],["shadowBlur","shadowBlur"],["shadowColor","shadowColor"],["shadowOffsetX","shadowOffsetX"],["shadowOffsetY","shadowOffsetY"]];d.prototype.setContext=function(e,t){for(var i=0,n=c.length;n>i;i++){var a=c[i][0],o=t[a],r=c[i][1];"undefined"!=typeof o&&(e[r]=o)}};var m=a.create();return d.prototype.doClip=function(e){if(this.__clipShapes&&!n)for(var t=0;t<this.__clipShapes.length;t++){var i=this.__clipShapes[t];if(i.needTransform){var o=i.transform;a.invert(m,o),e.transform(o[0],o[1],o[2],o[3],o[4],o[5])}if(e.beginPath(),i.buildPath(e,i.style),e.clip(),i.needTransform){var o=m;e.transform(o[0],o[1],o[2],o[3],o[4],o[5])}}},d.prototype.getHighlightStyle=function(t,i,n){var a={};for(var o in t)a[o]=t[o];var r=e("../tool/color"),s=r.getHighlightColor();"stroke"!=t.brushType?(a.strokeColor=s,a.lineWidth=(t.lineWidth||1)+this.getHighlightZoom(),a.brushType="both"):"stroke"!=n?(a.strokeColor=s,a.lineWidth=(t.lineWidth||1)+this.getHighlightZoom()):a.strokeColor=i.strokeColor||r.mix(t.strokeColor,r.toRGB(s));for(var o in i)"undefined"!=typeof i[o]&&(a[o]=i[o]);return a},d.prototype.getHighlightZoom=function(){return"text"!=this.type?6:2},d.prototype.drift=function(e,t){this.position[0]+=e,this.position[1]+=t},d.prototype.buildPath=function(){s("buildPath not implemented in "+this.type)},d.prototype.getRect=function(){s("getRect not implemented in "+this.type)},d.prototype.isCover=function(t,i){var n=this.transformCoordToLocal(t,i);return t=n[0],i=n[1],this.isCoverRect(t,i)?e("../tool/area").isInside(this,this.style,t,i):!1},d.prototype.isCoverRect=function(e,t){var i=this.style.__rect;return i||(i=this.style.__rect=this.getRect(this.style)),e>=i.x&&e<=i.x+i.width&&t>=i.y&&t<=i.y+i.height},d.prototype.drawText=function(e,i,n){if("undefined"!=typeof i.text&&i.text!==!1){var a=i.textColor||i.color||i.strokeColor;e.fillStyle=a;var o,r,s,l,h=10,d=i.textPosition||this.textPosition||"top";switch(d){case"inside":case"top":case"bottom":case"left":case"right":if(this.getRect){var c=(n||i).__rect||this.getRect(n||i);switch(d){case"inside":s=c.x+c.width/2,l=c.y+c.height/2,o="center",r="middle","stroke"!=i.brushType&&a==i.color&&(e.fillStyle="#fff");break;case"left":s=c.x-h,l=c.y+c.height/2,o="end",r="middle";break;case"right":s=c.x+c.width+h,l=c.y+c.height/2,o="start",r="middle";break;case"top":s=c.x+c.width/2,l=c.y-h,o="center",r="bottom";break;case"bottom":s=c.x+c.width/2,l=c.y+c.height+h,o="center",r="top"}}break;case"start":case"end":var m=i.pointList||[[i.xStart||0,i.yStart||0],[i.xEnd||0,i.yEnd||0]],p=m.length;if(2>p)return;var u,V,U,g;switch(d){case"start":u=m[1][0],V=m[0][0],U=m[1][1],g=m[0][1];break;case"end":u=m[p-2][0],V=m[p-1][0],U=m[p-2][1],g=m[p-1][1]}s=V,l=g;var f=Math.atan((U-g)/(V-u))/Math.PI*180;0>V-u?f+=180:0>U-g&&(f+=360),h=5,f>=30&&150>=f?(o="center",r="bottom",l-=h):f>150&&210>f?(o="right",r="middle",s-=h):f>=210&&330>=f?(o="center",r="top",l+=h):(o="left",r="middle",s+=h);break;case"specific":s=i.textX||0,l=i.textY||0,o="start",r="middle"}null!=s&&null!=l&&t(e,i.text,s,l,i.textFont,i.textAlign||o,i.textBaseline||r)}},d.prototype.modSelf=function(){this.__dirty=!0,this.style&&(this.style.__rect=null),this.highlightStyle&&(this.highlightStyle.__rect=null)},d.prototype.isSilent=function(){return!(this.hoverable||this.draggable||this.clickable||this.onmousemove||this.onmouseover||this.onmouseout||this.onmousedown||this.onmouseup||this.onclick||this.ondragenter||this.ondragover||this.ondragleave||this.ondrop)},r.merge(d.prototype,l.prototype,!0),r.merge(d.prototype,h.prototype,!0),d}),define("zrender/tool/curve",["require","./vector"],function(e){function t(e){return e>-U&&U>e}function i(e){return e>U||-U>e}function n(e,t,i,n,a){var o=1-a;return o*o*(o*e+3*a*t)+a*a*(a*n+3*o*i)}function a(e,t,i,n,a){var o=1-a;return 3*(((t-e)*o+2*(i-t)*a)*o+(n-i)*a*a)}function o(e,i,n,a,o,r){var s=a+3*(i-n)-e,l=3*(n-2*i+e),h=3*(i-e),d=e-o,c=l*l-3*s*h,m=l*h-9*s*d,p=h*h-3*l*d,u=0;if(t(c)&&t(m))if(t(l))r[0]=0;else{var V=-h/l;V>=0&&1>=V&&(r[u++]=V)}else{var U=m*m-4*c*p;if(t(U)){var y=m/c,V=-l/s+y,b=-y/2;V>=0&&1>=V&&(r[u++]=V),b>=0&&1>=b&&(r[u++]=b)}else if(U>0){var _=Math.sqrt(U),x=c*l+1.5*s*(-m+_),k=c*l+1.5*s*(-m-_);x=0>x?-Math.pow(-x,f):Math.pow(x,f),k=0>k?-Math.pow(-k,f):Math.pow(k,f);var V=(-l-(x+k))/(3*s);V>=0&&1>=V&&(r[u++]=V)}else{var v=(2*c*l-3*s*m)/(2*Math.sqrt(c*c*c)),L=Math.acos(v)/3,w=Math.sqrt(c),W=Math.cos(L),V=(-l-2*w*W)/(3*s),b=(-l+w*(W+g*Math.sin(L)))/(3*s),X=(-l+w*(W-g*Math.sin(L)))/(3*s);V>=0&&1>=V&&(r[u++]=V),b>=0&&1>=b&&(r[u++]=b),X>=0&&1>=X&&(r[u++]=X)}}return u}function r(e,n,a,o,r){var s=6*a-12*n+6*e,l=9*n+3*o-3*e-9*a,h=3*n-3*e,d=0;if(t(l)){if(i(s)){var c=-h/s;c>=0&&1>=c&&(r[d++]=c)}}else{var m=s*s-4*l*h;if(t(m))r[0]=-s/(2*l);else if(m>0){var p=Math.sqrt(m),c=(-s+p)/(2*l),u=(-s-p)/(2*l);c>=0&&1>=c&&(r[d++]=c),u>=0&&1>=u&&(r[d++]=u)}}return d}function s(e,t,i,n,a,o){var r=(t-e)*a+e,s=(i-t)*a+t,l=(n-i)*a+i,h=(s-r)*a+r,d=(l-s)*a+s,c=(d-h)*a+h;o[0]=e,o[1]=r,o[2]=h,o[3]=c,o[4]=c,o[5]=d,o[6]=l,o[7]=n}function l(e,t,i,a,o,r,s,l,h,d,c){var m,p=.005,u=1/0;y[0]=h,y[1]=d;for(var g=0;1>g;g+=.05){b[0]=n(e,i,o,s,g),b[1]=n(t,a,r,l,g);var f=V.distSquare(y,b);u>f&&(m=g,u=f)}u=1/0;for(var x=0;32>x&&!(U>p);x++){var k=m-p,v=m+p;b[0]=n(e,i,o,s,k),b[1]=n(t,a,r,l,k);var f=V.distSquare(b,y);if(k>=0&&u>f)m=k,u=f;else{_[0]=n(e,i,o,s,v),_[1]=n(t,a,r,l,v);var L=V.distSquare(_,y);1>=v&&u>L?(m=v,u=L):p*=.5}}return c&&(c[0]=n(e,i,o,s,m),c[1]=n(t,a,r,l,m)),Math.sqrt(u)}function h(e,t,i,n){var a=1-n;return a*(a*e+2*n*t)+n*n*i}function d(e,t,i,n){return 2*((1-n)*(t-e)+n*(i-t))}function c(e,n,a,o,r){var s=e-2*n+a,l=2*(n-e),h=e-o,d=0;if(t(s)){if(i(l)){var c=-h/l;c>=0&&1>=c&&(r[d++]=c)}}else{var m=l*l-4*s*h;if(t(m)){var c=-l/(2*s);c>=0&&1>=c&&(r[d++]=c)}else if(m>0){var p=Math.sqrt(m),c=(-l+p)/(2*s),u=(-l-p)/(2*s);c>=0&&1>=c&&(r[d++]=c),u>=0&&1>=u&&(r[d++]=u)}}return d}function m(e,t,i){var n=e+i-2*t;return 0===n?.5:(e-t)/n}function p(e,t,i,n,a){var o=(t-e)*n+e,r=(i-t)*n+t,s=(r-o)*n+o;a[0]=e,a[1]=o,a[2]=s,a[3]=s,a[4]=r,a[5]=i}function u(e,t,i,n,a,o,r,s,l){var d,c=.005,m=1/0;y[0]=r,y[1]=s;for(var p=0;1>p;p+=.05){b[0]=h(e,i,a,p),b[1]=h(t,n,o,p);var u=V.distSquare(y,b);m>u&&(d=p,m=u)}m=1/0;for(var g=0;32>g&&!(U>c);g++){var f=d-c,x=d+c;b[0]=h(e,i,a,f),b[1]=h(t,n,o,f);var u=V.distSquare(b,y);if(f>=0&&m>u)d=f,m=u;else{_[0]=h(e,i,a,x),_[1]=h(t,n,o,x);var k=V.distSquare(_,y);1>=x&&m>k?(d=x,m=k):c*=.5}}return l&&(l[0]=h(e,i,a,d),l[1]=h(t,n,o,d)),Math.sqrt(m)}var V=e("./vector"),U=1e-4,g=Math.sqrt(3),f=1/3,y=V.create(),b=V.create(),_=V.create();return{cubicAt:n,cubicDerivativeAt:a,cubicRootAt:o,cubicExtrema:r,cubicSubdivide:s,cubicProjectPoint:l,quadraticAt:h,quadraticDerivativeAt:d,quadraticRootAt:c,quadraticExtremum:m,quadraticSubdivide:p,quadraticProjectPoint:u}}),define("zrender/mixin/Transformable",["require","../tool/matrix","../tool/vector"],function(e){"use strict";function t(e){return e>-s&&s>e}function i(e){return e>s||-s>e}var n=e("../tool/matrix"),a=e("../tool/vector"),o=[0,0],r=n.translate,s=5e-5,l=function(){this.position||(this.position=[0,0]),"undefined"==typeof this.rotation&&(this.rotation=[0,0,0]),this.scale||(this.scale=[1,1,0,0]),this.needLocalTransform=!1,this.needTransform=!1};return l.prototype={constructor:l,updateNeedTransform:function(){this.needLocalTransform=i(this.rotation[0])||i(this.position[0])||i(this.position[1])||i(this.scale[0]-1)||i(this.scale[1]-1)},updateTransform:function(){this.updateNeedTransform();var e=this.parent&&this.parent.needTransform;if(this.needTransform=this.needLocalTransform||e,this.needTransform){var t=this.transform||n.create();if(n.identity(t),this.needLocalTransform){var a=this.scale;if(i(a[0])||i(a[1])){o[0]=-a[2]||0,o[1]=-a[3]||0;var s=i(o[0])||i(o[1]);s&&r(t,t,o),n.scale(t,t,a),s&&(o[0]=-o[0],o[1]=-o[1],r(t,t,o))}if(this.rotation instanceof Array){if(0!==this.rotation[0]){o[0]=-this.rotation[1]||0,o[1]=-this.rotation[2]||0;var s=i(o[0])||i(o[1]);s&&r(t,t,o),n.rotate(t,t,this.rotation[0]),s&&(o[0]=-o[0],o[1]=-o[1],r(t,t,o))}}else 0!==this.rotation&&n.rotate(t,t,this.rotation);(i(this.position[0])||i(this.position[1]))&&r(t,t,this.position)}e&&(this.needLocalTransform?n.mul(t,this.parent.transform,t):n.copy(t,this.parent.transform)),this.transform=t,this.invTransform=this.invTransform||n.create(),n.invert(this.invTransform,t)}},setTransform:function(e){if(this.needTransform){var t=this.transform;e.transform(t[0],t[1],t[2],t[3],t[4],t[5])}},lookAt:function(){var e=a.create();return function(i){this.transform||(this.transform=n.create());var o=this.transform;if(a.sub(e,i,this.position),!t(e[0])||!t(e[1])){a.normalize(e,e);var r=this.scale;o[2]=e[0]*r[1],o[3]=e[1]*r[1],o[0]=e[1]*r[0],o[1]=-e[0]*r[0],o[4]=this.position[0],o[5]=this.position[1],this.decomposeTransform()}}}(),decomposeTransform:function(){if(this.transform){var e=this.transform,t=e[0]*e[0]+e[1]*e[1],n=this.position,a=this.scale,o=this.rotation;i(t-1)&&(t=Math.sqrt(t));var r=e[2]*e[2]+e[3]*e[3];i(r-1)&&(r=Math.sqrt(r)),n[0]=e[4],n[1]=e[5],a[0]=t,a[1]=r,a[2]=a[3]=0,o[0]=Math.atan2(-e[1]/r,e[0]/t),o[1]=o[2]=0}},transformCoordToLocal:function(e,t){var i=[e,t];return this.needTransform&&this.invTransform&&a.applyTransform(i,i,this.invTransform),i}},l}),define("zrender/Group",["require","./tool/guid","./tool/util","./mixin/Transformable","./mixin/Eventful"],function(e){var t=e("./tool/guid"),i=e("./tool/util"),n=e("./mixin/Transformable"),a=e("./mixin/Eventful"),o=function(e){e=e||{},this.id=e.id||t();for(var i in e)this[i]=e[i];this.type="group",this.clipShape=null,this._children=[],this._storage=null,this.__dirty=!0,n.call(this),a.call(this)};return o.prototype.ignore=!1,o.prototype.children=function(){return this._children.slice()},o.prototype.childAt=function(e){return this._children[e]},o.prototype.addChild=function(e){e!=this&&e.parent!=this&&(e.parent&&e.parent.removeChild(e),this._children.push(e),e.parent=this,this._storage&&this._storage!==e._storage&&(this._storage.addToMap(e),e instanceof o&&e.addChildrenToStorage(this._storage)))},o.prototype.removeChild=function(e){var t=i.indexOf(this._children,e);t>=0&&this._children.splice(t,1),e.parent=null,this._storage&&(this._storage.delFromMap(e.id),e instanceof o&&e.delChildrenFromStorage(this._storage))},o.prototype.clearChildren=function(){for(var e=0;e<this._children.length;e++){var t=this._children[e];this._storage&&(this._storage.delFromMap(t.id),t instanceof o&&t.delChildrenFromStorage(this._storage))}this._children.length=0},o.prototype.eachChild=function(e,t){for(var i=!!t,n=0;n<this._children.length;n++){var a=this._children[n];i?e.call(t,a):e(a)}},o.prototype.traverse=function(e,t){for(var i=!!t,n=0;n<this._children.length;n++){var a=this._children[n];i?e.call(t,a):e(a),"group"===a.type&&a.traverse(e,t)}},o.prototype.addChildrenToStorage=function(e){for(var t=0;t<this._children.length;t++){var i=this._children[t];e.addToMap(i),i instanceof o&&i.addChildrenToStorage(e)}},o.prototype.delChildrenFromStorage=function(e){for(var t=0;t<this._children.length;t++){var i=this._children[t];e.delFromMap(i.id),i instanceof o&&i.delChildrenFromStorage(e)}},o.prototype.modSelf=function(){this.__dirty=!0},i.merge(o.prototype,n.prototype,!0),i.merge(o.prototype,a.prototype,!0),o}),define("zrender/animation/Clip",["require","./easing"],function(e){function t(e){this._targetPool=e.target||{},this._targetPool instanceof Array||(this._targetPool=[this._targetPool]),this._life=e.life||1e3,this._delay=e.delay||0,this._startTime=(new Date).getTime()+this._delay,this._endTime=this._startTime+1e3*this._life,this.loop="undefined"==typeof e.loop?!1:e.loop,this.gap=e.gap||0,this.easing=e.easing||"Linear",this.onframe=e.onframe,this.ondestroy=e.ondestroy,this.onrestart=e.onrestart}var i=e("./easing");return t.prototype={step:function(e){var t=(e-this._startTime)/this._life;if(!(0>t)){t=Math.min(t,1);var n="string"==typeof this.easing?i[this.easing]:this.easing,a="function"==typeof n?n(t):t;return this.fire("frame",a),1==t?this.loop?(this.restart(),"restart"):(this.__needsRemove=!0,"destroy"):null}},restart:function(){var e=(new Date).getTime(),t=(e-this._startTime)%this._life;this._startTime=(new Date).getTime()-t+this.gap,this.__needsRemove=!1},fire:function(e,t){for(var i=0,n=this._targetPool.length;n>i;i++)this["on"+e]&&this["on"+e](this._targetPool[i],t)},constructor:t},t}),define("zrender/animation/easing",[],function(){var e={Linear:function(e){return e},QuadraticIn:function(e){return e*e},QuadraticOut:function(e){return e*(2-e)},QuadraticInOut:function(e){return(e*=2)<1?.5*e*e:-.5*(--e*(e-2)-1)},CubicIn:function(e){return e*e*e},CubicOut:function(e){return--e*e*e+1},CubicInOut:function(e){return(e*=2)<1?.5*e*e*e:.5*((e-=2)*e*e+2)},QuarticIn:function(e){return e*e*e*e},QuarticOut:function(e){return 1- --e*e*e*e},QuarticInOut:function(e){return(e*=2)<1?.5*e*e*e*e:-.5*((e-=2)*e*e*e-2)},QuinticIn:function(e){return e*e*e*e*e},QuinticOut:function(e){return--e*e*e*e*e+1},QuinticInOut:function(e){return(e*=2)<1?.5*e*e*e*e*e:.5*((e-=2)*e*e*e*e+2)},SinusoidalIn:function(e){return 1-Math.cos(e*Math.PI/2)},SinusoidalOut:function(e){return Math.sin(e*Math.PI/2)},SinusoidalInOut:function(e){return.5*(1-Math.cos(Math.PI*e))},ExponentialIn:function(e){return 0===e?0:Math.pow(1024,e-1)},ExponentialOut:function(e){return 1===e?1:1-Math.pow(2,-10*e)},ExponentialInOut:function(e){return 0===e?0:1===e?1:(e*=2)<1?.5*Math.pow(1024,e-1):.5*(-Math.pow(2,-10*(e-1))+2)},CircularIn:function(e){return 1-Math.sqrt(1-e*e)},CircularOut:function(e){return Math.sqrt(1- --e*e)},CircularInOut:function(e){return(e*=2)<1?-.5*(Math.sqrt(1-e*e)-1):.5*(Math.sqrt(1-(e-=2)*e)+1)},ElasticIn:function(e){var t,i=.1,n=.4;return 0===e?0:1===e?1:(!i||1>i?(i=1,t=n/4):t=n*Math.asin(1/i)/(2*Math.PI),-(i*Math.pow(2,10*(e-=1))*Math.sin(2*(e-t)*Math.PI/n)))},ElasticOut:function(e){var t,i=.1,n=.4;return 0===e?0:1===e?1:(!i||1>i?(i=1,t=n/4):t=n*Math.asin(1/i)/(2*Math.PI),i*Math.pow(2,-10*e)*Math.sin(2*(e-t)*Math.PI/n)+1);

},ElasticInOut:function(e){var t,i=.1,n=.4;return 0===e?0:1===e?1:(!i||1>i?(i=1,t=n/4):t=n*Math.asin(1/i)/(2*Math.PI),(e*=2)<1?-.5*i*Math.pow(2,10*(e-=1))*Math.sin(2*(e-t)*Math.PI/n):i*Math.pow(2,-10*(e-=1))*Math.sin(2*(e-t)*Math.PI/n)*.5+1)},BackIn:function(e){var t=1.70158;return e*e*((t+1)*e-t)},BackOut:function(e){var t=1.70158;return--e*e*((t+1)*e+t)+1},BackInOut:function(e){var t=2.5949095;return(e*=2)<1?.5*e*e*((t+1)*e-t):.5*((e-=2)*e*((t+1)*e+t)+2)},BounceIn:function(t){return 1-e.BounceOut(1-t)},BounceOut:function(e){return 1/2.75>e?7.5625*e*e:2/2.75>e?7.5625*(e-=1.5/2.75)*e+.75:2.5/2.75>e?7.5625*(e-=2.25/2.75)*e+.9375:7.5625*(e-=2.625/2.75)*e+.984375},BounceInOut:function(t){return.5>t?.5*e.BounceIn(2*t):.5*e.BounceOut(2*t-1)+.5}};return e}),define("echarts/chart/base",["require","zrender/shape/Image","../util/shape/Icon","../util/shape/MarkLine","../util/shape/Symbol","zrender/shape/Polyline","zrender/shape/ShapeBundle","../config","../util/ecData","../util/ecAnimation","../util/ecEffect","../util/accMath","../component/base","../layout/EdgeBundling","zrender/tool/util","zrender/tool/area"],function(e){function t(e){return null!=e.x&&null!=e.y}function i(e,t,i,n,a){u.call(this,e,t,i,n,a);var o=this;this.selectedMap={},this.lastShapeList=[],this.shapeHandler={onclick:function(){o.isClick=!0},ondragover:function(e){var t=e.target;t.highlightStyle=t.highlightStyle||{};var i=t.highlightStyle,n=i.brushTyep,a=i.strokeColor,r=i.lineWidth;i.brushType="stroke",i.strokeColor=o.ecTheme.calculableColor||h.calculableColor,i.lineWidth="icon"===t.type?30:10,o.zr.addHoverShape(t),setTimeout(function(){i&&(i.brushType=n,i.strokeColor=a,i.lineWidth=r)},20)},ondrop:function(e){null!=d.get(e.dragged,"data")&&(o.isDrop=!0)},ondragend:function(){o.isDragend=!0}}}var n=e("zrender/shape/Image"),a=e("../util/shape/Icon"),o=e("../util/shape/MarkLine"),r=e("../util/shape/Symbol"),s=e("zrender/shape/Polyline"),l=e("zrender/shape/ShapeBundle"),h=e("../config"),d=e("../util/ecData"),c=e("../util/ecAnimation"),m=e("../util/ecEffect"),p=e("../util/accMath"),u=e("../component/base"),V=e("../layout/EdgeBundling"),U=e("zrender/tool/util"),g=e("zrender/tool/area");return i.prototype={setCalculable:function(e){return e.dragEnableTime=this.ecTheme.DRAG_ENABLE_TIME||h.DRAG_ENABLE_TIME,e.ondragover=this.shapeHandler.ondragover,e.ondragend=this.shapeHandler.ondragend,e.ondrop=this.shapeHandler.ondrop,e},ondrop:function(e,t){if(this.isDrop&&e.target&&!t.dragIn){var i,n=e.target,a=e.dragged,o=d.get(n,"seriesIndex"),r=d.get(n,"dataIndex"),s=this.series,l=this.component.legend;if(-1===r){if(d.get(a,"seriesIndex")==o)return t.dragOut=t.dragIn=t.needRefresh=!0,void(this.isDrop=!1);i={value:d.get(a,"value"),name:d.get(a,"name")},this.type===h.CHART_TYPE_PIE&&i.value<0&&(i.value=0);for(var c=!1,m=s[o].data,u=0,V=m.length;V>u;u++)m[u].name===i.name&&"-"===m[u].value&&(s[o].data[u].value=i.value,c=!0);!c&&s[o].data.push(i),l&&l.add(i.name,a.style.color||a.style.strokeColor)}else i=s[o].data[r]||"-",null!=i.value?(s[o].data[r].value="-"!=i.value?p.accAdd(s[o].data[r].value,d.get(a,"value")):d.get(a,"value"),(this.type===h.CHART_TYPE_FUNNEL||this.type===h.CHART_TYPE_PIE)&&(l&&1===l.getRelatedAmount(i.name)&&this.component.legend.del(i.name),i.name+=this.option.nameConnector+d.get(a,"name"),l&&l.add(i.name,a.style.color||a.style.strokeColor))):s[o].data[r]="-"!=i?p.accAdd(s[o].data[r],d.get(a,"value")):d.get(a,"value");t.dragIn=t.dragIn||!0,this.isDrop=!1;var U=this;setTimeout(function(){U.zr.trigger("mousemove",e.event)},300)}},ondragend:function(e,t){if(this.isDragend&&e.target&&!t.dragOut){var i=e.target,n=d.get(i,"seriesIndex"),a=d.get(i,"dataIndex"),o=this.series;if(null!=o[n].data[a].value){o[n].data[a].value="-";var r=o[n].data[a].name,s=this.component.legend;s&&0===s.getRelatedAmount(r)&&s.del(r)}else o[n].data[a]="-";t.dragOut=!0,t.needRefresh=!0,this.isDragend=!1}},onlegendSelected:function(e,t){var i=e.selected;for(var n in this.selectedMap)this.selectedMap[n]!=i[n]&&(t.needRefresh=!0),this.selectedMap[n]=i[n]},_buildPosition:function(){this._symbol=this.option.symbolList,this._sIndex2ShapeMap={},this._sIndex2ColorMap={},this.selectedMap={},this.xMarkMap={};for(var e,t,i,n,a=this.series,o={top:[],bottom:[],left:[],right:[],other:[]},r=0,s=a.length;s>r;r++)a[r].type===this.type&&(a[r]=this.reformOption(a[r]),this.legendHoverLink=a[r].legendHoverLink||this.legendHoverLink,e=a[r].xAxisIndex,t=a[r].yAxisIndex,i=this.component.xAxis.getAxis(e),n=this.component.yAxis.getAxis(t),i.type===h.COMPONENT_TYPE_AXIS_CATEGORY?o[i.getPosition()].push(r):n.type===h.COMPONENT_TYPE_AXIS_CATEGORY?o[n.getPosition()].push(r):o.other.push(r));for(var l in o)o[l].length>0&&this._buildSinglePosition(l,o[l]);this.addShapeList()},_buildSinglePosition:function(e,t){var i=this._mapData(t),n=i.locationMap,a=i.maxDataLength;if(0!==a&&0!==n.length){switch(e){case"bottom":case"top":this._buildHorizontal(t,a,n,this.xMarkMap);break;case"left":case"right":this._buildVertical(t,a,n,this.xMarkMap);break;case"other":this._buildOther(t,a,n,this.xMarkMap)}for(var o=0,r=t.length;r>o;o++)this.buildMark(t[o])}},_mapData:function(e){for(var t,i,n,a,o=this.series,r=0,s={},l="__kener__stack__",d=this.component.legend,c=[],m=0,p=0,u=e.length;u>p;p++){if(t=o[e[p]],n=t.name,this._sIndex2ShapeMap[e[p]]=this._sIndex2ShapeMap[e[p]]||this.query(t,"symbol")||this._symbol[p%this._symbol.length],d){if(this.selectedMap[n]=d.isSelected(n),this._sIndex2ColorMap[e[p]]=d.getColor(n),a=d.getItemShape(n)){var V=a.style;if(this.type==h.CHART_TYPE_LINE)V.iconType="legendLineIcon",V.symbol=this._sIndex2ShapeMap[e[p]];else if(t.itemStyle.normal.barBorderWidth>0){var U=a.highlightStyle;V.brushType="both",V.x+=1,V.y+=1,V.width-=2,V.height-=2,V.strokeColor=U.strokeColor=t.itemStyle.normal.barBorderColor,U.lineWidth=3}d.setItemShape(n,a)}}else this.selectedMap[n]=!0,this._sIndex2ColorMap[e[p]]=this.zr.getColor(e[p]);this.selectedMap[n]&&(i=t.stack||l+e[p],null==s[i]?(s[i]=r,c[r]=[e[p]],r++):c[s[i]].push(e[p])),m=Math.max(m,t.data.length)}return{locationMap:c,maxDataLength:m}},_calculMarkMapXY:function(e,t,i){for(var n=this.series,a=0,o=t.length;o>a;a++)for(var r=0,s=t[a].length;s>r;r++){var l=t[a][r],h="xy"==i?0:"",d=this.component.grid,c=e[l];if("-1"!=i.indexOf("x")){c["counter"+h]>0&&(c["average"+h]=c["sum"+h]/c["counter"+h]);var m=this.component.xAxis.getAxis(n[l].xAxisIndex||0).getCoord(c["average"+h]);c["averageLine"+h]=[[m,d.getYend()],[m,d.getY()]],c["minLine"+h]=[[c["minX"+h],d.getYend()],[c["minX"+h],d.getY()]],c["maxLine"+h]=[[c["maxX"+h],d.getYend()],[c["maxX"+h],d.getY()]],c.isHorizontal=!1}if(h="xy"==i?1:"","-1"!=i.indexOf("y")){c["counter"+h]>0&&(c["average"+h]=c["sum"+h]/c["counter"+h]);var p=this.component.yAxis.getAxis(n[l].yAxisIndex||0).getCoord(c["average"+h]);c["averageLine"+h]=[[d.getX(),p],[d.getXend(),p]],c["minLine"+h]=[[d.getX(),c["minY"+h]],[d.getXend(),c["minY"+h]]],c["maxLine"+h]=[[d.getX(),c["maxY"+h]],[d.getXend(),c["maxY"+h]]],c.isHorizontal=!0}}},addLabel:function(e,t,i,n,a){var o=[i,t],r=this.deepMerge(o,"itemStyle.normal.label"),s=this.deepMerge(o,"itemStyle.emphasis.label"),l=r.textStyle||{},h=s.textStyle||{};if(r.show){var d=e.style;d.text=this._getLabelText(t,i,n,"normal"),d.textPosition=null==r.position?"horizontal"===a?"right":"top":r.position,d.textColor=l.color,d.textFont=this.getFont(l),d.textAlign=l.align,d.textBaseline=l.baseline}if(s.show){var c=e.highlightStyle;c.text=this._getLabelText(t,i,n,"emphasis"),c.textPosition=r.show?e.style.textPosition:null==s.position?"horizontal"===a?"right":"top":s.position,c.textColor=h.color,c.textFont=this.getFont(h),c.textAlign=h.align,c.textBaseline=h.baseline}return e},_getLabelText:function(e,t,i,n){var a=this.deepQuery([t,e],"itemStyle."+n+".label.formatter");a||"emphasis"!==n||(a=this.deepQuery([t,e],"itemStyle.normal.label.formatter"));var o=this.getDataFromOption(t,"-");return a?"function"==typeof a?a.call(this.myChart,{seriesName:e.name,series:e,name:i,value:o,data:t,status:n}):"string"==typeof a?a=a.replace("{a}","{a0}").replace("{b}","{b0}").replace("{c}","{c0}").replace("{a0}",e.name).replace("{b0}",i).replace("{c0}",this.numAddCommas(o)):void 0:o instanceof Array?null!=o[2]?this.numAddCommas(o[2]):o[0]+" , "+o[1]:this.numAddCommas(o)},buildMark:function(e){var t=this.series[e];this.selectedMap[t.name]&&(t.markLine&&this._buildMarkLine(e),t.markPoint&&this._buildMarkPoint(e))},_buildMarkPoint:function(e){for(var t,i,n=(this.markAttachStyle||{})[e],a=this.series[e],o=U.clone(a.markPoint),r=0,s=o.data.length;s>r;r++)t=o.data[r],i=this.getMarkCoord(e,t),t.x=null!=t.x?t.x:i[0],t.y=null!=t.y?t.y:i[1],!t.type||"max"!==t.type&&"min"!==t.type||(t.value=i[3],t.name=t.name||t.type,t.symbolSize=t.symbolSize||g.getTextWidth(i[3],this.getFont())/2+5);for(var l=this._markPoint(e,o),r=0,s=l.length;s>r;r++){var d=l[r];d.zlevel=a.zlevel,d.z=a.z+1;for(var c in n)d[c]=U.clone(n[c]);this.shapeList.push(d)}if(this.type===h.CHART_TYPE_FORCE||this.type===h.CHART_TYPE_CHORD)for(var r=0,s=l.length;s>r;r++)this.zr.addShape(l[r])},_buildMarkLine:function(e){for(var t,i=(this.markAttachStyle||{})[e],n=this.series[e],a=U.clone(n.markLine),o=0,r=a.data.length;r>o;o++){var s=a.data[o];!s.type||"max"!==s.type&&"min"!==s.type&&"average"!==s.type?t=[this.getMarkCoord(e,s[0]),this.getMarkCoord(e,s[1])]:(t=this.getMarkCoord(e,s),a.data[o]=[U.clone(s),{}],a.data[o][0].name=s.name||s.type,a.data[o][0].value="average"!==s.type?t[3]:+t[3].toFixed(null!=a.precision?a.precision:this.deepQuery([this.ecTheme,h],"markLine.precision")),t=t[2],s=[{},{}]),null!=t&&null!=t[0]&&null!=t[1]&&(a.data[o][0].x=null!=s[0].x?s[0].x:t[0][0],a.data[o][0].y=null!=s[0].y?s[0].y:t[0][1],a.data[o][1].x=null!=s[1].x?s[1].x:t[1][0],a.data[o][1].y=null!=s[1].y?s[1].y:t[1][1])}var d=this._markLine(e,a),c=a.large;if(c){var m=new l({style:{shapeList:d}}),p=d[0];if(p){U.merge(m.style,p.style),U.merge(m.highlightStyle={},p.highlightStyle),m.style.brushType="stroke",m.zlevel=n.zlevel,m.z=n.z+1,m.hoverable=!1;for(var u in i)m[u]=U.clone(i[u])}this.shapeList.push(m),this.zr.addShape(m),m._mark="largeLine";var V=a.effect;V.show&&(m.effect=V)}else{for(var o=0,r=d.length;r>o;o++){var g=d[o];g.zlevel=n.zlevel,g.z=n.z+1;for(var u in i)g[u]=U.clone(i[u]);this.shapeList.push(g)}if(this.type===h.CHART_TYPE_FORCE||this.type===h.CHART_TYPE_CHORD)for(var o=0,r=d.length;r>o;o++)this.zr.addShape(d[o])}},_markPoint:function(e,t){var i=this.series[e],n=this.component;U.merge(U.merge(t,U.clone(this.ecTheme.markPoint||{})),U.clone(h.markPoint)),t.name=i.name;var a,o,r,s,l,c,m,p=[],u=t.data,V=n.dataRange,g=n.legend,f=this.zr.getWidth(),y=this.zr.getHeight();if(t.large)a=this.getLargeMarkPointShape(e,t),a._mark="largePoint",a&&p.push(a);else for(var b=0,_=u.length;_>b;b++)null!=u[b].x&&null!=u[b].y&&(r=null!=u[b].value?u[b].value:"",g&&(o=g.getColor(i.name)),V&&(o=isNaN(r)?o:V.getColor(r),s=[u[b],t],l=this.deepQuery(s,"itemStyle.normal.color")||o,c=this.deepQuery(s,"itemStyle.emphasis.color")||l,null==l&&null==c)||(o=null==o?this.zr.getColor(e):o,u[b].tooltip=u[b].tooltip||t.tooltip||{trigger:"item"},u[b].name=null!=u[b].name?u[b].name:"",u[b].value=r,a=this.getSymbolShape(t,e,u[b],b,u[b].name,this.parsePercent(u[b].x,f),this.parsePercent(u[b].y,y),"pin",o,"rgba(0,0,0,0)","horizontal"),a._mark="point",m=this.deepMerge([u[b],t],"effect"),m.show&&(a.effect=m),i.type===h.CHART_TYPE_MAP&&(a._geo=this.getMarkGeo(u[b])),d.pack(a,i,e,u[b],b,u[b].name,r),p.push(a)));return p},_markLine:function(){function e(e,t){e[t]=e[t]instanceof Array?e[t].length>1?e[t]:[e[t][0],e[t][0]]:[e[t],e[t]]}return function(i,n){var a=this.series[i],o=this.component,r=o.dataRange,s=o.legend;U.merge(U.merge(n,U.clone(this.ecTheme.markLine||{})),U.clone(h.markLine));var l=s?s.getColor(a.name):this.zr.getColor(i);e(n,"symbol"),e(n,"symbolSize"),e(n,"symbolRotate");for(var c=n.data,m=[],p=this.zr.getWidth(),u=this.zr.getHeight(),g=0;g<c.length;g++){var f=c[g];if(t(f[0])&&t(f[1])){var y=this.deepMerge(f),b=[y,n],_=l,x=null!=y.value?y.value:"";if(r){_=isNaN(x)?_:r.getColor(x);var k=this.deepQuery(b,"itemStyle.normal.color")||_,v=this.deepQuery(b,"itemStyle.emphasis.color")||k;if(null==k&&null==v)continue}f[0].tooltip=y.tooltip||n.tooltip||{trigger:"item"},f[0].name=f[0].name||"",f[1].name=f[1].name||"",f[0].value=x,m.push({points:[[this.parsePercent(f[0].x,p),this.parsePercent(f[0].y,u)],[this.parsePercent(f[1].x,p),this.parsePercent(f[1].y,u)]],rawData:f,color:_})}}var L=this.query(n,"bundling.enable");if(L){var w=new V;w.maxTurningAngle=this.query(n,"bundling.maxTurningAngle")/180*Math.PI,m=w.run(m)}n.name=a.name;for(var W=[],g=0,X=m.length;X>g;g++){var I=m[g],S=I.rawEdge||I,f=S.rawData,x=null!=f.value?f.value:"",K=this.getMarkLineShape(n,i,f,g,I.points,L,S.color);K._mark="line";var C=this.deepMerge([f[0],f[1],n],"effect");C.show&&(K.effect=C,K.effect.large=n.large),a.type===h.CHART_TYPE_MAP&&(K._geo=[this.getMarkGeo(f[0]),this.getMarkGeo(f[1])]),d.pack(K,a,i,f[0],g,f[0].name+(""!==f[1].name?" > "+f[1].name:""),x),W.push(K)}return W}}(),getMarkCoord:function(){return[0,0]},getSymbolShape:function(e,t,i,o,r,s,l,h,c,m,p){var u=[i,e],V=this.getDataFromOption(i,"-");h=this.deepQuery(u,"symbol")||h;var U=this.deepQuery(u,"symbolSize");U="function"==typeof U?U(V):U,"number"==typeof U&&(U=[U,U]);var g=this.deepQuery(u,"symbolRotate"),f=this.deepMerge(u,"itemStyle.normal"),y=this.deepMerge(u,"itemStyle.emphasis"),b=null!=f.borderWidth?f.borderWidth:f.lineStyle&&f.lineStyle.width;null==b&&(b=h.match("empty")?2:0);var _=null!=y.borderWidth?y.borderWidth:y.lineStyle&&y.lineStyle.width;null==_&&(_=b+2);var x=this.getItemStyleColor(f.color,t,o,i),k=this.getItemStyleColor(y.color,t,o,i),v=U[0],L=U[1],w=new a({style:{iconType:h.replace("empty","").toLowerCase(),x:s-v,y:l-L,width:2*v,height:2*L,brushType:"both",color:h.match("empty")?m:x||c,strokeColor:f.borderColor||x||c,lineWidth:b},highlightStyle:{color:h.match("empty")?m:k||x||c,strokeColor:y.borderColor||f.borderColor||k||x||c,lineWidth:_},clickable:this.deepQuery(u,"clickable")});return h.match("image")&&(w.style.image=h.replace(new RegExp("^image:\\/\\/"),""),w=new n({style:w.style,highlightStyle:w.highlightStyle,clickable:this.deepQuery(u,"clickable")})),null!=g&&(w.rotation=[g*Math.PI/180,s,l]),h.match("star")&&(w.style.iconType="star",w.style.n=h.replace("empty","").replace("star","")-0||5),"none"===h&&(w.invisible=!0,w.hoverable=!1),w=this.addLabel(w,e,i,r,p),h.match("empty")&&(null==w.style.textColor&&(w.style.textColor=w.style.strokeColor),null==w.highlightStyle.textColor&&(w.highlightStyle.textColor=w.highlightStyle.strokeColor)),d.pack(w,e,t,i,o,r),w._x=s,w._y=l,w._dataIndex=o,w._seriesIndex=t,w},getMarkLineShape:function(e,t,i,n,a,r,l){var h=null!=i[0].value?i[0].value:"-",d=null!=i[1].value?i[1].value:"-",c=[i[0].symbol||e.symbol[0],i[1].symbol||e.symbol[1]],m=[i[0].symbolSize||e.symbolSize[0],i[1].symbolSize||e.symbolSize[1]];m[0]="function"==typeof m[0]?m[0](h):m[0],m[1]="function"==typeof m[1]?m[1](d):m[1];var p=[this.query(i[0],"symbolRotate")||e.symbolRotate[0],this.query(i[1],"symbolRotate")||e.symbolRotate[1]],u=[i[0],i[1],e],V=this.deepMerge(u,"itemStyle.normal");V.color=this.getItemStyleColor(V.color,t,n,i);var U=this.deepMerge(u,"itemStyle.emphasis");U.color=this.getItemStyleColor(U.color,t,n,i);var g=V.lineStyle,f=U.lineStyle,y=g.width;null==y&&(y=V.borderWidth);var b=f.width;null==b&&(b=null!=U.borderWidth?U.borderWidth:y+2);var _=this.deepQuery(u,"smoothness");this.deepQuery(u,"smooth")||(_=0);var x=r?s:o,k=new x({style:{symbol:c,symbolSize:m,symbolRotate:p,brushType:"both",lineType:g.type,shadowColor:g.shadowColor||g.color||V.borderColor||V.color||l,shadowBlur:g.shadowBlur,shadowOffsetX:g.shadowOffsetX,shadowOffsetY:g.shadowOffsetY,color:V.color||l,strokeColor:g.color||V.borderColor||V.color||l,lineWidth:y,symbolBorderColor:V.borderColor||V.color||l,symbolBorder:V.borderWidth},highlightStyle:{shadowColor:f.shadowColor,shadowBlur:f.shadowBlur,shadowOffsetX:f.shadowOffsetX,shadowOffsetY:f.shadowOffsetY,color:U.color||V.color||l,strokeColor:f.color||g.color||U.borderColor||V.borderColor||U.color||V.color||l,lineWidth:b,symbolBorderColor:U.borderColor||V.borderColor||U.color||V.color||l,symbolBorder:null==U.borderWidth?V.borderWidth+2:U.borderWidth},clickable:this.deepQuery(u,"clickable")}),v=k.style;return r?(v.pointList=a,v.smooth=_):(v.xStart=a[0][0],v.yStart=a[0][1],v.xEnd=a[1][0],v.yEnd=a[1][1],v.curveness=_,k.updatePoints(k.style)),k=this.addLabel(k,e,i[0],i[0].name+" : "+i[1].name)},getLargeMarkPointShape:function(e,t){var i,n,a,o,s,l,h=this.series[e],d=this.component,c=t.data,m=d.dataRange,p=d.legend,u=[c[0],t];if(p&&(n=p.getColor(h.name)),!m||(a=null!=c[0].value?c[0].value:"",n=isNaN(a)?n:m.getColor(a),o=this.deepQuery(u,"itemStyle.normal.color")||n,s=this.deepQuery(u,"itemStyle.emphasis.color")||o,null!=o||null!=s)){n=this.deepMerge(u,"itemStyle.normal").color||n;var V=this.deepQuery(u,"symbol")||"circle";V=V.replace("empty","").replace(/\d/g,""),l=this.deepMerge([c[0],t],"effect");var U=window.devicePixelRatio||1;return i=new r({style:{pointList:c,color:n,strokeColor:n,shadowColor:l.shadowColor||n,shadowBlur:(null!=l.shadowBlur?l.shadowBlur:8)*U,size:this.deepQuery(u,"symbolSize"),iconType:V,brushType:"fill",lineWidth:1},draggable:!1,hoverable:!1}),l.show&&(i.effect=l),i}},backupShapeList:function(){this.shapeList&&this.shapeList.length>0?(this.lastShapeList=this.shapeList,this.shapeList=[]):this.lastShapeList=[]},addShapeList:function(){var e,t,i=this.option.animationThreshold/(this.canvasSupported?2:4),n=this.lastShapeList,a=this.shapeList,o=n.length>0,r=o?this.query(this.option,"animationDurationUpdate"):this.query(this.option,"animationDuration"),s=this.query(this.option,"animationEasing"),l={},d={};if(this.option.animation&&!this.option.renderAsImage&&a.length<i&&!this.motionlessOnce){for(var c=0,m=n.length;m>c;c++)t=this._getAnimationKey(n[c]),t.match("undefined")?this.zr.delShape(n[c].id):(t+=n[c].type,l[t]?this.zr.delShape(n[c].id):l[t]=n[c]);for(var c=0,m=a.length;m>c;c++)t=this._getAnimationKey(a[c]),t.match("undefined")?this.zr.addShape(a[c]):(t+=a[c].type,d[t]=a[c]);for(t in l)d[t]||this.zr.delShape(l[t].id);for(t in d)l[t]?(this.zr.delShape(l[t].id),this._animateMod(l[t],d[t],r,s,0,o)):(e=this.type!=h.CHART_TYPE_LINE&&this.type!=h.CHART_TYPE_RADAR||0===t.indexOf("icon")?0:r/2,this._animateMod(!1,d[t],r,s,e,o));this.zr.refresh(),this.animationEffect()}else{this.motionlessOnce=!1,this.zr.delShape(n);for(var c=0,m=a.length;m>c;c++)this.zr.addShape(a[c])}},_getAnimationKey:function(e){return this.type!=h.CHART_TYPE_MAP&&this.type!=h.CHART_TYPE_TREEMAP&&this.type!=h.CHART_TYPE_VENN&&this.type!=h.CHART_TYPE_TREE?d.get(e,"seriesIndex")+"_"+d.get(e,"dataIndex")+(e._mark?e._mark:"")+(this.type===h.CHART_TYPE_RADAR?d.get(e,"special"):""):d.get(e,"seriesIndex")+"_"+d.get(e,"dataIndex")+(e._mark?e._mark:"undefined")},_animateMod:function(e,t,i,n,a,o){switch(t.type){case"polyline":case"half-smooth-polygon":c.pointList(this.zr,e,t,i,n);break;case"rectangle":c.rectangle(this.zr,e,t,i,n);break;case"image":case"icon":c.icon(this.zr,e,t,i,n,a);break;case"candle":o?this.zr.addShape(t):c.candle(this.zr,e,t,i,n);break;case"ring":case"sector":case"circle":o?"sector"===t.type?c.sector(this.zr,e,t,i,n):this.zr.addShape(t):c.ring(this.zr,e,t,i+(d.get(t,"dataIndex")||0)%20*100,n);break;case"text":c.text(this.zr,e,t,i,n);break;case"polygon":o?c.pointList(this.zr,e,t,i,n):c.polygon(this.zr,e,t,i,n);break;case"ribbon":c.ribbon(this.zr,e,t,i,n);break;case"gauge-pointer":c.gaugePointer(this.zr,e,t,i,n);break;case"mark-line":c.markline(this.zr,e,t,i,n);break;case"bezier-curve":case"line":c.line(this.zr,e,t,i,n);break;default:this.zr.addShape(t)}},animationMark:function(e,t,i){for(var i=i||this.shapeList,n=0,a=i.length;a>n;n++)i[n]._mark&&this._animateMod(!1,i[n],e,t,0,!0);this.animationEffect(i)},animationEffect:function(e){if(!e&&this.clearEffectShape(),e=e||this.shapeList,null!=e){var t=h.EFFECT_ZLEVEL;this.canvasSupported&&this.zr.modLayer(t,{motionBlur:!0,lastFrameAlpha:this.option.effectBlendAlpha||h.effectBlendAlpha});for(var i,n=0,a=e.length;a>n;n++)i=e[n],i._mark&&i.effect&&i.effect.show&&m[i._mark]&&(m[i._mark](this.zr,this.effectList,i,t),this.effectList[this.effectList.length-1]._mark=i._mark)}},clearEffectShape:function(e){var t=this.effectList;if(this.zr&&t&&t.length>0){e&&this.zr.modLayer(h.EFFECT_ZLEVEL,{motionBlur:!1}),this.zr.delShape(t);for(var i=0;i<t.length;i++)t[i].effectAnimator&&t[i].effectAnimator.stop()}this.effectList=[]},addMark:function(e,t,i){var n=this.series[e];if(this.selectedMap[n.name]){var a=this.query(this.option,"animationDurationUpdate"),o=this.query(this.option,"animationEasing"),r=n[i].data,s=this.shapeList.length;if(n[i].data=t.data,this["_build"+i.replace("m","M")](e),this.option.animation&&!this.option.renderAsImage)this.animationMark(a,o,this.shapeList.slice(s));else{for(var l=s,h=this.shapeList.length;h>l;l++)this.zr.addShape(this.shapeList[l]);this.zr.refreshNextFrame()}n[i].data=r}},delMark:function(e,t,i){i=i.replace("mark","").replace("large","").toLowerCase();var n=this.series[e];if(this.selectedMap[n.name]){for(var a=!1,o=[this.shapeList,this.effectList],r=2;r--;)for(var s=0,l=o[r].length;l>s;s++)if(o[r][s]._mark==i&&d.get(o[r][s],"seriesIndex")==e&&d.get(o[r][s],"name")==t){this.zr.delShape(o[r][s].id),o[r].splice(s,1),a=!0;break}a&&this.zr.refreshNextFrame()}}},U.inherits(i,u),i}),define("zrender/shape/Circle",["require","./Base","../tool/util"],function(e){"use strict";var t=e("./Base"),i=function(e){t.call(this,e)};return i.prototype={type:"circle",buildPath:function(e,t){e.moveTo(t.x+t.r,t.y),e.arc(t.x,t.y,t.r,0,2*Math.PI,!0)},getRect:function(e){if(e.__rect)return e.__rect;var t;return t="stroke"==e.brushType||"fill"==e.brushType?e.lineWidth||1:0,e.__rect={x:Math.round(e.x-e.r-t/2),y:Math.round(e.y-e.r-t/2),width:2*e.r+t,height:2*e.r+t},e.__rect}},e("../tool/util").inherits(i,t),i}),define("echarts/util/accMath",[],function(){function e(e,t){var i=e.toString(),n=t.toString(),a=0;try{a=n.split(".")[1].length}catch(o){}try{a-=i.split(".")[1].length}catch(o){}return(i.replace(".","")-0)/(n.replace(".","")-0)*Math.pow(10,a)}function t(e,t){var i=e.toString(),n=t.toString(),a=0;try{a+=i.split(".")[1].length}catch(o){}try{a+=n.split(".")[1].length}catch(o){}return(i.replace(".","")-0)*(n.replace(".","")-0)/Math.pow(10,a)}function i(e,t){var i=0,n=0;try{i=e.toString().split(".")[1].length}catch(a){}try{n=t.toString().split(".")[1].length}catch(a){}var o=Math.pow(10,Math.max(i,n));return(Math.round(e*o)+Math.round(t*o))/o}function n(e,t){return i(e,-t)}return{accDiv:e,accMul:t,accAdd:i,accSub:n}}),define("echarts/util/shape/Icon",["require","zrender/tool/util","zrender/shape/Star","zrender/shape/Heart","zrender/shape/Droplet","zrender/shape/Image","zrender/shape/Base"],function(e){function t(e,t){var i=t.x,n=t.y,a=t.width/16,o=t.height/16;e.moveTo(i,n+t.height),e.lineTo(i+5*a,n+14*o),e.lineTo(i+t.width,n+3*o),e.lineTo(i+13*a,n),e.lineTo(i+2*a,n+11*o),e.lineTo(i,n+t.height),e.moveTo(i+6*a,n+10*o),e.lineTo(i+14*a,n+2*o),e.moveTo(i+10*a,n+13*o),e.lineTo(i+t.width,n+13*o),e.moveTo(i+13*a,n+10*o),e.lineTo(i+13*a,n+t.height)}function i(e,t){var i=t.x,n=t.y,a=t.width/16,o=t.height/16;e.moveTo(i,n+t.height),e.lineTo(i+5*a,n+14*o),e.lineTo(i+t.width,n+3*o),e.lineTo(i+13*a,n),e.lineTo(i+2*a,n+11*o),e.lineTo(i,n+t.height),e.moveTo(i+6*a,n+10*o),e.lineTo(i+14*a,n+2*o),e.moveTo(i+10*a,n+13*o),e.lineTo(i+t.width,n+13*o)}function n(e,t){var i=t.x,n=t.y,a=t.width/16,o=t.height/16;e.moveTo(i+4*a,n+15*o),e.lineTo(i+9*a,n+13*o),e.lineTo(i+14*a,n+8*o),e.lineTo(i+11*a,n+5*o),e.lineTo(i+6*a,n+10*o),e.lineTo(i+4*a,n+15*o),e.moveTo(i+5*a,n),e.lineTo(i+11*a,n),e.moveTo(i+5*a,n+o),e.lineTo(i+11*a,n+o),e.moveTo(i,n+2*o),e.lineTo(i+t.width,n+2*o),e.moveTo(i,n+5*o),e.lineTo(i+3*a,n+t.height),e.lineTo(i+13*a,n+t.height),e.lineTo(i+t.width,n+5*o)}function a(e,t){var i=t.x,n=t.y,a=t.width/16,o=t.height/16;e.moveTo(i,n+3*o),e.lineTo(i+6*a,n+3*o),e.moveTo(i+3*a,n),e.lineTo(i+3*a,n+6*o),e.moveTo(i+3*a,n+8*o),e.lineTo(i+3*a,n+t.height),e.lineTo(i+t.width,n+t.height),e.lineTo(i+t.width,n+3*o),e.lineTo(i+8*a,n+3*o)}function o(e,t){var i=t.x,n=t.y,a=t.width/16,o=t.height/16;e.moveTo(i+6*a,n),e.lineTo(i+2*a,n+3*o),e.lineTo(i+6*a,n+6*o),e.moveTo(i+2*a,n+3*o),e.lineTo(i+14*a,n+3*o),e.lineTo(i+14*a,n+11*o),e.moveTo(i+2*a,n+5*o),e.lineTo(i+2*a,n+13*o),e.lineTo(i+14*a,n+13*o),e.moveTo(i+10*a,n+10*o),e.lineTo(i+14*a,n+13*o),e.lineTo(i+10*a,n+t.height)}function r(e,t){var i=t.x,n=t.y,a=t.width/16,o=t.height/16,r=t.width/2;e.lineWidth=1.5,e.arc(i+r,n+r,r-a,0,2*Math.PI/3),e.moveTo(i+3*a,n+t.height),e.lineTo(i+0*a,n+12*o),e.lineTo(i+5*a,n+11*o),e.moveTo(i,n+8*o),e.arc(i+r,n+r,r-a,Math.PI,5*Math.PI/3),e.moveTo(i+13*a,n),e.lineTo(i+t.width,n+4*o),e.lineTo(i+11*a,n+5*o)}function s(e,t){var i=t.x,n=t.y,a=t.width/16,o=t.height/16;e.moveTo(i,n),e.lineTo(i,n+t.height),e.lineTo(i+t.width,n+t.height),e.moveTo(i+2*a,n+14*o),e.lineTo(i+7*a,n+6*o),e.lineTo(i+11*a,n+11*o),e.lineTo(i+15*a,n+2*o)}function l(e,t){var i=t.x,n=t.y,a=t.width/16,o=t.height/16;e.moveTo(i,n),e.lineTo(i,n+t.height),e.lineTo(i+t.width,n+t.height),e.moveTo(i+3*a,n+14*o),e.lineTo(i+3*a,n+6*o),e.lineTo(i+4*a,n+6*o),e.lineTo(i+4*a,n+14*o),e.moveTo(i+7*a,n+14*o),e.lineTo(i+7*a,n+2*o),e.lineTo(i+8*a,n+2*o),e.lineTo(i+8*a,n+14*o),e.moveTo(i+11*a,n+14*o),e.lineTo(i+11*a,n+9*o),e.lineTo(i+12*a,n+9*o),e.lineTo(i+12*a,n+14*o)}function h(e,t){var i=t.x,n=t.y,a=t.width-2,o=t.height-2,r=Math.min(a,o)/2;n+=2,e.moveTo(i+r+3,n+r-3),e.arc(i+r+3,n+r-3,r-1,0,-Math.PI/2,!0),e.lineTo(i+r+3,n+r-3),e.moveTo(i+r,n),e.lineTo(i+r,n+r),e.arc(i+r,n+r,r,-Math.PI/2,2*Math.PI,!0),e.lineTo(i+r,n+r),e.lineWidth=1.5}function d(e,t){var i=t.x,n=t.y,a=t.width/16,o=t.height/16;n-=o,e.moveTo(i+1*a,n+2*o),e.lineTo(i+15*a,n+2*o),e.lineTo(i+14*a,n+3*o),e.lineTo(i+2*a,n+3*o),e.moveTo(i+3*a,n+6*o),e.lineTo(i+13*a,n+6*o),e.lineTo(i+12*a,n+7*o),e.lineTo(i+4*a,n+7*o),e.moveTo(i+5*a,n+10*o),e.lineTo(i+11*a,n+10*o),e.lineTo(i+10*a,n+11*o),e.lineTo(i+6*a,n+11*o),e.moveTo(i+7*a,n+14*o),e.lineTo(i+9*a,n+14*o),e.lineTo(i+8*a,n+15*o),e.lineTo(i+7*a,n+15*o)}function c(e,t){var i=t.x,n=t.y,a=t.width,o=t.height,r=a/16,s=o/16,l=2*Math.min(r,s);e.moveTo(i+r+l,n+s+l),e.arc(i+r,n+s,l,Math.PI/4,3*Math.PI),e.lineTo(i+7*r-l,n+6*s-l),e.arc(i+7*r,n+6*s,l,Math.PI/4*5,4*Math.PI),e.arc(i+7*r,n+6*s,l/2,Math.PI/4*5,4*Math.PI),e.moveTo(i+7*r-l/2,n+6*s+l),e.lineTo(i+r+l,n+14*s-l),e.arc(i+r,n+14*s,l,-Math.PI/4,2*Math.PI),e.moveTo(i+7*r+l/2,n+6*s),e.lineTo(i+14*r-l,n+10*s-l/2),e.moveTo(i+16*r,n+10*s),e.arc(i+14*r,n+10*s,l,0,3*Math.PI),e.lineWidth=1.5}function m(e,t){var i=t.x,n=t.y,a=t.width,o=t.height,r=Math.min(a,o)/2;e.moveTo(i+a,n+o/2),e.arc(i+r,n+r,r,0,2*Math.PI),e.arc(i+r,n,r,Math.PI/4,Math.PI/5*4),e.arc(i,n+r,r,-Math.PI/3,Math.PI/3),e.arc(i+a,n+o,r,Math.PI,Math.PI/2*3),e.lineWidth=1.5}function p(e,t){for(var i=t.x,n=t.y,a=t.width,o=t.height,r=Math.round(o/3),s=Math.round((r-2)/2),l=3;l--;)e.rect(i,n+r*l+s,a,2)}function u(e,t){for(var i=t.x,n=t.y,a=t.width,o=t.height,r=Math.round(a/3),s=Math.round((r-2)/2),l=3;l--;)e.rect(i+r*l+s,n,2,o)}function V(e,t){var i=t.x,n=t.y,a=t.width/16;e.moveTo(i+a,n),e.lineTo(i+a,n+t.height),e.lineTo(i+15*a,n+t.height),e.lineTo(i+15*a,n),e.lineTo(i+a,n),e.moveTo(i+3*a,n+3*a),e.lineTo(i+13*a,n+3*a),e.moveTo(i+3*a,n+6*a),e.lineTo(i+13*a,n+6*a),e.moveTo(i+3*a,n+9*a),e.lineTo(i+13*a,n+9*a),e.moveTo(i+3*a,n+12*a),e.lineTo(i+9*a,n+12*a)}function U(e,t){var i=t.x,n=t.y,a=t.width/16,o=t.height/16;e.moveTo(i,n),e.lineTo(i,n+t.height),e.lineTo(i+t.width,n+t.height),e.lineTo(i+t.width,n),e.lineTo(i,n),e.moveTo(i+4*a,n),e.lineTo(i+4*a,n+8*o),e.lineTo(i+12*a,n+8*o),e.lineTo(i+12*a,n),e.moveTo(i+6*a,n+11*o),e.lineTo(i+6*a,n+13*o),e.lineTo(i+10*a,n+13*o),e.lineTo(i+10*a,n+11*o),e.lineTo(i+6*a,n+11*o)}function g(e,t){var i=t.x,n=t.y,a=t.width,o=t.height;e.moveTo(i,n+o/2),e.lineTo(i+a,n+o/2),e.moveTo(i+a/2,n),e.lineTo(i+a/2,n+o)}function f(e,t){var i=t.width/2,n=t.height/2,a=Math.min(i,n);e.moveTo(t.x+i+a,t.y+n),e.arc(t.x+i,t.y+n,a,0,2*Math.PI),e.closePath()}function y(e,t){e.rect(t.x,t.y,t.width,t.height),e.closePath()}function b(e,t){var i=t.width/2,n=t.height/2,a=t.x+i,o=t.y+n,r=Math.min(i,n);e.moveTo(a,o-r),e.lineTo(a+r,o+r),e.lineTo(a-r,o+r),e.lineTo(a,o-r),e.closePath()}function _(e,t){var i=t.width/2,n=t.height/2,a=t.x+i,o=t.y+n,r=Math.min(i,n);e.moveTo(a,o-r),e.lineTo(a+r,o),e.lineTo(a,o+r),e.lineTo(a-r,o),e.lineTo(a,o-r),e.closePath()}function x(e,t){var i=t.x,n=t.y,a=t.width/16;e.moveTo(i+8*a,n),e.lineTo(i+a,n+t.height),e.lineTo(i+8*a,n+t.height/4*3),e.lineTo(i+15*a,n+t.height),e.lineTo(i+8*a,n),e.closePath()}function k(t,i){var n=e("zrender/shape/Star"),a=i.width/2,o=i.height/2;n.prototype.buildPath(t,{x:i.x+a,y:i.y+o,r:Math.min(a,o),n:i.n||5})}function v(t,i){var n=e("zrender/shape/Heart");n.prototype.buildPath(t,{x:i.x+i.width/2,y:i.y+.2*i.height,a:i.width/2,b:.8*i.height})}function L(t,i){var n=e("zrender/shape/Droplet");n.prototype.buildPath(t,{x:i.x+.5*i.width,y:i.y+.5*i.height,a:.5*i.width,b:.8*i.height})}function w(e,t){var i=t.x,n=t.y-t.height/2*1.5,a=t.width/2,o=t.height/2,r=Math.min(a,o);e.arc(i+a,n+o,r,Math.PI/5*4,Math.PI/5),e.lineTo(i+a,n+o+1.5*r),e.closePath()}function W(t,i,n){var a=e("zrender/shape/Image");this._imageShape=this._imageShape||new a({style:{}});for(var o in i)this._imageShape.style[o]=i[o];this._imageShape.brush(t,!1,n)}function X(e){S.call(this,e)}var I=e("zrender/tool/util"),S=e("zrender/shape/Base");return X.prototype={type:"icon",iconLibrary:{mark:t,markUndo:i,markClear:n,dataZoom:a,dataZoomReset:o,restore:r,lineChart:s,barChart:l,pieChart:h,funnelChart:d,forceChart:c,chordChart:m,stackChart:p,tiledChart:u,dataView:V,saveAsImage:U,cross:g,circle:f,rectangle:y,triangle:b,diamond:_,arrow:x,star:k,heart:v,droplet:L,pin:w,image:W},brush:function(t,i,n){var a=i?this.highlightStyle:this.style;a=a||{};var o=a.iconType||this.style.iconType;if("image"===o){var r=e("zrender/shape/Image");r.prototype.brush.call(this,t,i,n)}else{var a=this.beforeBrush(t,i);switch(t.beginPath(),this.buildPath(t,a,n),a.brushType){case"both":t.fill();case"stroke":a.lineWidth>0&&t.stroke();break;default:t.fill()}this.drawText(t,a,this.style),this.afterBrush(t)}},buildPath:function(e,t,i){this.iconLibrary[t.iconType]?this.iconLibrary[t.iconType].call(this,e,t,i):(e.moveTo(t.x,t.y),e.lineTo(t.x+t.width,t.y),e.lineTo(t.x+t.width,t.y+t.height),e.lineTo(t.x,t.y+t.height),e.lineTo(t.x,t.y),e.closePath())},getRect:function(e){return e.__rect?e.__rect:(e.__rect={x:Math.round(e.x),y:Math.round(e.y-("pin"==e.iconType?e.height/2*1.5:0)),width:e.width,height:e.height*("pin"===e.iconType?1.25:1)},e.__rect)},isCover:function(e,t){var i=this.transformCoordToLocal(e,t);e=i[0],t=i[1];var n=this.style.__rect;n||(n=this.style.__rect=this.getRect(this.style));var a=n.height<8||n.width<8?4:0;return e>=n.x-a&&e<=n.x+n.width+a&&t>=n.y-a&&t<=n.y+n.height+a}},I.inherits(X,S),X}),define("echarts/util/shape/MarkLine",["require","zrender/shape/Base","./Icon","zrender/shape/Line","zrender/shape/BezierCurve","zrender/tool/area","zrender/shape/util/dashedLineTo","zrender/tool/util","zrender/tool/curve"],function(e){function t(e){i.call(this,e),this.style.curveness>0&&this.updatePoints(this.style),this.highlightStyle.curveness>0&&this.updatePoints(this.highlightStyle)}var i=e("zrender/shape/Base"),n=e("./Icon"),a=e("zrender/shape/Line"),o=new a({}),r=e("zrender/shape/BezierCurve"),s=new r({}),l=e("zrender/tool/area"),h=e("zrender/shape/util/dashedLineTo"),d=e("zrender/tool/util"),c=e("zrender/tool/curve");return t.prototype={type:"mark-line",brush:function(e,t){var i=this.style;t&&(i=this.getHighlightStyle(i,this.highlightStyle||{})),e.save(),this.setContext(e,i),this.setTransform(e),e.save(),e.beginPath(),this.buildPath(e,i),e.stroke(),e.restore(),this.brushSymbol(e,i,0),this.brushSymbol(e,i,1),this.drawText(e,i,this.style),e.restore()},buildPath:function(e,t){var i=t.lineType||"solid";

if(e.moveTo(t.xStart,t.yStart),t.curveness>0){var n=null;switch(i){case"dashed":n=[5,5];break;case"dotted":n=[1,1]}n&&e.setLineDash&&e.setLineDash(n),e.quadraticCurveTo(t.cpX1,t.cpY1,t.xEnd,t.yEnd)}else if("solid"==i)e.lineTo(t.xEnd,t.yEnd);else{var a=(t.lineWidth||1)*("dashed"==t.lineType?5:1);h(e,t.xStart,t.yStart,t.xEnd,t.yEnd,a)}},updatePoints:function(e){var t=e.curveness||0,i=1,n=e.xStart,a=e.yStart,o=e.xEnd,r=e.yEnd,s=(n+o)/2-i*(a-r)*t,l=(a+r)/2-i*(o-n)*t;e.cpX1=s,e.cpY1=l},brushSymbol:function(e,t,i){if("none"!=t.symbol[i]){e.save(),e.beginPath(),e.lineWidth=t.symbolBorder,e.strokeStyle=t.symbolBorderColor;var a=t.symbol[i].replace("empty","").toLowerCase();t.symbol[i].match("empty")&&(e.fillStyle="#fff");var o=t.xStart,r=t.yStart,s=t.xEnd,l=t.yEnd,h=0===i?o:s,d=0===i?r:l,m=t.curveness||0,p=null!=t.symbolRotate[i]?t.symbolRotate[i]-0:0;if(p=p/180*Math.PI,"arrow"==a&&0===p)if(0===m){var u=0===i?-1:1;p=Math.PI/2+Math.atan2(u*(l-r),u*(s-o))}else{var V=t.cpX1,U=t.cpY1,g=c.quadraticDerivativeAt,f=g(o,V,s,i),y=g(r,U,l,i);p=Math.PI/2+Math.atan2(y,f)}e.translate(h,d),0!==p&&e.rotate(p);var b=t.symbolSize[i];n.prototype.buildPath(e,{x:-b,y:-b,width:2*b,height:2*b,iconType:a}),e.closePath(),e.fill(),e.stroke(),e.restore()}},getRect:function(e){return e.curveness>0?s.getRect(e):o.getRect(e),e.__rect},isCover:function(e,t){var i=this.transformCoordToLocal(e,t);return e=i[0],t=i[1],this.isCoverRect(e,t)?this.style.curveness>0?l.isInside(s,this.style,e,t):l.isInside(o,this.style,e,t):!1}},d.inherits(t,i),t}),define("echarts/util/shape/Symbol",["require","zrender/shape/Base","zrender/shape/Polygon","zrender/tool/util","./normalIsCover"],function(e){function t(e){i.call(this,e)}var i=e("zrender/shape/Base"),n=e("zrender/shape/Polygon"),a=new n({}),o=e("zrender/tool/util");return t.prototype={type:"symbol",buildPath:function(e,t){var i=t.pointList,n=i.length;if(0!==n)for(var a,o,r,s,l,h=1e4,d=Math.ceil(n/h),c=i[0]instanceof Array,m=t.size?t.size:2,p=m,u=m/2,V=2*Math.PI,U=0;d>U;U++){e.beginPath(),a=U*h,o=a+h,o=o>n?n:o;for(var g=a;o>g;g++)if(t.random&&(r=t["randomMap"+g%20]/100,p=m*r*r,u=p/2),c?(s=i[g][0],l=i[g][1]):(s=i[g].x,l=i[g].y),3>p)e.rect(s-u,l-u,p,p);else switch(t.iconType){case"circle":e.moveTo(s,l),e.arc(s,l,u,0,V,!0);break;case"diamond":e.moveTo(s,l-u),e.lineTo(s+u/3,l-u/3),e.lineTo(s+u,l),e.lineTo(s+u/3,l+u/3),e.lineTo(s,l+u),e.lineTo(s-u/3,l+u/3),e.lineTo(s-u,l),e.lineTo(s-u/3,l-u/3),e.lineTo(s,l-u);break;default:e.rect(s-u,l-u,p,p)}if(e.closePath(),d-1>U)switch(t.brushType){case"both":e.fill(),t.lineWidth>0&&e.stroke();break;case"stroke":t.lineWidth>0&&e.stroke();break;default:e.fill()}}},getRect:function(e){return e.__rect||a.getRect(e)},isCover:e("./normalIsCover")},o.inherits(t,i),t}),define("zrender/shape/Polyline",["require","./Base","./util/smoothSpline","./util/smoothBezier","./util/dashedLineTo","./Polygon","../tool/util"],function(e){var t=e("./Base"),i=e("./util/smoothSpline"),n=e("./util/smoothBezier"),a=e("./util/dashedLineTo"),o=function(e){this.brushTypeOnly="stroke",this.textPosition="end",t.call(this,e)};return o.prototype={type:"polyline",buildPath:function(e,t){var n=t.pointList;if(!(n.length<2)){var o=Math.min(t.pointList.length,Math.round(t.pointListLength||t.pointList.length));if(t.smooth&&"spline"!==t.smooth){t.controlPointList||this.updateControlPoints(t);var r=t.controlPointList;e.moveTo(n[0][0],n[0][1]);for(var s,l,h,d=0;o-1>d;d++)s=r[2*d],l=r[2*d+1],h=n[d+1],e.bezierCurveTo(s[0],s[1],l[0],l[1],h[0],h[1])}else if("spline"===t.smooth&&(n=i(n),o=n.length),t.lineType&&"solid"!=t.lineType){if("dashed"==t.lineType||"dotted"==t.lineType){var c=(t.lineWidth||1)*("dashed"==t.lineType?5:1);e.moveTo(n[0][0],n[0][1]);for(var d=1;o>d;d++)a(e,n[d-1][0],n[d-1][1],n[d][0],n[d][1],c)}}else{e.moveTo(n[0][0],n[0][1]);for(var d=1;o>d;d++)e.lineTo(n[d][0],n[d][1])}}},updateControlPoints:function(e){e.controlPointList=n(e.pointList,e.smooth,!1,e.smoothConstraint)},getRect:function(t){return e("./Polygon").prototype.getRect(t)}},e("../tool/util").inherits(o,t),o}),define("zrender/shape/ShapeBundle",["require","./Base","../tool/util"],function(e){var t=e("./Base"),i=function(e){t.call(this,e)};return i.prototype={constructor:i,type:"shape-bundle",brush:function(e,t){var i=this.beforeBrush(e,t);e.beginPath();for(var n=0;n<i.shapeList.length;n++){var a=i.shapeList[n],o=a.style;t&&(o=a.getHighlightStyle(o,a.highlightStyle||{},a.brushTypeOnly)),a.buildPath(e,o)}switch(i.brushType){case"both":e.fill();case"stroke":i.lineWidth>0&&e.stroke();break;default:e.fill()}this.drawText(e,i,this.style),this.afterBrush(e)},getRect:function(e){if(e.__rect)return e.__rect;for(var t=1/0,i=-(1/0),n=1/0,a=-(1/0),o=0;o<e.shapeList.length;o++)var r=e.shapeList[o],s=r.getRect(r.style),t=Math.min(s.x,t),n=Math.min(s.y,n),i=Math.max(s.x+s.width,i),a=Math.max(s.y+s.height,a);return e.__rect={x:t,y:n,width:i-t,height:a-n},e.__rect},isCover:function(e,t){var i=this.transformCoordToLocal(e,t);if(e=i[0],t=i[1],this.isCoverRect(e,t))for(var n=0;n<this.style.shapeList.length;n++){var a=this.style.shapeList[n];if(a.isCover(e,t))return!0}return!1}},e("../tool/util").inherits(i,t),i}),define("echarts/util/ecAnimation",["require","zrender/tool/util","zrender/tool/curve","zrender/shape/Polygon"],function(e){function t(e,t,i,n,a){var o,r=i.style.pointList,s=r.length;if(!t){if(o=[],"vertical"!=i._orient)for(var l=r[0][1],h=0;s>h;h++)o[h]=[r[h][0],l];else for(var d=r[0][0],h=0;s>h;h++)o[h]=[d,r[h][1]];"half-smooth-polygon"==i.type&&(o[s-1]=u.clone(r[s-1]),o[s-2]=u.clone(r[s-2])),t={style:{pointList:o}}}o=t.style.pointList;var c=o.length;i.style.pointList=c==s?o:s>c?o.concat(r.slice(c)):o.slice(0,s),e.addShape(i),i.__animating=!0,e.animate(i.id,"style").when(n,{pointList:r}).during(function(){i.updateControlPoints&&i.updateControlPoints(i.style)}).done(function(){i.__animating=!1}).start(a)}function i(e,t){for(var i=arguments.length,n=2;i>n;n++){var a=arguments[n];e.style[a]=t.style[a]}}function n(e,t,n,a,o){var r=n.style;t||(t={position:n.position,style:{x:r.x,y:"vertical"==n._orient?r.y+r.height:r.y,width:"vertical"==n._orient?r.width:0,height:"vertical"!=n._orient?r.height:0}});var s=r.x,l=r.y,h=r.width,d=r.height,c=[n.position[0],n.position[1]];i(n,t,"x","y","width","height"),n.position=t.position,e.addShape(n),(c[0]!=t.position[0]||c[1]!=t.position[1])&&e.animate(n.id,"").when(a,{position:c}).start(o),n.__animating=!0,e.animate(n.id,"style").when(a,{x:s,y:l,width:h,height:d}).done(function(){n.__animating=!1}).start(o)}function a(e,t,i,n,a){if(!t){var o=i.style.y;t={style:{y:[o[0],o[0],o[0],o[0]]}}}var r=i.style.y;i.style.y=t.style.y,e.addShape(i),i.__animating=!0,e.animate(i.id,"style").when(n,{y:r}).done(function(){i.__animating=!1}).start(a)}function o(e,t,i,n,a){var o=i.style.x,r=i.style.y,s=i.style.r0,l=i.style.r;i.__animating=!0,"r"!=i._animationAdd?(i.style.r0=0,i.style.r=0,i.rotation=[2*Math.PI,o,r],e.addShape(i),e.animate(i.id,"style").when(n,{r0:s,r:l}).done(function(){i.__animating=!1}).start(a),e.animate(i.id,"").when(n,{rotation:[0,o,r]}).start(a)):(i.style.r0=i.style.r,e.addShape(i),e.animate(i.id,"style").when(n,{r0:s}).done(function(){i.__animating=!1}).start(a))}function r(e,t,n,a,o){t||(t="r"!=n._animationAdd?{style:{startAngle:n.style.startAngle,endAngle:n.style.startAngle}}:{style:{r0:n.style.r}});var r=n.style.startAngle,s=n.style.endAngle;i(n,t,"startAngle","endAngle"),e.addShape(n),n.__animating=!0,e.animate(n.id,"style").when(a,{startAngle:r,endAngle:s}).done(function(){n.__animating=!1}).start(o)}function s(e,t,n,a,o){t||(t={style:{x:"left"==n.style.textAlign?n.style.x+100:n.style.x-100,y:n.style.y}});var r=n.style.x,s=n.style.y;i(n,t,"x","y"),e.addShape(n),n.__animating=!0,e.animate(n.id,"style").when(a,{x:r,y:s}).done(function(){n.__animating=!1}).start(o)}function l(t,i,n,a,o){var r=e("zrender/shape/Polygon").prototype.getRect(n.style),s=r.x+r.width/2,l=r.y+r.height/2;n.scale=[.1,.1,s,l],t.addShape(n),n.__animating=!0,t.animate(n.id,"").when(a,{scale:[1,1,s,l]}).done(function(){n.__animating=!1}).start(o)}function h(e,t,n,a,o){t||(t={style:{source0:0,source1:n.style.source1>0?360:-360,target0:0,target1:n.style.target1>0?360:-360}});var r=n.style.source0,s=n.style.source1,l=n.style.target0,h=n.style.target1;t.style&&i(n,t,"source0","source1","target0","target1"),e.addShape(n),n.__animating=!0,e.animate(n.id,"style").when(a,{source0:r,source1:s,target0:l,target1:h}).done(function(){n.__animating=!1}).start(o)}function d(e,t,i,n,a){t||(t={style:{angle:i.style.startAngle}});var o=i.style.angle;i.style.angle=t.style.angle,e.addShape(i),i.__animating=!0,e.animate(i.id,"style").when(n,{angle:o}).done(function(){i.__animating=!1}).start(a)}function c(e,t,i,a,o,r){if(i.style._x=i.style.x,i.style._y=i.style.y,i.style._width=i.style.width,i.style._height=i.style.height,t)n(e,t,i,a,o);else{var s=i._x||0,l=i._y||0;i.scale=[.01,.01,s,l],e.addShape(i),i.__animating=!0,e.animate(i.id,"").delay(r).when(a,{scale:[1,1,s,l]}).done(function(){i.__animating=!1}).start(o||"QuinticOut")}}function m(e,t,n,a,o){t||(t={style:{xStart:n.style.xStart,yStart:n.style.yStart,xEnd:n.style.xStart,yEnd:n.style.yStart}});var r=n.style.xStart,s=n.style.xEnd,l=n.style.yStart,h=n.style.yEnd;i(n,t,"xStart","xEnd","yStart","yEnd"),e.addShape(n),n.__animating=!0,e.animate(n.id,"style").when(a,{xStart:r,xEnd:s,yStart:l,yEnd:h}).done(function(){n.__animating=!1}).start(o)}function p(e,t,i,n,a){a=a||"QuinticOut",i.__animating=!0,e.addShape(i);var o=i.style,r=function(){i.__animating=!1},s=o.xStart,l=o.yStart,h=o.xEnd,d=o.yEnd;if(o.curveness>0){i.updatePoints(o);var c={p:0},m=o.cpX1,p=o.cpY1,u=[],U=[],g=V.quadraticSubdivide;e.animation.animate(c).when(n,{p:1}).during(function(){g(s,m,h,c.p,u),g(l,p,d,c.p,U),o.cpX1=u[1],o.cpY1=U[1],o.xEnd=u[2],o.yEnd=U[2],e.modShape(i)}).done(r).start(a)}else e.animate(i.id,"style").when(0,{xEnd:s,yEnd:l}).when(n,{xEnd:h,yEnd:d}).done(r).start(a)}var u=e("zrender/tool/util"),V=e("zrender/tool/curve");return{pointList:t,rectangle:n,candle:a,ring:o,sector:r,text:s,polygon:l,ribbon:h,gaugePointer:d,icon:c,line:m,markline:p}}),define("echarts/util/ecEffect",["require","../util/ecData","zrender/shape/Circle","zrender/shape/Image","zrender/tool/curve","../util/shape/Icon","../util/shape/Symbol","zrender/shape/ShapeBundle","zrender/shape/Polyline","zrender/tool/vector","zrender/tool/env"],function(e){function t(e,t,i,n){var a,r=i.effect,l=r.color||i.style.strokeColor||i.style.color,d=r.shadowColor||l,c=r.scaleSize,m=r.bounceDistance,p="undefined"!=typeof r.shadowBlur?r.shadowBlur:c;"image"!==i.type?(a=new h({zlevel:n,style:{brushType:"stroke",iconType:"droplet"!=i.style.iconType?i.style.iconType:"circle",x:p+1,y:p+1,n:i.style.n,width:i.style._width*c,height:i.style._height*c,lineWidth:1,strokeColor:l,shadowColor:d,shadowBlur:p},draggable:!1,hoverable:!1}),"pin"==i.style.iconType&&(a.style.y+=a.style.height/2*1.5),u&&(a.style.image=e.shapeToImage(a,a.style.width+2*p+2,a.style.height+2*p+2).style.image,a=new s({zlevel:a.zlevel,style:a.style,draggable:!1,hoverable:!1}))):a=new s({zlevel:n,style:i.style,draggable:!1,hoverable:!1}),o.clone(i,a),a.position=i.position,t.push(a),e.addShape(a);var V="image"!==i.type?window.devicePixelRatio||1:1,U=(a.style.width/V-i.style._width)/2;a.style.x=i.style._x-U,a.style.y=i.style._y-U,"pin"==i.style.iconType&&(a.style.y-=i.style.height/2*1.5);var g=100*(r.period+10*Math.random());e.modShape(i.id,{invisible:!0});var f=a.style.x+a.style.width/2/V,y=a.style.y+a.style.height/2/V;"scale"===r.type?(e.modShape(a.id,{scale:[.1,.1,f,y]}),e.animate(a.id,"",r.loop).when(g,{scale:[1,1,f,y]}).done(function(){i.effect.show=!1,e.delShape(a.id)}).start()):e.animate(a.id,"style",r.loop).when(g,{y:a.style.y-m}).when(2*g,{y:a.style.y}).done(function(){i.effect.show=!1,e.delShape(a.id)}).start()}function i(e,t,i,n){var a=i.effect,o=a.color||i.style.strokeColor||i.style.color,r=a.scaleSize,s=a.shadowColor||o,l="undefined"!=typeof a.shadowBlur?a.shadowBlur:2*r,h=window.devicePixelRatio||1,c=new d({zlevel:n,position:i.position,scale:i.scale,style:{pointList:i.style.pointList,iconType:i.style.iconType,color:o,strokeColor:o,shadowColor:s,shadowBlur:l*h,random:!0,brushType:"fill",lineWidth:1,size:i.style.size},draggable:!1,hoverable:!1});t.push(c),e.addShape(c),e.modShape(i.id,{invisible:!0});for(var m=Math.round(100*a.period),p={},u={},V=0;20>V;V++)c.style["randomMap"+V]=0,p={},p["randomMap"+V]=100,u={},u["randomMap"+V]=0,c.style["randomMap"+V]=100*Math.random(),e.animate(c.id,"style",!0).when(m,p).when(2*m,u).when(3*m,p).when(4*m,p).delay(Math.random()*m*V).start()}function n(e,t,i,n,a){var s=i.effect,h=i.style,d=s.color||h.strokeColor||h.color,c=s.shadowColor||h.strokeColor||d,V=h.lineWidth*s.scaleSize,U="undefined"!=typeof s.shadowBlur?s.shadowBlur:V,g=new r({zlevel:n,style:{x:U,y:U,r:V,color:d,shadowColor:c,shadowBlur:U},hoverable:!1}),f=0;if(u&&!a){var n=g.zlevel;g=e.shapeToImage(g,2*(V+U),2*(V+U)),g.zlevel=n,g.hoverable=!1,f=U}a||(o.clone(i,g),g.position=i.position,t.push(g),e.addShape(g));var y=function(){a||(i.effect.show=!1,e.delShape(g.id)),g.effectAnimator=null};if(i instanceof m){for(var b=[0],_=0,x=h.pointList,k=h.controlPointList,v=1;v<x.length;v++){if(k){var L=k[2*(v-1)],w=k[2*(v-1)+1];_+=p.dist(x[v-1],L)+p.dist(L,w)+p.dist(w,x[v])}else _+=p.dist(x[v-1],x[v]);b.push(_)}for(var W={p:0},X=e.animation.animate(W,{loop:s.loop}),v=0;v<b.length;v++)X.when(b[v]*s.period,{p:v});X.during(function(){var t,i,n=Math.floor(W.p);if(n==x.length-1)t=x[n][0],i=x[n][1];else{var o=W.p-n,r=x[n],s=x[n+1];if(k){var h=k[2*n],d=k[2*n+1];t=l.cubicAt(r[0],h[0],d[0],s[0],o),i=l.cubicAt(r[1],h[1],d[1],s[1],o)}else t=(s[0]-r[0])*o+r[0],i=(s[1]-r[1])*o+r[1]}g.style.x=t,g.style.y=i,a||e.modShape(g)}).done(y).start(),X.duration=_*s.period,g.effectAnimator=X}else{var I=h.xStart-f,S=h.yStart-f,K=h.xEnd-f,C=h.yEnd-f;g.style.x=I,g.style.y=S;var T=(K-I)*(K-I)+(C-S)*(C-S),E=Math.round(Math.sqrt(Math.round(T*s.period*s.period)));if(i.style.curveness>0){var z=h.cpX1-f,A=h.cpY1-f;g.effectAnimator=e.animation.animate(g,{loop:s.loop}).when(E,{p:1}).during(function(t,i){g.style.x=l.quadraticAt(I,z,K,i),g.style.y=l.quadraticAt(S,A,C,i),a||e.modShape(g)}).done(y).start()}else g.effectAnimator=e.animation.animate(g.style,{loop:s.loop}).when(E,{x:K,y:C}).during(function(){a||e.modShape(g)}).done(y).start();g.effectAnimator.duration=E}return g}function a(e,t,i,a){var o=new c({style:{shapeList:[]},zlevel:a,hoverable:!1}),r=i.style.shapeList,s=i.effect;o.position=i.position;for(var l=0,h=[],d=0;d<r.length;d++){r[d].effect=s;var m=n(e,null,r[d],a,!0),p=m.effectAnimator;o.style.shapeList.push(m),p.duration>l&&(l=p.duration),0===d&&(o.style.color=m.style.color,o.style.shadowBlur=m.style.shadowBlur,o.style.shadowColor=m.style.shadowColor),h.push(p)}t.push(o),e.addShape(o);var u=function(){for(var e=0;e<h.length;e++)h[e].stop()};if(l){o.__dummy=0;var V=e.animate(o.id,"",s.loop).when(l,{__dummy:1}).during(function(){e.modShape(o)}).done(function(){i.effect.show=!1,e.delShape(o.id)}).start(),U=V.stop;V.stop=function(){u(),U.call(this)}}}var o=e("../util/ecData"),r=e("zrender/shape/Circle"),s=e("zrender/shape/Image"),l=e("zrender/tool/curve"),h=e("../util/shape/Icon"),d=e("../util/shape/Symbol"),c=e("zrender/shape/ShapeBundle"),m=e("zrender/shape/Polyline"),p=e("zrender/tool/vector"),u=e("zrender/tool/env").canvasSupported;return{point:t,largePoint:i,line:n,largeLine:a}}),define("echarts/component/base",["require","../config","../util/ecData","../util/ecQuery","../util/number","zrender/tool/util","zrender/tool/env"],function(e){function t(e,t,a,o,r){this.ecTheme=e,this.messageCenter=t,this.zr=a,this.option=o,this.series=o.series,this.myChart=r,this.component=r.component,this.shapeList=[],this.effectList=[];var s=this;s._onlegendhoverlink=function(e){if(s.legendHoverLink)for(var t,a=e.target,o=s.shapeList.length-1;o>=0;o--)t=s.type==i.CHART_TYPE_PIE||s.type==i.CHART_TYPE_FUNNEL?n.get(s.shapeList[o],"name"):(n.get(s.shapeList[o],"series")||{}).name,t!=a||s.shapeList[o].invisible||s.shapeList[o].__animating||s.zr.addHoverShape(s.shapeList[o])},t&&t.bind(i.EVENT.LEGEND_HOVERLINK,this._onlegendhoverlink)}var i=e("../config"),n=e("../util/ecData"),a=e("../util/ecQuery"),o=e("../util/number"),r=e("zrender/tool/util");return t.prototype={canvasSupported:e("zrender/tool/env").canvasSupported,_getZ:function(e){if(null!=this[e])return this[e];var t=this.ecTheme[this.type];return t&&null!=t[e]?t[e]:(t=i[this.type],t&&null!=t[e]?t[e]:0)},getZlevelBase:function(){return this._getZ("zlevel")},getZBase:function(){return this._getZ("z")},reformOption:function(e){return e=r.merge(r.merge(e||{},r.clone(this.ecTheme[this.type]||{})),r.clone(i[this.type]||{})),this.z=e.z,this.zlevel=e.zlevel,e},reformCssArray:function(e){if(!(e instanceof Array))return[e,e,e,e];switch(e.length+""){case"4":return e;case"3":return[e[0],e[1],e[2],e[1]];case"2":return[e[0],e[1],e[0],e[1]];case"1":return[e[0],e[0],e[0],e[0]];case"0":return[0,0,0,0]}},getShapeById:function(e){for(var t=0,i=this.shapeList.length;i>t;t++)if(this.shapeList[t].id===e)return this.shapeList[t];return null},getFont:function(e){var t=this.getTextStyle(r.clone(e));return t.fontStyle+" "+t.fontWeight+" "+t.fontSize+"px "+t.fontFamily},getTextStyle:function(e){return r.merge(r.merge(e||{},this.ecTheme.textStyle),i.textStyle)},getItemStyleColor:function(e,t,i,n){return"function"==typeof e?e.call(this.myChart,{seriesIndex:t,series:this.series[t],dataIndex:i,data:n}):e},getDataFromOption:function(e,t){return null!=e?null!=e.value?e.value:e:t},subPixelOptimize:function(e,t){return e=t%2===1?Math.floor(e)+.5:Math.round(e)},resize:function(){this.refresh&&this.refresh(),this.clearEffectShape&&this.clearEffectShape(!0);var e=this;setTimeout(function(){e.animationEffect&&e.animationEffect()},200)},clear:function(){this.clearEffectShape&&this.clearEffectShape(),this.zr&&this.zr.delShape(this.shapeList),this.shapeList=[]},dispose:function(){this.onbeforDispose&&this.onbeforDispose(),this.clear(),this.shapeList=null,this.effectList=null,this.messageCenter&&this.messageCenter.unbind(i.EVENT.LEGEND_HOVERLINK,this._onlegendhoverlink),this.onafterDispose&&this.onafterDispose()},query:a.query,deepQuery:a.deepQuery,deepMerge:a.deepMerge,parsePercent:o.parsePercent,parseCenter:o.parseCenter,parseRadius:o.parseRadius,numAddCommas:o.addCommas,getPrecision:o.getPrecision},t}),define("echarts/layout/EdgeBundling",["require","../data/KDTree","zrender/tool/vector"],function(e){function t(e,t){e=e.array,t=t.array;var i=t[0]-e[0],n=t[1]-e[1],a=t[2]-e[2],o=t[3]-e[3];return i*i+n*n+a*a+o*o}function i(e){this.points=[e.mp0,e.mp1],this.group=e}function n(e){var t=e.points;t[0][1]<t[1][1]||e instanceof i?(this.array=[t[0][0],t[0][1],t[1][0],t[1][1]],this._startPoint=t[0],this._endPoint=t[1]):(this.array=[t[1][0],t[1][1],t[0][0],t[0][1]],this._startPoint=t[1],this._endPoint=t[0]),this.ink=d(t[0],t[1]),this.edge=e,this.group=null}function a(){this.edgeList=[],this.mp0=l(),this.mp1=l(),this.ink=0}function o(){this.maxNearestEdge=6,this.maxTurningAngle=Math.PI/4,this.maxIteration=20}var r=e("../data/KDTree"),s=e("zrender/tool/vector"),l=s.create,h=s.distSquare,d=s.dist,c=s.copy,m=s.clone;return n.prototype.getStartPoint=function(){return this._startPoint},n.prototype.getEndPoint=function(){return this._endPoint},a.prototype.addEdge=function(e){e.group=this,this.edgeList.push(e)},a.prototype.removeEdge=function(e){e.group=null,this.edgeList.splice(this.edgeList.indexOf(e),1)},o.prototype={constructor:o,run:function(e){function t(e,t){return h(e,t)<1e-10}function n(e,i){for(var n=[],a=0,o=0;o<e.length;o++)a>0&&t(e[o],n[a-1])||(n[a++]=m(e[o]));return i[0]&&!t(n[0],i[0])&&(n=n.reverse()),n}for(var a=this._iterate(e),o=0;o++<this.maxIteration;){for(var r=[],s=0;s<a.groups.length;s++)r.push(new i(a.groups[s]));var l=this._iterate(r);if(l.savedInk<=0)break;a=l}var d=[],c=function(e,t){for(var a,o=0;o<e.length;o++){var r=e[o];if(r.edgeList[0]&&r.edgeList[0].edge instanceof i){for(var s=[],l=0;l<r.edgeList.length;l++)s.push(r.edgeList[l].edge.group);a=t?t.slice():[],a.unshift(r.mp0),a.push(r.mp1),c(s,a)}else for(var l=0;l<r.edgeList.length;l++){var h=r.edgeList[l];a=t?t.slice():[],a.unshift(r.mp0),a.push(r.mp1),a.unshift(h.getStartPoint()),a.push(h.getEndPoint()),d.push({points:n(a,h.edge.points),rawEdge:h.edge})}}};return c(a.groups),d},_iterate:function(e){for(var i=[],o=[],s=0,h=0;h<e.length;h++){var d=new n(e[h]);i.push(d)}for(var m=new r(i,4),p=[],u=l(),V=l(),U=0,g=l(),f=l(),y=0,h=0;h<i.length;h++){var d=i[h];if(!d.group){m.nearestN(d,this.maxNearestEdge,t,p);for(var b=0,_=null,x=null,k=0;k<p.length;k++){var v=p[k],L=0;v.group?v.group!==x&&(x=v.group,U=this._calculateGroupEdgeInk(v.group,d,u,V),L=v.group.ink+d.ink-U):(U=this._calculateEdgeEdgeInk(d,v,u,V),L=v.ink+d.ink-U),L>b&&(b=L,_=v,c(f,V),c(g,u),y=U)}if(_){s+=b;var w;_.group||(w=new a,o.push(w),w.addEdge(_)),w=_.group,c(w.mp0,g),c(w.mp1,f),w.ink=y,_.group.addEdge(d)}else{var w=new a;o.push(w),c(w.mp0,d.getStartPoint()),c(w.mp1,d.getEndPoint()),w.ink=d.ink,w.addEdge(d)}}}return{groups:o,edges:i,savedInk:s}},_calculateEdgeEdgeInk:function(){var e=[],t=[];return function(i,n,a,o){e[0]=i.getStartPoint(),e[1]=n.getStartPoint(),t[0]=i.getEndPoint(),t[1]=n.getEndPoint(),this._calculateMeetPoints(e,t,a,o);var r=d(e[0],a)+d(a,o)+d(o,t[0])+d(e[1],a)+d(o,t[1]);return r}}(),_calculateGroupEdgeInk:function(e,t,i,n){for(var a=[],o=[],r=0;r<e.edgeList.length;r++){var s=e.edgeList[r];a.push(s.getStartPoint()),o.push(s.getEndPoint())}a.push(t.getStartPoint()),o.push(t.getEndPoint()),this._calculateMeetPoints(a,o,i,n);for(var l=d(i,n),r=0;r<a.length;r++)l+=d(a[r],i)+d(o[r],n);return l},_calculateMeetPoints:function(){var e=l(),t=l();return function(i,n,a,o){s.set(e,0,0),s.set(t,0,0);for(var r=i.length,l=0;r>l;l++)s.add(e,e,i[l]);s.scale(e,e,1/r),r=n.length;for(var l=0;r>l;l++)s.add(t,t,n[l]);s.scale(t,t,1/r),this._limitTurningAngle(i,e,t,a),this._limitTurningAngle(n,t,e,o)}}(),_limitTurningAngle:function(){var e=l(),t=l(),i=l(),n=l();return function(a,o,r,l){var c=Math.cos(this.maxTurningAngle),m=Math.tan(this.maxTurningAngle);s.sub(e,o,r),s.normalize(e,e),s.copy(l,o);for(var p=0,u=0;u<a.length;u++){var V=a[u];s.sub(t,V,o);var U=s.len(t);s.scale(t,t,1/U);var g=s.dot(t,e);if(c>g){s.scaleAndAdd(i,o,e,U*g);var f=d(i,V),y=f/m;s.scaleAndAdd(n,i,e,-y);var b=h(n,o);b>p&&(p=b,s.copy(l,n))}}}}()},o}),define("zrender/shape/Star",["require","../tool/math","./Base","../tool/util"],function(e){var t=e("../tool/math"),i=t.sin,n=t.cos,a=Math.PI,o=e("./Base"),r=function(e){o.call(this,e)};return r.prototype={type:"star",buildPath:function(e,t){var o=t.n;if(o&&!(2>o)){var r=t.x,s=t.y,l=t.r,h=t.r0;null==h&&(h=o>4?l*n(2*a/o)/n(a/o):l/3);var d=a/o,c=-a/2,m=r+l*n(c),p=s+l*i(c);c+=d;var u=t.pointList=[];u.push([m,p]);for(var V,U=0,g=2*o-1;g>U;U++)V=U%2===0?h:l,u.push([r+V*n(c),s+V*i(c)]),c+=d;u.push([m,p]),e.moveTo(u[0][0],u[0][1]);for(var U=0;U<u.length;U++)e.lineTo(u[U][0],u[U][1]);e.closePath()}},getRect:function(e){if(e.__rect)return e.__rect;var t;return t="stroke"==e.brushType||"fill"==e.brushType?e.lineWidth||1:0,e.__rect={x:Math.round(e.x-e.r-t/2),y:Math.round(e.y-e.r-t/2),width:2*e.r+t,height:2*e.r+t},e.__rect}},e("../tool/util").inherits(r,o),r}),define("zrender/shape/Heart",["require","./Base","./util/PathProxy","../tool/area","../tool/util"],function(e){"use strict";var t=e("./Base"),i=e("./util/PathProxy"),n=e("../tool/area"),a=function(e){t.call(this,e),this._pathProxy=new i};return a.prototype={type:"heart",buildPath:function(e,t){var n=this._pathProxy||new i;n.begin(e),n.moveTo(t.x,t.y),n.bezierCurveTo(t.x+t.a/2,t.y-2*t.b/3,t.x+2*t.a,t.y+t.b/3,t.x,t.y+t.b),n.bezierCurveTo(t.x-2*t.a,t.y+t.b/3,t.x-t.a/2,t.y-2*t.b/3,t.x,t.y),n.closePath()},getRect:function(e){return e.__rect?e.__rect:(this._pathProxy.isEmpty()||this.buildPath(null,e),this._pathProxy.fastBoundingRect())},isCover:function(e,t){var i=this.transformCoordToLocal(e,t);return e=i[0],t=i[1],this.isCoverRect(e,t)?n.isInsidePath(this._pathProxy.pathCommands,this.style.lineWidth,this.style.brushType,e,t):void 0}},e("../tool/util").inherits(a,t),a}),define("zrender/shape/Droplet",["require","./Base","./util/PathProxy","../tool/area","../tool/util"],function(e){"use strict";var t=e("./Base"),i=e("./util/PathProxy"),n=e("../tool/area"),a=function(e){t.call(this,e),this._pathProxy=new i};return a.prototype={type:"droplet",buildPath:function(e,t){var n=this._pathProxy||new i;n.begin(e),n.moveTo(t.x,t.y+t.a),n.bezierCurveTo(t.x+t.a,t.y+t.a,t.x+3*t.a/2,t.y-t.a/3,t.x,t.y-t.b),n.bezierCurveTo(t.x-3*t.a/2,t.y-t.a/3,t.x-t.a,t.y+t.a,t.x,t.y+t.a),n.closePath()},getRect:function(e){return e.__rect?e.__rect:(this._pathProxy.isEmpty()||this.buildPath(null,e),this._pathProxy.fastBoundingRect())},isCover:function(e,t){var i=this.transformCoordToLocal(e,t);return e=i[0],t=i[1],this.isCoverRect(e,t)?n.isInsidePath(this._pathProxy.pathCommands,this.style.lineWidth,this.style.brushType,e,t):void 0}},e("../tool/util").inherits(a,t),a}),define("zrender/tool/math",[],function(){function e(e,t){return Math.sin(t?e*a:e)}function t(e,t){return Math.cos(t?e*a:e)}function i(e){return e*a}function n(e){return e/a}var a=Math.PI/180;return{sin:e,cos:t,degreeToRadian:i,radianToDegree:n}}),define("zrender/shape/util/PathProxy",["require","../../tool/vector"],function(e){var t=e("../../tool/vector"),i=function(e,t){this.command=e,this.points=t||null},n=function(){this.pathCommands=[],this._ctx=null,this._min=[],this._max=[]};return n.prototype.fastBoundingRect=function(){var e=this._min,i=this._max;e[0]=e[1]=1/0,i[0]=i[1]=-(1/0);for(var n=0;n<this.pathCommands.length;n++){var a=this.pathCommands[n],o=a.points;switch(a.command){case"M":t.min(e,e,o),t.max(i,i,o);break;case"L":t.min(e,e,o),t.max(i,i,o);break;case"C":for(var r=0;6>r;r+=2)e[0]=Math.min(e[0],e[0],o[r]),e[1]=Math.min(e[1],e[1],o[r+1]),i[0]=Math.max(i[0],i[0],o[r]),i[1]=Math.max(i[1],i[1],o[r+1]);break;case"Q":for(var r=0;4>r;r+=2)e[0]=Math.min(e[0],e[0],o[r]),e[1]=Math.min(e[1],e[1],o[r+1]),i[0]=Math.max(i[0],i[0],o[r]),i[1]=Math.max(i[1],i[1],o[r+1]);break;case"A":var s=o[0],l=o[1],h=o[2],d=o[3];e[0]=Math.min(e[0],e[0],s-h),e[1]=Math.min(e[1],e[1],l-d),i[0]=Math.max(i[0],i[0],s+h),i[1]=Math.max(i[1],i[1],l+d)}}return{x:e[0],y:e[1],width:i[0]-e[0],height:i[1]-e[1]}},n.prototype.begin=function(e){return this._ctx=e||null,this.pathCommands.length=0,this},n.prototype.moveTo=function(e,t){return this.pathCommands.push(new i("M",[e,t])),this._ctx&&this._ctx.moveTo(e,t),this},n.prototype.lineTo=function(e,t){return this.pathCommands.push(new i("L",[e,t])),this._ctx&&this._ctx.lineTo(e,t),this},n.prototype.bezierCurveTo=function(e,t,n,a,o,r){return this.pathCommands.push(new i("C",[e,t,n,a,o,r])),this._ctx&&this._ctx.bezierCurveTo(e,t,n,a,o,r),this},n.prototype.quadraticCurveTo=function(e,t,n,a){return this.pathCommands.push(new i("Q",[e,t,n,a])),this._ctx&&this._ctx.quadraticCurveTo(e,t,n,a),this},n.prototype.arc=function(e,t,n,a,o,r){return this.pathCommands.push(new i("A",[e,t,n,n,a,o-a,0,r?0:1])),this._ctx&&this._ctx.arc(e,t,n,a,o,r),this},n.prototype.arcTo=function(e,t,i,n,a){return this._ctx&&this._ctx.arcTo(e,t,i,n,a),this},n.prototype.rect=function(e,t,i,n){return this._ctx&&this._ctx.rect(e,t,i,n),this},n.prototype.closePath=function(){return this.pathCommands.push(new i("z")),this._ctx&&this._ctx.closePath(),this},n.prototype.isEmpty=function(){return 0===this.pathCommands.length},n.PathSegment=i,n}),define("zrender/shape/Line",["require","./Base","./util/dashedLineTo","../tool/util"],function(e){var t=e("./Base"),i=e("./util/dashedLineTo"),n=function(e){this.brushTypeOnly="stroke",this.textPosition="end",t.call(this,e)};return n.prototype={type:"line",buildPath:function(e,t){if(t.lineType&&"solid"!=t.lineType){if("dashed"==t.lineType||"dotted"==t.lineType){var n=(t.lineWidth||1)*("dashed"==t.lineType?5:1);i(e,t.xStart,t.yStart,t.xEnd,t.yEnd,n)}}else e.moveTo(t.xStart,t.yStart),e.lineTo(t.xEnd,t.yEnd)},getRect:function(e){if(e.__rect)return e.__rect;var t=e.lineWidth||1;return e.__rect={x:Math.min(e.xStart,e.xEnd)-t,y:Math.min(e.yStart,e.yEnd)-t,width:Math.abs(e.xStart-e.xEnd)+t,height:Math.abs(e.yStart-e.yEnd)+t},e.__rect}},e("../tool/util").inherits(n,t),n}),define("zrender/shape/BezierCurve",["require","./Base","../tool/util"],function(e){"use strict";var t=e("./Base"),i=function(e){this.brushTypeOnly="stroke",this.textPosition="end",t.call(this,e)};return i.prototype={type:"bezier-curve",buildPath:function(e,t){e.moveTo(t.xStart,t.yStart),"undefined"!=typeof t.cpX2&&"undefined"!=typeof t.cpY2?e.bezierCurveTo(t.cpX1,t.cpY1,t.cpX2,t.cpY2,t.xEnd,t.yEnd):e.quadraticCurveTo(t.cpX1,t.cpY1,t.xEnd,t.yEnd)},getRect:function(e){if(e.__rect)return e.__rect;var t=Math.min(e.xStart,e.xEnd,e.cpX1),i=Math.min(e.yStart,e.yEnd,e.cpY1),n=Math.max(e.xStart,e.xEnd,e.cpX1),a=Math.max(e.yStart,e.yEnd,e.cpY1),o=e.cpX2,r=e.cpY2;"undefined"!=typeof o&&"undefined"!=typeof r&&(t=Math.min(t,o),i=Math.min(i,r),n=Math.max(n,o),a=Math.max(a,r));var s=e.lineWidth||1;return e.__rect={x:t-s,y:i-s,width:n-t+s,height:a-i+s},e.__rect}},e("../tool/util").inherits(i,t),i}),define("zrender/shape/util/dashedLineTo",[],function(){var e=[5,5];return function(t,i,n,a,o,r){if(t.setLineDash)return e[0]=e[1]=r,t.setLineDash(e),t.moveTo(i,n),void t.lineTo(a,o);r="number"!=typeof r?5:r;var s=a-i,l=o-n,h=Math.floor(Math.sqrt(s*s+l*l)/r);s/=h,l/=h;for(var d=!0,c=0;h>c;++c)d?t.moveTo(i,n):t.lineTo(i,n),d=!d,i+=s,n+=l;t.lineTo(a,o)}}),define("zrender/shape/Polygon",["require","./Base","./util/smoothSpline","./util/smoothBezier","./util/dashedLineTo","../tool/util"],function(e){var t=e("./Base"),i=e("./util/smoothSpline"),n=e("./util/smoothBezier"),a=e("./util/dashedLineTo"),o=function(e){t.call(this,e)};return o.prototype={type:"polygon",buildPath:function(e,t){var o=t.pointList;if(!(o.length<2)){if(t.smooth&&"spline"!==t.smooth){var r=n(o,t.smooth,!0,t.smoothConstraint);e.moveTo(o[0][0],o[0][1]);for(var s,l,h,d=o.length,c=0;d>c;c++)s=r[2*c],l=r[2*c+1],h=o[(c+1)%d],e.bezierCurveTo(s[0],s[1],l[0],l[1],h[0],h[1])}else if("spline"===t.smooth&&(o=i(o,!0)),t.lineType&&"solid"!=t.lineType){if("dashed"==t.lineType||"dotted"==t.lineType){var m=t._dashLength||(t.lineWidth||1)*("dashed"==t.lineType?5:1);t._dashLength=m,e.moveTo(o[0][0],o[0][1]);for(var c=1,p=o.length;p>c;c++)a(e,o[c-1][0],o[c-1][1],o[c][0],o[c][1],m);a(e,o[o.length-1][0],o[o.length-1][1],o[0][0],o[0][1],m)}}else{e.moveTo(o[0][0],o[0][1]);for(var c=1,p=o.length;p>c;c++)e.lineTo(o[c][0],o[c][1]);e.lineTo(o[0][0],o[0][1])}e.closePath()}},getRect:function(e){if(e.__rect)return e.__rect;for(var t=Number.MAX_VALUE,i=Number.MIN_VALUE,n=Number.MAX_VALUE,a=Number.MIN_VALUE,o=e.pointList,r=0,s=o.length;s>r;r++)o[r][0]<t&&(t=o[r][0]),o[r][0]>i&&(i=o[r][0]),o[r][1]<n&&(n=o[r][1]),o[r][1]>a&&(a=o[r][1]);var l;return l="stroke"==e.brushType||"fill"==e.brushType?e.lineWidth||1:0,e.__rect={x:Math.round(t-l/2),y:Math.round(n-l/2),width:i-t+l,height:a-n+l},e.__rect}},e("../tool/util").inherits(o,t),o}),define("echarts/util/shape/normalIsCover",[],function(){return function(e,t){var i=this.transformCoordToLocal(e,t);return e=i[0],t=i[1],this.isCoverRect(e,t)}}),define("zrender/shape/util/smoothSpline",["require","../../tool/vector"],function(e){function t(e,t,i,n,a,o,r){var s=.5*(i-e),l=.5*(n-t);return(2*(t-i)+s+l)*r+(-3*(t-i)-2*s-l)*o+s*a+t}var i=e("../../tool/vector");return function(e,n){for(var a=e.length,o=[],r=0,s=1;a>s;s++)r+=i.distance(e[s-1],e[s]);var l=r/5;l=a>l?a:l;for(var s=0;l>s;s++){var h,d,c,m=s/(l-1)*(n?a:a-1),p=Math.floor(m),u=m-p,V=e[p%a];n?(h=e[(p-1+a)%a],d=e[(p+1)%a],c=e[(p+2)%a]):(h=e[0===p?p:p-1],d=e[p>a-2?a-1:p+1],c=e[p>a-3?a-1:p+2]);var U=u*u,g=u*U;o.push([t(h[0],V[0],d[0],c[0],u,U,g),t(h[1],V[1],d[1],c[1],u,U,g)])}return o}}),define("zrender/shape/util/smoothBezier",["require","../../tool/vector"],function(e){var t=e("../../tool/vector");return function(e,i,n,a){var o,r,s,l,h=[],d=[],c=[],m=[],p=!!a;if(p){s=[1/0,1/0],l=[-(1/0),-(1/0)];

for(var u=0,V=e.length;V>u;u++)t.min(s,s,e[u]),t.max(l,l,e[u]);t.min(s,s,a[0]),t.max(l,l,a[1])}for(var u=0,V=e.length;V>u;u++){var o,r,U=e[u];if(n)o=e[u?u-1:V-1],r=e[(u+1)%V];else{if(0===u||u===V-1){h.push(t.clone(e[u]));continue}o=e[u-1],r=e[u+1]}t.sub(d,r,o),t.scale(d,d,i);var g=t.distance(U,o),f=t.distance(U,r),y=g+f;0!==y&&(g/=y,f/=y),t.scale(c,d,-g),t.scale(m,d,f);var b=t.add([],U,c),_=t.add([],U,m);p&&(t.max(b,b,s),t.min(b,b,l),t.max(_,_,s),t.min(_,_,l)),h.push(b),h.push(_)}return n&&h.push(t.clone(h.shift())),h}}),define("echarts/util/ecQuery",["require","zrender/tool/util"],function(e){function t(e,t){if("undefined"!=typeof e){if(!t)return e;t=t.split(".");for(var i=t.length,n=0;i>n;){if(e=e[t[n]],"undefined"==typeof e)return;n++}return e}}function i(e,i){for(var n,a=0,o=e.length;o>a;a++)if(n=t(e[a],i),"undefined"!=typeof n)return n}function n(e,i){for(var n,o=e.length;o--;){var r=t(e[o],i);"undefined"!=typeof r&&("undefined"==typeof n?n=a.clone(r):a.merge(n,r,!0))}return n}var a=e("zrender/tool/util");return{query:t,deepQuery:i,deepMerge:n}}),define("echarts/util/number",[],function(){function e(e){return e.replace(/^\s+/,"").replace(/\s+$/,"")}function t(t,i){return"string"==typeof t?e(t).match(/%$/)?parseFloat(t)/100*i:parseFloat(t):t}function i(e,i){return[t(i[0],e.getWidth()),t(i[1],e.getHeight())]}function n(e,i){i instanceof Array||(i=[0,i]);var n=Math.min(e.getWidth(),e.getHeight())/2;return[t(i[0],n),t(i[1],n)]}function a(e){return isNaN(e)?"-":(e=(e+"").split("."),e[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g,"$1,")+(e.length>1?"."+e[1]:""))}function o(e){for(var t=1,i=0;Math.round(e*t)/t!==e;)t*=10,i++;return i}return{parsePercent:t,parseCenter:i,parseRadius:n,addCommas:a,getPrecision:o}}),define("echarts/data/KDTree",["require","./quickSelect"],function(e){function t(e,t){this.left=null,this.right=null,this.axis=e,this.data=t}var i=e("./quickSelect"),n=function(e,t){e.length&&(t||(t=e[0].array.length),this.dimension=t,this.root=this._buildTree(e,0,e.length-1,0),this._stack=[],this._nearstNList=[])};return n.prototype._buildTree=function(e,n,a,o){if(n>a)return null;var r=Math.floor((n+a)/2);r=i(e,n,a,r,function(e,t){return e.array[o]-t.array[o]});var s=e[r],l=new t(o,s);return o=(o+1)%this.dimension,a>n&&(l.left=this._buildTree(e,n,r-1,o),l.right=this._buildTree(e,r+1,a,o)),l},n.prototype.nearest=function(e,t){var i=this.root,n=this._stack,a=0,o=1/0,r=null;for(i.data!==e&&(o=t(i.data,e),r=i),e.array[i.axis]<i.data.array[i.axis]?(i.right&&(n[a++]=i.right),i.left&&(n[a++]=i.left)):(i.left&&(n[a++]=i.left),i.right&&(n[a++]=i.right));a--;){i=n[a];var s=e.array[i.axis]-i.data.array[i.axis],l=0>s,h=!1;s*=s,o>s&&(s=t(i.data,e),o>s&&i.data!==e&&(o=s,r=i),h=!0),l?(h&&i.right&&(n[a++]=i.right),i.left&&(n[a++]=i.left)):(h&&i.left&&(n[a++]=i.left),i.right&&(n[a++]=i.right))}return r.data},n.prototype._addNearest=function(e,t,i){for(var n=this._nearstNList,a=e-1;a>0&&!(t>=n[a-1].dist);a--)n[a].dist=n[a-1].dist,n[a].node=n[a-1].node;n[a].dist=t,n[a].node=i},n.prototype.nearestN=function(e,t,i,n){if(0>=t)return n.length=0,n;for(var a=this.root,o=this._stack,r=0,s=this._nearstNList,l=0;t>l;l++)s[l]||(s[l]={}),s[l].dist=0,s[l].node=null;var h=i(a.data,e),d=0;for(a.data!==e&&(d++,this._addNearest(d,h,a)),e.array[a.axis]<a.data.array[a.axis]?(a.right&&(o[r++]=a.right),a.left&&(o[r++]=a.left)):(a.left&&(o[r++]=a.left),a.right&&(o[r++]=a.right));r--;){a=o[r];var h=e.array[a.axis]-a.data.array[a.axis],c=0>h,m=!1;h*=h,(t>d||h<s[d-1].dist)&&(h=i(a.data,e),(t>d||h<s[d-1].dist)&&a.data!==e&&(t>d&&d++,this._addNearest(d,h,a)),m=!0),c?(m&&a.right&&(o[r++]=a.right),a.left&&(o[r++]=a.left)):(m&&a.left&&(o[r++]=a.left),a.right&&(o[r++]=a.right))}for(var l=0;d>l;l++)n[l]=s[l].node.data;return n.length=d,n},n}),define("echarts/data/quickSelect",["require"],function(){function e(e,t){return e-t}function t(e,t,i){var n=e[t];e[t]=e[i],e[i]=n}function i(e,i,n,a,o){for(var r=i;n>i;){var r=Math.round((n+i)/2),s=e[r];t(e,r,n),r=i;for(var l=i;n-1>=l;l++)o(s,e[l])>=0&&(t(e,l,r),r++);if(t(e,n,r),r===a)return r;a>r?i=r+1:n=r-1}return i}function n(t,n,a,o,r){return arguments.length<=3&&(o=n,r=2==arguments.length?e:a,n=0,a=t.length-1),i(t,n,a,o,r)}return n}),define("echarts/component/dataView",["require","./base","../config","zrender/tool/util","../component"],function(e){function t(e,t,n,a,o){i.call(this,e,t,n,a,o),this.dom=o.dom,this._tDom=document.createElement("div"),this._textArea=document.createElement("textArea"),this._buttonRefresh=document.createElement("button"),this._buttonRefresh.setAttribute("type","button"),this._buttonClose=document.createElement("button"),this._buttonClose.setAttribute("type","button"),this._hasShow=!1,this._zrHeight=n.getHeight(),this._zrWidth=n.getWidth(),this._tDom.className="echarts-dataview",this.hide(),this.dom.firstChild.appendChild(this._tDom),window.addEventListener?(this._tDom.addEventListener("click",this._stop),this._tDom.addEventListener("mousewheel",this._stop),this._tDom.addEventListener("mousemove",this._stop),this._tDom.addEventListener("mousedown",this._stop),this._tDom.addEventListener("mouseup",this._stop),this._tDom.addEventListener("touchstart",this._stop),this._tDom.addEventListener("touchmove",this._stop),this._tDom.addEventListener("touchend",this._stop)):(this._tDom.attachEvent("onclick",this._stop),this._tDom.attachEvent("onmousewheel",this._stop),this._tDom.attachEvent("onmousemove",this._stop),this._tDom.attachEvent("onmousedown",this._stop),this._tDom.attachEvent("onmouseup",this._stop))}var i=e("./base"),n=e("../config"),a=e("zrender/tool/util");return t.prototype={type:n.COMPONENT_TYPE_DATAVIEW,_lang:["Data View","close","refresh"],_gCssText:"position:absolute;display:block;overflow:hidden;transition:height 0.8s,background-color 1s;-moz-transition:height 0.8s,background-color 1s;-webkit-transition:height 0.8s,background-color 1s;-o-transition:height 0.8s,background-color 1s;z-index:1;left:0;top:0;",hide:function(){this._sizeCssText="width:"+this._zrWidth+"px;height:0px;background-color:#f0ffff;",this._tDom.style.cssText=this._gCssText+this._sizeCssText},show:function(e){this._hasShow=!0;var t=this.query(this.option,"toolbox.feature.dataView.lang")||this._lang;this.option=e,this._tDom.innerHTML='<p style="padding:8px 0;margin:0 0 10px 0;border-bottom:1px solid #eee">'+(t[0]||this._lang[0])+"</p>";var i=this.query(this.option,"toolbox.feature.dataView.optionToContent");"function"!=typeof i?this._textArea.value=this._optionToContent():(this._textArea=document.createElement("div"),this._textArea.innerHTML=i(this.option)),this._textArea.style.cssText="display:block;margin:0 0 8px 0;padding:4px 6px;overflow:auto;width:100%;height:"+(this._zrHeight-100)+"px;",this._tDom.appendChild(this._textArea),this._buttonClose.style.cssText="float:right;padding:1px 6px;",this._buttonClose.innerHTML=t[1]||this._lang[1];var n=this;this._buttonClose.onclick=function(){n.hide()},this._tDom.appendChild(this._buttonClose),this.query(this.option,"toolbox.feature.dataView.readOnly")===!1?(this._buttonRefresh.style.cssText="float:right;margin-right:10px;padding:1px 6px;",this._buttonRefresh.innerHTML=t[2]||this._lang[2],this._buttonRefresh.onclick=function(){n._save()},this._textArea.readOnly=!1,this._textArea.style.cursor="default"):(this._buttonRefresh.style.cssText="display:none",this._textArea.readOnly=!0,this._textArea.style.cursor="text"),this._tDom.appendChild(this._buttonRefresh),this._sizeCssText="width:"+this._zrWidth+"px;height:"+this._zrHeight+"px;background-color:#fff;",this._tDom.style.cssText=this._gCssText+this._sizeCssText},_optionToContent:function(){var e,t,i,a,o,r,s=[],l="";if(this.option.xAxis)for(s=this.option.xAxis instanceof Array?this.option.xAxis:[this.option.xAxis],e=0,a=s.length;a>e;e++)if("category"==(s[e].type||"category")){for(r=[],t=0,i=s[e].data.length;i>t;t++)r.push(this.getDataFromOption(s[e].data[t]));l+=r.join(", ")+"\n\n"}if(this.option.yAxis)for(s=this.option.yAxis instanceof Array?this.option.yAxis:[this.option.yAxis],e=0,a=s.length;a>e;e++)if("category"==s[e].type){for(r=[],t=0,i=s[e].data.length;i>t;t++)r.push(this.getDataFromOption(s[e].data[t]));l+=r.join(", ")+"\n\n"}var h,d=this.option.series;for(e=0,a=d.length;a>e;e++){for(r=[],t=0,i=d[e].data.length;i>t;t++)o=d[e].data[t],h=d[e].type==n.CHART_TYPE_PIE||d[e].type==n.CHART_TYPE_MAP?(o.name||"-")+":":"",d[e].type==n.CHART_TYPE_SCATTER&&(o=this.getDataFromOption(o).join(", ")),r.push(h+this.getDataFromOption(o));l+=(d[e].name||"-")+" : \n",l+=r.join(d[e].type==n.CHART_TYPE_SCATTER?"\n":", "),l+="\n\n"}return l},_save:function(){var e=this.query(this.option,"toolbox.feature.dataView.contentToOption");if("function"!=typeof e){for(var t=this._textArea.value.split("\n"),i=[],a=0,o=t.length;o>a;a++)t[a]=this._trim(t[a]),""!==t[a]&&i.push(t[a]);this._contentToOption(i)}else e(this._textArea,this.option);this.hide();var r=this;setTimeout(function(){r.messageCenter&&r.messageCenter.dispatch(n.EVENT.DATA_VIEW_CHANGED,null,{option:r.option},r.myChart)},r.canvasSupported?800:100)},_contentToOption:function(e){var t,i,a,o,r,s,l,h=[],d=0;if(this.option.xAxis)for(h=this.option.xAxis instanceof Array?this.option.xAxis:[this.option.xAxis],t=0,o=h.length;o>t;t++)if("category"==(h[t].type||"category")){for(s=e[d].split(","),i=0,a=h[t].data.length;a>i;i++)l=this._trim(s[i]||""),r=h[t].data[i],"undefined"!=typeof h[t].data[i].value?h[t].data[i].value=l:h[t].data[i]=l;d++}if(this.option.yAxis)for(h=this.option.yAxis instanceof Array?this.option.yAxis:[this.option.yAxis],t=0,o=h.length;o>t;t++)if("category"==h[t].type){for(s=e[d].split(","),i=0,a=h[t].data.length;a>i;i++)l=this._trim(s[i]||""),r=h[t].data[i],"undefined"!=typeof h[t].data[i].value?h[t].data[i].value=l:h[t].data[i]=l;d++}var c=this.option.series;for(t=0,o=c.length;o>t;t++)if(d++,c[t].type==n.CHART_TYPE_SCATTER)for(var i=0,a=c[t].data.length;a>i;i++)s=e[d],l=s.replace(" ","").split(","),"undefined"!=typeof c[t].data[i].value?c[t].data[i].value=l:c[t].data[i]=l,d++;else{s=e[d].split(",");for(var i=0,a=c[t].data.length;a>i;i++)l=(s[i]||"").replace(/.*:/,""),l=this._trim(l),l="-"!=l&&""!==l?l-0:"-","undefined"!=typeof c[t].data[i].value?c[t].data[i].value=l:c[t].data[i]=l;d++}},_trim:function(e){var t=new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+$)","g");return e.replace(t,"")},_stop:function(e){e=e||window.event,e.stopPropagation?e.stopPropagation():e.cancelBubble=!0},resize:function(){this._zrHeight=this.zr.getHeight(),this._zrWidth=this.zr.getWidth(),this._tDom.offsetHeight>10&&(this._sizeCssText="width:"+this._zrWidth+"px;height:"+this._zrHeight+"px;background-color:#fff;",this._tDom.style.cssText=this._gCssText+this._sizeCssText,this._textArea.style.cssText="display:block;margin:0 0 8px 0;padding:4px 6px;overflow:auto;width:100%;height:"+(this._zrHeight-100)+"px;")},dispose:function(){window.removeEventListener?(this._tDom.removeEventListener("click",this._stop),this._tDom.removeEventListener("mousewheel",this._stop),this._tDom.removeEventListener("mousemove",this._stop),this._tDom.removeEventListener("mousedown",this._stop),this._tDom.removeEventListener("mouseup",this._stop),this._tDom.removeEventListener("touchstart",this._stop),this._tDom.removeEventListener("touchmove",this._stop),this._tDom.removeEventListener("touchend",this._stop)):(this._tDom.detachEvent("onclick",this._stop),this._tDom.detachEvent("onmousewheel",this._stop),this._tDom.detachEvent("onmousemove",this._stop),this._tDom.detachEvent("onmousedown",this._stop),this._tDom.detachEvent("onmouseup",this._stop)),this._buttonRefresh.onclick=null,this._buttonClose.onclick=null,this._hasShow&&(this._tDom.removeChild(this._textArea),this._tDom.removeChild(this._buttonRefresh),this._tDom.removeChild(this._buttonClose)),this._textArea=null,this._buttonRefresh=null,this._buttonClose=null,this.dom.firstChild.removeChild(this._tDom),this._tDom=null}},a.inherits(t,i),e("../component").define("dataView",t),t}),define("echarts/util/shape/Cross",["require","zrender/shape/Base","zrender/shape/Line","zrender/tool/util","./normalIsCover"],function(e){function t(e){i.call(this,e)}var i=e("zrender/shape/Base"),n=e("zrender/shape/Line"),a=e("zrender/tool/util");return t.prototype={type:"cross",buildPath:function(e,t){var i=t.rect;t.xStart=i.x,t.xEnd=i.x+i.width,t.yStart=t.yEnd=t.y,n.prototype.buildPath(e,t),t.xStart=t.xEnd=t.x,t.yStart=i.y,t.yEnd=i.y+i.height,n.prototype.buildPath(e,t)},getRect:function(e){return e.rect},isCover:e("./normalIsCover")},a.inherits(t,i),t}),define("zrender/shape/Sector",["require","../tool/math","../tool/computeBoundingBox","../tool/vector","./Base","../tool/util"],function(e){var t=e("../tool/math"),i=e("../tool/computeBoundingBox"),n=e("../tool/vector"),a=e("./Base"),o=n.create(),r=n.create(),s=n.create(),l=n.create(),h=function(e){a.call(this,e)};return h.prototype={type:"sector",buildPath:function(e,i){var n=i.x,a=i.y,o=i.r0||0,r=i.r,s=i.startAngle,l=i.endAngle,h=i.clockWise||!1;s=t.degreeToRadian(s),l=t.degreeToRadian(l),h||(s=-s,l=-l);var d=t.cos(s),c=t.sin(s);e.moveTo(d*o+n,c*o+a),e.lineTo(d*r+n,c*r+a),e.arc(n,a,r,s,l,!h),e.lineTo(t.cos(l)*o+n,t.sin(l)*o+a),0!==o&&e.arc(n,a,o,l,s,h),e.closePath()},getRect:function(e){if(e.__rect)return e.__rect;var a=e.x,h=e.y,d=e.r0||0,c=e.r,m=t.degreeToRadian(e.startAngle),p=t.degreeToRadian(e.endAngle),u=e.clockWise;return u||(m=-m,p=-p),d>1?i.arc(a,h,d,m,p,!u,o,s):(o[0]=s[0]=a,o[1]=s[1]=h),i.arc(a,h,c,m,p,!u,r,l),n.min(o,o,r),n.max(s,s,l),e.__rect={x:o[0],y:o[1],width:s[0]-o[0],height:s[1]-o[1]},e.__rect}},e("../tool/util").inherits(h,a),h}),define("echarts/util/shape/Candle",["require","zrender/shape/Base","zrender/tool/util","./normalIsCover"],function(e){function t(e){i.call(this,e)}var i=e("zrender/shape/Base"),n=e("zrender/tool/util");return t.prototype={type:"candle",_numberOrder:function(e,t){return t-e},buildPath:function(e,t){var i=n.clone(t.y).sort(this._numberOrder);e.moveTo(t.x,i[3]),e.lineTo(t.x,i[2]),e.moveTo(t.x-t.width/2,i[2]),e.rect(t.x-t.width/2,i[2],t.width,i[1]-i[2]),e.moveTo(t.x,i[1]),e.lineTo(t.x,i[0])},getRect:function(e){if(!e.__rect){var t=0;("stroke"==e.brushType||"fill"==e.brushType)&&(t=e.lineWidth||1);var i=n.clone(e.y).sort(this._numberOrder);e.__rect={x:Math.round(e.x-e.width/2-t/2),y:Math.round(i[3]-t/2),width:e.width+t,height:i[0]-i[3]+t}}return e.__rect},isCover:e("./normalIsCover")},n.inherits(t,i),t}),define("zrender/tool/computeBoundingBox",["require","./vector","./curve"],function(e){function t(e,t,i){if(0!==e.length){for(var n=e[0][0],a=e[0][0],o=e[0][1],r=e[0][1],s=1;s<e.length;s++){var l=e[s];l[0]<n&&(n=l[0]),l[0]>a&&(a=l[0]),l[1]<o&&(o=l[1]),l[1]>r&&(r=l[1])}t[0]=n,t[1]=o,i[0]=a,i[1]=r}}function i(e,t,i,n,a,r){var s=[];o.cubicExtrema(e[0],t[0],i[0],n[0],s);for(var l=0;l<s.length;l++)s[l]=o.cubicAt(e[0],t[0],i[0],n[0],s[l]);var h=[];o.cubicExtrema(e[1],t[1],i[1],n[1],h);for(var l=0;l<h.length;l++)h[l]=o.cubicAt(e[1],t[1],i[1],n[1],h[l]);s.push(e[0],n[0]),h.push(e[1],n[1]);var d=Math.min.apply(null,s),c=Math.max.apply(null,s),m=Math.min.apply(null,h),p=Math.max.apply(null,h);a[0]=d,a[1]=m,r[0]=c,r[1]=p}function n(e,t,i,n,a){var r=o.quadraticExtremum(e[0],t[0],i[0]),s=o.quadraticExtremum(e[1],t[1],i[1]);r=Math.max(Math.min(r,1),0),s=Math.max(Math.min(s,1),0);var l=1-r,h=1-s,d=l*l*e[0]+2*l*r*t[0]+r*r*i[0],c=l*l*e[1]+2*l*r*t[1]+r*r*i[1],m=h*h*e[0]+2*h*s*t[0]+s*s*i[0],p=h*h*e[1]+2*h*s*t[1]+s*s*i[1];n[0]=Math.min(e[0],i[0],d,m),n[1]=Math.min(e[1],i[1],c,p),a[0]=Math.max(e[0],i[0],d,m),a[1]=Math.max(e[1],i[1],c,p)}var a=e("./vector"),o=e("./curve"),r=a.create(),s=a.create(),l=a.create(),h=function(e,t,i,n,o,h,d,c){if(Math.abs(n-o)>=2*Math.PI)return d[0]=e-i,d[1]=t-i,c[0]=e+i,void(c[1]=t+i);if(r[0]=Math.cos(n)*i+e,r[1]=Math.sin(n)*i+t,s[0]=Math.cos(o)*i+e,s[1]=Math.sin(o)*i+t,a.min(d,r,s),a.max(c,r,s),n%=2*Math.PI,0>n&&(n+=2*Math.PI),o%=2*Math.PI,0>o&&(o+=2*Math.PI),n>o&&!h?o+=2*Math.PI:o>n&&h&&(n+=2*Math.PI),h){var m=o;o=n,n=m}for(var p=0;o>p;p+=Math.PI/2)p>n&&(l[0]=Math.cos(p)*i+e,l[1]=Math.sin(p)*i+t,a.min(d,l,d),a.max(c,l,c))};return t.cubeBezier=i,t.quadraticBezier=n,t.arc=h,t}),define("echarts/util/shape/Chain",["require","zrender/shape/Base","./Icon","zrender/shape/util/dashedLineTo","zrender/tool/util","zrender/tool/matrix"],function(e){function t(e){i.call(this,e)}var i=e("zrender/shape/Base"),n=e("./Icon"),a=e("zrender/shape/util/dashedLineTo"),o=e("zrender/tool/util"),r=e("zrender/tool/matrix");return t.prototype={type:"chain",brush:function(e,t){var i=this.style;t&&(i=this.getHighlightStyle(i,this.highlightStyle||{})),e.save(),this.setContext(e,i),this.setTransform(e),e.save(),e.beginPath(),this.buildLinePath(e,i),e.stroke(),e.restore(),this.brushSymbol(e,i),e.restore()},buildLinePath:function(e,t){var i=t.x,n=t.y+5,o=t.width,r=t.height/2-10;if(e.moveTo(i,n),e.lineTo(i,n+r),e.moveTo(i+o,n),e.lineTo(i+o,n+r),e.moveTo(i,n+r/2),t.lineType&&"solid"!=t.lineType){if("dashed"==t.lineType||"dotted"==t.lineType){var s=(t.lineWidth||1)*("dashed"==t.lineType?5:1);a(e,i,n+r/2,i+o,n+r/2,s)}}else e.lineTo(i+o,n+r/2)},brushSymbol:function(e,t){var i=t.y+t.height/4;e.save();for(var a,o=t.chainPoint,r=0,s=o.length;s>r;r++){if(a=o[r],"none"!=a.symbol){e.beginPath();var l=a.symbolSize;n.prototype.buildPath(e,{iconType:a.symbol,x:a.x-l,y:i-l,width:2*l,height:2*l,n:a.n}),e.fillStyle=a.isEmpty?"#fff":t.strokeColor,e.closePath(),e.fill(),e.stroke()}a.showLabel&&(e.font=a.textFont,e.fillStyle=a.textColor,e.textAlign=a.textAlign,e.textBaseline=a.textBaseline,a.rotation?(e.save(),this._updateTextTransform(e,a.rotation),e.fillText(a.name,a.textX,a.textY),e.restore()):e.fillText(a.name,a.textX,a.textY))}e.restore()},_updateTextTransform:function(e,t){var i=r.create();if(r.identity(i),0!==t[0]){var n=t[1]||0,a=t[2]||0;(n||a)&&r.translate(i,i,[-n,-a]),r.rotate(i,i,t[0]),(n||a)&&r.translate(i,i,[n,a])}e.transform.apply(e,i)},isCover:function(e,t){var i=this.style;return e>=i.x&&e<=i.x+i.width&&t>=i.y&&t<=i.y+i.height?!0:!1}},o.inherits(t,i),t}),define("zrender/shape/Ring",["require","./Base","../tool/util"],function(e){var t=e("./Base"),i=function(e){t.call(this,e)};return i.prototype={type:"ring",buildPath:function(e,t){e.arc(t.x,t.y,t.r,0,2*Math.PI,!1),e.moveTo(t.x+t.r0,t.y),e.arc(t.x,t.y,t.r0,0,2*Math.PI,!0)},getRect:function(e){if(e.__rect)return e.__rect;var t;return t="stroke"==e.brushType||"fill"==e.brushType?e.lineWidth||1:0,e.__rect={x:Math.round(e.x-e.r-t/2),y:Math.round(e.y-e.r-t/2),width:2*e.r+t,height:2*e.r+t},e.__rect}},e("../tool/util").inherits(i,t),i}),define("echarts/component/axis",["require","./base","zrender/shape/Line","../config","../util/ecData","zrender/tool/util","zrender/tool/color","./categoryAxis","./valueAxis","../component"],function(e){function t(e,t,n,a,o,r){i.call(this,e,t,n,a,o),this.axisType=r,this._axisList=[],this.refresh(a)}var i=e("./base"),n=e("zrender/shape/Line"),a=e("../config"),o=e("../util/ecData"),r=e("zrender/tool/util"),s=e("zrender/tool/color");return t.prototype={type:a.COMPONENT_TYPE_AXIS,axisBase:{_buildAxisLine:function(){var e=this.option.axisLine.lineStyle.width,t=e/2,i={_axisShape:"axisLine",zlevel:this.getZlevelBase(),z:this.getZBase()+3,hoverable:!1},a=this.grid;switch(this.option.position){case"left":i.style={xStart:a.getX()-t,yStart:a.getYend(),xEnd:a.getX()-t,yEnd:a.getY(),lineCap:"round"};break;case"right":i.style={xStart:a.getXend()+t,yStart:a.getYend(),xEnd:a.getXend()+t,yEnd:a.getY(),lineCap:"round"};break;case"bottom":i.style={xStart:a.getX(),yStart:a.getYend()+t,xEnd:a.getXend(),yEnd:a.getYend()+t,lineCap:"round"};break;case"top":i.style={xStart:a.getX(),yStart:a.getY()-t,xEnd:a.getXend(),yEnd:a.getY()-t,lineCap:"round"}}var o=i.style;""!==this.option.name&&(o.text=this.option.name,o.textPosition=this.option.nameLocation,o.textFont=this.getFont(this.option.nameTextStyle),this.option.nameTextStyle.align&&(o.textAlign=this.option.nameTextStyle.align),this.option.nameTextStyle.baseline&&(o.textBaseline=this.option.nameTextStyle.baseline),this.option.nameTextStyle.color&&(o.textColor=this.option.nameTextStyle.color)),o.strokeColor=this.option.axisLine.lineStyle.color,o.lineWidth=e,this.isHorizontal()?o.yStart=o.yEnd=this.subPixelOptimize(o.yEnd,e):o.xStart=o.xEnd=this.subPixelOptimize(o.xEnd,e),o.lineType=this.option.axisLine.lineStyle.type,i=new n(i),this.shapeList.push(i)},_axisLabelClickable:function(e,t){return e?(o.pack(t,void 0,-1,void 0,-1,t.style.text),t.hoverable=!0,t.clickable=!0,t.highlightStyle={color:s.lift(t.style.color,1),brushType:"fill"},t):t},refixAxisShape:function(e,t){if(this.option.axisLine.onZero){var i;if(this.isHorizontal()&&null!=t)for(var n=0,a=this.shapeList.length;a>n;n++)"axisLine"===this.shapeList[n]._axisShape?(this.shapeList[n].style.yStart=this.shapeList[n].style.yEnd=this.subPixelOptimize(t,this.shapeList[n].stylelineWidth),this.zr.modShape(this.shapeList[n].id)):"axisTick"===this.shapeList[n]._axisShape&&(i=this.shapeList[n].style.yEnd-this.shapeList[n].style.yStart,this.shapeList[n].style.yStart=t-i,this.shapeList[n].style.yEnd=t,this.zr.modShape(this.shapeList[n].id));if(!this.isHorizontal()&&null!=e)for(var n=0,a=this.shapeList.length;a>n;n++)"axisLine"===this.shapeList[n]._axisShape?(this.shapeList[n].style.xStart=this.shapeList[n].style.xEnd=this.subPixelOptimize(e,this.shapeList[n].stylelineWidth),this.zr.modShape(this.shapeList[n].id)):"axisTick"===this.shapeList[n]._axisShape&&(i=this.shapeList[n].style.xEnd-this.shapeList[n].style.xStart,this.shapeList[n].style.xStart=e,this.shapeList[n].style.xEnd=e+i,this.zr.modShape(this.shapeList[n].id))}},getPosition:function(){return this.option.position},isHorizontal:function(){return"bottom"===this.option.position||"top"===this.option.position}},reformOption:function(e){if(!e||e instanceof Array&&0===e.length?e=[{type:a.COMPONENT_TYPE_AXIS_VALUE}]:e instanceof Array||(e=[e]),e.length>2&&(e=[e[0],e[1]]),"xAxis"===this.axisType){(!e[0].position||"bottom"!=e[0].position&&"top"!=e[0].position)&&(e[0].position="bottom"),e.length>1&&(e[1].position="bottom"===e[0].position?"top":"bottom");for(var t=0,i=e.length;i>t;t++)e[t].type=e[t].type||"category",e[t].xAxisIndex=t,e[t].yAxisIndex=-1}else{(!e[0].position||"left"!=e[0].position&&"right"!=e[0].position)&&(e[0].position="left"),e.length>1&&(e[1].position="left"===e[0].position?"right":"left");for(var t=0,i=e.length;i>t;t++)e[t].type=e[t].type||"value",e[t].xAxisIndex=-1,e[t].yAxisIndex=t}return e},refresh:function(t){var i;t&&(this.option=t,"xAxis"===this.axisType?(this.option.xAxis=this.reformOption(t.xAxis),i=this.option.xAxis):(this.option.yAxis=this.reformOption(t.yAxis),i=this.option.yAxis),this.series=t.series);for(var n=e("./categoryAxis"),a=e("./valueAxis"),o=Math.max(i&&i.length||0,this._axisList.length),r=0;o>r;r++)!this._axisList[r]||!t||i[r]&&this._axisList[r].type==i[r].type||(this._axisList[r].dispose&&this._axisList[r].dispose(),this._axisList[r]=!1),this._axisList[r]?this._axisList[r].refresh&&this._axisList[r].refresh(i?i[r]:!1,this.series):i&&i[r]&&(this._axisList[r]="category"===i[r].type?new n(this.ecTheme,this.messageCenter,this.zr,i[r],this.myChart,this.axisBase):new a(this.ecTheme,this.messageCenter,this.zr,i[r],this.myChart,this.axisBase,this.series))},getAxis:function(e){return this._axisList[e]},getAxisCount:function(){return this._axisList.length},clear:function(){for(var e=0,t=this._axisList.length;t>e;e++)this._axisList[e].dispose&&this._axisList[e].dispose();this._axisList=[]}},r.inherits(t,i),e("../component").define("axis",t),t}),define("echarts/component/grid",["require","./base","zrender/shape/Rectangle","../config","zrender/tool/util","../component"],function(e){function t(e,t,n,a,o){i.call(this,e,t,n,a,o),this.refresh(a)}var i=e("./base"),n=e("zrender/shape/Rectangle"),a=e("../config");a.grid={zlevel:0,z:0,x:80,y:60,x2:80,y2:60,backgroundColor:"rgba(0,0,0,0)",borderWidth:1,borderColor:"#ccc"};var o=e("zrender/tool/util");return t.prototype={type:a.COMPONENT_TYPE_GRID,getX:function(){return this._x},getY:function(){return this._y},getWidth:function(){return this._width},getHeight:function(){return this._height},getXend:function(){return this._x+this._width},getYend:function(){return this._y+this._height},getArea:function(){return{x:this._x,y:this._y,width:this._width,height:this._height}},getBbox:function(){return[[this._x,this._y],[this.getXend(),this.getYend()]]},refixAxisShape:function(e){for(var t,i,n,o=e.xAxis._axisList.concat(e.yAxis?e.yAxis._axisList:[]),r=o.length;r--;)n=o[r],n.type==a.COMPONENT_TYPE_AXIS_VALUE&&n._min<0&&n._max>=0&&(n.isHorizontal()?t=n.getCoord(0):i=n.getCoord(0));if("undefined"!=typeof t||"undefined"!=typeof i)for(r=o.length;r--;)o[r].refixAxisShape(t,i)},refresh:function(e){if(e||this._zrWidth!=this.zr.getWidth()||this._zrHeight!=this.zr.getHeight()){this.clear(),this.option=e||this.option,this.option.grid=this.reformOption(this.option.grid);var t=this.option.grid;this._zrWidth=this.zr.getWidth(),this._zrHeight=this.zr.getHeight(),this._x=this.parsePercent(t.x,this._zrWidth),this._y=this.parsePercent(t.y,this._zrHeight);var i=this.parsePercent(t.x2,this._zrWidth),a=this.parsePercent(t.y2,this._zrHeight);this._width="undefined"==typeof t.width?this._zrWidth-this._x-i:this.parsePercent(t.width,this._zrWidth),this._width=this._width<=0?10:this._width,this._height="undefined"==typeof t.height?this._zrHeight-this._y-a:this.parsePercent(t.height,this._zrHeight),this._height=this._height<=0?10:this._height,this._x=this.subPixelOptimize(this._x,t.borderWidth),this._y=this.subPixelOptimize(this._y,t.borderWidth),this.shapeList.push(new n({zlevel:this.getZlevelBase(),z:this.getZBase(),hoverable:!1,style:{x:this._x,y:this._y,width:this._width,height:this._height,brushType:t.borderWidth>0?"both":"fill",color:t.backgroundColor,strokeColor:t.borderColor,lineWidth:t.borderWidth}})),this.zr.addShape(this.shapeList[0])}}},o.inherits(t,i),e("../component").define("grid",t),t}),define("echarts/component/dataZoom",["require","./base","zrender/shape/Rectangle","zrender/shape/Polygon","../util/shape/Icon","../config","../util/date","zrender/tool/util","../component"],function(e){function t(e,t,n,a,o){i.call(this,e,t,n,a,o);var r=this;r._ondrift=function(e,t){return r.__ondrift(this,e,t)},r._ondragend=function(){return r.__ondragend()},this._fillerSize=30,this._isSilence=!1,this._zoom={},this.option.dataZoom=this.reformOption(this.option.dataZoom),this.zoomOption=this.option.dataZoom,this._handleSize=this.zoomOption.handleSize,this.myChart.canvasSupported||(this.zoomOption.realtime=!1),this._location=this._getLocation(),this._zoom=this._getZoom(),this._backupData(),this.option.dataZoom.show&&this._buildShape(),this._syncData()}var i=e("./base"),n=e("zrender/shape/Rectangle"),a=e("zrender/shape/Polygon"),o=e("../util/shape/Icon"),r=e("../config");r.dataZoom={zlevel:0,z:4,show:!1,orient:"horizontal",backgroundColor:"rgba(0,0,0,0)",dataBackgroundColor:"#eee",fillerColor:"rgba(144,197,237,0.2)",handleColor:"rgba(70,130,180,0.8)",handleSize:8,showDetail:!0,realtime:!0};var s=e("../util/date"),l=e("zrender/tool/util");return t.prototype={type:r.COMPONENT_TYPE_DATAZOOM,_buildShape:function(){this._buildBackground(),this._buildFiller(),this._buildHandle(),this._buildFrame();for(var e=0,t=this.shapeList.length;t>e;e++)this.zr.addShape(this.shapeList[e]);this._syncFrameShape()},_getLocation:function(){var e,t,i,n,a=this.component.grid;return"horizontal"==this.zoomOption.orient?(i=this.zoomOption.width||a.getWidth(),n=this.zoomOption.height||this._fillerSize,e=null!=this.zoomOption.x?this.zoomOption.x:a.getX(),t=null!=this.zoomOption.y?this.zoomOption.y:this.zr.getHeight()-n-2):(i=this.zoomOption.width||this._fillerSize,n=this.zoomOption.height||a.getHeight(),e=null!=this.zoomOption.x?this.zoomOption.x:2,t=null!=this.zoomOption.y?this.zoomOption.y:a.getY()),{x:e,y:t,width:i,height:n}},_getZoom:function(){var e=this.option.series,t=this.option.xAxis;!t||t instanceof Array||(t=[t],this.option.xAxis=t);var i=this.option.yAxis;!i||i instanceof Array||(i=[i],this.option.yAxis=i);var n,a,o=[],s=this.zoomOption.xAxisIndex;if(t&&null==s){n=[];for(var l=0,h=t.length;h>l;l++)("category"==t[l].type||null==t[l].type)&&n.push(l)}else n=s instanceof Array?s:null!=s?[s]:[];if(s=this.zoomOption.yAxisIndex,i&&null==s){a=[];for(var l=0,h=i.length;h>l;l++)"category"==i[l].type&&a.push(l)}else a=s instanceof Array?s:null!=s?[s]:[];for(var d,l=0,h=e.length;h>l;l++)if(d=e[l],d.type==r.CHART_TYPE_LINE||d.type==r.CHART_TYPE_BAR||d.type==r.CHART_TYPE_SCATTER||d.type==r.CHART_TYPE_K){for(var c=0,m=n.length;m>c;c++)if(n[c]==(d.xAxisIndex||0)){o.push(l);break}for(var c=0,m=a.length;m>c;c++)if(a[c]==(d.yAxisIndex||0)){o.push(l);break}null==this.zoomOption.xAxisIndex&&null==this.zoomOption.yAxisIndex&&d.data&&this.getDataFromOption(d.data[0])instanceof Array&&(d.type==r.CHART_TYPE_SCATTER||d.type==r.CHART_TYPE_LINE||d.type==r.CHART_TYPE_BAR)&&o.push(l)}var p=null!=this._zoom.start?this._zoom.start:null!=this.zoomOption.start?this.zoomOption.start:0,u=null!=this._zoom.end?this._zoom.end:null!=this.zoomOption.end?this.zoomOption.end:100;p>u&&(p+=u,u=p-u,p-=u);var V=Math.round((u-p)/100*("horizontal"==this.zoomOption.orient?this._location.width:this._location.height));return{start:p,end:u,start2:0,end2:100,size:V,xAxisIndex:n,yAxisIndex:a,seriesIndex:o,scatterMap:this._zoom.scatterMap||{}}},_backupData:function(){this._originalData={xAxis:{},yAxis:{},series:{}};for(var e=this.option.xAxis,t=this._zoom.xAxisIndex,i=0,n=t.length;n>i;i++)this._originalData.xAxis[t[i]]=e[t[i]].data;for(var a=this.option.yAxis,o=this._zoom.yAxisIndex,i=0,n=o.length;n>i;i++)this._originalData.yAxis[o[i]]=a[o[i]].data;for(var s,l=this.option.series,h=this._zoom.seriesIndex,i=0,n=h.length;n>i;i++)s=l[h[i]],this._originalData.series[h[i]]=s.data,s.data&&this.getDataFromOption(s.data[0])instanceof Array&&(s.type==r.CHART_TYPE_SCATTER||s.type==r.CHART_TYPE_LINE||s.type==r.CHART_TYPE_BAR)&&(this._backupScale(),this._calculScatterMap(h[i]))},_calculScatterMap:function(t){this._zoom.scatterMap=this._zoom.scatterMap||{},this._zoom.scatterMap[t]=this._zoom.scatterMap[t]||{};var i=e("../component"),n=i.get("axis"),a=l.clone(this.option.xAxis);"category"==a[0].type&&(a[0].type="value"),a[1]&&"category"==a[1].type&&(a[1].type="value");var o=new n(this.ecTheme,null,!1,{xAxis:a,series:this.option.series},this,"xAxis"),r=this.option.series[t].xAxisIndex||0;this._zoom.scatterMap[t].x=o.getAxis(r).getExtremum(),o.dispose(),a=l.clone(this.option.yAxis),"category"==a[0].type&&(a[0].type="value"),a[1]&&"category"==a[1].type&&(a[1].type="value"),o=new n(this.ecTheme,null,!1,{yAxis:a,series:this.option.series},this,"yAxis"),r=this.option.series[t].yAxisIndex||0,this._zoom.scatterMap[t].y=o.getAxis(r).getExtremum(),o.dispose()},_buildBackground:function(){var e=this._location.width,t=this._location.height;this.shapeList.push(new n({zlevel:this.getZlevelBase(),z:this.getZBase(),hoverable:!1,style:{x:this._location.x,y:this._location.y,width:e,height:t,color:this.zoomOption.backgroundColor}}));for(var i=0,o=this._originalData.xAxis,s=this._zoom.xAxisIndex,l=0,h=s.length;h>l;l++)i=Math.max(i,o[s[l]].length);for(var d=this._originalData.yAxis,c=this._zoom.yAxisIndex,l=0,h=c.length;h>l;l++)i=Math.max(i,d[c[l]].length);for(var m,p=this._zoom.seriesIndex[0],u=this._originalData.series[p],V=Number.MIN_VALUE,U=Number.MAX_VALUE,l=0,h=u.length;h>l;l++)m=this.getDataFromOption(u[l],0),this.option.series[p].type==r.CHART_TYPE_K&&(m=m[1]),isNaN(m)&&(m=0),V=Math.max(V,m),U=Math.min(U,m);var g=V-U,f=[],y=e/(i-(i>1?1:0)),b=t/(i-(i>1?1:0)),_=1;"horizontal"==this.zoomOption.orient&&1>y?_=Math.floor(3*i/e):"vertical"==this.zoomOption.orient&&1>b&&(_=Math.floor(3*i/t));for(var l=0,h=i;h>l;l+=_)m=this.getDataFromOption(u[l],0),this.option.series[p].type==r.CHART_TYPE_K&&(m=m[1]),isNaN(m)&&(m=0),f.push("horizontal"==this.zoomOption.orient?[this._location.x+y*l,this._location.y+t-1-Math.round((m-U)/g*(t-10))]:[this._location.x+1+Math.round((m-U)/g*(e-10)),this._location.y+b*(h-l-1)]);

"horizontal"==this.zoomOption.orient?(f.push([this._location.x+e,this._location.y+t]),f.push([this._location.x,this._location.y+t])):(f.push([this._location.x,this._location.y]),f.push([this._location.x,this._location.y+t])),this.shapeList.push(new a({zlevel:this.getZlevelBase(),z:this.getZBase(),style:{pointList:f,color:this.zoomOption.dataBackgroundColor},hoverable:!1}))},_buildFiller:function(){this._fillerShae={zlevel:this.getZlevelBase(),z:this.getZBase(),draggable:!0,ondrift:this._ondrift,ondragend:this._ondragend,_type:"filler"},this._fillerShae.style="horizontal"==this.zoomOption.orient?{x:this._location.x+Math.round(this._zoom.start/100*this._location.width)+this._handleSize,y:this._location.y,width:this._zoom.size-2*this._handleSize,height:this._location.height,color:this.zoomOption.fillerColor,text:":::",textPosition:"inside"}:{x:this._location.x,y:this._location.y+Math.round(this._zoom.start/100*this._location.height)+this._handleSize,width:this._location.width,height:this._zoom.size-2*this._handleSize,color:this.zoomOption.fillerColor,text:"::",textPosition:"inside"},this._fillerShae.highlightStyle={brushType:"fill",color:"rgba(0,0,0,0)"},this._fillerShae=new n(this._fillerShae),this.shapeList.push(this._fillerShae)},_buildHandle:function(){var e=this.zoomOption.showDetail?this._getDetail():{start:"",end:""};this._startShape={zlevel:this.getZlevelBase(),z:this.getZBase(),draggable:!0,style:{iconType:"rectangle",x:this._location.x,y:this._location.y,width:this._handleSize,height:this._handleSize,color:this.zoomOption.handleColor,text:"=",textPosition:"inside"},highlightStyle:{text:e.start,brushType:"fill",textPosition:"left"},ondrift:this._ondrift,ondragend:this._ondragend},"horizontal"==this.zoomOption.orient?(this._startShape.style.height=this._location.height,this._endShape=l.clone(this._startShape),this._startShape.style.x=this._fillerShae.style.x-this._handleSize,this._endShape.style.x=this._fillerShae.style.x+this._fillerShae.style.width,this._endShape.highlightStyle.text=e.end,this._endShape.highlightStyle.textPosition="right"):(this._startShape.style.width=this._location.width,this._endShape=l.clone(this._startShape),this._startShape.style.y=this._fillerShae.style.y+this._fillerShae.style.height,this._startShape.highlightStyle.textPosition="bottom",this._endShape.style.y=this._fillerShae.style.y-this._handleSize,this._endShape.highlightStyle.text=e.end,this._endShape.highlightStyle.textPosition="top"),this._startShape=new o(this._startShape),this._endShape=new o(this._endShape),this.shapeList.push(this._startShape),this.shapeList.push(this._endShape)},_buildFrame:function(){var e=this.subPixelOptimize(this._location.x,1),t=this.subPixelOptimize(this._location.y,1);this._startFrameShape={zlevel:this.getZlevelBase(),z:this.getZBase(),hoverable:!1,style:{x:e,y:t,width:this._location.width-(e>this._location.x?1:0),height:this._location.height-(t>this._location.y?1:0),lineWidth:1,brushType:"stroke",strokeColor:this.zoomOption.handleColor}},this._endFrameShape=l.clone(this._startFrameShape),this._startFrameShape=new n(this._startFrameShape),this._endFrameShape=new n(this._endFrameShape),this.shapeList.push(this._startFrameShape),this.shapeList.push(this._endFrameShape)},_syncHandleShape:function(){"horizontal"==this.zoomOption.orient?(this._startShape.style.x=this._fillerShae.style.x-this._handleSize,this._endShape.style.x=this._fillerShae.style.x+this._fillerShae.style.width,this._zoom.start=(this._startShape.style.x-this._location.x)/this._location.width*100,this._zoom.end=(this._endShape.style.x+this._handleSize-this._location.x)/this._location.width*100):(this._startShape.style.y=this._fillerShae.style.y+this._fillerShae.style.height,this._endShape.style.y=this._fillerShae.style.y-this._handleSize,this._zoom.start=(this._location.y+this._location.height-this._startShape.style.y)/this._location.height*100,this._zoom.end=(this._location.y+this._location.height-this._endShape.style.y-this._handleSize)/this._location.height*100),this.zr.modShape(this._startShape.id),this.zr.modShape(this._endShape.id),this._syncFrameShape(),this.zr.refreshNextFrame()},_syncFillerShape:function(){var e,t;"horizontal"==this.zoomOption.orient?(e=this._startShape.style.x,t=this._endShape.style.x,this._fillerShae.style.x=Math.min(e,t)+this._handleSize,this._fillerShae.style.width=Math.abs(e-t)-this._handleSize,this._zoom.start=(Math.min(e,t)-this._location.x)/this._location.width*100,this._zoom.end=(Math.max(e,t)+this._handleSize-this._location.x)/this._location.width*100):(e=this._startShape.style.y,t=this._endShape.style.y,this._fillerShae.style.y=Math.min(e,t)+this._handleSize,this._fillerShae.style.height=Math.abs(e-t)-this._handleSize,this._zoom.start=(this._location.y+this._location.height-Math.max(e,t))/this._location.height*100,this._zoom.end=(this._location.y+this._location.height-Math.min(e,t)-this._handleSize)/this._location.height*100),this.zr.modShape(this._fillerShae.id),this._syncFrameShape(),this.zr.refreshNextFrame()},_syncFrameShape:function(){"horizontal"==this.zoomOption.orient?(this._startFrameShape.style.width=this._fillerShae.style.x-this._location.x,this._endFrameShape.style.x=this._fillerShae.style.x+this._fillerShae.style.width,this._endFrameShape.style.width=this._location.x+this._location.width-this._endFrameShape.style.x):(this._startFrameShape.style.y=this._fillerShae.style.y+this._fillerShae.style.height,this._startFrameShape.style.height=this._location.y+this._location.height-this._startFrameShape.style.y,this._endFrameShape.style.height=this._fillerShae.style.y-this._location.y),this.zr.modShape(this._startFrameShape.id),this.zr.modShape(this._endFrameShape.id)},_syncShape:function(){this.zoomOption.show&&("horizontal"==this.zoomOption.orient?(this._startShape.style.x=this._location.x+this._zoom.start/100*this._location.width,this._endShape.style.x=this._location.x+this._zoom.end/100*this._location.width-this._handleSize,this._fillerShae.style.x=this._startShape.style.x+this._handleSize,this._fillerShae.style.width=this._endShape.style.x-this._startShape.style.x-this._handleSize):(this._startShape.style.y=this._location.y+this._location.height-this._zoom.start/100*this._location.height,this._endShape.style.y=this._location.y+this._location.height-this._zoom.end/100*this._location.height-this._handleSize,this._fillerShae.style.y=this._endShape.style.y+this._handleSize,this._fillerShae.style.height=this._startShape.style.y-this._endShape.style.y-this._handleSize),this.zr.modShape(this._startShape.id),this.zr.modShape(this._endShape.id),this.zr.modShape(this._fillerShae.id),this._syncFrameShape(),this.zr.refresh())},_syncData:function(e){var t,i,n,a,o;for(var s in this._originalData){t=this._originalData[s];for(var l in t)o=t[l],null!=o&&(a=o.length,i=Math.floor(this._zoom.start/100*a),n=Math.ceil(this._zoom.end/100*a),this.getDataFromOption(o[0])instanceof Array&&this.option[s][l].type!=r.CHART_TYPE_K?(this._setScale(),this.option[s][l].data=this._synScatterData(l,o)):this.option[s][l].data=o.slice(i,n))}this._isSilence||!this.zoomOption.realtime&&!e||this.messageCenter.dispatch(r.EVENT.DATA_ZOOM,null,{zoom:this._zoom},this.myChart)},_synScatterData:function(e,t){if(0===this._zoom.start&&100==this._zoom.end&&0===this._zoom.start2&&100==this._zoom.end2)return t;var i,n,a,o,r,s=[],l=this._zoom.scatterMap[e];"horizontal"==this.zoomOption.orient?(i=l.x.max-l.x.min,n=this._zoom.start/100*i+l.x.min,a=this._zoom.end/100*i+l.x.min,i=l.y.max-l.y.min,o=this._zoom.start2/100*i+l.y.min,r=this._zoom.end2/100*i+l.y.min):(i=l.x.max-l.x.min,n=this._zoom.start2/100*i+l.x.min,a=this._zoom.end2/100*i+l.x.min,i=l.y.max-l.y.min,o=this._zoom.start/100*i+l.y.min,r=this._zoom.end/100*i+l.y.min);var h;(h=l.x.dataMappingMethods)&&(n=h.coord2Value(n),a=h.coord2Value(a)),(h=l.y.dataMappingMethods)&&(o=h.coord2Value(o),r=h.coord2Value(r));for(var d,c=0,m=t.length;m>c;c++)d=t[c].value||t[c],d[0]>=n&&d[0]<=a&&d[1]>=o&&d[1]<=r&&s.push(t[c]);return s},_setScale:function(){var e=0!==this._zoom.start||100!==this._zoom.end||0!==this._zoom.start2||100!==this._zoom.end2,t={xAxis:this.option.xAxis,yAxis:this.option.yAxis};for(var i in t)for(var n=0,a=t[i].length;a>n;n++)t[i][n].scale=e||t[i][n]._scale},_backupScale:function(){var e={xAxis:this.option.xAxis,yAxis:this.option.yAxis};for(var t in e)for(var i=0,n=e[t].length;n>i;i++)e[t][i]._scale=e[t][i].scale},_getDetail:function(){for(var e=["xAxis","yAxis"],t=0,i=e.length;i>t;t++){var n=this._originalData[e[t]];for(var a in n){var o=n[a];if(null!=o){var r=o.length,l=Math.floor(this._zoom.start/100*r),h=Math.ceil(this._zoom.end/100*r);return h-=h>0?1:0,{start:this.getDataFromOption(o[l]),end:this.getDataFromOption(o[h])}}}}e="horizontal"==this.zoomOption.orient?"xAxis":"yAxis";var d=this._zoom.seriesIndex[0],c=this.option.series[d][e+"Index"]||0,m=this.option[e][c].type,p=this._zoom.scatterMap[d][e.charAt(0)].min,u=this._zoom.scatterMap[d][e.charAt(0)].max,V=u-p;if("value"==m)return{start:p+V*this._zoom.start/100,end:p+V*this._zoom.end/100};if("time"==m){u=p+V*this._zoom.end/100,p+=V*this._zoom.start/100;var U=s.getAutoFormatter(p,u).formatter;return{start:s.format(U,p),end:s.format(U,u)}}return{start:"",end:""}},__ondrift:function(e,t,i){this.zoomOption.zoomLock&&(e=this._fillerShae);var n="filler"==e._type?this._handleSize:0;if("horizontal"==this.zoomOption.orient?e.style.x+t-n<=this._location.x?e.style.x=this._location.x+n:e.style.x+t+e.style.width+n>=this._location.x+this._location.width?e.style.x=this._location.x+this._location.width-e.style.width-n:e.style.x+=t:e.style.y+i-n<=this._location.y?e.style.y=this._location.y+n:e.style.y+i+e.style.height+n>=this._location.y+this._location.height?e.style.y=this._location.y+this._location.height-e.style.height-n:e.style.y+=i,"filler"==e._type?this._syncHandleShape():this._syncFillerShape(),this.zoomOption.realtime&&this._syncData(),this.zoomOption.showDetail){var a=this._getDetail();this._startShape.style.text=this._startShape.highlightStyle.text=a.start,this._endShape.style.text=this._endShape.highlightStyle.text=a.end,this._startShape.style.textPosition=this._startShape.highlightStyle.textPosition,this._endShape.style.textPosition=this._endShape.highlightStyle.textPosition}return!0},__ondragend:function(){this.zoomOption.showDetail&&(this._startShape.style.text=this._endShape.style.text="=",this._startShape.style.textPosition=this._endShape.style.textPosition="inside",this.zr.modShape(this._startShape.id),this.zr.modShape(this._endShape.id),this.zr.refreshNextFrame()),this.isDragend=!0},ondragend:function(e,t){this.isDragend&&e.target&&(!this.zoomOption.realtime&&this._syncData(),t.dragOut=!0,t.dragIn=!0,this._isSilence||this.zoomOption.realtime||this.messageCenter.dispatch(r.EVENT.DATA_ZOOM,null,{zoom:this._zoom},this.myChart),t.needRefresh=!1,this.isDragend=!1)},ondataZoom:function(e,t){t.needRefresh=!0},absoluteZoom:function(e){this._zoom.start=e.start,this._zoom.end=e.end,this._zoom.start2=e.start2,this._zoom.end2=e.end2,this._syncShape(),this._syncData(!0)},rectZoom:function(e){if(!e)return this._zoom.start=this._zoom.start2=0,this._zoom.end=this._zoom.end2=100,this._syncShape(),this._syncData(!0),this._zoom;var t=this.component.grid.getArea(),i={x:e.x,y:e.y,width:e.width,height:e.height};if(i.width<0&&(i.x+=i.width,i.width=-i.width),i.height<0&&(i.y+=i.height,i.height=-i.height),i.x>t.x+t.width||i.y>t.y+t.height)return!1;i.x<t.x&&(i.x=t.x),i.x+i.width>t.x+t.width&&(i.width=t.x+t.width-i.x),i.y+i.height>t.y+t.height&&(i.height=t.y+t.height-i.y);var n,a=(i.x-t.x)/t.width,o=1-(i.x+i.width-t.x)/t.width,r=1-(i.y+i.height-t.y)/t.height,s=(i.y-t.y)/t.height;return"horizontal"==this.zoomOption.orient?(n=this._zoom.end-this._zoom.start,this._zoom.start+=n*a,this._zoom.end-=n*o,n=this._zoom.end2-this._zoom.start2,this._zoom.start2+=n*r,this._zoom.end2-=n*s):(n=this._zoom.end-this._zoom.start,this._zoom.start+=n*r,this._zoom.end-=n*s,n=this._zoom.end2-this._zoom.start2,this._zoom.start2+=n*a,this._zoom.end2-=n*o),this._syncShape(),this._syncData(!0),this._zoom},syncBackupData:function(e){for(var t,i,n=this._originalData.series,a=e.series,o=0,r=a.length;r>o;o++){i=a[o].data||a[o].eventList,t=n[o]?Math.floor(this._zoom.start/100*n[o].length):0;for(var s=0,l=i.length;l>s;s++)n[o]&&(n[o][s+t]=i[s])}},syncOption:function(e){this.silence(!0),this.option=e,this.option.dataZoom=this.reformOption(this.option.dataZoom),this.zoomOption=this.option.dataZoom,this.myChart.canvasSupported||(this.zoomOption.realtime=!1),this.clear(),this._location=this._getLocation(),this._zoom=this._getZoom(),this._backupData(),this.option.dataZoom&&this.option.dataZoom.show&&this._buildShape(),this._syncData(),this.silence(!1)},silence:function(e){this._isSilence=e},getRealDataIndex:function(e,t){if(!this._originalData||0===this._zoom.start&&100==this._zoom.end)return t;var i=this._originalData.series;return i[e]?Math.floor(this._zoom.start/100*i[e].length)+t:-1},resize:function(){this.clear(),this._location=this._getLocation(),this._zoom=this._getZoom(),this.option.dataZoom.show&&this._buildShape()}},l.inherits(t,i),e("../component").define("dataZoom",t),t}),define("echarts/component/categoryAxis",["require","./base","zrender/shape/Text","zrender/shape/Line","zrender/shape/Rectangle","../config","zrender/tool/util","zrender/tool/area","../component"],function(e){function t(e,t,n,a,o,r){if(a.data.length<1)return void console.error("option.data.length < 1.");i.call(this,e,t,n,a,o),this.grid=this.component.grid;for(var s in r)this[s]=r[s];this.refresh(a)}var i=e("./base"),n=e("zrender/shape/Text"),a=e("zrender/shape/Line"),o=e("zrender/shape/Rectangle"),r=e("../config");r.categoryAxis={zlevel:0,z:0,show:!0,position:"bottom",name:"",nameLocation:"end",nameTextStyle:{},boundaryGap:!0,axisLine:{show:!0,onZero:!0,lineStyle:{color:"#48b",width:2,type:"solid"}},axisTick:{show:!0,interval:"auto",inside:!1,length:5,lineStyle:{color:"#333",width:1}},axisLabel:{show:!0,interval:"auto",rotate:0,margin:8,textStyle:{color:"#333"}},splitLine:{show:!0,lineStyle:{color:["#ccc"],width:1,type:"solid"}},splitArea:{show:!1,areaStyle:{color:["rgba(250,250,250,0.3)","rgba(200,200,200,0.3)"]}}};var s=e("zrender/tool/util"),l=e("zrender/tool/area");return t.prototype={type:r.COMPONENT_TYPE_AXIS_CATEGORY,_getReformedLabel:function(e){var t=this.getDataFromOption(this.option.data[e]),i=this.option.data[e].formatter||this.option.axisLabel.formatter;return i&&("function"==typeof i?t=i.call(this.myChart,t):"string"==typeof i&&(t=i.replace("{value}",t))),t},_getInterval:function(){var e=this.option.axisLabel.interval;if("auto"==e){var t=this.option.axisLabel.textStyle.fontSize,i=this.option.data,n=this.option.data.length;if(this.isHorizontal())if(n>3){var a,o,r=this.getGap(),h=!1,d=Math.floor(.5/r);for(d=1>d?1:d,e=Math.floor(15/r);!h&&n>e;){e+=d,h=!0,a=Math.floor(r*e);for(var c=Math.floor((n-1)/e)*e;c>=0;c-=e){if(0!==this.option.axisLabel.rotate)o=t;else if(i[c].textStyle)o=l.getTextWidth(this._getReformedLabel(c),this.getFont(s.merge(i[c].textStyle,this.option.axisLabel.textStyle)));else{var m=this._getReformedLabel(c)+"",p=(m.match(/\w/g)||"").length,u=m.length-p;o=p*t*2/3+u*t}if(o>a){h=!1;break}}}}else e=1;else if(n>3){var r=this.getGap();for(e=Math.floor(11/r);t>r*e-6&&n>e;)e++}else e=1}else e="function"==typeof e?1:e-0+1;return e},_buildShape:function(){if(this._interval=this._getInterval(),this.option.show){this.option.splitArea.show&&this._buildSplitArea(),this.option.splitLine.show&&this._buildSplitLine(),this.option.axisLine.show&&this._buildAxisLine(),this.option.axisTick.show&&this._buildAxisTick(),this.option.axisLabel.show&&this._buildAxisLabel();for(var e=0,t=this.shapeList.length;t>e;e++)this.zr.addShape(this.shapeList[e])}},_buildAxisTick:function(){var e,t=this.option.data,i=this.option.data.length,n=this.option.axisTick,o=n.length,r=n.lineStyle.color,s=n.lineStyle.width,l="function"==typeof n.interval?n.interval:"auto"==n.interval&&"function"==typeof this.option.axisLabel.interval?this.option.axisLabel.interval:!1,h=l?1:"auto"==n.interval?this._interval:n.interval-0+1,d=n.onGap,c=d?this.getGap()/2:"undefined"==typeof d&&this.option.boundaryGap?this.getGap()/2:0,m=c>0?-h:0;if(this.isHorizontal())for(var p,u="bottom"==this.option.position?n.inside?this.grid.getYend()-o-1:this.grid.getYend()+1:n.inside?this.grid.getY()+1:this.grid.getY()-o-1,V=m;i>V;V+=h)(!l||l(V,t[V]))&&(p=this.subPixelOptimize(this.getCoordByIndex(V)+(V>=0?c:0),s),e={_axisShape:"axisTick",zlevel:this.getZlevelBase(),z:this.getZBase(),hoverable:!1,style:{xStart:p,yStart:u,xEnd:p,yEnd:u+o,strokeColor:r,lineWidth:s}},this.shapeList.push(new a(e)));else for(var U,g="left"==this.option.position?n.inside?this.grid.getX()+1:this.grid.getX()-o-1:n.inside?this.grid.getXend()-o-1:this.grid.getXend()+1,V=m;i>V;V+=h)(!l||l(V,t[V]))&&(U=this.subPixelOptimize(this.getCoordByIndex(V)-(V>=0?c:0),s),e={_axisShape:"axisTick",zlevel:this.getZlevelBase(),z:this.getZBase(),hoverable:!1,style:{xStart:g,yStart:U,xEnd:g+o,yEnd:U,strokeColor:r,lineWidth:s}},this.shapeList.push(new a(e)))},_buildAxisLabel:function(){var e,t,i=this.option.data,a=this.option.data.length,o=this.option.axisLabel,r=o.rotate,l=o.margin,h=o.clickable,d=o.textStyle,c="function"==typeof o.interval?o.interval:!1;if(this.isHorizontal()){var m,p;"bottom"==this.option.position?(m=this.grid.getYend()+l,p="top"):(m=this.grid.getY()-l,p="bottom");for(var u=0;a>u;u+=this._interval)c&&!c(u,i[u])||""===this._getReformedLabel(u)||(t=s.merge(i[u].textStyle||{},d),e={zlevel:this.getZlevelBase(),z:this.getZBase()+3,hoverable:!1,style:{x:this.getCoordByIndex(u),y:m,color:t.color,text:this._getReformedLabel(u),textFont:this.getFont(t),textAlign:t.align||"center",textBaseline:t.baseline||p}},r&&(e.style.textAlign=r>0?"bottom"==this.option.position?"right":"left":"bottom"==this.option.position?"left":"right",e.rotation=[r*Math.PI/180,e.style.x,e.style.y]),this.shapeList.push(new n(this._axisLabelClickable(h,e))))}else{var V,U;"left"==this.option.position?(V=this.grid.getX()-l,U="right"):(V=this.grid.getXend()+l,U="left");for(var u=0;a>u;u+=this._interval)c&&!c(u,i[u])||""===this._getReformedLabel(u)||(t=s.merge(i[u].textStyle||{},d),e={zlevel:this.getZlevelBase(),z:this.getZBase()+3,hoverable:!1,style:{x:V,y:this.getCoordByIndex(u),color:t.color,text:this._getReformedLabel(u),textFont:this.getFont(t),textAlign:t.align||U,textBaseline:t.baseline||0===u&&""!==this.option.name?"bottom":u==a-1&&""!==this.option.name?"top":"middle"}},r&&(e.rotation=[r*Math.PI/180,e.style.x,e.style.y]),this.shapeList.push(new n(this._axisLabelClickable(h,e))))}},_buildSplitLine:function(){var e,t=this.option.data,i=this.option.data.length,n=this.option.splitLine,o=n.lineStyle.type,r=n.lineStyle.width,s=n.lineStyle.color;s=s instanceof Array?s:[s];var l=s.length,h="function"==typeof this.option.axisLabel.interval?this.option.axisLabel.interval:!1,d=n.onGap,c=d?this.getGap()/2:"undefined"==typeof d&&this.option.boundaryGap?this.getGap()/2:0;if(i-=d||"undefined"==typeof d&&this.option.boundaryGap?1:0,this.isHorizontal())for(var m,p=this.grid.getY(),u=this.grid.getYend(),V=0;i>V;V+=this._interval)(!h||h(V,t[V]))&&(m=this.subPixelOptimize(this.getCoordByIndex(V)+c,r),e={zlevel:this.getZlevelBase(),z:this.getZBase(),hoverable:!1,style:{xStart:m,yStart:p,xEnd:m,yEnd:u,strokeColor:s[V/this._interval%l],lineType:o,lineWidth:r}},this.shapeList.push(new a(e)));else for(var U,g=this.grid.getX(),f=this.grid.getXend(),V=0;i>V;V+=this._interval)(!h||h(V,t[V]))&&(U=this.subPixelOptimize(this.getCoordByIndex(V)-c,r),e={zlevel:this.getZlevelBase(),z:this.getZBase(),hoverable:!1,style:{xStart:g,yStart:U,xEnd:f,yEnd:U,strokeColor:s[V/this._interval%l],lineType:o,lineWidth:r}},this.shapeList.push(new a(e)))},_buildSplitArea:function(){var e,t=this.option.data,i=this.option.splitArea,n=i.areaStyle.color;if(n instanceof Array){var a=n.length,r=this.option.data.length,s="function"==typeof this.option.axisLabel.interval?this.option.axisLabel.interval:!1,l=i.onGap,h=l?this.getGap()/2:"undefined"==typeof l&&this.option.boundaryGap?this.getGap()/2:0;if(this.isHorizontal())for(var d,c=this.grid.getY(),m=this.grid.getHeight(),p=this.grid.getX(),u=0;r>=u;u+=this._interval)s&&!s(u,t[u])&&r>u||(d=r>u?this.getCoordByIndex(u)+h:this.grid.getXend(),e={zlevel:this.getZlevelBase(),z:this.getZBase(),hoverable:!1,style:{x:p,y:c,width:d-p,height:m,color:n[u/this._interval%a]}},this.shapeList.push(new o(e)),p=d);else for(var V,U=this.grid.getX(),g=this.grid.getWidth(),f=this.grid.getYend(),u=0;r>=u;u+=this._interval)s&&!s(u,t[u])&&r>u||(V=r>u?this.getCoordByIndex(u)-h:this.grid.getY(),e={zlevel:this.getZlevelBase(),z:this.getZBase(),hoverable:!1,style:{x:U,y:V,width:g,height:f-V,color:n[u/this._interval%a]}},this.shapeList.push(new o(e)),f=V)}else e={zlevel:this.getZlevelBase(),z:this.getZBase(),hoverable:!1,style:{x:this.grid.getX(),y:this.grid.getY(),width:this.grid.getWidth(),height:this.grid.getHeight(),color:n}},this.shapeList.push(new o(e))},refresh:function(e){e&&(this.option=this.reformOption(e),this.option.axisLabel.textStyle=this.getTextStyle(this.option.axisLabel.textStyle)),this.clear(),this._buildShape()},getGap:function(){var e=this.option.data.length,t=this.isHorizontal()?this.grid.getWidth():this.grid.getHeight();return this.option.boundaryGap?t/e:t/(e>1?e-1:1)},getCoord:function(e){for(var t=this.option.data,i=t.length,n=this.getGap(),a=this.option.boundaryGap?n/2:0,o=0;i>o;o++){if(this.getDataFromOption(t[o])==e)return a=this.isHorizontal()?this.grid.getX()+a:this.grid.getYend()-a;a+=n}},getCoordByIndex:function(e){if(0>e)return this.isHorizontal()?this.grid.getX():this.grid.getYend();if(e>this.option.data.length-1)return this.isHorizontal()?this.grid.getXend():this.grid.getY();var t=this.getGap(),i=this.option.boundaryGap?t/2:0;return i+=e*t,i=this.isHorizontal()?this.grid.getX()+i:this.grid.getYend()-i},getNameByIndex:function(e){return this.getDataFromOption(this.option.data[e])},getIndexByName:function(e){for(var t=this.option.data,i=t.length,n=0;i>n;n++)if(this.getDataFromOption(t[n])==e)return n;return-1},getValueFromCoord:function(){return""},isMainAxis:function(e){return e%this._interval===0}},s.inherits(t,i),e("../component").define("categoryAxis",t),t}),define("echarts/component/valueAxis",["require","./base","zrender/shape/Text","zrender/shape/Line","zrender/shape/Rectangle","../config","../util/date","zrender/tool/util","../util/smartSteps","../util/accMath","../util/smartLogSteps","../component"],function(e){function t(e,t,n,a,o,r,s){if(!s||0===s.length)return void console.err("option.series.length == 0.");i.call(this,e,t,n,a,o),this.series=s,this.grid=this.component.grid;for(var l in r)this[l]=r[l];this.refresh(a,s)}var i=e("./base"),n=e("zrender/shape/Text"),a=e("zrender/shape/Line"),o=e("zrender/shape/Rectangle"),r=e("../config");r.valueAxis={zlevel:0,z:0,show:!0,position:"left",name:"",nameLocation:"end",nameTextStyle:{},boundaryGap:[0,0],axisLine:{show:!0,onZero:!0,lineStyle:{color:"#48b",width:2,type:"solid"}},axisTick:{show:!1,inside:!1,length:5,lineStyle:{color:"#333",width:1}},axisLabel:{show:!0,rotate:0,margin:8,textStyle:{color:"#333"}},splitLine:{show:!0,lineStyle:{color:["#ccc"],width:1,type:"solid"}},splitArea:{show:!1,areaStyle:{color:["rgba(250,250,250,0.3)","rgba(200,200,200,0.3)"]}}};var s=e("../util/date"),l=e("zrender/tool/util");return t.prototype={type:r.COMPONENT_TYPE_AXIS_VALUE,_buildShape:function(){if(this._hasData=!1,this._calculateValue(),this._hasData&&this.option.show){this.option.splitArea.show&&this._buildSplitArea(),this.option.splitLine.show&&this._buildSplitLine(),this.option.axisLine.show&&this._buildAxisLine(),this.option.axisTick.show&&this._buildAxisTick(),this.option.axisLabel.show&&this._buildAxisLabel();for(var e=0,t=this.shapeList.length;t>e;e++)this.zr.addShape(this.shapeList[e])}},_buildAxisTick:function(){var e,t=this._valueList,i=this._valueList.length,n=this.option.axisTick,o=n.length,r=n.lineStyle.color,s=n.lineStyle.width;if(this.isHorizontal())for(var l,h="bottom"===this.option.position?n.inside?this.grid.getYend()-o-1:this.grid.getYend()+1:n.inside?this.grid.getY()+1:this.grid.getY()-o-1,d=0;i>d;d++)l=this.subPixelOptimize(this.getCoord(t[d]),s),e={_axisShape:"axisTick",zlevel:this.getZlevelBase(),z:this.getZBase(),hoverable:!1,style:{xStart:l,yStart:h,xEnd:l,yEnd:h+o,strokeColor:r,lineWidth:s}},this.shapeList.push(new a(e));else for(var c,m="left"===this.option.position?n.inside?this.grid.getX()+1:this.grid.getX()-o-1:n.inside?this.grid.getXend()-o-1:this.grid.getXend()+1,d=0;i>d;d++)c=this.subPixelOptimize(this.getCoord(t[d]),s),e={_axisShape:"axisTick",zlevel:this.getZlevelBase(),z:this.getZBase(),hoverable:!1,style:{xStart:m,yStart:c,xEnd:m+o,yEnd:c,strokeColor:r,lineWidth:s}},this.shapeList.push(new a(e))},_buildAxisLabel:function(){var e,t=this._valueList,i=this._valueList.length,a=this.option.axisLabel.rotate,o=this.option.axisLabel.margin,r=this.option.axisLabel.clickable,s=this.option.axisLabel.textStyle;if(this.isHorizontal()){var l,h;"bottom"===this.option.position?(l=this.grid.getYend()+o,h="top"):(l=this.grid.getY()-o,h="bottom");for(var d=0;i>d;d++)e={zlevel:this.getZlevelBase(),z:this.getZBase()+3,hoverable:!1,style:{x:this.getCoord(t[d]),y:l,color:"function"==typeof s.color?s.color(t[d]):s.color,text:this._valueLabel[d],textFont:this.getFont(s),textAlign:s.align||"center",textBaseline:s.baseline||h}},a&&(e.style.textAlign=a>0?"bottom"===this.option.position?"right":"left":"bottom"===this.option.position?"left":"right",e.rotation=[a*Math.PI/180,e.style.x,e.style.y]),this.shapeList.push(new n(this._axisLabelClickable(r,e)))}else{var c,m;"left"===this.option.position?(c=this.grid.getX()-o,m="right"):(c=this.grid.getXend()+o,m="left");for(var d=0;i>d;d++)e={zlevel:this.getZlevelBase(),z:this.getZBase()+3,hoverable:!1,style:{x:c,y:this.getCoord(t[d]),color:"function"==typeof s.color?s.color(t[d]):s.color,text:this._valueLabel[d],textFont:this.getFont(s),textAlign:s.align||m,textBaseline:s.baseline||(0===d&&""!==this.option.name?"bottom":d===i-1&&""!==this.option.name?"top":"middle")}},a&&(e.rotation=[a*Math.PI/180,e.style.x,e.style.y]),this.shapeList.push(new n(this._axisLabelClickable(r,e)))}},_buildSplitLine:function(){var e,t=this._valueList,i=this._valueList.length,n=this.option.splitLine,o=n.lineStyle.type,r=n.lineStyle.width,s=n.lineStyle.color;s=s instanceof Array?s:[s];var l=s.length;if(this.isHorizontal())for(var h,d=this.grid.getY(),c=this.grid.getYend(),m=0;i>m;m++)h=this.subPixelOptimize(this.getCoord(t[m]),r),e={zlevel:this.getZlevelBase(),z:this.getZBase(),hoverable:!1,style:{xStart:h,yStart:d,xEnd:h,yEnd:c,strokeColor:s[m%l],lineType:o,lineWidth:r}},this.shapeList.push(new a(e));else for(var p,u=this.grid.getX(),V=this.grid.getXend(),m=0;i>m;m++)p=this.subPixelOptimize(this.getCoord(t[m]),r),e={zlevel:this.getZlevelBase(),z:this.getZBase(),hoverable:!1,style:{xStart:u,yStart:p,xEnd:V,yEnd:p,strokeColor:s[m%l],lineType:o,lineWidth:r}},this.shapeList.push(new a(e))},_buildSplitArea:function(){var e,t=this.option.splitArea.areaStyle.color;if(t instanceof Array){var i=t.length,n=this._valueList,a=this._valueList.length;if(this.isHorizontal())for(var r,s=this.grid.getY(),l=this.grid.getHeight(),h=this.grid.getX(),d=0;a>=d;d++)r=a>d?this.getCoord(n[d]):this.grid.getXend(),e={zlevel:this.getZlevelBase(),z:this.getZBase(),hoverable:!1,style:{x:h,y:s,width:r-h,height:l,color:t[d%i]}},this.shapeList.push(new o(e)),h=r;else for(var c,m=this.grid.getX(),p=this.grid.getWidth(),u=this.grid.getYend(),d=0;a>=d;d++)c=a>d?this.getCoord(n[d]):this.grid.getY(),e={zlevel:this.getZlevelBase(),z:this.getZBase(),hoverable:!1,style:{x:m,y:c,width:p,height:u-c,color:t[d%i]}},this.shapeList.push(new o(e)),u=c}else e={zlevel:this.getZlevelBase(),z:this.getZBase(),hoverable:!1,style:{x:this.grid.getX(),y:this.grid.getY(),width:this.grid.getWidth(),height:this.grid.getHeight(),color:t}},this.shapeList.push(new o(e))},_calculateValue:function(){if(isNaN(this.option.min-0)||isNaN(this.option.max-0)){for(var e,t,i={},n=this.component.legend,a=0,o=this.series.length;o>a;a++)!(this.series[a].type!=r.CHART_TYPE_LINE&&this.series[a].type!=r.CHART_TYPE_BAR&&this.series[a].type!=r.CHART_TYPE_SCATTER&&this.series[a].type!=r.CHART_TYPE_K&&this.series[a].type!=r.CHART_TYPE_EVENTRIVER||n&&!n.isSelected(this.series[a].name)||(e=this.series[a].xAxisIndex||0,t=this.series[a].yAxisIndex||0,this.option.xAxisIndex!=e&&this.option.yAxisIndex!=t||!this._calculSum(i,a)));var s;for(var a in i){s=i[a];for(var l=0,h=s.length;h>l;l++)if(!isNaN(s[l])){this._hasData=!0,this._min=s[l],this._max=s[l];break}if(this._hasData)break}for(var a in i){s=i[a];for(var l=0,h=s.length;h>l;l++)isNaN(s[l])||(this._min=Math.min(this._min,s[l]),this._max=Math.max(this._max,s[l]))}var d="log"!==this.option.type?this.option.boundaryGap:[0,0],c=Math.abs(this._max-this._min);this._min=isNaN(this.option.min-0)?this._min-Math.abs(c*d[0]):this.option.min-0,this._max=isNaN(this.option.max-0)?this._max+Math.abs(c*d[1]):this.option.max-0,this._min===this._max&&(0===this._max?this._max=1:this._max>0?this._min=this._max/this.option.splitNumber!=null?this.option.splitNumber:5:this._max=this._max/this.option.splitNumber!=null?this.option.splitNumber:5),"time"===this.option.type?this._reformTimeValue():"log"===this.option.type?this._reformLogValue():this._reformValue(this.option.scale)}else this._hasData=!0,this._min=this.option.min-0,this._max=this.option.max-0,"time"===this.option.type?this._reformTimeValue():"log"===this.option.type?this._reformLogValue():this._customerValue()},_calculSum:function(e,t){var i,n,a=this.series[t].name||"kener";if(this.series[t].stack){var o="__Magic_Key_Positive__"+this.series[t].stack,l="__Magic_Key_Negative__"+this.series[t].stack;e[o]=e[o]||[],e[l]=e[l]||[],e[a]=e[a]||[],n=this.series[t].data;for(var h=0,d=n.length;d>h;h++)i=this.getDataFromOption(n[h]),"-"!==i&&(i-=0,i>=0?null!=e[o][h]?e[o][h]+=i:e[o][h]=i:null!=e[l][h]?e[l][h]+=i:e[l][h]=i,this.option.scale&&e[a].push(i))}else if(e[a]=e[a]||[],this.series[t].type!=r.CHART_TYPE_EVENTRIVER){n=this.series[t].data;for(var h=0,d=n.length;d>h;h++)i=this.getDataFromOption(n[h]),this.series[t].type===r.CHART_TYPE_K?(e[a].push(i[0]),e[a].push(i[1]),e[a].push(i[2]),e[a].push(i[3])):i instanceof Array?(-1!=this.option.xAxisIndex&&e[a].push("time"!=this.option.type?i[0]:s.getNewDate(i[0])),-1!=this.option.yAxisIndex&&e[a].push("time"!=this.option.type?i[1]:s.getNewDate(i[1]))):e[a].push(i)}else{n=this.series[t].data;for(var h=0,d=n.length;d>h;h++)for(var c=n[h].evolution,m=0,p=c.length;p>m;m++)e[a].push(s.getNewDate(c[m].time))}},_reformValue:function(t){var i=e("../util/smartSteps"),n=this.option.splitNumber;!t&&this._min>=0&&this._max>=0&&(this._min=0),!t&&this._min<=0&&this._max<=0&&(this._max=0);var a=i(this._min,this._max,n);n=null!=n?n:a.secs,this._min=a.min,this._max=a.max,this._valueList=a.pnts,this._reformLabelData()},_reformTimeValue:function(){var e=null!=this.option.splitNumber?this.option.splitNumber:5,t=s.getAutoFormatter(this._min,this._max,e),i=t.formatter,n=t.gapValue;this._valueList=[s.getNewDate(this._min)];var a;switch(i){case"week":a=s.nextMonday(this._min);break;case"month":a=s.nextNthOnMonth(this._min,1);break;case"quarter":a=s.nextNthOnQuarterYear(this._min,1);break;case"half-year":a=s.nextNthOnHalfYear(this._min,1);break;case"year":a=s.nextNthOnYear(this._min,1);break;default:72e5>=n?a=(Math.floor(this._min/n)+1)*n:(a=s.getNewDate(this._min- -n),a.setHours(6*Math.round(a.getHours()/6)),a.setMinutes(0),a.setSeconds(0))}for(a-this._min<n/2&&(a-=-n),t=s.getNewDate(a),e*=1.5;e-->=0&&(("month"==i||"quarter"==i||"half-year"==i||"year"==i)&&t.setDate(1),!(this._max-t<n/2));)this._valueList.push(t),t=s.getNewDate(t- -n);this._valueList.push(s.getNewDate(this._max)),this._reformLabelData(function(e){return function(t){return s.format(e,t)}}(i))},_customerValue:function(){var t=e("../util/accMath"),i=null!=this.option.splitNumber?this.option.splitNumber:5,n=(this._max-this._min)/i;

this._valueList=[];for(var a=0;i>=a;a++)this._valueList.push(t.accAdd(this._min,t.accMul(n,a)));this._reformLabelData()},_reformLogValue:function(){var t=this.option,i=e("../util/smartLogSteps")({dataMin:this._min,dataMax:this._max,logPositive:t.logPositive,logLabelBase:t.logLabelBase,splitNumber:t.splitNumber});this._min=i.dataMin,this._max=i.dataMax,this._valueList=i.tickList,this._dataMappingMethods=i.dataMappingMethods,this._reformLabelData(i.labelFormatter)},_reformLabelData:function(e){this._valueLabel=[];var t=this.option.axisLabel.formatter;if(t)for(var i=0,n=this._valueList.length;n>i;i++)"function"==typeof t?this._valueLabel.push(e?t.call(this.myChart,this._valueList[i],e):t.call(this.myChart,this._valueList[i])):"string"==typeof t&&this._valueLabel.push(e?s.format(t,this._valueList[i]):t.replace("{value}",this._valueList[i]));else for(var i=0,n=this._valueList.length;n>i;i++)this._valueLabel.push(e?e(this._valueList[i]):this.numAddCommas(this._valueList[i]))},getExtremum:function(){this._calculateValue();var e=this._dataMappingMethods;return{min:this._min,max:this._max,dataMappingMethods:e?l.merge({},e):null}},refresh:function(e,t){e&&(this.option=this.reformOption(e),this.option.axisLabel.textStyle=l.merge(this.option.axisLabel.textStyle||{},this.ecTheme.textStyle),this.series=t),this.zr&&(this.clear(),this._buildShape())},getCoord:function(e){this._dataMappingMethods&&(e=this._dataMappingMethods.value2Coord(e)),e=e<this._min?this._min:e,e=e>this._max?this._max:e;var t;return t=this.isHorizontal()?this.grid.getX()+(e-this._min)/(this._max-this._min)*this.grid.getWidth():this.grid.getYend()-(e-this._min)/(this._max-this._min)*this.grid.getHeight()},getCoordSize:function(e){return Math.abs(this.isHorizontal()?e/(this._max-this._min)*this.grid.getWidth():e/(this._max-this._min)*this.grid.getHeight())},getValueFromCoord:function(e){var t;return this.isHorizontal()?(e=e<this.grid.getX()?this.grid.getX():e,e=e>this.grid.getXend()?this.grid.getXend():e,t=this._min+(e-this.grid.getX())/this.grid.getWidth()*(this._max-this._min)):(e=e<this.grid.getY()?this.grid.getY():e,e=e>this.grid.getYend()?this.grid.getYend():e,t=this._max-(e-this.grid.getY())/this.grid.getHeight()*(this._max-this._min)),this._dataMappingMethods&&(t=this._dataMappingMethods.coord2Value(t)),t.toFixed(2)-0},isMaindAxis:function(e){for(var t=0,i=this._valueList.length;i>t;t++)if(this._valueList[t]===e)return!0;return!1}},l.inherits(t,i),e("../component").define("valueAxis",t),t}),define("echarts/util/date",[],function(){function e(e,t,i){i=i>1?i:2;for(var n,a,o,r,s=0,l=d.length;l>s;s++)if(n=d[s].value,a=Math.ceil(t/n)*n-Math.floor(e/n)*n,Math.round(a/n)<=1.2*i){o=d[s].formatter,r=d[s].value;break}return null==o&&(o="year",n=317088e5,a=Math.ceil(t/n)*n-Math.floor(e/n)*n,r=Math.round(a/(i-1)/n)*n),{formatter:o,gapValue:r}}function t(e){return 10>e?"0"+e:e}function i(e,i){("week"==e||"month"==e||"quarter"==e||"half-year"==e||"year"==e)&&(e="MM - dd\nyyyy");var n=h(i),a=n.getFullYear(),o=n.getMonth()+1,r=n.getDate(),s=n.getHours(),l=n.getMinutes(),d=n.getSeconds();return e=e.replace("MM",t(o)),e=e.toLowerCase(),e=e.replace("yyyy",a),e=e.replace("yy",a%100),e=e.replace("dd",t(r)),e=e.replace("d",r),e=e.replace("hh",t(s)),e=e.replace("h",s),e=e.replace("mm",t(l)),e=e.replace("m",l),e=e.replace("ss",t(d)),e=e.replace("s",d)}function n(e){return e=h(e),e.setDate(e.getDate()+8-e.getDay()),e}function a(e,t,i){return e=h(e),e.setMonth(Math.ceil((e.getMonth()+1)/i)*i),e.setDate(t),e}function o(e,t){return a(e,t,1)}function r(e,t){return a(e,t,3)}function s(e,t){return a(e,t,6)}function l(e,t){return a(e,t,12)}function h(e){return e instanceof Date?e:new Date("string"==typeof e?e.replace(/-/g,"/"):e)}var d=[{formatter:"hh : mm : ss",value:1e3},{formatter:"hh : mm : ss",value:5e3},{formatter:"hh : mm : ss",value:1e4},{formatter:"hh : mm : ss",value:15e3},{formatter:"hh : mm : ss",value:3e4},{formatter:"hh : mm\nMM - dd",value:6e4},{formatter:"hh : mm\nMM - dd",value:3e5},{formatter:"hh : mm\nMM - dd",value:6e5},{formatter:"hh : mm\nMM - dd",value:9e5},{formatter:"hh : mm\nMM - dd",value:18e5},{formatter:"hh : mm\nMM - dd",value:36e5},{formatter:"hh : mm\nMM - dd",value:72e5},{formatter:"hh : mm\nMM - dd",value:216e5},{formatter:"hh : mm\nMM - dd",value:432e5},{formatter:"MM - dd\nyyyy",value:864e5},{formatter:"week",value:6048e5},{formatter:"month",value:26784e5},{formatter:"quarter",value:8208e6},{formatter:"half-year",value:16416e6},{formatter:"year",value:32832e6}];return{getAutoFormatter:e,getNewDate:h,format:i,nextMonday:n,nextNthPerNmonth:a,nextNthOnMonth:o,nextNthOnQuarterYear:r,nextNthOnHalfYear:s,nextNthOnYear:l}}),define("echarts/util/smartSteps",[],function(){function e(e){return w.log(S(e))/w.LN10}function t(e){return w.pow(10,e)}function i(e){return e===X(e)}function n(e,t,n,a){y=a||{},b=y.steps||v,_=y.secs||L,n=W(+n||0)%99,e=+e||0,t=+t||0,x=k=0,"min"in y&&(e=+y.min||0,x=1),"max"in y&&(t=+y.max||0,k=1),e>t&&(t=[e,e=t][0]);var o=t-e;if(x&&k)return f(e,t,n);if((n||5)>o){if(i(e)&&i(t))return p(e,t,n);if(0===o)return u(e,t,n)}return h(e,t,n)}function a(e,i,n,a){a=a||0;var s=o((i-e)/n,-1),l=o(e,-1,1),h=o(i,-1),d=w.min(s.e,l.e,h.e);0===l.c?d=w.min(s.e,h.e):0===h.c&&(d=w.min(s.e,l.e)),r(s,{c:0,e:d}),r(l,s,1),r(h,s),a+=d,e=l.c,i=h.c;for(var c=(i-e)/n,m=t(a),p=0,u=[],V=n+1;V--;)u[V]=(e+c*V)*m;if(0>a){p=U(m),c=+(c*m).toFixed(p),e=+(e*m).toFixed(p),i=+(i*m).toFixed(p);for(var V=u.length;V--;)u[V]=u[V].toFixed(p),0===+u[V]&&(u[V]="0")}else e*=m,i*=m,c*=m;return _=0,b=0,y=0,{min:e,max:i,secs:n,step:c,fix:p,exp:a,pnts:u}}function o(n,a,o){a=W(a%10)||2,0>a&&(i(n)?a=(""+S(n)).replace(/0+$/,"").length||1:(n=n.toFixed(15).replace(/0+$/,""),a=n.replace(".","").replace(/^[-0]+/,"").length,n=+n));var r=X(e(n))-a+1,s=+(n*t(-r)).toFixed(15)||0;return s=o?X(s):I(s),!s&&(r=0),(""+S(s)).length>a&&(r+=1,s/=10),{c:s,e:r}}function r(e,i,n){var a=i.e-e.e;a&&(e.e+=a,e.c*=t(-a),e.c=n?X(e.c):I(e.c))}function s(e,t,i){e.e<t.e?r(t,e,i):r(e,t,i)}function l(e,t){t=t||v,e=o(e);for(var i=e.c,n=0;i>t[n];)n++;if(!t[n])for(i/=10,e.e+=1,n=0;i>t[n];)n++;return e.c=t[n],e}function h(e,t,n){var s,h=n||+_.slice(-1),u=l((t-e)/h,b),U=o(t-e),f=o(e,-1,1),y=o(t,-1);if(r(U,u),r(f,u,1),r(y,u),n?s=c(f,y,h):h=d(f,y),i(e)&&i(t)&&e*t>=0){if(h>t-e)return p(e,t,h);h=m(e,t,n,f,y,h)}var v=V(e,t,f.c,y.c);return f.c=v[0],y.c=v[1],(x||k)&&g(e,t,f,y),a(f.c,y.c,h,y.e)}function d(e,i){for(var n,a,o,r,s=[],h=_.length;h--;)n=_[h],a=l((i.c-e.c)/n,b),a=a.c*t(a.e),o=X(e.c/a)*a,r=I(i.c/a)*a,s[h]={min:o,max:r,step:a,span:r-o};return s.sort(function(e,t){var i=e.span-t.span;return 0===i&&(i=e.step-t.step),i}),s=s[0],n=s.span/s.step,e.c=s.min,i.c=s.max,3>n?2*n:n}function c(e,i,n){for(var a,o,r=i.c,s=(i.c-e.c)/n-1;r>e.c;)s=l(s+1,b),s=s.c*t(s.e),a=s*n,o=I(i.c/s)*s,r=o-a;var h=e.c-r,d=o-i.c,c=h-d;return c>1.1*s&&(c=W(c/s/2)*s,r+=c,o+=c),e.c=r,i.c=o,s}function m(e,n,a,o,r,s){var l=r.c-o.c,h=l/s*t(r.e);if(!i(h)&&(h=X(h),l=h*s,n-e>l&&(h+=1,l=h*s,!a&&h*(s-1)>=n-e&&(s-=1,l=h*s)),l>=n-e)){var d=l-(n-e);o.c=W(e-d/2),r.c=W(n+d/2),o.e=0,r.e=0}return s}function p(e,t,i){if(i=i||5,x)t=e+i;else if(k)e=t-i;else{var n=i-(t-e),o=W(e-n/2),r=W(t+n/2),s=V(e,t,o,r);e=s[0],t=s[1]}return a(e,t,i)}function u(e,t,i){i=i||5;var n=w.min(S(t/i),i)/2.1;return x?t=e+n:k?e=t-n:(e-=n,t+=n),h(e,t,i)}function V(e,t,i,n){return e>=0&&0>i?(n-=i,i=0):0>=t&&n>0&&(i-=n,n=0),[i,n]}function U(e){return e=(+e).toFixed(15).split("."),e.pop().replace(/0+$/,"").length}function g(e,t,i,n){if(x){var a=o(e,4,1);i.e-a.e>6&&(a={c:0,e:i.e}),s(i,a),s(n,a),n.c+=a.c-i.c,i.c=a.c}else if(k){var r=o(t,4);n.e-r.e>6&&(r={c:0,e:n.e}),s(i,r),s(n,r),i.c+=r.c-n.c,n.c=r.c}}function f(e,t,i){var n=i?[i]:_,s=t-e;if(0===s)return t=o(t,3),i=n[0],t.c=W(t.c+i/2),a(t.c-i,t.c,i,t.e);S(t/s)<1e-6&&(t=0),S(e/s)<1e-6&&(e=0);var l,h,d,c=[[5,10],[10,2],[50,10],[100,2]],m=[],p=[],u=o(t-e,3),V=o(e,-1,1),U=o(t,-1);r(V,u,1),r(U,u),s=U.c-V.c,u.c=s;for(var g=n.length;g--;){i=n[g],l=I(s/i),h=l*i-s,d=3*(h+3),d+=2*(i-n[0]+2),i%5===0&&(d-=10);for(var f=c.length;f--;)l%c[f][0]===0&&(d/=c[f][1]);p[g]=[i,l,h,d].join(),m[g]={secs:i,step:l,delta:h,score:d}}return m.sort(function(e,t){return e.score-t.score}),m=m[0],V.c=W(V.c-m.delta/2),U.c=W(U.c+m.delta/2),a(V.c,U.c,m.secs,u.e)}var y,b,_,x,k,v=[10,20,25,50],L=[4,5,6],w=Math,W=w.round,X=w.floor,I=w.ceil,S=w.abs;return n}),define("echarts/util/smartLogSteps",["require","./number"],function(e){function t(e){return i(),U=e||{},n(),a(),[o(),i()][0]}function i(){m=U=f=V=y=b=g=_=p=u=null}function n(){p=U.logLabelBase,null==p?(u="plain",p=10,V=S):(p=+p,1>p&&(p=10),u="exponent",V=v(p)),g=U.splitNumber,null==g&&(g=E);var e=parseFloat(U.dataMin),t=parseFloat(U.dataMax);isFinite(e)||isFinite(t)?isFinite(e)?isFinite(t)?e>t&&(t=[e,e=t][0]):t=e:e=t:e=t=1,m=U.logPositive,null==m&&(m=t>0||0===e),y=m?e:-t,b=m?t:-e,T>y&&(y=T),T>b&&(b=T)}function a(){function e(){g>d&&(g=d);var e=X(l(d/g)),t=W(l(d/e)),i=e*t,n=(i-m)/2,a=X(l(r-n));c(a-r)&&(a-=1),f=-a*V;for(var s=a;o>=s-e;s+=e)_.push(L(p,s))}function t(){for(var e=i(h,0),t=e+2;t>e&&a(e+1)+n(e+1)*C<r;)e++;for(var l=i(s,0),t=l-2;l>t&&a(l-1)+n(l-1)*C>o;)l--;f=-(a(e)*S+n(e)*K);for(var d=e;l>=d;d++){var c=a(d),m=n(d);_.push(L(10,c)*L(2,m))}}function i(e,t){return 3*e+t}function n(e){return e-3*a(e)}function a(e){return X(l(e/3))}_=[];var o=l(v(b)/V),r=l(v(y)/V),s=W(o),h=X(r),d=s-h,m=o-r;"exponent"===u?e():z>=d&&g>z?t():e()}function o(){for(var e=[],t=0,i=_.length;i>t;t++)e[t]=(m?1:-1)*_[t];!m&&e.reverse();var n=s(),a=n.value2Coord,o=a(e[0]),l=a(e[e.length-1]);return o===l&&(o-=1,l+=1),{dataMin:o,dataMax:l,tickList:e,logPositive:m,labelFormatter:r(),dataMappingMethods:n}}function r(){if("exponent"===u){var e=p,t=V;return function(i){if(!isFinite(parseFloat(i)))return"";var n="";return 0>i&&(i=-i,n="-"),n+e+d(v(i)/t)}}return function(e){return isFinite(parseFloat(e))?x.addCommas(h(e)):""}}function s(){var e=m,t=f;return{value2Coord:function(i){return null==i||isNaN(i)||!isFinite(i)?i:(i=parseFloat(i),isFinite(i)?e&&T>i?i=T:!e&&i>-T&&(i=-T):i=T,i=w(i),(e?1:-1)*(v(i)+t))},coord2Value:function(i){return null==i||isNaN(i)||!isFinite(i)?i:(i=parseFloat(i),isFinite(i)||(i=T),e?L(I,i-t):-L(I,-i+t))}}}function l(e){return+Number(+e).toFixed(14)}function h(e){return Number(e).toFixed(15).replace(/\.?0*$/,"")}function d(e){e=h(Math.round(e));for(var t=[],i=0,n=e.length;n>i;i++){var a=e.charAt(i);t.push(A[a]||"")}return t.join("")}function c(e){return e>-T&&T>e}var m,p,u,V,U,g,f,y,b,_,x=e("./number"),k=Math,v=k.log,L=k.pow,w=k.abs,W=k.ceil,X=k.floor,I=k.E,S=k.LN10,K=k.LN2,C=K/S,T=1e-9,E=5,z=2,A={0:"â°",1:"Â¹",2:"Â²",3:"Â³",4:"â´",5:"âµ",6:"â¶",7:"â·",8:"â¸",9:"â¹","-":"â»"};return t});
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//









