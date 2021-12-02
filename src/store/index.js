import Vue from 'vue';
import Vuex from 'vuex';
import exercises from '@/data/exercises.json';

Vue.use(Vuex);

const localCollection = localStorage.getItem('fit-collection');
let parsedlocalCollection;
if (localCollection) parsedlocalCollection = JSON.parse(localCollection);

export default new Vuex.Store({
  state: {
    collection: parsedlocalCollection || exercises,
    week: localStorage.getItem('fit-week') || 1,
    weeks: [1, 2, 3, 4],
    currentExIndex: 0,
  },
  
  mutations: {
    setCollection(state, payload) {
      state.collection = payload;
    },
    setWeek(state, payload) {
      if (payload && payload !== state.weeks.length + 1)  {
        localStorage.setItem('fit-week', payload);
        state.week = payload;
      }
    },
    setCurrentExIndex(state, payload) {
      if (payload >= 0 && payload !== state.collection.length + 1)  {
        state.currentExIndex = payload;
      }
    },
    setWeight(state, payload) {
      state.collection[state.currentExIndex].weight = payload;
    },
  },

  getters: {
    currentEx(state) {
      const { collection, currentExIndex } = state;
      return collection[currentExIndex];
    }
  },

  actions: {
    updateLocalCollection({ state }) {
      const localSettings = localStorage.getItem('fit-collection');

      state.collection.forEach(el => {
        if (!el.weight) {
          el.weight = null;
        }
      })
      
      localStorage.setItem('fit-collection', JSON.stringify(state.collection));
    },
    setWeight({ commit, dispatch }, payload) {
      if (payload) {
        commit('setWeight', payload);
        dispatch('updateLocalCollection');
      }
    }
  }
})
