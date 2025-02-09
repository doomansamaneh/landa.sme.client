<template>
  <q-markup-table
    class="create-form-table"
    bordered
    flat
    dense
    separator="horizontal"
  >
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
                class="green-gradient"
              />
            </div>
            <div>کالاهای تولید شده</div>
          </div>
        </th>
      </tr>
      <tr>
        <th style="width: 1px">#</th>
        <th>کالا</th>
        <th>واحد سنجش</th>
        <th style="width: 20%">تعداد/مقدار</th>
        <th style="width: 20%">قیمت نسبی فی</th>
        <th style="width: 10%"></th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, index) in model?.items"
        :key="index"
        class="q-pa-md"
      >
        <td class="text-center">{{ index + 1 }}</td>
        <td>
          <product-lookup
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
        <td>
          <custom-input-number
            v-model="row.price"
            placeholder="قیمت فی"
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
            @click="formStore.deleteItem(index)"
          >
            <q-icon size="24px" name="o_delete" />
          </q-btn>
        </td>
      </tr>
    </tbody>
    <tbody v-if="model?.items?.length === 0">
      <tr>
        <td colspan="100%" class="text-center">
          <q-btn
            class="q-my-xl primary-shadow"
            rounded
            unelevated
            color="primary"
            @click="formStore.pushNewItem()"
          >
            <q-icon name="o_add" size="20px" class="q-mr-xs" />
            افزودن ردیف
          </q-btn>
        </td>
      </tr>
    </tbody>
  </q-markup-table>

  <q-btn
    v-if="model?.items?.length > 0"
    padding="4px 12px"
    unelevated
    rounded
    dense
    class="bg-primary primary-shadow text-white q-my-md"
    @click="formStore.addNewItem(index, row)"
  >
    <q-icon size="20px" name="o_add" class="q-mr-xs" />
    <div class="no-letter-spacing">افزودن ردیف</div>
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
