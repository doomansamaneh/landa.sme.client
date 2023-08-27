<template>
    <q-btn @click="loadData">load data</q-btn>
    <ul>
        <li v-for="(item, index) in bizList" :key="item.id">
           {{ index + 1 }} : {{ item.ownerName }} > {{ item.title }} - {{ item.planTitle }}
        </li>
    </ul>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue"
import { fetchWrapper } from "src/helpers"

const bizList = ref([])

// bizList.value.push({id:1, title:"b 1"})
// bizList.value.push({id:2, title:"b 2"})
// bizList.value.push({id:3, title:"b 3"})
// bizList.value.push({id:4, title:"b 4"})
// bizList.value.push({id:5, title:"b 5"})
// bizList.value.push({id:6, title:"b 6"})
// bizList.value.push({id:7, title:"b 7"})

async function loadData(){
    await fetchWrapper
    .post("business/getBusinessGridData", {
      pageSize: 10,
      currentPage: 1,
    })
    .then((response) => {
      bizList.value = response.data.data.items
    })
}

onMounted (() => {
    loadData()
})
</script>

<style>
    li {
        list-style: none ;
    }
</style>