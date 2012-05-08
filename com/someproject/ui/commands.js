/* RETURN ALL ENTITIES FROM A GIVEN GROUP */

var getGroupEntitiesByGroupName = ( vmturbo.getGroupEntitiesByGroupName = baseCommand ( ) ),
    getEntityDataFromUUID = ( vmturbo.getEntityDataFromUUID = baseCommand ( ) );

/* getGroupEntitiesByGroupName spec = { groupname : [e.g. PhysicalMachine], callback : [handlerfunc] } */

getGroupEntitiesByGroupName.execute = function ( spec ) {

    this.spec = spec;

    var destination = 'http://' +
                       UserDataSingleton.username + ':' +
                       UserDataSingleton.password + '@' +
                       vmturbo.appValues.SERVICE_CALL_ROOT + 'groups/GROUP-' + spec.groupname + '/entities';

    getGroupEntitiesByGroupName.dispatchCommandNotification ( 'AJAX_CALL',
        { 'destination' : destination, 'callback' : getGroupEntitiesByGroupName.onAjaxReturn }
    );
};

getGroupEntitiesByGroupName.onAjaxReturn = function ( event ) {
    getGroupEntitiesByGroupName.spec.callback ( { 'spec' : getGroupEntitiesByGroupName.spec, 'result' : event.ajaxReturn } );
};

/* getEntityDataFromUUID spec = { uuid : [uuid], callback : [handlerfunc] }*/

getEntityDataFromUUID.execute = function ( spec ) {

    this.spec = spec;

    var destination = 'http://' +
        UserDataSingleton.username + ':' +
        UserDataSingleton.password + '@' +
        vmturbo.appValues.SERVICE_CALL_ROOT + 'markets/Market/entities/' + spec.uuid;

    getEntityDataFromUUID.dispatchCommandNotification ( 'AJAX_CALL',
        { 'destination' : destination, 'callback' : getEntityDataFromUUID.onAjaxReturn }
    );
};

getEntityDataFromUUID.onAjaxReturn = function ( event ) {
    getEntityDataFromUUID.spec.callback ( { 'spec' : getEntityDataFromUUID.spec, 'result' : event.ajaxReturn } );
};