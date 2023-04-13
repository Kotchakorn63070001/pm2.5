import { createApp } from 'vue'
import App from './App.vue'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faFaceAngry, faFaceFrown, faFaceLaughBeam, faFaceMeh, faFaceSmile, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faMagnifyingGlass)
library.add(faFaceLaughBeam)
library.add(faFaceSmile)
library.add(faFaceMeh)
library.add(faFaceFrown)
library.add(faFaceAngry)

createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')
