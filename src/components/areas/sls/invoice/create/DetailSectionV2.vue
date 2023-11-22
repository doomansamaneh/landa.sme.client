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
  <q-separator class="q-mb-md" />
  <div class="column q-gutter-y-md">
    <div
      v-for="row in createInvoice.rows.value"
      :key="row.id"
    >

      <div class="row q-gutter-md">
        <div style="width: 25%;">
          <custom-input
            placeholder="انتخاب کالا/خدمت"
            v-model="row.productTitle"
          />
        </div>
        <div style="width: 9%;">
          <custom-input v-model="row.quantity" />
        </div>
        <div style="width: 10%;">
          <custom-input
            v-model="row.productUnitTitle"
            placeholder="واحد سنجش"
          />
        </div>
        <div style="width: 10%;">
          <custom-input v-model="row.price" />
        </div>
        <div style="width: 15%;">
          <vat-lookup placeholder="مالیات بر ارزش افزوده" />
        </div>

        <div class="col row items-center justify-end">
          <div>{{ rowTotalAmount }} <span class="text-caption"> ریال</span></div>
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
              <q-card>
                <q-card-section>
                  <q-input
                    outlined
                    dense
                    v-model="generalDiscountValue"
                    @update:model-value="confirmGeneralDiscount"
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
                </q-card-section>

                <q-card-actions class="dark-1 q-px-md">
                  <q-btn
                    @click="confirmGeneralDiscount"
                    padding="4px 12px"
                    unelevated
                    class="bg-primary text-white"
                  >تایید</q-btn>
                  <q-btn
                    padding="4px 12px"
                    unelevated
                  >انصراف</q-btn>
                </q-card-actions>
              </q-card>
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
</template>

<script setup>
import { ref, computed } from "vue"
import { useCreateInvoice } from "src/components/areas/sls/_composables/useCreateInvoice"
import CustomInput from "src/components/shared/Forms/CustomInput.vue"
import VatLookup from "src/components/shared/Lookups/VatLookup.vue"

const createInvoice = useCreateInvoice()


const generalDiscount = ref(true)
const generalDiscountValue = ref(0)
const productLookup = ref(null)


const selectedProductCount = computed(() => createInvoice.rows.value.length);

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
