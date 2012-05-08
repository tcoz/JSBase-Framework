function SampleSingleton ( )
{
   var instance = this;

    this.destination = '';

    SampleSingleton = function ( ) {
        return instance;
    };
}