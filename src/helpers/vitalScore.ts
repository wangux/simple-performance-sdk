import { IData } from "../typings/types";

const fcpScore = [1000, 2500];
const lcpScore = [2500, 4000];
const fidcore = [100, 300];
const clsScore = [0.1, 0.25];
const tbtScore = [300, 600]

export const webVitalsScore: Record<string, number[]> = {
    fp: fcpScore,
    fcp: fcpScore,
    lcp: lcpScore,
    lcpFinal: lcpScore,
    fid: fidcore,
    fidVitals: fidcore,
    cls: clsScore,
    clsFinal: clsScore,
    tbt: tbtScore,
    tbt5S: tbtScore,
    tbt10S: tbtScore,
    tbtFinal: tbtScore,
}

//获取基本特征数据
export const getVitalScore = (
    measureName: string,
    value: IData
) => {
    if (!webVitalsScore[measureName]) {
        return null;
    }
    if (value <= webVitalsScore[measureName][0]) {
        return 'good';
    }
    return value <= webVitalsScore[measureName][1] ? 'needsImprovement' : 'poor';
}