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

var ajaxCall = baseCommand ( { } );
ajaxCall.execute = function ( spec ) {

    // spec format is { destination, callback, data }
    var calltype = ( ( spec.data === null || spec.data === undefined ) ? 'GET' : 'POST' );
    jQuery.ajax ( {
        dataType : 'text',
        data : spec.data,
        type : calltype,
        url : spec.destination,
        success : function ( ajaxReturn ) { spec.callback ( { 'status' : 'ok', 'ajaxReturn' : ajaxReturn } ); },
        error : function ( error ) { spec.callback ( error.responseText ); }
    } );
};

CommandSingleton ( ).setCommand ( { 'AJAX_CALL' : ajaxCall } );