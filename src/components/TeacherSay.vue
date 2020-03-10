<template>
  <div class="teacherSay">
    <el-progress
      :percentage="percentage"
      :text-inside="false"
      :show-text="false"
      :color="customColors"
    ></el-progress>
    <h1>{{ msg }}</h1>
    <el-row>
      <div v-for="item in randImags" :key="item">
        <el-col :span="8">
          <el-image
            @click="setChoice(item)"
            style="width: 100px; height: 100px"
            :src="require(`@/assets/images/${item}.png`)"
            fit="fit"
          ></el-image>
        </el-col>
      </div>
      <el-image
        @click="setChoice('skip')"
        style="width: 100px; height: 100px"
        :src="require(`@/assets/images/skip.png`)"
        fit="fit"
      ></el-image>
    </el-row>

    <el-form ref="form" label-width="100px">
      <el-form-item :label="$t('intervalTime')">
        <el-input
          :placeholder="$t('pleaseInputIntervalTime')"
          v-model="playInterval"
          :disabled="isPlaying"
        ></el-input>
      </el-form-item>
      <el-form-item :label="$t('autoStopTime')">
        <el-input
          :placeholder="$t('pleaseInputAutoStopTime')"
          v-model="autoStopTime"
          :disabled="isPlaying"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="start" :disabled="isPlaying" type="primary">{{$t("start")}}</el-button>
        <el-button @click="stop" :disabled="!isPlaying" type="danger">{{$t("stop")}}</el-button>
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
      parts: ["boca", "nariz", "oreja", "mano", "ojo", "pierna", "pie", "pelo"],
      isPlaying: false,
      playInterval: 5,
      randImags: [],
      containerLength: 0,
      answer: null,
      isAnswered: false,
      items: [],
      lastItem: null,
      skipClick: true, // if this is true, then must click 'skip' image when without 'teacher say',
      autoStopTime: 20,
      countQuestions: 0,
      countCorrectQuestions: 0,
      percentage: 0,
      customColors: [
        { color: "#f56c6c", percentage: 100 },
        { color: "#e6a23c", percentage: 80 },
        { color: "#5cb87a", percentage: 60 },
        { color: "#1989fa", percentage: 40 },
        { color: "#6f7ad3", percentage: 20 }
      ],
      progressInterval: null
    };
  },
  mounted() {
    //
    this.randImags = _.shuffle(this.parts);
    this.containerLength = Math.ceil(this.randImags.length / 3);
  },
  methods: {
    clear() {
      this.progressBarStop();
      this.items = [];
      this.isPlaying = false;
      this.countQuestions = 0;
      this.countCorrectQuestions = 0;
      this.lastItem = null;
      this.isAnswered = false;
      this.answer = null;
      this.percentage = 0;
    },
    processQuestion() {
      // add last item
      if (this.lastItem !== null) {
        // fix skip result
        if (
          this.answer === "skip" &&
          this.skipClick === false &&
          this.lastItem.answer === null
        ) {
          this.lastItem.correct = 1;
        }
        this.items.push(this.lastItem);
      }
      // check if reached auto stop times
      if (this.items.length >= this.autoStopTime) {
        this.stop();
        console.log("reached times");
        return;
      }
      this.countQuestions += 1;
      this.progressBarStop();

      this.isAnswered = false;
      // reset progressBar
      this.progressBarStart();
      let question;
      //create a random number from 0 to 4
      const num = Math.floor(Math.random() * 5);
      let path;
      // set if add 'teacher say' or no
      const ifTeacherSay = Math.floor(Math.random() * 9);
      console.log("now if teacher say:" + ifTeacherSay);
      if (ifTeacherSay < 7) {
        //this is right question, students should answer
        path = require(`@/assets/sounds/${this.parts[num]}.wav`);
        question = this.parts[num];
        this.answer = question;
      } else {
        path = require(`@/assets/sounds/${this.parts[num]}_1.wav`); // without teachersay, should skip
        question = this.parts[num] + "_1";
        this.answer = "skip";
      }
      // question is answer
      this.lastItem = { question: question, answer: null, correct: 0 };
      this.playSound(path);
    },
    start() {
      // check if parameter is set
      if ((this.playInterval === "") | (this.playInterval < 3)) {
        this.playInterval = 3;
      }
      if ((this.autoStopTime === "") | (this.autoStopTime === 0)) {
        this.autoStopTime = 5;
      }
      //clear and create random images
      this.clear();
      this.randImags = _.shuffle(this.parts);
      // each question handler
      this.interval = setInterval(() => {
        this.processQuestion();
      }, 1000 * this.playInterval);
      this.isPlaying = true;
    },
    stop() {
      clearInterval(this.interval);
      // history
      console.log(this.items);
      // count result
      const res = (
        (10 * this.countCorrectQuestions) /
        this.countQuestions
      ).toFixed(1);
      this.$notify({
        title: this.$t("result"),
        message: this.$createElement(
          "div",
          { style: "color: green;font-size:30px;" },
          this.$t("yourRecordIs") + res
        ),
        duration: 0,
        type: "success"
      });
      this.clear();
    },
    playSound(filePath) {
      var sound = new Howl({
        src: filePath,
        volume: 0.5
      });
      console.log("playing " + filePath);
      sound.play();
    },
    progressBarStart() {
      this.percentage = 0;
      // progress bar
      // const start = 0;
      this.progressInterval = setInterval(() => {
        if (this.percentage >= 100) {
          this.progressBarStop();
        }
        this.percentage += 100 / (this.playInterval * 10);
      }, 100);
    },
    progressBarStop() {
      this.percentage = 100;
      clearInterval(this.progressInterval);
    },
    setChoice(item) {
      console.log(item);
      if (this.isPlaying) {
        if (this.isAnswered) {
          this.$notify({
            title: this.$t("isAnswered"),
            type: "warning"
          });
        } else {
          if (this.answer === item) {
            // set last item result
            this.lastItem.correct = 1;
            this.lastItem.answer = item;
            this.$notify({
              title: this.$t("correct"),
              type: "success"
            });
            this.countCorrectQuestions += 1;
          } else {
            this.lastItem.correct = 0;
            this.lastItem.answer = item;
            this.$notify({
              title: this.$t("wrong"),
              type: "error"
            });
          }
          this.isAnswered = true;
        }
      } else {
        this.$notify({
          title: this.$t("pleaseStartFirst"),
          type: "warning"
        });
      }
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
