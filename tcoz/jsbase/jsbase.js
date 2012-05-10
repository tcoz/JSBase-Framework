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

var baseView = function ( ) {

    var that = { },
    viewlisteners = [ ],
    screenElement = null,
    i = 0,
    handler = null,
    dataObj = null;

    that.getScreenElement = function ( ) {
        return screenElement;
    };

    that.setScreenElement = function ( element ) {
        screenElement = element;
    };

    that.addViewEventListener = function ( scopeobj, eventtype, eventhandler ) {
        viewlisteners.push ( { scope : scopeobj, type : eventtype, handler : eventhandler } );
    };

    that.getViewEventListeners = function ( ) {
       return viewlisteners;
    };

    that.dispatchViewEvent = function ( type, data ) {
        for ( i; i < viewlisteners.length; i += 1 ) {
            if ( viewlisteners [ i ].type === type ) {
                handler = viewlisteners [ i ].handler;
                handler ( { 'scope' : viewlisteners [ i ].scope, 'type' : type, 'data' : data } );
                break;
            }
        }
    };

    that.setData = function ( data ) {
        dataObj = data;
    };

    that.getData = function ( ) {
        return dataObj;
    };

    return that;
};

var baseController = function ( ) {

    var that = { },
    notificationListeners = [ ],
    view = null;

    that.getView = function ( ) {
        return view;
    };

    that.setView = function ( viewObj ) {
        view = viewObj;
    };

    that.dispatchControllerNotification = function ( type, data ) {
        ControllerSingleton ( ).notifyControllers ( type, data );
    };

    that.dispatchCommandNotification = function ( type, data ) {
        CommandSingleton ( ).runCommand ( type, data );
    };

    that.setNotificationListener = function ( notification ) {
        notificationListeners.push ( notification )
    };

    that.removeNotificationListener = function ( listenerToRemove ) {
        var i, notificationListener;

        for ( i = 0; i < notificationListeners.length; i += 1 ) {
            notificationListener = notificationListeners [ i ];
            if ( notificationListener === listenerToRemove ) {
                notificationListeners.slice ( i, i );
                break;
            }
        }
    };

    that.getNotificationListeners = function ( ) {
        return notificationListeners;
    };

    return that;
};

var baseCommand = function ( ) {

    var that = { };

    that.dispatchCommandNotification = function ( type, data ) {
        CommandSingleton ( ).runCommand ( type, data );
    };

    that.dispatchControllerNotification = function ( type, data ) {
        ControllerSingleton ( ).notifyControllers ( type, data );
    };

    return that;
};

