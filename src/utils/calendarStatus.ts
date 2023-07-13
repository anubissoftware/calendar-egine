import { CalendarMode, CurrentCalendarClass, WeekDay } from "@/types/WrapperInterface";
import { Ref, ref } from "vue";
import { marker, useDayManipulation } from "./daysManipulations";
import moment from "moment";

const { composeDay, composeWeek, composeToday, composeMonth} = useDayManipulation()

export class CalendarMonthMode implements CurrentCalendarClass{

    constructor(){
        composeMonth()
    }

    nextView(): void {
        marker.currentDate.add(1, 'month')
        composeMonth()
    }
    previousView(): void {
        marker.currentDate.add(-1, 'month')
        composeMonth()
    }
    goToday(): void {
        marker.currentDate = moment()
        composeMonth()
        marker.todayVisible = true
    }

    public mode: CalendarMode = CalendarMode.month;
}

export class CalendarWeekMode implements CurrentCalendarClass{
    public mode: CalendarMode = CalendarMode.week;

    constructor(){
        composeWeek()
    }
    goToday(): void {
        useCurrentCalendar.currentDay.value = composeToday()
        marker.currentDate = moment()
        composeWeek()
    }

    nextView(): void {
        marker.currentDate.add(1, 'week')
        composeWeek()
    }
    previousView(): void {
        marker.currentDate.add(-1, 'week')
        composeWeek()
    }
    
}

export class CalendarDayMode implements CurrentCalendarClass{
    public mode: CalendarMode = CalendarMode.day;

    constructor(){
        composeDay(0, useCurrentCalendar.currentDay.value!)
    }

    goToday(): void {
        useCurrentCalendar.currentDay.value = composeToday()
        marker.todayVisible = true
        marker.currentDate = useCurrentCalendar.currentDay.value.obj
    }

    nextView(): void {
        useCurrentCalendar.currentDay.value = composeDay(1, useCurrentCalendar.currentDay.value!)
        marker.currentDate = useCurrentCalendar.currentDay.value.obj
    }
    previousView(): void {
        useCurrentCalendar.currentDay.value = composeDay(-1, useCurrentCalendar.currentDay.value!)
        marker.currentDate = useCurrentCalendar.currentDay.value.obj
    }
    
}

class CurrentCalendar {
    public calendarMode: Ref<CurrentCalendarClass> = ref(new CalendarWeekMode());
    public currentDay: Ref<WeekDay | undefined> = ref();

    constructor(){
    }

    setCurrentDay(day: WeekDay){
        this.currentDay.value = day
    }

    setCurrentMode(mode: CurrentCalendarClass){
        this.calendarMode.value = mode
    }

    nextView(){
        this.calendarMode.value.nextView()
    }

    previousView(){
        this.calendarMode.value.previousView()
    }

    goToday(){
        this.calendarMode.value.goToday()
    }
}

export const useCurrentCalendar = new CurrentCalendar()