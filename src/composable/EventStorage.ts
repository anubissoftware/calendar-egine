import moment from "moment";
import { computed, reactive } from "vue";

export const eventSaved: { [person: string]: { [day: string]: { dscp: string, cta?: string }[] } } = reactive({
})

export const anonymousEvents = computed(() => {
    return eventSaved['anonymous']
})

export const useEventStorage = () => {

    const validateDay = (day: string) => {
        if (!day.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/) || !moment(day, 'YYYY-MM-DD').isValid()) {
            console.error('Day is not correct.')
        }

        if (!eventSaved[day].length) {
            // No exists
            return
        }
    }

    const saveEvent = (event: { day: string, dscp: string, cta?: string, person?: string }) => {
        if (!event.person) event.person = 'anonymous'
        if (!eventSaved[event.person]) eventSaved[event.person] = {}
        if (!eventSaved[event.person][event.day]) eventSaved[event.person][event.day] = []

        eventSaved[event.person][event.day].push({ dscp: event.dscp, cta: event.cta })
    }

    return {
        validateDay,
        saveEvent
    }
}