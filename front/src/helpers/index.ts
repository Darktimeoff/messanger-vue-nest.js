export * from './validations.helper';

export async function sleep(time: number) {
    return new Promise((res) => {
        setTimeout(res, time);
    })
}