<template>
  <div>
    <v-card>
      <v-card-title>
        <v-col cols="3">
          <v-select
            :label="$t('filter')"
            :items="[`Garashylyar`,`Kabul edildi`,`Gowshuryldy`,`Yatyryldy`,`Hemmesini görmek`]"
            @change="filter($event)"
            single-line
          ></v-select>
        </v-col>
        <v-col cols="2"></v-col>
        <v-col cols="3">
          <v-text-field
            v-model="search"
            :label="$t('search')"
            single-line
            @keydown.enter="searchFunc"
          ></v-text-field>
        </v-col>
        <v-col cols="2"></v-col>
        <!-- <v-col cols="2">
          <v-btn  class="download" @click="dialogDownload = true">{{$t('download')}}</v-btn>
        </v-col> -->
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="desserts"
        :server-items-length="count"
        :options.sync="options"
      >
        <!-- <template v-slot:[`item.id`]="{ item }">
          {{Number(page-1)*10+Number(desserts.indexOf(item)+1)}}
        </template> -->

        <template v-slot:[`item.actions`]="{ item }">
          <v-btn color="info" style="margin-right:10px" @click="$redirect(`/orders/${item.order_id}`)">
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
    <template>
      <v-row justify="center">

        <v-dialog
          v-model="dialogDownload"
          max-width="400"
          light
        >
          <v-card>
            <v-card-title>{{$t('downloadSort')}}</v-card-title>
            <v-col>
              <v-row>
                <v-col>
                  <v-text-field dense :label="$t('startTime')" type="date" v-model="downloadData.startTime"></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field dense :label="$t('endTime')" type="date" v-model="downloadData.endTime"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field dense :label="$t('phoneNumber')" v-model="downloadData.phoneNumber"></v-text-field>
                </v-col>
              </v-row>
            </v-col>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                color="green darken-1"
                text
                @click="dialogDownload = false"
              >
                {{$t('close')}}
              </v-btn>

              <v-btn
                color="green darken-1"
                text
                @click="download"
              >
                {{$t('ok')}}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
    
    <a class="excel" style="display:none" href="">ok</a>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      loadingOne:false,
      search: '',
      dialogDelete: false,
      dialogDownload:false,
      downloadData:{
        startTime:'',
        endTime:'',
        phoneNumber:'',
      },
      headers: [],
      page:1,
      options:{},
      deleteItemValue:{}
    }
  },
  computed:{
     ...mapGetters({
      desserts: 'orders/orders',
      lang: 'language/language',
      count: 'orders/count'
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
    },
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
      await this.$store.dispatch(`orders/fetchOrders` , {limit:itemsPerPage,offset:(page-1)*10,keyword:searchValue,status:active});
    },
    filter(e){
      if(e == 'Hemmesini görmek'){
        this.getDessertsFromApi(this.search,undefined);
      }else{
        this.getDessertsFromApi(this.search,e);
      }
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
        const res = await this.$axios.delete(`/admin/orders/${this.deleteItemValue.order_id}`);
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
          { text: 'Идентификатор', value: 'id' },
          // { text: 'Имя', value: 'name' },
          { text: 'Номер телефона', value: 'user_phone' },
          { text: 'Статус', value: 'status' },
          { text: 'Дата/Время', value: 'delivery_time' },
          { text: 'Действия', value: 'actions', sortable: false }
        ]
      }else{
        this.headers = [
          { text: 'ID', value: 'id'},
          // { text: 'Ady', value: 'name' },
          { text: 'Telefon nomer', value: 'user_phone' },
          { text: 'Ýagdaýy', value: 'status' },
          { text: 'Senesi/wagty', value: 'delivery_time' },
          { text: 'Actions', value: 'actions', sortable: false }
        ]
      }
    },
    searchFunc(){
      this.getDessertsFromApi(this.search)
    },
    async download(){
      console.log(this.downloadData);
      this.dialogDownload = false;
      const a = this.downloadData.startTime ? true : false;
      const b = this.downloadData.endTime ? true : false;
      if(a==b){
        const excel = document.querySelector(".excel");
        excel.setAttribute('href',`${this.$config.url}/admin/orders/hasabat?startTime=${this.downloadData.startTime}&endTime=${this.downloadData.endTime}&phoneNumber=${this.downloadData.phoneNumber}`);
        excel.click();  
        this.downloadData.startTime = '';
        this.downloadData.endTime = '';
        this.downloadData.phoneNumber = '';
      }else{
        alert(this.$t('fillFree'))
      }
    },
    // async loader(id){
    //   const excel = document.querySelector(".excel");
    //   excel.setAttribute('href',`${this.$config.url}/admin/orders/check/${id}/check`);
    //   excel.click(); 
    // }
  }
}
</script>

<style>
  .download{
    cursor: pointer;
    margin-top: 20px;
    border: 1px solid white;
    display: inline-block;
    padding: 5px 10px;
    border-radius: 20px;
  }
</style>