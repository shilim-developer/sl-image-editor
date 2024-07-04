<template>
  <div
    ref="canvasListRef"
    class="position-fixed bottom-40px"
    :style="{ width: `${width}px`, left: `${left}px` }"
  >
    <n-button class="bg-white" @click="listShow = !listShow">
      <div class="d-flex">
        画板{{ canvasListStore.selectedCanvasIndex + 1 }}/{{
          canvasListStore.canvasList.length
        }}
        <ChevronUp class="w-12px h-12px" v-if="listShow" />
        <ChevronDown class="w-12px h-12px" v-else />
      </div>
    </n-button>
    <div
      class="w-100% flex overflow-x-auto bg-white p-2 mt-2 box-border border-rd-2"
      v-if="listShow"
    >
      <n-space>
        <div
          v-for="(_, index) in canvasListStore.canvasList"
          :key="index"
          @click="canvasListStore.selectCanvas(index)"
          class="w-70px h-70px border-width-1 border-solid border-gray-2 border-rd-2"
        >
          画板{{ index + 1 }}
        </div>
      </n-space>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useCanvasListStore } from "@/stores/modules/design/canvas-list";
import { ChevronDown, ChevronUp } from "@vicons/ionicons5";
withDefaults(
  defineProps<{
    width: number;
    left: number;
  }>(),
  {
    width: 0,
    left: 0,
  }
);

const emit = defineEmits<{
  heightChange: [value: number];
}>();

const canvasListStore = useCanvasListStore();
const canvasListRef = ref();
const listShow = ref(false);
onMounted(() => {
  emit("heightChange", canvasListRef.value.clientHeight);
});
</script>
<style scoped></style>
