<template>
  <div class="card-board-game">
    <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">{{ name }}</h5>
        <h6 class="card-subtitle mb-2 text-muted">{{ publisher }}</h6>
        <p class="card-text">Year: <span>{{ year }}</span></p>
        <div class="card-control">
          <div class="box-control">
            <img class="mx-3" src="../assets/heart.png" v-if="is_favorite" alt="" @click="toggleFavorite">
            <img class="mx-3" src="../assets/heart-blank.png" v-if="!is_favorite" alt="" @click="toggleFavorite">
            <button class="btn btn-sm btn-primary mx-1" @click="editCard">Edit</button>
            <button class="btn btn-sm btn-primary mx-1" @click="deleteCard">Delete</button>
            <button class="btn btn-sm btn-primary" @click="showCard">Show</button>
          </div>
        </div>
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
            this.$swal.fire('Deleted successfully');
            this.getBoardgames()
          })
        }
      })
    },
    showCard: function () {
      router.push({ name: 'ShowGame', params: { id: this.id } })
    },
    editCard: function () {
      router.push({ name: 'UpdateGame', params: { id: this.id } })
    }
  }
}
</script>

<style scoped>

</style>
