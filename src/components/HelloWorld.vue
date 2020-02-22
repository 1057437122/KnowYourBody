<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <h3>Essential Links</h3>

    <h3>Ecosystem</h3>
    <input v-model="playInterval" :disabled="isPlaying" />
    <button @click="start" :disabled="isPlaying">Start</button>
    <button @click="stop" :disabled="!isPlaying">Stop</button>
  </div>
</template>

<script>
import { Howl } from "howler";
export default {
  props: {
    msg: String
  },
  data() {
    return {
      name: "MyFace",
      interval: null,
      musics: ["boca", "nariz", "oreja", "pelo", "pierna"],
      isPlaying: false,
      playInterval: 3
    };
  },
  methods: {
    start() {
      // alert("abc");
      this.interval = setInterval(() => {
        //create a random number from 0 to 4
        const num = Math.floor(Math.random() * 5);
        const path = `/${this.musics[num]}.m4a`;
        this.playSound(path);
      }, 1000 * this.playInterval);
      this.isPlaying = true;
    },
    stop() {
      clearInterval(this.interval);
      this.isPlaying = false;
    },
    playSound(filePath) {
      var sound = new Howl({
        src: filePath,
        volume: 0.5
      });
      sound.play();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
