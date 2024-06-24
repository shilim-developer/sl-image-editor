<template>
  <div
    class="position-absolute left-0 top-0"
    :style="{
      width: `${width}px`,
      height: `${height}px`,
      background: '#f6f8fa',
    }"
  >
    测23323试
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
import { WPageType } from "./w-page-type";

defineProps<WPageType>();
</script>
<style lang="scss" scoped></style>
