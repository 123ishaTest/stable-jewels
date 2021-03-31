<template>
  <div
      class="p-4 w-72 h-36 border-4 shadow-lg hover-highlight flex flex-row items-center cursor-pointer"
      :class="color"
      @click="action.toggle()">
    <div class="flex flex-col w-full space-y-1">
      <p class="text-center text-white">{{ action.description }}</p>
      <span class="text-center text-white"> <span class="fa fa-clock"/> {{ action.duration | numberFormat }}</span>
      <igt-progress-bar :percentage="progressPercentage" fg-class="bg-gray-600"
                        bg-class="bg-gray-300"></igt-progress-bar>
    </div>
  </div>
</template>

<script>


import IgtProgressBar from "@/components/util/igt-progress-bar";
import {JewelAction} from "@/ig-template/features/action-generator/actions/JewelAction";
import {GainExpAction} from "@/ig-template/features/action-generator/actions/GainExpAction";
import {GainCurrencyAction} from "@/ig-template/features/action-generator/actions/GainCurrencyAction";
import {CurrencyType} from "@/ig-template/features/wallet/CurrencyType";

export default {
  name: "igt-action",
  components: {IgtProgressBar},
  props: {
    action: {
      type: JewelAction,
      required: true,
    },
  },
  computed: {
    color() {
      if (this.action instanceof GainExpAction) {
        return 'bg-green-500 border-green-700'
      }
      if (this.action instanceof GainCurrencyAction) {
        switch (this.action.currency.type) {
          case CurrencyType.Sapphire:
            return 'bg-blue-500 border-blue-700'
          case CurrencyType.Emerald:
            return 'bg-green-500 border-green-700'
          case CurrencyType.Ruby:
            return 'bg-yellow-500 border-yellow-700'
          case CurrencyType.Diamond:
            return 'bg-gray-400 border-gray-500'
        }
      }
      return 'bg-pink-500 border-pink-700'

    },
    isNegative() {
      return this.action.isNegative;
    },
    progress() {
      return this.action.getProgress();
    },
    progressPercentage() {
      return this.progress.getPercentage();
    }
  },

}
</script>

<style scoped>

</style>
