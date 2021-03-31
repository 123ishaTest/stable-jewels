<template>
  <div class="flex flex-row justify-center">
    <span>{{ currency.amount }}</span>
    <span v-if="currency.type === CurrencyType.Sapphire">
            <img class="w-8 h-8" :src="require('@/assets/images/currencies/sapphire.svg')">
    </span>
    <span v-if="currency.type === CurrencyType.Emerald">
            <img class="w-8 h-8" :src="require('@/assets/images/currencies/emerald.svg')">
    </span>
    <span v-if="currency.type === CurrencyType.Ruby">
            <img class="w-8 h-8" :src="require('@/assets/images/currencies/ruby.svg')">
    </span>
    <span v-if="currency.type === CurrencyType.Diamond">
            <img class="w-8 h-8" :src="require('@/assets/images/currencies/diamond.svg')">
    </span>
  </div>
</template>

<script>

import {Currency} from "@/ig-template/features/wallet/Currency";
import {CurrencyType} from "@/ig-template/features/wallet/CurrencyType";

export default {
  name: "sj-currency",
  props: {
    currency: {
      type: Currency,
      required: true,
    },
  },
  data() {
    return {
      CurrencyType: CurrencyType,
    }
  },

}
</script>

<style scoped>

</style>
