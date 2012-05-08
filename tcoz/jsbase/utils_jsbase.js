/**
 * TCOZ JS-BASE JavaScript Application Framework
 *
 * Created by Tim Consolazio, tcoz@tcoz.com
 * Copyright 2011 Tim Consolazio
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * See <http://www.gnu.org/licenses/>.
 **/

// Some useful things for creating subclasses, getting integers,
// simplifying adding methods, and trimming strings

// simplify checking for array type, since typeof myArray = [object Object]
if ( typeof Array.isArray !== 'function' ) {
    Array.isArray = function ( arg ) {
        return Object.prototype.toString.call ( arg ) === "[object Array]";
    }
}

// couple of handy methods strangely lacking in JS, one to return ints, one to trim strings
Number.prototype.integer = function ( ) {
    return Math [ this < 0 ? 'ceil' : 'floor' ] ( this );
};

String.prototype.trim = function ( ) {
    return this.replace ( /^\s+|\s+$/g, '' );
};

/* namespace utils_jsbase */

var utils_tcoz_jsbase = { };

utils_tcoz_jsbase.htmlEscape = function ( str ) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
};

utils_tcoz_jsbase.createXMLDocFromString = function ( str ) {
    var xmlDoc = null;

    if ( window.DOMParser )
    {
        var parser = new DOMParser ( );
        xmlDoc = parser.parseFromString ( str, "text/xml" );
    }
    else // Internet Explorer
    {
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = "false";
        xmlDoc.loadXML ( theXMLString );
    }

    return xmlDoc;
};

utils_tcoz_jsbase.fromXMLToString = function ( xmlDOMObject ) {
    var serialized = null;

    try {
        var serializer = new XMLSerializer();
        serialized = serializer.serializeToString ( xmlDOMObject );
    }
    catch (e) {
        serialized = xmlDOMObject.xml; // IE
    }

    return serialized;
};
