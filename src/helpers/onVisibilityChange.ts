import { D } from "../data/constants"

export const visibility = {
    isHidden: false,
}

export const didVisibilityChange = function (cb: Function) {
    if (D.hidden) {
        cb();
        visibility.isHidden = D.hidden;
    }
}