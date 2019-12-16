<template>
  <div class="message">
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  props:{
    message:{
      type: String,
      required: true,
      default: 'Сообщение по умолчанию',
    },
  }
}
</script>

<style lang="scss" scoped>
  .message{
    text-align: center;
    color: rgb(189, 45, 45);
  }
</style>