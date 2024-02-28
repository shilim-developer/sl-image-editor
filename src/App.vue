<template>
  <n-config-provider
    class="w-full h-full flex flex-col overflow-hidden"
    :theme-overrides="themeOverrides"
  >
    <router-view />
  </n-config-provider>
</template>

<script lang="ts" setup>
import { NConfigProvider, GlobalThemeOverrides } from "naive-ui";

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: "#2080F0FF",
    primaryColorHover: "#4098FCFF",
    primaryColorPressed: "#1060C9FF",
    primaryColorSuppl: "#4098FCFF",
  },
};
</script>
