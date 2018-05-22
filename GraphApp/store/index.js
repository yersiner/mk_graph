import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

import LoginModule from './LoginStore'
import HospitalModule from './HospitalStore'
import SignModule from './SignStore'
import AccountModule from './AccountStore'
import HealthyModule from './HealthyStore'
import MessageModule from './MessageStore'
import DistributeModule from './DistributeStore'
import RecordModule from './RecordStore'
import PhysicalModule from './PhysicalStore'
import PhysiqueModule from './PhysiqueManageStore'


Vue.use(Vuex)

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  modules: {
    RecordModule,
    PhysicalModule,
    DistributeModule,
  	LoginModule,
  	HospitalModule,
  	SignModule,
  	AccountModule,
    HealthyModule,
    MessageModule,
    PhysiqueModule
  }
})
