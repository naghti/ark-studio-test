<script setup lang="ts">
import type { ReservationStatus, Reservation } from '@/types'
import { extractHoursAndMinutes } from '@/utils/functions'
import IconPhone from './icons/IconPhone.vue'
import { useBookingStore } from '@/stores/booking'
import { useEventPositionStyles } from '@/composables/useEventPositionStyles'
import { computed } from 'vue'

const props = defineProps<{
    reservation: Reservation
}>()

const labels: Record<ReservationStatus, string> = {
    'Живая очередь': 'Живая очередь',
    Новая: 'Ожидает подтверждения',
    Заявка: 'Ожидаем',
    Открыт: 'В зале',
    Отменен: 'Отменен'
}

const booking = useBookingStore()
const { top, height } = useEventPositionStyles(
    props.reservation.start_time,
    props.reservation.end_time
)

const reservationStatusStyles = computed(() => {
    switch (props.reservation.status) {
        case 'Новая':
            return {
                color: '#fff',
                backgroundColor: '#007AFF'
            }
        case 'Заявка':
            return {
                color: '#0097FD',
                backgroundColor: 'rgba(0, 151, 253, 0.1)'
            }
        case 'Открыт':
            return {
                backgroundColor: 'rgba(74, 201, 155, 0.32)'
            }
        case 'Отменен':
            return {
                backgroundColor: 'var(--soft-color-12)'
            }
        default:
            return {
                backgroundColor: 'var(--soft-color-12)'
            }
    }
})
</script>
<template>
    <div
        v-if="booking.data"
        class="reservation"
        :class="{ reservation_live: props.reservation.status === 'Живая очередь' }"
        :style="{
            top,
            height
        }"
    >
        <div class="reservation-info">
            <p class="reservation-name">{{ props.reservation.name_for_reservation }}</p>
            <p class="reservation-people">{{ props.reservation.num_people }}<span>чел</span></p>
        </div>
        <p
            class="reservation-status"
            :style="reservationStatusStyles"
        >
            {{ labels[props.reservation.status] }}
        </p>
        <a
            :href="`tel:${props.reservation.phone_number}`"
            class="reservation-phone"
        >
            <IconPhone /> {{ props.reservation.phone_number }}
        </a>
        <p>
            {{ extractHoursAndMinutes(props.reservation.start_time) }}-{{
                extractHoursAndMinutes(props.reservation.end_time)
            }}
        </p>
    </div>
</template>

<style scoped>
.reservation {
    font-size: 11px;
    position: absolute;
    border-radius: 4px;
    border-left: 2px solid;
    padding: 2px 2px 2px 4px;
    text-align: left;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border-color: #ff7043;
    background-color: rgba(255, 112, 67, 0.16);
    overflow: hidden;
    width: 100%;
}

.reservation:hover {
    width: auto;
    min-width: 100%;
    max-width: unset !important;
    z-index: 100 !important;
    backdrop-filter: blur(8px);
}

.reservation_live {
    border-color: #007aff;
    background-color: rgba(0, 151, 253, 0.16);
}

.reservation-info {
    font-weight: 600;
    display: flex;
    gap: 4px;
}

.reservation-info span {
    font-size: 8px;
}

.reservation-status {
    font-size: 8px;
    line-height: 1;
    font-weight: 600;
    border-radius: 4px;
    padding: 2px;
}

.reservation-phone {
    display: flex;
    align-items: center;
}
</style>
