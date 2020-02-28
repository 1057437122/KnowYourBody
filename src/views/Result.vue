<template>
  <div class="result">
    <img alt="teacher say" style="width:200px" src="../assets/logo.png" />
    <div
      class="summary"
    >{{ $t('youHaveAnswered')+countQuestions+$t('countQuestions')+$t('including')+ countCorrectQuestions+$t('countCorrectQuestions')+countErrorQuestions+$t('countErrorQuestions')+$t('comeOn') }}</div>
    <el-table stripe :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
      <el-table-column label="Q">
        <template slot-scope="scope">{{ $t(scope.row.question) }}</template>
      </el-table-column>
      <el-table-column label="A">
        <template slot-scope="scope">{{ $t(scope.row.answer) }}</template>
      </el-table-column>
      <el-table-column label="R">
        <template slot-scope="scope">
          <div v-if="scope.row.correct===1">{{ $t('correct') }}</div>
          <div v-else>{{ $t('wrong') }}</div>
        </template>
      </el-table-column>
    </el-table>
    <br />
    <el-button type="primary" @click="replay">{{$t('replay')}}</el-button>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
type questionObj = {
  question?: string;
  answer?: string;
  correct?: number;
};
export default Vue.extend({
  data() {
    return {
      countQuestions: 0,
      countErrorQuestions: 0,
      countCorrectQuestions: 0,
      items: [{}],
      tableData: [{}]
    };
  },
  mounted() {
    console.log(JSON.parse(localStorage.result));
    this.items = JSON.parse(localStorage.result) as questionObj[];
    if (this.items.length !== 0) {
      //
      this.tableData = this.items;
      this.countQuestions = this.items.length;
      this.items.forEach((element: questionObj) => {
        if (element.correct === 1) {
          this.countCorrectQuestions += 1;
        } else {
          this.countErrorQuestions += 1;
        }
      });
    } else {
      this.$alert(
        this.$t("pleasePlayGameFirst") as string,
        this.$t("title") as string,
        {
          confirmButtonText: "OK",
          callback: action => {
            this.$router.push("/teacher-say");
          }
        }
      );
    }
  },
  methods: {
    replay() {
      localStorage.clear();
      this.$router.push("/teacher-say");
    },
    tableRowClassName({ row }) {
      console.log(row);
      if (row.correct === 1) {
        return "warning-row";
      } else {
        return "success-row";
      }
      return "";
    }
  }
});
</script>
<style scoped>
.el-table .warning-row {
  background: oldlace;
}
.el-table .success-row {
  background: #f0f9eb;
}
.summary {
  padding: 10px;
  background-color: oldlace;
}
</style>