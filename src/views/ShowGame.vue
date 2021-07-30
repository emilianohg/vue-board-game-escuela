<template>
  <div class="container">
    <div class="card">
      <div class="card-header">Edit Boardgame</div>
      <div class="card-body">
        <h1>{{ boardgame.name }}</h1>
        <h5>Publisher: {{ boardgame.publisher }}</h5>
        <p>Year {{ boardgame.year }}</p>
        <p>Category: {{ boardgame._category ? boardgame._category.name : '' }}</p>
        <hr>
        <p>Description:</p>
        <p>{{ boardgame.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "ShowGame",
  computed: {
    ...mapState(['loading', 'boardgame'])
  },
  methods: {
    ...mapActions(['getBoardgame']),
  },
  mounted() {
    this.getBoardgame(this.$route.params.id)
    console.log(this.boardgame)
  }
}
</script>

<style scoped>

</style>
