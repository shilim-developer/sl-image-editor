<template>
  <n-collapse class="mt-16px" :default-expanded-names="[1, 2, 3]">
    <template #header-extra="{ collapsed }">
      <div class="mr-4">
        <ChevronDown class="w-12px h-12px" v-if="collapsed" />
        <ChevronUp class="w-12px h-12px" v-else />
      </div>
    </template>
    <template #arrow>
      <div class="ml-2"></div>
    </template>
    <n-collapse-item :name="1">
      <template #header>
        <div class="font-bold">尺寸</div>
      </template>
      <div class="p-l-3 p-r-3">
        <n-flex justify="space-between">
          <n-input-number
            class="w-47%"
            placeholder=""
            size="small"
            :show-button="false"
          >
            <template #suffix>
              <span class="color-gray-4"> 宽 </span>
            </template>
          </n-input-number>
          <n-input-number
            class="w-47%"
            placeholder=""
            size="small"
            :show-button="false"
          >
            <template #suffix>
              <span class="color-gray-4"> 高 </span>
            </template>
          </n-input-number>
        </n-flex>
      </div>
    </n-collapse-item>
    <n-collapse-item :name="2">
      <template #header>
        <div class="font-bold">背景</div>
      </template>
      <div class="p-l-3 p-r-3">
        <n-tabs
          type="segment"
          animated
          size="small"
          v-model="widgetSetting.background.type"
        >
          <n-tab-pane name="color" tab="颜色">
            <n-popover trigger="click">
              <template #trigger>
                <div
                  class="w-100% h-100px box-border border-1px border-solid border-gray-2 border-rd-1 cursor-pointer"
                  :style="{
                    background: widgetSetting.background.backgroundColor,
                  }"
                ></div>
              </template>
              <Vue3ColorPicker
                :model-value="widgetSetting.background.backgroundColor"
                @update:model-value="colorChange"
                :mode="mode"
                :showInputMenu="false"
                :showColorList="false"
                :showEyeDrop="false"
                :local="{
                  angle: '角度',
                  solid: '纯色',
                  positionX: '位置X',
                  positionY: '位置Y',
                  gradient: '渐变',
                  linear: '线性',
                  radial: '径向',
                  colorPalate: '色板',
                }"
              />
            </n-popover>
          </n-tab-pane>
          <n-tab-pane name="image" tab="图片">
            <!-- <img src="test" alt="" srcset="" /> -->
          </n-tab-pane>
        </n-tabs>
      </div>
    </n-collapse-item>
  </n-collapse>
</template>
<script lang="ts" setup>
import { useCanvasStore } from "@/stores/modules/design/canvas";
import { ChevronDown, ChevronUp } from "@vicons/ionicons5";
import { cloneDeep } from "lodash";
import { WPageType } from "./w-page-type";
import { Vue3ColorPicker } from "@cyhnkckali/vue3-color-picker";
import "@cyhnkckali/vue3-color-picker/dist/style.css";
import { getColorModeFromStr } from "@/utils/utils";
import { WidgetType } from "../types/common";

const canvasStore = useCanvasStore();
const widgetSetting = ref<WPageType>(
  cloneDeep(canvasStore.selectedWidgetList[0] as WPageType)
);
const mode = computed(() =>
  getColorModeFromStr(widgetSetting.value.background.backgroundColor || "")
);

function colorChange(value: string) {
  widgetSetting.value.background.backgroundColor = value;
  canvasStore.setWidgetData<WidgetType.WPage>([
    {
      uuid: widgetSetting.value.uuid,
      background: {
        backgroundColor: value,
        colorType: mode.value,
      },
    },
  ]);
}
</script>
<style lang="scss" scoped></style>
