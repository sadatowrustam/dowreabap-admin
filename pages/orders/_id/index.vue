<template>
  <div class="order_id">
    <v-row style="margin:20px">
      <v-col cols="3">
        <v-row class="vRow">{{$t('address')}}</v-row>
        <v-row class="vRow">{{$t('phoneNumber')}}</v-row>
        <v-row class="vRow">{{$t('totalCost')}}</v-row>
        <v-row class="vRow">{{$t('totalProduct')}}</v-row>
        <v-row class="vRow">{{$t('paymentType')}}</v-row>
        <v-row class="vRow" v-if="order.delivery_time">{{$t('deliveryTime')}}</v-row>
        <v-row class="vRow">{{$t('status')}}</v-row>
      </v-col>
      <v-col cols="6">
        <v-row class="vRow">{{order.address}}</v-row>
        <v-row class="vRow">{{order.user_phone}}</v-row>
        <v-row class="vRow">{{order.total_price}}</v-row>
        <v-row class="vRow">{{order.total_quantity}}</v-row>
        <v-row class="vRow">{{$t(order.payment_type)}}</v-row>
        <v-row class="vRow" v-if="order.delivery_time">{{order.delivery_time}}</v-row>
        <v-row class="vRow">
          <v-col cols="5">
            <v-select
              v-model="status[lang]"
              :items="['Garashylyar',`Kabul edildi`,`Gowshuryldy`,`Yatyryldy`]"
              @change="statusChange($event)"
              style="margin-top:-30px; margin-left:-10px"
            ></v-select>
          </v-col>
        </v-row>
      </v-col>
    </v-row>


    <v-data-table
      :headers="headers"
      :items="orderProducts"
    >
      <template  v-slot:[`item.quantity`]="{ item }">
        <v-edit-dialog
          :return-value.sync="item.quantity"
          large
          persistent
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="close"
          :save-text="$t('save')"
          :cancel-text="$t('cancel')"
        >
          <div>{{ item.quantity }}</div>
          
          <template v-slot:input>
            <div class="mt-4 text-h6">
              {{$t('updateQuantity')}}
            </div>
            <v-text-field
              v-model="item.quantity"
              :rules="[max25chars]"
              label="Edit"
              single-line
              counter
              autofocus
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:[`item.image`]="{ item }">
        <img 
          :src="$config.url+'/'+item.image" 
          :alt="item.name"
        />
      </template>
      <template v-slot:[`item.id`]="{ item }">
        {{Number(page-1)*10+Number(orderProducts.indexOf(item)+1)}}
      </template>
    </v-data-table>

    <v-snackbar
      v-model="snack"
      :timeout="2000"
      :color="snackColor"
    >
      {{ snackText }}

      <template v-slot:action="{ attrs }">
        <v-btn
          v-bind="attrs"
          text
          @click="snack = false"
        >
          {{$t('close')}}
        </v-btn>
      </template>
    </v-snackbar>

  

    <v-btn @click="chapOpen = true" class="chapOpen">{{$t('print')}}</v-btn>

    <div class="chapPage" v-if="chapOpen">
      <div id="printMe">
        <Print :order="order" :orderProducts="orderProducts" :giftProducts="giftProduct"/>
      </div>
      <v-btn v-print="'#printMe'">{{$t('print')}}</v-btn>
      <!-- <v-btn @click="printF">{{$t('print')}}</v-btn> -->
      <v-btn @click="chapOpen = false" color="red">{{$t('close')}}</v-btn>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Print from '~/components/Print.vue';
