<template>
  <div class="h-screen w-full flex flex-wrap items-center justify-center">
    <h1 class="font-bold text-xl">UserName {{ getUserName }}</h1>
    
    <div class="w-full">
      <router-link to="/test">Test</router-link>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    getUserName() {
      return this.$store.getters.getUserName
    }
  }
}
</script>

<style>

</style>