<template>
  <component :is="type">
    <widget-renderer
      v-for="(item, index) in children"
      v-bind="item"
      :key="index"
    />
  </component>
</template>
<script lang="ts" setup>
type PropsType = {
  type: string;
  children: PropsType[];
};

defineProps<PropsType>();
</script>
<style lang="scss" scoped></style>
