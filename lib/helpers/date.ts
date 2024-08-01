import {endOfMonth, endOfWeek, startOfMonth, startOfWeek} from "date-fns";

export function getCurrentWeek(): {start: Date, end: Date} {
    const today = new Date();
    return {
        start: startOfWeek(today, {weekStartsOn: 1}),
        end: endOfWeek(today),
    }
}

export function getCurrentMonth(): {start: Date, end: Date} {
    const today = new Date();
    return {
        start: startOfMonth(today),
        end: endOfMonth(today),
    }
}
