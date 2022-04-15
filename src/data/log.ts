import { config } from "../config";
import { roundByTwo } from "../helpers/utils"
import { reportPerf } from "./reportPerf";

//报告指标去分析
export const logMetric = (duration: number, measureName: string, customProperties?:object) => {
    const duration2Decimal = roundByTwo(duration);
    if (duration2Decimal <= config.maxTime && duration2Decimal >= 0) {
        //从内部
        reportPerf(measureName, duration2Decimal, customProperties)
    }
}

//报告数据去分析
export const logData = (
    measureName: string,
    metric: any,
    customProperties?: object
): void => {
    Object.keys(metric).forEach((key) => {
        if (typeof metric[key] === 'number') {
            metric[key] = roundByTwo(metric[key]);
        }
    });
    reportPerf(measureName, metric, customProperties);
}