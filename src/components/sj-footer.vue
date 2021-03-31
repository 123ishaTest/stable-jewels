<template>
  <div class="w-full h-32 bg-gray-500 shadow-xl flex flex-col items-center justify-around text-white">
    <p>123IshaTest Games</p>
    <p>Made with the Incremental Game Template</p>
    <div class="flex flex-row space-x-4">
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
    </div>
  </div>
</template>

<script>
export default {
  name: "sj-footer",


}
</script>

<style scoped>

</style>
