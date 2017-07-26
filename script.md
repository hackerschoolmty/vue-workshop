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
Utilizar directivas de Vue.js es muy sencillo. Empezaremos por las básicas.
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
En esta sección veremos los ciclos de vida de una instancia de vue. Además de 
consumir un servicio web remoto que llene el arreglo de categories.

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
Existen diferentes formas de crear componentes. Empezaremos viendo la menos común
y analizaremos el uso de slot para crear componentes altamente personalizables.

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
Los mixins se usan para reutilizar comportamiento y propiedades en componentes.

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
La forma más sencilla de comunicar componentes es mediante propiedades y eventos.

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

# Shorthands
Podemos escribir menos codigo para ciertas directivas de vue. Reemplazamos v-bind 
por ```:``` y v-on por ```@```

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
Acabamos de ver la forma más sencilla de utilizar Vue.js en cualquier proyecto 
que es importando la librería en el ```<head>```. Sin embargo, cuando trabajamos
con un sistema complejo o queremos hacer una ```Single Page App``` merece la pena
utilizar herramientas que nos ayuden a modularizar nuestro código. La herramienta 
que utilizaremos será webpack.

El generador de vue-cli maneja un template simple de webpack. Trabajaremos con 
este template el resto del día.

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

Ahora creamos el clásico Hello world! en un componente.

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

Ahora que entendemos la estructura. Utilizaremos el código que hicimos previamente.

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

### Instalamos axios
Necesitamos instalar axios como paquete de npm para poder utilizarlo en conjunto 
con los imports

```bash
$ npm install axios
```
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
## Administrador de estado centralizado
Ahora utilizaremos vuex para administrar el estado de nuestra aplicación. La estructura
de vuex que veremos será la sencilla.

# vuex
```bash
$ npm install vuex
```
Más adelante necesitaremos el siguiente plugin de babel así que lo instalaremos
y configuraremos.

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

