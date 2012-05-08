vmturbo.appValues = function ( ) {

    this.startup_data_path = 'data/startupdata.xml';
    this.service_call_root = 'localhost:8400/vmturbo/api/';

    return {
        STARTUP_DATA_PATH : this.startup_data_path,
        SERVICE_CALL_ROOT : this.service_call_root
    };
} ( );