<template>
  <v-col class="">
    <v-row justify="center" align="center">
      <h1>{{$t('welcome')}}</h1>
    </v-row>
  </v-col>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  name: 'IndexPage',
  data(){
    return {
    }
  },
  computed:{
    ...mapGetters({
      statistika:'statistica/banner'
    })
  }
}
</script>
<style scoped>
  span:first-child{
    margin-right: 20px;
  }
</style>