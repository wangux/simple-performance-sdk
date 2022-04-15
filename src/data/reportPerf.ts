import { config } from "../config"
import { getNavigatorInfo } from "../helpers/getNavigatorInfo"
import { visibility } from "../helpers/onVisibilityChange"
import { pushTask } from "../helpers/utils"
import { getVitalScore } from "../helpers/vitalScore"

//发送用户时间指标去分析
export const reportPerf = function(
    measureName: string,
    data: any,
    customProperties?: object
) {
    pushTask(() => {
        //当页面被隐藏的时候不报告具体数据
        if ((visibility.isHidden && measureName.indexOf('Final') < 0) || !config.analyticsTracker) {
            return
        }
        config.analyticsTracker({
            metricName: measureName,
            data,
            eventProperties: customProperties || {},
            navigatorInformation: getNavigatorInfo(),
            vitalsScore: getVitalScore(measureName, data)
        })
    })
}