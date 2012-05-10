/* Declare controller aliases so you don't have to type whole namespace every time */
var sampleController = ( tcoz.sampleController = baseController ( ) );

/* Enable notifications for whatever controllers want them */
ControllerSingleton ( ).setController ( sampleController );

/* --- Add your controllers --- */

sampleController.init = function ( view ) {

    this.setView ( view );

    // Add a listener to the view so it can hear a given interaction event
    sampleView.addViewEventListener ( this, sampleView.EVENT_TRIGGERED,
        sampleController.onEventTriggered );

    // Make this controller listen a given notification
    sampleController.setNotificationListener ( sampleCommand.DATA_AVAILABLE );
    // Fire the command by the key registered in main.js, and send some data,
    // in this case, the path info of an xml file we want loaded.
    sampleController.dispatchCommandNotification ( 'SAMPLE_COMMAND', 'data/startupdata.xml' );

    // View can be initialized here, like the comment below shows.
    // But, let's wait until we have the notification.
    // view.init ( );

    return this;
};

// handle the interaction event
sampleController.onEventTriggered = function ( event ) {
    alert ( 'You triggered an event' );
};

// handle the notification
sampleController.notify = function ( notification ) {
    if ( notification.type === sampleCommand.DATA_AVAILABLE ) {
        // set the returned data onto the controller's view, and init it.
        sampleController.getView ().setData ( notification.data );
        sampleController.getView ().init ( );
    }
};