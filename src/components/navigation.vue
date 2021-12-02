<template>
  <div id="navigation" class="d-flex justify-content-between align-items-center mb-4">
    <b-button
      variant="outline-primary"
      @click="currentExIndex--"
      :disabled="currentExIndex === 0"
    >
      <<
    </b-button>
    <b-form-group label="Текущая неделя" class="text-center">
      <b-form-radio-group
        v-model="week"
        :options="[1, 2, 3, 4]"
        name="radio-inline"
        plain
      ></b-form-radio-group>
    </b-form-group>
    
    <b-button
      variant="outline-primary"
      @click="currentExIndex++"
      :disabled="currentExIndex === collection.length"
    >
      >>
    </b-button>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'navigation',

  computed: {
    ...mapState(['weeks', 'collection']),

    week: {
      get() {
        return this.$store.state.week;
      },
      set(value) {
        this.setWeek(value);
      }
    },

    currentExIndex: {
      get() {
        return this.$store.state.currentExIndex;
      },
      set(value) {
        this.setCurrentExIndex(value);
      }
    }
  },

  methods: {
    ...mapMutations(['setWeek', 'setCurrentExIndex']),
  }
}
</script>