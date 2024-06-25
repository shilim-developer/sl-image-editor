<template>
  <w-page
    :widget-info="page"
    :widget-list="widgetList"
    @click="handleClick"
  ></w-page>
</template>
<script lang="ts" setup>
import { CommonWidgetType } from "@/components/widgets/types/common";
import { WPageType } from "@/components/widgets/w-page/w-page-type";
import { useDesignStore } from "@/stores/modules/design";

type PropsType = {
  page: WPageType;
  widgetList: CommonWidgetType[];
};
defineProps<PropsType>();

const designStore = useDesignStore();
const handleClick = (event: PointerEvent) => {
  const x = event.clientX;
  const y = event.clientY;
  const elements = document.elementsFromPoint(x, y);
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    if (element.id && element.className.includes("widget")) {
      designStore.setState({
        selectedWidgets: [element.id],
      });
      console.log("element:", designStore.selectedWidgets);
      break;
    }
  }
};
</script>
<style lang="scss" scoped></style>
