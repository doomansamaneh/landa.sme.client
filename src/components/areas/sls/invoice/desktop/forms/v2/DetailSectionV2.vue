<template>
  <h4>{{ productLookup?.lookup.selectedId }}</h4>
  <pre>{{ productLookup?.lookup.tableStore.activeRow.value }}</pre>
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
  <q-separator />
  <div class="column q-py-md q-gutter-y-md">
    <no-product-selected
      v-if="createInvoice.rows.value.length < 1"
      class="q-my-md"
    />
    <div
      v-for="row in createInvoice.rows.value"
      :key="row.id"
    >

      <div class="row q-gutter-md">

        <div style="width: 25%;">
          <q-field
            dense
            outlined
          >
            <template v-slot:control>
              <div>{{ row.productTitle }}</div>
            </template>
          </q-field>
        </div>
        <div style="width: 9%;">
          <custom-input
            type="number"
            v-model="row.quantity"
          />
        </div>
        <div style="width: 10%;">
          <q-field
            outlined
            dense
          >
            <template v-slot:control>
              <div>{{ row.productUnitTitle }}</div>
            </template>

          </q-field>
        </div>
        <div style="width: 10%;">
          <custom-input
            v-model="row.price"
            display-format="n0"
          />
        </div>
        <div style="width: 15%;">
          <vat-lookup placeholder="مالیات بر ارزش افزوده" />
        </div>

        <div class="col row items-center justify-end">
          <div>{{ rowPrice(row).toLocaleString() }} <span class="text-caption"> ریال</span></div>
        </div>
        <div class="col-1 row items-center justify-end q-gutter-x-sm">
          <q-btn
            unelevated
            round
            class="text-on-dark"
            size="sm"
            @click="createInvoice.removeItem(row)"
          >

            <q-icon
              name="o_delete"
              size="20px"
            />

          </q-btn>
        </div>
      </div>
    </div>
  </div>

  <q-separator />

  <div class="clear-fix row q-my-xl">

    <div class="col-8"></div>
    <div class="col-3 q-gutter-y-md">
      <div class="row q-mr-md">
        <div class="col">مبلغ</div>
        <div>{{ subTotalAmount.toLocaleString() }} <span class="text-caption"> ریال</span></div>
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
              ref="discountMenu"
              no-focus
              no-refocus
              anchor="bottom right"
              self="bottom left"
              :offset="[10, 8]"
            >
              <q-card>
                <q-card-section>
                  <q-input
                    outlined
                    dense
                    v-model="generalDiscountValue"
                    @keydown="validateDiscountInput"
                    @keydown.enter="applyDiscountOnEnter"
                  >
                    <template #append>
                      <q-btn
                        size="xs"
                        :icon="generalDiscount ? 'attach_money' : 'o_percent'"
                        class="cursor-pointer"
                        color="primary"
                        round
                        outline
                        @click="switchDiscount"
                      />
                    </template>
                  </q-input>
                </q-card-section>

                <q-card-actions class="dark-1 q-px-md">
                  <q-btn
                    v-close-popup
                    @click="applyDiscount"
                    padding="4px 12px"
                    unelevated
                    class="bg-primary text-white"
                  >تایید</q-btn>
                  <q-btn
                    v-close-popup
                    padding="4px 12px"
                    unelevated
                  >انصراف</q-btn>
                </q-card-actions>
              </q-card>
            </q-menu>

          </q-btn>

          <span>تخفیف</span>

        </div>
        <div><span class="text-red">({{ totalDiscount.toLocaleString() }})</span> <span class="text-red text-caption">
            ریال</span></div>
      </div>

      <div class="row q-mr-md">
        <div class="col">ارزش افزوده</div>
        <div>{{ rowVat }} <span class="text-caption"> ریال</span></div>
      </div>

      <q-separator />

      <div class="row q-mr-md">
        <div class="col text-bold">مبلغ کل</div>
        <div>{{ totalAmount.toLocaleString() }} <span class="text-caption"> ریال</span></div>
      </div>

      <q-separator
        color="primary"
        size="1.5px"
      />

    </div>

  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from "vue"
import { useCreateInvoice } from "src/components/areas/sls/_composables/useCreateInvoice"
import CustomInput from "src/components/shared/forms/CustomInput.vue"
import VatLookup from "src/components/shared/lookups/VatLookup.vue"
import NoProductSelected from "src/components/areas/sls/invoice/desktop/forms/NoProductSelected.vue"

const createInvoice = useCreateInvoice()

const generalDiscount = ref(true)
const generalDiscountValue = ref(0)
const productLookup = ref(null)
const totalDiscount = ref(0)

const discountMenu = ref(null)

const rowPrice = (row) =>
  Number(row.quantity) * Number(row.price);

const subTotalAmount = computed(() => {
  return createInvoice.rows.value.reduce((total, row) => total + (Number(row.quantity) * Number(row.price)), 0);
})

const totalAmount = computed(() => {
  return createInvoice.rows.value.reduce((total, row) => total + (Number(row.price)), 0);
});

const rowVat = computed(() => {
  const vatTotal = createInvoice.rows.value.reduce((vat, row) => vat + (Number(row.vat) || 0), 0);
  return vatTotal.toLocaleString();
});


const applyDiscount = () => {
  if (!generalDiscount.value) {

    let discountPercentage = generalDiscountValue.value
    discountPercentage = Math.max(0, Math.min(discountPercentage, 100));

    const discountAmount = subTotalAmount.value * (discountPercentage / 100);

    createInvoice.rows.value.forEach(row => {
      row.price = row.price * (1 - (discountPercentage / 100));
    });

    totalDiscount.value = discountAmount;
    generalDiscountValue.value = discountPercentage;

  } else {

    const discountAmount = generalDiscountValue.value;

    createInvoice.rows.value.forEach(row => {
      const discountPerItem = discountAmount;
      row.price = Math.max(0, row.price - discountPerItem);
    });

    totalDiscount.value = discountAmount;
  }
};

watchEffect(() => {
  if (createInvoice.rows.value.length < 1) {
    totalDiscount.value = 0;
  }
});

const validateDiscountInput = (event) => {
  const input = event.target;
  const isGeneralDiscount = generalDiscount.value;

  if (!isGeneralDiscount) {

    const value = parseFloat(input.value + event.key);

    if (isNaN(value) || value < 0 || value > 100 || event.key === '-') {
      event.preventDefault();
    }
  }
};

const applyDiscountOnEnter = (event) => {
  if (event.key === 'Enter') {
    applyDiscount();
    discountMenu.value.hide()
  }
};

const clearGeneralDiscount = () => {
  generalDiscountValue.value = 0
}

const switchDiscount = () => {
  generalDiscount.value = !generalDiscount.value;
  if (!generalDiscount.value) {
    clearGeneralDiscount();
  }

  if (generalDiscount.value) {
    clearGeneralDiscount();
  }
}

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
