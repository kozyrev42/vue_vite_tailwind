<template>

  <div>
    <div class="">FruitsComponent</div> <br/><br/>
    <router-link to="/" class="">Home</router-link><br>

    <table class="table">
      <thead>
      <tr>
        <th scope="col">id</th>
        <th scope="col">name</th>
        <th scope="col">price</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="fruit in fruits" :key="fruit.id">
        <th scope="row">{{ fruit.id }}</th>
        <td>{{ fruit.name }}</td>
        <td>{{ fruit.price }}</td>
      </tr>
      </tbody>
    </table>
  </div>


</template>

<script>
import api from '../api';

export default {
  name: 'FruitsComponent',
  props: {
    msg: String
  },

  // при монтировании компонента, получаем список фруктов
  mounted() {
    this.getFruits();
  },

  // в data, будем хранить список фруктов, которые получим с сервера
  data() {
    return {
      fruits: null
    }
  },

  // методы
  methods: {
    getFruits() {
      api
        .get('/api/fruits') // Здесь нет необходимости указывать полный URL, так как baseURL уже указан в api.js
        .then(response => {
          console.log(response);
          this.fruits = response.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
