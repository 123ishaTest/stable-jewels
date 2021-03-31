<template>
  <div :class="{'dark': darkMode}">
    <igt-notifications></igt-notifications>
    <div class="flex flex-col h-screen">
      <sj-header></sj-header>
      <sj-action-generator class="flex-grow"></sj-action-generator>
      <sj-footer></sj-footer>
    </div>

  </div>

</template>

<script>
import {App} from "@/App.ts"
import IgtNotifications from "@/components/util/igt-notifications";
import SjActionGenerator from "@/components/features/action-generator/sj-action-generator";
import SjHeader from "@/components/sj-header";
import SjFooter from "@/components/sj-footer";

export default {
  components: {
    SjFooter,
    SjHeader,
    SjActionGenerator,
    IgtNotifications,
  },
  data() {
    return {
      game: App.game
    }
  },
  computed: {
    showDevPanel() {
      return !App.inProduction;
    },
    darkMode() {
      return App.game.features.settings.darkMode.value;
    }
  },
}
</script>

<style>
</style>
