<template>
  <div class="gameOver" v-if="gameOver">
    <h2>Вы проиграли !</h2>
    <button @click="gameOver = false">Новая игра</button>
  </div>
  <div class="main" v-else>
    <h2>Раунд: {{ arrayColor.length }}</h2>
    <div class="gameField">
      <div
        @click="startGame ? null : userClickEl(1)"
        ref="el1"
        class="gameField__one"
      ></div>
      <div
        @click="startGame ? null : userClickEl(2)"
        ref="el2"
        class="gameField__two"
      ></div>
      <div
        @click="startGame ? null : userClickEl(3)"
        ref="el3"
        class="gameField__three"
      ></div>
      <div
        @click="startGame ? null : userClickEl(4)"
        ref="el4"
        class="gameField__four"
      ></div>
    </div>
    <div>
      <select v-model="complexity">
        <option value="" disabled>Выберите сложность</option>
        <option value="1500">Легкая</option>
        <option value="1000">Средняя</option>
        <option value="400">Тяжелая</option>
      </select>
    </div>
    <div>
      <label for="sound">Включить звук</label>
      <input v-model="sound" type="checkbox" name="sound" id="sound" />
    </div>

    <button
      v-if="startGame"
      @click="newRound(+complexity)"
      :disabled="complexity === ''"
    >
      Старт
    </button>
  </div>
</template>

<script>
import audioFileOne from './sounds/1.mp3';
import audioFileTwo from './sounds/2.mp3';
import audioFileThree from './sounds/3.mp3';
import audioFileFour from './sounds/4.mp3';

export default {
  data() {
    return {
      arrayColor: [],
      userClick: [],
      complexity: '',
      gameOver: false,
      startGame: true,
      sound: true,
    };
  },
  methods: {
    newRound(val) {
      this.arrayColor.push(Math.floor(1 + Math.random() * (4 + 1 - 1)));
      this.startInterval(val);
      this.startGame = false;
    },
    startInterval(val) {
      setTimeout(() => {
        this.arrayColor.forEach((el, index) => {
          setTimeout(() => {
            if (this.sound === true) {
              this.playAudio(el - 1);
            }
            let refName = `el${el}`;
            let classList = this.$refs[refName].classList;
            classList.add('clickElement');
            setTimeout(() => {
              classList.remove('clickElement');
            }, 200);
          }, val * index);
        });
      }, 2000);
    },
    clearInterval() {
      clearInterval(this.intervalId);
    },
    userClickEl(id) {
      let refName = `el${id}`;
      let classList = this.$refs[refName].classList;
      classList.add('clickElement');
      setTimeout(() => {
        classList.remove('clickElement');
      }, 200);
      if (this.sound === true) {
        this.playAudio(id - 1);
      }
      this.userClick.push(id);
      if (
        this.userClick[this.userClick.length - 1] ===
        this.arrayColor[this.userClick.length - 1]
      ) {
        if (this.userClick.length === this.arrayColor.length) {
          this.userClick = [];
          this.newRound(+this.complexity);
        }
      } else {
        (this.arrayColor = []),
          (this.userClick = []),
          (this.complexity = ''),
          (this.gameOver = true);
        this.startGame = true;
      }
    },
    playAudio(num) {
      let audio = [
        new Audio(audioFileOne),
        new Audio(audioFileTwo),
        new Audio(audioFileThree),
        new Audio(audioFileFour),
      ];
      audio[num].play();
    },
  },
};
</script>

<style lang="sass" scoped>
.gameField
  width: 30rem
  height: 30rem
  display: flex
  flex-wrap: wrap
  border-radius: 100%
  overflow: hidden
  border: .3rem solid black
  margin-bottom: 2rem
  &__one
    background-color: red
    width: 15rem
    height: 15rem
    opacity: .5
  &__two
    background-color: blue
    width: 15rem
    height: 15rem
    opacity: .5
  &__three
    background-color: green
    width: 15rem
    height: 15rem
    opacity: .5
  &__four
    background-color: yellow
    width: 15rem
    height: 15rem
    opacity: .5

.main
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  text-align: center
  font-size: 2rem
  h2
    font-size: 2.5rem
    margin-bottom: 3rem
  select
    width: 30rem
    height: 3rem
    font-size: 1.7rem
    margin-bottom: 1.5rem
  input
    width: 5rem
    height: 1.8rem
    margin-bottom: 2rem
  button
    width: 15rem
    height: 4rem
    font-size: 2rem
    border: none
    color: white
    background-color: SteelBlue
    border-radius: 1rem
    &:disabled
      opacity: .1
    &:hover
      opacity: .7

.clickElement
  opacity: 1

.gameOver
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  h2
    font-size: 2.5rem
    margin-bottom: 2rem
  button
    width: 15rem
    height: 4rem
    font-size: 2rem
    border: none
    color: white
    background-color: SteelBlue
    border-radius: 1rem
    &:disabled
      opacity: .1
    &:hover
      opacity: .7
</style>
