# Introducción a Vue.js
Vue.js fue lanzado al público en 2014.02.01 (public release 0.8) y empezó como
una librería para la vista (just a view layer library). A partir de la versión 
2.0 es considerado un framework progresivo (Progressive Framework). Actualmente
se encuentra en la versión 2.3.

Para empezar a utilizar vue podemos generar un proyecto con vue-cli:

```bash
$ vue init simple categories
$ cd categories
$ subl categories 
```
O crear una carpeta con el nombre categories y un archivo index.html dentro de la
carpeta con el siguiente contenido:

```html
  <!DOCTYPE html>
  <html>
  <head>
    <title>Bienvenido a HSMTY</title>
    <script src="https://unpkg.com/vue"></script> 
  </head>
  <body>
  
  </body>
  </html>
```

# v-for, v-if, v-on, axios, mounted
Ahora empecemos instanciando Vue y generando un arreglo de objetos
## v-for
```html
<!DOCTYPE html>
  <html>
  <head>
    <title>Bienvenido a HSMTY</title>
    <script src="https://unpkg.com/vue"></script>
  </head>
  <body>
  <div id='categoriesApp'>
    <ul>
      <li v-for='category in categories'>
        {{ category.name }}
      </li>
    </ul>
  </div>
  <script>
    ...
  </script>
  </body>
  </html>
```
El código para inicializar vue:
```javascript
var categoriesList = [
  { name: 'electronics' },
  { name: 'clothing' },
  { name: 'home' }
]

new Vue({
  el: '#categoriesApp',
  data: {
    categories: categoriesList
  }
})
```

## v-on, v-if
```html
...
<div id='categoriesApp'>
  <ul>
    <li 
      v-for='category in categories'
      v-on:click='selectCategory(category)'>
      {{ category.name }}
      <b v-if='category.selected'>selected</b>
    </li>
  </ul>
</div>
...
```

```javascript
var categoriesList = [
  { name: 'electronics', selected: false },
  { name: 'clothing', selected: false},
  { name: 'home', selected: false }
]

new Vue({
  el: '#categoriesApp',
  data: {
    categories: categoriesList
  },
  methods: {
    selectCategory: function (category) {
      category.selected = !category.selected
    }
  }
})
```
## axios, mounted
```html
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<div id='categoriesApp'>
  <ul>
    <li 
      v-for='category in categories'
      v-on:click='selectCategory(category)'>
      {{ category.name }}
      <b v-if='category.selected'>selected</b>
    </li>
  </ul>
</div>
```

```javascript
new Vue({
  el: '#categoriesApp',
  data: {
    categories: []
  },
  methods: {
    selectCategory: function (category) {
      category.selected = !category.selected
    }
  },
  mounted: function () {
    var url = 'https://raw.githubusercontent.com/jesuslerma/vuejs101-guide/master/categories.json'
    var that = this
    
    axios.get(url).then(function (response) {
      that.categories = response.data
    })
  }
})
```

# Componentes
### Inline Templates
```html
...
<div id='categoriesApp'>
    <ul>
      <li 
        v-for='category in categories'
        v-on:click='selectCategory(category)'>
        <category-item 
          v-bind:name='category.name'
          v-bind:selected='category.selected'
          inline-template>
          <div>
            {{ name }}
            <b v-if='selected'>selected</b>
          </div>
        </category-item>
      </li>
    </ul>
  </div>
...
```
```javascript
Vue.component('category-item', {
  props: ['name', 'selected']
})
```
### Template Tag
```html
<div id='categoriesApp'>
    <ul>
      <li 
        v-for='category in categories'
        v-on:click='selectCategory(category)'>
        <category-item 
          v-bind:name='category.name'
          v-bind:selected='category.selected'>
        </category-item>
      </li>
    </ul>
  </div>
  <template id='categoryItemTmpl'>
    <div>
      {{ name }}
      <b v-if='selected'>selected</b>
    </div>
  </template>
```

