<template>
  <div class="ruler horizontal"></div>
  <div class="ruler vertical"></div>
</template>
<script lang="ts" setup>
import Ruler from "@scena/ruler";

const props = defineProps<{ left: number; top: number; zoom: number }>();

let rulerHorizontal: Ruler;
let rulerVertical: Ruler;
function initRule() {
  rulerHorizontal = new Ruler(document.querySelector(".ruler.horizontal"), {
    type: "horizontal",
    zoom: props.zoom,
    height: 30,
    backgroundColor: "#ffffff",
    textColor: "#1f2225",
  });
  rulerVertical = new Ruler(document.querySelector(".ruler.vertical"), {
    type: "vertical",
    zoom: props.zoom,
    width: 30,
    backgroundColor: "#ffffff",
    textColor: "#1f2225",
  });
}

function scroll() {
  rulerHorizontal && rulerHorizontal.scroll(-props.left, props.zoom);
  rulerVertical && rulerVertical.scroll(-props.top, props.zoom);
}

watch([() => props.left, () => props.top, () => props.zoom], (value) => {
  rulerHorizontal && rulerHorizontal.resize(props.zoom);
  rulerVertical && rulerVertical.resize(props.zoom);
  scroll();
});
onMounted(() => {
  initRule();
});
</script>
<style lang="less" scoped>
.ruler {
  position: absolute;
  top: 0;
  left: 0;
}
.ruler.horizontal {
  left: 0;
  width: 100%;
  height: 20px;
}
.ruler.vertical {
  left: 0;
  width: 20px;
  height: 100%;
}
</style>
