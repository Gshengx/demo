<template>
  <div class="tree">
    <ul>
      <tree-node
        v-on="$listeners"
        v-for="item in $attrs.treeList"
         v-bind="$attrs"
        :treeItem="item"
        :key="item.key"
        @changeTree="changeTree"
        :expandedKeys="expandedList"
      />
    </ul>
  </div>
</template>
<script>
import TreeNode from './treeNode'
export default {
  name: 'Tree',
  data() {
    return {
      expandedList: []
    }
  },
  components: { TreeNode },
  created() {
    this.expandedList = this.$attrs.expandedKeys
  },
  methods: {
    changeTree(key) {
      if (this.expandedList.includes(key)) {
        this.expandedList.splice(this.expandedList.indexOf(key), 1)
      } else {
        this.expandedList.push(key)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.tree {
  line-height: 20px;
  font-size: 20px;
  ul > li {
    padding-left: 0;
  }
  .treeNode-show-line:not(:last-child):before {
    position: absolute;
    left: 6px;
    width: 1px;
    height: calc(100% - 22px);
    margin: 22px 0 0;
    border-left: 1px solid #d9d9d9;
    content: ' ';
  }
}
</style>