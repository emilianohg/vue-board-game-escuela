<template>
  <div class="container create-game">
    <div class="card">
      <div class="card-header">Edit Boardgame</div>
      <div class="card-body">
        <div>
      <CustomInput id="name"
                   title="Name"
                   :maxlength="80"
                   @input="updateName"
                   :readonly="true"
                   :error="this.boardgameForm.name.error"
                   v-model="boardgameForm.name.value"
      ></CustomInput>
      <CustomInput id="publisher"
                   title="Publisher"
                   :maxlength="50"
                   @input="updatePublisher"
                   :error="this.boardgameForm.publisher.error"
                   v-model="boardgameForm.publisher.value"
      ></CustomInput>
      <CustomInput id="description"
                   title="Description"
                   :maxlength="200"
                   @input="updateDescription"
                   :error="this.boardgameForm.description.error"
                   v-model="boardgameForm.description.value"
      ></CustomInput>
      <CustomInput id="year"
                   title="Year"
                   :maxlength="4"
                   @input="updateYear"
                   type="number"
                   :error="this.boardgameForm.year.error"
                   v-model="boardgameForm.year.value"
      ></CustomInput>
      <div class="form-group">
        <label>Category</label>
        <select id="category" class="form-control" @change="updateCategory($event)" v-model="boardgameForm.category.value"
        >
          <option value="''">Choose a category</option>
          <option v-for="category in categories" :key="category.id" :value="category.id" v-bind:selected="boardgame.category === category.id">{{ category.name }}</option>
        </select>
        <span v-if="this.boardgameForm.category.error" class="text-danger">{{ this.boardgameForm.category.error }}</span>
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
import {mapActions, mapState} from "vuex";
import BoardgameService from "../services/boardgame.service";

export default {
  name: "UpdateGame",
  components: {CustomInput},
  data() {
    return {
      boardgameForm: {
        name: {
          value: this.boardgame?.name,
          error: null
        },
        publisher: {
          value: this.boardgame?.publisher,
          error: null
        },
        description: {
          value: this.boardgame?.description,
          error: null
        },
        category: {
          value: this.boardgame?.category,
          error: null
        },
        year: {
          value: this.boardgame?.year,
          error: null
        }
      },
      hasError: false,
      submitted: false,
    };
  },
  computed: {
    ...mapState(['loading', 'categories', 'boardgame']),
  },
  methods: {
    ...mapActions(['getBoardgame']),
    updateName: function (value) {
      this.boardgameForm.name.value = value
    },
    updatePublisher: function (value) {
      this.boardgameForm.publisher.value = value
    },
    updateDescription: function (value) {
      this.boardgameForm.description.value = value
    },
    updateYear: function (value) {
      this.boardgameForm.year.value = value
    },
    updateCategory: function (event) {
      this.boardgameForm.category.value = event.target.value
    },
    save: function () {

      if  (!this.boardgameForm.category.value) {
        this.boardgame.category = this.boardgameForm.category.value;
      }

      this.hasError = false;


      if (this.boardgameForm.publisher.value == null || this.boardgameForm.publisher.value === '') {
        this.boardgameForm.publisher.error = 'Field required';
        this.hasError = true;
      }
      if (this.boardgameForm.category.value == null || this.boardgameForm.category.value === '') {
        this.boardgameForm.category.error = 'Field required';
        this.hasError = true;
      }
      if (this.boardgameForm.year.value > 9999) {
        this.boardgameForm.year.error = 'Format YYYY';
        this.hasError = true;
      }

      if (this.hasError) {
        return;
      }

      BoardgameService.update(this.$route.params.id, {
        publisher: this.boardgameForm.publisher.value,
        category: this.boardgameForm.category.value,
        description: this.boardgameForm.description.value,
        year: this.boardgameForm.year.value,
      }).then(res => {
        this.$swal.fire(res.message);
      }).catch(err => {
        this.$swal.fire(err.message);
      })
    },
  },
  mounted() {
    this.getBoardgame(this.$route.params.id).then(() => {
      this.boardgameForm = {
        name: {
          value: this.boardgame?.name,
              error: null
        },
        publisher: {
          value: this.boardgame?.publisher,
              error: null
        },
        description: {
          value: this.boardgame?.description,
              error: null
        },
        category: {
          value: this.boardgame?.category,
              error: null
        },
        year: {
          value: this.boardgame?.year,
              error: null
        }
      };
    })
  }
}
</script>

<style scoped>

</style>
