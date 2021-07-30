<template>
  <div class="card-board-game">
    <div class="card-data">
      <h1>{{ name }}</h1>
      <h2>{{ publisher }}</h2>
      <p>Year: <span>{{ year }}</span></p>
    </div>
    <div class="card-control">
      <div class="favorite-box">
        <img src="../assets/heart.png" v-if="is_favorite" alt="" @click="toggleFavorite">
        <img src="../assets/heart-blank.png" v-if="!is_favorite" alt="" @click="toggleFavorite">
      </div>
      <div class="box-control">
        <button class="btn">Edit</button>
        <button class="btn" @click="deleteCard">Delete</button>
        <button class="btn" @click="showCard">Show</button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import FavoritesService from "../services/favorites.service";
import BoardgameService from "../services/boardgame.service";
import router from "../router";

export default {
  name: "CardBoardGame",
  props: ['id', 'name', 'publisher', 'category', 'description', 'year', 'is_favorite'],
  computed: {
    ...mapState(['loading','categories', 'favorites'])
  },
  methods: {
    ...mapActions(['getBoardgames', 'getBoardgame']),
    toggleFavorite: function () {
      console.log(this.is_favorite)
      if(this.is_favorite) {
        FavoritesService.delete(this.id).then(() => {
          this.getBoardgames()
        });
      } else {
        FavoritesService.create(this.id).then(() => {
          this.getBoardgames()
        });
      }
    },
    deleteCard: function () {
      this.$swal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          BoardgameService.delete(this.id).then(() => {
            this.getBoardgames()
          })
        }
      })
    },
    showCard: function () {
      router.push({ name: 'ShowGame', params: { id: this.id } })
    }
  }
}
</script>

<style scoped>

</style>
