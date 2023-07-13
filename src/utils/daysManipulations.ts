import { WeekDay } from "@/types/WrapperInterface"
import moment, { Moment } from "moment"
import { UnwrapNestedRefs, reactive} from "vue"

export const marker: UnwrapNestedRefs<{
    currentDate: Moment,
    days: WeekDay[],
    todayVisible: boolean,
    month: WeekDay[][],
}> = reactive({
    currentDate: moment(),
    days: [],
    todayVisible: false,
    month: []
})

export const useDayManipulation = () => {
    const days: string[] = moment.weekdays()
    const today: Moment = moment()

    const composeWeek = () => {
        let isTodayVisible = false

        marker.days = moment.weekdays().map((day, index) => {
            const newDate = marker.currentDate.clone().weekday(index)
            const isToday = today.format('YYYY-MM-DD') == newDate.format('YYYY-MM-DD')
            if (isToday) isTodayVisible = true
            return {
                name: day,
                obj: newDate,
                isToday
            }
        })

        marker.todayVisible = isTodayVisible
    }

    const composeDay = (dx: number, current: WeekDay): WeekDay => {
        const newObj = current.obj.clone().add(dx, 'd')
        const isToday = moment().format('YYYY-MM-DD') == newObj.format('YYYY-MM-DD')
        marker.todayVisible = isToday
        return {
            obj: newObj,
            isToday,
            name: moment.weekdays()[newObj.weekday()]
        }
    }

    const composeToday = (): WeekDay => {
        return {
            obj: moment(),
            isToday: true,
            name: moment.weekdays()[moment().weekday()]
        }
    }

    const composeMonth = () => {
        let flag = true
        let month = []
        let temporal = marker.currentDate.clone()
        const currMonth = temporal.format('MM')
        marker.currentDate = temporal.clone().startOf('month')


        while (flag) {
            composeWeek()
            if (marker.days[0].obj.format('MM') == currMonth ||
                marker.days[6].obj.format('MM') == currMonth) {
                month.push(marker.days)
            } else {
                flag = false
            }
            marker.currentDate.add(1, 'week')
        }

        

        marker.currentDate = temporal
        marker.month = month
    }


    return { days, today, composeWeek, composeDay, composeToday, composeMonth }
}