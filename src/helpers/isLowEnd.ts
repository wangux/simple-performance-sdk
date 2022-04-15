import { getDM, getHC } from "../data/constants";
import { EffectiveConnectionType } from "../typings/types";

//是否是低端设备
export const getIsLowEndDevice = (): boolean => {
    if (getHC() && getHC() <= 4) {// cpu核数低于4
        return true;
    }
    if (getDM() && getDM() <= 4) {//内存小于4
        return true
    }
    return false;
}

//是否是低端体验
export const getIsLowEndExperience = (
    et: EffectiveConnectionType,
    sd: boolean
): boolean => {
    switch (et) {
        case 'slow-2g':
            return true;
            break;
        case '2g':
            return true;
            break;
        case '3g':
            return true;
            break;
        default:
            return getIsLowEndDevice() || sd;
    }
}