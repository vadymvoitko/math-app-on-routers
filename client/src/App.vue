<template>

  <div id="app">
<!--      copied from bootstrap-->
       <div class="progress">
          <div class="progress-bar" role="progressbar" aria-valuenow="70"
          aria-valuemin="0" aria-valuemax="100" :style="{ width: computedWidth }">
          <span class="sr-only">70% Complete</span>
          </div>
        </div>
        <br>
<!--listen to an action StartEmit and start changeState on it-->
<!--IMPORTANT !!! mode="in-out" FOR NON-SIMULTANIOUS ANIMATION-->
   <transition name = "rotate" mode="out-in">

        <router-view @onAnswer2="onAns"
                     @ResetCounter="ResetCounter"
                     @success="onQuestSuccess"
                     @error="onQuestError"
                     :counter="counter"
                     :counterR="stats.success"
                     :counterF="stats.error"
                     />
    </transition>

  </div>

</template>

<script>
// when we change state we change picture cause we use v-if above
// in data - message we defive our vars to be sent to props in success
// in methods we change them
export default {
  name: 'App',
  data () {
    return {
      'state': 'start',
      message: {
        type: '',
        text: '',
        resultType: 'alert-success'
      },
      stats: {
        success: 0,
        error: 0
      },
      numberQuest: 3,
      counter: 0
    }
  },
  // computed is initiated when any var is changed
  computed: {
    questDone () {
      return this.stats.error + this.stats.success
    },
    computedWidth () {
      return this.stats.success * 100 / (this.numberQuest) + '%'
    }
  },
  methods: {
    onAns (countAll) {
        this.counter ++
    },
    changeState: function (ev) {
      this.state = ev
    },
    onQuestSuccess () {
      this.stats.success++
    },
    onQuestError (msg) {
      this.stats.error++
    },
    onNext () {
      if (this.questDone === this.numberQuest) {
        this.state = 'finish'
      } else {
        this.state = 'message'
      }
    },
    startNew () {
      this.state = 'message'
      this.stats.error = this.stats.success = 0
      this.message.resultType = 'alert-success'
    },
    ResetCounter () {
        console.log('ResetCounter');
        this.counter=0;
        this.stats.error = this.stats.success = 0
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
    .rotate-enter-active{
       animation: rotateInX 0.3s linear;
    }
    .rotate-leave-active{
        animation: rotateOutX 0.3s linear;
    }
    .rotate-enter, .rotate-leave-to {
   
}
    @keyframes rotateInX{
        from{transform: rotateX(90deg);}
        to{transform: rotateX(0deg);}
    }
    @keyframes rotateOutX{
        from{transform: rotateX(0deg);}
        to{transform: rotateX(90deg);}
    }
</style>
