<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { generateTimeSlots } from '@/utils/functions'
import { useBookingStore } from '@/stores/booking'
import TablesDataColumn from './TablesDataColumn.vue'
import { tableCellSizeStore } from '@/stores/tableCellSize'
import type { Table } from '@/types'

defineProps<{
    tables: Table[]
}>()

const booking = useBookingStore()

const timeSlots = ref<string[]>([])

watchEffect(() => {
    if (booking.data)
        timeSlots.value = generateTimeSlots(
            booking.data?.restaurant.opening_time,
            booking.data?.restaurant.closing_time
        )
})
</script>

<template>
    <div class="wrapper">
        <div class="timeslots-column">
            <div
                class="timeslots-cell"
                :style="{
                    height: `${tableCellSizeStore.height + 8}px`
                }"
            ></div>
            <div
                v-for="time in timeSlots"
                :key="time"
                class="timeslots-cell"
                :style="{
                    height: `${tableCellSizeStore.height}px`
                }"
            >
                {{ time }}
            </div>
        </div>
        <div class="tables-area">
            <TablesDataColumn
                v-for="table in tables"
                :key="table.id"
                :table
                :time-slots
            />
        </div>
    </div>
</template>

<style scoped>
.wrapper {
    overflow: auto;
    scrollbar-width: none;
    max-height: 100vh;
    display: flex;
}

.wrapper::-webkit-scrollbar {
    display: none;
}

.timeslots-column {
    position: sticky;
    left: 0;
}

.timeslots-cell {
    font-size: 11px;
    color: var(--soft-color-48);
}

.tables-area {
    display: flex;
}
</style>