```javascript
Vue.component('category-item', {
  template: '#categoryItemTmpl',
  props: ['name', 'selected']
})
```
### Slot
```html
<div id='categoriesApp'>
    <ul>
      <li 
        v-for='category in categories'
        v-on:click='selectCategory(category)'>
        <category-item 
          v-bind:name='category.name'>
            <b v-if='category.selected'>selected</b>
        </category-item>
      </li>
    </ul>
  </div>
  <template id='categoryItemTmpl'>
    <div>
      {{ name }}
      <slot></slot>
    </div>
  </template>
```
```javascript
Vue.component('category-item', {
  template: '#categoryItemTmpl',
  props: ['name']
})
```
### Componentes Dinamicos
```html
<div id='categoriesApp'>
  Mostrar Categorias en Tabla 
  <input type="checkbox" v-on:click="changeShowTable">
  <component v-bind:is='currentView'
    v-bind:categories='categories'></component>
</div>

<template id='categoriesTableTmpl'>
  <table>
    <thead>
      <th>Name</th>
      <th>Selected</th>
    </thead>
    <tbody>
      <tr
        v-on:click='selectCategory(category)'
        v-for='category in categories'>
        <td>{{ category.name }}</td>
        <td>{{ category.selected }}</td>
      </tr>
    </tbody>
  </table>
</template>

<template id='categoriesUlTmpl'>
  <ul>
    <li 
      v-for='category in categories'
      v-on:click='selectCategory(category)'>
      <category-item 
        v-bind:name='category.name'
        v-bind:selected='category.selected'>
      </category-item>
    </li>
  </ul>
</template>

<template id='categoryItemTmpl'>
  <div>
    {{ name }}
    <b v-if='selected'>selected</b>
  </div>
</template>
```

```javascript
Vue.component('categoriesUL', {
  template: '#categoriesUlTmpl',
  props: ['categories'],
  methods: {
    selectCategory: function (category) {
      category.selected = !category.selected
    }
  }
})

Vue.component('categoriesTable', {
  template: '#categoriesTableTmpl',
  props: ['categories'],
  methods: {
    selectCategory: function (category) {
      category.selected = !category.selected
    }
  }
})

Vue.component('category-item', {
  template: '#categoryItemTmpl',
  props: ['name', 'selected']
})

new Vue({
  el: '#categoriesApp',
  data: {
    categories: [],
    showTable: false
  },
  computed: {
    currentView: function() {
      return this.showTable ? 'categoriesTable' : 'categoriesUL'
    }
  },
  methods: {
    changeShowTable: function () {
      this.showTable = !this.showTable
    }
  },
  mounted: function () {
    var url = 'https://raw.githubusercontent.com/jesuslerma/vuejs101-guide/master/categories.json'
    var that = this

    axios.get(url).then(function (response) {
      that.categories = response.data
    })
  }
})
```

# Mixins

```javascript
categoriesListMixin = {
  props: ['categories'],
  methods: {
    selectCategory: function (category) {
      category.selected = !category.selected
    }
  }
}

Vue.component('categoriesUL', {
  template: '#categoriesUlTmpl',
  mixins: [categoriesListMixin]
})

Vue.component('categoriesTable', {
  template: '#categoriesTableTmpl',
  mixins: [categoriesListMixin]
})
```

# Comunicación entre componentes
```html
<component v-bind:is='currentView'
      v-bind:categories='categories'
      v-on:selectcategory='onSelectCategory'></component>
```

