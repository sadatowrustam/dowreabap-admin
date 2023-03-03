<template>
  <div>
    <v-btn
      color="info"
      class="mb-5"
      @click="$redirect('/banner/add')"
    >
    {{$t('add')}} 
    </v-btn>
    <v-card>
      <!-- <v-card-title>
        <v-select
          :label="$t('filter')"
          :items="['Uludan kica', 'Kichiden ula']"
          @change="filter($event)"
          single-line
        ></v-select>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          :label="$t('search')"
          single-line
          @keydown.enter="searchFunc"
        ></v-text-field>
      </v-card-title> -->
      <v-data-table
        :headers="headers"
        :items="banners"
        :options.sync="options"
      >
        <template v-slot:[`item.id`]="{ item }">
          {{ Number((page-1))*10+Number(banners.indexOf(item)+1)}}
        </template>
        <template v-slot:[`item.image`]="{ item }">
          <img 
            :src="$config.url+'/'+item.image" 
            :alt="item.name"
          />
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn color="info" style="margin-right:10px" @click="$redirect(`/banner/edit/${item.banner_id}`)">
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
      banners: 'banner/banner',
      count: 'banner/bannerCount',
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
      this.page = page;
      await this.$store.dispatch(`banner/fetchBanners` , {limit:itemsPerPage,offset:(page-1)*10});
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
      // console.log(this.deleteItemValue)
      try {
        const res = await this.$axios.delete(`/admin/banners/${this.deleteItemValue.banner_id}`)
        if(res.status == 200){
          this.getDessertsFromApi();
        }
        // if(res.status == 200){
        // }
      } catch (error) {
        console.log(error);
      }
    },
    changeHeader(){
      if(this.lang === 'RU'){
        this.headers = [
          {text: 'Идентификатор', value: 'id'},
          { text: 'Изображение', value: 'image' },
          { text: 'Действия', value: 'actions', sortable: false }
        ]
      }else{
        this.headers = [
          {text: 'ID', value: 'id'},
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