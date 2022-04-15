import { getDM, getHC, WN } from "../data/constants";
import { INavigatorInfo } from "../typings/types";
import { et, sd } from "./getNetworkInfomation";
import { getIsLowEndDevice, getIsLowEndExperience } from "./isLowEnd";

export const getNavigatorInfo = function (): INavigatorInfo {
    if (WN) {
        return {
            deviceMemory: getDM() || 0,
            hardwareConcurrency: getHC() || 0,
            serviceWorkerStatus: 'serviceWorker' in WN ? WN.serviceWorker!.controller ? 'controlled' : 'supported' : 'unsupported',
            isLowEndDevice: getIsLowEndDevice(),
            isLowEndExperience: getIsLowEndExperience(et, sd),
        }
    }
    return {};
}