<template>
  <div class="q-pa-md">
    <div class="row q-gutter-md q-mb-xl">
      <div class="col">
        <q-card class="info-box no-shadow bordered-1">
          <q-card-section class="q-gutter-md">
            <div class="">
              <q-badge rounded class="q-px-sm q-mr-sm text-on-dark bg-on-dark"
                ><span class="text-bold text-caption">18</span></q-badge
              ><span class="text-bold text-caption text-on-dark-1"
                >فاکتورها</span
              >
            </div>
            <div class="text-h6 text-bold text-on-dark q-gutter-xs">
              240,000,000<span class="text-body1 text-bold text-on-dark-1"
                >ریال</span
              >
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col">
        <q-card class="info-box no-shadow bordered-1">
          <q-card-section class="q-gutter-md">
            <div class="">
              <q-badge rounded class="q-px-sm q-mr-sm text-on-dark bg-on-dark"
                ><span class="text-bold text-caption">0</span></q-badge
              ><span class="text-bold text-caption text-on-dark-1"
                >مانده حساب</span
              >
            </div>
            <div class="text-h6 text-bold text-on-dark q-gutter-xs">
              0<span class="text-body1 text-bold text-on-dark-1">ریال</span>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col">
        <q-card class="info-box no-shadow bordered-1">
          <q-card-section class="q-gutter-md">
            <div class="">
              <q-badge rounded class="q-px-sm q-mr-sm text-on-dark bg-on-dark"
                ><span class="text-bold text-caption">4</span></q-badge
              ><span class="text-bold text-caption text-on-dark-1">بدهکار</span>
            </div>
            <div class="text-h6 text-bold text-on-dark q-gutter-xs">
              2,000,000<span
                class="text-body1 text-bold text-on-dark-1 q-gutter-xs"
                >ریال</span
              >
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col">
        <q-card class="info-box no-shadow bordered-1">
          <q-card-section class="q-gutter-md">
            <div class="">
              <q-badge rounded class="q-px-sm q-mr-sm text-on-dark bg-on-dark"
                ><span class="text-bold text-caption">9</span></q-badge
              ><span class="text-bold text-caption text-on-dark-1"
                >بستانکار</span
              >
            </div>
            <div class="text-h6 text-bold text-on-dark q-gutter-xs">
              158,300,020<span class="text-body1 text-bold text-on-dark-1"
                >ریال</span
              >
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <invoice />
  </div>
</template>

<script setup>
import { ref } from "vue";
</script>
