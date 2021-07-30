<template>
  <div class="container">
    <div class="card">
      <div class="card-header"></div>
      <div class="card-body">
        <div class="row">
          <div class="col-sm-8">
            <h1>{{ boardgame.name }}</h1>
            <h5>Publisher: {{ boardgame.publisher }}</h5>
          </div>
          <div class="col-sm-4 text-end">
            <img class="mx-3" src="../assets/heart.png" v-if="boardgame.is_favorite" alt="">
            <img class="mx-3" src="../assets/heart-blank.png" v-if="!boardgame.is_favorite" alt="">
          </div>
        </div>
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
  }
}
</script>

<style scoped>

</style>
