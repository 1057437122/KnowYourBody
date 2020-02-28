<template>
  <div class="home">
    <img alt="teacher say" style="width:200px" src="../assets/logo.png" />
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
