<template>
  <div class="text-body1 text-center text-bold q-mb-sm">
    {{ title }}
  </div>

  <table v-if="totalCA !== 0" class="balance-sheet-preview-table">
    <thead>
      <tr>
        <th colspan="2">داراییهای جاری</th>
      </tr>
    </thead>

    <tbody>
      <template v-for="item in currentAssets" :key="item.id">
        <tr>
          <td>{{ item.glCode }} - {{ item.glTitle }}</td>
          <td style="width: 20%">
            {{
              helper.formatNumber(
                item.debitRemained - item.creditRemained
              )
            }}
          </td>
        </tr>
      </template>
    </tbody>
  </table>

  <table v-if="totalFA !== 0" class="balance-sheet-preview-table">
    <thead>
      <tr>
        <th colspan="2">داراییهای ثابت</th>
      </tr>
    </thead>

    <tbody>
      <template v-for="item in fixedAssets" :key="item.id">
        <tr>
          <td>{{ item.glCode }} - {{ item.glTitle }}</td>
          <td style="width: 20%">
            {{
              helper.formatNumber(
                item.debitRemained - item.creditRemained
              )
            }}
          </td>
        </tr>
      </template>
    </tbody>
  </table>

  <table class="balance-sheet-preview-table">
    <tbody>
      <tr>
        <td class="text-bold">جمع کل</td>
        <td class="text-bold" style="width: 20%">
          {{ helper.formatNumber(totalCA + totalFA) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
  import { computed } from "vue";
  import { helper } from "src/helpers";
  import { accountCLType } from "src/constants";

  const props = defineProps({
    model: Object,
    assetType: String,
    title: String,
  });

  const currentAssets = computed(
    () =>
      props.model?.reviewItems?.filter(
        (item) => item.clId === accountCLType[props.assetType]
      ) || []
  );

  const fixedAssets = computed(() =>
    props.model.reviewItems.filter(
      (item) => item.clId === accountCLType.fixedAsset
    )
  );

  const totalCA = computed(() =>
    currentAssets.value.reduce(
      (sum, item) => sum + item.debitRemained - item.creditRemained,
      0
    )
  );

  const totalFA = computed(() =>
    fixedAssets.value.reduce(
      (sum, item) => sum + item.debitRemained - item.creditRemained,
      0
    )
  );
</script>

<style lang="scss">
  .balance-sheet-preview-table {
    width: 100%;
    border-collapse: collapse;
  }
  .balance-sheet-preview-table th,
  .balance-sheet-preview-table td {
    border: none;
    padding: 5px;
    text-align: start;
  }
  .balance-sheet-preview-table th {
    background-color: #f2f2f2;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
</style>
