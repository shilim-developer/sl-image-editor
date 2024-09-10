<template>
  <n-collapse class="mt-16px" :default-expanded-names="[1, 2, 3, 4]">
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
          <sl-input-number
            :value="inputForm?.bounds.width"
            class="w-42%"
            placeholder=""
            size="small"
            :show-button="false"
            :precision="0"
            @end-input="changeWidgetData('bounds.width', $event)"
          >
            <template #suffix>
              <span class="color-gray-4"> 宽 </span>
            </template>
          </sl-input-number>
          <sl-input-number
            :value="inputForm?.bounds.height"
            class="w-42%"
            placeholder=""
            size="small"
            :show-button="false"
          >
            <template #suffix>
              <span class="color-gray-4"> 高 </span>
            </template>
          </sl-input-number>
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-button text>
                <n-icon>
                  <LockOpen class="w-16px h-16px" />
                </n-icon>
              </n-button>
            </template>
            锁定宽高比例
          </n-tooltip>
        </n-flex>
      </div>
    </n-collapse-item>
    <n-collapse-item :name="2">
      <template #header>
        <div class="font-bold">位置</div>
      </template>
      <div class="p-l-3 p-r-3">
        <n-flex justify="space-between">
          <sl-input-number
            :value="inputForm?.bounds.x"
            class="w-47%"
            placeholder=""
            size="small"
            :show-button="false"
            :precision="0"
            @end-input="changeWidgetData('bounds.x', $event)"
          >
            <template #suffix>
              <span class="color-gray-4"> X </span>
            </template>
          </sl-input-number>
          <sl-input-number
            :value="inputForm?.bounds.y"
            class="w-47%"
            placeholder=""
            size="small"
            :show-button="false"
          >
            <template #suffix>
              <span class="color-gray-4"> Y </span>
            </template>
          </sl-input-number>
        </n-flex>
      </div>
    </n-collapse-item>
    <n-collapse-item :name="4">
      <template #header>
        <div class="font-bold">图片操作</div>
      </template>
      <div class="p-l-3 p-r-3">
        <n-button strong secondary class="w-100%"> 替换图片 </n-button>
        <n-grid :x-gap="8" :y-gap="8" :cols="4" class="mt-4">
          <n-grid-item>
            <n-flex vertical :align="'center'">
              <n-dropdown trigger="hover" :options="layerOptions">
                <n-button tertiary class="h-auto pt-3.5 pb-3.5">
                  <n-icon class="w-100%" :size="18">
                    <Crop20Filled />
                  </n-icon>
                </n-button>
              </n-dropdown>
              <span class="font-size-13">裁剪</span>
            </n-flex>
          </n-grid-item>
          <n-grid-item>
            <n-flex vertical :align="'center'">
              <n-dropdown trigger="hover" :options="flipOptions">
                <n-button tertiary class="h-auto pt-3.5 pb-3.5">
                  <n-icon class="w-100%" :size="18">
                    <PaintBucket16Regular />
                  </n-icon>
                </n-button>
              </n-dropdown>
              <span class="font-size-13">调色</span>
            </n-flex>
          </n-grid-item>
          <n-grid-item>
            <n-flex vertical :align="'center'">
              <n-dropdown trigger="hover" :options="alignOptions">
                <n-button tertiary class="h-auto pt-3.5 pb-3.5">
                  <n-icon class="w-100%" :size="18">
                    <CameraEdit20Regular />
                  </n-icon>
                </n-button>
              </n-dropdown>
              <span class="font-size-13">滤镜</span>
            </n-flex>
          </n-grid-item>
        </n-grid>
      </div>
    </n-collapse-item>
    <n-collapse-item :name="3">
      <template #header>
        <div class="font-bold">快捷操作</div>
      </template>
      <div class="p-l-3 p-r-3">
        <n-grid :x-gap="8" :y-gap="8" :cols="4">
          <n-grid-item>
            <n-flex vertical :align="'center'">
              <n-dropdown trigger="hover" :options="layerOptions">
                <n-button tertiary class="h-auto pt-3.5 pb-3.5">
                  <n-icon class="w-100%" :size="18">
                    <LayersOutline />
                  </n-icon>
                </n-button>
              </n-dropdown>
              <span class="font-size-13">图层顺序</span>
            </n-flex>
          </n-grid-item>
          <n-grid-item>
            <n-flex vertical :align="'center'">
              <n-dropdown trigger="hover" :options="flipOptions">
                <n-button tertiary class="h-auto pt-3.5 pb-3.5">
                  <n-icon class="w-100%" :size="18">
                    <FlipHorizontal16Filled />
                  </n-icon>
                </n-button>
              </n-dropdown>
              <span class="font-size-13">翻转</span>
            </n-flex>
          </n-grid-item>
          <n-grid-item>
            <n-flex vertical :align="'center'">
              <n-dropdown trigger="hover" :options="alignOptions">
                <n-button tertiary class="h-auto pt-3.5 pb-3.5">
                  <n-icon class="w-100%" :size="18">
                    <AlignCenterHorizontal20Filled />
                  </n-icon>
                </n-button>
              </n-dropdown>
              <span class="font-size-13">对齐</span>
            </n-flex>
          </n-grid-item>
        </n-grid>
      </div>
    </n-collapse-item>
  </n-collapse>
