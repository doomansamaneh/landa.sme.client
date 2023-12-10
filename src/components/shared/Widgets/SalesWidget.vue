<template>
  <div class="container fit">

    <q-card
      class="my-card"
      flat
      bordered
    >
      <q-card-section horizontal>

        <q-card-section class="col q-pt-xs">
          <div class="text-h5 q-mt-sm q-mb-xs">دریافت</div>
          <div class="text-caption text-grey">
            امسال
          </div>
        </q-card-section>


        <q-card-section class="col-8 flex flex-center">
          <in-card-line-chart />
        </q-card-section>


      </q-card-section>

    </q-card>


  </div>
</template>

<script setup>
import { useRouter } from "vue-router"
import InCardLineChart from "src/components/shared/Charts/InCardLineChart.vue"

const router = useRouter()

const gotoInvoice = () => {
  router.push('/Sls/Invoice')
}
</script>

<style>
.container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: end;
  gap: 24px;
}
</style>
