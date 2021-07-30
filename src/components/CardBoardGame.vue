<template>
  <div class="card-board-game">
    <div class="card-data">
      <h1>{{ name }}</h1>
      <h2>{{ publisher }}</h2>
      <p>{{ year }}</p>
    </div>
    <div class="card-control">
      <div class="favorite-box">
        <img src="../assets/heart.png" v-if="is_favorite">
        <img src="../assets/heart-blank.png" v-if="!is_favorite">
      </div>
      <div class="box-control">
        <button class="btn">Editar</button>
        <button class="btn">Eliminar</button>
        <button class="btn">Ver</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardBoardGame",
  props: ['id', 'name', 'publisher', 'category', 'description', 'year', 'is_favorite'],
}
</script>

<style scoped>

</style>
