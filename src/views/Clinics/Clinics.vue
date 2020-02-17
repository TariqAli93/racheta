<template>
<div class="clinics-page">
    <v-app-bar class="page-inner-barr" color="#F0F0F7" light hide-on-scroll>
        <span color="primary">
            {{$t('addClinic.table.page-title')}}
        </span>

        <v-spacer></v-spacer>

        <v-btn color="primary" @click="$router.go(-1)" icon>
            <v-icon v-if="$i18n.locale === 'ar'">mdi-arrow-left</v-icon>
            <v-icon v-else>mdi-arrow-right</v-icon>
        </v-btn>
    </v-app-bar>

    <v-card light>
        <v-text-field v-model="search" prepend-icon="mdi-magnify" single-line hide-details></v-text-field>
    </v-card>
    <v-data-table :headers="tableHeaders" :items="clinics" :search="search" :page.sync="page" :items-per-page="itemsPerPage" hide-default-footer class="elevation-1" @page-count="pageCount = $event"></v-data-table>
    <v-pagination v-model="page" :length="pageCount"></v-pagination>
</div>
</template>

<script>
export default {
    data() {
        return {
            clinics: [],
            search: '',
            page: 1,
            pageCount: 0,
            itemsPerPage: 5,
            tableHeaders: [{
                    text: '#',
                    value: 'id'
                },
                {
                    text: this.$t('addClinic.table.title'),
                    value: 'title'
                },
                {
                    text: this.$t('addClinic.table.description'),
                    value: 'descriptions'
                },
                {
                    text: this.$t('addClinic.table.licence'),
                    value: 'licenceNumber'
                },
                {
                    text: this.$t('addClinic.table.address'),
                    value: 'address'
                },
                {
                    text: this.$t('addClinic.table.province'),
                    value: 'provinceId'
                },
                {
                    text: this.$t('addClinic.table.placeType'),
                    value: 'placeTypeId'
                }
            ]
        }
    },
    mounted() {
        let self = this;
        self.axios.get(`Place/Get`).then(response => {
            self.clinics = response.data.data;
            console.log(response.data.data)
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
        });
    },
    methods: {

    }
}
</script>

<style lang="scss">
.theme--light.v-card {
    padding: 10px !important;
    margin-top: 15px;
    margin-bottom: 15px;

    .theme--light.v-input {
        margin: 0 auto;
        padding: 0px;
    }
}

.theme--dark.v-data-table {
    background: #1C2541 !important;
}

.theme--dark.v-data-table tbody tr:hover:not(.v-data-table__expanded__content) {
    background: #5BC0BE !important;
    color: #1C2541 !important;
}
</style>
