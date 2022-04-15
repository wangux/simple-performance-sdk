import { cls } from "../data/metrics";
import { IPerformanceEntry } from "../typings/types";

export const initLayoutShift = (performanceEntries: IPerformanceEntry[]) => {
    const lastEntry = performanceEntries.pop();
    //只计算没有用户输入之前的偏移
    if (lastEntry && !lastEntry.hadRecentInput && lastEntry.value) {
        cls.value += lastEntry.value;
    }
}