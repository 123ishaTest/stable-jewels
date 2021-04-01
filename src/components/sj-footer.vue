<template>
  <div class="w-full p-4 bg-gray-500 shadow-xl flex flex-col items-center justify-around text-white space-y-4">
    <p>123IshaTest Games</p>
    <p>Made with the Incremental Game Template</p>
    <div class="flex flex-row space-x-4 items-center">
      <span>
        <a href="https://discord.gg/AvNpq6Ng6S" target="_blank">
          <img class="w-8 h-8" :src="require('@/assets/socials/discord.png')">
        </a>
      </span>
      <span>
        <a href="https://github.com/123ishaTest/incremental-game-template" target="_blank">
          <img class="w-8 h-8" :src="require('@/assets/socials/github.png')">
        </a>
      </span>
      <span>
        <a href="https://123ishatest.github.io/incremental-game-template-website/" target="_blank">
          <img class="w-8 h-8" :src="require('@/assets/socials/docusaurus.svg')">
        </a>
      </span>
      <span>
            <button class="btn btn-red" @click="resetSave">Reset Save</button>
      </span>
    </div>

  </div>
</template>

<script>
import {App} from "@/App.ts"
import {GameState} from "@/ig-template/GameState";

export default {
  name: "sj-footer",

  methods: {
    resetSave() {
      const confirmed = confirm("Are you sure you want to delete your save? This will not give you any rewards");
      if (!confirmed) {
        return;
      }
      App.game.deleteSave();
      location.reload();
    },
    pauseResume() {
      if (this.isPaused) {
        App.game.resume();
      } else {
        App.game.pause();
      }
    },
  },
  computed: {
    isPaused() {
      return App.game.state === GameState.Paused;
    }
  },
}
</script>

<style scoped>

</style>
