import { AskPriority, IReportData } from "../typings/types";
import { W, WN } from "./constants";

//上报工具
type TrackerOptions = {
    logUrl: string;
};
class ReportData implements IReportData {
    private logUrl: string;
    constructor (options: TrackerOptions) {
        const { logUrl } = options;
        if (logUrl) {
            this.logUrl = logUrl;
        } else {
            throw new Error('请传递要记录数据的路由')
        }
    }
    public sendToAnalytics(level: AskPriority, body: string, uri?: string) {
        let logurl = this.logUrl;
        //临时更换其他url
        if (uri) {
            logurl = uri;
        }
        if (level == AskPriority.URGENT) {
            if (!!W.fetch) {
                fetch(logurl, { body, method: 'POST', keepalive: true })
            } else {
                let xhr: XMLHttpRequest | null = new XMLHttpRequest();
                xhr.open('post', logurl, true)
                xhr.setRequestHeader('Content-Type', 'application/json')
                xhr.send(body);
                xhr.onload = function (e) {
                    //及时清理以防多次创建
                    xhr = null
                }
            }
        } else if (level === AskPriority.IDLE) {
            if (!!WN.sendBeacon) {
                navigator.sendBeacon(logurl, body)
            } else {
                let img: HTMLImageElement | null = new Image();
                img.src = `${logurl}?body={body}`;
                img.onload = function () {
                    //统计完成收回创建的元素防止内存泄漏
                    img = null;
                }
            }
        }
    }
}

export default ReportData;