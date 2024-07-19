<template>
  <n-config-provider
    class="w-full h-full flex flex-col overflow-hidden"
    :theme-overrides="themeOverrides"
  >
    <n-message-provider>
      <router-view />
    </n-message-provider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { NConfigProvider, GlobalThemeOverrides } from "naive-ui";
import {
  buildExpressionTree,
  evaluatePostfix,
  infixToPostfix,
} from "./utils/decimal";

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: "#2080F0FF",
    primaryColorHover: "#4098FCFF",
    primaryColorPressed: "#1060C9FF",
    primaryColorSuppl: "#4098FCFF",
  },
};

let infixExpression = "sin(30.6+4) + 4 * cos(45)";

console.log(Math.sin(30.6 + 4) + 4 * Math.cos(45));

// let infixExpression = "( 1 + 2 ) * 3";

let postfixExpression = infixToPostfix(infixExpression);
console.log("后缀表达式:", postfixExpression); // 输出后缀表达式
let result = evaluatePostfix(postfixExpression);
console.log("计算结果:", result.toString()); // 输出计算结果
</script>
