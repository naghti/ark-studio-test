<script setup lang="ts">
import { useBookingStore } from '@/stores/booking'
import { themeStore, toggleTheme } from '@/stores/theme'
import IconSun from './icons/IconSun.vue'
import IconMoon from './icons/IconMoon.vue'

const bookingStore = useBookingStore()
</script>

<template>
    <header>

    </header>
</template>

<style scoped>
header {
    padding: 0 5px;
    display: flex;
    align-items: center;
    height: 44px;
    margin-bottom: 32px;
}

</style>
