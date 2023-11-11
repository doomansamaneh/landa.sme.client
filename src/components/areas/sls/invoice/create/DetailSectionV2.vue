<template>
  <div class="row q-gutter-x-md text-bold q-mb-sm">
    <div style="width: 25% ;">کالا/خدمت</div>
    <div style="width: 9%;">تعداد/مقدار</div>
    <div style="width: 10%;">واحد سنجش</div>
    <div style="width: 10%;">مبلغ</div>
    <div style="width: 15%;">مالیات بر ارزش افزوده</div>
    <div class="col row justify-end items-center q-gutter-x-xs">مبلغ کل
      <q-icon
        name="o_info"
        size="xs"
        color="primary"
        class="cursor-pointer"
      >
        <q-tooltip
          :delay="600"
          class="custom-tooltip"
          anchor="top right"
          self="bottom middle"
          :offset="[50, 10]"
        >
          <span class="text-body2">مبلغ کل = (تعداد * مبلغ) - تخفیف + مالیات بر ارزش افزوده</span>
        </q-tooltip>
      </q-icon>
    </div>
    <div class="col-1 row justify-end"></div>
  </div>
  <q-separator class="q-mb-md" />
  <div class="column q-gutter-y-md">
    <div
      v-for="(row, index) in rows"
      :key="index"
    >

      <div class="row q-gutter-md">

        <div style="width: 25%;">
          <product-lookup placeholder="انتخاب کالا/خدمت" />
        </div>
        <div style="width: 9%;">
          <q-input
            dense
            outlined
            v-model="row.quantity"
          />
        </div>
        <div style="width: 10%;">
          <product-unit-lookup paceholder="واحد سنجش" />
        </div>
        <div style="width: 10%;">
          <q-input
            dense
            outlined
            v-model="row.amount"
          />
        </div>
        <div style="width: 15%;">
          <vat-lookup placeholder="مالیات بر ارزش افزوده" />
        </div>

        <div class="col row items-center justify-end">
          <div>{{ rowTotalAmount(row) }} <span class="text-caption"> ریال</span></div>
        </div>
        <div class="col-1 row items-center justify-end q-gutter-x-sm">
          <q-btn
            unelevated
            round
            class="text-on-dark"
            size="sm"
            @click="deleteRow(index)"
          >

          <q-icon name="o_delete" size="20px"/>

          </q-btn>
          <!-- v-if="rows.length > 1" -->
        </div>
      </div>
      <div
        v-if="showMoreDetail"
        class="row q-gutter-md q-pt-md"
      >

        <div style="width: 25%;">
          <q-item-label
            caption
            class="q-mb-sm"
          >شرح تکمیلی کالا</q-item-label>
          <q-input
            v-model="row.description"
            outlined
            type="textarea"
            autogrow
          />
        </div>

        <div style="width: 7%;">

        </div>

        <div style="width: 10%;">

        </div>

        <div style="width: 10%;">
          <q-item-label
            caption
            class="q-mb-sm"
          >تخفیف</q-item-label>
          <q-input
            dense
            outlined
            v-model="row.rowDiscount"
          >
            <template v-slot:append>
              <q-btn
                size="xs"
                :icon="discountIsCash ? 'attach_money' : 'o_percent'"
                class="cursor-pointer"
                color="primary"
                round
                outline
                @click="discountIsCash = !discountIsCash"
              />
            </template>
          </q-input>
        </div>

        <div style="width: 15%;">
          <q-item-label
            caption
            class="q-mb-sm"
          >مبلغ ارزش افزوده</q-item-label>
          <q-input
            dense
            outlined
            v-model="row.vat"
          >
            <template v-slot:append>
              <q-btn
                size="xs"
                :icon="discountIsCash ? 'attach_money' : 'o_percent'"
                class="cursor-pointer"
                color="primary"
                round
                outline
                @click="discountIsCash = !discountIsCash"
              />
            </template>
          </q-input>
        </div>

      </div>
    </div>
  </div>

  <q-separator class="q-mt-md" />

  <div class="clear-fix row q-my-xl">

    <div class="col-8"></div>
    <div class="col-3 q-gutter-y-md">
      <div class="row q-mr-md">
        <div class="col">مبلغ</div>
        <div>{{ rowAmount }} <span class="text-caption"> ریال</span></div>
      </div>

      <div class="row q-mr-md">
        <div class="col row q-gutter-sm items-center">
          <q-btn
            outline
            round
            icon="o_add"
            size="xs"
            @click="generalDiscount = true"
          >
            <q-tooltip
              anchor="center left"
              self="center right"
              :offset="[10, 10]"
              class="text-body2 q-px-sm custom-tooltip"
              :delay="600"
            >
              ایجاد تخفیف
            </q-tooltip>

            <q-menu
              anchor="bottom right"
              self="bottom left"
              :offset="[10, 8]"
            >
              <q-input
                outlined
                dense
                v-model="generalDiscountValue"
              >

                <template #append>
                  <q-btn
                    size="xs"
                    :icon="generalDiscount ? 'attach_money' : 'o_percent'"
                    class="cursor-pointer"
                    color="primary"
                    round
                    outline
                    @click="generalDiscount = !generalDiscount"
                  />
                </template>

              </q-input>
            </q-menu>

          </q-btn>

          <span>تخفیف</span>

        </div>
        <div><span class="text-red">({{ rowDiscount }})</span> <span class="text-red text-caption"> ریال</span></div>
      </div>

      <div class="row q-mr-md">
        <div class="col">ارزش افزوده</div>
        <div>{{ rowVat }} <span class="text-caption"> ریال</span></div>
      </div>

      <q-separator />

      <div class="row q-mr-md">
        <div class="col text-bold">مبلغ کل</div>
        <div>{{ totalAmount }} <span class="text-caption"> ریال</span></div>
      </div>

      <q-separator
        color="primary"
        size="1.5px"
      />

    </div>

  </div>

  <!-- <div class="clear-fix row q-my-xl">

    <div class="col-8"></div>
    <div class="col-3 q-gutter-y-md">
      <div class="row q-mr-md">
        <div class="col">مبلغ</div>
        <div>{{ rowAmount }} <span class="text-caption"> ریال</span></div>
      </div>

      <div class="row q-mr-md">
        <div class="col row q-gutter-sm items-center">
          <q-btn
            outline
            round
            icon="o_add"
            size="xs"
            @click="generalDiscount = true"
          >
            <q-tooltip
              anchor="center left"
              self="center right"
              :offset="[10, 10]"
              class="text-body2 q-px-sm custom-tooltip"
              :delay="600"
            >
              ایجاد تخفیف
            </q-tooltip>

            <q-menu
              anchor="bottom right"
              self="bottom left"
              :offset="[10, 8]"
            >
              <q-input
                outlined
                dense
                v-model="generalDiscountValue"
              >

                <template #append>
                  <q-btn
                    size="xs"
                    :icon="generalDiscount ? 'attach_money' : 'o_percent'"
                    class="cursor-pointer"
                    color="primary"
                    round
                    outline
                    @click="generalDiscount = !generalDiscount"
                  />
                </template>

              </q-input>
            </q-menu>

          </q-btn>

          <span>تخفیف</span>

        </div>
        <div><span class="text-red">({{ rowDiscount }})</span> <span class="text-red text-caption"> ریال</span></div>
      </div>

      <div class="row q-mr-md">
        <div class="col">ارزش افزوده</div>
        <div>{{ rowVat }} <span class="text-caption"> ریال</span></div>
      </div>

      <q-separator />

      <div class="row q-mr-md">
        <div class="col text-bold">مبلغ کل</div>
        <div>{{ totalAmount }} <span class="text-caption"> ریال</span></div>
      </div>

      <q-separator
        color="primary"
        size="1.5px"
      />

    </div>

  </div> -->
</template>

<script setup>
import { ref, computed } from "vue"
import ProductLookup from "src/components/shared/Lookups/ProductLookup.vue"
import ProductUnitLookup from "src/components/shared/Lookups/ProductUnitLookup.vue"
import VatLookup from "src/components/shared/Lookups/VatLookup.vue"

const discountIsCash = ref(true)
const generalDiscount = ref(true)
const vatIsCash = ref(true)
const quantity = ref(1)
const showMoreDetail = ref(false)
const generalDiscountValue = ref(0)

const rows = ref([
  {
    product: '',
    quantity: 0,
    unit: '',
    amount: 0,
    vat: 0,
    rowDiscount: 0,
    description: '',
  },
]);

const addRow = (index) => {
  const newRow = {
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
  return rows.value.reduce((total, row) => total + (Number(row.quantity) * Number(row.amount) - (Number(row.rowDiscount)) - Number(generalDiscountValue.value)) + Number(row.vat), 0);
});

</script>

<style lang="scss" scoped>
.q-item__label--caption {
  font-size: 14px;
  letter-spacing: 0;
  color: #697588;
}

.quick-items {
  height: 100px;
}
</style>
