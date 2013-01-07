/* Sample useful parser, using the tcoz_jsbase utils */

tcoz.parseXMLAttribute = function ( elementName, attributeName, dataToParse ) {

    var xmlDoc = utils_tcoz_jsbase.createXMLDocFromString ( dataToParse ),
        entities = xmlDoc.getElementsByTagName ( elementName),
        entityVals = [ ],
        i = 0;

    for ( i = 0; i < entities.length; i += 1 ) {
       entityVals.push ( entities [ i ].getAttribute ( attributeName ) );
    }

    return entityVals;
};