<template>
  <div>
    <currentUser>
      <template v-slot:default="{ user }">
        {{user.name}}
      </template>
    </currentUser>
    <div class="a"></div>
  </div>
</template>
<script>

  import CurrentUser from './components/currentUser'
  export default {
    components: {
      CurrentUser
    }
  }
</script>

<style lang="scss" scoped>
.a {
  background-image: url('./group.png');
  width: 100px; height: 100px;
  border: 1px solid black;
}
</style>
