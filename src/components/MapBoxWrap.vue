<script lang="ts" setup></script>

<template>
  <div class="w-full bg-white p-8px rounded-8px">
    <div class="text-center bg-gray-200 rounded-8px py-4px">
      <slot name="title" />
    </div>
    <div class="text-size-12px bg-gray-100 rounded-8px py-8px mt-8px px-8px">
      <slot />
    </div>
  </div>
</template>
