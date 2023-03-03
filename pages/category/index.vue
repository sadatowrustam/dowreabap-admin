<template>
  <div>
    <v-btn
      color="info"
      class="mb-5"
      @click="$redirect('/category/add')"
    >
    {{$t('add')}} 
    </v-btn>

    <v-col cols="6">
      <v-text-field
        v-model="search"
        :label="$t('search')"
        single-line
        @keydown.enter="searchFunc"
      ></v-text-field>
    </v-col>

    <div class="tableContainer">
      <div v-for="(kategory , index) in kategories" :key="index" class="list">
        <v-col style="padding:0">
          <nuxt-link :to="'category/subCategory/'+kategory.category_id">
            {{kategory.name_ru}}
          </nuxt-link>
        </v-col>
        <v-col style="padding:0">
          <nuxt-link :to="'category/subCategory/'+kategory.category_id">
            {{kategory.name_tm}}
          </nuxt-link>
        </v-col>
        <v-col style="padding:0">
          <nuxt-link :to="'category/subCategory/'+kategory.category_id">
            {{kategory.name_en}}
          </nuxt-link>
        </v-col>
        <div class="btns">
          <v-btn
            color="info"
            class="mb-5"
            @click="$redirect('/category/edit/'+kategory.id)"
          >
            {{$t('open')}}
          </v-btn>
          <v-btn
            color="error"
            class="mb-5"
            @click="deleteItem(kategory.category_id)"
            >
            {{$t('delete')}}
            <!-- @click="deleteItem(kategory.category_id)" -->
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
    }
  },
  computed:{
    ...mapGetters({
      kategories: 'kategory/kategory',
      lang: 'language/language',
    }),
  },
  methods:{
    async hi(){
      await this.$store.dispatch('kategory/fetchkategory','hi')
    },
    async deleteItem(item){
      try {
        const res = await this.$axios.delete(`/admin/categories/delete/${item}`)
        if(res.status == 200){
          await this.$store.dispatch('kategory/fetchkategory')
          this.$router.push('/category')
        }
      } catch (error) {
        console.log(error);
      }
    },
    async searchFunc(){
      await this.$store.dispatch('kategory/fetchkategory',this.search)
    }
  }
}
</script>

<style>

</style>