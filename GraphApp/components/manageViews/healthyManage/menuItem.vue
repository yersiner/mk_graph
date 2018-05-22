<template>
    <li>
        <div :class="{'single-item-oven': byIndex%2 !== 0}" class="single-item numberId tec colortable fs12">99757</div>
        <div :class="{'single-item-oven': byIndex%2 !== 0, editing: edit && model === editedModel}" class="single-item name tec colortable fs12">
        	<i @click="toggle" class="icon" v-show="!open" v-if="isFolder">
        		<img src="../../../assets/unfold_icon.png" alt="">	
        	</i>
        	<i @click="toggle" class="icon" v-show="open" v-if="isFolder">
        		<img src="../../../assets/fold_icon.png" alt="">	
        	</i>
        	<i class="icon_dotted" v-if="!isFolder">•</i>
        	<span @dblclick="editMethod(model)">{{model.name}}</span>
        	<input type="text" v-model-focus="model == editedModel" v-model="model.name"  @blur="doneEdit(model)" @keyup.enter="doneEdit(model)" @keyup.esc="cancelEdit(model)">
        </div>
        <div :class="{'single-item-oven': byIndex%2 !== 0, editing: model === editedSort}" @dblclick="sortMethod(model)" class="single-item sort tec colortable fs12">
				<span>{{model.sort}}</span>
				<input type="text" v-model-focus="model._id == sortedModel._id" v-model.lazy="model.sort"  @blur="doneSort(model)" @keyup.enter="doneSort(model)" @keyup.esc="cancelEditSort(model)">
        </div>
        <div :class="{'single-item-oven': byIndex%2 !== 0}" class="single-item operation tec colortable fs12">
            <button :disabled=" (model.layerNumber === 3)" :class="{disabled: (model.layerNumber === 3)}" class="item-button colorbtn cp" @click='addChild'>新增下级</button>
            <button class="item-button delete colorbtn cp" v-show="model.childNode.length === 0" @click='deleteMethod(byIndex)'>删除</button>
        </div>
			<ul :class="{'child-tree-item': model.layerNumber === 1, 'final-tree-item': model.layerNumber === 2}" v-show="open" v-if="isFolder">
	        	<menuItem class="item" :plist="sortedModel" :edit="edit" :byIndex="index" v-for="(model,index) in sortedModel"
	        	:model="model" :key="model._id"></menuItem>
        	</ul>
    </li>
</template>
<script>
	import Vue from 'vue'
	export default {
		name: 'menuItem',
		props: {
		  model: Object,
		  edit: false,
		  plist: Array,
		  byIndex: ''
		},
		data: function () {
		  return {
		    open: false,
		    editedSort: null,
		    editedModel: null,
		    beforeEditCache: null,
		    beforeEditCacheSort: null,
		    editFlag: false
		  }
		},
		computed: {
		  isFolder: function () {
		    return this.model.childNode &&
		      this.model.childNode.length
		  },
		  sortedModel: function() {
		    function compare(a, b) {
		      if (a.sort < b.sort)
		        return -1;
		      if (a.sort > b.sort)
		        return 1;
		      return 0;
		    }

		    return this.model.childNode.sort(compare);
		  }
		},
		directives: {
			'model-focus': function (value, el, elem) {
				//console.log(value);
				if (!value) {
					return;
				}
				//console.log('---------<',el, t)
				
				//var el = this.el;
				
				Vue.nextTick(function () {
					elem.elm.focus();
				});
			}
		},
		methods: {
			toggle: function () {
		      if (this.isFolder) {
		        this.open = !this.open
		      }
		    },
		    sortMethod(model) {
    			this.editedSort = null;
    	    	this.beforeEditCacheSort = model.sort;
    			this.editedSort = model;
		    },
		    addOrEditCategory(model) {
		    	this.$store.dispatch('HealthyModule/addOrEditCategory', {
					name: model.name,
					categoryId: model._id,
					parent_id: model.parent_id,
					sort: model.sort
				})
		    },
		    doneSort(model) {
		    	if (!this.editedSort) {
		    		return;
		    	}
		    	this.addOrEditCategory(model)
		    	this.editedSort = null;
		    },
		    cancelEditSort(model) {
    	    	this.editedSort = null;
    			model.sort = this.beforeEditCacheSort;
		    },
		    editMethod(model) {
				this.editedModel = null;
		    	this.beforeEditCache = model.name;
				this.editedModel = model;
		    	//console.log(model)
		    },
		    doneEdit: function (model) {
				if (!this.editedModel || !model.name) {
					return;
				}
				this.editedModel = null;
				model.name = model.name.trim();
				if(model.name !== this.beforeEditCache && model.categoryId) {
					this.addOrEditCategory(model)
				}
				if (!model.title) {
					//this.removeTodo(model);
				}
			},
		    cancelEdit(model) {
		    	this.editedModel = null;
				model.name = this.beforeEditCache;
		    },
			addChild(){
				let id = Date.now()
				let sort = this.model.sort
				this.$store.dispatch('HealthyModule/addOrEditCategory', {
				    name: '新子分类',
				    categoryId: "",
				    parent_id: this.model._id,
				    sort: sort
				})
				this.model.childNode.push({
			        name: '新子分类',
			        sort: sort,
		            categoryId: "",
		            parent_id: this.model._id,
			        _id: id,
			        childNode: [],
			        layerNumber:this.model.layerNumber + 1
			    })
				this.open = true;
				console.log('添加')
			},
			deleteMethod(index){
				this.plist.splice(index, 1)
				if(this.model.categoryId) {
					this.$store.dispatch('HealthyModule/delCategory', this.model.categoryId)
				}
				console.log('delete--->index', index)
			}
		}
	}
</script>
<style scoped lang="less">
	.flip-list-move {
	  transition: transform 1s;
	}
	.item-button {
		background: #1E4C6C;
		border: 1px solid #0BA6CB;
		border-radius: 4px;
		padding: 4px 8px 4px 8px;
		margin-left: 5px;
    	outline: none;
	}
	.item-button.disabled {
		opacity: .65;
		cursor: not-allowed;
	}
	.item .delete {
		background: #223E5C;
		border: 1px dotted #1286A8;
		border-radius: 4px;
	}
	li .final-tree-item .name {
		text-indent: 200px;
	}
	.child-tree-item .name {
		text-indent: 150px;
	}
	.item {
		letter-spacing: -4px;/*根据不同字体字号或许需要做一定的调整*/
		word-spacing: -4px;
		font-size: 0;
		.single-item {
			height: 42px;
			line-height: 42px;
			padding-right: 0px;
			letter-spacing: normal; 
			word-spacing: normal; 
			display:inline-block;
			*display: inline; 
			zoom:1;
		}
		.single-item-oven {
			background-color: #2F4162;
		}
	}
	.numberId {
		width: 9%;
	}
	.icon_dotted {
		font-size: 20px;
	    color: #01D7FD;
	    vertical-align: middle;
	    margin-right: 10px;
	}
	.icon {
		position: relative;
		top: 3px;
		margin-right: 10px;
	}
	.editing span {
		display: none;
	}
	li .editing input {
		display: inline-block;
	}
	.name {
		text-align: left;
		text-indent: 100px;
		width: 62.3%;
		cursor: pointer;
	}
	input {
		outline: none;
	    background: rgba(5, 30, 56, 0.5);
	    border-radius: 4px;
	    width: auto;
	    height: 35px;
	    border: 0px;
	    padding: 0 0 0 10px;
	    color: white;
	    display: none;
	}
	.sort {
		width: 10.3%;
	}
	.operation {
		width: 19.26%;
	}
</style>