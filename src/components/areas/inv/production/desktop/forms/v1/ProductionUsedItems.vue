<template>
  <q-markup-table
    class="q-markup-table--impacted"
    bordered
    flat
    dense
    separator="horizontal"
  >
    <thead>
      <tr>
        <th colspan="100%">
          <div class="row q-gutter-sm text-body1 text-weight-700">
            <div>
              <q-btn
                round
                unelevated
                dense
                size="5px"
                class="primary-gradient"
              />
            </div>
            <div>کالاهای استفاده شده</div>
          </div>
        </th>
      </tr>
      <tr>
        <th style="width: 1px">#</th>
        <th style="width: 40%">کالا</th>
        <th style="width: 25%">واحد سنجش</th>
        <th style="width: 25%">تعداد/مقدار</th>
        <th style="width: 10%"></th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, index) in model?.usedItems"
        :key="index"
        class="q-pa-md"
      >
        <td class="text-center">{{ index + 1 }}</td>
        <td>
          <product-lookup
            class="first"
            v-model:selectedId="row.productId"
            v-model:selectedText="row.productTitle"
            :filterExpression="productFilter"
            placeholder="کالا"
            required
            @rowSelected="productChanged($event, row)"
          />
        </td>
        <td>
          <product-unit-lookup
            v-model:selectedId="row.productUnitId"
            v-model:selectedText="row.productUnitTitle"
            placeholder="واحد سنجش"
            required
          />
        </td>
        <td>
          <custom-input-number
            v-model="row.quantity"
            placeholder="تعداد/مقدار"
            required
          />
        </td>
        <td class="text-center">
          <q-btn
            unelevated
            round
            dense
            class="text-on-dark"
            size="14px"
            @click="formStore.deleteUsedItem(index)"
          >
            <q-icon size="24px" name="o_delete" />
          </q-btn>
        </td>
      </tr>
    </tbody>
    <tbody v-if="model?.usedItems?.length === 0">
      <tr>
        <td colspan="100%" class="text-center">
          <q-btn
            class="q-my-xl primary-shadow"
            rounded
            unelevated
            color="primary"
            @click="formStore.pushNewUsedItem()"
          >
            <q-icon name="o_add" size="20px" class="q-mr-xs" />
            افزودن ردیف
          </q-btn>
        </td>
      </tr>
    </tbody>
  </q-markup-table>

  <q-btn
    v-if="model?.usedItems.length > 0"
    padding="4px 12px"
    unelevated
    rounded
    dense
    class="bg-primary primary-shadow text-white q-my-md"
    @click="formStore.addNewUsedItem(index)"
  >
    <q-icon size="20px" name="o_add" class="q-mr-xs" />
    <div class="">افزودن ردیف</div>
  </q-btn>
</template>

<script setup>
  import { computed } from "vue";
  import { productType, sqlOperator } from "src/constants";

  import ProductLookup from "src/components/shared/lookups/ProductLookup.vue";
  import ProductUnitLookup from "src/components/shared/lookups/ProductUnitLookup.vue";
  import CustomInputNumber from "src/components/shared/forms/CustomInputNumber.vue";

  const props = defineProps({
    formStore: Object,
  });

  const model = computed(() => props.formStore.model.value);
  const productChanged = (product, row) => {
    //row.price = product?.price ?? 0;
    row.productUnitId = product?.productUnitId ?? null;
    row.productUnitTitle = product?.productUnitTitle ?? null;
  };

  const productFilter = [
    {
      fieldName: "typeId",
      operator: sqlOperator.notEqual,
      value: productType.service,
    },
  ];
</script>
