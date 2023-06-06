<template>
  <div ref="main" style="width: 100%; height: 400px"></div>
</template>


<script lang="ts" setup>
import { watch, ref, onMounted } from "vue";
//  按需引入 echarts
import * as echarts from "echarts";
import { nextTick } from "process";
const main = ref() // 使用ref创建虚拟DOM引用，使用时用main.value
const props = defineProps({
  data: String,
  title: String
})

watch(()=>props.data, ()=>init());


const init = () => {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(main.value);
  // 指定图表的配置项和数据
  var option = {
    title: "",
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: props.title,
        type: 'pie',
        radius: '50%',
        data: props.data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
}
</script>



<style scoped></style>

