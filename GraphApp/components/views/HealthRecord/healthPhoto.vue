<template>
    <div class="health-photo container">
        <transition-group name="cell" tag="div" class="container">
            <div v-for="cell in data" :key="cell.number" class="cell">
                <img :src="cell.avatar" alt="">
            </div>
          </transition-group>
        <div class="page-area">
            <span class="pre" @click="prePage"></span>
            <span class="page-count" @click="shuffle">
                <span class="active">{{currentPage}}</span>/{{total}}
            </span>
            <span class="next" @click="nextPage"></span>
        </div>
        
    </div>
</template>

<script>
    import _ from 'lodash'
    export default {
        name: 'healthPhoto',
        props: {
            data: {},
            current: "",
            total: ""
        },
        data () {
          return {
            currentPage: this.current||1
            //cells: this.data
          }
        },
        methods: {
            prePage() {
                this.currentPage--
                this.$emit('loadData', this.currentPage)
            },
            nextPage() {
                this.currentPage++
                this.$emit('loadData', this.currentPage)
            },
            shuffle() {
                //this.cells = _.shuffle(this.cells)
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
    .page-area {
        margin: auto;
        cursor: pointer;
    }
    .pre {
        background-image: url('../../../assets/up.png');
        width: 28px;
        height: 38px;
        display: inline-block;
        vertical-align: middle;
        margin-right: 85px;
        cursor: pointer;
    }
    .page-count {
        display: inline-block;
        vertical-align: middle;
        width: 101px;
        height: 101px;
        line-height: 101px;
        text-align: center;
        color: white;
        font-size: 16px;
        background-image: url('../../../assets/pagination.png');
        .active {
            color: #FCD210;
        }
    }
    .next {
        background-image: url('../../../assets/next.png');
        width: 28px;
        height: 38px;
        display: inline-block;
        vertical-align: middle;
        margin-left: 85px;
    }
    .cell img {
        width: 25px;
        height: 25px;
    }
    .container {
      display: flex;
      flex-wrap: wrap;
      width: 720px;
      margin-top: 10px;
      margin: auto;
    }
    .cell {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 93px;
        height: 93px;
        border: 1px solid #aaa;
        margin-right: 24px;
        margin-bottom: 24px;
    }
    .cell:nth-child(3n) {
      // margin-right: 0;
    }
    .cell:nth-child(27n) {
      margin-bottom: 0;
    }
    .cell-move {
      transition: transform 1s;
    }
</style>
