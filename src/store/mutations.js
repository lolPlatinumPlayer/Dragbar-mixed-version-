

import Vue from 'vue'
//获取以秒为单位的当前时间
function GetTimeNow_s() {
    const now=new Date(),
        hour=now.getHours(),
        minutes=now.getMinutes(),
        seconds=now.getSeconds();
    return hour*3600+minutes*60+seconds
}
export default {
    //设置“分配时间”的总时长
    SetTimeLength(s){
        let timeLength=Number(prompt("输入希望分配的时长（以小时为单位，可以有小数）"))
        while (!timeLength||timeLength<0.5){
            if(!timeLength){
                timeLength=Number(prompt("请输入数字"))
            }else{
                timeLength=Number(prompt("过短的时间分配意义不大哦，来分配更多的时间吧！"))
            }
        }
        /*
        //对输入时间的分析
        console.log('timeLength:',timeLength);
        console.log('typeof timeLength:',typeof timeLength);
        console.log("typeof timeLength !== 'number'",typeof timeLength !== 'number');
        console.log("timeLength<0.5",timeLength<0.5);
        */
        //将收到小时格式的时长转化为秒格式，再保存
        const timeLength_s=Math.round( timeLength*3600)
        s.timeLength=timeLength_s
    },
    //将当前时间存进state数据————beginAllocateTime_s
    SetBeginAllocateTime_s(s){
        s.beginAllocateTime_s=GetTimeNow_s()
    },
    //删除拖拽条
    deleteDragBar(state, payload){
        state.dragBar[payload].show=false;
    },
    //添加拖拽条
    addDragBar(state){
        const name=(function (){
            const name=prompt("定义时间名称")
            if(!name)
                return "未定义名称"
            else
                return name
        }())
        state.dragBar=[...state.dragBar,{
            show:true,
            name:name,
            left:null,
            right:null
        }]
    },
    //给state数据dragBar的子项的指定属性赋值
    SetDragbarSubkeyAttr(s,p){
        if(p.index===undefined){
            console.error('payload.index is not exist. (did not stop code)');
        }
        if(p.attr===undefined){
            console.error('payload.attr is not exist. (did not stop code)');
        }
        if(p.value===undefined){
            console.error('payload.value is not exist. (did not stop code)');
        }
        eval('s.dragBar['+p.index+'].'+p.attr+'='+p.value)
    }
}