<template>
  <q-markup-table
    class="q-pa-md-"
    bordered
    flat
    dense
    separator="horizontal"
  >
    <thead>
      <tr>
        <th style="width: 1px">#</th>
        <th>کالا</th>
        <th style="width: 110px">تعداد/مقدار</th>
        <th style="width: 150px">مبلغ واحد</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, index) in model?.repositionItems"
        :key="index"
        class="q-pa-md"
      >
        <td class="text-center">{{ index + 1 }}</td>
        <td>
          <product-lookup
            class="first"
            autofocus
            placeholder="کالا"
            v-model:selectedId="row.productId"
            v-model:selectedText="row.productTitle"
            :filterExpression="productFilter"
          />
        </td>
        <td>
          <custom-input-number
            v-model="row.quantity"
            placeholder="تعداد/مقدار"
          />
        </td>
        <td>
          <custom-input-number
            v-model="row.price"
            placeholder="مبلغ واحد"
          />
        </td>
        <td class="text-center q-gutter-x-sm">
          <q-btn
            no-caps
            color="primary"
            unelevated
            round
            class="text-on-dark"
            size="sm"
            icon="o_add"
            @click="formStore.addNewRow(index, row)"
          />
          <q-btn
            no-caps
            color="red"
            unelevated
            round
            class="text-on-dark"
            size="sm"
            icon="o_delete"
            @click="formStore.deleteRow(index)"
          />
        </td>
      </tr>
    </tbody>
    <tbody v-if="model?.repositionItems?.length === 0">
      <tr>
        <td colspan="100%" class="text-center">
          <no-data-found />
        </td>
      </tr>
    </tbody>
  </q-markup-table>
</template>

<script setup>
  import { computed } from "vue";

  import NoDataFound from "src/components/shared/dataTables/NoDataFound.vue";
  import ProductLookup from "src/components/shared/lookups/ProductLookup.vue";
  import CustomInputNumber from "src/components/shared/forms/CustomInputNumber.vue";

  const props = defineProps({
    formStore: Object,
  });

  const model = computed(() => props.formStore.model.value);

  const productFilter = null;
</script>
