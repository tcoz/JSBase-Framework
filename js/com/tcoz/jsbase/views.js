// inherit from base view
var mainView = baseView ( { } );
mainView.init = function ( ) {
    this.setScreenElement ( function ( ) {
        var element = $ ( '<div></div>' ).appendTo ( '#maincontainer' );
        return element;
    } ( ) );
};