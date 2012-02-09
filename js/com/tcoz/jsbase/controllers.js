var mainViewController = baseController ( { } );
mainViewController.init = function ( view ) {
    var that = this;
    this.setView ( view );

    view.init ( );

    var mainContent = this.dispatchCommandEvent (
        'AJAX_CALL',
        { 'destination' : 'data/startupdata.xml', 'callback' : onMainContentReturn }
    );

    function onMainContentReturn ( result ) {
        var imgBanner = jQuery ( result ).find ( 'image[id="banner"]');
        var par1 = jQuery ( result ).find ( 'paragraph[position="r1c1"]' );
        var par2 = jQuery ( result ).find ( 'paragraph[position="r1c2"]' );
        var par3 = jQuery ( result ).find ( 'paragraph[position="r2c1"]' );
        var par4 = jQuery ( result ).find ( 'paragraph[position="r2c2"]' );
        var par5 = jQuery ( result ).find ( 'paragraph[position="r3c1"]' );
        var par6 = jQuery ( result ).find ( 'paragraph[position="r3c2"]' );
        view.getScreenElement ( ).append ( '<div id="banner" align="center" style="width: 100%">' + imgBanner.text ( ) + "</div>" );
        view.getScreenElement ( ).append ( '<div id="r1c1" class="paragraph" style="height: 250px">' + par1.text ( ) + '</div>' );
        view.getScreenElement ( ).append ( '<div id="r1c2" class="paragraph" style="height: 250px">' + par2.text ( ) + '</div>' );
        view.getScreenElement ( ).append ( '<div id="r2c1" class="paragraph" style="height: 250px">' + par3.text ( ) + '</div>' );
        view.getScreenElement ( ).append ( '<div id="r2c2" class="paragraph" style="height: 250px">' + par4.text ( ) + '</div>' );
        view.getScreenElement ( ).append ( '<div id="r3c1" class="paragraph" style="height: 500px">' + par5.text ( ) + '</div>' );
        view.getScreenElement ( ).append ( '<div id="r3c2" class="paragraph" style="height: 500px">' + par6.text ( ) + '</div>' );
    };
};
