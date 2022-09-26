<template>
  <div id="snake">
    <div id="head"></div>
    <div class="bodies"></div>
    <div class="bodies"></div>
    <div class="bodies"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import type { Ref } from "vue";
import { Snake } from "../class/inedx";
import $ from "jquery";
console.log($());

const snake: Ref<Snake> = ref();

const AddBody = () => {
  let btn = document.getElementById("snake");
  btn.insertAdjacentHTML(
    "beforeend",
    "<div data-v-3f412ae3 class='bodies'></div>"
  );
};
const ResetBody = () => {
  $("div").remove(".bodies");
  for (let i = 0; i < 3; i++) {
    AddBody();
  }
};
const CreateSnake = () => {
  snake.value = new Snake(AddBody);
};

onMounted(() => {
  CreateSnake();
});

defineExpose({
  snake,
  CreateSnake,
  ResetBody,
});
</script>

<style scoped>
#snake > .bodies {
  width: 10px;
  height: 10px;
  background-color: #4b4453;
  position: absolute;
  left: -9999px;
  top: -9990px;
  border: 1px solid #00c9a7;
}
#snake > #head {
  width: 10px;
  height: 10px;
  background-color: #4b4453;
  position: absolute;
  left: 2;
  top: 2;
  border: 1px solid #00c9a7;
}
</style>
