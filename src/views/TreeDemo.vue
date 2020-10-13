<template>
  <div class="page">
    <Tree
      :treeList="treeList"
      :expandedKeys="['0','0-3']"
      selected="1"
      :showLine="true"
    />
  </div>
</template>
<script>
import Tree from '@/components/Tree'
export default {
  name: 'treeDemo',
  data() {
    return {
      treeList: [
        {
          key: '0',
          title: '0',
          children: [
            {
              key: '0-0',
              title: '0-0',
              children: []
            },
            {
              key: '0-1',
              title: '0-1',
              children: []
            },
            {
              key: '0-2',
              title: '0-2',
              children: []
            },
            {
              key: '0-3',
              title: '0-3',
              children: [
                {
                  key: '0-3-0',
                  title: '0-3-0',
                  children: []
                },
                {
                  key: '0-3-1',
                  title: '0-3-1',
                  children: []
                },
                {
                  key: '0-3-2',
                  title: '0-3-2',
                  children: []
                }
              ]
            }
          ]
        },
        {
          key: '1',
          title: '1',
          children: []
        }
      ]
    }
  },
  components: { Tree },
}
</script>
<style lang="less" scoped>
.page {
background: rgba(0,0,0,0.5);
color: #fff;
  
}
</style>