<template>
  <div class="print">
    <div class="print_body">
      <div class="print_header">
        <div class="print_logo">
          <img src="~/assets/logo.svg" alt="">
        </div>
        <div class="print_name">
          <h2 class="print_name_name">Tek_sut.com</h2>
          <div class="print_name_quote">Tiz Yenil Amatly</div>
        </div>
        <div class="print_date">
          <div class="print_date_day">{{order.createdAt.slice(0,10)}}ý</div>
          <div class="print_date_clock">{{order.createdAt.slice(11,16)}}</div>
        </div>
      </div>
      <div class="infos">
        <div>Ady:</div>
        <div>{{order.user_name}}</div>
        <div>Töleg görnüş:</div>
        <div>{{order.payment_type}}</div>
        <div>Telefon belgi:</div>
        <div>{{order.user_phone}}</div>
        <div>Wagty:</div>
        <div>{{order.delivery_time.slice(6,15)=='undefined' ? order.delivery_time.slice(0,5):order.delivery_time}}</div>
      </div>
      <!--<table>
        <tr>
          <td style="width:50%">Ady:</td>
          <td style="width:50%">{{order.user_name}}</td>
          <td style="width:150%">Töleg görnüş:</td>
          <td>{{order.payment_type}}</td>
          <td style="width:150%">Telefon belgi:</td>
          <th>{{order.user_phone}}</th>
        </tr>
        <tr>
          <td style="width:50%">Kurýer:</td>
          <td style="width:50%"><input type="text" style="outline:none" placeholder="name"></td>
          <td style="width:50%">Wagty:</td>
          <td style="width:150%">{{order.delivery_time.slice(6,15)=='undefined' ? order.delivery_time.slice(0,5):order.delivery_time}}</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td style="width:calc(100% - 48px)">Bellik:</td>
          <td style="width:300%">{{order.note}}</td>
        </tr>
        <tr>
          <td style="width:calc(100% - 48px)">Salgysy:</td>
          <th style="width:300%">{{order.address}}</th>
        </tr>
        <tr>
          <td>Wagty:</td>
          <td>{{order.delivery_time.slice(6,15)=='undefined' ? order.delivery_time.slice(0,5):order.delivery_time}}</td>
          <td></td>
          <td></td>
        </tr>
      </table> -->

      <table id="printProducts">
        <tr style="border-bottom: 1px solid black !important;border-top: 1px solid black !important;">
          <th>Haryt id</th>
          <th>Haryt Kody</th>
          <th>Harydyň ady</th>
          <th>Sany</th>
          <th>Bahasy</th>
          <th>Jemi</th>
        </tr>
        <tr v-for="(order,i) in orderProducts" :key="i">
          <td>{{order.order_product_id}}</td>
          <td>{{order.product_code}}</td>
          <td>{{order.name_tm}}</td>
          <td>{{order.quantity}}</td>
          <td>{{order.price}}</td>
          <td>{{order.total_price}}</td>
        </tr>
      </table>
      <div style="display:flex; justify-content:space-between; align-items: center;">
        <div style="margin-top:10px"><b>Söwdaňyz üçin sagboluň!!!</b></div>
        <div style="text-align:right;margin-top: 10px;">Umumy baha: {{order.total_price}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'order',
    'orderProducts',
    'giftProducts'
  ],
}
</script>

<style lang="scss">
  .infos{
    width: 100%;
    div{
      display: inline-block;
      &:nth-child(even){
        margin-right: 50px;
      }
    }
  }
  .print{
    color: black;
    width: 100%;
    height: 100vh;
    font-size: 14px;

    &_body{
      width: 100%;
    }

    &_header{
      display: flex;
      justify-content: space-between;
      padding: 0 12px;
      // margin-bottom: 10px;
    }
    &_logo{
      height: 60px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    &_name{
      text-align: center;
      margin:0 20px;
      h2{
        line-height: 25px;
      }
    }
    &_date{
      text-align: right;
    }
    table{
      width: 100%;
    }

    td,th{
      border: none !important;
      padding: 3px 12px;
      text-align: left;
    }
  }
  #printProducts{
    margin-top: 15px;
    border-bottom: 1px solid black;
  }
</style>