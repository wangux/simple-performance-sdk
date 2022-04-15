import ReportData from "../data/ReportData";
import { IConfig } from "../typings/types";

export const config: IConfig  = {
    reportData: new ReportData({ logUrl: 'hole' }),
    isResourceTiming: false,
    isElementTiming: false,
    maxTime: 15000,
}