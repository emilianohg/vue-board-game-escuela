<template>
  <div class="container games">
    <div class="list-games">
      <CardBoardGame v-for="boardgame in boardgames"
                     :key="boardgame.id"
                     :id="boardgame.id"
                     :name="boardgame.name"
                     :publisher="boardgame.publisher"
                     :year="boardgame.year"
                     :is_favorite="boardgame.is_favorite"
      ></CardBoardGame>
    </div>
  </div>
</template>

<script>
import CardBoardGame from '../components/CardBoardGame';
import {mapActions, mapState} from "vuex";

export default {
  name: "Games",
  components: {
    CardBoardGame
  },
  computed: {
    ...mapState(['loading','boardgames'])
  },
  methods: {
    ...mapActions(['getBoardgames'])
  },
  mounted() {
    this.getBoardgames()
  }
}
</script>

<style scoped>

</style>
