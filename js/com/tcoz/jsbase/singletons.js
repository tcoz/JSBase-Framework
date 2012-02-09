function CommandSingleton ( )
{
    if ( arguments.callee.instance )
        return arguments.callee.instance;

    arguments.callee.instance = this;
    this.commands = [ ];
}

CommandSingleton.getInstance = function ( )
{
    return new CommandSingleton ( );
};

CommandSingleton.prototype = { constructor : CommandSingleton,
    setCommand : function ( command ) {
        this.commands.push ( command );
    },

    runCommand : function ( type, spec ) {
        for ( var i = 0; i < this.commands.length; i++ ) {
            if ( this.commands [ i ].hasOwnProperty ( type ) ) {
                var command = this.commands [ i ] [ type ];
                command ( ).execute ( spec );
                break;
            }
        };
    }
};