<template>
  <div class="container create-game">
    <div class="card">
      <div class="card-header">Create Boardgame</div>
      <div class="card-body">
        <div>
          <CustomInput id="name"
                       title="Name"
                       :maxlength="80"
                       @input="updateName"
                       :error="this.boardgame.name.error"
          ></CustomInput>
          <CustomInput id="publisher"
                       title="Publisher"
                       :maxlength="50"
                       @input="updatePublisher"
                       :error="this.boardgame.publisher.error"
          ></CustomInput>
          <CustomInput id="description"
                       title="Description"
                       :maxlength="200"
                       @input="updateDescription"
                       :error="this.boardgame.description.error"
          ></CustomInput>
          <CustomInput id="year"
                       title="Year"
                       :maxlength="4"
                       @input="updateYear"
                       type="number"
                       :error="this.boardgame.year.error"
          ></CustomInput>
          <div class="form-group">
            <label>Category</label>
            <select id="category" class="form-control" @change="updateCategory($event)">
              <option value="''">Choose a category</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
            </select>
            <span v-if="this.boardgame.category.error" class="text-danger">{{ this.boardgame.category.error }}</span>
          </div>
          <div class="form-group mt-3">
            <button class="btn btn-primary" @click="save">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomInput from '../components/CustomInput'
import {mapState} from "vuex";
import BoardgameService from "../services/boardgame.service";
import router from "../router";

export default {
  name: "CreateGame",
  components: {CustomInput},
  data() {
    return {
      boardgame: {
        name: {
          value: null,
          error: null
        },
        publisher: {
          value: null,
          error: null
        },
        description: {
          value: null,
          error: null
        },
        category: {
          value: '',
          error: null
        },
        year: {
          value: null,
          error: null
        }
      },
      hasError: false,
      submitted: false,
    };
  },
  computed: {
    ...mapState(['loading', 'categories']),

  },
  methods: {
    updateName: function (value) {
      this.boardgame.name.value = value
    },
    updatePublisher: function (value) {
      this.boardgame.publisher.value = value
    },
    updateDescription: function (value) {
      this.boardgame.description.value = value
    },
    updateYear: function (value) {
      this.boardgame.year.value = value
    },
    updateCategory: function (event) {
      this.boardgame.category.value = event.target.value
    },
    save: function () {
      this.hasError = false;

      if (this.boardgame.name.value == null || this.boardgame.name.value === '') {
        this.boardgame.name.error = 'Field required';
        this.hasError = true;
      }
      if (this.boardgame.publisher.value == null || this.boardgame.publisher.value === '') {
        this.boardgame.publisher.error = 'Field required';
        this.hasError = true;
      }
      if (this.boardgame.category.value == null || this.boardgame.category.value === '') {
        this.boardgame.category.error = 'Field required';
        this.hasError = true;
      }
      if (this.boardgame.year.value > 9999) {
        this.boardgame.year.error = 'Format YYYY';
        this.hasError = true;
      }

      if (this.hasError) {
        return;
      }

      BoardgameService.create({
        name: this.boardgame.name.value,
        publisher: this.boardgame.publisher.value,
        category: this.boardgame.category.value,
        description: this.boardgame.description.value,
        year: this.boardgame.year.value,
      }).then(res => {
        this.$swal.fire(res.message);
        router.push({ name: 'ShowGame', params: { id: res.data } })
      }).catch(err => {
        this.$swal.fire(err.message);
      })
    },
  }
}
</script>

<style scoped>

</style>
