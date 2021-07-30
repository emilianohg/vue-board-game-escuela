<template>
  <div class="home">
    <div class="container">
      <div class="control-container">
        <select @change="changeCategory">
          <option value="null">All categories</option>
          <option v-for="category in categories" :value="category.id" :key="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>
      <div class="table-container">
        <TableBoardGame :boardgames="favorites" class="table-favorites"></TableBoardGame>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import TableBoardGame from '../components/TableBoardGame';
export default {
  name: 'Home',
  data: function() {
    return {
      current_category: null,
    }
  },
  components: {
    TableBoardGame,
  },
  computed: {
    ...mapState(['loading','categories', 'favorites'])
  },
  methods: {
    ...mapActions(['getFavorites']),
    changeCategory: function ($event) {
      this.current_category = $event.target.value;
      this.getFavorites(this.current_category)
    }
  },
  mounted() {
    this.getFavorites(this.current_category)
  }
}
</script>

<style scoped>
.table-favorites {
  width: 100%;
  max-width: 700px;
  text-align: left;
  margin: 0 auto;
}
</style>
