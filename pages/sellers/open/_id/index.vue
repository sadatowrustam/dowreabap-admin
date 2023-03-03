<template>
  <div class="openMarket">
    <v-row>
      <v-col cols="4">
        <v-text-field :rules="rules" label="Türkmençe ady" v-model="data.name" disabled></v-text-field>
      </v-col>
      <v-col cols="2"></v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-text-field :rules="rules" label="Türkmençe salgysy" v-model="data.address_tm" disabled></v-text-field>
      </v-col>
      <v-col cols="2"></v-col>
      <v-col cols="4">
        <v-text-field :rules="rules" label="Rusça salgysy" v-model="data.address_ru" disabled></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-text-field :rules="rules" label="Telefon belgisi" v-model="data.phone_number" disabled></v-text-field>
      </v-col>
      <v-col cols="2"></v-col>
      <v-col cols="4">
        <v-text-field :rules="rules" label="Telefon bilgisi" v-model="data.phone_number_extra" disabled></v-text-field>
      </v-col>
    </v-row>
    <!-- Statistika -->
    <v-row>
      <v-col cols="1">
        <v-checkbox
          v-model="data.isActive"
          @click="isActiveSeller"
        ></v-checkbox>
      </v-col>
      <v-col cols="3">
        <v-btn
          class="ma-2"
          :loading="loading"
          :disabled="loading"
          color="info"
          @click="save"
        >
          Ýatda saklamak
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
      </v-col>
    </v-row>

    <v-data-table
      :headers="headers"
      :items="data.seller_product"
      :server-items-length="count"
      :options.sync="options"
      v-if="data.seller_product"
    >
      <template v-slot:[`item.images`]="{ item }">
        <img 
          v-if="item.images[0]"
          :src="$config.url+'/'+item.images[0].image"
        />
      </template>
      <template v-slot:[`item.isActive`]="{ item }">
        <v-simple-checkbox
          v-model="item.isActive"
          disabled
          style="cursor:pointer"
          @click="checkButton(item)"
        ></v-simple-checkbox>
      </template>
      
      <template v-slot:[`item.actions`]="{ item }">
          <v-btn color="info" style="margin-right:10px" @click="$redirect(`/sellers/products/edit/${item.product_id}`)">
            Açmak
          </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data(){
    return{
      loading:false,
      dialogDownload:false,
      page:0,
      options:{},
      rules: [
        value => !!value || 'Required.',
      ],
      result:false,
      data:[],
      work:false,
    }
  },
  watch:{
    options: {
      handler() {
        this.getDessertsFromApi();
      },
    }
  },
  async asyncData({ $axios, params }){
    let data = '';
    try {
      const res = await $axios.get(`/admin/seller/${params.id}?limit=10&offset=0`)
      data = res.data;
      var count = res.data.count;
    } catch ({response}) {
      console.log(response.data.message);
    }
    return {data,count};
  },
  computed:{
    headers(){
      return [
          { text: 'ID', value: 'id'},
          { text: 'Ady', value: 'name' },
          { text: 'Suraty', value: 'image' },
          { text: 'Işjeň', value: 'isActive'},
          { text: 'Düwmeler', value: 'actions', sortable: false }
        ]
    }
  },
  methods:{
    async getDessertsFromApi() {
      const { page, itemsPerPage } = this.options;
      if(page>1 || this.work){
        this.work = true;
        try {
          const res = await this.$axios.get(`/admin/seller/${this.$route.params.id}?limit=${itemsPerPage}&offset=${(page-1)*10}`)
          this.data.products = res.data.seller.seller_product;
        } catch ({response}) {
          console.log(response.data.message);
        }
      }
    },
    save(){
      this.$router.push("/markets");
    },
    async isActiveSeller(){
      try {
        await this.$axios.post('/admin/seller/isActive',{isActive:this.data.isActive,seller_id:this.data.seller_id});  
      } catch ({response}) {
        console.log(response.data.message);
      }
    },
    async checkButton(item){
      try {
        const res = await this.$axios.patch('/admin/products/edit-status/'+item.product_id,{isActive:!item.isActive})
        if(res.status === 200){
          for(let i = 0; i<this.data.products.length; i++){
            if(this.data.products[i].product_id === item.product_id){
              this.data.products[i].isActive = !item.isActive
            }
          }
        }
      } catch ({response}) {
        console.log(response.data.message);
      }
    }
  }
}
</script>

<style>

</style>