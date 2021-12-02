import Vue from 'vue';
import Vuex from 'vuex';
// import exercises from '@/data/exercises.json';
import vueDebounce from 'vue-debounce';
import axios from '@/utils/axios';

Vue.use(Vuex);
Vue.use(vueDebounce);


export default new Vuex.Store({
  state: {
    collection: [],
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
    getCollection({ commit }) {
      axios.get('/exercises').then(({ data }) => {
        commit('setCollection', data);
      })
    },
    setWeight({ commit, getters }, payload) {
      axios.put(`/exercises/${getters.currentEx.id}`, {
        weight: payload,
      })
      commit('setWeight', payload);
    }
  }
})
