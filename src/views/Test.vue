<template>
  <div class="p-4">
    <h1 class="font-bold text-3xl p-4">Username : {{ getUserName }}</h1>
    <div>

      <div class="flex justify-center mt-4">
        <div class="border flex items-center justify-center p-4 shadow rounded">
          Change Name 
          <input class="input ml-4" name="name" placeholder="Input username" v-model="username"/>
          <input class="input ml-4" type="button" value="Submit" @click="updateUsername" >

          <div class="w-full">
            <router-link to="/login">Login</router-link>
          </div>
        </div>
      </div>

      <div class="flex justify-center mt-4">
        <div class="border flex items-center justify-center p-4 shadow rounded">
          <input class="input" name="name" placeholder="Input Name" v-model="selectedProduct.name"/>
          <select name="category" class="input ml-4" id="category" v-model="selectedProduct.categoryId">
            <option value="" disabled>Pilih Category</option>
            <option :value="category.id" v-for="category in categories" :key="category.id">{{category.name}}</option>
          </select>
          <input class="input ml-4" v-if="selectedProduct.id == null" type="button" value="Submit" @click="handleSubmit" >
          <input v-else class="input ml-4" type="button" value="Update" @click="handleUpdate">
        </div>
      </div>

      <div class="flex justify-center mt-4">
        <div class="border flex items-center justify-center p-4 shadow rounded">
          <div class="btn-filter" :class="filter.categoryId == '' ? 'active' : ''" @click="handleFilterCategory('')">
            all
          </div>
          <div class="btn-filter" :class="filter.categoryId == category.id ? 'active' : ''" v-for="category in categories" :key="category.id" @click="handleFilterCategory(category.id)">
            {{ category.name }}
          </div>
        </div>
      </div>

      <div class="flex w-full mt-2">
        <div class="flex w-full flex-wrap p-4">
          <Product 
            v-for="product in filteredProducts" 
            :key="product.id" 
            :product="product"
            @clicked="handleProductClick(product)">
          </Product>
        </div>

        <div class="flex flex-wrap w-full p-4">
          <div class="w-full mt-2 flex items-center" v-for="product in filteredProducts" :key="product.id">
            <input class="input w-full h-full" name="name" placeholder="Input Name" v-model="product.name"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Product from '@/components/Product.vue'

export default {
  components: {
    Product
  },
  mounted() {
    // CALL API
  },
  data : () => ({
    username: '',
    title: `This is an test page`,
    filter: {
      categoryId: ''
    },
    selectedProduct: {
      id: null,
      name: ``,
      categoryId: ``
    },
    products: [
      {
        id: "1",
        name: `product 1`,
        category: {
          id: '1',
          name: 'Makanan'
        },
      },
      {
        id: '2',
        name: `product 2`,
        category: {
          id: '2',
          name: 'Minuman'
        }
      }
    ],
    categories: [
      {
        id: '1',
        name: 'Makanan'
      },
      {
        id: '2',
        name: 'Minuman'
      }
    ]
  }),
  methods: {
    handleFilterCategory(id) {
      this.filter.categoryId = id
    },
    handleProductClick (product) {
      console.log(product)
      this.selectedProduct = {...product, categoryId: product.category.id}
    },
    handleSubmit () {
      this.products = [
        ...this.products,
        {
          id: this.products.length + 1,
          name: this.selectedProduct.name,
          category: this.categories.find( v => v.id == this.selectedProduct.categoryId)
        }
      ]
      this.selectedProduct.name = ``
    },
    handleUpdate () {
      this.products = this.products.map(v => ({
        ...v,
        name: this.selectedProduct.id == v.id ? this.selectedProduct.name : v.name
      }))

      this.selectedProduct = {
        id: null,
        name: '',
        categoryId: ''
      }
    },
    updateUsername () {
      this.$store.dispatch('doUpdateUserName', this.username)
    }
  },
  computed: {
    filteredProducts() {
      return this.filter.categoryId != '' ? this.products.filter(v => v.category.id == this.filter.categoryId) : this.products
    },
    getUserName() {
      return this.$store.getters.getUserName
    }
  }
}
</script>

<style>
.btn-filter {
  @apply border cursor-pointer py-2 px-3 mx-2 rounded;
}

.active {
  @apply bg-red-500 text-white;
}
</style>