<template>
  <div :class=$route.params.class >
        <h2> {{ $route.params.text }} </h2>
        <hr>
        <router-link :to="{name: onNext().routeName, params: {counterR: counterR, counter: counter}}">
           
            <button class="btn btn-primary" >
                continue
            </button>   
        </router-link> 
  </div>
</template>

<script>
    export default {
        data(){
            return {
                text_new: 'lol'
            }
        },
        props: ['counter',
                'counterR',
                'counterF'
               ],
        methods: {
            onNext () {
                console.log("onnext=" + this.counter);
                var routeName;
                if (this.counter == 3){
                    routeName = 'fin';
                }
                else {routeName = 'message'}
                return {routeName: routeName}
            }
        },
        created: function() {
            this.text_new = this.$route.params.text
        }
    }
</script>

<style>

</style>