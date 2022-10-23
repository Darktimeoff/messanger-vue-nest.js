export * from './validations.helper';
export * as Storage from './storage';
export * from './dom.helper';

import tinycolor from 'tinycolor2';

export async function sleep(time: number) {
    return new Promise((res) => {
        setTimeout(res, time);
    })
}

export function generateGradientFromStr(str: string) {
    if(str.length < 3) return {};

    const color = tinycolor({r: getCode(0),g: getCode(1), b: getCode(2)}).lighten(10).saturate(10);
    const lightenColor = color.clone().lighten(30).saturate(30);

    function getCode(index: number) {
        const code = str.charCodeAt(index);
        return code < 0 ? 0 : code > 255 ? 255 : code; 
    }

    return {
        color: color.toHex(),
        lightenColor: lightenColor.toHex()
    }
}