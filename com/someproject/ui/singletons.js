function UserDataSingleton ( )
{
   var instance = this;

    this.username = "";
    this.password = "";

    UserDataSingleton = function ( ) {
        return instance;
    };
}