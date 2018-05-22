<template>
  <div class="info-system">
    <table class="width100">
        <thead>
            <tr class="table-title bg-opcity">
                <th class="cate corfff fs14">类别</th>
                <th class="normal corfff fs14">正常值建议</th>
                <th class="heig corfff fs14">偏高建议</th>
                <th class="high corfff fs14">偏低建议</th>
                <th class="operation corfff fs14">操作</th>
            </tr>
        </thead>
        <tbody id="mainShow" class="main-show">                      
            <tr>
                <td class="tec colortable fs12">心率</td>
                <td class="tec colortable fs12">建议内容建议内容</td>
                <td class="tec colortable fs12">建议内容建议内容</td>
                <td class="tec colortable fs12">建议内容建议内容</td>
                <td class="tec colortable fs12">
                    <router-link :to="{path: '/manage/physiqueManage/edit/'+'edit'}"><span class="edit colorbtn cp">编辑</span></router-link>
                </td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Advise',
  props: ['list'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
.info-system {
    margin-top: 40px;
    border-top: 0.5px solid #3C4E78;
    >table {
        margin-top: 30px;
        .table-title {
            height: 40px;
            line-height: 40px;
            >:not(:first-child) {border-left: 1px solid #122442}
                
        }
        .main-show {
            height: 48px;
            line-height: 48px;
            >:nth-child(2n) {
                background-color: #2C3D5D;
            }
            .edit {
                padding: 2px 4px;
                border-radius: 4px;
                border: 1px #0BA6CB solid;
                background: #1E4C6C;
            }
        }
    }
}
</style>
