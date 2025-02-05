<template>
  <div class="text-h6 no-letter-spacing text-center q-mb-sm">
    {{ title }}
  </div>
  <table class="print-preview-table">
    <thead>
      <tr>
        <th colspan="2">{{ sectionTitle }}</th>
      </tr>
    </thead>

    <tbody>
      <template v-for="item in currentAssets" :key="item.id">
        <tr>
          <td>{{ item.glCode }} - {{ item.glTitle }}</td>
          <td>
            {{
              helper.formatNumber(
                item.debitRemained - item.creditRemained
              )
            }}
          </td>
        </tr>
      </template>

      <tr>
        <td class="text-bold">جمع کل</td>
        <td class="text-bold">
          {{ helper.formatNumber(totalCA) }}
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
    sectionTitle: String,
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
  .print-preview-table {
    width: 100%;
    border-collapse: collapse;
  }
  .print-preview-table th,
  .print-preview-table td {
    border: 1px solid black;
    padding: 5px;
    text-align: start;
  }
  .print-preview-table th {
    background-color: #f2f2f2;
  }
</style>
