import { config } from "./config";
import analyticsTracker from "./data/analyticsTracker";
import { D, W, WN } from "./data/constants";
import { logData } from "./data/log";
import ReportData from "./data/ReportData";
import { reportStorageEstimate } from "./data/storageEstimate";
import ErrorTrace from "./error";
import { getNetworkInfomation } from "./helpers/getNetworkInfomation";
import { didVisibilityChange } from "./helpers/onVisibilityChange";
import { getNavigationTiming } from "./performance/getNavigationTiming";
import { disconnectPerfObserversHidden, initPerformanceObserver } from "./performance/observe";
import { isPerformanceSupported } from "./tools/isSupported";
import { IOptions, IReportData } from "./typings/types";

export default class Track {
    private v = '1.0.0';
    private reportData: IReportData;
    constructor(options: IOptions ={}) {
        //扩展基础配置
        const logUrl = options.logUrl;
        if (!logUrl) {
            throw new Error(`监控平台${this.v}提示未传递logUrl`);
        }
        //向后台传递数据
        const insReportData = new ReportData({
            logUrl,
        })
        config.reportData = insReportData;
        //对外暴露上传接口
        this.reportData = insReportData;
        //集合数据汇总
        const _analyticsTracker = options.analyticsTracker;
        if (_analyticsTracker) {
            config.analyticsTracker = _analyticsTracker;
        } else {
            config.analyticsTracker = analyticsTracker;
        }
        config.isResourceTiming = !!options.resourceTiming;
        config.isElementTiming = !!options.elementTiming;
        config.maxTime = options.maxMeasureTime || config.maxTime;

        if (options.captureError) {
            //开启错误跟踪
            const errorTrace = new ErrorTrace();
            errorTrace.run();
        }

        //如果浏览器不支持性能指标只能放弃
        if (!isPerformanceSupported()) {
            return;
        }
        //浏览器支持的起FRP这样的Observer统计性能
        if ('PerformanceObserver' in W) {
            initPerformanceObserver();
        }
        //初始化,监听页面visibilitychange事件，销毁性能监听观察者，避免内存泄漏
        if (typeof D.hidden !== 'undefined') {
            D.addEventListener(
                'visibilitychange',
                didVisibilityChange.bind(this, disconnectPerfObserversHidden)
            )
        }
        //记录系统DNS请求 + 白屏时间等
        logData('navigationTiming', getNavigationTiming());
        //记录用户的网速 H5+多普勒测速
        logData('networkInformation', getNetworkInfomation());

        //管理离线缓存数据
        if (WN && WN.storage && typeof WN.storage.estimate === 'function') {
            WN.storage.estimate().then(reportStorageEstimate)
        }
    }
}