<template>
<v-app>
    <v-navigation-drawer v-if="$store.state.isLoggedIn !== null" v-model="drawer.opened" app :right="drawer.isRight" id="sidebarDrawer">
        <div class="drawer-topbar">
            <v-app-bar flat>
                <v-toolbar-title class="pa-0">
                    <v-list>
                        <v-list-item two-line>
                            <v-list-item-content>
                                <v-list-item-title>Application</v-list-item-title>
                                <v-list-item-subtitle>Subtext</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-toolbar-title>
            </v-app-bar>
        </div>

        <v-list class="drawer-list">
            <v-list-item link to="/">
                <v-list-item-action>
                    <v-icon>mdi-home</v-icon>
                </v-list-item-action>

                <v-list-item-content>
                    <v-list-item-title>{{ $t('sidebar.home') }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-list-group prepend-icon="mdi-hospital">
                <template v-slot:activator>
                    <v-list-item-title>{{ $t('sidebar.clinics') }}</v-list-item-title>
                </template>

                <v-list-item link to="/clinic/add">
                    <v-list-item-icon v-if="drawer.isRight">
                        <v-icon>mdi-menu-left</v-icon>
                    </v-list-item-icon>

                    <v-list-item-icon v-else>
                        <v-icon>mdi-menu-right</v-icon>
                    </v-list-item-icon>

                    <v-list-item-title>{{ $t('sidebar.addClinic') }}</v-list-item-title>
                </v-list-item>

                <v-list-item link to="/clinics">
                    <v-list-item-icon v-if="drawer.isRight">
                        <v-icon>mdi-menu-left</v-icon>
                    </v-list-item-icon>

                    <v-list-item-icon v-else>
                        <v-icon>mdi-menu-right</v-icon>
                    </v-list-item-icon>

                    <v-list-item-title>{{ $t('sidebar.allClinics') }}</v-list-item-title>
                </v-list-item>
            </v-list-group>

            <v-list-group prepend-icon="mdi-account-group">
                <template v-slot:activator>
                    <v-list-item-title>{{ $t('sidebar.users') }}</v-list-item-title>
                </template>

                <v-list-item link to="/user/add">
                    <v-list-item-icon v-if="drawer.isRight">
                        <v-icon>mdi-menu-left</v-icon>
                    </v-list-item-icon>

                    <v-list-item-icon v-else>
                        <v-icon>mdi-menu-right</v-icon>
                    </v-list-item-icon>

                    <v-list-item-title>{{ $t('sidebar.addUser') }}</v-list-item-title>
                </v-list-item>

                <v-list-item link to="/users">
                    <v-list-item-icon v-if="drawer.isRight">
                        <v-icon>mdi-menu-left</v-icon>
                    </v-list-item-icon>

                    <v-list-item-icon v-else>
                        <v-icon>mdi-menu-right</v-icon>
                    </v-list-item-icon>

                    <v-list-item-title>{{ $t('sidebar.allUsers') }}</v-list-item-title>
                </v-list-item>
            </v-list-group>

            <v-list-item link>
                <v-list-item-action>
                    <v-icon>mdi-file-chart</v-icon>
                </v-list-item-action>

                <v-list-item-content>
                    <v-list-item-title>{{ $t('sidebar.reports') }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>

        <template v-slot:append>
            <div class="pb-12 pa-5">
                <div class="logo-wrapper">
                    <img src="./assets/logo.svg" />
                </div>
            </div>
        </template>
    </v-navigation-drawer>

    <v-app-bar v-if="$store.state.isLoggedIn !== null" app flat>
        <v-app-bar-nav-icon @click.stop="drawer.opened = !drawer.opened" />
        <v-spacer></v-spacer>
        <v-btn fab elevation="0" small color="primary" @click.stop="changeLang()">
            <v-icon>mdi-web</v-icon>
        </v-btn>

        <div style="width: 10px;"></div>

        <v-btn fab elevation="0" small color="primary" @click.stop="$vuetify.theme.dark = !$vuetify.theme.dark; changeTheme();">
            <span v-if="$vuetify.theme.dark === true">
                <v-icon>mdi-white-balance-sunny</v-icon>
            </span>
            <span v-else>
                <v-icon>mdi-weather-night</v-icon>
            </span>
        </v-btn>

        <div style="width: 10px;"></div>

        <v-menu bottom origin="center center" transition="scale-transition">
            <template v-slot:activator="{ on }">
                <v-btn fab elevation="0" small color="primary" v-on="on">
                    <v-icon>mdi-account-settings</v-icon>
                </v-btn>
            </template>

            <v-list>
                <v-list-item link >
                    <v-list-item-title>{{ $t('navUserDropdown.profile') }}</v-list-item-title>
                </v-list-item>

                <v-list-item link @click.prevent="logout()">
                    <v-list-item-title>{{ $t('navUserDropdown.logout') }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>

    <v-content>
        <v-container fluid :class="{'padding-0': $store.state.isLoggedIn === null}">
            <router-view />
        </v-container>
    </v-content>

    <v-footer v-if="$store.state.isLoggedIn !== null" app inset class="pa-5">
        <span>&copy; {{ new Date().getFullYear() }} {{ companyName }} </span>
    </v-footer>
</v-app>
</template>

<script>
export default {
    data() {
        return {
            companyName: 'Enjaz',
            drawer: {
                isRight: true,
                opened: null,
            },
        }
    },
    created() {},
    mounted() {
        this.saveDark();
        this.saveLang();
        

        if(this.$store.state.isLoggedIn !== null) {
            if(this.$route.path === '/auth/login') {
                this.$router.push({path: '/'})
            } else {
                return false
            }
        } else {
            if(this.$route.path === '/auth/login') {
                return false
            } else {
                this.$router.push({path: '/auth/login'})
            }
        }
    },

    methods: {
        drawerToggle() {
            if (this.drawer.mini === true) {
                this.drawer.mini = false
            } else {
                this.drawer.mini = true
            }
        },

        changeTheme() {
            let isDark = this.$vuetify.theme.dark;
            if (isDark === false) {
                localStorage.setItem('theme', 'light');
                this.$vuetify.theme.dark = false;
            } else {
                localStorage.setItem('theme', 'dark');
                this.$vuetify.theme.dark = true;
            }
        },

        saveDark() {
            let isSaved = localStorage.getItem('theme') !== null;
            if (isSaved) {
                if (localStorage.getItem('theme') !== 'light') {
                    this.$vuetify.theme.dark = true;
                    localStorage.setItem('theme', 'dark');
                } else {
                    this.$vuetify.theme.dark = false;
                    localStorage.setItem('theme', 'light');
                }
            } else {
                this.$vuetify.theme.dark = true;
                localStorage.setItem('theme', 'dark');
            }
        },

        changeLang() {
            let isRtl = this.$vuetify.rtl;
            if (isRtl) {
                localStorage.setItem('lang', 'en');
                localStorage.setItem('dir', 'ltr');

                this.$vuetify.rtl = false;
                this.drawer.isRight = false;

                document.querySelector('html').setAttribute('lang', 'en');
                document.querySelector('html').setAttribute('dir', 'ltr');

                this.$i18n.locale = 'en';
            } else {
                localStorage.setItem('lang', 'ar');
                localStorage.setItem('dir', 'rtl');

                this.$vuetify.rtl = true;
                this.drawer.isRight = true;

                document.querySelector('html').setAttribute('lang', 'ar');
                document.querySelector('html').setAttribute('dir', 'rtl');

                this.$i18n.locale = 'ar';
            }
        },

        saveLang() {
            let isLangSaved = localStorage.getItem('lang') !== null;
            let isDirSaved = localStorage.getItem('dir') !== null;

            if (isLangSaved && isDirSaved) {
                let dir = localStorage.getItem('dir');
                let lang = localStorage.getItem('lang');

                if (dir === 'rtl' && lang === 'ar') {
                    localStorage.setItem('lang', 'ar');
                    localStorage.setItem('dir', 'rtl');

                    this.$vuetify.rtl = true;
                    this.drawer.isRight = true;

                    document.querySelector('html').setAttribute('lang', 'ar');
                    document.querySelector('html').setAttribute('dir', 'dir');

                    this.$i18n.locale = 'ar';
                } else {
                    localStorage.setItem('lang', 'en');
                    localStorage.setItem('dir', 'ltr');

                    this.$vuetify.rtl = false;
                    this.drawer.isRight = false;

                    document.querySelector('html').setAttribute('lang', 'en');
                    document.querySelector('html').setAttribute('dir', 'ltr');

                    this.$i18n.locale = 'en';
                }
            } else {
                localStorage.setItem('lang', 'ar');
                localStorage.setItem('dir', 'rtl');

                this.$vuetify.rtl = true;
                this.drawer.isRight = true;

                document.querySelector('html').setAttribute('lang', 'ar');
                document.querySelector('html').setAttribute('dir', 'dir');

                this.$i18n.locale = 'ar';
            }
        },
        decodeJwt (token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return JSON.parse(jsonPayload);
        },

        getUsername() {
            let jwt = this.decodeJwt(localStorage.getItem('token'));
            // console.log(jwt[])
        },
        logout() {
            this.$store.dispatch("LOGOUT");
            this.$store.state.isLoggedIn = null;
            this.$router.push({path: '/auth/login'})
        }
    }
}
</script>

<style lang="scss">
.padding-0 {
    padding: 0px !important;
}
.theme--dark {
    .v-navigation-drawer {
        background: #1C2541 !important;
    }

    .v-app-bar.v-toolbar.v-sheet {
        background: #1C2541 !important;
        border-bottom: 1px solid #c7c7c72e;
    }

    &.v-application {
        background: #F0F0F7 !important;
        color: #1C2541 !important;
    }

    &.v-footer {
        background: #1C2541 !important;
        border-top: 1px solid #c7c7c72e;
    }

    .v-list {
      background: #1C2541 !important;
        .v-list-item--active {
            background: #5BC0BE;

            &::before {
              content: "";
              display: none;
            }
        }
    }
}

.theme--light {
    .v-navigation-drawer {
        background: #f5f5f5 !important;
    }

    .v-app-bar.v-toolbar.v-sheet {
        border-bottom: 1px solid #0000002e;
    }

    &.v-footer {
        border-top: 1px solid #0000002e !important;
    }
}

.logo-wrapper {
    display: block;
    width: 100%;
    height: 120px;
    text-align: center;

    img {
        display: block;
        width: 100%;
        height: 100%;
    }
}

.drawer-topbar {
    .v-toolbar__content {
        padding: 0px;
    }

    .v-list {
      background: transparent !important;
    }
}

.drawer-list {
  .v-list-group,
  .v-list-item {
    &:not(:last-child) {
      margin-bottom: 15px;
    }
  }
}
</style>
