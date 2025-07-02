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
            @click="formStore.addNewItem(index, item)"
          >
            <q-icon size="22px" name="o_add" />
          </q-btn>

          <q-btn
            no-caps
            size="11px"
            round
            flat
            @click="formStore.deleteItem(index)"
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
          <q-item-label caption class="q-mb-sm">
            سرفصل هزینه
          </q-item-label>
          <sl-lookup
            :autofocus="index === formStore.newAddedItemIndex.value"
            v-model:selectedId="billItem.slId"
            v-model:selectedText="billItem.slTitle"
            :filterExpression="slFilter"
            hide-bottom-space
          />
        </div>
        <div class="col-md-2 col-sm-3 col-xs-12">
          <q-item-label caption class="q-mb-sm">شرح</q-item-label>
          <custom-input
            v-model="billItem.comment"
            type="textarea"
            autogrow
            hide-bottom-space
          />
        </div>
        <div class="col-md-2 col-sm-3 col-xs-12">
          <q-item-label caption class="q-mb-sm">مبلغ</q-item-label>
          <custom-input-number
            v-model="billItem.amount"
            placeholder="مبلغ"
          />
        </div>
        <div class="col-md-2 col-sm-4 col-xs-12">
          <q-item-label caption class="q-mb-sm">
            ارزش افزوده
          </q-item-label>
          <vat-lookup
            v-model:selectedId="billItem.vatId"
            v-model:selectedText="billItem.vatTitle"
            :filterExpression="vatFilter"
            @rowSelected="vatChanged($event)"
            hide-bottom-space
          />
        </div>
        <div class="col-md-2 col-sm-4 col-xs-12">
          <q-item-label caption class="q-mb-sm">
            مبلغ مالیات
          </q-item-label>
          <custom-input-number
            v-model="billItem.vatAmount"
            hide-bottom-space
          />
        </div>
        <div class="col-md-2 col-sm-4 col-xs-12">
          <q-item-label caption class="q-mb-sm">جمع کل</q-item-label>
          <q-field outlined dense disable>
            <template v-slot:control>
              <div
                class="self-center full-width no-outline"
                tabindex="0"
              >
                {{ helper.formatNumber(billItem.total) }}
              </div>
            </template>
          </q-field>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { computed } from "vue";
  import { helper } from "src/helpers";
  import { sqlOperator, vatType, closeAccounts } from "src/constants";

  import SlLookup from "src/components/shared/lookups/AccountSLLookup.vue";
  import VatLookup from "src/components/shared/lookups/VatLookup.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import CustomInputNumber from "src/components/shared/forms/CustomInputNumber.vue";

  const props = defineProps({
    item: Object,
    index: Number,
    formStore: Object,
  });

  const slFilter = [
    {
      fieldName: "clId",
      operator: sqlOperator.equal,
      value: closeAccounts.expense,
    },
  ];

  const vatFilter = [
    {
      fieldName: "isForSale",
      operator: sqlOperator.in,
      value: `${vatType.purchase},${vatType.purchaseAndSale}`,
    },
  ];

  const vatChanged = (vat) => {
    billItem.value.vatPercent = vat?.rate ?? 0;
  };

  const billItem = computed(() => props.item);
</script>
