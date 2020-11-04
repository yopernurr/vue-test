<template>
  <div class="w-full mt-2 border py-2 rounded cursor-pointer" @click="handleProductClick">
    <div>{{ product.name }}</div>
    <div>{{ product.category.name }}</div>
  </div>
</template>

<script>
export default {
  name: "Product",
  props: {
    product: Object
  },
  methods: {
    handleProductClick() {
      this.$emit('clicked', this.product)
    }
  }
}
</script>

<style>

</style>