</template>
<script lang="ts" setup>
import { useCanvasStore } from "@/stores/modules/design/canvas";
import {
  ChevronDown,
  ChevronUp,
  LockOpen,
  LayersOutline,
} from "@vicons/ionicons5";
import {
  FlipHorizontal16Filled,
  AlignCenterHorizontal20Filled,
  Crop20Filled,
  PaintBucket16Regular,
  CameraEdit20Regular,
} from "@vicons/fluent";
import { cloneDeep } from "lodash";
import { WImageType } from "./w-image-type";
import { deepAssign, expression2Object } from "@/utils/utils";
import { useWImageEvent } from "./w-image-event";

const canvasStore = useCanvasStore();
const inputForm = ref<WImageType>(
  cloneDeep(canvasStore.selectedWidgetList[0] as WImageType),
);
watchEffect(() => {
  console.log("inputForm:", canvasStore.selectedWidgetList[0]);
  inputForm.value = cloneDeep(canvasStore.selectedWidgetList[0] as WImageType);
});

function changeWidgetData(name: string, value: any) {
  console.log("name:", name, inputForm.value.bounds);
  canvasStore.setWidgetData([
    { uuid: inputForm.value.uuid, ...expression2Object(name, value) },
  ]);
}

useWImageEvent("CHANGE_INPUT_FORM", (event) => {
  deepAssign(inputForm.value, event);
});

const layerOptions = ref([
  {
    label: "移动到顶层",
    key: "atlantis nahamas, nassau",
  },
  {
    label: "上移一层",
    key: "marina bay sands",
  },
  {
    label: "下移一层",
    key: "brown's hotel, london",
  },
  {
    label: "移动到底层",
    key: "the beverly hills hotel, los angeles",
  },
]);

const flipOptions = ref([
  {
    label: "水平翻转",
    key: "atlantis nahamas, nassau",
  },
  {
    label: "垂直翻转",
    key: "marina bay sands",
  },
]);

const alignOptions = ref([
  {
    label: "居上对齐",
    key: "atlantis nahamas, nassau",
  },
  {
    label: "居左对齐",
    key: "marina bay sands",
  },
  {
    label: "居右对齐",
    key: "brown's hotel, london",
  },
  {
    label: "居下对齐",
    key: "the beverly hills hotel, los angeles",
  },
  {
    label: "居中对齐",
    key: "brown's hotel, london",
  },
  {
    label: "水平居中对齐",
    key: "brown's hotel, london",
  },
  {
    label: "垂直居中对齐",
    key: "the beverly hills hotel, los angeles",
  },
]);
</script>
<style lang="scss" scoped></style>
