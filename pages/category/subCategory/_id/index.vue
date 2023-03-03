<template>
  <div>
    <v-btn
      color="info"
      class="mb-5"
      @click="$redirect(`/category/subCategory/${id}/add`)"
    >
    {{$t('add')}} 
    </v-btn>

    <!-- <v-col cols="6">
      <v-text-field
        v-model="search"
        :label="$t('search')"
        single-line
        @keydown.enter="searchFunc"
      ></v-text-field>
    </v-col> -->

    <div class="tableContainer">
      <div v-for="(subCategory , index) in subCategories" :key="index" class="list">
        <v-col>
          {{subCategory.name_ru}}
        </v-col>
        <v-col>
          {{subCategory.name_tm}}
        </v-col>
        <div class="btns">
          <v-btn
            color="info"
            class="mb-5"
            @click="$redirect(`/category/subCategory/${subCategory.subcategory_id}/edit?categoryId=${id}`)"
          >
            {{$t('open')}}
          </v-btn>
          <v-btn
            color="error"
            class="mb-5"
            @click="deleteItem(subCategory.subcategory_id)"
          >
            {{$t('delete')}}
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      search: '',
      dialogDelete: false,
      headers: [],
      id:0,
      subCategories:[],
    }
  },
  computed:{
    ...mapGetters({
      kategories: 'kategory/kategory',
      lang: 'language/language',
    }),
  },
  mounted(){
    this.id = this.$route.params.id
    const id = this.id
    const category = this.kategories.find(function(e){
      return e.category_id === id
    });
    this.subCategories = category.category_subcategories;
  },
  methods:{
    async deleteItem(item){
      try {
        const res = await this.$axios.delete(`/admin/subcategories/delete/${item}`);
        if(res.status == 200){
          await this.$store.dispatch('kategory/fetchkategory');
          document.location.reload();
        }
      } catch (error) {
        console.log(error);
      }
    },
    searchFunc(){
      console.log("men ishledim ahyry"+this.search)
    }
  }
}
</script>

<style>

</style>