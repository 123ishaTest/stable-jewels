<template>
  <button class="btn btn-blue" :disabled="!canBuy">
    <span class="flex flex-col">
      <span>{{ upgrade.displayName }}</span>
      <span v-if="!upgrade.isMaxLevel()">
        <sj-currency :currency="upgrade.getCost()"></sj-currency>
      </span>
      <span v-else>Bought</span>
    </span>
  </button>
</template>

<script>
import SjCurrency from "@/components/features/action-generator/sj-currency";
import {SingleLevelUpgrade} from "@/ig-template/tools/upgrades/SingleLevelUpgrade";

export default {
  name: "igt-single-level-upgrade",
  components: {SjCurrency},
  props: {
    upgrade: {
      type: SingleLevelUpgrade,
      required: true,
    },
    canBuy: {
      type: Boolean,
      required: true,
    }
  },

}
</script>

<style scoped>

</style>
