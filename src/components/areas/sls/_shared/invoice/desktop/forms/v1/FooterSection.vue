<template>
  <div class="row" :class="$q.screen.gt.xs ? 'q-mt-xl' : 'q-mt-md'">
    <div class="col-md-8 col-sm-12 col-xs-12"></div>
    <div class="col-md-3 col-sm-12 col-xs-12 q-gutter-y-md">
      <div class="row q-mr-md">
        <div class="col">مبلغ</div>
        <div>
          {{ formStore.totalNetPrice.value.toLocaleString() }}
          <span class="text-caption">ریال</span>
        </div>
      </div>

      <div class="row q-mr-md">
        <div class="col row q-gutter-sm items-center">
          <q-btn outline round icon="o_add" size="xs">
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
              v-model="discountVisible"
              class="border-radius-lg"
              anchor="bottom right"
              self="bottom left"
              :offset="[10, 8]"
            >
              <q-card class="bordered">
                <q-card-section class="q-pb-none">
                  <div
                    class="text-h6 no-letter-spacing text-weight-700"
                  >
                    تخفیف
                  </div>
                </q-card-section>
                <q-card-section>
                  <custom-input-number v-model="generalDiscountValue">
                    <template #append>
                      <q-btn
                        size="8px"
                        class="cursor-pointer"
                        :color="
                          $q.dark.isActive ? 'yellow' : 'primary'
                        "
                        round
                        outline
                        @click="toggleDiscountType"
                      >
                        <q-icon
                          size="14px"
                          :name="
                            discountIsCash
                              ? 'attach_money'
                              : 'o_percent'
                          "
                        />
                      </q-btn>
                    </template>
                  </custom-input-number>
                </q-card-section>

                <q-card-actions class="dark-1 q-px-md">
                  <q-btn
                    padding="4px 12px"
                    rounded
                    unelevated
                    class="primary-gradient text-white"
                    @click="confirmGeneralDiscount"
                  >
                    {{ $t("shared.labels.accept") }}
                  </q-btn>
                  <q-btn
                    padding="4px 12px"
                    rounded
                    unelevated
                    @click="discountVisible = false"
                  >
                    {{ $t("shared.labels.cancel") }}
                  </q-btn>
                </q-card-actions>
              </q-card>
            </q-menu>
          </q-btn>

          <span>تخفیف</span>
        </div>
        <div>
          <span class="text-red">
            ({{ formStore.totalDiscount.value.toLocaleString() }})
          </span>
          <span class="text-red text-caption">ریال</span>
        </div>
      </div>

      <div class="row q-mr-md">
        <div class="col">ارزش افزوده</div>
        <div>
          {{ formStore.totalVat.value.toLocaleString() }}
          <span class="text-caption">ریال</span>
        </div>
      </div>

      <q-separator />

      <div class="row q-mr-md">
        <div class="col text-bold">مبلغ کل</div>
        <div>
          <strong>
            {{ formStore.totalPrice.value.toLocaleString() }}
          </strong>
          <span class="text-caption">ریال</span>
        </div>
      </div>

      <q-separator color="primary" size="1.5px" />
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";

  import CustomInputNumber from "src/components/shared/forms/CustomInputNumber.vue";

  const props = defineProps({
    formStore: Object,
  });

  const discountIsCash = ref(true);
  const discountVisible = ref(false);
  const generalDiscountValue = ref(0);

  const toggleDiscountType = () => {
    discountIsCash.value = !discountIsCash.value;
  };

  const confirmGeneralDiscount = () => {
    if (discountIsCash.value)
      props.formStore.applyDiscountAmount(generalDiscountValue.value);
    else
      props.formStore.applyDiscountPercent(
        generalDiscountValue.value
      );
    discountVisible.value = false;
  };
</script>
