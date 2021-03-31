<template>
  <igt-feature class="text-white" >
    Actions
  </igt-feature>
</template>

<script>
import {App} from "@/App.ts"
import IgtFeature from "@/components/util/igt-feature";

export default {
  name: "sj-action-generator",
  components: {IgtFeature},
  data() {
    return {
      generator: App.game.features.actionGenerator,
    }
  },

}
</script>

<style scoped>

</style>
