<template lang="pug" src="~/assets/index.pug">
</template>

<script>
  import Logo from '~/components/Logo.vue'

  export default {
    data() {
      return {
        excs: require('~/data/excs.json'),
        fields: ['ex', 'week1','week2','week3','week4'],
        currentEx: 0,
        selectedWeek: 1
      }
    },
    mounted() {
      console.log(this.currentEx.length);

      if (localStorage.getItem('selectedWeek')) {
        this.selectedWeek = localStorage.getItem('selectedWeek');
      }

      if (localStorage.getItem('currentEx')) {
        this.currentEx = localStorage.getItem('currentEx');
      }
    },
    methods: {
      rowClick(el, index) {
        this.currentEx = index;
        localStorage.setItem('currentEx', index);
      },
      next() {
        if (this.currentEx + 1 < this.excs.length) {
          this.currentEx = (this.currentEx / 1) + 1;
        }
      },
      prev() {
        if (this.currentEx > 0) {
          this.currentEx = (this.currentEx / 1) - 1;
        }
      }
    },
    watch: {
      selectedWeek: function () {
        localStorage.setItem('selectedWeek', this.selectedWeek);
        // this.currentEx = 0;
      }
    },
    components: {
      Logo
    }
  }
</script>

<style lang="scss" src="../assets/style.scss">
</style>
