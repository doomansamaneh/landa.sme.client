<template>
  <tool-bar>
    <template #header>
      <q-badge
        v-if="tableStore?.pagination.value.totalItems > 0"
        rounded
        outline
        :label="tableStore?.pagination.value.totalItems"
        class="q-mr-sm bg-dark text-on-dark text-body2"
      />
      <span class="no-letter-spacing" :class="$q.screen.gt.sm ? 'text-h6' : 'text-body2'">ایجاد فاکتور فروش</span>
      <q-btn
        padding="6px 12px"
        flat
        @click="$router.go(-1)"
      >
        <q-icon
          name="arrow_back"
          size="sm"
        />
      </q-btn>
    </template>
    <template #buttons>
      <q-btn
        class="bg-primary text-white text-body2"
        padding="6px 12px"
        rounded
        no-caps
        unelevated
      >
        {{ $t("shared.labels.save") }}
      </q-btn>
      <q-btn
        class="bordered-btn_bg-dark text-body2"
        rounded
        unelevated
      >
        {{ $t("shared.labels.more") }}

        <q-menu
          fit
          :offset="[0, 10]"
        >
          <q-list
            dense
            padding
            style="width:200px"
          >
            <q-item
              clickable
              v-close-popup
              tabindex="0"
            >
              <div class="q-py-sm">
                <q-item-section avatar>
                  <q-avatar
                    class="bg-on-dark"
                    size="sm"
                  ><q-icon
                      name="o_refresh"
                      size="14px"
                    /></q-avatar>
                </q-item-section>
              </div>
              <q-item-section>
                <div class="text-caption">تازه‌سازی</div>
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item
              clickable
              v-close-popup
              tabindex="0"
            >
              <div class="q-py-sm">
                <q-item-section avatar>
                  <q-avatar
                    class="bg-on-dark"
                    size="sm"
                  ><q-icon
                      name="o_close"
                      size="14px"
                    /></q-avatar>
                </q-item-section>
              </div>
              <q-item-section>
                <div class="text-caption">غیر‌فعال‌سازی</div>
              </q-item-section>
            </q-item>
            <q-item
              clickable
              v-close-popup
              tabindex="0"
            >
              <div class="q-py-sm">
                <q-item-section avatar>
                  <q-avatar
                    class="bg-on-dark"
                    size="sm"
                  ><q-icon
                      name="o_check"
                      size="14px"
                    /></q-avatar>
                </q-item-section>
              </div>
              <q-item-section>
                <div class="text-caption">فعال سازی</div>
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item
              clickable
              v-close-popup
              tabindex="0"
            >
              <div class="q-py-sm">
                <q-item-section avatar>
                  <q-avatar
                    class="bg-on-dark"
                    size="sm"
                  ><q-icon
                      name="o_download"
                      size="16px"
                    /></q-avatar>
                </q-item-section>
              </div>
              <q-item-section>
                <div class="text-caption">تبدیل به اکسل</div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>

      </q-btn>
    </template>
  </tool-bar>
  <div
    class="column q-gutter-lg q-mt-xl"
    v-for="(row, index) in rows"
    :key="index"
  >
    <div>
      <q-item-label
        caption
        class="q-mb-sm"
      >کالا و خدمت</q-item-label>
      <q-input
        outlined
        dense
        placeholder="انتخاب کالا و خدمات"
      >
        <template #append>
          <q-btn
            to="/sls/invoice/create/selectproduct/productlookup"
            round
            dense
            icon="o_expand_more"
          />
        </template>
      </q-input>
    </div>

    <div>
      <q-item-label
        caption
        class="q-mb-sm"
      >تعداد و مقدار</q-item-label>
      <q-input
        dense
        outlined
        v-model="row.quantity"
      />
    </div>

    <div>
      <q-item-label
        caption
        class="q-mb-sm"
      >واحد سنجش</q-item-label>
      <product-unit-lookup paceholder="واحد سنجش" />
    </div>

    <div>
      <q-item-label
        caption
        class="q-mb-sm"
      >مبلغ</q-item-label>
      <q-input
        dense
        outlined
        v-model="row.amount"
      />
    </div>

    <div>
      <q-item-label
        caption
        class="q-mb-sm"
      >مالیات بر ارزش افزوده</q-item-label>
      <vat-lookup placeholder="مالیات بر ارزش افزوده" />
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import ToolBar from "src/components/shared/ToolBar.vue"
import ProductLookup from "src/components/shared/Lookups/ProductLookup.vue"
import ProductUnitLookup from "src/components/shared/Lookups/ProductUnitLookup.vue"
import VatLookup from "src/components/shared/Lookups/VatLookup.vue"

const discountIsCash = ref(true)
const generalDiscount = ref(true)
const vatIsCash = ref(true)
const quantity = ref(1)
const showMoreDetail = ref(false)
const generalDiscountValue = 0

const rows = ref([
  {
    prdLookupRef: null,
    product: '',
    quantity: 0,
    unit: '',
    amount: 0,
    vat: 0,
    rowDiscount: 0,
    description: '',
  },
])

const addRow = (index) => {
  const newRow = {
    prdLookupRef: null,
    product: '',
    quantity: 0,
    unit: '',
    amount: 0,
    vat: 0,
    rowDiscount: 0,
    description: '',
  };
  rows.value.splice(index + 1, 0, newRow);
};

const deleteRow = (index) => {
  rows.value.splice(index, 1);
};

const toggleDetail = () => {
  showMoreDetail.value = !showMoreDetail.value
};

const rowAmount = computed(() => {
  return rows.value.reduce((amount, row) => amount + (Number(row.quantity) * Number(row.amount)), 0);
});

const rowDiscount = computed(() => {
  return rows.value.reduce((discount, row) => discount + Number(row.rowDiscount), 0);
});

const rowVat = computed(() => {
  return rows.value.reduce((vat, row) => vat + Number(row.vat), 0);
});

const rowTotalAmount = (row) =>
  Number(row.quantity) * Number(row.amount) - Number(row.rowDiscount) + Number(row.vat);

const totalAmount = computed(() => {
  return rows.value.reduce((total, row) => total + (Number(row.quantity) * Number(row.amount) - (Number(row.rowDiscount)) - Number(generalDiscountValue)) + Number(row.vat), 0);
});

const getProductRef = (index) => {
  return (el) => {
    rows.value[index].prdLookupRef = el;
  };
};

const confirmGeneralDiscount = () => {
  const newValue = 'Confirmed';

  generalDiscountValue = newValue;
}

</script>

<style lang="scss" scoped>
.q-item__label--caption {
  font-size: 14px;
  letter-spacing: 0;
  color: #697588;
}
</style>
