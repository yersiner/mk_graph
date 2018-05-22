<template>	
<div class="bottom-pagination">
	<!-- <pagination :page-no="pageNo" :current.sync="currentPage"></pagination> -->
	<ul class="pagination">
		<li><a href="">共<span>125462</span>条数据</a></li>			
		<li>
		  <a class="button" v-on:click="selectPage( pagination.currentPage-1)" v-bind:class="{'is-disabled': pagination.currentPage == pagination.items[0] ||  pagination.items.length==0}"><label></label>
		  </a>
		</li>
		<li v-for="item in pagination.filteredItems">
		  <a class="button-num" v-on:click="selectPage(item)" v-bind:class="{'is-info': item == pagination.currentPage}">{{item}}</a>
		</li>
		<li>
		  <a class="button" v-on:click="selectPage( pagination.currentPage+1)" v-bind:class="{'is-disabled': pagination.currentPage== pagination.items[ pagination.items.length-1] ||  pagination.items.length==0}"><label></label>
		  </a>
		</li>
	</ul>
</div>
</template>

<script>
let items = []
for(var i=0; i<100; i++){
  items.push({
    key: i+1,
    name: 'nice' + i,
    email: '751143842@qq.com' + i
  });
}
export default {
  	name: 'Pagination',
	data() {
		return {
			searchItem: '',
			items: items,
			filteredItems: [],
			paginatedItems: [],
			selectedItems: [],
			pagination: {
				range: 5,
				currentPage: 1,
				itemPerPage: 8,
				items: [],
				filteredItems: [],
			}
		}
	},
	mounted() {
		this.filteredItems = this.items
		this.buildPagination()
		this.selectPage(1)
	},
	methods: {
		clearSearchItem() {
			this.searchItem = undefined
			this.searchInTheList('')
		},
		searchInTheList(searchText, currentPage) {
			if (_.isUndefined(searchText)) {
				this.filteredItems = _.filter(this.items, function(v, k) {
					return !v.selected
				})
			} else {
				this.filteredItems = _.filter(this.items, function(v, k) {
					return !v.selected && v.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1
				})
			}
			this.filteredItems.forEach(function(v, k) {
				v.key = k + 1
			})
			this.buildPagination()

			if (_.isUndefined(currentPage)) {
				this.selectPage(1)
			} else {
				this.selectPage(currentPage)
			}
		},
		buildPagination() {
			let numberOfPage = Math.ceil(this.filteredItems.length / this.pagination.itemPerPage)
			this.pagination.items = []
			for (var i = 0; i < numberOfPage; i++) {
				this.pagination.items.push(i + 1)
			}
		},
		selectPage(item) {
			this.pagination.currentPage = item

			let start = 0
			let end = 0
			if (this.pagination.currentPage < this.pagination.range - 2) {
				start = 1
				end = start + this.pagination.range - 1
			} else if (this.pagination.currentPage <= this.pagination.items.length && this.pagination.currentPage > this.pagination.items.length - this.pagination.range + 2) {
				start = this.pagination.items.length - this.pagination.range + 1
				end = this.pagination.items.length
			} else {
				start = this.pagination.currentPage - 2
				end = this.pagination.currentPage + 2
			}
			if (start < 1) {
				start = 1
			}
			if (end > this.pagination.items.length) {
				end = this.pagination.items.length
			}

			this.pagination.filteredItems = []
			for (var i = start; i <= end; i++) {
				this.pagination.filteredItems.push(i);
			}

			this.paginatedItems = this.filteredItems.filter((v, k) => {
				return Math.ceil((k + 1) / this.pagination.itemPerPage) == this.pagination.currentPage
			})
		},
		selectItem(item) {
			item.selected = true
			this.selectedItems.push(item)
			this.searchInTheList(this.searchItem, this.pagination.currentPage)
		},
		removeSelectedItem(item) {
			item.selected = false
			this.selectedItems.$remove(item)
			this.searchInTheList(this.searchItem, this.pagination.currentPage)
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
	th {
		min-width: 6%;
	}
	.table-title {
		height: 36px;
		line-height: 36px;
		>td {border-left: 1px solid #122442;margin-left: 1px;}
	}
	.main-show {
		height: 48px;
		line-height: 48px;
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
	ul.pagination {
		float: right;
		height: 181px;
		width: 550px;
		line-height: 181px;
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
			.is-info{
				display: inline-block;
				width: 22px;
				height: 22px;
				background: #172945;
				border-radius: 4px;
			}
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
			.is-disabled {
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
</style>
