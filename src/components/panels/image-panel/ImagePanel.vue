<template>
  <div class="w-full h-full">
    <WaterFall class="w-full h-full overflow-visible" style="height: 100%" />
  </div>
</template>
<script lang="ts" setup>
import { WHList } from "@/components/layouts/water-fall/data";

const dataList = ref<any[]>([]);

let page = 1;
let pageSize = 50;
let hasNextPage = true;

// 获取数据
const getList = async (): Promise<any[]> => {
  return new Promise((resolve) => {
    const start = (page - 1) * pageSize;
    const nextList = WHList.slice(start, start + pageSize);
    hasNextPage = !!nextList.length;
    dataList.value = page === 1 ? nextList : dataList.value.concat(nextList);
    setTimeout(
      () => {
        resolve(nextList);
      },
      page === 1 ? 0 : 2000
    ); // 模拟发送请求
  });
};
</script>
<style lang="scss" scoped></style>
