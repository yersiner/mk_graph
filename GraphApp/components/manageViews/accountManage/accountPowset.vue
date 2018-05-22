<template>
  <div class="hosptial-container">
    <div class="acount-info">
        <img src="../../../assets/user.png" alt="">
        <span class="innlock">用户名：13887665362</span>
        <span>姓名：张三</span>
    </div>
    <div class="account-content">
      <div class="hosp-manage manage-item">
        <div class="set-item tec fl cp">
          <input type="checkbox">
          <label for="">医院管理</label>
        </div>
        <div class="set-item tec fl">
          <input type="checkbox" id="hosp-list">
          <label for="hosp-list">医院列表</label>
        </div>
        <div class="set-item tec fl">
          <input type="checkbox" id="hosp-detail">
          <label for="hosp-detail">查看详情</label>
        </div>
        <div class="set-item tec fl">
          <input type="checkbox" id="add-hosp">
          <label for="add-hosp">添加医院</label>
        </div>
        <div class="set-item tec fl">
          <input type="checkbox" id="edit-hosp">
          <label for="edit-hosp">编辑医院</label>
        </div>
      </div> 
      <!-- 签约管理 -->
      <div class="sign-manage manage-item">
        <div class="set-item tec fl">
          <input type="checkbox">
          <label for="">签约管理</label>
        </div>
        <div class="set-item tec fl">
          <input type="checkbox">
          <label for="">签约列表</label>
        </div>
      </div>
    </div>
    <div class="operation">
      <span class="submit cp" @click="submitMethod()">提交</span>
    </div>
  </div>
</template>

<script>
export default {
  	name: 'accountPowset',
  	data () {
    	return {
      		isShowAdd: false,
      		isShowAccount: true
    	}
  	},
  	methods: {
        submitMethod() {
            console.log('点击了提交');
        }
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>

.hosptial-container{
	background-color: #243554;
	color: #fff;
    .acount-info {
        height: 35px;
        line-height: 35px;
        margin: 0 25px;
        span {
          color:#01D7FD;
          margin-right: 60px;
          vertical-align: top;
          margin-top: 5px;
        }
    }
    .account-content {
        margin: 30px 25px;
        background: #172945;
        border: 4px;
        .manage-item {
          height: 60px;
          line-height: 60px;
          border-bottom: 0.5px solid #2B3D66;
          label {
            color:#8C9BBE;
          }
        }
        .set-item {
          width: 20%;
        }
   }
   .operation {
        margin-top: 68px;
        .submit {
            outline: none;
            display: inline-block;
            height: 40px;
            line-height: 40px;
            text-align: center;
            width: 140px;
            background: #01D7FD;
            margin-left: 25px;
            border-radius: 4px;
        }
    }
}
</style>
