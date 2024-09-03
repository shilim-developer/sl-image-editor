<template>
  <n-input-number
    v-bind="bindValue"
    v-model:value="modalValue"
    @update:value="handleEndInput"
    @blur="handleEndInput"
    @keyup.enter="handleEndInput"
  >
    <template v-for="(_, key) in $slots" :key="key" #[key]="scoped">
      <slot :name="key" v-bind="scoped" v-if="key"></slot>
    </template>
  </n-input-number>
</template>

<script lang="ts" setup>
import { useExtendBindValue } from "@/hooks/use-extend-bind-value";
import { slInputNumberEmits, slInputNumberProps } from "./sl-input-number";
import { useAttrs } from "vue";

const attrs = useAttrs();
const props = defineProps(slInputNumberProps);
const emits = defineEmits(slInputNumberEmits);
const bindValue = useExtendBindValue(props, [slInputNumberEmits, emits], attrs);
const modalValue = ref<number>(props.value || 0);

watchEffect(() => {
  modalValue.value = props.value || 0;
});

function handleEndInput() {
  emits("endInput", modalValue.value);
}
</script>
