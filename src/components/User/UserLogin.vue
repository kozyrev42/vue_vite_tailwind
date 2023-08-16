<template>
  <div>
    <div>
      UserLogin
    </div>

    <router-link to="/" class="btn btn-outline-success mb-2">Home</router-link><br>

    <router-link to="/user/registration" class="btn btn-primary">Registration</router-link><br/><br/>

    <div class="w-50">
      <input v-model="email" type="email" id="email" class="form-control mt-3 mb-3" placeholder="email">
      <input v-model="password" type="password" id="password" class="form-control mt-3 mb-3" placeholder="password">


      <div v-if="error" class="alert alert-danger" role="alert">
        {{ error }}
      </div>

      <input @click.prevent="login" type="submit" class="btn btn-primary">
    </div>

  </div>
</template>

<script>
import api from "../../api";

export default {
  name: "UserLogin",

  data() {
    return {
      email: null,
      password: null,
      error: null
    }
  },

  methods: {
    login() {
      api.post('/api/auth/login',
          {
            email: this.email,
            password: this.password
          })
        .then(response => {
          // помещаем токен в localStorage
          localStorage.setItem('social_access_token', response.data.access_token)

          // переход на страницу Home
          this.$router.push({name: 'home'})
        })

        .catch(error => {
          console.log(error)
          // в this.error помещаем сообщение об ошибке
          this.error = error.response.data.error
        })
    }
  }
}
</script>

<style scoped>

</style>