<template>
  <div class="add-page">
    <div class="add-container">
      <ul class="add-item">
        <li>
          <label for="" class="fl">医院名称</label><input type="text">
        </li>
        <li>
          <label for="" class="">负责人</label><input type="text">
        </li>
        <li>
          <label for="">联系电话</label><input type="text">
        </li>
        <li>
          <label for="">医院等级</label>
          <areaList :selections="provinces" class="inblock grade"></areaList>
        </li>
        <li>
          <label for="">医院性质</label>
          <areaList :selections="provinces" class="inblock nature"></areaList>
        </li>
        <li>
          <label for="">所在地区</label>
          <areaList :selections="provinces" class="inblock region"></areaList><span class="tec addr">省</span>
          <areaList :selections="provinces" class="inblock region"></areaList><span for="" class="tec">市/州</span>
          <areaList :selections="provinces" class="inblock region"></areaList><span for="" class="tec">县/区</span>
        </li>
        <li class="detail-addr">
          <label for="">详细地址</label><textarea name="" id="" cols="30" rows="10">
          </textarea>
        </li>
        <li class="hospital-des">
          <label for="">医院简介</label><textarea name="" id="" cols="30" rows="10"></textarea>
        </li>
      </ul>
    </div>
  <div class="add-operation">
    <input type="submit" value="提交" class="submit fs16 corfff cp">
  </div>
  </div>
</template>

<script>
import AreaList from "../../widget/areaList.vue";//地区下拉组件
export default {
    name: 'edithospital',
    components: {
      'areaList': AreaList
    },
    data () {
      return {
          msg:"hospital2.vue test",
          provinces: [
          {
            label: '全国',
            value: 1000000
          },
          {
            label:'贵州省',
            value:10000001
          }
        ]
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
@bgColor:#243554;
.add-page {
  .add-container {
    margin-top: 40px;
    padding-top: 30px;
    border-top: 0.5px solid #7689B6;
    .add-item {
      >li {
        height: 40px;
        line-height: 40px;
        margin-bottom: 20px;
        .grade,.nature {
          width: 120px;
          height: 40px;
          background: #172945;
          border: 4px;
          .selection-wrap {
            width: 120px;
            .selection-show {
              height: 40px;
              line-height: 40px;
              width: 120px;
              background: #172945;
            }
            .selection-list {
              margin-top: 18px;
            }
          }
        }
        .region {
          width: 80px;
          .selection-wrap {
            width: 80px;
            .selection-show {
              height: 40px;
              line-height: 40px;
              width: 80px;background: #172945;
            }
          }
          .selection-list {
            margin-top: 18px;
          }
        }
        >span {
          color: #7689B6;
          display: inline-block;
          padding: 0 10px;
        }
        >label {
          display: inline-block;
          width: 80px;
          text-align: right;
          margin-right: 30px;
          color: #7689B6;
          font-size: 14px;
        }
        >input {
          height: 40px;
          width: 260px;
          border-radius: 4px;
          border: none;
          background: #172945;
          text-indent: 20px;
          color: #596C93;
          font-family: PingFangSC-Regular;
        }
        >textarea {
          width: 500px;
          color: #596C93;
          background: #172945;
        }
      }
      .detail-addr {
        height: 80px;
        label {
          vertical-align: top;
        }
        textarea {
          height: 80px;
          resize:none;
          border: 0px;
        }
      }
      .hospital-des {
        height: 100px;
        border: 0px;
        resize:none;
        textarea {
          vertical-align: top;
          height: 100px;
          resize:none;
          border: 0px;
        }
      }
    }
    
  }
  .add-operation {
    padding: 60px 0 0 120px;
    .submit {
      width: 160px;
      height: 40px;
      border: 0px;
      background-image: linear-gradient(270deg, #04BBE4 0%, #059AFF 100%);
      border-radius: 4px;
    }
  }
}
</style>
