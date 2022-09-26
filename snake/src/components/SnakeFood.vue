<template>
  <div id="food"></div>
</template>

<script lang="ts" setup>
import { onMounted, type Ref, ref } from "vue";
import { Food } from "../class/inedx";

const food: Ref<Food> = ref();

onMounted(() => {
  food.value = new Food();
});

defineExpose({
  food,
});
</script>

<style scoped>
#food {
  width: 10px;
  height: 10px;
  position: absolute;
  top: 100px;
  left: 100px;
  background-color: #4b4453;
}
</style>