export default {
    components: [Print],
    data() {
        return {
            status: {
                TM: "",
                RU: ""
            },
            chapOpen: false,
            globalType: "",
            clientMessage: "",
            page: 1,
            snack: false,
            snackColor: "",
            snackText: "",
            max25chars: v => v.length <= 25,
            pagination: {},
            headers: []
             };
    },
    computed: {
        ...mapGetters({
            lang: "language/language",
        }),
    },
    watch: {
        lang() {
            this.changeHeader();
        }
    },
    async asyncData({ $axios, route }) {
        try {
            const productId = route.params.id;
            let { data } = await $axios.get(`/admin/orders/order-products/${productId}`);
            const { order } = data;
            const { orderProducts } = data;
            return { order, orderProducts };
        }
        catch (err) {
            console.log(err);
        }
    },
    async mounted() {
        this.changeHeader();
        this.status.TM = this.order.status;
        this.status.RU = this.order.status;
    },
    methods: {
        changeHeader() {
            if (this.lang === "RU") {
                this.headers = [
                    { text: "ID", value: "id" },
                    { text: "Имя", value: "name_ru" },
                    { text: "Изображение", value: "image" },
                    { text: "Цена", value: "total_price" },
                    { text: "Код продукта", value: "product_code" },
                    { text: "Количество", value: "quantity" },
                ];
            }
            else {
                this.headers = [
                    { text: "ID", value: "id" },
                    { text: "Ady", value: "name_tm" },
                    { text: "Suraty", value: "image" },
                    { text: "Bahasy", value: "total_price" },
                    { text: "Hary kody", value: "product_code" },
                    { text: "Sany", value: "quantity" },
                ];
            }
        },
        async statusChange(type) {
            try {
                const { data } = await this.$axios.post(`/admin/orders/status/${this.$route.params.id}`, { status: type });
                if (data && this.clientMessage) {
                    const data = await this.$axios.post(`/admin/orders/send-message/one`, { message: this.clientMessage, user_phone: this.order.user_phone });
                    if (data.status == 200) {
                    }
                }
                else {
                    // alert(this.$t('save'));
                }
            }
            catch (error) {
                console.log(error);
            }
        },
        async save() {
            this.snack = true;
            this.snackColor = "success";
            this.snackText = "Data saved";
            let id;
            let quantity;
            for (let i = 0; i < this.orderProducts.length; i++) {
                const type = typeof (this.orderProducts[i].quantity);
                if (type == "string") {
                    quantity = Number(this.orderProducts[i].quantity);
                    id = this.orderProducts[i].order_product_id;
                    try {
                        quantity = Number(quantity);
                        const { data } = await this.$axios.patch(`/admin/orders/product/${id}`, { quantity });
                        if (data) {
                            this.order.total_price = data.order.total_price.toFixed(2);
                            this.order.total_quantity = data.order.total_quantity;
                        }
                    }
                    catch (error) {
                        console.log(error);
                    }
                    break;
                }
            }
        },
        cancel() {
            this.snack = true;
            this.snackColor = "error";
            this.snackText = "Canceled";
        },
        open() {
            this.snack = true;
            this.snackColor = "info";
            this.snackText = "Dialog opened";
        },
        close() {
        },
        printF() {
            window.print();
        }
    },
    components: { Print }
}
</script>

<style lang="scss">
  .order_id{
    .vRow{
      margin-bottom:15px;
    }
     .v-data-footer__select{
       opacity: 0;
     }
     td{
       min-height: 100px;
     }
     td>img{
       object-fit: cover;
     }
     #printMe{
      width: 60%;
     }
     .chapPage{
       position: fixed;
       top: 0;
       left: 0;
       z-index: 100;
       width: 100%;
       height: 100vh;
       background: white;
       display: flex;
       align-items: center;
       justify-content: center;
     }
     .chapPage table{
       color: black;
     }
     .chapPage th, .chapPage td{
       border: 1px solid black;
     }
     .chapPage td{
       min-height: auto;
     }
     .chapPage button:nth-child(2){
       position: fixed;
       top: 20px;
       right: 20px;
     }
     .chapPage button:last-child{
       position: fixed;
       top: 20px;
       right: 170px;
     }
     .chapOpen{
       margin-top: 20px;
     }
     @media print{
      .chapPage button {
        display: none !important;
      }
     }
  }
</style>
