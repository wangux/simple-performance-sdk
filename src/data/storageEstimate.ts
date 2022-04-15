import { convertToKB } from "../helpers/utils";
import { logData } from "./log";

export const reportStorageEstimate = (storageInfo: StorageEstimate) => {
    const estimateUsageDetails = 'usageDetails' in storageInfo ? (storageInfo as any).usageDetails : {};
    logData('storageEstimate', {
        quota: convertToKB((storageInfo as any).quota),
        usage: convertToKB((storageInfo as any).usage),
        caches: convertToKB(estimateUsageDetails.caches),
        indexedDB: convertToKB(estimateUsageDetails.indexDB),
        ServiceWorker: convertToKB(estimateUsageDetails.ServiceWorkerRegistrations),
    })
}