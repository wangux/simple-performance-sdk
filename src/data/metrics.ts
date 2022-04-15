import { IDataConsumption } from "../typings/types";

export const fcp = {
    value: 0,
}

export const cls = {
    value: 0,
}

export const lcp = {
    value: 0,
}

export const fcpEntryName = 'first-contentful-paint';

export const rt: { value: IDataConsumption } = {
    value: {
        beacon: 0,
        css: 0,
        fetch: 0,
        img: 0,
        other: 0,
        script: 0,
        total: 0,
        xmlhttprequest: 0,
    }
}

//主线程总阻塞时间（fcp到tti之间的所有长任务的阻塞时间总和）
export const tbt = {
    value: 0,
}