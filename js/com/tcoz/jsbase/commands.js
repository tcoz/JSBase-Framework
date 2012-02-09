// use for making basic Ajax service call
var ajaxCall = function ( ) {

    return {
        // spec = { destination, callback, data }
        execute : function ( spec ) {
            var calltype = ( ( spec.data === null || spec.data === undefined ) ? 'GET' : 'POST' );
            jQuery.ajax ( {
                data : spec.data,
                type : calltype,
                url : spec.destination,
                success : function ( result ) { spec.callback ( result ); },
                error : function ( error ) { spec.callback ( error.responseText ); }
            } );
        }
    };
};