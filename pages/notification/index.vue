<template>
  <div>
    <div class="chatarea">
        <div  v-for="(message,i) in data" :key="message.index">
            <div class="message you">
              <div>{{message.message}}</div>
              <div class="time">{{times[i].day}} / {{times[i].clock}}</div>
            </div>
        </div>
        <a href="#bottom" class="toBot" style="display:block"></a>
        <div id="bottom" style="display:block"></div>
    </div>
    <div class="bottom">
      <textarea name="" v-model="message" id="" cols="30" rows="10" ></textarea>
      <button @click="send">{{$t('send')}}</button>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      message:'',
    }
  },
  async asyncData({ $axios, route }) {
    try {
      let { data } = await $axios.get(`/admin/orders/get-messages/`);
      console.log(data);
      const times = [];
      for(const product of data){
        const day = product.createdAt.slice(0,10)
        const clock = product.createdAt.slice(11,19)
        times.push({
          day,
          clock
        })
      }
      data.reverse()
      return { data ,times}
    } catch (err) {
      console.log(err)
    }
  },

  methods:{
    async send(){
      const {status} = await this.$axios.post(`/admin/orders/send-message`,{message:this.message});
      // const status = 201
      if(status === 201){
        this.data.push({
          message:this.message
        })
        this.message = ''
        const toBottom  = document.querySelector(".toBot");
        toBottom.click();
      }
    }
  }
}
</script>

<style lang='scss' scoped>
  .bottom{
    display:  flex;
    align-items: center;
    justify-content: space-between;
  }
  button{
    padding: 20px;
    background: gray;
    border-radius: 10px;
    cursor: pointer;
  }
  textarea{
    width: 90%;
    height: 100px;
    border-radius: 10px;
    background: white;
    resize: none;
    outline: none;
    padding: 30px;
  }
  .chatarea{ 
      height: calc(88vh - 80px);
      overflow-y: auto;
      padding: 0 10px;
      .message{
          margin-bottom: 10px;
          div{
              border-radius: 5px;
              padding:10px;
              background: rgb(112, 112, 112);
          }
      }
      .you{
          display: flex;
          justify-content: flex-start;
      }
      .admin{
          display: flex;
          justify-content: flex-end;
      }
    }
    input{
        background: white;
        width: 100%;
        outline: none;
        padding: 10px;
        border-radius: 5px;
    }
    .time{
      background: none !important;
      font-size: 14px;
      display: flex;
      align-items: flex-end;
    }
</style>