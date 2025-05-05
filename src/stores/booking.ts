import type { BookingDTO, BookingTransformedDTO } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBookingStore = defineStore('booking', () => {
    const data = ref<BookingDTO>()
    const formattedData = ref<BookingTransformedDTO>()
    const loaded = ref(false)

    async function fetchData() {
        const res = await fetch('https://hh.frontend.ark.software/api/booking')
        data.value = await res.json()
        formattedData.value = {
            ...data.value!,
            tables: data.value!.tables.map(table => {
                return {
                    ...table,
                    reservations: table.reservations.map(reservation => ({
                        ...reservation,
                        start_time: reservation.seating_time
                    }))
                }
            })
        }
        loaded.value = true
    }

    if (!loaded.value) {
        fetchData()
    }

    return {
        data: formattedData
    }
})
