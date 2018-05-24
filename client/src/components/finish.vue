<template>
  <div>
    <div class="container">
        <h1>You answered {{ this.success }} from {{ this.numberQuest }} qustions</h1>
        <h1>Wanna continue?</h1>
        <hr>
        <button @click="$emit('startNew')"
                class="btn btn-primary answers"
        >Go</button>
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