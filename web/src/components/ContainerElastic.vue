<template>
  <div class="container-elastic">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'ContainerElastic'
}
</script>

<style scoped>
  .container-elastic{
    width: 100%;
    max-width: 1200px;
    margin-right: auto;
    margin-left: auto;
  }
</style>
