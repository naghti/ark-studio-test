<script setup lang="ts">
import { useEventPositionStyles } from '@/composables/useEventPositionStyles'
import { useBookingStore } from '@/stores/booking'
import type { Order } from '@/types'
import { extractHoursAndMinutes } from '@/utils/functions'
import { computed } from 'vue'

const props = defineProps<{
    order: Order
}>()

const booking = useBookingStore()
const { top, height } = useEventPositionStyles(props.order.start_time, props.order.end_time)

const labels = {
    New: 'Новый',
    Bill: 'Пречек',
    Closed: 'Закрытый'
}

const orderStatusStyles = computed(() => {
    if (props.order.status === 'Bill') {
        return {
            backgroundColor: 'rgba(74, 201, 155, 0.32)'
        }
    } else {
        return {
            backgroundColor: 'var(--soft-color-12)'
        }
    }
})
</script>

<template>
    <div
        v-if="booking.data"
        class="order"
        :class="`order_${order.status.toLowerCase()}`"
        :style="{
            top,
            height
        }"
    >
        <p class="order-title">{{ order.status === 'Banquet' ? 'Банкет' : 'Заказ' }}</p>
        <p
            v-if="order.status !== 'Banquet'"
            class="order-status"
            :style="orderStatusStyles"
        >
            {{ labels[order.status] }}
        </p>
        <p>
            {{ extractHoursAndMinutes(order.start_time) }}-{{
                extractHoursAndMinutes(order.end_time)
            }}
        </p>
    </div>
</template>

<style scoped>
.order {
    font-size: 11px;
    position: absolute;
    border-radius: 4px;
    border-left: 2px solid;
    padding: 2px 2px 2px 4px;
    text-align: left;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border-color: #7fd7cc;
    background-color: rgba(127, 215, 204, 0.16);
    overflow: hidden;
    width: 100%;
}

.order:hover {
    width: auto;
    min-width: 100%;
    max-width: unset !important;
    z-index: 100 !important;
    backdrop-filter: blur(8px);
}

.order_banquet {
    border-color: #7b439e;
    background-color: rgba(179, 72, 247, 0.16);
}

.order-title {
    line-height: 14px;
}

.order-status {
    font-size: 8px;
    line-height: 1;
    font-weight: 600;
    border-radius: 4px;
    padding: 2px;
}
</style>
