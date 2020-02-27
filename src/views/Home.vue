<template>
  <div class="home">
    <img alt="Vue logo" style="width:130px" src="../assets/logo.png" />
    <TeacherSay :msg="msg" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TeacherSay from "@/components/TeacherSay.vue"; // @ is an alias to /src

@Component({
  components: {
    TeacherSay
  }
})
export default class Home extends Vue {
  data() {
    return {
      msg: this.$t("teacherSay")
    };
  }
}
</script>
