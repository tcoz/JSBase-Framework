// Some useful things for creating subclasses, getting integers,
// simplifying adding methods, and trimming strings

// Simplify creating subclasses of modules - do NOT use for initial object creation, only subclassing
if ( typeof Object.create !== 'function' ) {
    Object.create = function ( o ) {
        var F = function ( ) { };
        F.prototype = o;
        return new F ( );
    }
}

// simplify checking for array type, since typeof myArray = [object Object]
if ( typeof Array.isArray !== 'function' ) {
    Array.isArray = function ( arg ) {
        return Object.prototype.toString.call ( arg ) === "[object Array]";
    }
}

// more straightforward additions of functions
Function.prototype.method = function ( name, func ) {
    this.prototype [ name ] = func;
    return this;
};

// couple of handy methods strangely lacking in JS, one to return ints, one to trim strings
Number.method ( 'integer', function ( ) {
    return Math [ this < 0 ? 'ceil' : 'floor' ] ( this );
} );

String.method ( 'trim', function ( ) {
    return this.replace ( /^\s+|\s+$/g, '' );
} );

/* breaks jquery ajax response content type checking
 // enables a form of "super"
 Object.method ( 'superior', function ( name ) {
 var that = this, method = that [ name ];
 return function ( ) {
 return method.apply ( that, arguments );
 };
 } );
 */
