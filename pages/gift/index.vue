<template>
  <div>
    <v-btn
      color="info"
      class="mb-5"
      @click="$redirect('/gift/add')"
    >
    {{$t('add')}} 
    </v-btn>

    <v-card>
      <v-data-table
        :headers="headers"
        :items="gifts"
        :server-items-length="count"
        :options.sync="options"
      >
        <template v-slot:[`item.id`]="{ item }">
          {{ Number((page-1))*10+Number(gifts.indexOf(item)+1)}}
        </template>
        <template v-slot:[`item.image`]="{ item }">
          <img 
            :src="$config.url+'/'+item.image" 
            :alt="item.name"
          />
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn color="info" style="margin-right:10px" @click="$redirect(`/gift/edit/${item.gift_id}`)">
            {{$t('open')}}
          </v-btn>
          <v-btn color="error" @click="deleteItem(item)">
            {{$t('delete')}}
          </v-btn>
        </template>
        <template v-slot:top>
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
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data(){
    return{
      search: '',
      page:0,
      dialogDelete: false,
      headers: [],
      options:{},
      deleteItemValue:'',
    }
  },
  computed:{
     ...mapGetters({
      lang: 'language/language',
      gifts: 'gifts/gift',
      count: 'gifts/giftCount',
    }),
  },
  watch:{
    lang(){
      this.changeHeader()
    },
    options: {
      handler() {
        this.getDessertsFromApi();
      },
      deep: true
    }
  },
  mounted(){
    this.changeHeader()
    document.querySelector(".v-data-footer__icons-before button span").innerHTML = '<';
    document.querySelector(".v-data-footer__icons-after button span").innerHTML = '>';
  },
  methods:{
    async getDessertsFromApi(searchValue) {
      this.loading = true;
      const { sortBy, sortDesc, page, itemsPerPage } = this.options;
      console.log(itemsPerPage)
      this.page = page;
      await this.$store.dispatch(`gifts/fetchGifts` , {limit:itemsPerPage,offset:(page-1)*10});
    },
    deleteItem(item){
      this.dialogDelete = true;
      this.deleteItemValue = item;
    },
    closeDelete(){
      this.dialogDelete = false;
    },
    async deleteItemConfirm(){
      this.dialogDelete = false;
      try {
        const res = await this.$axios.delete(`/admin/gifts/${this.deleteItemValue.gift_id}`)
        if(res.status == 200){
          this.getDessertsFromApi();
        }
      } catch (error) {
        console.log(error);
      }
    },
    changeHeader(){
      if(this.lang === 'RU'){
        this.headers = [
          {text: 'Идентификатор', value: 'id'},
          { text: 'Имя', value: 'name_ru' },
          { text: 'Изображение', value: 'image' },
          { text: 'Действия', value: 'actions', sortable: false }
        ]
      }else{
        this.headers = [
          {text: 'ID', value: 'id'},
          { text: 'Ady', value: 'name_tm' },
          { text: 'Suraty', value: 'image' },
          { text: 'Actions', value: 'actions', sortable: false }
        ]
      }
    },
    searchFunc(){
      console.log("men ishledim ahyry"+this.search)
    }
  }
}
</script>

<style>
  .v-data-footer__select{
    opacity: 0;
  }
  td{
    min-height: 100px;
    /* padding-bottom: 2px !important; */
  }
  td>img{
    padding-bottom: 5px;
    object-fit: cover;
  }
</style>