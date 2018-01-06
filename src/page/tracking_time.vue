<template>
    <div id="box">
        <p class="title">追踪时间</p>
        <div class="drag-bar__">
            <div class="drag-bar__wrap-bg"></div>
            <drag-bar__filling  v-for="(a,index) in dragBar" :key="index" v-if="a.show" v-drag="index">
                {{a.name}}
            </drag-bar__filling>
        </div>
        <div class="table-wrap">
            <table class="table">
                <tr>
                    <td>该段时间名称</td>
                    <td v-for="(a,index) in dragBar" :key="index" v-if="a.show">
                        {{a.name}}
                    </td>
                </tr>
                <tr>
                    <td>开始时间</td>
                    <td v-for="(a,index) in dragBar" :key="index" v-if="a.show">
                        {{a.beginTime_autofit}}
                    </td>
                </tr>
                <tr>
                    <td>结束时间</td>
                    <td v-for="(a,index) in dragBar" :key="index" v-if="a.show">
                        {{a.endTime_autofit}}
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    import drag_directive from '../directives/drag'
    import {mapState, mapGetters, mapMutations,mapActions} from 'vuex'
    import Vue from 'vue'




    export default {
        computed:{
            ...mapState([
                'dragBar',//:'strip_getter.dragBar'
                'dragBarWrapWidth'
            ])
        },
        components: {
            'drag-bar__filling':{
                template:`<div class="drag-bar__filling">
            <div class="drag-bar__name">
                <span>
                    <slot></slot>
                </span>
            </div>
            <div class="drag-bar__bg"></div>
            <div class="drag-bar__left-handle"></div>
            <div class="drag-bar__right-handle"></div>
            </div>`}
        },
        methods:{
            ...mapMutations([
                'addDragBar',
                'deleteDragBar'
            ])
        },
        directives: {
            ...drag_directive
        }
    }





</script>

<style lang="less">
    .drag-bar__{
        margin:auto;
        width: 777px;
        height: 28px;
        position: relative;
    }
    .drag-bar__name{
        position: absolute;
        top: -24px;
        left: 50%;
        transform: translateX(-50%);
        background: #d5e7fb;
        border-radius: 9px;
        padding: 2px 8px;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        -khtml-user-select: none;
        user-select: none;
        text-align: center;
        cursor: default;
    }
    .drag-bar__name span{
        position: relative;
        white-space: nowrap;
    }
    .drag-bar__name:before{
        content: '';
        text-align: center;
        position: absolute;
        border-bottom: 9px #d5e7fb solid;
        border-right: 9px #d5e7fb solid;
        transform: matrix(1,1,-1,1,-4,16);
        left: 50%;
    }
    .drag-bar__wrap-bg{
        width:100%;
        background-color:white;
        height:10px;
        top:7px;
        position:absolute;
        border-radius:6px;
        border:2px #bfbfbf solid;
    }
    .drag-bar__filling{
        width: 220px;
        height: 100%;
        left:0;
        position: absolute;
        cursor:all-scroll;
    }
    .drag-bar__bg{
        width: 200px;
        background:rgb(85, 143, 208);
        height:10px;
        top:9px;
        position:absolute;
        left:10px;
    }
    .drag-bar__right-handle{
        width: 16px;
        height: 16px;
        top: 4px;
        background:#e6e6e6;
        position: absolute;
        right: 0;
        border-radius:6px;
        border:2px rgb(85, 143, 208) solid;
        cursor:e-resize;
    }
    .drag-bar__left-handle{
        width: 16px;
        height: 16px;
        top: 4px;
        background:#e6e6e6;
        position: absolute;
        border-radius:6px;
        border:2px rgb(85, 143, 208) solid;
        left: 0;
        cursor:e-resize;
    }
    .table-wrap{position:relative;margin:auto; display: table;}
    .table-wrap-add{position:absolute;width:22px;right:-22px; top: 3px;}
    .table{text-align:center;margin:auto}
    .table tr:nth-child(1) td{background:rgb(214, 231, 251)}
    .table tr:nth-child(4) td:not(:nth-child(1)):hover{background:rgb(251, 31, 18);color:white;cursor:pointer}
    .table td:nth-child(1){background:rgb(214, 231, 251)}
    .table td {width:111px;}
    .table td:nth-child(2n) {background:rgba(180, 176, 177, 0.2) }
    .table tr:nth-child(2n) {background:rgba(180, 176, 177, 0.2) }
    .title{    text-align: center;
        font-size: 33px;
        color: #585858;
        font-weight: bold;
        margin-top: 160px;}
</style>
