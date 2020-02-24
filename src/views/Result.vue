<template>
  <div class="result">
    <div
      class="summary"
    >{{ $t('youHaveAnswered')+countQuestions+$t('countQuestions')+$t('including')+ countErrorQuestions+$t('countErrorQuestions')+countCorrectQuestions+$t('countCorrectQuestions')+$t('comeOn') }}</div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    items: []
  },
  data() {
    return {
      countQuestions: 0,
      countErrorQuestions: 0,
      countCorrectQuestions: 0
    };
  }
});
</script>