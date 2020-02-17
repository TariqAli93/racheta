<template>
<div class="login-page">
    <div class="login-form">
        <v-form ref="loginValid" v-model="loginValid" @submit.prevent="login()">
            <v-container>
                <div class="login-logo-wrapper">
                    <v-img src="../../assets/loginLogo.svg" class="login-logo-wrapper-img"></v-img>
                </div>

                <v-alert type="error" icon="mdi-alert" dismissible :value="error">
                    {{ errorText }}
                </v-alert>

                <v-alert type="success" icon="mdi-check-all" dismissible :value="success">
                    {{ $t("login.successText") }}
                </v-alert>
                <v-row>
                    <v-col cols="12">
                        <v-text-field autofocus autocomplete="off" prepend-inner-icon="mdi-account" v-model="username" :rules="usernameRules" :label="$t('login.username')" required></v-text-field>
                    </v-col>

                    <v-col cols="12">
                        <v-text-field @input="isDisabled = false" prepend-inner-icon="mdi-lock" :type="showPassword ? 'text' : 'password'" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" v-model="password" :rules="passwordRules" :label="$t('login.password')" required @click:append="showPassword = !showPassword"></v-text-field>
                    </v-col>
                </v-row>

                <v-btn type="submit" :loading="isLoading" :disabled="isDisabled || isLoading" block color="#1C2541" class="login-btn" dark @click="login(); isLoading = true;">
                    {{ $t("login.loginText") }}
                </v-btn>

                <v-btn color="secondary" @click.prevent="changelang()" block style="margin-top: 10px;">
                    <span style="margin-left: 10px; color:white" v-if="$i18n.locale === 'ar'">
                         English
                    </span>

                    <span style="margin-right: 10px; color:white" v-if="$i18n.locale === 'en'">
                         عربي
                    </span>
                    <v-icon color="white">mdi-web</v-icon>
                </v-btn>
            </v-container>
        </v-form>
    </div>

    <div class="curved">
        <div class="curved_character"></div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            valid: false,
            showPassword: false,
            isDisabled: true,
            isLoading: false,
            usernameRules: [
                v => !!v || this.$t('login.usernameEmpty')
            ],
            password: '',
            passwordRules: [
                v => !!v || this.$t('login.passwordEmpty')
            ],
            loginValid: '',
            error: false,
            errorText: '',
            success: false,
        }
    },
    created() {
        this.$vuetify.theme.dark = false;
        this.$vuetify.theme.isDark = false;
        localStorage.setItem('theme', 'light');
    },

    methods: {
        decodeJwt(token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return JSON.parse(jsonPayload);
        },

        login() {
            if (this.$refs.loginValid.validate()) {
                this.$store.dispatch("LOGIN", {
                    username: this.username,
                    password: this.password
                }).then(success => {
                    this.error = false;
                    this.success = true;
                    localStorage.setItem('token', success.data);
                    this.$store.state.isLoggedIn = localStorage.getItem('token');
                    this.color = "success";
                    localStorage.setItem('theme', 'dark');
                    this.$vuetify.theme.dark = true;
                    this.isLoading = false;
                    this.$router.push({
                        path: '/'
                    });
                }).catch(error => {
                    this.error = true;
                    this.errorText = this.$t("login.error");
                    this.color = "error";
                    this.isLoading = false;
                    console.error(error)
                });
            } else if (this.username === '' || this.username === null || this.username === undefined) {
                this.errorText = this.$t('login.usernameEmpty');
                this.error = true;
                this.isLoading = false;
            } else if (this.password === '' || this.password === null || this.password === undefined) {
                this.errorText = this.$t('login.passwordEmpty');
                this.error = true;
                this.isLoading = false;
            } else {
                this.errorText = this.$t('login.errorText');
                this.error = true;
                this.isLoading = false;
            }
        },

        changelang() {
            let parent = this.$parent.$parent.$parent;
            parent.changeLang()
            parent.saveLang();
        }
    }
}
</script>

<style lang="scss">
.login-page {
    background: white;
    height: 100vh;
    display: flex;
    @media (max-width: 767px) {
        flex-direction: column;
    }
    flex-direction: row;

    .theme--dark.v-input {
        color: #1C2541 !important;
    }

    .theme--dark.v-btn.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
        background: whitesmoke!important;
        color: #1C2541 !important;
    }

    .theme--light.v-icon,
    .theme--light.v-label,
    .theme--light.v-input input,
    .login-page .theme--light.v-icon {
        color: #1C2541;
    }

    .login-logo-wrapper {
        display: block;
        width: 100%;
        position: relative;
        height: 220px;
        width: 190px;
        max-height: 300px;
        text-align: center;
        margin: 0 auto;
        margin-bottom: 35px;

        &-img {
            display: block;
            width: 100%;
            height: 100%;
            margin: 0 auto;

            .v-responsive__sizer {
                padding: 0px !important;
            }

            .v-image__image {
                width: 100%;
                height: 100%;
                display: block;

                background: {
                    position: center;
                    size: cover;
                }
            }
        }
    }

    .curved {
        width: 60%;
        @media (max-width: 767px) {
            width: 100%;
            display: block;
            height: 300px;
            z-index: 0;
        }
        position: relative;
        z-index: 2;
        background: #1C2541;

        &_character {
            background: {
                image: url('../../assets/b.gif');
                repeat: no-repeat;
                position: center center;
                size: cover;
            }

            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            bottom: 0;
            @media (max-width: 767px) {
                display: none;
            }
        }
    }

    .login-form {
        width: 40%;
        position: relative;
        display: flex;
        z-index: 1;
        align-items: center;
        justify-content: center;

        @media (max-width: 767px) {
            width: 90%;
            margin: 0 auto;
            background: white;
            border-radius: 10px;
            box-shadow: 0 2px 10px 0 rgba(black, .10);
            padding: 10px;
            position: absolute;
            top: 150px;
            left: 0;
            right: 0;
            z-index: 2;
            margin-bottom: 30px;
        }

        .login-btn {
            margin-top: 30px;
        }
    }
}
</style>
