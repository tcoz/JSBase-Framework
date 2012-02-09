var baseView = function ( spec ) {

    var that = { },
    listeners = [ ],
    screenElement = null;

    that.getScreenElement = function ( ) {
        return screenElement;
    };

    that.setScreenElement = function ( element ) {
        screenElement = element;
    };

    return that;
};

var CONTROLLERS = [ ];
var baseController = function ( spec ) {

    var that = { },
    listeners = [ ],
    view = null,
    i = 0,
    handler = null;

    that.get_listeners = function ( ) {
        return listeners;
    };

    that.addControllerListener = function ( scopeobj, eventtype, eventhandler ) {
        listeners.push ( { scope : scopeobj, type : eventtype,  handler : eventhandler } );
    };

    that.getView = function ( ) {
        return view;
    };

    that.setView = function ( v ) {
        view = v;
    };

    that.dispatchControllerEvent = function ( type, data ) {
        for ( i; i < listeners.length; i += 1 ) {
            if ( listeners [ i ].type === type ) {
                handler = listeners [ i ].handler;
                handler ( { 'scope' : listeners [ i ].scope, 'type' : type, 'data' : data } );
                break;
            }
        }
    };

    that.dispatchCommandEvent = function ( type, spec ) {
        CommandSingleton.getInstance ( ).runCommand ( type, spec );
    };

    return that;
};