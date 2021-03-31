<template>
  <div class="w-full h-20 bg-gray-500 shadow-xl flex flex-row items-center justify-center text-white">
    <div class="p-4 flex flex-row items-center" title="Sapphire">
      <span class="m-2 text-lg">{{ sapphire }}</span>
      <img class="w-8 h-8" :src="require('@/assets/images/currencies/sapphire.svg')">
    </div>
    <div class="p-4 flex flex-row items-center" title="Emerald">
      <span class="m-2 text-lg">{{ emerald }}</span>
      <img class="w-8 h-8" :src="require('@/assets/images/currencies/emerald.svg')">
    </div>

    <div class="p-4 flex flex-row items-center" title="Ruby">
      <span class="m-2 text-lg">{{ ruby }}</span>
      <img class="w-8 h-8" :src="require('@/assets/images/currencies/ruby.svg')">
    </div>
    <div class="p-4 flex flex-row items-center" title="Diamond">
      <span class="m-2 text-lg">{{ diamond }}</span>
      <img class="w-8 h-8" :src="require('@/assets/images/currencies/diamond.svg')">
    </div>
  </div>
</template>

<script>
import {App} from "@/App.ts"

export default {
  name: "sj-header",
  data() {
    return {
      wallet: App.game.features.wallet,
    }
  },
  computed: {
    sapphire() {
      return this.wallet.sapphire;
    },
    emerald() {
      return this.wallet.emerald;
    },
    ruby() {
      return this.wallet.ruby;
    },
    diamond() {
      return this.wallet.diamond;
    },
  },

}
</script>

<style scoped>

</style>
