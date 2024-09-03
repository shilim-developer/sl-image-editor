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
  </n-collapse>
  <div class="p-3">
    <n-tabs justify-content="space-evenly" type="line" trigger="hover">
      <n-tab-pane name="oasis">
        <template #tab>
          <n-icon class="w-100%" :size="16"><LayersOutline /></n-icon>
        </template>
        <n-flex justify="space-between">
          <n-button size="small" class="flex-1">上移一层</n-button>
          <n-button size="small" class="flex-1">下移一层</n-button>
          <n-button size="small" class="flex-1">移动到顶层</n-button>
          <n-button size="small" class="flex-1">移动到底层</n-button>
        </n-flex>
      </n-tab-pane>
      <n-tab-pane name="the beatles">
        <template #tab>
          <n-icon class="w-100%" :size="16"><FlipHorizontal16Filled /></n-icon>
        </template>
        <n-flex justify="space-between">
          <n-button
            size="small"
            class="flex-1"
            @click="
              changeWidgetData('transform.flipX', -inputForm.transform.flipX)
            "
          >
            水平翻转
          </n-button>
          <n-button
            size="small"
            class="flex-1"
            @click="
              changeWidgetData('transform.flipY', -inputForm.transform.flipY)
            "
          >
            垂直翻转
          </n-button>
        </n-flex>
      </n-tab-pane>
      <n-tab-pane name="jay chou">
        <template #tab>
          <n-icon class="w-100%" :size="16">
            <AlignCenterHorizontal20Filled />
          </n-icon>
        </template>
        <n-flex justify="space-between" :wrap="false">
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-button> 鸭子 </n-button>
            </template>
            如果它长得像鸭子，走起来像鸭子，叫起来也像鸭子，那它一定是个鸭子。
          </n-tooltip>
          <n-button size="small" class="flex-1 p-l-1 p-r-1">
            <n-icon class="w-100%" :size="16">
              <AlignStartHorizontal20Filled />
            </n-icon>
          </n-button>
          <n-button size="small" class="flex-1 p-l-1 p-r-1">
            <n-icon class="w-100%" :size="16">
              <AlignEndHorizontal20Filled />
            </n-icon>
          </n-button>
          <n-button size="small" class="flex-1 p-l-1 p-r-1">
            <n-icon class="w-100%" :size="16">
              <AlignStartVertical20Filled />
            </n-icon>
          </n-button>
          <n-button size="small" class="flex-1 p-l-1 p-r-1">
            <n-icon class="w-100%" :size="16">
              <AlignEndVertical20Filled />
            </n-icon>
          </n-button>
          <n-button size="small" class="flex-1 p-l-1 p-r-1">
            <n-icon class="w-100%" :size="16">
              <AlignCenterHorizontal16Filled />
            </n-icon>
          </n-button>
          <n-button size="small" class="flex-1 p-l-1 p-r-1">
            <n-icon class="w-100%" :size="16">
              <AlignCenterVertical16Filled />
            </n-icon>
          </n-button>
        </n-flex>
      </n-tab-pane>
    </n-tabs>
  </div>
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
  AlignStartHorizontal20Filled,
  AlignEndHorizontal20Filled,
  AlignStartVertical20Filled,
  AlignEndVertical20Filled,
  AlignCenterHorizontal16Filled,
  AlignCenterVertical16Filled,
} from "@vicons/fluent";
import { cloneDeep } from "lodash";
import { WImageType } from "./w-image-type";
import { expression2Object } from "@/utils/utils";

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
</script>
<style lang="scss" scoped></style>
