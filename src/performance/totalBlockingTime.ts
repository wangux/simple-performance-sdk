import { fcp, tbt } from "../data/metrics";
import { IPerformanceEntry } from "../typings/types"

export const initTotalBlockingTime = (
    performanceEntries: IPerformanceEntry[]
) => {
    performanceEntries.forEach(entry => {
        //从fcp =》 tti 获取长耗时任务（self表示耗时长任务来自于渲染帧）
        if (entry.name !== 'self' || entry.startTime < fcp.value) {
            return
        }
        const blockingTime = entry.duration - 50;
        //长耗时任务时间之和为tbt
        if (blockingTime > 0) {
            tbt.value += blockingTime;
        }
    });
}