/* CREATE THE DATAGRID XML FROM RAW GROUP XML */

vmturbo.parseGroupEntitiesForDataGrid = function ( dataToParse ) {

    var i = 0,
        j = 0,
        attributeNames = [ 'operation', 'creationClassName', 'displayName', 'name', 'uuid' ],
        xmlDoc = utils_jsbase.createXMLDocFromString ( dataToParse ),
        entities = xmlDoc.getElementsByTagName ( 'TopologyElement' ),

        schema = '<table>' +
                    '<metadata>' +
                        '<column name="freelance" label="Flag" datatype="boolean" editable="true"/>' +
                        '<column name="operation" label="Operation" datatype="string" editable="true">' +
                            '<values>' +
                            '<value value="accept">Accept</value>' +
                            '<value value="remove">Remove</value>' +
                            '<value value="flag">Pause</value>' +
                            '</values>' +
                        '</column>' +
                        '<column name="creationClassName" label="Class Name" datatype="string" editable="false"/>' +
                        '<column name="displayName" label="Display Name" datatype="string" editable="true"/>' +
                        '<column name="name" label="Name" datatype="string" editable="false"/>' +
                        '<column name="uuid" label="UUID" datatype="string" editable="false"/>' +
                    '</metadata>' +
                    '<data></data>' +
                '</table>',

        finalDoc = utils_jsbase.createXMLDocFromString ( schema ),
        dataNode = finalDoc.getElementsByTagName ( 'data' ) [ 0 ];

    for ( i = 0; i < entities.length; i += 1 )
    {
        var row = finalDoc.createElement ( 'row' );
        row.setAttribute ( 'id', ( 'R' + i ) );

        for ( j = 0; j < attributeNames.length; j += 1 )
        {
            var textNode = null;
            var column = finalDoc.createElement ( 'column' );
            column.setAttribute ( 'name', attributeNames [ j ] );

            if ( attributeNames [ j ] === 'operation' ) {
                textNode = finalDoc.createTextNode ( '[select]' );
            }
            else {
                textNode = finalDoc.createTextNode ( entities [ i ].getAttribute ( attributeNames [ j ] ) );
            }

            column.appendChild ( textNode );
            row.appendChild ( column );
        }

        dataNode.appendChild ( row );
    }

    return utils_jsbase.fromXMLToString ( finalDoc );
};

/* EXTRACT ALL UUIDS FROM GROUP XML */

vmturbo.parseEntityUUIDsFromGroupData = function ( dataToParse ) {

    var xmlDoc = utils_jsbase.createXMLDocFromString ( dataToParse ),
        entities = xmlDoc.getElementsByTagName ( 'TopologyElement' ),
        uuids = [ ],
        i = 0;

    for ( i = 0; i < entities.length; i += 1 ) {
        uuids.push ( entities [ i ].getAttribute ( 'uuid' ) );
    }

    return uuids;
};

vmturbo.parseXMLAttribute = function ( attributeName, dataToParse ) {

    var xmlDoc = utils_jsbase.createXMLDocFromString ( dataToParse ),
        entities = xmlDoc.getElementsByTagName ( 'ServiceEntity' );
    return entities [ 0 ].getAttribute ( attributeName );
};