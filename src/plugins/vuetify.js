import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        dark: false,
        themes: {
            dark: {
                primary: '#1C2541',
                secondary: '#5BC0BE',
                accent: '#8c9eff',
                error: '#b71c1c',
            },
        }
    },
    rtl: true,
});
