import {endOfDay, endOfWeek, format, formatDistanceToNow, getYear, isBefore} from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import {computed} from 'vue';

export function useTime() {
    const getDistanceTime = computed(() => (time: string) => {
        return formatDistanceToNow(new Date(time), {addSuffix: true, locale: ruLocale})
    });

    const getDialogTime = computed(() => (time: string) => {
        const date = new Date(time);
        const isToday = isBefore(date, endOfDay(new Date()));

        if(isToday) return format(date, 'kk:mm')

        const isThisWeek = isBefore(new Date(), endOfWeek(date));

        if(isThisWeek) return format(date, 'ccc', {locale: ruLocale})

        const isThisYear = getYear(date) === getYear(new Date());

        if(isThisYear) return format(date, 'dd LLL', {locale: ruLocale})

        return format(date, 'dd.MM.yy', {locale: ruLocale})
    })

    return {
        getDialogTime,
        getDistanceTime
    }
}