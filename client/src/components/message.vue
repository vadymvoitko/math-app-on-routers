<template>
    <div class="alert">
        <h1>{{x}} + {{y}} = ?</h1>
        <div class="float-right alert-warning">{{ sec }}:{{ mSec }}</div>
        <hr>
<!--can wrap button element in router link-->
<!--if say :to="{path: path ... no work need - route name-->
<!--!!!!important!!! impossible to use static prop 'text' in params of ':to' and change it by same button click. Instead I use method and return object with bunch of props!!!-->
        <router-link 
                v-for="number in answers" 
                :to="{name: onAnswer(number).routeName , params: { text : onAnswer(number).RetText, class: onAnswer(number).RetClass}}" 
        ><button 
                @click="onAnswer1(number)"
                class="btn btn-primary answers">{{number}}
        </button></router-link>
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
        mSec: '0',
        path: '/success',
        text: 'Hello',
        stats: {
            success: 0,
            error: 0
        },
        numberQuest: 3,
        obj: {}
    }
  },
  props: [
      'routeName',
      'RetText',
      'RetClass',
      'counter'
  ],
  timers: {
      seconds: { time: 1000, autostart: true, repeat: true }
  },
  methods: {
    onAnswer(num){  
        if(num == this.good){
            this.obj.RetText = 'Great Job';
            this.obj.RetClass = 'alert-info';
            this.obj.routeName = 'succ'
        }
        else {
//can return obj and send them as params in router
            this.obj.RetText = `Wrong. Correct is: ${this.x} + ${this.y} = ${this.good}`;
            this.obj.RetClass = 'alert-warning';
            this.obj.routeName = 'succ'
        };
        return this.obj;
    },
    onAnswer1(num){
        this.$emit('onAnswer2', this.counter);
         if(num == this.good){
            this.$emit('success');
        }
        else {
//can return obj and send them as params in router
            this.$emit('error');
        };
    },
      seconds () {
        this.sec --;
        if (this.sec == 0){
            this.$timer.stop('seconds');
            this.$emit('error');
            this.$emit('onAnswer2', this.counter);
            
            this.$router.push({name: 'succ', params: {
                text: "Time expired"
            }})
        }
      }
  },
  computed: {
    good () {
        return this.x + this.y
        },
    answers(){
      let numbers = [this.good];
      
      while(numbers.length < 3){
      let num = GetNumber(this.good + 20, this.good - 20);
      if(numbers.indexOf(num) === -1) {
        numbers.push(num);
      }}
      numbers.sort(()=>{return Math.random() - Math.random()});
      return numbers;
  }
}
}
function GetNumber(min, max) {
    return Math.floor((Math.random()*(max - min) + min))
}
</script>

<style>
    .answers{
        margin: 10px;
    }
</style>