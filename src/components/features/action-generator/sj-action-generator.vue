<template>
  <igt-feature class="text-white">

    <igt-exp-level :exp-level="level"></igt-exp-level>

    <div class="flex flex-row flex-wrap">
      <sj-time-upgrade :upgrade="refreshUpgrade" :can-buy="generator.canAfford(refreshUpgrade)"
                       @click.native="generator.buyUpgrade(refreshUpgrade)"></sj-time-upgrade>
      <igt-upgrade :upgrade="maxActionUpgrade" :can-buy="generator.canAfford(maxActionUpgrade)"
                   @click.native="generator.buyUpgrade(maxActionUpgrade)"></igt-upgrade>
      <igt-upgrade :upgrade="negativeRateUpgrade" :can-buy="generator.canAfford(negativeRateUpgrade)"
                   @click.native="generator.buyUpgrade(negativeRateUpgrade)"></igt-upgrade>

      <igt-upgrade :upgrade="betterGems" :can-buy="generator.canAfford(betterGems)"
                   @click.native="generator.buyUpgrade(betterGems)"></igt-upgrade>

      <igt-single-level-upgrade :upgrade="highlightNegativeUpgrade"
                                :can-buy="generator.canAfford(highlightNegativeUpgrade)"
                                @click.native="generator.buyUpgrade(highlightNegativeUpgrade)"></igt-single-level-upgrade>


      <igt-upgrade :upgrade="locks" :can-buy="generator.canAfford(locks)"
                   @click.native="generator.buyUpgrade(locks)"></igt-upgrade>

    </div>

    <div class="my-2 flex flex-col">
      <div class="flex flex-row justify-between">
        <span>Refreshing in...</span>
        <span class=""><span class="fa fa-clock"></span> {{ generator.switchTime }}</span>
      </div>
      <igt-progress-bar :percentage="refreshProgress" fg-class="bg-gray-500" bg-class="bg-gray-600"></igt-progress-bar>

    </div>
    <div class="flex flex-row flex-wrap">
      <igt-action :action="action"
                  :index="index"
                  @lock="lock"
                  :highlight-negatives="highlightNegatives"
                  class="m-2"
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
import SjTimeUpgrade from "@/components/tools/upgrades/sj-time-upgrade";
import IgtUpgrade from "@/components/tools/upgrades/igt-discrete-upgrade";
import IgtSingleLevelUpgrade from "@/components/tools/upgrades/igt-single-level-upgrade";

export default {
  name: "sj-action-generator",
  components: {IgtSingleLevelUpgrade, IgtUpgrade, SjTimeUpgrade, IgtProgressBar, IgtAction, IgtExpLevel, IgtFeature},
  data() {
    return {
      generator: App.game.features.actionGenerator,
    }
  },
  computed: {
    highlightNegativeUpgrade() {
      return this.generator.highlightNegatives;
    },
    highlightNegatives() {
      return this.generator.highlightNegativeActions;
    },
    locks() {
      return this.generator.locks;
    },
    betterGems() {
      return this.generator.betterGems;
    },
    refreshUpgrade() {
      return this.generator.refreshDurationUpgrade
    },
    maxActionUpgrade() {
      return this.generator.maxActionsUpgrade
    },
    negativeRateUpgrade() {
      return this.generator.negativeRateUpgrade
    },
    upgrades() {
      return this.generator.upgrades;
    },
    refreshProgress() {
      return Math.min(1, Math.max(0, this.generator.checkCounter / this.generator.switchTime))
    },
    actions() {
      return this.generator.actions;
    },
    level() {
      return this.generator.playerLevel;
    }
  },
  methods: {
    lock(index, lock) {
      if (lock) {
        this.generator.lock(index);
      } else {
        this.generator.unlock(index);
      }
    }
  },

}
</script>

<style scoped>

</style>
