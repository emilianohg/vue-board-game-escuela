<template>
  <table class="table table-bordered">
    <thead>
      <tr>
        <th>Name</th>
        <th>Publisher</th>
        <th>Category</th>
        <th>Year</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="boardgame in boardgames" :key="boardgame.id">
        <td v-bind:style="{ color: boardgame._category ? boardgame._category.color : '#000' }">{{ boardgame.name }}</td>
        <td>{{ boardgame.publisher }}</td>
        <td>{{ boardgame.category }}</td>
        <td>{{ boardgame.year }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "TableBoardGame",
  props: ['boardgames'],
  mounted() {
  }
}
</script>

<style scoped>

</style>
