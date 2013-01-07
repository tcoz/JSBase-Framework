function StartupSingleton ( )
{
    var instance = this;

    this.restrootbasic = 'http://localhost:8400/vmturbo/api/markets/Market/virtualmachines/';

    this.restrootadvanced_start = 'http://localhost:8400/vmturbo/api?inv.c&ServiceEntityHistoryService&getByNameOrUuid&';
    this.restrootadvanced_params = '&VMem/utilization|VMem/peakUtilization|VCPU/utilization|VMem/units|VCPU/units|VCPU/peakUtilization|VStorage/utilization|VStorage/peakUtilization|StorageAccess/utilization|StorageAccess/peakUtilization|StorageLatency/utilization|StorageLatency/peakUtilization|StorageAccess/used|StorageLatency/used|VMem/used|VCPU/used|VStorage/used||StorageAccess/peak|StorageLatency/peak|VMem/peak|VCPU/peak|VStorage/peak|priceIndex&';

    this.restroot_snapshots = 'http://10.10.172.50/vmturbo/api/markets/Market/virtualmachines/';
    this.vmname = 'vm-2109';

    var date = new Date ( );
    this.startTime = date.getTime ( ) - 7200000;
    this.endTime = date.getTime ( );

    this.vmEntityTwoHourSnapshots = this.restrootadvanced_start + this.vmname + this.restrootadvanced_params + this.startTime.toString ( ) + '&' + this.endTime.toString ( ) + '&Snapshots';
    // this.vmEntityTwoHourSnapshots = this.restroot_snapshots + this.vmname + '?starttime=' + this.startTime.toString ( );

    StartupSingleton = function ( ) {
        return instance;
    };

    return instance;
}









