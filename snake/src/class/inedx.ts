import type { Ref } from "vue";

class Food {
  element: HTMLElement;

  constructor() {
    this.element = document.getElementById("food");
    this.GenerateCoordinate();
  }

  // 获取 X 轴坐标
  get X() {
    return this.element.offsetLeft;
  }

  // 获取 Y 轴坐标
  get Y() {
    return this.element.offsetTop;
  }

  // 调用函数随机生成新坐标
  GenerateCoordinate() {
    const top = Math.floor(Math.random() * 60) * 10 + 2;
    const left = Math.floor(Math.random() * 70) * 10 + 2;

    this.element.style.top = top + "px";
    this.element.style.left = left + "px";
  }
}

class Snake {
  element: HTMLElement;
  head: HTMLElement;
  bodies: HTMLCollection;
  direction: string;
  isAlive: boolean;
  level: number;

  constructor(public AddBody: Function) {
    this.element = document.getElementById("snake");
    this.head = document.querySelector("#snake > #head");
    this.bodies = document.getElementById("snake").getElementsByTagName("div");
    this.direction = "ArrowRight";
    this.isAlive = true;
    this.level = 1;
  }

  // 蛇头 X 坐标
  get X() {
    return this.head.offsetLeft;
  }

  // 蛇头 Y 坐标
  get Y() {
    return this.head.offsetTop;
  }

  // 设置蛇头 X 坐标
  set X(value: number) {
    this.head.style.left = value + "px";
  }

  // 设置蛇头 Y 坐标
  set Y(value: number) {
    this.head.style.top = value + "px";
  }

  // 蛇身增加
  AddOntology() {
    // this.element.insertAdjacentHTML("beforeend", "<div></div>");
    this.AddBody();
  }

  // 蛇身跟随
  BodyFollow() {
    // eslint-disable-next-line for-direction
    for (let i = this.bodies.length - 1; i > 0; i--) {
      const X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
      const Y = (this.bodies[i - 1] as HTMLElement).offsetTop;

      (this.bodies[i] as HTMLElement).style.left = X + "px";
      (this.bodies[i] as HTMLElement).style.top = Y + "px";
    }
  }

  // 蛇运动
  Run(food: Food, callback: Function) {
    if (!this.isAlive) return;
    const left = this.X;
    const top = this.Y;

    if (left < 2 || left > 692 || top < 2 || top > 592) {
      return (this.isAlive = false);
    }

    switch (this.direction) {
      case "ArrowUp":
        this.Y = top - 10;
        break;
      case "ArrowDown":
        this.Y = top + 10;
        break;
      case "ArrowLeft":
        this.X = left - 10;
        break;
      case "ArrowRight":
        this.X = left + 10;
        break;
    }
    this.Selfing();
    setTimeout(() => {
      this.BodyFollow();
      if (this.IsEat(food.X, food.Y)) {
        food.GenerateCoordinate();
        this.level = callback();
        this.AddOntology();
      }

      this.Run(food, callback);
    }, 100 - this.level * 20);
  }

  // 吃食物
  IsEat(X: number, Y: number) {
    return X === this.X && Y === this.Y;
  }

  // 禁止调头
  IsChangeDirection(newDirection: string) {
    if (this.direction == "ArrowUp" && newDirection == "ArrowDown") {
      return;
    }
    if (this.direction == "ArrowDown" && newDirection == "ArrowUp") {
      return;
    }
    if (this.direction == "ArrowLeft" && newDirection == "ArrowRight") {
      return;
    }
    if (this.direction == "ArrowRight" && newDirection == "ArrowLeft") {
      return;
    } else {
      this.direction = newDirection;
    }
  }

  // 蛇头碰蛇身
  Selfing() {
    for (let i = this.bodies.length - 1; i > 0; i--) {
      const body = this.bodies[i] as HTMLElement;
      if (this.X === body.offsetLeft && this.Y === body.offsetTop) {
        return (this.isAlive = false);
      }
    }
  }
}

class GameControl {
  keylock: boolean;

  constructor(
    public SnakeBodyRef: Ref,
    public SnakeFoodRef: Ref,
    public score: Ref,
    public level: Ref
  ) {
    this.keylock = false;
    this.init();
  }

  // 初始化游戏
  init() {
    document.addEventListener("keydown", this.KeydownHandle.bind(this));
    this.score.value = 0;
    this.level.value = 1;
    this.SnakeFoodRef.value.food = new Food();
    this.SnakeBodyRef.value.snake.Run(
      this.SnakeFoodRef.value.food,
      this.AddScore.bind(this)
    );
  }

  // 键盘监听
  KeydownHandle(event: KeyboardEvent) {
    if (this.keylock) {
      setTimeout(() => {
        this.SnakeBodyRef.value.snake.IsChangeDirection(event.key);
      }, 100 - this.level.value * 20);
    } else {
      this.SnakeBodyRef.value.snake.IsChangeDirection(event.key);
    }

    this.keylock = true;
    setTimeout(() => {
      this.keylock = false;
    }, 100 - this.level.value * 20);
  }

  // 加分
  AddScore() {
    this.score.value++;
    if (this.score.value === 3) {
      this.level.value++;
    }
    if (this.score.value === 7) {
      this.level.value++;
    }
    if (this.score.value === 20) {
      this.level.value++;
    }
    return this.level.value;
  }
}
export { Food, Snake, GameControl };
