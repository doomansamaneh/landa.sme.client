<template>
  <!-- <div class="col justify-center items-center">
    <q-btn @click="testStore.increamentLocal">increament local</q-btn>
    <q-btn @click="testStore.increamentGlobal">increament global</q-btn>
    <h4>{{ testStore.localCount }}</h4>
    <h4>{{ testStore.globalCount }}</h4>
  </div> -->
  <div class="q-gutter-y-lg">
    <q-card class="no-shadow q-pa-xl">
    <Bar
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
    />
  </q-card>
  <q-card class="no-shadow q-pa-xl">
    <Pie
      :data="chartData"
      :options="chartOptions"
    />
  </q-card>
  <q-card class="no-shadow q-pa-xl">
    <Doughnut
      :data="chartData"
      :options="chartOptions"
    />
  </q-card>
  <q-card class="no-shadow q-pa-xl">
    <Line
      :data="chartData"
      :options="chartOptions"
    />
  </q-card>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useTest } from "src/components/areas/sls/_composables/testStore"
import { Bar } from 'vue-chartjs'
import { Pie } from 'vue-chartjs'
import { Line } from 'vue-chartjs'
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement, PointElement, LineElement } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement, PointElement, LineElement)

// const testStore = useTest()

const chartData = ref({
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [{
    label: 'January',
    backgroundColor: ['#2d2d2d', '#41B883', '#E46651', '#00D8FF', '#DD1B16', 'blue', '#CE1340'],
    borderColor: "#2d2d2d2d",
    fill: false,
    tension: 0.5,
    data: [40, 39, 10, 40, 39, 80, 40]
  }],
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false
});
</script>

<style lang="scss"></style>
