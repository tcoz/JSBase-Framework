var tcoz = { };

function startApp ( ) {

   // register commands
    CommandSingleton.getInstance ( ).setCommand ( { 'SAMPLE_COMMAND' : sampleCommand } );

    // init whatever controllers and views you need at the outset
    sampleController.init ( sampleView );
}