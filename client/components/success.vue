<template>
  <div class="alert" >
        <h2> {{ text }} </h2>
        <hr>
        <router-link to="/start">
        <button class="btn btn-primary" @click="$emit('next')">
            continue
        </button>  
        </router-link>  
  </div>
</template>

<script>
    export default {
        props: ['type', 'text']
    }
</script>

<style>

</style>