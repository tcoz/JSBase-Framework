/* LOGINVIEWCONTROLLER */

var loginNewsController = ( vmturbo.loginAndNewsViewController = baseController ( ) ),
    tabsController = ( vmturbo.mainTabsBarController = baseController ( ) ),
    groupsController = ( vmturbo.groupsViewController = baseController ( ) ),
    healthPieChartController = ( vmturbo.summaryHealthPieChartController = baseController ( ) );

ControllerSingleton.getInstance ( ).setController ( tabsController );
ControllerSingleton.getInstance ( ).setController ( healthPieChartController );

loginNewsController.init = function ( view ) {

    this.setView ( view );

    // renderer can dispatch this directly, no need to chain another listener from the view.
    loginNewsView.addViewEventListener ( this, loginNewsView.LOGIN_SUBMITTED,
        loginNewsController.onLoginSubmitted );

    view.init ( );

    return this;
};

loginNewsController.onLoginSubmitted = function ( event ) {

    // set data into UserDataSingleton, it's used for every ajax call (requirement of REST services for now)
    UserDataSingleton.username = event.data.username;
    UserDataSingleton.password = event.data.password;

    // scope is DOMWindow, event is incoming from renderer; "this" will not work.
    loginNewsController.dispatchCommandNotification ( 'GET_GROUP_ENTITIES_BY_GROUP_NAME',
        { 'groupname' : 'PhysicalMachine',
          'callback' : loginNewsController.onGetGroupEntitiesReturn }
    );
};

// the returned event object, is { spec : [ spec dispatched originally ], result [ result from command ] }
loginNewsController.onGetGroupEntitiesReturn = function ( event ) {

    jQuery ( '#maincontentcontainer' ).empty ( );

    tabsController.init ( vmturbo.mainTabsBarView );
    groupsController.init ( vmturbo.groupsView, event.result );
    healthPieChartController.init ( healthPieChartView,
       { 'groupname' : event.spec.groupname, 'data' : event.result } );
};

/* MAINTABSCONTROLLER */

tabsController.init = function ( view ) {

    ControllerSingleton.getInstance ( ).setController ( this );
    this.setView ( view );
    view.init ( );
};

/* GROUPSVIEWCONTROLLER */

groupsController.GROUP_ROW_CHANGED = 'group_row_changed';
groupsController.init = function ( view, spec ) {

    view.data = vmturbo.parseGroupEntitiesForDataGrid ( spec );
    this.setView ( view );

    groupsDataGridView.addViewEventListener ( this, groupsDataGridView.GROUPS_DATAGRID_ROW_CLICKED,
        groupsController.onGroupsGridRowClicked );

    view.init ( );
};

groupsController.onGroupsGridRowClicked = function ( event ) {
    log.info ( 'groupsController got this via ViewEvent, and will modify it before sending it along: ' + event.data );
    groupsController.dispatchControllerNotification ( groupsController.GROUP_ROW_CHANGED, 'HEAVILY MODIFIED >> ' + event.data )
};

/* THE PIE CHART THAT APPEARS ON THE HOME TAB PAGE */

healthPieChartController.init = function ( view, spec ) {

    var i = 0;
    this.uuids = vmturbo.parseEntityUUIDsFromGroupData ( spec.data );
    this.memutilization = [ ];

    this.setView ( view );

    // example of a quick blackbird profile check of this routine.
    log.info ( 'output entityCalls profile test' );
    log.profile ( 'generate test string' );
    for ( i; i < this.uuids.length; i += 1 ) {
        healthPieChartController.dispatchCommandNotification ( 'GET_ENTITY_DATA_BY_UUID',
            { 'uuid' : this.uuids [ i ],
              'callback' : healthPieChartController.onGetEntityDataReturn }
        );
    }
    log.profile ( 'generate test string' );

    healthPieChartController.setNotificationListener ( groupsController.GROUP_ROW_CHANGED );
};

healthPieChartController.onGetEntityDataReturn = function ( event ) {

    healthPieChartController.memutilization.push ( vmturbo.parseXMLAttribute ( 'Mem_utilization', event.result ) );

    if ( healthPieChartController.memutilization.length ===
         healthPieChartController.uuids.length ) {

        healthPieChartController.getView ( ).data = healthPieChartController.memutilization;
        healthPieChartController.getView ( ).init ( );
    }
};

healthPieChartController.notify = function ( notification ) {
  if ( notification.type === groupsController.GROUP_ROW_CHANGED ) {
      alert ( 'healthPieChartController got this via notification: ' + notification.data );
  }
};