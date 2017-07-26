<template>
  <div>
    {{ name }}
    <b v-if='selected'>selected</b>
  </div>
</template>
<script>
  export default {
    props: ['name', 'selected']
  }
</script>