<template>
  <q-card class="bordered shadow form-container_">
    <q-card-section>
      <div
        class="row justify-between items-center text-body3 no-letter-spacing"
      >
        <div>
          <div>
            شماره:
            <span class="text-weight-500">
              {{ formStore.model.value.no }}
            </span>
          </div>
          <div>
            تاریخ:
            <span class="text-weight-500">
              {{ formStore.model.value.date.substring(0, 10) }}
            </span>
          </div>
        </div>
        <div>
          <span
            class="border-radius-sm primary-gradient text-caption text-white label"
          >
            {{ formStore.model.value.typeTitle }}
          </span>
        </div>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-section>
      <div class="row q-mt-sm">
        <div>
          <span class="q-mr-sm">فروشنده:</span>
          <span class="text-weight-500">
            {{ appConfigStore.model.value.companySetting.name }}
          </span>
          <span
            v-if="appConfigStore.model.value.companySetting.address"
          >
            -
          </span>
          <span
            v-if="appConfigStore.model.value.companySetting.address"
            class="text-grey-6 text-body3 no-letter-spacing"
          >
            {{ appConfigStore.model.value.companySetting.address }}
          </span>
        </div>
      </div>
      <div class="row q-mt-sm">
        <div>
          <span class="q-mr-sm">خریدار:</span>
          <span class="text-weight-500">
            {{ formStore.model.value.customerName }}
          </span>
          <span
            v-if="appConfigStore.model.value.companySetting.address"
          >
            -
          </span>
          <span
            v-if="appConfigStore.model.value.companySetting.address"
            class="text-grey-6 text-body3 no-letter-spacing"
          >
            {{ appConfigStore.model.value.companySetting.address }}
          </span>
        </div>
      </div>
      <div class="q-mt-lg overflow-hidden border-radius-xs">
        <div class="bg-grey-1 text-dark q-pa-md">
          <div class="column q-gutter-md">
            <div
              v-for="item in formStore.model.value.invoiceItems"
              :key="item.id"
            >
              <div class="row q-gutter-lg">
                <div class="col">
                  <div class="row items-center">
                    <div>
                      <div class="row">
                        <div class="">
                          {{ item.productTitle }}

                          <q-badge color="red" round dense unelevated>
                            <div class="text-white text-body3">
                              {{ item.quantity.toLocaleString() }}
                            </div>
                          </q-badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex justify-end">
                  <div class="text-bold">
                    {{ item.price.toLocaleString() }}
                  </div>
                </div>
              </div>
            </div>

            <div
              v-if="formStore.totalVat.value"
              class="row items-center justify-between"
            >
              <div class="row items-center q-gutter-sm">
                <div class="">جمع مالیات و عوارض</div>
                <div class="text-green text-bold text-body3">
                  (9%)
                </div>
              </div>
              <div class="text-bold">
                {{ formStore.totalVat.value.toLocaleString() }}
              </div>
            </div>
            <div
              v-if="formStore.totalDiscount.value"
              class="row items-center justify-between"
            >
              <div class="row items-center q-gutter-sm">
                <div>تخفیف</div>
              </div>
              <div class="text-negative text-bold">
                {{ formStore.totalDiscount.value.toLocaleString() }} -
              </div>
            </div>
          </div>
        </div>
        <div class="row text-dark q-px-md q-py-sm bg-orange-2">
          <div class="col-xs text-body3">
            {{ numberToWords(formStore.totalPrice.value) }}
            <b>{{ formStore.model.value.currencyTitle }}</b>
          </div>

          <div class="row justify-end col-xs text-bold">
            {{ formStore.totalPrice.value.toLocaleString() }}
          </div>
        </div>
      </div>
    </q-card-section>

    <!-- <q-separator /> -->
    <!-- <q-card-actions class="q-pa-md" align="between">
      <q-btn
        :to="`/${baseRoute}/edit/${id}`"
        class="text-body3 text-bold no-letter-spacing"
        padding="6px 12px"
        unelevated
        no-caps
      >
        {{ $t("shared.labels.edit") }}
      </q-btn>
      <q-btn dense icon="o_more_vert" round unelevated />
    </q-card-actions> -->
  </q-card>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { useRouter } from "vue-router";

  import { numberToWords } from "@persian-tools/persian-tools";

  import { useInvoiceState } from "components/areas/sls/_composables/useInvoiceState";
  import { useInvoiceModel } from "components/areas/sls/_composables/useInvoiceModel";
  import { useAppConfigModel } from "src/components/areas/cmn/_composables/useAppConfigModel";

  const props = defineProps({
    item: Object,
  });

  const formStore = useInvoiceModel({
    baseRoute: "sls/invoice",
    preview: true,
  });

  const route = useRoute();
  const router = useRouter();
  const invoiceStore = useInvoiceState();

  function deleteCallBack() {
    invoiceStore.state.firstLoad.value = false;
    router.back();
  }

  const id = computed(() => props.item?.id ?? route.params.id);
  const appConfigStore = useAppConfigModel();

  onMounted(() => {
    formStore.getById(id.value);
  });
</script>

<style lang="scss" scoped>
  .label {
    padding: 2px 12px;
  }
</style>
