<template>
  <ul>
    <li
      @click='selectCategory(category)' 
      v-for='category in categories'>
      <category-li
        :name='category.name'
        :selected='category.selected'></category-li>
    </li>
  </ul>
</template>
<script >
  import CategoryLi from './CategoryLi.vue'
  import { listMixin } from '../mixins/CategoriesMixin'

  export default {
    mixins: [listMixin],
    components: {
      categoryLi: CategoryLi
    }
  }
</script>