```javascript
categoriesListMixin = {
  props: ['categories'],
  methods: {
    selectCategory: function (category) {
      this.$emit('selectcategory', category)
    }
  }
}
...

new Vue({
  el: '#categoriesApp',
  data: {
    categories: [],
    showTable: false
  },
  computed: {
    currentView: function() {
      return this.showTable ? 'categoriesTable' : 'categoriesUL'
    }
  },
  methods: {
    changeShowTable: function () {
      this.showTable = !this.showTable
    },
    onSelectCategory: function (category) {
      var idx = this.categories.findIndex(function (c) {
        return c.name === category.name
      })
      
      if ( idx >= 0) {
        var categoryElement = this.categories[idx]
        categoryElement.selected = !categoryElement.selected
      }
    }
  },
  mounted: function () {
    var url = 'https://raw.githubusercontent.com/jesuslerma/vuejs101-guide/master/categories.json'
    var that = this

    axios.get(url).then(function (response) {
      that.categories = response.data
    })
  }
})
```
# Filters
```javascript
Vue.filter('replaceWithLove', function (value) {
  return '<3'
})
```
# Shorthands
```html
<div id='categoriesApp'>
  Mostrar Categorias en Tabla 
  <input type="checkbox" @click="changeShowTable">
  <component :is='currentView'
    :categories='categories'
    @selectcategory='onSelectCategory'></component>
</div>

<template id='categoriesTableTmpl'>
  <table>
    <thead>
      <th>Name</th>
      <th>Selected</th>
    </thead>
    <tbody>
      <tr
        @click='selectCategory(category)'
        v-for='category in categories'>
        <td>{{ category.name | replaceWithLove}}</td>
        <td>{{ category.selected }}</td>
      </tr>
    </tbody>
  </table>
</template>

<template id='categoriesUlTmpl'>
  <ul>
    <li 
      v-for='category in categories'
      @click='selectCategory(category)'>
      <category-item 
        :name='category.name'
        :selected='category.selected'>
      </category-item>
    </li>
  </ul>
</template>

<template id='categoryItemTmpl'>
  <div>
    {{ name }}
    <b v-if='selected'>selected</b>
  </div>
</template>
```

# Webpack Simple Template
```bash
$ vue init webpack-simple vue-store
$ cd vue-store
$ npm install
$ mkdir src/components
$ mkdir src/lib
$ mkdir src/router
$ mkdir src/vuex
$ mkdir src/mixins
$ mkdir src/filters
$ npm run dev
```

Hello world! Al primer componente!

```html
<!--src/App.vue-->
<template>
  <div id="app">
    Mostrar Categorias en Tabla 
    <input type="checkbox" 
      @click="changeShowTable">
    {{showTable}}
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      showTable: false
    }
  },
  methods: {
    changeShowTable() {
      this.showTable = !this.showTable
    }
  }
}
</script>
```

Creando componentes con category
```html
<!--src/App.vue-->
<template>
  <div id="app">
    Mostrar Categorias en Tabla 
    <input type="checkbox" 
      @click="changeShowTable">
    {{showTable}}
    <categories-ul :categories='categories'></categories-ul>
  </div>
</template>

<script>
import CategoriesUl from './components/CategoriesUl.vue'
var categories = [
  { name: 'clothing', selected: false }
]
export default {
  name: 'app',
  data () {
    return {
      showTable: false,
      categories
    }
  },
  methods: {
    changeShowTable() {
      this.showTable = !this.showTable
    }
  },
  components: {
    categoriesUl: CategoriesUl
  }
}
</script>
```
```html
<!--src/components/CategoriesUi.vue-->
<template>
  <ul>
    <li v-for='category in categories'>
      <category-li
        :name='category.name'
        :selected='category.selected'></category-li>
    </li>
  </ul>
</template>
<script >
  import CategoryLi from './CategoryLi.vue'

  export default {
    props: ['categories'],
    components: {
      categoryLi: CategoryLi
    }
  }
</script>
```
```html
<!--src/components/CategoryLi.vue-->
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
```
Instalamos axios
```bash
$ npm install axios
```
Ahora Dejamos la logica de categories como estaba
```html
<!--src/App.vue-->
<template>
  <div id="app">
    Mostrar Categorias en Tabla 
    <input type="checkbox" 
      @click="changeShowTable">
    {{showTable}}
    <component 
      :is='currentCategoryView'
      @selectcategory='onSelectCategory'
      :categories='categories'>
    </component>
  </div>
</template>

<script>
import CategoriesUl from './components/CategoriesUl.vue'
import CategoriesTable from './components/CategoriesTable.vue'
import axios from 'axios'

export default {
  name: 'app',
  data () {
    return {
      showTable: false,
      categories: []
    }
  },
  computed: {
    currentCategoryView () {
      return this.showTable ? 'categoriesTable' : 'categoriesUl'
    }
  },
  methods: {
    changeShowTable () {
      this.showTable = !this.showTable
    },
    onSelectCategory (category) {
      var idx = this.categories.findIndex(function (c) {
        return c.name === category.name
      })
      
      if ( idx >= 0) {
        var categoryElement = this.categories[idx]
        categoryElement.selected = !categoryElement.selected
      }
    }
  },
  mounted: function () {
    var url = 'https://raw.githubusercontent.com/jesuslerma/vuejs101-guide/master/categories.json'
    var that = this

    axios.get(url).then(function (response) {
      that.categories = response.data
    })
  },
  components: {
    categoriesUl: CategoriesUl,
    categoriesTable: CategoriesTable
  }
}
</script>
```

