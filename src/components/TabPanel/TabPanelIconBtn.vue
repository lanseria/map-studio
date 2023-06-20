<script lang="ts" setup>
const props = defineProps({
  showDown: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div class="relative cursor-pointer text-[var(--color-neutral-10)] hover:bg-[var(--color-neutral-2)] w-100px h-100px border border-[var(--color-neutral-3)] flex flex-col items-center justify-evenly">
    <div>
      <slot name="icon" />
    </div>
    <div>
      <slot />
    </div>
    <icon-down v-if="props.showDown" class="absolute bottom-0" />
  </div>
</template>
