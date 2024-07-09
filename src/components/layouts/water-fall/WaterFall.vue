<template>
  <n-infinite-scroll
    :distance="50"
    @load="getNewList"
    :on-scroll="handleScroll"
    ref="scrollRef"
  >
    <div ref="containerRef" class="position-relative">
      <div
        class="waterfall-item"
        :style="{
          width: renderMap[key].width + 'px',
          height: renderMap[key].height + 'px',
          position: 'absolute',
          transform: `translate(${renderMap[key].left}px, ${renderMap[key].top}px)`,
        }"
        v-for="(key, index) in Object.keys(renderMap)"
        :key="index"
      >
        <n-skeleton
          :width="renderMap[key].width + 'px'"
          :height="renderMap[key].height + 'px'"
        />
      </div>
    </div>
    <div class="loading"></div>
    <n-spin v-if="isLoadNextPage" size="small" description="加载中..." />
  </n-infinite-scroll>
</template>
<script lang="ts" setup>
import { NInfiniteScroll } from "naive-ui";
import { WHList } from "./data";
import { throttle } from "lodash";
import { waterFallProps } from "./type";

const props = withDefaults(defineProps<waterFallProps>(), {
  columnNum: 2,
  gap: 16,
});

const scrollRef = ref<InstanceType<typeof NInfiniteScroll>>();
const containerRef = ref<HTMLDivElement>();

let list: any[] = [];
let page = 1;
let pageSize = 50;
let hasNextPage = true;
let columnWidth = 0;
let containerTop = 0;
let domDataList: any[] = [];
let positionList: any[] = [];
let startIdx = 0;
let endIdx = 0;

// 获取数据
const getList = async (): Promise<any[]> => {
  return new Promise((resolve) => {
    const start = (page - 1) * pageSize;
    const nextList = WHList.slice(start, start + pageSize);
    hasNextPage = !!nextList.length;
    list = page === 1 ? nextList : list.concat(nextList);
    setTimeout(
      () => {
        resolve(nextList);
      },
      page === 1 ? 0 : 2000
    ); // 模拟发送请求
  });
};

// 计算瀑布流每一列列宽
const computeColumnWidth = () => {
  // 首先计算应呈现的列数
  const allGapLength = props.gap * (props.columnNum - 1);
  columnWidth = (containerWidth - allGapLength) / props.columnNum;
};

// 重置瀑布流每一列数据
const initPositionList = () => {
  positionList = [];
  // 首先计算应呈现的列数
  for (let i = 0; i < props.columnNum; i++) {
    positionList.push({
      columnIdx: i + 1,
      columnHeight: 0,
    });
  }
};

// 设置容器高度
const setContainerHeight = () => {
  positionList.sort((a, b) => a.columnHeight - b.columnHeight);
  containerRef.value!.style.height =
    positionList[positionList.length - 1].columnHeight + 32 + "px";
};

// 计算数据形成 排序表
const computeDomData = (list: any[], startRenderIdx = 0) => {
  const tempDomDataList = [];
  // const now = Date.now()
  for (let i = 0; i < list.length; i++) {
    const param = {
      idx: startRenderIdx + i,
      columnIdx: 0,
      width: columnWidth,
      height: (list[i].h * columnWidth) / list[i].w,
      left: 0,
      top: 0,
      //   text: testList[Math.trunc(Math.random() * 3)],
      lineHeight: 74, // 根据css设置的值计算得到
    };
    // 排序，第一项必定是长度最短的一列
    positionList.sort((a, b) => a.columnHeight - b.columnHeight);
    param.columnIdx = positionList[0].columnIdx;
    param.left = (param.columnIdx - 1) * (props.gap + columnWidth);
    param.top = positionList[0].columnHeight;
    // css 样式表设置了 纵坐标的12px内边距，要加上
    // param.lineHeight =
    //   getTextLineHeightCtx.measureText(param.text).width + 24 > columnWidth
    //     ? 98
    //     : 78;
    param.height += param.lineHeight;
    positionList[0].columnHeight += param.height + props.gap;
    tempDomDataList.push(param);
  }
  domDataList = domDataList.concat(tempDomDataList);
  setContainerHeight();
  // console.log('computeDomData time:', Date.now() - now, positionList, domDataList)
};

// 计算元素是否符合渲染条件
const checkIsRender = (params) => {
  const { top, height } = params;
  const y = top + height + containerTop;
  // 1个视口的数据再快速滚动滚动条时大概率会有加载项，不妨扩大到上下各0.5个视口，共2个视口内的数据，这样就比较丝滑了，这里也是自由发挥
  const topLine =
    scrollRef.value!.scrollbarInstRef!.containerScrollTop -
    window.innerHeight / 2;
  const bottomLine =
    scrollRef.value!.scrollbarInstRef!.containerScrollTop +
    scrollRef.value!.scrollbarInstRef!.containerRef!.offsetHeight +
    window.innerHeight / 2;
  // 是否在上线之上
  const overTopLine = topLine > y;
  // 是否在下线之下
  const underBottomLine = top > bottomLine;
  // // 是否在两线之内
  // const inLineZoom = y > topLine && y < bottomLine
  // // 是否与上线相交
  // const intersectTopLine = top + containerTop <= topLine && y > topLine
  // // 是否与下线相交
  // const intersectBottomLine = top + containerTop <= bottomLine && y > bottomLine
  return {
    overTopLine,
    underBottomLine,
    //   inLineZoom,
    //   intersectTopLine,
    //   intersectBottomLine
  };
};