```html
<!--CategoriesUl.vue -->
<template>
  <ul>
    <li 
      v-for='category in categories'
      @click='selectCategory(category)'>
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
```

```javascript
// src/mixins/CategoriesMixin.js
module.exports = { 
  listMixin: {
    props: ['categories'],
    methods: {
      selectCategory: function (category) {
        this.$emit('selectcategory', category)
      }
    }
  }
}
```

```html
<!-- src/components/CategoriesTable-->
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
```

```html
<!--src/components/CategoryLi.vue -->
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
```

# vuex
```bash
$ npm install vuex
```
Mas adelante necesitaremos
```bash
$ npm install --save-dev babel-plugin-transform-object-rest-spread
```
```json
#.babelrc
{
  "presets": [
    ["env", { "modules": false }]
  ],
  "plugins": ["transform-object-rest-spread"]
}
```

```javascript
// src/vuex/store.js

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const state = {
  categories: {
    all: []
  }
}

const getters = {
  getAllCategories: state => state.categories.all
}

const mutations = {
  setCategories (state, categories) {
    state.categories.all = categories
  },
  selectCategory (state, category) {
    category.selected = !category.selected
  }
}
const actions = { 
  fetchCategories: ({ commit }) => {
    var url = 'https://raw.githubusercontent.com/jesuslerma/vuejs101-guide/master/categories.json'
    axios.get(url).then(function (response) {
      commit('setCategories', response.data)
    })
  },
  selectCategory({ commit }, category) {
    commit('selectCategory', category)
  }
}

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  strict: debug
})

```

```javascript
// src/mixins/CategoriesMixin
const mapGetters = require('vuex').mapGetters
const mapActions = require('vuex').mapActions

module.exports = {
  listMixin: {
    computed: {
      ...mapGetters({
        categories: 'getAllCategories'
      })
    },
    methods: {
      ...mapActions(['fetchCategories', 'selectCategory'])
    },
    mounted() {
      this.fetchCategories()
    }
  }
}

```

```javascript
//main.js
import store from './vuex/store'

new Vue({
  store,
  router
}).$mount('#app')

```
# vue-router
```bash
$ npm install vue-router
```
```html
<!-- index.html -->
<div id="app">
  <router-view></router-view>
</div>
```

```javascript
// src/main.js
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: App }
]

const router = new VueRouter({
  routes
})

import store from './vuex/store'

new Vue({
  store,
  router
}).$mount('#app')
```
## Pongamos Orden

Seguramente muchos de ustedes se preguntaran: cuando vamos a poner la logica donde
corresponde?

```javascript
// main.js
import Vue from 'vue'
import App from './App.vue'
import CategoriesTable from './components/CategoriesTable.vue'
import CategoriesUl from './components/CategoriesUl.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: App },
  { path: '/categories/table', component: CategoriesTable },
  { path: '/categories/ul', component: CategoriesUl },
]

const router = new VueRouter({
  routes
})

import store from './vuex/store'

new Vue({
  store,
  router
}).$mount('#app')

```

```html
<!--src/App.vue-->
<template>
  <div >
    <router-link to='/categories/ul'> Vista en UL 
    </router-link>
    <router-link to='/categories/table'> Vista en Table
    </router-link>
  </div>
</template>

<script>
export default {
  
}
</script>
```

```html
<!-- src/components/CategoriesTable.vue-->
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
  import { mapGetters, mapActions } from 'vuex'
  
  export default {
    mixins: [listMixin],
    computed: {
      ...mapGetters({
        categories: 'getAllCategories'
      })
    },
    methods: {
      ...mapActions(['fetchCategories'])
    },
    mounted() {
      this.fetchCategories()
    }
  }
</script>
```

