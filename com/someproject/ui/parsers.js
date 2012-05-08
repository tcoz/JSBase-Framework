/* Sample useful parser, using the tcoz_jsbase utils */

tcoz.parseXMLAttribute = function ( attributeName, dataToParse ) {

    var xmlDoc = utils_tcoz_jsbase.createXMLDocFromString ( dataToParse ),
        entities = xmlDoc.getElementsByTagName ( 'TheElementName' );

    return entities [ 0 ].getAttribute ( attributeName );
};