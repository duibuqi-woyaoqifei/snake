<template>
  <div id="body">
    <div id="snakeBox">
      <div id="gameBox">
        <SnakeFood v-show="isStart" ref="SnakeFoodRef"></SnakeFood>
        <SnakeBody v-show="isStart" ref="SnakeBodyRef"></SnakeBody>
      </div>
      <div id="scoreboard">
        <div id="score">SCORE:{{ score }}</div>
        <div id="level">LEVEL:{{ level }}</div>
      </div>
    </div>
    <div v-show="!isStart" class="title"><h1>贪吃蛇</h1></div>
    <div v-show="!isStart" class="openBtn">
      <el-button type="primary" @click="GameStart">Start</el-button>
    </div>
    <div v-show="restart" class="title">
      <h1>您的最终分数{{ result }}</h1>
    </div>
    <div v-show="restart" class="openBtn">
      <el-button type="primary" @click="GameRestart">Restart</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, nextTick, watch } from "vue";
import SnakeFood from "./components/SnakeFood.vue";
import SnakeBody from "./components/SnakeBody.vue";
import { GameControl } from "./class/inedx";

const score = ref(0);
const result = ref(0);
const level = ref(1);
const SnakeBodyRef = ref();
const SnakeFoodRef = ref();
const isStart = ref(false);
const restart = ref(false);

const GameStart = () => {
  isStart.value = true;
  nextTick(() => {
    new GameControl(SnakeBodyRef, SnakeFoodRef, score, level);
    watch(
      () => SnakeBodyRef.value.snake.isAlive,
      (newValue: boolean) => {
        if (!newValue) {
          restart.value = true;
          result.value = score.value;
          SnakeBodyRef.value.ResetBody();
        }
      }
    );
  });
};
const GameRestart = () => {
  restart.value = false;
  nextTick(() => {
    SnakeBodyRef.value.CreateSnake();
    SnakeBodyRef.value.snake.X = 2;
    SnakeBodyRef.value.snake.Y = 2;
    new GameControl(SnakeBodyRef, SnakeFoodRef, score, level);
  });
};
</script>

<style scoped>
#body {
  width: 100vw;
  height: 100vh;
  font: bold 20px "Courier";
}
#snakeBox {
  width: 800px;
  height: 800px;
  background-color: #00c9a7;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 10px solid #4b4453;
  border-radius: 40px;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-around;
}
#gameBox {
  width: 708px;
  height: 608px;
  border: 2px solid #4b4453;
  padding: 2px;
  position: relative;
}
#scoreboard {
  display: flex;
  justify-content: space-between;
  width: 700px;
}
.openBtn {
  width: 400px;
  height: 100px;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
}
.openBtn .el-button {
  width: 300px;
  height: 100px;
  border-radius: 50px;
  font-size: 40px;
  letter-spacing: 5px;
}
.title {
  width: 600px;
  height: 100px;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
}
.title h1 {
  letter-spacing: 15px;
  padding-left: 15px;
}
</style>
