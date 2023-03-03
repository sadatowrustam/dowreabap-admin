<template>
  <div>
    <v-btn
      color="info"
      class="mb-5"
      @click="$redirect('/sellers/add')"
    >
    {{$t('add')}} 
    </v-btn>

    <v-card>
      <v-card-title>
        <!-- <v-select
          :label="$t('filter')"
          :items="[`${$t('active')}`,`${$t('notActive')}`,`${$t('seeAll')}` ]"
          @change="filter($event)"
          single-line
        ></v-select> -->
        <!-- <v-spacer></v-spacer> -->
        <!-- <v-col cols="6">
          <v-text-field
            v-model="search"
            :label="$t('search')"
            single-line
            @keydown.enter="searchFunc"
          ></v-text-field>
        </v-col> -->
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="products"
        :server-items-length="count"
        :options.sync="options"
      >
        <template v-slot:[`item.id`]="{ item }">
          {{Number(page-1)*10+Number(products.indexOf(item)+1)}}
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn color="info" style="margin-right:10px" @click="$redirect(`/sellers/open/${item.seller_id}`)">
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
      page:0,
      search: undefined,
      dialogDelete: false,
      headers: [],
      options:{},
      deleteItemValue:{}
    }
  },
  computed:{
     ...mapGetters({
      lang: 'language/language',
      products: 'sellers/seller',
      count:"sellers/count"
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
    async getDessertsFromApi(searchValue,active) {
      this.loading = true;
      const { sortBy, sortDesc, page, itemsPerPage } = this.options;
      this.page = page;
      await this.$store.dispatch(`sellers/fetchSellers` , {limit:itemsPerPage,offset:(page-1)*10,name:sortBy[0],bool:sortDesc[0],keyword:searchValue,isActive:active});
    },
    deleteItem(item){
      this.dialogDelete = true;
      this.deleteItemValue = item
    },
    closeDelete(){
      this.dialogDelete = false;
    },
    async deleteItemConfirm(){
      this.dialogDelete = false;
      try {
        const res = await this.$axios.delete(`/admin/texts/${this.deleteItemValue.text_id}`)
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
          { text: 'Имя', value: 'name' },
          { text: 'Image', value: 'image'},
          { text: 'Действия', value: 'actions', sortable: false }
        ]
      }else{
        this.headers = [
          {text: 'ID', value: 'id'},
          { text: 'Ady', value: 'name' },
          { text: 'Image', value: 'image'},
          { text: 'Actions', value: 'actions', sortable: false }
        ]
      }
    },
    async searchFunc(){
      this.getDessertsFromApi(this.search)
    },
  }
}
</script>

<style>
  .v-data-footer__select{
    opacity: 0;
  }
  td{
    min-height: 100px;
    padding-bottom: 2px !important;
  }
  td>img{
    padding-bottom: 5px;
    object-fit: cover;
  }
</style>