<template>
  <div id="common">
    <header class="header" style="color: #ffffff;float: left;margin:0; z-index:999">
      <span style=" display:inline-block;margin:10px 20px;">数据平台</span>
      <el-input placeholder="请输入"  style="width:20%;margin-left:65%;" size="middle"  >
        <el-button slot="append" icon="el-icon-search" ></el-button>
      </el-input>
    </header>
    <div class="main">
      <div class="left-menu">
        <el-tree
          style="color: #ffffff;background: skyblue"
          class="treeClz"
          :data="leftMenu"
          :props="treeProp"
          node-key="id"
          default-expand-all
          @node-drag-start="handleDragStart"
          @node-drag-enter="handleDragEnter"
          @node-drag-leave="handleDragLeave"
          @node-drag-over="handleDragOver"
          @node-drag-end="handleDragEnd"
          @node-drop="handleDrop"
          draggable
          :allow-drop="allowDrop"
          :allow-drag="allowDrag"
          @node-click="itemCli">
        </el-tree>
      </div>
      <div class="right-content">
        <el-tag style="margin-bottom:20px;"v-for="tag in tags" :key="tag.name" closable :type="tag.type"  @close="closetag(tag)" @click="enterTag(tag)">
          <span v-if="tagSte==tag.id" style="color: black" class="tagClz">{{tag.label}}</span>
          <span v-else-if="tagSte!=tag.id" class="tagClz">{{tag.label}}</span>
        </el-tag>
        <!--<el-breadcrumb  separator-class="el-icon-arrow-right" style="margin: 20px 8px;">-->
        <!--<el-breadcrumb-item  v-for="item in itemLabels" :key="item.id">-->
        <!--{{item.label}}-->
        <!--</el-breadcrumb-item>-->
        <!--</el-breadcrumb>-->
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'home',
    data () {
      return {
        treeProp: {
          label: 'label',
          children: 'child'
        },
        tagSte: '',
        tags: [],
        itemLabels: [],
        leftMenu: [
          {
            index: '1',
            href: '',
            label: '数据管理',
            child: [
              {
                id: '11',
                index: '11',
                href: '/page/page1',
                label: '数据页面1'
              },
              {
                id: '12',
                index: '12',
                href: '/page/page2',
                label: '数据页面2'
              },
              {
                id: '13',
                index: '13',
                href: '/page/page3',
                label: '数据页面3'
              },
              {
                id: '14',
                index: '14',
                href: '/page/page4',
                label: '数据页面4'
              }
            ]
          },
          {
            index: '2',
            href: '',
            label: '日志管理',
            child: [
              {
                id: '21',
                index: '21',
                href: '/information/information1',
                label: '日志页面1'
              }, {
                id: '22',
                index: '22',
                href: '/information/information2',
                label: '日志页面2'
              }
            ]
          },

        ]
      }
    },
    created () {

    },
    methods: {
      handleDragStart (node, ev) {
        console.log('drag start', node)
      },
      handleDragEnter (draggingNode, dropNode, ev) {
        console.log('tree drag enter: ', dropNode.label)
      },
      handleDragLeave (draggingNode, dropNode, ev) {
        console.log('tree drag leave: ', dropNode.label)
      },
      handleDragOver (draggingNode, dropNode, ev) {
        console.log('tree drag over: ', dropNode.label)
      },
      handleDragEnd (draggingNode, dropNode, dropType, ev) {
        console.log('tree drag end: ', dropNode && dropNode.label, dropType)
      },
      handleDrop (draggingNode, dropNode, dropType, ev) {
        console.log('tree drop: ', dropNode.label, dropType)
      },
      allowDrop (draggingNode, dropNode, type) {
        if (dropNode.data.label === '二级 3-1') {
          return type !== 'inner'
        } else {
          return true
        }
      },
      allowDrag (draggingNode) {
        return draggingNode.data.label.indexOf('三级 3-2-2') === -1
      },
      closetag (tag) {
        if (this.tags.length == 1) {
          this.$message.error('只剩一个页签，请保留一个火种吧！！！')
          return
        }
        for (var i = 0; i < this.tags.length; i++) {
          if (tag.id == this.tags[i].id) {
            this.tags.splice(i, 1)
            //删除某一个标签
          }
        }
        this.$router.push({ path: this.tags[this.tags.length - 1].href })
        //跳转到删除的这个页面之前点击的那个页面
        this.tagSte = this.tags[this.tags.length - 1].id
      },
      itemCli (val) {
        var state = this.tagsadapt(val)
        if (!state) {
          this.tags.push(val)
        }
        //只要点击的不是已经存在的就增加一个新标签
        console.log(val)
        this.tagSte = val.id
        this.$router.push({ path: val.href })
        // this.itemLabels = []
        // this.itemLabels.push(parent)
        // this.itemLabels.push(val)
      },
      tagsadapt (tag) {
        for (var i = 0; i < this.tags.length; i++) {
          if (this.tags[i].id == tag.id) {
            return true
          }
        }
        return false
      },
      enterTag (tag) {
        this.tagSte = tag.id
        this.$router.push({ path: tag.href })
      },

    }
  }
</script>
<style scoped >
  #common {
    width: 100%;
    height: 100%;
    padding-top: 40px;
    color: #fff;
  }
  .header {
    width: 100%;
    height: 55px;
    font-size: 24px;
    cursor: pointer;
    background: skyblue;
    box-shadow: 0px 10px 10px rgb(191, 203, 217);
    position: fixed;
    top: 0px;
  }
  .main {
    height: 550px;
    max-height:550px;
    display: flex;
    font-size: 16px;
    background:#ffffff;
    padding-top: 20px;
  }
  .left-menu {
    height: 550px;
    max-height:550px;
    background: skyblue;
    width: 240px;
    box-sizing: border-box;
    box-shadow: 0px 0px 10px rgb(191, 203, 217);
  }
  .right-content {
    flex: 1;
    padding: 20px;
    box-shadow: 0px 0px 10px rgb(191, 203, 217);
    color:black;
  }

</style>
