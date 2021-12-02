<template>
  <div v-if="collection && currentEx">
    <small>{{currentExIndex + 1}}/{{collection.length}}</small>
    <h3>{{ currentEx.name }}</h3>

    <b-form-group label="Текущий вес" class="mb-4">
      <b-form-input
        :value="weight"
        autocomplete="off"
        type="number"
        v-debounce:1500ms="changeWeight"
      ></b-form-input>
    </b-form-group>

    <p>
      <strong>Подходы: </strong>
      <span>{{ currentEx.weeks[week - 1] }}</span>
    </p>

    <b-img class="w-75 mb-4" :src="currentEx.img" fluid />

    <p class="mb-2" v-html="currentEx.description"></p>

    <template v-if="collection">
      <b-form-group>
        <b-form-checkbox v-model="showAllColumns"><strong class="ps-3">Показать все недели</strong></b-form-checkbox>
      </b-form-group>

      <b-table striped hover :items="tableItems" :fields="fields" responsive="true" />
    </template>
  </div>    
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import { debounce } from 'vue-debounce';

export default {
  name: 'IndexPage',

  data: () => ({
    showAllColumns: false,
  }),

  computed: {
    ...mapState(['collection', 'week']),
    ...mapGetters(['currentEx']),

    currentExIndex: {
      get() {
        return this.$store.state.currentExIndex;
      },

      set(value) {
        debounce(() => {
          this.setCurrentExIndex(value);
        }, 1500);
      }
    },

    tableItems() {
      return this.collection.reduce((acc, item) => {
        const element = { name: item.name };
        item.weeks.forEach((week, index) => {
          element[`week${index + 1}`] = week;
        })
        delete element.weeks;
        acc.push(element);
        return acc;
      }, []);

    },
    
    weight: {
      get() {
        return this.currentEx.weight;
      },
      // set(value) {
      //   if (value) {
      //     debounce(() => this.setWeight, 1500);
      //   }
      // }
    },

    fields() {
      return Object.keys(this.tableItems[0]).reduce((acc, key) => {
        if (key === 'name') {
          acc.push({
            key: 'name',
            label: 'Упражнение'
          });
        }

        if (this.showAllColumns) {
          if (key.includes('week')) {
            acc.push({
              key,
              label: `Н${key.replace('week', '')}`,
            })
          }
        } else {
          if (key === `week${this.week}`) {
            acc.push({
              key,
              label: `Н ${this.week}`,
            })
          }
        }

        return acc;
      }, []);
    }
  },

  created() {
    this.getCollection();
  },

  methods: {
    ...mapMutations(['setCurrentExIndex']),
    ...mapActions(['getCollection', 'updateLocalCollection', 'setWeight']),

    changeWeight(value) {
      this.setWeight(+value);
    }
  },
}
</script>