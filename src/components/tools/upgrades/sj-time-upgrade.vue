<template>
  <button class="btn btn-blue" :disabled="!canBuy">
    <span class="flex flex-col">
      <span>{{ upgrade.displayName }}</span>
      <span>Lvl. {{ upgrade.level }} / {{ upgrade.maxLevel }}</span>
      <span><span class="fa fa-clock"></span>
        {{ upgrade.getBonus() | numberFormat }}
          <span v-if="!upgrade.isMaxLevel()">
            (+{{ upgrade.getUpgradeBonus() | numberFormat }})
          </span>
      </span>
      <span v-if="!upgrade.isMaxLevel()">
        <sj-currency :currency="upgrade.getCost()"></sj-currency>
      </span>
      <span v-else>Max</span>
    </span>
  </button>
</template>

<script>


import {AbstractUpgrade} from "@/ig-template/tools/upgrades/AbstractUpgrade";
import SjCurrency from "@/components/features/action-generator/sj-currency";

export default {
  name: "sj-time-upgrade",
  components: {SjCurrency},
  props: {
    upgrade: {
      type: AbstractUpgrade,
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
