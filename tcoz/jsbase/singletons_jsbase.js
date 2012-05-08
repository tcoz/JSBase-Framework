/**
 * TCOZ JS-BASE JavaScript Application Framework
 *
 * Created by Tim Consolazio, tcoz@tcoz.com
 * Copyright 2011 Tim Consolazio
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * See <http://www.gnu.org/licenses/>.
 **/

/* COMMANDSINGLETON handles registration of, and running of, commands */

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

CommandSingleton.prototype = {

    constructor : CommandSingleton,

    setCommand : function ( command ) {
        this.commands.push ( command );
    },

    runCommand : function ( type, spec ) {
        var i, command;

        for ( i = 0; i < this.commands.length; i++ ) {
            if ( this.commands [ i ].hasOwnProperty ( type ) ) {
                command = this.commands [ i ] [ type ];
                command.execute ( spec );
                break;
            }
        }
    }
};

/* CONTROLLERSINGLETON, handles registration of, and notificaton listeners, for controllers */

function ControllerSingleton ( )
{
    if ( arguments.callee.instance )
        return arguments.callee.instance;

    arguments.callee.instance = this;
    this.controllers = [ ];
}

ControllerSingleton.getInstance = function ( )
{
    return new ControllerSingleton ( );
};

ControllerSingleton.prototype = {

    constructor : ControllerSingleton,

    setController : function ( controller ) {
        this.controllers.push ( controller );
    },

    removeController : function ( removeController ) {
        var i, controller;

        for ( i = 0; i < this.controllers.length; i += 1 ) {
            controller = this.controllers [ i ];
            if ( removeController === controller ) {
                this.controllers.slice ( i, i );
                break;
            }
        }
    },

    notifyControllers : function ( type, data ) {
        var i, j, controller, listener;

        for ( i = 0; i < this.controllers.length; i += 1 ) {
            controller = this.controllers [ i ];
            for ( j = 0; j < controller.getNotificationListeners ( ).length; j += 1 ) {
                listener = controller.getNotificationListeners ( ) [ j ];
                if ( listener === type ) {
                    controller.notify ( { 'type' : type, 'data' : data } );
                }
            }
        }
    }
};