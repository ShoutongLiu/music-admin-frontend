<template>
    <el-dialog
        :before-close="onCancel"
        title="收货地址"
        :visible.sync="dialogShow"
    >
        <el-form :model="form">
            <el-form-item
                label="活动名称"
                :label-width="formLabelWidth"
            >
                <el-input
                    v-model="form.name"
                    autocomplete="off"
                ></el-input>
            </el-form-item>
        </el-form>
        <div
            slot="footer"
            class="dialog-footer"
        >
            <el-button @click="onCancel">取 消</el-button>
            <el-button
                type="primary"
                @click="dialogShow=false"
            >确 定</el-button>
        </div>
    </el-dialog>
</template>
<script> 
export default {
    props: {
        dialogShow: {
            type: Boolean
        }
    },
    data() {
        return {
            form: {},
            formLabelWidth: '200'
        }
    },
    watch: {
        dialogShow(newValue, oldValue) {
            this.dialogShow = newValue
        }
    },
    mounted() {
        console.log(this.dialogShow)
    },
    methods: {
        onCancel() {
            this.$emit("dialogHide", false);
        }
    },
}
</script>
<style lang='scss' scoped>
</style>