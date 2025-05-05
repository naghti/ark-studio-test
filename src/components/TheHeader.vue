<script setup lang="ts">
import { useBookingStore } from '@/stores/booking'
import { themeStore, toggleTheme } from '@/stores/theme'
import IconSun from './icons/IconSun.vue'
import IconMoon from './icons/IconMoon.vue'

const bookingStore = useBookingStore()
</script>

<template>
    <header>
        <p class="restaurant-name">AIRESTO | {{ bookingStore.data?.restaurant.restaurant_name }}</p>
        <button
            @click="toggleTheme"
            class="theme-btn"
        >
            <IconSun v-if="themeStore.currentTheme === 'dark'" />
            <IconMoon v-else />
        </button>
    </header>
</template>

<style scoped>
header {
    background: var(--soft-color-08);
    padding: 0 20px;
    display: flex;
    align-items: center;
    height: 44px;
    margin-bottom: 32px;
}

.restaurant-name {
    font-size: 11px;
    font-weight: 600;
}

.theme-btn {
    width: 26px;
    height: 26px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--soft-color-08);
    margin-left: auto;
}
</style>
