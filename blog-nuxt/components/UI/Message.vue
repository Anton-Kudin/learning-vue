<template>
  <div 
    class="message"
    :class="mesClass">
    <p>{{message}}</p>
  </div>
</template>
<script>
export default {
  props:{
    mesClass:{
      type: String,
      default:"success",
    },
    message:{
      type: String,
      required: true,
    }
  }
}
</script>
<style lang="scss">
  .message{
    font-size: 22px;
    &.success{
      color: rgb(18, 155, 41);
    }
    &.error{
      color: rgb(155, 27, 18);
    }
  }
</style>