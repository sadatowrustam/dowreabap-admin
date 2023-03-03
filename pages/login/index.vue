<template>
  <v-card
    class="fill-height login-form__wrapper d-flex flex-column justify-center align-center"
  >
    <h2>{{$t('wellcomeBack')}}</h2>
    <v-form
      ref="login-form"
      v-model="valid"
      lazy-validation
      class="login-form d-flex flex-column"
      @submit.prevent="login"
    >
      <v-text-field
        v-model="admin.username"
        :rules="phoneNumberRules"
        :label="$t('phoneNumber')"
        required
        class="mb-5"
      ></v-text-field>

      <v-text-field
        type="password"
        v-model="admin.password"
        :rules="passwordRules"
        :label="$t('pass')"
        required
        class="mb-5"
      ></v-text-field>

      
      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        type="submit"
        :loading="loggingIn"
        >
        login
      </v-btn>
      <v-col cols="2" style="padding-left:0;margin-top: 30px;">
        <v-btn color="red" @click="forgotPass">{{$t('forgotPass')}}</v-btn>
      </v-col>
    </v-form>
  </v-card>
</template>

<script>
export default {
  layout: 'empty',

  middleware({ app, redirect }) {
    const admin = app.store.getters['admin/admin'] || app.$cookies.get('admin')

    if (admin){
      redirect('/')
    } 
  },

  data: () => ({
    valid: true,
    admin: {
      username: '',
      password: '',
    },
    phoneNumberRules: [(v) => !!v || 'Укажите номер телефона'],
    passwordRules: [(v) => !!v || 'Hеобходим пароль'],
    loggingIn: false,
  }),

  computed: {
    loginForm() {
      return this.$refs['login-form']
    },
  },

  methods: {
    async login() {
      this.loggingIn = true

      try {
        const isValid = await this.loginForm.validate()

        if (isValid) {
          const { data } = await this.$axios.post('/admin/login', this.admin)
          const { token } = data
          const user = data.data.admin.username
          this.$store.dispatch('admin/setAdmin', user)
          this.$store.dispatch('admin/setAdminToken', token)
          this.$cookies.set('admin', user)
          this.$cookies.set('admin-token', token)

          await this.$store.dispatch('fetchData')
          await this.$router.push('/')

          this.loggingIn = false
        }
      } catch (err) {
        console.log(err)
      }

      this.loggingIn = false
    },
    forgotPass : async ()=>{
      
    }
  },
}
</script>

<style scoped lang="scss">
.login-form {
  padding: 1rem;
  width: 600px;

  &__wrapper {
    width: 100%;
  }
}
</style>
