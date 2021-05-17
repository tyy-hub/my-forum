<template>
  <div :style="{width:width}" class="panel">
      <div class="header">
          <slot name="header"/>
      </div>
      <div class="content">
          <slot name="content"/>
      </div>
  </div>
</template>

<script>
export default {
    props: {
        width: {
            type: [String,Number],
            default: '100%'
        },
    },
    computed: {
        formatWidth() {
            const {width}=this
            // '100'----> '100px'
            // 100-----> 100px
            // '100%'-----> '100%'
            return typeof width === 'number' ||  Number(width) ? width + 'px' : width
        }
    },
}
</script>

<style lang='less'>
.panel{
    width: 100%;
    border-radius: 4px;
    margin-left: 10px;
    .header{
        margin-top: 10px;
        background-color: #f6f6f6;
        color: #51585c;
    }
    .content{
        padding: 10px 10px 0 10px;
        background-color: #fff;
    }
}
</style>