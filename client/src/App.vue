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
        <start @StartEmit="changeState('message')"
               v-if="state == 'start'"
        ></start>

                    <message 
                         v-else-if="state=='message'"
                         @success="onQuestSuccess"
                         @error="onQuestError"
                         class="alert-info"
                         />
        <!-- we decl type and text in parent to throw to props of child in success.vue -->
        <!-- parent is component here, child is file .vue with template/script/style -->
        <success v-else-if="state=='success'"
                :type="message.type"
                :text="message.text"
                :class="message.type"
                @next="onNext()"
        ></success>
        <finish v-else-if="state=='finish'"
                :success="this.stats.success"
                :numberQuest="this.questDone"
                :class="message.resultType"
                @startNew="startNew()"
        ></finish>
        <div v-else>not defined</div>
    </transition>
    <router-view/>
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
      numberQuest: 3
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
    changeState: function (ev) {
      this.state = ev
    },
    onQuestSuccess () {
      this.state = 'success'
      this.message.text = 'Good Job'
      this.message.type = 'alert-success'
      this.stats.success++
    },
    onQuestError (msg) {
      this.state = 'success'
      this.message.text = msg
      this.message.type = 'alert-warning'
      this.stats.error++
      this.message.resultType = 'alert-warning'
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
