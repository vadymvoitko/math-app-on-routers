<template>
    <div class="alert">
        <h1>{{x}} + {{y}} = ?</h1>
        <div class="float-right alert-warning">{{ sec }}:{{ mSecShow }}</div>
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
        <div class="new"> {{ this.jsonFile }} </div>
    </div>
    
</template>

<script>
    export default {
  name: 'message',
  data(){
    return {
        x: GetNumber(100,200),
        y: GetNumber(100,200),
        sec: '5',
        mSec: '0',
        path: '/success',
        text: 'Hello',
        stats: {
            success: 0,
            error: 0
        },
        numberQuest: 3,
        obj: {},
        jsonFile: 'empty'
    }
  },
  props: [
      'routeName',
      'RetText',
      'RetClass',
      'counter',
      'level'
  ],
  timers: {
      seconds: { time: 1000, autostart: true, repeat: true },
      mseconds: { time: 100000, autostart: true, repeat: true },
      
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
             alert();
            this.$emit('success');
        }
        else {
//can return obj and send them as params in router
            this.$emit('error');
        };
    },
      seconds () {
//          if (this.sec != 0)md
//            this.sec --;
//          else {
//              this.mSec = 1100
//          }
      },
      mseconds () {
          console.log(this.mSec)
          if (this.mSecShow == 0 ){
              if (this.sec != 0){
                  this.sec --;
                  this.mSec = 1000; 
              }
              else {
                  
                  this.$emit('error');
                  this.$emit('onAnswer2', this.counter);
            
                  this.$router.push({name: 'succ', params: {
                  text: "Time expired"
            }});
                  this.$timer.stop('mseconds');
              }
          }
          this.mSec -= 100;
      }
  },
  computed: {
    good () {
        return this.x + this.y
        },
    answers(){
      let numbers = [this.good];
      
      while(numbers.length < this.numberQuest){
      let num = GetNumber(this.good + 20, this.good - 20);
      if(numbers.indexOf(num) === -1) {
        numbers.push(num);
      }}
      numbers.sort(()=>{return Math.random() - Math.random()});
      return numbers;
  },
      mSecShow() {
          return this.mSec%1000;
      }
},
        created: function(){
               this.numberQuest = this.level + 2;
               this.sec =  Math.round(5 - this.level/2 - 0.01);
               this.mSec =  (5 - this.level/2)*1000 ;
                var self = this;
               var json = this.axios.get("http://www.json-generator.com/api/json/get/cgvzsBLuKW?indent=2")
               .then(function(response){
                   console.log(response.data[0].guid)
                   self.jsonFile = response.data[0].guid
               })
               .catch(function(error){
                   alert(error);
               })
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