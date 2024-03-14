<script lang="ts" setup></script>

<template>
  <div class="w-full rounded-8px bg-white p-8px">
    <div class="rounded-8px bg-gray-200 py-4px text-center">
      <slot name="title" />
    </div>
    <div class="mt-8px rounded-8px bg-gray-100 px-8px py-8px text-size-12px">
      <slot />
    </div>
  </div>
</template>
