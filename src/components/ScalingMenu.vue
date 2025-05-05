<script setup lang="ts">
import { SCALING_HEIGHT_STEP, SCALING_WIDTH_STEP } from '@/utils/constants'
import IconMinus from './icons/IconMinus.vue'
import IconPlus from './icons/IconPlus.vue'
import { tableCellSizeStore } from '@/stores/tableCellSize'

const scaleDownCell = () => {
    tableCellSizeStore.width -= SCALING_WIDTH_STEP
    tableCellSizeStore.height -= SCALING_HEIGHT_STEP
}

const scaleUpCell = () => {
    tableCellSizeStore.width += SCALING_WIDTH_STEP
    tableCellSizeStore.height += SCALING_HEIGHT_STEP
}
</script>

<template>
    <div class="scaling-menu">
        <p class="scaling-menu__title">Масштаб</p>
        <div class="scaling-menu__btns">
            <button
                @click="scaleDownCell"
                type="button"
            >
                <IconMinus />
            </button>
            <button
                @click="scaleUpCell"
                type="button"
            >
                <IconPlus />
            </button>
        </div>
    </div>
</template>

<style scoped>
.scaling-menu {
    background: #222222;
    padding: 8px;
    border: 1px solid var(--soft-color-16);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
}

.scaling-menu__title {
    font-size: 13px;
    font-weight: 600;
    text-align: center;
}

.scaling-menu__btns {
    display: flex;
    gap: 4px;
}

.scaling-menu__btns button {
    background: var(--soft-color-08);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 4px;
}

.light .scaling-menu {
    background: var(--soft-color-08);
}
</style>
