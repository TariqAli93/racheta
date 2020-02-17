<template>
<div class="add-clinic">
    <v-app-bar class="page-inner-barr" color="#F0F0F7" light hide-on-scroll>
        <span color="primary">
            {{$t('addClinic.add')}}
        </span>

        <v-spacer></v-spacer>

        <v-btn color="primary" @click="$router.go(-1)" icon>
            <v-icon v-if="$i18n.locale === 'ar'">mdi-arrow-left</v-icon>
            <v-icon v-else>mdi-arrow-right</v-icon>
        </v-btn>
    </v-app-bar>

    <div class="add-clinic-inner">
        <v-alert type="error" v-model="alertError" dismissible>
            {{ alertErrorText }}
        </v-alert>

        <v-alert type="success" v-model="alertSuccess" dismissible>
            {{ alertSuccessText }}
        </v-alert>

        <v-form ref="addClinicForm" class="clinicForm" v-model="addClinicForm" style="margin-bottom: 30px; margin-top: 30px;" @submit.prevent="addClinic()">
            <v-container>
                <v-row class="clinicRow">
                    <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
                        <v-text-field :rules="nameRule" clearable class="text-field" :label="$t('addClinic.name')" v-model="clinicName"></v-text-field>
                    </v-col>

                    <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
                        <v-text-field :rules="specializationRule" clearable class="text-field" chips :label="$t('addClinic.specialization')" v-model="clinicSpecialization"></v-text-field>
                    </v-col>

                    <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
                        <v-select :rules="clinicGoverRule" clearable class="text-field" :items="governorate" item-text="name" item-value="id" :label="$t('addClinic.governorate')" v-model="clinicGover"></v-select>
                    </v-col>

                    <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
                        <v-text-field :rules="clinicDistrictRule" clearable class="text-field" :label="$t('addClinic.district')" v-model="clinicDistrict"></v-text-field>
                    </v-col>

                    <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
                        <v-text-field :rules="licenceNumberRule" clearable class="text-field" :label="$t('addClinic.licence')" v-model="licenceNumber"></v-text-field>
                    </v-col>

                    <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
                        <v-select :rules="placeTypeIdRule" clearable class="text-field" :items="places" item-text="name" item-value="id" :label="$t('addClinic.placeType')" v-model="placeTypeId"></v-select>
                    </v-col>

                    <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
                        <v-text-field clearable class="text-field" :label="$t('addClinic.mapLocation')" v-model="mapLocation"></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>

        <v-btn color="primary" large block @click="addClinic()">{{ $t('addClinic.add') }}</v-btn>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            loading: false,

            alertError: false,
            alertErrorText: this.$t('addClinic.errorText'),

            alertSuccess: false,
            alertSuccessText: this.$t('addClinic.successText'),

            governorate: [],
            places: [],
            addClinicForm: '',

            clinicName: '',
            nameRule: [
                v => !!v || this.$t('addClinic.rules.name')
            ],

            clinicSpecialization: '',
            specializationRule: [
                v => !!v || this.$t('addClinic.rules.specialization')
            ],

            clinicGover: '',
            clinicGoverRule: [
                v => !!v || this.$t('addClinic.rules.governorate')
            ],

            clinicDistrict: '',
            clinicDistrictRule: [
                v => !!v || this.$t('addClinic.rules.district')
            ],

            licenceNumber: '',
            licenceNumberRule: [
                v => !!v || this.$t('addClinic.rules.licence')
            ],
            mapLocation: '',

            placeTypeId: '',
            placeTypeIdRule: [
                v => !!v || this.$t('addClinic.rules.place')
            ],
        }
    },
    mounted() {
        this.getGovernorate();
        this.getPlaces();
    },
    methods: {
        addClinic() {
            let self = this;
            let form = self.$refs.addClinicForm;
            let placeObject = {
                "title": self.clinicName,
                "descriptions": self.clinicSpecialization,
                "licenceNumber": self.licenceNumber,
                "address": self.clinicDistrict,
                "mapLocation": self.mapLocation,
                "provinceId": self.clinicGover,
                "placeTypeId": self.placeTypeId
            };

            if (form.validate()) {
                self.axios.post(`Place/Add`, placeObject).then(response => {
                    self.alertError = false;
                    self.alertSuccess = true;
                    self.resetForm();
                }).catch(error => {
                    switch (error.response.status) {
                        case 400:
                            console.error(error.response.statusText);
                            break;
                        case 401:
                            this.$parent.$parent.$parent.logout();
                            console.error(error.response.statusText);
                            break;
                        case 404:
                            console.error(error.response.statusText);
                            break;
                        case 500:
                            console.error(error.response.statusText)
                            break;
                        default:
                            console.error('cant find connection');
                    }
                })
            } else {
                console.log(false)
                self.alertError = true;
            }
        },

        resetForm() {
            let self = this;
            let form = self.$refs.addClinicForm;

            form.reset();
        },

        getGovernorate: function () {
            let self = this;
            self.axios.get(`Province/GetAll`).then(response => {
                this.governorate = response.data.data;
            }).catch(error => {
                switch (error.response.status) {
                    case 400:
                        console.error(error.response.statusText);
                        break;
                    case 401:
                        this.$parent.$parent.$parent.logout();
                        console.error(error.response.statusText);
                        break;
                    case 404:
                        console.error(error.response.statusText);
                        break;
                    case 500:
                        console.error(error.response.statusText)
                        break;
                    default:
                        console.error('cant find connection');
                }
            })
        },

        getPlaces() {
            let self = this;
            self.axios.get(`PlaceType/GetAll`).then(response => {
                this.places = response.data.data;
            }).catch(error => {
                switch (error.response.status) {
                    case 400:
                        console.error(error.response.statusText);
                        break;
                    case 401:
                        this.$parent.$parent.$parent.logout();
                        console.error(error.response.statusText);
                        break;
                    case 404:
                        console.error(error.response.statusText);
                        break;
                    case 500:
                        console.error(error.response.statusText)
                        break;
                    default:
                        console.error('cant find connection');
                }
            })
        }
    }
}
</script>

<style lang="scss">
.theme--dark .v-app-bar.v-toolbar.v-sheet.page-inner-barr {
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
}

.text-field input,
.text-field * {
    color: #1C2541 !important;
}

.theme--light .v-app-bar.v-toolbar.v-sheet.page-inner-barr {
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
}

.add-clinic {
    height: fit-content;
    width: 100%;

    &-inner {
        background: white;
        box-shadow: 0 2px 10px 0 rgba(black, .10);
        padding: 20px;
        margin-top: 10px;
        border-radius: 10px;
    }

    .clinicForm {

        .theme--dark.v-text-field>.v-input__control>.v-input__slot:before,
        .theme--dark.v-text-field:hover>.v-input__control>.v-input__slot:before {
            background: #1C2541;
            border-color: #1C2541;
        }

        .theme--dark.v-label {
            color: #1C2541;
        }
    }
}
</style>
