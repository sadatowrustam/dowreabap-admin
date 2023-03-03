<template>
  <div class="productAdd">
      <v-col cols="5">
        {{$t('chooseImage')}}
        <v-file-input
          v-model="images"
          truncate-length="15"
          @change="uploadProductImages"
        ></v-file-input>
      </v-col>

        <div v-if="productImageSources.length" class="perfume__images__wrapper">
          <div class="perfume__images">
            <div
              v-for="(image, index) in productImageSources"
              :key="index"
              class="perfume__images__item"
              @click="deleteUploadedImageWithIndex(index)"
            >
              <img :src="image.url" alt="" />
            </div>
          </div>
        </div>

      <v-dialog v-model="dialogDelete" max-width="500px" light>
        <v-card>
          <v-card-title class="text-h5">{{$t('deleteDialog')}}</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDelete">{{$t('cancel')}}</v-btn>
            <v-btn color="blue darken-1" text @click="deleteItemConfirm">{{$t('ok')}}</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    <v-row style="padding:12px 24px">
      <v-col cols="5">
        <v-text-field dense :label="$t('turkmen')+' '+$t('name')" :rules="rules" v-model="product.name_tm"></v-text-field>
      </v-col>
      <v-col cols="1"></v-col>
      <v-col cols="5">
        <v-text-field dense :label="$t('rus')+' '+$t('name')" :rules="rules" v-model="product.name_ru"></v-text-field>
      </v-col>
    </v-row>


    <v-row style="padding:12px 24px">
      <v-col cols="2"><v-text-field dense type="number" min="0" :label="$t('price')" :rules="rules" v-model="product.price"></v-text-field></v-col>

      <v-col cols="3">
        <v-checkbox
          v-model="product.isActive"
          :label="$t('isActive')"
        >
        </v-checkbox>
      </v-col>
    </v-row>

    <v-btn
      class="ma-2"
      :loading="loading"
      :disabled="loading"
      color="info"
      @click="sendProduct"
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

    <!-- <v-btn color="info" @click="sendProduct">{{$t('save')}}</v-btn> -->
  </div>
</template>

<script>
// import Editor from '@tinymce/tinymce-vue'
import { mapGetters } from 'vuex'
export default {
  name: 'appp',
  components: {
    //  'editor': Editor
   },
  data(){
    return {
      loading:false,
      dialogDelete: false,
      rules:[
        value => !!value || "Zerur",
      ],
      index:-1,
      product: {
        name_tm: '',
        name_ru: '',
        isActive:false, //aksiya barmy yok
        price:'',
      },
      images:[],
      productImageSources: [],
    }
  },
  async mounted(){
    document.querySelector(".productAdd .v-input__icon button").innerHTML='<svg height="20" width="20"><path d="M10 13.271 5.708 8.979 6.958 7.729 9.125 9.896V3.333H10.875V9.896L13.042 7.729L14.292 8.979ZM5.083 16.667Q4.354 16.667 3.844 16.156Q3.333 15.646 3.333 14.917V12.5H5.083V14.917Q5.083 14.917 5.083 14.917Q5.083 14.917 5.083 14.917H14.917Q14.917 14.917 14.917 14.917Q14.917 14.917 14.917 14.917V12.5H16.667V14.917Q16.667 15.646 16.156 16.156Q15.646 16.667 14.917 16.667Z" fill="#FFFFFF"/></svg>'
  },
  methods:{
    deleteItem(item){
      this.dialogDelete = true;
    },
    closeDelete(){
      this.dialogDelete = false;
    },
    deleteItemConfirm(){
      this.dialogDelete = false;
      this.productImageSources=[]
      this.images=[]
    },
    uploadProductImages(images) {
      this.productImageSources = [{
        type:'objectURL',
        url: URL.createObjectURL(images),
      }]
    },
    deleteUploadedImageWithIndex(index) {
      this.dialogDelete = true;
      this.index = index;
    },
    async sendProduct(){
      this.loading = true
      if(this.images.length !==0  && this.product.name_tm && this.product.name_ru && this.product.price){ //body bosh bolup barsa mesele bolarmy soramaly
        try {
          const res = await this.$axios.post('/admin/gifts', this.product)
          if(res.status == 201){
            const ress = await this.$axios.post(`/admin/gifts/upload-image/${res.data.gift_id}`,this.returnFormData())
            if(ress.status == 200){
              this.$router.push("/gift")
            }
          }
        } catch (error) {
          console.log(error);
        }
      }else{
        this.loading = false
        alert('Boshluklary dolduryn')
      }

    },
    returnFormData(){
      const formData = new FormData();
      formData.append('image', this.images)
      return formData;
    }
  },
}
</script>

<style>
.custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>