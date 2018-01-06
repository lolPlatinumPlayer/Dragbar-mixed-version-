/*将秒数转为时间格式
* 自动适配是否加入“时”和“分”   */
function AutofitTimeFormat(timeStamp) {
    if(timeStamp<60){
        return timeStamp+'秒'
    }else if(60<=timeStamp&&timeStamp<3600){
        const min=Math.floor(timeStamp/60)
        const s=timeStamp%60
        return min+'分'+s+'秒'
    }else if(3600<=timeStamp){
        const hour=Math.floor(timeStamp/3600)
        const min=Math.floor((timeStamp-hour*3600)/60)
        const s=timeStamp%60
        return hour+'时'+min+'分'+s+'秒'
    }else {
        console.error('this fn wrong')
    }
}
export default {
    //dragBarP1是基于
    dragBarP1(s){
        let newArr=[];
        //这里的代码导致state数据也拥有了leftPct和rightPct（问题很可能跟其他代码有关联）
            s.dragBar.forEach(function(currentValue) {
            if(currentValue.show==true){
                newArr.push(currentValue)
                const leftPct=currentValue.left/s.dragBarWrapWidth
                const rightPct=currentValue.right/s.dragBarWrapWidth
                //左、右端点距wrap最左处百分比
                newArr[newArr.length-1].leftPct=leftPct
                newArr[newArr.length-1].rightPct=rightPct
                //该拖拽条开始、结束时间的时间戳（单位为秒）
                newArr[newArr.length-1].beginTime=Math.round(s.timeLength*leftPct)
                newArr[newArr.length-1].endTime=Math.round(s.timeLength*rightPct)
                //将 该拖拽条开始、结束时间的时间戳（单位为秒） 转为自适应日常格式
                newArr[newArr.length-1].beginTime_autofit=AutofitTimeFormat(newArr[newArr.length-1].beginTime)
                newArr[newArr.length-1].endTime_autofit=AutofitTimeFormat(newArr[newArr.length-1].endTime)
            }
        })
        return newArr
    }
};