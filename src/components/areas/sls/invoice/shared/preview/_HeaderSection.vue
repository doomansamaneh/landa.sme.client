<template>
  <div class="row q-gutter-y-md q-py-md">
    <div
      class="col-md col-sm col-xs-12 items-center"
      :class="$q.screen.lt.sm ? 'justify-center' : ''"
    >
      <img style="width: 72px" src="/landa-sme-logo.png" alt="landa-sme" />
    </div>
    <div class="col-md col-sm-5 col-xs-12 items-center justify-center">
      <span class="text-subtitle1 text-bold">
        {{ $t("page.payment-detail.invoice-label") }}
      </span>
    </div>
    <div
      class="col-md col-sm col-xs-12 row items-center"
      :class="$q.screen.lt.sm ? 'justify-center' : 'justify-end'"
    >
      <div class="column q-gutter-sm text-right text-caption">
        <div
          class="row items-center"
          :class="$q.screen.lt.sm ? 'justify-center' : 'justify-end'"
        >
          <span>
            {{ $t("page.payment-detail.invoice-number") }}
          </span>
          {{ model.value.no }}
        </div>

        <div
          class="row items-center"
          :class="$q.screen.lt.sm ? 'justify-center' : 'justify-start'"
        >
          <span>{{ $t("page.payment-detail.invoice-date") }}</span>
          {{ model.value.date.substring(0, 10) }}
        </div>
      </div>
    </div>
  </div>

  <q-markup-table separator="cell" flat bordered dense>
    <tbody>
      <tr class="bg-grey-3 text-center">
        <td colspan="4">
          <h6>فروشنده</h6>
        </td>
      </tr>
      <tr>
        <td>نام: <strong>حسابداری لاندا</strong></td>
        <td style="width: 15%">شماره ثبت: 390303</td>
        <td style="width: 15%">شماره اقتصادی: 10320412724</td>
        <td style="width: 15%">شناسه ملی: 10320412724</td>
      </tr>
      <tr>
        <td colspan="2">
          نشانی: <strong>تهران</strong>
          شهر جدید اندیشه، شهرک صدف، خ دکتر قریب، مجتمع اداری زیتون، طبقه 2،
          واحد 13
        </td>
        <td style="width: 15%">کد پستی: 390303</td>
        <td style="width: 15%">تلفن: 88944338</td>
      </tr>
    </tbody>
  </q-markup-table>

  <q-markup-table separator="cell" flat bordered dense>
    <tbody>
      <tr class="bg-grey-3 text-center">
        <td colspan="4">
          <h6>خریدار</h6>
        </td>
      </tr>
      <tr>
        <td>
          نام: <strong>{{ model.value.customerName }}</strong>
        </td>
        <td style="width: 15%">شماره ثبت: 390303</td>
        <td style="width: 15%">شماره اقتصادی: 10320412724</td>
        <td style="width: 15%">شناسه ملی: 10320412724</td>
      </tr>
      <tr>
        <td colspan="2">
          نشانی: <strong>تهران</strong>
          شهر جدید اندیشه، شهرک صدف، خ دکتر قریب، مجتمع اداری زیتون، طبقه 2،
          واحد 13
        </td>
        <td style="width: 15%">کد پستی: 390303</td>
        <td style="width: 15%">تلفن: 88944338</td>
      </tr>
    </tbody>
  </q-markup-table>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  model: Object,
});
</script>

<style lang="scss" scoped>
.sme-logo {
  width: 72px;
}

.sign-place {
  width: 50%;
  padding-bottom: 120px;
}
</style>
