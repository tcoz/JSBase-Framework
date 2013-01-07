var vmtEntityGraphView = ( tcoz.vmtEntityGraphView = baseView ( ) );

vmtEntityGraphView.init = function ( ) {

    this.setInitialized ( true );
    this.setScreenElement ( function ( ) {

        var element = '';

        jQuery.get ( 'js/com/vmtentitygraph/renderers/vmtEntityGraphRenderer.html',
            function ( data ) {

                element = jQuery ( data ).appendTo ( '#maincontentcontainer' );

                vmtEntityGraphView.drawBackground ( );
                vmtEntityGraphView.drawAllGraphs ( );

                jQuery ( '#vmname').text ( StartupSingleton ( ).vmname );
                // jQuery ( '#rawdata').text ( vmtEntityGraphView.getData ( ) );
            }
        );

        return element;

    } ( ) );
};

vmtEntityGraphView.originPoint = { };
vmtEntityGraphView.graphYMax = 100;
vmtEntityGraphView.yAxisLength = -1;
vmtEntityGraphView.drawBackground = function ( ) {

    var layer_background = jQuery ( '#layer_background').get ( 0 ),
        layer_background_context = layer_background.getContext ( '2d' ),
        timeArray = tcoz.parseXMLAttribute ( 'ServiceEntityHistory', 'time', vmtEntityGraphView.getData ( ) ),
        originPoint = vmtEntityGraphView.originPoint = { 'x' : 50, 'y' : layer_background.height - 10 },
        max = vmtEntityGraphView.graphYMax,
        yAxisLength = vmtEntityGraphView.yAxisLength = originPoint.y - 70,
        i = 0;

    layer_background_context.strokeStyle = '#000000';
    layer_background_context.strokeRect ( 0, 0, layer_background.width, layer_background.height );
    layer_background_context.stroke ( );

    // draw the axis lines
    layer_background_context.beginPath ( );
    layer_background_context.moveTo ( originPoint.x - 10, originPoint.y - 20 );
    layer_background_context.lineTo ( layer_background.width - 30, originPoint.y - 20 );
    layer_background_context.stroke ( );

    layer_background_context.beginPath ( );
    layer_background_context.moveTo ( originPoint.x - 10, originPoint.y - 20 );
    layer_background_context.lineTo ( originPoint.x - 10, 40 );
    layer_background_context.stroke ( );

    // draw X label times
    var date = new Date ( );
    for ( i = 0; i < timeArray.length; i += 1 )
    {
        date.setTime ( timeArray [ i ] );

        var xCoord = originPoint.x + ( i * 40 );
        var timeLabelVal = date.getHours ().toString ( ) + ":" + date.getMinutes ().toString ( );

        layer_background_context.fillStyle = "#000000";
        layer_background_context.fillText ( timeLabelVal, xCoord, originPoint.y );
    }

    // draw the Y labels from 0 to graphYMax, and the grid lines across the graph
    for ( i = 0; i <= 10; i += 1 ) {
        var yTarget = ( originPoint.y - 20 ) - ( ( yAxisLength * .1 ) * i );

        layer_background_context.font = 'bold 10px sans-serif';
        layer_background_context.fillStyle = "#000000";
        layer_background_context.fillText ( ( i * 10 ).toString ( ), originPoint.x - 35, yTarget );

        layer_background_context.strokeStyle = "#CCCCCC";
        layer_background_context.lineWidth = 1;
        layer_background_context.beginPath ( );
        layer_background_context.moveTo ( originPoint.x, yTarget );
        layer_background_context.lineTo ( 515, yTarget );
        layer_background_context.stroke ( );
    }
};

vmtEntityGraphView.drawAllGraphs = function ( ) {

    var layer_background = jQuery ( '#layer_background').get ( 0 );

    // Set up and draw VCPU
    var valsArray = tcoz.parseXMLAttribute ( 'ServiceEntityHistory', 'VCPU_utilization', vmtEntityGraphView.getData ( ) ),
        bottom_context = jQuery ( '#layer0_vcpu').get ( 0 ).getContext ( '2d'),
        top_context = jQuery ( '#layer1_vcpu').get ( 0 ).getContext ( '2d');

    bottom_context.clearRect ( 0, 0, layer_background.width, layer_background.height );
    top_context.clearRect ( 0, 0, layer_background.width, layer_background.height );
    vmtEntityGraphView.drawGraph ( valsArray, bottom_context, top_context, '#FF0000', 6 );

    // Set up and draw VMEM
    valsArray = tcoz.parseXMLAttribute ( 'ServiceEntityHistory', 'VMEM_utilization', vmtEntityGraphView.getData ( ) );
    bottom_context = jQuery ( '#layer0_vmem').get ( 0 ).getContext ( '2d');
    top_context = jQuery ( '#layer1_vmem').get ( 0 ).getContext ( '2d');

    bottom_context.clearRect ( 0, 0, layer_background.width, layer_background.height );
    top_context.clearRect ( 0, 0, layer_background.width, layer_background.height );
    vmtEntityGraphView.drawGraph ( valsArray, bottom_context, top_context, '#0000FF', 4 );

    // Set up and draw Storage
    valsArray = tcoz.parseXMLAttribute ( 'ServiceEntityHistory', 'Storage_utilization', vmtEntityGraphView.getData ( ) );
    bottom_context = jQuery ( '#layer0_storage').get ( 0 ).getContext ( '2d');
    top_context = jQuery ( '#layer1_storage').get ( 0 ).getContext ( '2d');

    bottom_context.clearRect ( 0, 0, layer_background.width, layer_background.height );
    top_context.clearRect ( 0, 0, layer_background.width, layer_background.height );
    vmtEntityGraphView.drawGraph ( valsArray, bottom_context, top_context, '#00FF00', 2 );
}

vmtEntityGraphView.drawGraph = function ( valsArray, bottomLayer, topLayer, lineColor, lineWeight ) {

    var layer_background = jQuery ( '#layer_background' ).get ( 0 ),
        originPoint = vmtEntityGraphView.originPoint,
        max = vmtEntityGraphView.graphYMax,
        yAxisLength = vmtEntityGraphView.yAxisLength,
        nudge = 10,
        i = 0;

    // Get times, draw Y axis labels, get values, draw indicators
    var lastXCoord = -1;
    var lastYCoord = -1;
    for ( i = 0; i < valsArray.length; i += 1 ) {

        var pctOfMax = valsArray [ i ] / max;
        var xCoord = originPoint.x + ( i * 40 );
        var yCoord = ( originPoint.y - 20 ) - ( yAxisLength * pctOfMax );

        // draw the graph lines
        bottomLayer.strokeStyle = lineColor;
        bottomLayer.lineWidth = lineWeight;
        if ( lastXCoord !== -1 ) {
            bottomLayer.beginPath ( );
            bottomLayer.moveTo ( lastXCoord + nudge, lastYCoord );
            bottomLayer.lineTo ( xCoord + nudge, yCoord );
            bottomLayer.stroke ( );
        }

        // draw circle indicators
        topLayer.fillStyle = "#00FF00";
        topLayer.beginPath ( );
        topLayer.arc ( xCoord + 10, yCoord, 5, 0, 2 * Math.PI, false );
        topLayer.fill ( );
        topLayer.lineWidth = 1;
        topLayer.strokeStyle = '#000000';
        topLayer.stroke ( );

        // preserve the last coords so we know the last location to a draw a line from (to this location).
        lastXCoord = xCoord;
        lastYCoord = yCoord;
    }
};