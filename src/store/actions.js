
export default {
    /*
    actions : ({commit}, param) => commit('SWITCHTHEME',{theme: param})
    */

        increment (context) {
            setTimeout(() => {
                context.commit('IncreaseAttr')
            }, 1600)
        }

}