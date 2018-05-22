<template>
  <div class="v-table">
      <ul class="pagination">
        <li class="v-table-footer-info">
          <a href="">共<span>{{total}}</span>条数据</a>
        </li>
        <li>
              <a href="javascript:;"
                 @click="togglePage('prev')"
                 :class="{disabled: currentPage == 1}"><label></label></a>
        </li>
         <li>
              <a href="javascript:;"
                 :class="{current: currentPage == 1}"
                 @click="togglePage(1)">1</a>
         </li>
         <li>
              <span v-if="currentPage >= 5 && lastPage > 10">...</span>
         </li>
          <li>
              <a href="javascript:;"
                 :class="{current: currentPage == page + 1}"
                 @click="togglePage(page + 1)"
                 v-for="page in centerPartPage">{{page + 1}}</a>
          </li>
          <li>
              <span v-if="lastPage > 10 && lastPage - currentPage > 5">...</span>
          </li>
          <li>
              <a href="javascript:;"
                 :class="{current: currentPage == page + 1}"
                 @click="togglePage(page + 1)"
                 v-for="page in lastPartPage">{{page}}</a>
          </li>
          <li>
              <a href="javascript:;"
                 :class="{current: currentPage == page + 1}"
                 @click="togglePage(page + 1)"
                 v-for="page in lastPartPage">{{page + 1}}</a>
          </li>
          <li>
              <a href="javascript:;"
             @click="togglePage('next')"
             :class="{disabled: currentPage == lastPage}"><label for=""></label></a>
          </li>
          
        </ul>
      </div>
  </div>
</template>

<script>
  const pageCount = 10;
  export default {
  props: ['dataTable', 'total', 'curName', 'current'],
  data() {
    return {
      currentPage: this.current || 1,
      searchBy: '',
      rows: [],
    }
  },
  computed: {
    lastPage() {
      return Math.ceil(this.total / pageCount);
    },
    centerPartPage() {
      if(this.lastPage > 10 && this.currentPage >= 5) {
        if(this.lastPage - this.currentPage > 5) {
          return this.currentPage === this.lastPage ? [this.currentPage - 3, this.currentPage - 2, this.currentPage - 1] : [this.currentPage - 2, this.currentPage - 1, this.currentPage];
        }else {
          const r = [];
          for(let i = this.lastPage - 6; i < this.lastPage; i++) {
            r.push(i);
          }
          return r;
        }
      }else if(this.lastPage > 10) {
        const r = [];
        for(let i = 1; i < 5; i++) {
          r.push(i);
        }
        return r;
      }else {
        const r = [];
        for(let i = 1; i < this.lastPage; i++) {
          r.push(i);
        }
        return r;
      }
    },
    lastPartPage() {
      if(this.lastPage > 10 && this.lastPage - this.currentPage > 5) {
        return [this.lastPage - 1];
      }else {
        return [];
      }
    },
    firstRow() {
      return this.currentPage === 1 ? 0 : pageCount * (this.currentPage - 1);
    },
    lastRow() {
      return pageCount * this.currentPage > this.total ? this.total : pageCount * this.currentPage;
    }
  },
  watch: {
      'searchBy'(val) {
        console.log(val);
        if(val) {
          this.currentPage = 1;
        }
      },
      'currentPage'(val) {
        console.log('currentPage has Changed', val);
        this.$emit('loadData', val);
      }
  },
  methods: {
    onChangePageCount() {
      this.currentPage = 1;
    },
    filterRows(rows, options, currentPage) {
      if(this.searchBy !== '') {
        rows = rows.filter((row) => {
          let r = false;
          for(let key in row) {
            if(row[key].value
              .toString()
              .toLowerCase()
              .indexOf(this.searchBy.toLowerCase()) !== -1) {
              r = true;
            }
          }
          return r;
        });
      }
      return rows;
    },
    togglePage(page) {
      switch(page) {
        case 'prev': 
          if(this.currentPage <= 1) return ;
          this.currentPage--;
          break;
        case 'next':
          if (this.currentPage >= this.lastPage) return ;
          this.currentPage++;
          break;
        default:
          if(this.currentPage == page) return ;
          this.currentPage = page;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .table-title {
    height: 36px;
    line-height: 36px;
    >td {border-left: 1px solid #122442;margin-left: 1px;}
  }
  tbody {
    >:nth-child(2n) {
      background-color: #2C3D5D;
    }
    .distribute, .detail {
      padding: 2px 4px;
      border-radius: 4px;
      border: 1px #0BA6CB solid;
      background: #1E4C6C;
    }
  }

  .v-table {
    display: inline-block;
    float: right;
      table {
        width: 100%;
        border-collapse:collapse;
        thead {
         
          th {
            position: relative;
            padding: 10px 18px;
            text-align: left;
            font-weight: bold;
          }
        }
      }
    
    .pagination {
      float: right;
      height: 100px;
      width: 600px;
      line-height: 100px;
      display: inline-block;
      padding: 0;
      margin: 0;
      &>li {
        &:hover {
          cursor: pointer;
        }
        &:first-child {
          width:200px;
        }
        height: 22px;
        display: inline-block;
        line-height: 22px;
        &:first-child a{
          font-family: PingFangSC-Regular;
          font-size: 14px;
          width: 200px;
          &>span{
            color:yellow;
          }
        }
        &:nth-child(2) a{
          vertical-align: middle;
          label{
            display: inline-block;
            width: 7px;
            height: 7px;
            background: url("../../assets/arrow_left@2x.png");
            background-size: 6.1px 6.6px;
            background-repeat: no-repeat;
          }
        }
        &:last-child a{
          vertical-align: middle;
          label{
            display: inline-block;
            width: 7px;
            height: 7px;
            background: url("../../assets/arrow_right@2x.png");
            background-size: 6.1px 6.6px;
            background-repeat: no-repeat;
          }
        }
        .current {
            display: inline-block;
            width: 22px;
            height: 22px;
            background: #172945;
            border-radius: 4px;
        }
        .disabled {
          display:none;
        }
        &>a{
          display: inline-block;
          text-align: center;
          height: 22px;
          width:22px;
          color: black;
          float: left;
          margin: 8px 5px;
          text-decoration: none;
          ont-family: PingFangSC-Regular;
          font-size: 12px;
          color: #EFF3FC;
          letter-spacing: 0;
        }
        label:hover {
          cursor: pointer;
        }
      }
    }
  }
</style>