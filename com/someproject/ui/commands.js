/* RETURN ALL ENTITIES FROM A GIVEN GROUP */

var sampleCommand = ( tcoz.sampleCommand = baseCommand ( ) );

sampleCommand.DATA_AVAILABLE = "samplecommand_data_available";
sampleCommand.execute = function ( dataObj ) {

    SampleSingleton.xmlFilePath = dataObj;

    // AJAX_CALL is already registered by the framework.
    // It's triggered with a notification, but responds directly to a handler.
    // You could add a notification, but using a direct handler for this particular case makes sense to me.
    sampleCommand.dispatchCommandNotification ( 'AJAX_CALL',
        { 'destination' : SampleSingleton.xmlFilePath, 'callback' : sampleCommand.onAjaxReturn }
    );
};

sampleCommand.onAjaxReturn = function ( dataObj ) {
    sampleCommand.dispatchControllerNotification ( sampleCommand.DATA_AVAILABLE, dataObj.ajaxReturn );
};