// 根据元素列表进行渲染
const renderMap = ref<any>({});
const renderList = ref<any[]>([]);
const renderDomByDomDataList = (startRenderIdx = 0) => {
  if (!domDataList.length) return;
  const tempRenderMap = {};
  let topIdx = startRenderIdx;
  let bottomIdx = startRenderIdx;
  const now = Date.now();
  // 处于这两条线之间的元素将被渲染进容器
  const list = [];
  for (let i = startRenderIdx; i < domDataList.length; i++) {
    // const { idx } = domDataList[i];
    const { overTopLine, underBottomLine } = checkIsRender(domDataList[i]);
    if (overTopLine || underBottomLine) {
      if (renderMap.value[domDataList[i].idx]) {
        delete renderMap.value[domDataList[i].idx];
      }
      continue;
    }
    renderMap.value[domDataList[i].idx] = domDataList[i];
  }
  const keys = Object.keys(renderMap.value);
  console.log("keys:", renderMap.value);
  startIdx = +keys[0];
  endIdx = +keys[keys.length - 1];
  console.log("renderDom time:", startIdx, endIdx, Date.now() - now);
};

// 当滚动条滚动时，更新容器内的 每一项 元素是 插入 还是 删除
const updateDomPosition = (direction = 1) => {
  const now = Date.now();
  // 检查已渲染列表中的元素，不符合条件删除元素，反之插入元素
  for (let i = startIdx; i <= endIdx; i++) {
    const { overTopLine, underBottomLine } = checkIsRender(domDataList[i]);
    if (overTopLine || underBottomLine) {
      if (renderMap.value[domDataList[i].idx]) {
        delete renderMap.value[domDataList[i].idx];
      }
    } else if (!renderMap.value[domDataList[i].idx]) {
      renderMap.value[domDataList[i].idx] = domDataList[i];
    }
  }
  // 向上
  if (direction < 0) {
    for (let i = startIdx - 1; i >= 0; i--) {
      const { overTopLine } = checkIsRender(domDataList[i]);
      if (overTopLine) break;
      renderMap.value[domDataList[i].idx] = domDataList[i];
    }
  } else {
    // 向下
    for (let i = endIdx + 1; i < domDataList.length; i++) {
      const { underBottomLine } = checkIsRender(domDataList[i]);
      // 只要找到Bottom在下线之下的立即停止
      if (underBottomLine) break;
      renderMap.value[domDataList[i].idx] = domDataList[i];
    }
  }
  const keys = Object.keys(renderMap.value);
  startIdx = +keys[0];
  endIdx = +keys[keys.length - 1];
  console.log("updateDomPosition time:", startIdx, endIdx, Date.now() - now);
};

// 上次滚动距离Y
let lastScrollNumY = 0;
// 上次滚动距离X
let lastScrollNumX = 0;
// 上次滚动方向 向下 为 1，向上为 -1
let scrollDirection = 1;
const isLoadNextPage = ref<boolean>(false);
// 窗口滚动事件
const handleScroll = throttle(async () => {
  // 过滤掉x轴滚动条
  // if (window.scrollX !== lastScrollNumX) {
  //   lastScrollNumX = window.scrollX
  //   return
  // }
  scrollDirection =
    scrollRef.value!.scrollbarInstRef!.containerScrollTop - lastScrollNumY >= 0
      ? 1
      : -1;
  lastScrollNumY = scrollRef.value!.scrollbarInstRef!.containerScrollTop;
  updateDomPosition(scrollDirection);
  return;
  if (isLoadNextPage.value || !hasNextPage) return false;
  if (
    scrollRef.value!.scrollbarInstRef!.containerScrollTop +
      scrollRef.value!.scrollbarInstRef!.containerRef!.offsetHeight >=
    scrollRef.value!.scrollbarInstRef!.containerRef!.scrollHeight * 0.85
  ) {
    isLoadNextPage.value = true;
    page += 1;
    const list = await getList();
    isLoadNextPage.value = false;
    // 加载数据期间发生了视口变化时，执行一次回调
    // if (resizeCallback) {
    //   resizeCallback();
    //   resizeCallback = null;
    // } else {
    //   // 节点信息排列完毕后进行渲染
    //   const startIdx = (page - 1) * pageSize;
    //   computeDomData(list, startIdx);
    //   renderDomByDomDataList(startIdx);
    // }
    // 节点信息排列完毕后进行渲染
    const startIdx = (page - 1) * pageSize;
    computeDomData(list, startIdx);
    renderDomByDomDataList(startIdx);
  }
}, 150);

const getNewList = async () => {
  isLoadNextPage.value = true;
  page += 1;
  const list = await getList();
  const startIdx = (page - 1) * pageSize;
  computeDomData(list, startIdx);
  renderDomByDomDataList(startIdx);
  isLoadNextPage.value = false;
};

let containerWidth = 0;

onMounted(async () => {
  // 容器宽度
  containerWidth =
    scrollRef.value?.scrollbarInstRef?.containerRef?.offsetWidth || 0;
  computeColumnWidth();
  initPositionList();
  computeDomData(await getList(), 0);
  renderDomByDomDataList(0);
});
</script>
<style scoped>
.waterfall-item {
  background: orange;
}
</style>
