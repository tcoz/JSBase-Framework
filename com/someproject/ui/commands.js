/* RETURN ALL ENTITIES FROM A GIVEN GROUP */

var getEntityDataCommand = ( tcoz.getEntityDataCommand = baseCommand ( ) );

getEntityDataCommand.DATA_AVAILABLE = "getEntityDataCommand_data_available";
getEntityDataCommand.execute = function ( dataObj ) {

    var destinationURL = StartupSingleton ().vmEntityTwoHourSnapshots;

    getEntityDataCommand.dispatchCommandNotification ( 'AJAX_CALL',
        { 'destination' : destinationURL, 'callback' : getEntityDataCommand.onAjaxReturn }
    );
};

getEntityDataCommand.onAjaxReturn = function ( dataObj ) {
    getEntityDataCommand.dispatchControllerNotification ( getEntityDataCommand.DATA_AVAILABLE, dataObj.ajaxReturn );
};