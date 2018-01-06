
import * as func from './function.js';
import actions from './actions.js';
import mutations from './mutations.js';
import getters from './getters.js';


const state = func.theme_local.get() || {
    dragBarDefaultWidth_dom:110,
    dragBarWrapWidth:777,
    dragBar:[],
    timeLength:null,
    beginAllocateTime_s:null,
    beginRecordTime_s:null
}


import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters
});
