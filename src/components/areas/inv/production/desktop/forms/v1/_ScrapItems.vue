<template>
  <q-markup-table bordered flat dense separator="horizontal">
    <thead>
      <tr>
        <th colspan="100%">
          <div
            class="row q-gutter-sm text-body1 no-letter-spacing text-weight-700"
          >
            <div>
              <q-btn
                round
                unelevated
                dense
                size="5px"
                class="orange-gradient"
              />
            </div>
            <div>ضایعات</div>
          </div>
        </th>
      </tr>
      <tr>
        <th style="width: 1px">#</th>
        <th>کالا</th>
        <th>واحد سنجش</th>
        <th style="width: 180px">تعداد/مقدار</th>
        <th style="width: 180px">قیمت فی</th>
        <th style="width: 1px"></th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, index) in model?.scrapItems"
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
            @rowSelected="productChanged($event, row)"
          />
        </td>
        <td>
          <product-unit-lookup
            placeholder="واحد سنجش"
            v-model:selectedId="row.productUnitId"
            v-model:selectedText="row.productUnitTitle"
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
            placeholder="قیمت فی"
          />
        </td>
        <td class="text-center q-gutter-x-sm">
          <q-btn
            color="primary"
            unelevated
            round
            class="text-on-dark"
            size="sm"
            icon="o_add"
            @click="formStore.addNewScrapItem(index, row)"
          />
          <q-btn
            color="red"
            unelevated
            round
            class="text-on-dark"
            size="sm"
            icon="o_delete"
            @click="formStore.deleteScrapItem(index)"
          />
        </td>
      </tr>
    </tbody>
    <tbody v-if="model?.scrapItems?.length === 0">
      <tr>
        <td colspan="100%" class="text-center">
          <q-btn
            class="q-my-xl primary-shadow"
            rounded
            unelevated
            color="primary"
            @click="formStore.pushNewScrapItem()"
          >
            <q-icon name="o_add" size="20px" class="q-mr-xs" />
            افزودن ردیف
          </q-btn>
        </td>
      </tr>
    </tbody>
  </q-markup-table>
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
