<template>
    <div class="w-full flex flex-col h-full bg-gray-500">
        <div class="w-1/7 border-4 bg-red-400 example">
            Hola asdfñlaj
        </div>
    </div>
</template>

<script setup lang="ts">
import type { WrapperProps } from '@/types/WrapperInterface'
import { onMounted } from 'vue';
import moment, {Moment} from 'moment';

defineEmits(['setMonth', 'setWeek', 'setDay'])

const props: WrapperProps = defineProps<WrapperProps>()



onMounted(() => {
    if(!props.currentDate.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)) return
    const date: Moment = moment(props.currentDate, 'YYYY-MM-DD');
    if(!date.isValid()) return
})

</script>

<style>
.example{
    padding: 50px;

}
</style>