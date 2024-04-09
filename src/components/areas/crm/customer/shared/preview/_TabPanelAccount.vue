<template>
  <div class="row q-col-gutter-md">
    <div class="col-md col-sm-6 col-xs-12">
      <q-card class="info-box bordered border-radius-lg">
        <q-card-section class="q-gutter-md">
          <div class="">
            <q-badge rounded class="q-px-sm q-mr-sm text-on-dark bg-on-dark"><span
                class="text-bold text-caption">18</span></q-badge><span
              class="text-bold text-caption text-on-dark-1">فاکتورها</span>
          </div>
          <div class="text-h6 text-bold text-on-dark q-gutter-xs">
            240,000,000<span class="text-body1 text-bold text-on-dark-1">ریال</span>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div class="col-md col-sm-6 col-xs-12">
      <q-card class="info-box bordered border-radius-lg">
        <q-card-section class="q-gutter-md">
          <div class="">
            <q-badge rounded class="q-px-sm q-mr-sm text-on-dark bg-on-dark"><span
                class="text-bold text-caption">0</span></q-badge><span
              class="text-bold text-caption text-on-dark-1">مانده حساب</span>
          </div>
          <div class="text-h6 text-bold text-on-dark q-gutter-xs">
            0<span class="text-body1 text-bold text-on-dark-1">ریال</span>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div class="col-md col-sm-6 col-xs-12">
      <q-card class="info-box bordered border-radius-lg">
        <q-card-section class="q-gutter-md">
          <div class="">
            <q-badge rounded class="q-px-sm q-mr-sm text-on-dark bg-on-dark"><span
                class="text-bold text-caption">4</span></q-badge><span
              class="text-bold text-caption text-on-dark-1">بدهکار</span>
          </div>
          <div class="text-h6 text-bold text-on-dark q-gutter-xs">
            2,000,000<span class="text-body1 text-bold text-on-dark-1 q-gutter-xs">ریال</span>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div class="col-md col-sm-6 col-xs-12">
      <q-card class="info-box bordered border-radius-lg">
        <q-card-section class="q-gutter-md">
          <div class="">
            <q-badge rounded class="q-px-sm q-mr-sm text-on-dark bg-on-dark"><span
                class="text-bold text-caption">9</span></q-badge><span
              class="text-bold text-caption text-on-dark-1">بستانکار</span>
          </div>
          <div class="text-h6 text-bold text-on-dark q-gutter-xs">
            158,300,020<span class="text-body1 text-bold text-on-dark-1">ریال</span>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <invoice />
</template>

<script setup>
import { ref } from "vue";
</script>
