<template>
  <div>
    <v-text-field :rules="rules" :label="$t('username')" v-model="data.username"></v-text-field>

    <v-text-field :rules="rules" :label="$t('password')" v-model="data.password"></v-text-field>

    <v-text-field :rules="rules" :label="$t('newPassword')" v-model="data.newPassword"></v-text-field>
    
    <v-text-field :rules="rules" :label="$t('newPasswordConfirm')" v-model="data.newPasswordConfirm"></v-text-field>

    <v-btn
      class="ma-2"
      :loading="loading"
      :disabled="loading"
      color="info"
      @click="sendStatic"
    >
      {{$t('save')}}
      <template v-slot:loader>
        <span class="custom-loader">
          <!-- <v-icon light>mdi-cached</v-icon> -->
          <svg width="24" height="20" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.5338 5H15.4663C15.6782 5 15.794 5.24721 15.6583 5.41005L13.6921 7.76953C13.5921 7.88947 13.4079 7.88947 13.308 7.76953L11.3417 5.41005C11.206 5.24721 11.3218 5 11.5338 5Z" fill="white"/>
            <path d="M0.533773 7H4.46625C4.67821 7 4.794 6.75279 4.65831 6.58995L2.69207 4.23047C2.59212 4.11053 2.40791 4.11053 2.30796 4.23047L0.341717 6.58995C0.206024 6.75279 0.321813 7 0.533773 7Z" fill="white"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.00001 1C6.44752 1 5.06058 1.70697 4.1427 2.81839C3.96686 3.03131 3.6517 3.06137 3.43879 2.88552C3.22587 2.70968 3.19581 2.39453 3.37165 2.18161C4.47135 0.850027 6.13663 0 8.00001 0C10.9417 0 13.388 2.1165 13.9011 4.90967C13.9066 4.9397 13.9119 4.96981 13.917 5H12.9001C12.4371 2.71778 10.4186 1 8.00001 1ZM3.09993 7C3.56294 9.28222 5.58138 11 8.00001 11C9.5525 11 10.9394 10.293 11.8573 9.18161C12.0332 8.96869 12.3483 8.93863 12.5612 9.11448C12.7742 9.29032 12.8042 9.60547 12.6284 9.81839C11.5287 11.15 9.8634 12 8.00001 12C5.05831 12 2.61199 9.8835 2.09893 7.09033C2.09341 7.0603 2.08812 7.03019 2.08305 7H3.09993Z" fill="white"/>
          </svg>
        </span>
      </template>
    </v-btn>

    <div style="margin-top:100px">
      <label style="font-size:24px" for="">{{$t('changeGmail')}}</label>
      <v-text-field :rules="rules" v-model="gmail" :label="$t('changeGmail')"></v-text-field>
    </div>

    <v-btn
      class="ma-2"
      :loading="loading2"
      :disabled="loading2"
      color="info"
      @click="sendGmail"
    >
      {{$t('save')}}
      <template v-slot:loader>
        <span class="custom-loader">
          <!-- <v-icon light>mdi-cached</v-icon> -->
          <svg width="24" height="20" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.5338 5H15.4663C15.6782 5 15.794 5.24721 15.6583 5.41005L13.6921 7.76953C13.5921 7.88947 13.4079 7.88947 13.308 7.76953L11.3417 5.41005C11.206 5.24721 11.3218 5 11.5338 5Z" fill="white"/>
            <path d="M0.533773 7H4.46625C4.67821 7 4.794 6.75279 4.65831 6.58995L2.69207 4.23047C2.59212 4.11053 2.40791 4.11053 2.30796 4.23047L0.341717 6.58995C0.206024 6.75279 0.321813 7 0.533773 7Z" fill="white"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.00001 1C6.44752 1 5.06058 1.70697 4.1427 2.81839C3.96686 3.03131 3.6517 3.06137 3.43879 2.88552C3.22587 2.70968 3.19581 2.39453 3.37165 2.18161C4.47135 0.850027 6.13663 0 8.00001 0C10.9417 0 13.388 2.1165 13.9011 4.90967C13.9066 4.9397 13.9119 4.96981 13.917 5H12.9001C12.4371 2.71778 10.4186 1 8.00001 1ZM3.09993 7C3.56294 9.28222 5.58138 11 8.00001 11C9.5525 11 10.9394 10.293 11.8573 9.18161C12.0332 8.96869 12.3483 8.93863 12.5612 9.11448C12.7742 9.29032 12.8042 9.60547 12.6284 9.81839C11.5287 11.15 9.8634 12 8.00001 12C5.05831 12 2.61199 9.8835 2.09893 7.09033C2.09341 7.0603 2.08812 7.03019 2.08305 7H3.09993Z" fill="white"/>
          </svg>
        </span>
      </template>
    </v-btn>

    <!-- Kabul edilende zakaz ulanyja gitmeli hat -->
    <div style="margin-top:100px">
      <label style="font-size:24px" for="">{{$t('changeText')}}</label>
      <v-textarea background-color="#464444" v-model="message"></v-textarea>
    </div>

    <v-btn
      class="ma-2"
      :loading="loading3"
      :disabled="loading3"
      color="info"
      @click="sendMessage"
    >
      {{$t('save')}}
      <template v-slot:loader>
        <span class="custom-loader">
          <!-- <v-icon light>mdi-cached</v-icon> -->
          <svg width="24" height="20" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.5338 5H15.4663C15.6782 5 15.794 5.24721 15.6583 5.41005L13.6921 7.76953C13.5921 7.88947 13.4079 7.88947 13.308 7.76953L11.3417 5.41005C11.206 5.24721 11.3218 5 11.5338 5Z" fill="white"/>
            <path d="M0.533773 7H4.46625C4.67821 7 4.794 6.75279 4.65831 6.58995L2.69207 4.23047C2.59212 4.11053 2.40791 4.11053 2.30796 4.23047L0.341717 6.58995C0.206024 6.75279 0.321813 7 0.533773 7Z" fill="white"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.00001 1C6.44752 1 5.06058 1.70697 4.1427 2.81839C3.96686 3.03131 3.6517 3.06137 3.43879 2.88552C3.22587 2.70968 3.19581 2.39453 3.37165 2.18161C4.47135 0.850027 6.13663 0 8.00001 0C10.9417 0 13.388 2.1165 13.9011 4.90967C13.9066 4.9397 13.9119 4.96981 13.917 5H12.9001C12.4371 2.71778 10.4186 1 8.00001 1ZM3.09993 7C3.56294 9.28222 5.58138 11 8.00001 11C9.5525 11 10.9394 10.293 11.8573 9.18161C12.0332 8.96869 12.3483 8.93863 12.5612 9.11448C12.7742 9.29032 12.8042 9.60547 12.6284 9.81839C11.5287 11.15 9.8634 12 8.00001 12C5.05831 12 2.61199 9.8835 2.09893 7.09033C2.09341 7.0603 2.08812 7.03019 2.08305 7H3.09993Z" fill="white"/>
          </svg>
        </span>
      </template>
    </v-btn>

  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  data(){
    return{
      loading:false,
      loading2:false,
      loading3:false,
      message:'',
      change:'',
      gmail:'',
      data:{
        username:'',
        password:'',
        newPassword:'',
        newPasswordConfirm:''
      },
      rules: [
        value => !!value || 'Required.',
      ],
    }
  },
  async mounted(){
    try {
      const {data} = await this.$axios.get('/admin/get-me')
      this.data.username = data.username
      this.gmail = data.email;
      this.message = data.message;
    } catch (error) {
      console.log(error)
    }
  },
  methods:{
    ...mapActions({
      setAdminToken : 'admin/setAdminToken',
    }),
    async sendStatic(){
      this.loading = true
      if(this.data.username && this.data.password && this.data.newPassword && this.data.newPasswordConfirm){
        try {
          this.change = Number(this.change);
          const res = await this.$axios.post(`/admin/edit`,this.data);
          if(res){
            this.setAdminToken(res.data.token)
            this.loading = false
            alert(this.$t("passwordChanged"))
          }

        } catch (error) {
          console.log(error);
        }
      }
      else{
        this.loading = false
        alert(this.$t('fillFree'))
      }
    },
    async sendGmail(){
      if(this.gmail.length){
        this.loading2 = true
        for(let i = 0; i < this.gmail.length; i++){
          if(this.gmail[i] == '@'){
            const {status} = await this.$axios.patch(`/admin/email`,this.gmail);
            if(status == 200){
              alert(this.$t('gmailChanged'))
            }
          }else{
            this.loading2 = false
          }
        }
      }else{
        this.loading2 = false
        alert(this.$t('fillFree'))
      }
    },
    async sendMessage(){
      this.loading3 = true
      try {
        const data = await this.$axios.patch('/admin/message',{message:this.message});
        if(data.status == 200){
          this.loading3 = false
        }
      } catch (error) {
        
      }
    }
  }
}
</script>

<style>

</style>