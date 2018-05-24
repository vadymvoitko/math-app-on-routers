<template>
    <div class="alert">
        <h1>{{x}} + {{y}} = ?</h1>
        <div class="float-right alert-warning">{{ sec }}:{{ mSec }}</div>
        <hr>
        <button v-for="number in answers" 
                @click="onAnswer(number)"
                class="btn btn-primary answers"
        >{{number}}</button>
    </div>
</template>

<script>
    export default {
  name: 'message',
  data(){
    return {
        x: GetNumber(100,200),
        y: GetNumber(100,200),
        sec: '3',
        mSec: '0'
    }
  },
  timers: {
      seconds: { time: 1000, autostart: true, repeat: true }
  },
  methods: {
    onAnswer(num){
        if(num == this.good){
            this.$emit('success');
            
        }
        else {
            this.$emit('error',`${this.x} + ${this.y} = ${this.good}`);
            
        }
    },
      seconds () {
        this.sec --;
        if (this.sec == 0){
            this.$timer.stop('seconds');
            this.$emit('error',`Time is expired`);
        }
      }
  },
  computed: {
    good () {
        return this.x + this.y
        },
      answers(){
      let numbers = [this.good];
      
      while(numbers.length < 4){
      let num = GetNumber(this.good + 20, this.good - 20);
      if(numbers.indexOf(num) === -1)
        numbers.push(num);
      }
      numbers.sort(()=>{return Math.random() - Math.random()});
      return numbers;
      }
  }
}
    
function GetNumber(min, max){
    return Math.floor((Math.random()*(max - min) + min))
}
</script>

<style>
    .answers{
        margin: 10px;
    }
</style>