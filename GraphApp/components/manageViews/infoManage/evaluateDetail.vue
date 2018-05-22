<template>
  <div class="opinion-deatil">
    <div class="detail-title">
      <span></span>
      <span>评价详情</span>
      <div class="backbtn cp fr inblock">
        <img src="" alt="">
        <span class="fs14">返回</span>
      </div>
    </div>
    <div class="detail-content">
      <ul>
        <li class="single-list">
          <label for="" name="valid">评价者</label>
          <input type="text" class="input-color">
        </li>
        <li class="single-list">
          <label for="" name="valid">用户名</label>
          <input type="text" class="input-color">
        </li>
        <li class="single-list">
          <label for="" name="valid">评价商品</label>
          <input type="text" class="input-color">
        </li>
        <li class="single-list">
          <label for="" name="valid">所属分类</label>
          <input type="text" class="input-color">
        </li>
        <li class="single-list">
          <label for="" name="valid">所属医生</label>
          <input type="text">
        </li>
        <li class="single-list">
          <label for="" name="valid">所属医院</label>
          <input type="text">
        </li>
        <li class="single-list">
          <label for="" name="valid">订单号</label>
          <input type="text">
        </li>
        <li class="text-list">
          <label for="" name="valid">评价内容</label>
          <textarea name="" id="text-content" cols="30" rows="10" class="back-content"></textarea>
        </li>
        <li class="single-list">
          <label for="" name="valid">订单号</label>
          <input type="text">
        </li>
        <li class="single-list">
          <label for="" name="valid">评价时间</label>
          <input type="text">
        </li>
        <li class="single-list">
          <label for="" name="valid">处理状态</label>
          <input type="text">
        </li>
        <li class="text-list">
          <label for="" name="valid">回复评论</label>
          <textarea name="" id="" cols="30" rows="10" class="reply-user"></textarea>
        </li>
      </ul>
      <div class="opration-info">
        <input type="button" class="submit corfff fs16 cp" value="编辑信息">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  	name: 'edetail',
  	data () {
    	return {
      		msg:"infoManage.vue test"
    	}
  	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
@bgColor:#243554;
.opinion-deatil {
    height: 1200px;
    margin-top: 30px;
    .detail-title {
      height: 40px;
      line-height: 40px;
      margin-bottom: 20px;
      >:first-child {
        width: 4px;
        height: 18px;
        background: #01D7FD;
        border-radius: 4px;
        margin-right: 5px;
        display: inline-block;
      }
      .backbtn {
        height: 26px;
        line-height: 26px;
        border-radius: 4px;
        width: 76px;
        text-align: center;
        vertical-align: middle;
        border: 2px solid #01D7FD;

      }
    }
    .detail-content {
      padding-top: 30px;
      border-top: 1px solid #7689B6;
      .single-list {
        height: 40px;
        line-height: 40px;
        margin-bottom: 20px;
      }
      label {
        width: 80px;
        text-align: right;
        height: 40px;
        margin-right: 20px;
        display: inline-block;
        color: #7689B6;
        font-size: 14px;
      }
      input {
        outline: none;
        width: 260px;
        height: 40px;
        line-height: 40px;
        border: 0px;
        border-radius: 4px;
        background: #1E2F4E;
        text-indent: 18px;
        color: #EFF3FC;
      }
      .text-list {
        margin: 20px 0;
        label {
          vertical-align: top;
        }
        .back-content {
          width: 680px;
          height: 80px;
          padding: 10px;
          background: #1E2F4E;
          resize: none;
          border: 0px;
          border-radius: 4px;
          color: #EFF3FC;
        }
        .pic-show {
          height: 100px;
        }
        .reply-user {
          width: 680px;
          padding: 10px;
          height: 180px;
          background: #1E2F4E;
          resize: none;
          border: 0px;
          border-radius: 4px;
          color: #EFF3FC;
          text-indent: 18px;
          line-height: 20px;
        }
      }

    }
    .opration-info {
      margin-top: 60px;
      .submit {
        height: 40px;
        line-height: 40px;
        width: 160px;
        background-image: linear-gradient(89deg, #04BBE4 0%, #059AFF 100%);
        border-radius: 4px;
        color: #FFF;
        margin-left: 110px;
      }
    }
  }
</style>
