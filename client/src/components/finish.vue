<template>
  <div>
    <div class="container">
        <h1>You answered {{ this.$route.params.counterR }} from {{ this.$route.params.counter }} qustions</h1>
        <h1>Wanna continue?</h1>
        <hr>
        <router-link :to="{name: 'message', params: {}}">
            <button class="btn btn-primary" 
                    @click="                    $emit('ResetCounter')"
               >
                GO
            </button>   
        </router-link> 
        
<!--
        <button @click="$emit('startNew')"
                class="btn btn-primary answers"
        >Go</button>
-->
    </div>
  </div>
</template>

<script>
 export default {
     props: ['success', 'numberQuest']
}
</script>

<style>

</style>