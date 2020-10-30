import App from './App.vue'
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'

Vue.use(ElementUI)
Vue.config.productionTip = false
console.log('Created By ldwqh0@outlook.com')
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
