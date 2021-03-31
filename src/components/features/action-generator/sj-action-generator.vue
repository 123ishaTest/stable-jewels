<template>
  <igt-feature class="text-white">

    <igt-exp-level :exp-level="level"></igt-exp-level>
    <div class="my-2 flex flex-col">
      <span>Refreshing in...</span>
      <span class="absolute right-4"><span class="fa fa-clock"></span> {{ generator.GENERATOR_CHECK_TIME }}</span>
      <igt-progress-bar :percentage="refreshProgress" fg-class="bg-gray-500" bg-class="bg-gray-600"></igt-progress-bar>

    </div>
    <div class="flex flex-row flex-wrap space-x-4">
      <igt-action :action="action"
                  v-for="(action, index) in actions"
                  :key="action.description + '-' + index">
      </igt-action>
    </div>

  </igt-feature>
</template>

<script>
import {App} from "@/App.ts"
import IgtFeature from "@/components/util/igt-feature";
import IgtExpLevel from "@/components/tools/exp-level/igt-exp-level";
import IgtAction from "@/components/tools/actions/igt-action";
import IgtProgressBar from "@/components/util/igt-progress-bar";

export default {
  name: "sj-action-generator",
  components: {IgtProgressBar, IgtAction, IgtExpLevel, IgtFeature},
  data() {
    return {
      generator: App.game.features.actionGenerator,
    }
  },
  computed: {
    refreshProgress() {
      return Math.min(1, Math.max(0, this.generator.checkCounter / this.generator.GENERATOR_CHECK_TIME))
    },
    actions() {
      return this.generator.actions;
    },
    level() {
      return this.generator.playerLevel;
    }
  },

}
</script>

<style scoped>

</style>
