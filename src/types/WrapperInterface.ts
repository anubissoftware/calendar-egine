import { Moment } from "moment"

export interface WrapperProps{
    currentDate: string;
    visualizationMode?: 'people' | 'person'
}

export interface CurrentCalendarStatus{
    mode: CalendarMode;
    day: WeekDay | null
}

export interface WeekDay {
    name: string,
    obj: Moment,
    isToday: boolean
}

export type WeekDays = WeekDay[]


export enum CalendarMode {
    month = 'month',
    week = 'week',
    day = 'day'
}


export interface CurrentCalendarClass {
    nextView(): void
    previousView(): void
    goToday(): void

    mode: CalendarMode
}
