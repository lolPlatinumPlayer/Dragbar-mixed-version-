
import store from '../store/index';

export default {
    drag: {
        store,
        bind:function (el,binding,vnode) {
            const rightHandle=$(el).children('.drag-bar__right-handle')[0],
                  leftHandle=$(el).children('.drag-bar__left-handle')[0],
                  bg=$(el).children('.drag-bar__bg')[0],
                  vuexDragbar=store.state.dragBar[binding.value];
            let minLeft,maxRight,dragbarWidth_bind;
            //↓依赖vuex计算拖拽条left最小值和right最大值↙
            //（在新增拖拽条时会依靠这个函数计算出left最小值）
            CalLimitvalue()


            //第一次新建拖拽条时设置宽度
            if(vuexDragbar.right===null){
                dragbarWidth_bind=store.state.dragBarDefaultWidth_dom
            }
            //拖拽条vuex数据都存在时获取宽度
            else{
                dragbarWidth_bind=vuexDragbar.right-
                                  vuexDragbar.left
            }
            ChangeDragbarWidth(dragbarWidth_bind)
            let maxLeft=maxRight-dragbarWidth_bind

            /*
              下行代码原理：
                  这个括号内的内容是state数据dragBar在当前拖拽条上的left值
                  在新增拖拽条时括号内值应为null
                  然后在这个函数内就会将dom的left设置为之前计算好的minLeft
            */
            EntireDragBarPutRight(vuexDragbar.left)
            VuexLeftRightFromDom()

            //-----以上是不点击拖拽条情况下的所有命令------

            //点击拖拽条左手柄触发的函数
            leftHandle.onmousedown = function (e) {
                CalLimitvalue()
                const styleWidth=parseFloat($(el).css('width'))
                let oldClientX = e.clientX
                const disX = e.clientX - el.offsetLeft;
                const right=vuexDragbar.right
                document.onmousemove = function (e) {
                    //e.clientX是鼠标x坐标
                    //el.offsetLeft是el左边x坐标
                    let l = e.clientX - disX;
                    let dragWidth = styleWidth+oldClientX-e.clientX;
                    if(l<=minLeft){//左侧碰撞暂停、溢出回弹
                        el.style.left=minLeft+'px'
                        ChangeDragbarWidth(right-minLeft)
                    }else if(l>=right){//右侧碰撞暂停、溢出回弹
                        el.style.left=right+'px'
                        ChangeDragbarWidth(0)
                    }else {//无碰撞、溢出情况
                        el.style.left=l+'px'
                        ChangeDragbarWidth(dragWidth)
                    }
                    VuexLeftRightFromDom()
                }
                document.onmouseup = function (e) {//用函数封装无效
                    CalLeftRightMouseup()
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
            }

            //点击拖拽条右手柄触发的函数
            rightHandle.onmousedown = function (e) {
                CalLimitvalue()
                const styleWidth=parseFloat($(el).css('width'))
                let oldClientX = e.clientX
                const maxWidth=maxRight-vuexDragbar.left
                document.onmousemove = function (e) {
                    //e.clientX是鼠标x坐标
                    //el.offsetLeft是el左边x坐标
                    //dragWidth是不触及边缘情况下拖拽右侧的拖拽条宽度
                    let dragWidth = styleWidth+e.clientX - oldClientX

                    if(dragWidth>=maxWidth){
                        ChangeDragbarWidth(maxWidth)
                    }else {
                        ChangeDragbarWidth(dragWidth)
                    }

                    VuexLeftRightFromDom()
                }
                document.onmouseup = function (e) {
                    CalLeftRightMouseup()
                    document.onmousemove = null;
                    document.onmouseup = null;
                }
            }

            //点击拖拽条中部（主体/背景）手柄触发的函数
            bg.onmousedown = function (e) {
                CalLimitvalue()
                const disX = e.clientX - el.offsetLeft;
                const styleWidth=parseFloat($(el).css('width'))
                maxLeft=maxRight-styleWidth
                document.onmousemove = function (e) {
                    let l = e.clientX - disX;
                    EntireDragBarPutRight(l)
                    VuexLeftRightFromDom()
                };
                document.onmouseup = function (e) {
                    CalLeftRightMouseup()
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
            };

            //--------------以下是封装的函数--------------

            //根据dom获取的left、width计算后实时同步vuex中的left、right
            function VuexLeftRightFromDom(){
                let left=parseFloat($(el).css('left'))
                let right=left+parseFloat($(el).css('width'))
                vuexDragbar.left=left
                vuexDragbar.right=right
            }

            //在抬起鼠标后根据dom获取的left、right来同步vuex中的left、right
            function CalLeftRightMouseup(){
                let left=parseFloat($(el).css('left'))
                let right=left+parseFloat($(el).css('width'))
                let payloadLeft={}
                let payloadRight={}
                payloadLeft.index=binding.value
                payloadLeft.attr='left'
                payloadLeft.value=left
                payloadRight.index=binding.value
                payloadRight.attr='right'
                payloadRight.value=right
                store.commit('SetDragbarSubkeyAttr',payloadLeft)
                store.commit('SetDragbarSubkeyAttr',payloadRight)
            }

            //计算最小left以及最大right
            function CalLimitvalue() {
                minLeft=0;maxRight=777;

                for (let i=binding.value;i>=0;i--){
                    if(!store.state.dragBar[i-1]){
                        break
                    }else if(store.state.dragBar[i-1].show===true){
                        minLeft=store.state.dragBar[i-1].right
                        break
                    }
                }

                for (let i=binding.value;i<=store.state.dragBar.length-1;i++){
                    if(!store.state.dragBar[i+1]){
                        break
                    }else if(store.state.dragBar[i+1].show===true){
                        maxRight=store.state.dragBar[i+1].left
                        break
                    }
                }

            }

            //根据左端点判断拖拽条放入情况
            //并根据判断结果操作拖拽条dom的左端位置
            function EntireDragBarPutRight(l) {
                el.style.left=(function(){
                    switch (true){
                        case minLeft>maxLeft:
                            alert('没有空间放置该拖拽条,即将进行删除')
                            document.onmousemove = null;
                            vuexDragbar.show=false
                            break

                        //新建拖拽条时这个l为null
                        //接下来这个判断语句就会成立
                        case l<=minLeft:
                            return minLeft+'px'
                        case minLeft<l&&l<maxLeft:
                            return l+'px'
                        case maxLeft<=l:
                            return maxLeft+'px'
                        default:
                            console.error('Something go wrong when you put DragBar in. (from fn EntireDragBarPutRight)');
                    }
                }())
            }

            //改变dom拖拽条宽度
            function ChangeDragbarWidth(value) {
                if(value>=0){
                    el.style.width= value+'px'
                    if(value>=20){
                        $(el).children('.drag-bar__bg').css('width',value-20+'px');
                    }else {
                        $(el).children('.drag-bar__bg').css('width',0+'px');
                    }
                }else {
                    el.style.width= 0+'px'
                    $(el).children('.drag-bar__bg').css('width',0+'px');
                }
            }

        }
    }
}