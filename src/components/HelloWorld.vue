<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <el-container>
      <el-col :span="8" v-for="(item,index) in randImags" :key="item">
        <el-image style="width: 100px; height: 100px" src="./images/boca.png" fit="fit"></el-image>
        <div v-if="index % 3 ==0"></div>
      </el-col>
    </el-container>
    <el-form ref="form" label-width="100px">
      <el-form-item label="间隔时间">
        <el-input placeholder="请输入间隔时间" v-model="playInterval" :disabled="isPlaying"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="start" :disabled="isPlaying" type="primary">开始</el-button>
        <el-button @click="stop" :disabled="!isPlaying" type="danger">结束</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Howl } from "howler";
import _ from "lodash";
export default {
  props: {
    msg: String
  },
  data() {
    return {
      name: "MyFace",
      interval: null,
      parts: ["boca", "nariz", "oreja", "pelo", "pierna"],
      isPlaying: false,
      playInterval: 3,
      randImags: []
    };
  },
  mounted() {
    //
    this.randImags = _.shuffle(this.parts);
    console.log(this.randImags);
  },
  methods: {
    start() {
      // alert("abc");
      this.interval = setInterval(() => {
        //create a random number from 0 to 4
        const num = Math.floor(Math.random() * 5);
        const path = `/sounds/${this.parts[num]}.m4a`;
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
container {
  padding-left: 5rem;
  padding-right: 5rem;
}
</style>
