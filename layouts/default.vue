<template>
  <v-app dark>
    <!-- right navbar -->
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
          <!-- v-for="(item, i) in items"
          :key="i"
          :to="item.to" -->
      <v-list>
        <v-list-item
          to="/"
          router
          exact
        >
          <v-list-item-action>
            <svg height="20" width="20"><path d="M3.333 17.5V7.521L10 2.5L16.667 7.521V17.5H11.25V11.854H8.729V17.5ZM5.083 15.75H6.979V10.104H13V15.75H14.917V8.396L10 4.688L5.083 8.396ZM10 10.208Z" fill="#FFFFFF"/></svg>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="$t('welcome')" />
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list>
        <v-list-item
          to="/orders"
          router
          exact
        >
          <v-list-item-action>
            <svg  height="20" width="20"><path d="M5.833 18.333Q5.125 18.333 4.625 17.833Q4.125 17.333 4.125 16.625Q4.125 15.917 4.625 15.417Q5.125 14.917 5.833 14.917Q6.542 14.917 7.042 15.417Q7.542 15.917 7.542 16.625Q7.542 17.333 7.042 17.833Q6.542 18.333 5.833 18.333ZM14.167 18.333Q13.458 18.333 12.958 17.833Q12.458 17.333 12.458 16.625Q12.458 15.917 12.958 15.417Q13.458 14.917 14.167 14.917Q14.875 14.917 15.375 15.417Q15.875 15.917 15.875 16.625Q15.875 17.333 15.375 17.833Q14.875 18.333 14.167 18.333ZM10 8.396 8.771 7.167 10.062 5.875H6.625V4.125H10.062L8.771 2.833L10 1.604L13.396 5ZM0.792 3.417V1.667H3.562L7.125 9.146H12.917Q12.917 9.146 12.917 9.146Q12.917 9.146 12.917 9.146L16.104 3.312H18.125L14.438 10Q14.208 10.417 13.812 10.656Q13.417 10.896 12.938 10.896H6.771L5.917 12.458Q5.917 12.458 5.917 12.458Q5.917 12.458 5.917 12.458H15.854V14.208H5.812Q4.875 14.208 4.375 13.365Q3.875 12.521 4.333 11.688L5.417 9.688L2.458 3.417Z" fill="#FFFFFF"/></svg>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="$t('orders')" />
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list>
        <v-list-item
          to="/products"
          router
          exact
        >
          <v-list-item-action>
            <svg height="20" width="20"><path d="M9.125 14.167H10.875V10.875H14.167V9.125H10.875V5.833H9.125V9.125H5.833V10.875H9.125ZM4.25 17.5Q3.521 17.5 3.01 16.99Q2.5 16.479 2.5 15.75V4.25Q2.5 3.521 3.01 3.01Q3.521 2.5 4.25 2.5H15.75Q16.479 2.5 16.99 3.01Q17.5 3.521 17.5 4.25V15.75Q17.5 16.479 16.99 16.99Q16.479 17.5 15.75 17.5ZM4.25 15.75H15.75Q15.75 15.75 15.75 15.75Q15.75 15.75 15.75 15.75V4.25Q15.75 4.25 15.75 4.25Q15.75 4.25 15.75 4.25H4.25Q4.25 4.25 4.25 4.25Q4.25 4.25 4.25 4.25V15.75Q4.25 15.75 4.25 15.75Q4.25 15.75 4.25 15.75ZM4.25 15.75Q4.25 15.75 4.25 15.75Q4.25 15.75 4.25 15.75V4.25Q4.25 4.25 4.25 4.25Q4.25 4.25 4.25 4.25Q4.25 4.25 4.25 4.25Q4.25 4.25 4.25 4.25V15.75Q4.25 15.75 4.25 15.75Q4.25 15.75 4.25 15.75Z" fill="#FFFFFF"/></svg>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="$t('products')" />
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list>
        <v-list-item
          to="/banner"
          router
          exact
        >
          <v-list-item-action>
            <svg height="20" width="20"><path d="M3.417 17.5Q2.688 17.5 2.177 16.99Q1.667 16.479 1.667 15.75V2.5L3.062 3.896L4.438 2.5L5.833 3.896L7.229 2.5L8.604 3.896L10 2.5L11.396 3.896L12.771 2.5L14.167 3.896L15.562 2.5L16.938 3.896L18.333 2.5V15.75Q18.333 16.479 17.823 16.99Q17.312 17.5 16.583 17.5ZM3.417 15.75H9.125V10.75H3.417V15.75Q3.417 15.75 3.417 15.75Q3.417 15.75 3.417 15.75ZM10.875 15.75H16.583Q16.583 15.75 16.583 15.75Q16.583 15.75 16.583 15.75V14.125H10.875ZM10.875 12.375H16.583V10.75H10.875ZM3.417 9H16.583V6.667H3.417Z" fill="#FFFFFF"/></svg>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="$t('banners')" />
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list>
        <v-list-item
          to="/sellers"
          router
          exact
        >
        <v-list-item-action>
          <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 4C2.72386 4 2.5 4.22386 2.5 4.5C2.5 4.77614 2.72386 5 3 5H9C9.27614 5 9.5 4.77614 9.5 4.5C9.5 4.22386 9.27614 4 9 4H3Z" fill="white"/>
            <path d="M2.5 6.5C2.5 6.22386 2.72386 6 3 6H9C9.27614 6 9.5 6.22386 9.5 6.5C9.5 6.77614 9.27614 7 9 7H3C2.72386 7 2.5 6.77614 2.5 6.5Z" fill="white"/>
            <path d="M3 8C2.72386 8 2.5 8.22386 2.5 8.5C2.5 8.77614 2.72386 9 3 9H9C9.27614 9 9.5 8.77614 9.5 8.5C9.5 8.22386 9.27614 8 9 8H3Z" fill="white"/>
            <path d="M3 10C2.72386 10 2.5 10.2239 2.5 10.5C2.5 10.7761 2.72386 11 3 11H6C6.27614 11 6.5 10.7761 6.5 10.5C6.5 10.2239 6.27614 10 6 10H3Z" fill="white"/>
            <path d="M0 2C0 0.89543 0.895431 0 2 0H10C11.1046 0 12 0.89543 12 2V14C12 15.1046 11.1046 16 10 16H2C0.895431 16 0 15.1046 0 14V2ZM10 1H2C1.44772 1 1 1.44772 1 2V14C1 14.5523 1.44772 15 2 15H10C10.5523 15 11 14.5523 11 14V2C11 1.44772 10.5523 1 10 1Z" fill="white"/>
          </svg>


          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="$t('sellers')" />
          </v-list-item-content>
        </v-list-item>
      </v-list>

      

      <v-list>
        <v-list-item
          to="/category"
          router
          exact
        >
          <v-list-item-action>
            <svg  height="20" width="20"><path d="M2.5 9.125V2.5H9.125V9.125ZM2.5 17.5V10.875H9.125V17.5ZM10.875 9.125V2.5H17.5V9.125ZM10.875 17.5V10.875H17.5V17.5ZM4.25 7.375H7.375V4.25H4.25ZM12.625 7.375H15.75V4.25H12.625ZM12.625 15.75H15.75V12.625H12.625ZM4.25 15.75H7.375V12.625H4.25ZM12.625 7.375ZM12.625 12.625ZM7.375 12.625ZM7.375 7.375Z" fill="#FFFFFF"/></svg>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-it em-title v-text="$t('category')" />
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <!-- drop downs -->


      <!-- Settings drop down -->
      <v-card
        class="mx-auto"
        max-width="500"
      >

        <v-list style="background-color: #363636; box-shadow: 4px 4px #363636;">
          <v-list-group>
            <template v-slot:activator>
              <v-list-item-action>
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.00004 4.75421C6.20745 4.75421 4.75427 6.20739 4.75427 7.99997C4.75427 9.79256 6.20745 11.2457 8.00004 11.2457C9.79262 11.2457 11.2458 9.79256 11.2458 7.99997C11.2458 6.20739 9.79262 4.75421 8.00004 4.75421ZM5.75427 7.99997C5.75427 6.75967 6.75973 5.75421 8.00004 5.75421C9.24034 5.75421 10.2458 6.75967 10.2458 7.99997C10.2458 9.24027 9.24034 10.2457 8.00004 10.2457C6.75973 10.2457 5.75427 9.24027 5.75427 7.99997Z" fill="white"/>
                  <path d="M9.79647 1.34338C9.26853 -0.447793 6.73147 -0.447791 6.20353 1.34338L6.10968 1.66179C5.95246 2.19519 5.34321 2.44755 4.85487 2.18155L4.56336 2.02276C2.9235 1.12953 1.12953 2.9235 2.02276 4.56336L2.18155 4.85487C2.44755 5.34321 2.19519 5.95246 1.66179 6.10968L1.34338 6.20353C-0.447793 6.73147 -0.447791 9.26853 1.34338 9.79647L1.66179 9.89032C2.19519 10.0475 2.44755 10.6568 2.18155 11.1451L2.02276 11.4366C1.12953 13.0765 2.92349 14.8705 4.56335 13.9772L4.85487 13.8184C5.34321 13.5524 5.95246 13.8048 6.10968 14.3382L6.20353 14.6566C6.73147 16.4478 9.26853 16.4478 9.79647 14.6566L9.89032 14.3382C10.0475 13.8048 10.6568 13.5524 11.1451 13.8184L11.4366 13.9772C13.0765 14.8705 14.8705 13.0765 13.9772 11.4366L13.8184 11.1451C13.5524 10.6568 13.8048 10.0475 14.3382 9.89032L14.6566 9.79647C16.4478 9.26853 16.4478 6.73147 14.6566 6.20353L14.3382 6.10968C13.8048 5.95246 13.5524 5.34321 13.8184 4.85487L13.9772 4.56335C14.8705 2.92349 13.0765 1.12953 11.4366 2.02276L11.1451 2.18155C10.6568 2.44755 10.0475 2.19519 9.89032 1.66179L9.79647 1.34338ZM7.16273 1.6261C7.40879 0.7913 8.59121 0.791301 8.83727 1.6261L8.93112 1.94451C9.26845 3.08899 10.5757 3.63046 11.6235 3.05972L11.915 2.90094C12.6793 2.48463 13.5154 3.32074 13.0991 4.08501L12.9403 4.37653C12.3695 5.42433 12.911 6.73155 14.0555 7.06888L14.3739 7.16273C15.2087 7.40879 15.2087 8.59121 14.3739 8.83727L14.0555 8.93112C12.911 9.26845 12.3695 10.5757 12.9403 11.6235L13.0991 11.915C13.5154 12.6793 12.6793 13.5154 11.915 13.0991L11.6235 12.9403C10.5757 12.3695 9.26845 12.911 8.93112 14.0555L8.83727 14.3739C8.59121 15.2087 7.40879 15.2087 7.16273 14.3739L7.06888 14.0555C6.73155 12.911 5.42433 12.3695 4.37653 12.9403L4.08501 13.0991C3.32074 13.5154 2.48463 12.6793 2.90093 11.915L3.05972 11.6235C3.63046 10.5757 3.089 9.26845 1.94452 8.93112L1.6261 8.83727C0.7913 8.59121 0.791301 7.40879 1.6261 7.16273L1.94451 7.06888C3.08899 6.73155 3.63046 5.42433 3.05972 4.37653L2.90093 4.08501C2.48463 3.32073 3.32074 2.48463 4.08501 2.90093L4.37653 3.05972C5.42432 3.63046 6.73155 3.089 7.06888 1.94452L7.16273 1.6261Z" fill="white"/>
                </svg>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-text="$t('settings')"></v-list-item-title>
              </v-list-item-content>
            </template>

            <!-- 2 -->

            <!-- 3 -->
            <v-list-item
              to="/profile"
              style="padding-left:30px"
            >
              <v-list-item-action>
                <svg width="16" height="16" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 6C7.65685 6 9 4.65685 9 3C9 1.34315 7.65685 0 6 0C4.34315 0 3 1.34315 3 3C3 4.65685 4.34315 6 6 6ZM8 3C8 4.10457 7.10457 5 6 5C4.89543 5 4 4.10457 4 3C4 1.89543 4.89543 1 6 1C7.10457 1 8 1.89543 8 3Z" fill="white"/>
                  <path d="M12 11C12 12 11 12 11 12H1C1 12 0 12 0 11C0 10 1 7 6 7C11 7 12 10 12 11ZM11 10.9965C10.9986 10.7497 10.8462 10.0104 10.1679 9.33211C9.51563 8.67985 8.2891 8 5.99999 8C3.71088 8 2.48435 8.67985 1.8321 9.33211C1.15375 10.0104 1.00142 10.7497 1 10.9965H11Z" fill="white"/>
                </svg>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-text="$t('profile')" />
              </v-list-item-content>
            </v-list-item>
            
          </v-list-group>
        </v-list>
      </v-card>


    </v-navigation-drawer>
    <!-- Header -->
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-btn icon @click.stop="drawer = !drawer" style="cursor:pointer">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 5.01L0 5V7H18V5.01ZM0 10H12V12H0V10ZM18 0H0V2.01L18 2V0Z" fill="#FFFFFF"/>
        </svg>
      </v-btn>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <svg height="20" width="20"><path d="M6.729 18.333 5.208 16.792 12 10 5.208 3.208 6.729 1.667 15.062 10Z" fill="#FFFFFF"/></svg>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <svg height="20" width="20"><path d="M13.812 10.958 9.042 6.188 13.812 1.417 18.583 6.188ZM2.5 9.25V2.5H9.229V9.25ZM10.771 17.5V10.771H17.5V17.5ZM2.5 17.5V10.771H9.229V17.5ZM4.25 7.5H7.479V4.271H4.25ZM13.833 8.479 16.104 6.208 13.833 3.938 11.562 6.208ZM12.521 15.75H15.75V12.521H12.521ZM4.25 15.75H7.479V12.521H4.25ZM7.479 7.5ZM11.562 6.208ZM7.479 12.521ZM12.521 12.521Z" fill="#FFFFFF"/></svg>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <svg height="20" width="20"><path d="M4.167 10.833V9.083H15.833V10.833Z" fill="#FFFFFF"/></svg>
      </v-btn>
      <v-spacer />

      <v-col cols="1" style="margin-bottom:-10px">
        <v-select
          v-model="currentLanguage.name"
          :items="languages"
          @change="changeLanguage($event)"
        ></v-select>
      </v-col>

      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
          <path d="M18 5.01L0 5V7H18V5.01ZM0 10H12V12H0V10ZM18 0H0V2.01L18 2V0Z" fill="#FFFFFF"/>
        </svg>
      </v-btn>
    </v-app-bar>

    <!-- main -->
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <svg height="20" width="20"><path d="M5.875 18.333 2.5 14.958 5.792 11.667 7.042 12.917 5.875 14.083H14.083V10.833H15.833V15.833H5.875L7.125 17.083ZM4.167 9.167V4.167H14.125L12.875 2.917L14.125 1.667L17.5 5.042L14.188 8.354L12.938 7.104L14.125 5.917H5.917V9.167Z" fill="#FFFFFF"/></svg>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Footer -->
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters , mapActions} from 'vuex'
export default {
  name: 'DefaultLayout',
  middleware: 'admin-middleware',
  data() {
    return {
      languages:['RU','TM'],
      language:'RU',
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          action: 'mdi-ticket',
          items: [{ title: 'List Item' }],
          title: 'Group',
          active: false
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
    }
  },
  created() {
    const adminToken = this.$cookies.get('admin-token')
    if (adminToken) {
      this.$store.dispatch('admin/setAdminToken', adminToken)
    }
  },
  computed:{
    currentLanguage() {
      return this.$i18n.locales.find(
        (locale) => locale.code === this.$i18n.locale
      )
    },
  },

  methods:{
    changeLanguage(language){
      this.$i18n.setLocale(language);
      this.languageFunc(language);
    },
    ...mapActions({
      languageFunc : 'language/fetchLanguage'
    }),
    playSound(){
      const audio = new Audio(this.notificationSound);
      audio.play();
    }
  },
}
</script>

<style>
.v-list-item__title{
  font-size: 14px;
}
.v-list-item__action{
  margin-right: 10px !important;
}
.custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>