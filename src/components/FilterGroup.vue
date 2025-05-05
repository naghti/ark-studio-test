<script setup lang="ts">
import { formattedDate, getDayLabel } from '@/utils/functions'

const props = defineProps<{
    legend: string
    name: string
    items: string[]
    itemRadius: number
    type: 'checkbox' | 'radio'
    useFormatted?: boolean
    modelValue: string[] | string
}>()

const emit = defineEmits<{
    'update:modelValue': [value: string | string[]]
}>()

const isChecked = (item: string) =>
    props.type === 'checkbox' ? props.modelValue.includes(item) : props.modelValue === item

const onInput = (e: Event) => {
    const target = e.target as HTMLInputElement
    const value = target.value

    if (props.type === 'checkbox') {
        const model = [...props.modelValue]
        const index = model.indexOf(value)

        if (target.checked && index === -1) {
            model.push(value)
        } else if (!target.checked && index !== -1) {
            model.splice(index, 1)
        }

        emit('update:modelValue', model)
    } else {
        emit('update:modelValue', value)
    }
}
</script>

<template>
    <fieldset class="filter-group">
        <legend class="filter-group__legend">{{ legend }}</legend>
        <div class="filter-group__options">
            <label
                v-for="(item, i) in items"
                :key="item"
                class="filter-group__option"
            >
                <input
                    :value="item"
                    :type="type"
                    :name="name"
                    :checked="isChecked(item)"
                    class="filter-group__option-input"
                    @input="onInput"
                />
                <div
                    class="filter-group__option-custom"
                    :style="{
                        borderRadius: `${props.itemRadius}px`
                    }"
                >
                    <p>{{ useFormatted ? formattedDate(item) : item }}</p>
                    <p v-if="useFormatted">{{ getDayLabel(i, item) }}</p>
                </div>
            </label>
        </div>
    </fieldset>
</template>

<style scoped>
.filter-group {
    font-size: 11px;
}

.filter-group__legend {
    color: var(--soft-color-48);
    margin-bottom: 4px;
}

.filter-group__options {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
}

.filter-group__option {
    position: relative;
}

.filter-group__option-input {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    pointer-events: none;
}

.filter-group__option-custom {
    padding: 4px 8px;
    border-radius: 4px;
    background: var(--soft-color-04);
    cursor: pointer;
}

.filter-group__option-input:checked ~ .filter-group__option-custom {
    color: #fff;
    background: #007aff;
}
</style>
