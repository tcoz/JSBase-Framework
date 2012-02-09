function startApp ( ) {

    // register commands
    CommandSingleton.getInstance ( ).setCommand ( { 'AJAX_CALL' : ajaxCall } );

    // init whatever controllers views you need at the outset
    mainViewController.init ( mainView );
};