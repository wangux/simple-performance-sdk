import { WN } from "../data/constants";
import { EffectiveConnectionType, INetworkInformation } from "../typings/types";

export let et: EffectiveConnectionType = '4g';
export let sd = false;

export const getNetworkInfomation = (): INetworkInformation => {
    if ('connection' in WN) {
        const dataConnection = (WN as any).connection;
        if (typeof dataConnection !== 'object') {
            return {};
        }
        et = dataConnection.effectiveType;
        sd = !!dataConnection.saveData;
        return {
            downlink: dataConnection.downlink,
            effectiveType: dataConnection.effectiveType,
            rtt: dataConnection.rtt,
            saveData: !!dataConnection.saveData,
        }
    } else {
        //todo 这里使用多普勒测试或则直接用图片探测法
    }
    return {};
}