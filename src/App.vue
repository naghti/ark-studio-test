<script setup lang="ts">
import { computed, watch } from 'vue'
import { useBookingStore } from './stores/booking'
import { filtersStore } from './stores/filters'
import TablesData from './components/TablesData.vue'
import TheHeader from './components/TheHeader.vue'
import ScalingMenu from './components/ScalingMenu.vue'
import FilterGroup from './components/FilterGroup.vue'
import { themeStore } from './stores/theme'

const booking = useBookingStore()

watch(
    () => booking.data,
    data => {
        if (data) filtersStore.selectedDate = data.current_day
    },
    { once: true }
)

watch(
    () => themeStore.currentTheme,
    (newValue, oldValue) => {
        const rootElement = document.getElementsByTagName('html')[0]
        rootElement.classList.remove(oldValue)
        rootElement.classList.add(newValue)
    }
)

const availableZones = computed(() => [...new Set(booking.data?.tables.map(table => table.zone))])
const filteredTables = computed(() =>
    booking.data?.tables.filter(table => filtersStore.selectedZones.includes(table.zone))
)
</script>

<template>
    <div class="wrapper">
        <TheHeader />

        <main>
            <h1>Бронирования</h1>
            <div class="filters">
                <FilterGroup
                    v-if="booking.data?.available_days"
                    v-model="filtersStore.selectedDate"
                    legend="Дата"
                    name="datepicker"
                    type="radio"
                    :items="booking.data.available_days"
                    :item-radius="8"
                    :use-formatted="true"
                />
                <FilterGroup
                    v-if="availableZones"
                    v-model="filtersStore.selectedZones"
                    legend="Отображаемые зоны"
                    name="zonepicker"
                    type="checkbox"
                    :items="availableZones"
                    :item-radius="4"
                />
            </div>
            <TablesData
                v-if="filteredTables"
                :tables="filteredTables"
            />
        </main>

        <ScalingMenu class="scaling" />
    </div>
</template>

<style scoped>
main {
    padding: 0 20px;
}

h1 {
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 16px;
}

.filters {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 33px;
}

.scaling {
    position: fixed;
    bottom: 16px;
    right: 16px;
    z-index: 15;
}
</style>
