<template>
    <div class="w-full border duration-200 rounded-lg flex-col border-primary h-20 flex text-primary"
        :class="[props.day.isToday ? 'border-secondary text-secondary border-2' : '',
        props.disabled ? 'border-gray-300 text-gray-300 border-2 cursor-not-allowed' : 'cursor-pointer hover:scale-105']"
        @click="catchClick">
        <div class="flex flex-col w-full h-full justify-center items-center" v-if="useCurrentCalendar.calendarMode.value.mode != CalendarMode.month">
            <span class="text-4xl font-semibold">
                {{ props.day.obj.format('DD') }}
            </span>
            <span class="text-xs font-semibold italic">
                {{ props.day.name.abrv() }}
            </span>
        </div>
        <div class="flex flex-wrap w-full h-full justify-center items-start" v-else>
            <div class="w-full text-xl font-semibold px-2">
                {{ props.day.obj.format('DD') }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { CalendarMode, WeekDay } from '@/types/WrapperInterface';
import { useCurrentCalendar } from '@/utils/calendarStatus';

const props = defineProps<{
    day: WeekDay,
    disabled?: boolean
}>()

const emits = defineEmits(['onClick'])

const catchClick = () => {
    if(props.disabled) return
    emits('onClick')
}
</script>

