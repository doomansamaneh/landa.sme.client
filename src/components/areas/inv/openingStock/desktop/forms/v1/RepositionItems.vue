<template>
  <div class="q-py-md q-gutter-md">
    <q-btn
      class="primary-shadow"
      rounded
      unelevated
      color="primary"
      @click="formStore.addAllProducts()"
    >
      <q-icon name="o_add" size="20px" class="q-mr-xs" />
      افزودن همه کالاها
    </q-btn>

    <q-btn
      v-if="model?.repositionItems?.length"
      color="red"
      class="text-on-dark"
      rounded
      unelevated
      @click="formStore.deleteAllProducts()"
    >
      <q-icon name="o_delete" size="20px" class="q-mr-xs" />
      حذف همه
    </q-btn>
  </div>

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
            color="primary"
            unelevated
            round
            class="text-on-dark"
            size="sm"
            icon="o_add"
            @click="formStore.addNewRow(index, row)"
          />
          <q-btn
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
          <q-btn
            class="q-my-xl primary-shadow"
            rounded
            unelevated
            color="primary"
            @click="formStore.pushNewRow()"
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

  import ProductLookup from "src/components/shared/lookups/ProductLookup.vue";
  import CustomInputNumber from "src/components/shared/forms/CustomInputNumber.vue";

  const props = defineProps({
    formStore: Object,
  });

  const model = computed(() => props.formStore.model.value);

  const productFilter = null;
</script>
