<template>
  <div class="w-full h-full">
    <water-fall
      class="w-full h-full overflow-visible"
      style="height: 100%"
      :data-list="dataList"
      :get-list="getList"
    >
      <template #default="{ data }">
        <widget-drag :data="data">
          <template #default="dragEvent">
            <n-image
              :draggable="false"
              :src="data.url"
              class="w-full h-full"
              width="100%"
              height="100%"
              object-fit="cover"
              :preview-disabled="true"
              v-bind="dragEvent"
            />
          </template>
        </widget-drag>
      </template>
    </water-fall>
  </div>
</template>
<script lang="ts" setup>
import { getImageListApi } from "@/api/api";
import { WHList } from "@/components/layouts/water-fall/data";

const dataList = ref<any[]>([]);

let page = 1;
let pageSize = 50;
let hasNextPage = true;

// 获取数据
const getList = async () => {
  const data = await getImageListApi();
  console.log("data:", data.data);
  return data.data as any;
  // page++;
  // return new Promise((resolve) => {
  //   const start = (page - 1) * pageSize;
  //   const nextList = WHList.slice(start, start + pageSize);
  //   hasNextPage = !!nextList.length;
  //   // console.log("dataList.value:", dataList.value);
  //   dataList.value = page === 1 ? nextList : dataList.value.concat(nextList);
  //   setTimeout(
  //     () => {
  //       resolve(page === 3 ? [] : nextList);
  //     },
  //     page === 1 ? 2000 : 2000
  //   ); // 模拟发送请求
  // });
};
</script>
<style lang="scss" scoped></style>
