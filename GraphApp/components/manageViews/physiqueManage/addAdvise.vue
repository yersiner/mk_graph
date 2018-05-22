<template>
  <div class="add-advise">
    <ul class="advise-content">
        <li>
            <div style="height: 60px;line-height: 35px;">
                <label class="text-center" for="">体格类型</label>
                <v-select v-model="selectedType" class="inblock py-type" :options="typeList"></v-select>
                <span class="text-center" style="font-size:12px;width:100px">为该体格添加分析</span>
            </div>
            <label for="">"正常"提示</label>
            <div class="inblock fixwidth">
                <div class="text-item inblock">
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                </div>
                <div class="text-item inblock">
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                </div>
                <div class="add-sub">
                    <img src="../../../assets/add-icon.png" alt="" class="cp">
                    <span class="add-text fs12">添加提示</span>
                    <span class="add-des fs12">注：多条提示语系统会随机显示一条</span>
                </div>
            </div>
        </li>
        <li>
            <label for="">"偏高"提示</label>
            <div class="inblock">
                <div class="text-item inblock">
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                </div>
                <div class="add-sub">
                    <img src="../../../assets/add-icon.png" alt="" class="cp">
                    <span class="add-text fs12">添加提示</span>
                    <span class="add-des fs12">注：多条提示语系统会随机显示一条</span>
                </div>
            </div>
        </li>
        <li>
            <label for="">"偏低"提示</label>
            <div class="inblock">
                <div class="text-item inblock">
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                </div>
                <div class="add-sub">
                    <img src="../../../assets/add-icon.png" alt="" class="cp">
                    <span class="add-text fs12">添加提示</span>
                    <span class="add-des fs12">注：多条提示语系统会随机显示一条</span>
                </div>
            </div>
        </li>
    </ul>
    <div class="submit-button">提交</div>
  </div>
</template>

<script>
import vSelect from "vue-select";

export default {
  name: 'addAdvise',
  props: ['list'],
  components: {
      vSelect
  },
  data () {
    return {
      name: 'addAdvise',
      selectedType: {
        label: '血氧',
        value: 0
      },
      //0=血压/1=血氧/3=脉搏4=血糖
      typeList: [{
        label: '血氧',
        value: 0
      },{
        label: '血压',
        value: 1
      },{
        label: '脉搏',
        value: 3
      },{
        label: '血糖',
        value: 4
      }]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
.fixwidth {
    width: 80%;
}
.add-advise {
    .advise-content {
        border-top: 0.5px solid #3C4E78;
        >li:last-child {
            border-bottom:0px;
        }
        >li {
            padding: 30px 0;
            >:not(:first-child) {
                
            }
            border-bottom: 1px dotted #3C4E78;
            .text-center {
                text-align: center;
                color: #8C9BBE;
                display: inline-block;
                width: 80px;
                vertical-align: top;
                margin-right: 20px;
            }
            .py-type {
                background: #172945;
                width: 90px;
                height: 36px;
                line-height: 36px;
            }
            >label {
                color: #8C9BBE;
                display: inline-block;
                width: 80px;
                vertical-align: top;
                text-align: left;
                margin-right: 20px;
            }
            .text-item {
                width: 60%;
            }
            textarea {
                outline: none;
                width: 480px;
                height: 60px;
                padding: 10px;
                resize:none;
                background: #172945;
                border-radius: 4px;
                border: 0px;
                color: #EFF3FC;
                font-size: 14px;
                margin-bottom: 20px;
            }
            .add-sub {
                img {
                    vertical-align: top;
                }
                .add-text {
                    color: #01D7FD;
                    margin-right: 16px;
                }
                .add-des {
                    color: #596C93;
                }
            }
        }
    }
    .submit-button {
        background: #01D7FD;
        border-radius: 4px;
        width: 160px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: white;
        font-size: 16px;
        margin-left: 104px;
        margin-top: 40px;
    }
}
</style>
