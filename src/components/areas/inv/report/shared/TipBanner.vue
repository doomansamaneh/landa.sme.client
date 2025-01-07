<template>
  <tip-banner class="q-mb-md" :tip="tip" closeable />
</template>

<script setup>
  import TipBanner from "src/components/shared/TipBanner.vue";

  const tip =
    "موجودی کالاهایی که نوعشان خدمت نباشد براساس خرید و فروشهای نهایی شده. فقط خریدهایی در موجودی تاثیر میگذارند که نوعشان شارژ انبار و یا مشابه آن باشد";
</script>
