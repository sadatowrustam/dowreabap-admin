<template>
<div>
    <div class="chatarea">
        <div  v-for="message in messages" :key="message.index">
            <div class="message" :class="message.who === 'you' ? 'you' : 'admin'"><div>{{message.message}}</div></div>
        </div>
        <a href="#bottom" class="toBot" style="display:block"></a>
        <div id="bottom" style="display:block"></div>
    </div>
    <input type="text"  @keyup.enter="sentMessage" v-model="message">
</div>
</template>

<script>
import io from "socket.io-client";
export default {
    head(){
        return{
            script:[
              {
                src: `${process.env.socketUrl}/socket.io/socket.io.js`,
              },
            //   {
            //     src: 'https://cdnjs.cloudflare.com/ajax/libs/socket.io/3.0.4/socket.io.js'
            //   }
            ]
        }
    },
    data(){
        return{
            id:this.$route.query.id,
            message:'',
            user: '',
            socket : '',
            messages :[],
        }
    },
    async mounted(){
        this.socket = io.connect(process.env.socketUrl,{secure:true})

        this.socket.on("chat-message",(m)=>{
            m.who = 'you';
            this.messages.push(m);
            toBottom.click();
        })
        
        const { data } = await this.$axios.get(`/admin/chats/${this.id}`);
        this.user = data.chat_id;
        for(let i = 0; i<data.chat.length; i++){
            data.chat[i].index = i;
        }
        this.messages = data.chat;
        const toBottom  = document.querySelector(".toBot");
        toBottom.click();
    },
    methods:{
        sentMessage(){
            this.socket.emit("admin-send",{chat_id:this.user, text:this.message});
            this.messages.push(
                {
                    who: 'admin',
                    message: this.message,
                }
            );
            this.message = '';
            const toBottom  = document.querySelector(".toBot");
            toBottom.click();
        },
    }
}
</script>

<style lang='scss' scoped>
    .chatarea{ 
        height: calc(88vh - 40px);
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
</style>