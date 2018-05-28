<template>
  <div class='alert alert-secondary'>
  <h3>Are you ready?</h3>
  <!--can use w/o button element in router link-->
  <router-link to="/message">
      <button @click="ClickStart" class="btn btn-success">Start</button>
  </router-link>
    
  </div>
</template>

<script>
export default {
  name: 'start',
  data(){
    return {
        
    }
  },
  methods: {
    ClickStart: function(ev){
        this.$emit('StartEmit');
    }
  }
}
</script>

<style scoped>
    .alert {
    text-align: center;
    }
</style>