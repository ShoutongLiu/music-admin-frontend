<template>
    <div class="container">
        <el-table
            v-loading="isLoading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            class="table"
            :data="playlist"
            stripe
            style="width: 100%"
        >
            <el-table-column
                type="index"
                width="50"
            >
            </el-table-column>
            <el-table-column
                label="封面"
                width="180"
            >
                <template slot-scope="scope">
                    <img
                        class="picImg"
                        :src=scope.row.picUrl
                        :alt=scope.row.name
                    >
                </template>
            </el-table-column>
            <el-table-column
                label="名称"
                width="380"
            >
                <template slot-scope="scope">
                    <p>{{ scope.row.name }}</p>
                </template>
            </el-table-column>
            <el-table-column
                label="描述"
                width="380"
            >
                <template slot-scope="scope">
                    <p>{{ scope.row.copywriter }}</p>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="handleEdit(scope.row)"
                    >编辑</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)"
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="page">
            <el-button
                type="primary"
                @click="prevpage"
                :disabled=isPrev
            >
                <i class="el-icon-arrow-left el-icon--left"></i>
                上一页
            </el-button>
            <el-button
                type="primary"
                @click="nextpage"
                :disabled=isNext
            >
                下一页
                <i class="el-icon-arrow-right el-icon--right"></i>
            </el-button>
        </div>
        <edit
            :dialogShow=dialogVisible
            @dialogHide="handleDialogHide"
        />
    </div>
</template>

<script>
import { fetchList } from '../../api/playlist'
import edit from './edit'
export default {
    data() {
        return {
            playlist: [],
            count: 10,
            isLoading: false,
            currentPage: 0,
            isPrev: true,
            isNext: false,
            dialogVisible: false
        }
    },
    components: { edit },
    mounted() {
        this.getList()
    },
    methods: {
        getList() {
            this.isLoading = true
            let dataObj = {
                start: this.currentPage * this.count,
                count: this.count
            }
            fetchList(dataObj).then(res => {
                console.log(res);
                this.playlist = res.data
                this.isLoading = false
            })
        },
        // 下一页
        nextpage() {
            if (this.isPrev) {
                this.isPrev = false
            }
            this.currentPage = this.currentPage + 1
            this.getList()
            if (this.playlist.length >= this.count) {
                this.isNext = true
                return
            }

        },
        // 上一页
        prevpage() {
            if (this.isNext) {
                this.isNext = false
            }
            this.currentPage = this.currentPage - 1
            if (this.currentPage === -1) {
                this.isPrev = true
                return
            }
            this.getList()
        },
        // 编辑
        handleEdit(row) {
            this.dialogVisible = true
            console.log(this.dialogVisible);
        },
        handleDialogHide(val) {
            this.dialogVisible = val
        }
    },
}
</script>
<style lang="scss" scoped>
.container {
    .table {
        .picImg {
            width: 60px;
            height: 60px;
        }
    }
    .page {
        margin: 20px 0;
        display: flex;
        justify-content: center;
    }
}
</style>