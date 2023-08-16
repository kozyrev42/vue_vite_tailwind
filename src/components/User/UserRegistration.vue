<template>
  <div>
    UserRegistration

    <router-link to="/" class="btn btn-outline-success mb-2">Home</router-link><br>

    <div class="w-25">
      <input v-model="name" type="text"  class="form-control mt-3 mb-3" placeholder="name">
      <input v-model="email" type="email"  class="form-control mt-3 mb-3" placeholder="email">
      <input v-model="password" type="password"  class="form-control mt-3 mb-3" placeholder="password">
      <input v-model="password_confirmation" type="password"  class="form-control mt-3 mb-3" placeholder="confirm password">
      <input @click.prevent="userRegistration" type="submit" class="btn btn-primary">
    </div>
  </div>
</template>

<script>
import api from "../../api";

export default {
  name: "UserRegistration",

  data() {
    return {
      name: null,
      email: null,
      password: null,
      password_confirmation: null
    }
  },

  methods: {
    userRegistration() {
      api.post('/api/user/registration',
          {
            name: this.name,
            email: this.email,
            password: this.password,
            password_confirmation: this.password_confirmation
          })
        .then(response => {
          console.log(response)
          // помещаем токен в localStorage
          localStorage.setItem('social_access_token', response.data.access_token)
          // переход на страницу Home
          this.$router.push({name: 'home'})

        })

        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>

</style>