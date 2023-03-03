<template>
<div>
  <div class="users" v-for="chat in chats" :key="chat.id">
    <div class="user" v-if="chat.chat !== null" :class="chat.isRead==='true' ? '' : 'newUser'"><nuxt-link :to="'chat/userChat?id='+chat.chat_id">{{chat.chat[chat.chat.length-1].message}}</nuxt-link></div>
  </div>
</div>
</template>

<script>
export default {
  computed: {

    tableHeaders() {
      return [
        { text: 'Идентификатор', value: 'id' },
      ]
    },
  },
  data(){
    return{
      chats : [],
    }
  },
  // async mounted(){
  //   const { data } = await this.$axios.get('/admin/chats');
  //   this.chats = data;
  //   const socket = io.connect(process.env.socketUrl,{secure:true})
  //   socket.on("chat-message",(m)=>{
  //     const newUser = m.id;
  //     for(let i = 0; i<this.chats.length; i++){
  //       if(newUser === this.chats[i].id){
  //         this.chats[i].isRead = 'false';
  //         this.chats[i].chat.push(m);
  //       }
  //     }
  //   })
  // },
}
</script>

<style lang='scss' scoped>
  .users{
    .user{
      background: rgb(46, 46, 46);
      border-radius: 5px;
      width: 100%;
      margin: 10px 0;
      a{
        padding: 10px 20px;
        color: white;
        text-decoration: none;
        display: inline-block;
        width: 100%;
      }
    }
    .user.newUser{
      background: rgb(119, 119, 119);
    }
  }
</style>