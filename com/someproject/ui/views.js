/* SAMPLE VIEW */

var sampleView = ( tcoz.sampleView = baseView ( ) );

sampleView.EVENT_TRIGGERED = 'sampleview_event_triggered';
sampleView.init = function ( ) {

    this.setScreenElement ( function ( ) {

        var element = '';

        jQuery.get ( 'com/someproject/renderers/sampleRenderer.html',
            function ( data ) {
                element = jQuery ( data ).appendTo ( '#maincontentcontainer' );
                jQuery ( '#samplerenderer_xmldatagoeshere').text ( sampleView.getData ( ) );
            }
        );
        return element;

    } ( ) );
};