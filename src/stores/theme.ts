import { reactive } from 'vue'

export const themeStore = reactive<{
    currentTheme: 'dark' | 'light'
}>({
    currentTheme: 'dark'
})

export const toggleTheme = () =>
    themeStore.currentTheme === 'dark'
        ? (themeStore.currentTheme = 'light')
        : (themeStore.currentTheme = 'dark')
