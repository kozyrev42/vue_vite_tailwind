<template>

  <div>
    <div class="badge bg-primary text-wrap">AboutComponent</div> <br/>
    <router-link to="/" class="btn btn-outline-success mb-2">Home</router-link><br>

  </div>


</template>

<script>
export default {
  name: 'AboutComponent',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
