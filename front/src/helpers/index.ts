export * from './validations.helper';
import tinycolor from 'tinycolor2';

export async function sleep(time: number) {
    return new Promise((res) => {
        setTimeout(res, time);
    })
}

export function generateGradientFromStr(str: string) {
    if(str.length < 3) return {};

    const color = tinycolor({r: getCode(0),g: getCode(1), b: getCode(2)});
    const lightenColor = color.clone().lighten(40);

    function getCode(index: number) {
        const code = str.charCodeAt(index);
        return code < 0 ? 0 : code > 255 ? 255 : code; 
    }

    return {
        color: color.toHex(),
        lightenColor: lightenColor.toHex()
    }
}