<template>
  <div class="item">
    <img :src="product.img" :alt="product.title">
    <router-link :to="/shop/ + product.id" class="link">{{ product.title }}</router-link>
  </div>
</template>

<script>
export default {
  props:{
    product:{
      type: Object,
      required: true,
    }
  }
}
</script>

<style>

</style>