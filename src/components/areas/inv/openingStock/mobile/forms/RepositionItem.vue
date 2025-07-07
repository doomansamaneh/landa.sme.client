<template>
  <q-card flat bordered class="form-container">
    <q-card-section>
      <div class="row items-center no-wrap">
        <div class="col">
          <div class="row items-center text-bold text-body1">
            <q-btn
              no-caps
              unelevated
              size="8px"
              class="bg-primary text-white q-mr-sm text-caption-sm no-pointer-events"
              round
            >
              <span class="text-body2">
                {{ index + 1 }}
              </span>
            </q-btn>
          </div>
        </div>

        <div class="q-gutter-sm col-auto">
          <q-btn
            no-caps
            size="11px"
            round
            flat
            @click="formStore.addNewRow(index, item)"
          >
            <q-icon size="22px" name="o_add" />
          </q-btn>

          <q-btn
            no-caps
            size="11px"
            round
            flat
            @click="formStore.deleteRow(index)"
          >
            <q-icon size="22px" name="o_delete" />
          </q-btn>
        </div>
      </div>
    </q-card-section>

    <q-separator size="1px" />

    <q-card-section>
      <div class="row q-col-gutter-md">
        <div class="col-md-4 col-sm-6 col-xs-12">
          <product-lookup
            label="کالا"
            v-model:selectedId="billItem.productId"
            v-model:selectedText="billItem.productTitle"
            :filterExpression="productFilter"
            hide-bottom-space
          />
        </div>
        <div class="col-md-2 col-sm-3 col-xs-12">
          <custom-input-number
            label="تعداد/مقدار"
            v-model="billItem.quantity"
          />
        </div>
        <div class="col-md-2 col-sm-4 col-xs-12">
          <custom-input-number
            label="مبلغ واحد (ارزش خرید)"
            v-model="billItem.price"
            hide-bottom-space
          />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { computed } from "vue";
  import { sqlOperator } from "src/constants";

  import ProductLookup from "src/components/shared/lookups/ProductLookup.vue";
  import CustomInputNumber from "src/components/shared/forms/CustomInputNumber.vue";

  const props = defineProps({
    item: Object,
    index: Number,
    formStore: Object,
  });

  const productFilter = null;

  // const vatFilter = [
  //   {
  //     fieldName: "isForSale",
  //     operator: sqlOperator.in,
  //     value: `${vatType.purchase},${vatType.purchaseAndSale}`,
  //   },
  // ];

  const billItem = computed(() => props.item);
</script>
