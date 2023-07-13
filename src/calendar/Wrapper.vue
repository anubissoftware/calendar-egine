<template>
    <div class="w-full flex flex-wrap h-auto">
        <div class="w-full h-16 flex justify-center items-center relative">
            <span class="text-3xl font-semibold text-third duration-200"
                :class="[useCurrentCalendar.calendarMode.value.mode != CalendarMode.month ? 'hover:text-4xl cursor-pointer' : 'cursor-not-allowed']"
                @click="setMonthMode">
                {{ marker.currentDate.format('MMMM') }}
            </span>
            <span v-if="!marker.todayVisible" @click="useCurrentCalendar.goToday()"
                class="rounded-lg ml-5 text-sm bg-secondary px-2 py-0.5 cursor-pointer hover:scale-110 duration-200 text-white">
                hoy
            </span>
            <div class="absolute top-0 right-2 h-full flex items-center select-none">
                <img class="w-5 h-5 cursor-pointer hover:scale-125 duration-200" :src="Options" />
            </div>
        </div>
        <div class="w-1/12"
            v-if="schemaMode.visualization == 'people' && useCurrentCalendar.calendarMode.value.mode != CalendarMode.month">
        </div>
        <div class="flex cursor-pointer justify-center items-center select-none w-1/12"
            @click="useCurrentCalendar.previousView()">
            <img class="w-5 h-5 hover:scale-125 duration-200" :src="Back" />
        </div>
        <div class="flex flex-wrap select-none" :class="[schemaMode.visualization == 'people' ? 'w-9/12' :
            schemaMode.visualization == 'person' ? 'w-10/12' : '']"
            v-if="useCurrentCalendar.calendarMode.value.mode == CalendarMode.week">
            <div class="w-1/7 px-0.5 pb-2" v-for="(day, index) in marker.days" :key="index">
                <DayContainer @click="useCurrentCalendar.setCurrentDay(day); setDayMode()" :day="day" />
            </div>
            <div class="w-1/7 px-0.5" v-for="(day, index) in marker.days" :key="index">
                <div :day="day">
                    {{ anonymousEvents ? anonymousEvents[day.obj.format('YYYY-MM-DD')] : ''  }}
                </div>
            </div>
        </div>
        <div class="flex select-none" :class="[schemaMode.visualization == 'people' ? 'w-9/12' :
            schemaMode.visualization == 'person' ? 'w-10/12' : '']"
            v-if="useCurrentCalendar.calendarMode.value.mode == CalendarMode.day">
            <div class="w-full flex px-2">
                <DayContainer @click="setWeekMode()" :day="useCurrentCalendar.currentDay.value!" />
            </div>
        </div>
        <div class="flex flex-col select-none w-10/12"
            v-if="useCurrentCalendar.calendarMode.value.mode == CalendarMode.month">
            <div class="w-full flex" v-for="(week, index) in marker.month" :key="index">
                <div class="w-1/7 px-0.5 py-0.5" v-for="(day, index) in week" :key="index">
                    <DayContainer @on-click="marker.currentDate = day.obj; setWeekMode()"
                        :disabled="marker.currentDate.format('MM') != day.obj.format('MM')" :day="day" />
                </div>
            </div>
        </div>
        <div class="flex cursor-pointer justify-center items-center select-none w-1/12"
            @click="useCurrentCalendar.nextView()">
            <img class="w-5 h-5 hover:scale-125 duration-200" :src="Forward" />
        </div>
        <div class="w-full">
            a
        </div>
    </div>
</template>

<script setup lang="ts">
import type { WrapperProps } from '@/types/WrapperInterface'
import { onMounted } from 'vue';
import moment, { Moment } from 'moment';
import { useDayManipulation } from '@/utils/daysManipulations'
import Back from '@/icons/arrow_back.svg'
import Forward from '@/icons/arrow_forward.svg'
import Options from '@/icons/options.svg'
import { CalendarMode } from '@/types/WrapperInterface';
import { useCurrentCalendar, CalendarDayMode, CalendarWeekMode, CalendarMonthMode } from '@/utils/calendarStatus'
import DayContainer from './DayContainer.vue';
import { marker } from '@/utils/daysManipulations';
import { schemaMode } from '@/composable/EventsDriver'
import { anonymousEvents } from '@/composable/EventStorage'


defineEmits(['setMonth', 'setWeek', 'setDay'])


const props: WrapperProps = defineProps<WrapperProps>()
const { composeWeek } = useDayManipulation()


const setDayMode = () => useCurrentCalendar.setCurrentMode(new CalendarDayMode())
const setWeekMode = () => useCurrentCalendar.setCurrentMode(new CalendarWeekMode())
const setMonthMode = () => {
    if (useCurrentCalendar.calendarMode.value.mode == CalendarMode.month) return
    useCurrentCalendar.setCurrentMode(new CalendarMonthMode())
}

onMounted(async () => {
    if (!props.currentDate.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)) return
    const date: Moment = moment(props.currentDate, 'YYYY-MM-DD');
    if (!date.isValid()) return

    composeWeek()

})

</script>

<style></style>