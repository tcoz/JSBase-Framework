/* LOGIN VIEW */

var loginNewsView = ( vmturbo.loginAndNewsView = baseView ( ) ),
    tabsView = ( vmturbo.mainTabsBarView = baseView ( ) ),
    groupsDataGridView = ( vmturbo.groupsView = baseView ( ) ),
    healthPieChartView = ( vmturbo.summaryHealthPieChartView = baseView ( ) );

loginNewsView.LOGIN_SUBMITTED = 'login_submitted';
loginNewsView.init = function ( ) {

    this.setScreenElement ( function ( ) {

        var element = '';

        jQuery.get ( 'com/renderers/loginAndNews.html',
            function ( data ) {
                element = jQuery ( data ).appendTo ( '#maincontentcontainer' );
            }
        );
        return element;

    } ( ) );
};

tabsView.init = function ( ) {

    this.setScreenElement ( function ( ) {

        var element = '';

        jQuery.get ( 'com/renderers/toptabs.html',
            function ( data ) {
                element = jQuery ( data ).appendTo ( '#maincontentcontainer' );
            }
        );
        return element;

    } ( ) );
};

/* DISPLAYS NAMED GROUP ENTITY DATA IN DATAGRID */

groupsDataGridView.GROUPS_DATAGRID_ROW_CLICKED = 'groups_datagrid_row_clicked';
groupsDataGridView.init = function ( ) {

    this.setScreenElement ( function ( ) {

        var element = '';

        jQuery.get ( 'com/renderers/datagrid.html',
            function ( data ) {
                element = jQuery ( data ).appendTo ( '#hometab_top' );
            }
        );
        return element;

    } ( ) );
};

healthPieChartView.init = function ( ) {

    this.setScreenElement ( function ( ) {

        var element = '';

        jQuery.get ( 'com/renderers/pieChart.html',
            function ( data ) {
                element = jQuery ( data ).appendTo ( '#hometab_bottom' );
            }
        );
        return element;

    } ( ) );
};