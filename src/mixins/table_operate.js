/*
 * 模块 : 表格操作相关配置
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2017-8-31
 * 版本 : version 1.0
 */
export default {
	data() {
		return {
			// 全选选项列表
            selectList: [],
		}
	},
	methods: {
		// 设置选项列表
		setSelectList(selection, row){
			// 清空选项列表
			this.selectList = [];
			for(let i = 0 ; i < selection.length ; i ++){
				this.selectList.push(selection[i].id);
            }
        },
        // 清空选项
        clearSelect(){
            this.selectList = [];
        },
        // 新增数据
        addData(){
            this.apiAdd().then(res => {
                this.pageLoading = false;
                if(res.code == 200){
                    this.$Message.success('新增成功!');
                    // 更新列表
                    this.updateList();
                    // 清空选项列表
                    this.clearSelect();
                }
                else console.log(res);
            }).catch(err => this.$Message.error('新增失败！'))
        },
        // 编辑数据
        EditData(){
            this.apiEdit().then(res => {
                this.pageLoading = false;
                if(res.code == 200){
                    this.$Message.success('编辑成功!');
                    // 更新列表
                    this.updateList();
                    // 清空选项列表
                    this.clearSelect();
                }
                else console.log(res);
            }).catch(err => this.$Message.error('编辑失败！'))
        },
		// 删除数据
        deleteData(){
            // 延迟
            setTimeout(() => this.pageLoading = true, 500);
            
            this.apiDelete().then(res => {
                this.pageLoading = false;
                if(res.code == 200){
                    this.$Message.success('删除成功!');
                    // 更新列表
                    this.updateList();
                    // 清空选项列表
                    this.clearSelect();
                }
                else console.log(res);
            }).catch(err => this.$Message.error('删除失败！'))
        },
        // 启用和禁用
        enableOrDisable(type){
            // 延迟
            setTimeout(() => this.pageLoading = true, 500);

            // 如果需要操作的状态为启用
            if(type === 1){
                // 启用用户
                this.apiEnable()
                .then(res => {
                    this.pageLoading = false;
                    if(res.code == 200){
                        this.$Message.success('启用成功!');
                        // 更新列表
                        this.updateList();
                        // 清空选项列表
                        this.clearSelect();
                    }
                    else this.$Message.warning(res.msg);
                }).catch(err => console.log(err))
            }
            // 如果需要操作的状态为禁用
            else if(type === -1){                                
                // 禁用用户
                this.apiDisable().then(res => {
                    this.pageLoading = false;
                    if(res.code == 200){
                        this.$Message.success('禁用成功!');
                        // 更新列表
                        this.updateList();
                        // 清空选项列表
                        this.clearSelect();
                    }
                    else this.$Message.warning(res.msg);
                }).catch(err => console.log(err))
            }
        },
	}
}