<template>
  <h1>Welcome, {{ username }}</h1>
</template>

<script>
export default {
    name: 'ConsoleIndex',
    data() {
      return {
        username: ''
      }
    },
    created() {
      this.username = this.$store.state.app.username
    },
}
</script>

<style>

</style>