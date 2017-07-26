<template>
  <table>
    <thead>
      <th>Name</th>
      <th>Selected</th>
    </thead>
    <tbody>
      <tr
        @click='selectCategory(category)'
        v-for='category in categories'>
        <td>{{ category.name }}</td>
        <td>{{ category.selected }}</td>
      </tr>
    </tbody>
  </table>
</template>
<script>
  import { listMixin } from '../mixins/CategoriesMixin'

  export default {
    mixins: [listMixin]
  }
</script>