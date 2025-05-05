<script setup lang="ts">
import type { Order, Reservation, Table } from '@/types'
import OrderEvent from './OrderEvent.vue'
import ReservationEvent from './ReservationEvent.vue'
import { computed } from 'vue'
import { filtersStore } from '@/stores/filters'
import { tableCellSizeStore } from '@/stores/tableCellSize'
import { minutesDiff, parseISOTimeToMinutes } from '@/utils/functions'
import { MINUTES_OVERLAP } from '@/utils/constants'

type EventItem = (Order | Reservation) & {
    styles?: Record<string, string | undefined>
}

const props = defineProps<{
    table: Table
    timeSlots: string[]
}>()

const allEvents = computed(() => {
    const orders = props.table.orders.filter(
        order => order.start_time.slice(0, 10) === filtersStore.selectedDate
    )
    const reservations = props.table.reservations.filter(
        res => res.start_time.slice(0, 10) === filtersStore.selectedDate
    )
    return [...orders, ...reservations]
        .sort((a, b) => parseISOTimeToMinutes(a.start_time) - parseISOTimeToMinutes(b.start_time))
        .map((event, i) => ({
            ...event,
            styles: {
                zIndex: (i + 1).toString()
            }
        }))
})

const shiftedEvents = computed(() => {
    const positionedEventsIntermediate: (EventItem & { calculatedMarginLeft: number })[] = []

    for (let i = 0; i < allEvents.value.length; i++) {
        const currentEvent = allEvents.value[i]
        const currentStart = parseISOTimeToMinutes(currentEvent.start_time)
        let maxMarginLeftOfOverlapping = -4

        for (let j = 0; j < i; j++) {
            const prevEvent = positionedEventsIntermediate[j]
            const prevStart = parseISOTimeToMinutes(prevEvent.start_time)
            const prevEnd = parseISOTimeToMinutes(prevEvent.end_time)

            if (
                currentStart >= prevStart &&
                currentStart < prevEnd &&
                currentStart - prevStart > 30
            ) {
                maxMarginLeftOfOverlapping = Math.max(
                    maxMarginLeftOfOverlapping,
                    prevEvent.calculatedMarginLeft
                )
            }
        }

        const newMarginLeft = maxMarginLeftOfOverlapping + 4

        positionedEventsIntermediate.push({
            ...currentEvent,
            calculatedMarginLeft: newMarginLeft
        })
    }

    const positionedEventsResult: EventItem[] = positionedEventsIntermediate.map(event => {
        const { calculatedMarginLeft, ...rest } = event
        return {
            ...rest,
            styles: {
                ...rest.styles,
                marginLeft: `${calculatedMarginLeft}px`
            }
        }
    })

    return positionedEventsResult
})

const grouppedEvents = computed(() => {
    const result: EventItem[] = []
    const groups: EventItem[][] = []

    for (const event of shiftedEvents.value) {
        let addedToGroup = false
        for (const group of groups) {
            if (
                group.some(
                    e => Math.abs(minutesDiff(e.start_time, event.start_time)) <= MINUTES_OVERLAP
                )
            ) {
                group.push(event)
                addedToGroup = true
                break
            }
        }
        if (!addedToGroup) {
            groups.push([event])
        }
    }

    for (const group of groups) {
        group.forEach((event, index) => {
            const shift = parseInt(event.styles!.marginLeft!)
            const left = `${index * ((tableCellSizeStore.width - shift) / group.length)}px`
            const maxWidth = `${(tableCellSizeStore.width - shift) / group.length}px`

            result.push({
                ...event,
                styles: {
                    ...event.styles,
                    left,
                    maxWidth
                }
            })
        })
    }

    return result
})

const positionedOrders = computed(() =>
    grouppedEvents.value.filter(
        (e): e is Extract<EventItem, Order> => !('name_for_reservation' in e)
    )
)

const positionedReservations = computed(() =>
    grouppedEvents.value.filter(
        (e): e is Extract<EventItem, Reservation> => 'name_for_reservation' in e
    )
)
</script>

<template>
    <div class="table-column">
        <div
            class="table-header"
            :style="{
                width: `${tableCellSizeStore.width}px`,
                height: `${tableCellSizeStore.height + 8}px`
            }"
        >
            <p>
                #<span class="table-number">{{ table.number }}</span> {{ table.capacity }} чел
            </p>
            <p>{{ table.zone }}</p>
        </div>
        <div class="table-timeslots">
            <div
                v-for="index in timeSlots.length"
                :key="index"
                class="table-cell"
                :style="{
                    width: `${tableCellSizeStore.width}px`,
                    height: `${tableCellSizeStore.height}px`
                }"
            ></div>
            <OrderEvent
                v-for="order in positionedOrders"
                :key="order.id"
                :order="order"
                :style="order.styles"
            />
            <ReservationEvent
                v-for="reservation in positionedReservations"
                :key="reservation.id"
                :reservation="reservation"
                :style="reservation.styles"
            />
        </div>
    </div>
</template>

<style scoped>
.table-column {
    flex-shrink: 0;
}

.table-header {
    font-size: 11px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: sticky;
    top: 0;
    z-index: 101;
    background: var(--bg-color);
}

.table-number {
    font-size: 13px;
    font-weight: 600;
}

.table-timeslots {
    position: relative;
}

.table-cell {
    border-top: 1px solid var(--soft-color-16);
    border-right: 1px solid var(--soft-color-16);
    box-sizing: border-box;
}
</style>
