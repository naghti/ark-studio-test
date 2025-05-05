import { parseISOTimeToMinutes, parseTimeToMinutes } from '@/utils/functions'
import { tableCellSizeStore } from '@/stores/tableCellSize'
import { useBookingStore } from '@/stores/booking'
import { computed } from 'vue'

export function useEventPositionStyles(eventStartISO: string, eventEndISO: string) {
    const booking = useBookingStore()

    const pixelsPerMinute = computed(() => tableCellSizeStore.height / 30)

    const eventStartMinutes = parseISOTimeToMinutes(eventStartISO)
    const eventEndMinutes = parseISOTimeToMinutes(eventEndISO)

    const top = computed(() => {
        const opening = booking.data?.restaurant.opening_time
        if (!opening) return '0px'
        const openingMinutes = parseTimeToMinutes(opening)

        return (eventStartMinutes - openingMinutes) * pixelsPerMinute.value + 'px'
    })

    const height = computed(
        () => (eventEndMinutes - eventStartMinutes) * pixelsPerMinute.value + 'px'
    )

    return {
        top,
        height
    }
}
