<template>
  <div class="full-width">
    <!-- <div style="width: 150px" class="q-mb-sm text-body2 no-letter-spacing">
      پرکاربردترین عملیات‌ها:
    </div> -->
    <div class="col-md">
      <q-scroll-area
        :horizontal-bar-style="helper.horizontalThumbStyle"
        :horizontal-thumb-style="helper.horizontalBarStyle"
        style="height: 34px"
      >
        <div class="row items-center q-gutter-sm no-wrap">
          <q-btn
            :to="item.to"
            unelevated
            v-for="item in items"
            :key="item.name"
            class="desktop-toolbar-gradient text-on-dark q-py-xs q-px-sm text-center text-body3 no-letter-spacing bordered border-radius-lg"
            style="white-space: nowrap"
          >
            {{ $t(`shared.labels.${item.name}`) }}
          </q-btn>
        </div>
      </q-scroll-area>
    </div>
  </div>
</template>

<script setup>
  import { helper } from "src/helpers";

  const items = [
    {
      name: "invoice",
      icon: "",
      to: "/sls/invoice/createV2",
    },
    {
      name: "receipt",
      icon: "",
      to: "/trs/receipt/create",
    },
    {
      name: "payment",
      icon: "",
      to: "/trs/payment/create",
    },
    {
      name: "quote",
      icon: "",
      to: "/sls/quote/createV2",
    },
  ];
</script>