```html
<!-- src/components/CategoriesUl.vue-->
<template>
  <ul>
    <li 
      v-for='category in categories'
      @click='selectCategory(category)'>
      <category-li
        :name='category.name'
        :selected='category.selected'></category-li>
    </li>
  </ul>
</template>
<script >
  import CategoryLi from './CategoryLi.vue'
  import { listMixin } from '../mixins/CategoriesMixin'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    mixins: [listMixin],
    computed: {
      ...mapGetters({
        categories: 'getAllCategories'
      })
    },
    methods: {
      ...mapActions(['fetchCategories'])
    },
    components: {
      categoryLi: CategoryLi
    }
  }
</script>
```

```
<!-- src/mixins/CategoriesMixin.vue-->
module.exports = { 
  listMixin: {
    methods: {
      selectCategory: function (category) {
        category.selected = !category.selected
      }
    },
    mounted() {
      this.fetchCategories()
    }
  }
}
```

Refactor con Mixins

```html
<!-- src/components/CategoriesUl.vue -->
<template>
  <ul>
    <li 
      v-for='category in categories'
      @click='selectCategory(category)'>
      <category-li
        :name='category.name'
        :selected='category.selected'></category-li>
    </li>
  </ul>
</template>
<script >
  import CategoryLi from './CategoryLi.vue'
  import { listMixin } from '../mixins/CategoriesMixin'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    mixins: [listMixin],
    components: {
      categoryLi: CategoryLi
    }
  }
</script>
```

```html
<!-- src/components/CategoriesTable.vue -->
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
  import { mapGetters, mapActions } from 'vuex'

  export default {
    mixins: [listMixin]
  }
</script>
```

```javascript
// src/mixins/CategoriesMixins.js
const mapGetters = require('vuex').mapGetters
const mapActions = require('vuex').mapActions

module.exports = { 
  listMixin: {
    methods: {
      selectCategory: function (category) {
        category.selected = !category.selected
      }
    },
    computed: {
      ...mapGetters({
        categories: 'getAllCategories'
      })
    },
    methods: {
      ...mapActions(['fetchCategories'])
    },
    mounted() {
      this.fetchCategories()
    }
  }
}
```
# firebase
```bash
npm install firebase vuefire --save
```

```html
<!--src/components/ProductList.vue-->
<template>
  <table>
    <thead>
      <th>Name</th>
      <th>Price</th>
    </thead>
    <tbody>
      <tr
        v-for='product in products'>
        <td>{{ product.name }}</td>
        <td>{{ product.price }}</td>
      </tr>
    </tbody>
  </table>
</template>
<script> 
  import Firebase from 'firebase'
  import VueFire from 'vuefire'
  import Vue from 'vue'
  
  Vue.use(VueFire)

  let firebaseApp = Firebase.initializeApp({
    apiKey: "AIzaSyBy1J69Uqpd_-Y7N6KSVwJWbvQXMxze3Vw",
    authDomain: "products-fa37f.firebaseapp.com",
    databaseURL: "https://products-fa37f.firebaseio.com",
    projectId: "products-fa37f",
    storageBucket: "",
    messagingSenderId: "630701294122"
  })

  let db = firebaseApp.database()

  export default {
    firebase: {
      products: db.ref('products_list')
    }
  }
</script>
```

```javascript
// src/main.js
import Vue from 'vue'
import App from './App.vue'
import CategoriesTable from './components/CategoriesTable.vue'
import CategoriesUl from './components/CategoriesUl.vue'
import ProductsList from './components/ProductsList.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: App },
  { path: '/categories/table', component: CategoriesTable },
  { path: '/categories/ul', component: CategoriesUl },
  { path: '/products/table', component: ProductsList }
]

const router = new VueRouter({
  routes
})

import store from './vuex/store'

new Vue({
  store,
  router
}).$mount('#app')

```

```html
<!--src/App.vue-->
<template>
  <div >
    <router-link to='/categories/ul'> Vista en UL 
    </router-link>
    <router-link to='/categories/table'> Vista en Table
    </router-link>

    <router-link to='/products/table'> Products
    </router-link>
  </div>
</template>

<script>
export default {
  
}
</script>
```