import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'

import router from "@/router";
import store from "@/store";

import VueFluent from "vfluentdesign";
import PowerEditor from "@creatorsn/powereditor";
import "vfluentdesign/lib/index.css";
import "@creatorsn/powereditor/lib/powereditor.css";
import 'katex/dist/katex.min.css';
import "@/style/global.scss";

import axios from 'axios'
import VueAxios from 'vue-axios'

import api from "./api/remote";
import local_api from "./api/local";

const isdev = (process.env.NODE_ENV === "development")


let PDFJS = require("pdfjs-dist");
// fix pdf workerSrc
const pdfjsWorker = require('pdfjs-dist/build/pdf.worker.entry');
PDFJS.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const fab_axios = axios.create({
    timeout: 5000
});

Vue.use(VueAxios, fab_axios);

Vue.use(VueFluent, Vuex);
Vue.use(PowerEditor);
Vue.use(api);
Vue.use(local_api);

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
    beforeCreate() {
        Vue.prototype.$PDFJS = PDFJS;
        Vue.prototype.$Go = str => {
            this.$router.push(str);
        };
        Vue.prototype.$Back = () => {
            this.$router.back();
        };
        Vue.prototype.$Jump = str => {
            window.open(str);
        };
        Vue.prototype.$Guid = () => {
            let guid = this.$SUtility.Guid();
            guid = guid.split('-')[0];
            return guid;
        }
        Vue.prototype.$date = (str, timezone = 1000) => {
            if (typeof (str) === 'number') str = str * timezone;
            let date = new Date(str);
            return this.$SDate.Format("YYYY-mm-dd HH:MM", date);
        }
        const dev_server = "http://100.64.0.26:5083";
        const remote_server = `https://fb.creatorsn.com/api`;
        if (isdev) {
            Vue.prototype.$server = dev_server;
        } else {
            Vue.prototype.$server = remote_server;
        }
        Vue.prototype.$dev_server = dev_server;
        Vue.prototype.$remote_server = remote_server;
    }
}).$mount('#app')
