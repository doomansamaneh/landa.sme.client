<template>
  <div class="container fit">

    <q-card class="no-shadow bordered">
      <q-card-section class="row justify-between">
        <q-avatar
          rounded
          color="blue"
          text-color="white"
          icon="o_pie_chart"
          size="lg"
        />
        <div class="row items-center">
          <q-btn
            unelevated
            round
            size="sm"
            icon="o_more_vert"
          />
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none column q-gutter-y-sm">
        <div class="text-body2">جمع فاکتورها</div>
        <div class="text-h6 text-bold">60,740,410</div>
        <div class="row items-center">
          <q-icon
            name="o_arrow_upward"
            color="green"
          />
          <div class="text-body2 text-bold text-green">+72%</div>
        </div>
      </q-card-section>
    </q-card>

    <q-card class="no-shadow bordered">
      <q-card-section class="row justify-between">
        <q-avatar
          rounded
          color="primary"
          text-color="white"
          icon="o_arrow_downward"
          size="lg"
        />
        <div class="row items-center">
          <q-btn
            unelevated
            round
            size="sm"
            icon="o_more_vert"
          />
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none column q-gutter-y-sm">
        <div class="text-body2">دریافت شده</div>
        <div class="text-h6 text-bold">376,339,310</div>
        <div class="row items-center">
          <q-icon
            name="o_arrow_upward"
            color="green"
          />
          <div class="text-body2 text-bold text-green">+28%</div>
        </div>
      </q-card-section>
    </q-card>

    <q-card class="no-shadow bordered">
      <q-card-section class="row justify-between">
        <q-avatar
          rounded
          color="orange"
          text-color="white"
          icon="o_pie_chart"
          size="lg"
        />
        <div class="row items-center">
          <q-btn
            unelevated
            round
            size="sm"
            icon="o_more_vert"
          />
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none column q-gutter-y-sm">
        <div class="text-body2">مانده امسال</div>
        <div class="text-h6 text-bold">23,101,100</div>
        <div class="row items-center">
          <q-icon
            name="o_arrow_upward"
            color="green"
          />
          <div class="text-body2 text-bold text-green">+72%</div>
        </div>
      </q-card-section>
    </q-card>

    <q-card class="no-shadow bordered">
      <q-card-section class="row justify-between">
        <q-avatar
          rounded
          color="orange"
          text-color="white"
          icon="o_acute"
          size="lg"
        />
        <div class="row items-center">
          <q-btn
            unelevated
            round
            size="sm"
            icon="o_more_vert"
          />
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none column q-gutter-y-sm">
        <div class="text-body2">مانده از قبل</div>
        <div class="text-h6 text-bold">376,339,310</div>
        <div class="row items-center">
          <q-icon
            name="o_arrow_downward"
            color="negative"
          />
          <div class="text-body2 text-bold text-negative">+28%</div>
        </div>
      </q-card-section>
    </q-card>

  </div>
</template>

<script setup>
import { useRouter } from "vue-router"

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
