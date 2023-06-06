<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>{{props.name}}</span>
        <el-button class="button" type="text" @click="handleClick">{{props.btnName}}</el-button>
      </div>
    </template>
    <el-container style="height: 180px;">
      <el-aside width="150px" >
        <el-image :src="props.img" fit="contain"></el-image>
      </el-aside>
      <el-main>
        <div>Author: {{ props.author }}</div>
        <div>Location: {{ props.location  }}</div>
        <div v-if="props.number != undefined">Number: {{ props.number }}</div>
        <div>ISBN: {{ props.ISBN }}</div>
        <div v-if="props.startTime">StartTime: {{ props.startTime }}</div>
        <div v-if="props.fee">Fee: {{ props.fee }}</div>
        <div v-if="props.status">Status: {{ props.status }}</div>
        <div v-if="props.status == 'on loan'">Remaining Days: {{ Math.max(Number(props.freeKeepDays), 0) }}</div>
      </el-main>
    </el-container>
  </el-card>
</template>

<script lang="ts" setup>

const props = defineProps({
  btnName: String,
  img: String,
  name: String,
  author: String,
  location: String,
  number: String || Number,
  ISBN: String,
  fee: String || Number,
  startTime: String,
  status: String,
  freeKeepDays: String || Number
})

const emits = defineEmits([
  "clickBtn"
])

const handleClick = () => {
  emits('clickBtn', props);
}




</script>

<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
}

</style>
