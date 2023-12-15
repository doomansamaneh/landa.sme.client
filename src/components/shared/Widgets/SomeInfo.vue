<template>
  <q-card class="fit bordered">


    <q-card-section>
      <div class="row">
        محل نصب دونات
        <div class="col">
          <donut-chart :legend="false" />
        </div>
        <div class="col"></div>
      </div>

    </q-card-section>

  </q-card>
</template>

<script setup>

import DonutChart from 'src/components/shared/Charts/DonutChart.vue'

</script>
