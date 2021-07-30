<template>
  <div id="app">
    <ul class="nav justify-content-center">
      <li class="nav-item">
        <router-link class="nav-link" to="/">Favorites</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/games">Games</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/create">Create</router-link>
      </li>
    </ul>
    <router-view/>
  </div>
</template>

<style>

</style>
