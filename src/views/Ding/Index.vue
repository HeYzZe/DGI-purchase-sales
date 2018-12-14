<template>
  <router-view/>
</template>

<script>
export default {
  name: 'Index',
  created() {
    this.$store.dispatch('GET_USER_INFO').then(() => {
      this.$store.dispatch('GET_TOKEN');
    });
  },
};
</script>

<style>

</style>
