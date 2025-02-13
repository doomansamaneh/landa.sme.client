<template>
  <div class="text-h6 text-center q-mb-sm">
    {{ title }}
  </div>

  <table class="print-preview-table">
    <thead>
      <tr>
        <th colspan="2">{{ sectionTitle }}</th>
      </tr>
    </thead>

    <tbody>
      <template v-for="item in currentList" :key="item.id">
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

      <tr>
        <td class="text-bold">جمع بدهی</td>
        <td class="text-bold" style="width: 20%">
          {{ helper.formatNumber(totalCL + totalFL) }}
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

  const currentList = computed(() =>
    props.model.reviewItems.filter(
      (item) => item.clId === accountCLType.currentLiability
    )
  );

  const longTermList = computed(() =>
    props.model.reviewItems.filter(
      (item) => item.clId === accountCLType.longTermLiability
    )
  );

  const totalCL = computed(() =>
    currentList.value.reduce(
      (sum, item) => sum + item.creditRemained - item.debitRemained,
      0
    )
  );

  const totalFL = computed(() =>
    longTermList.value.reduce(
      (sum, item) => sum + item.creditRemained - item.debitRemained,
      0
    )
  );
</script>
