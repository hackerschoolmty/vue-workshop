const axios = require('axios')
const mapGetters = require('vuex').mapGetters
const mapActions = require('vuex').mapActions

module.exports = {
  listMixin: {
    computed: {
      ...mapGetters({
        'categories': 'getAllCategories'
      })
    },
    methods: {
      ...mapActions(['fetchCategories', 'selectCategory'])
    },
    mounted: function () {
      this.fetchCategories()
    }
  }
}