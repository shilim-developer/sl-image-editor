import { remove } from 'lodash';
<template>
  <slot @mousedown.catch="handleMouseDown" @dragstart="() => false"></slot>
</template>
<script lang="ts" setup>
let target;
const position = {
  x: 0,
  y: 0,
};
const handleMouseDown = (e) => {
  e.stopPropagation();
  e.preventDefault();
  const copyElement = e.target.cloneNode(true);
  copyElement.style.width = e.target.offsetWidth + "px";
  copyElement.style.height = e.target.offsetHeight + "px";
  copyElement.style.position = "fixed";
  copyElement.style.zIndex = 9999;
  copyElement.style.left = e.target.getBoundingClientRect().left + "px";
  copyElement.style.top = e.target.getBoundingClientRect().top + "px";
  document.body.appendChild(copyElement);
  target = copyElement;
  position.x = e.clientX;
  position.y = e.clientY;
  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("mouseup", handleMouseUp);
  //   copyElement.addEventListener("mouseleave", handleMouseMove);
};

const handleMouseMove = (e) => {
  target.style.transform =
    "translate(" +
    (e.clientX - position.x) +
    "px, " +
    (e.clientY - position.y) +
    "px)";
  //   console.log("handleMouseMove", e);
};

const handleMouseUp = (e) => {
  window.removeEventListener("mousemove", handleMouseMove);
  window.removeEventListener("mouseup", handleMouseUp);
  target.style.transition = "transform 0.5s ease";
  target.style.transform = "translate(0px, 0px)";
  setTimeout(() => {
    target.remove();
  }, 500);
};
</script>
<style lang="scss" scoped></style>
