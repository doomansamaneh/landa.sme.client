<template>
  <q-btn round dense unelevated>
    <q-icon name="o_bolt" size="24px" color="orange-7" />
    <q-menu
      style="position: absolute"
      transition-show="jump-down"
      transition-hide="jump-up"
      :offset="[5, 24]"
      class="border-radius-lg"
    >
      <q-card
        style="width: 340px"
        class="border-radius-lg text-on-dark"
      >
        <q-card-section class="q-pt-lg q-pb-none">
          <div class="row items-center">
            <q-icon
              name="o_bolt"
              size="24px"
              color="orange-7"
              class="q-mr-xs"
            />
            <div
              class="text-body2 no-letter-spacing text-bold text-on-dark"
            >
              دسترسی سریع
            </div>
          </div>
        </q-card-section>

        <q-card-section class="row q-col-gutter-md q-pa-lg">
          <div class="col-4" v-for="item in items" :key="item.id">
            <router-link class="no-decoration" :to="item.to">
              <q-item
                v-close-popup
                clickable
                class="text-center column text-on-dark border-radius-md"
                style="padding: 5px 10px"
              >
                <div>
                  <q-avatar class="bg-on-dark">
                    <q-icon :name="`o_${item.icon}`" />
                  </q-avatar>
                </div>
                <div class="q-pt-sm">
                  {{ $t(`main-menu-items.${item.name}`) }}
                </div>
              </q-item>
            </router-link>
          </div>
        </q-card-section>
      </q-card>
    </q-menu>
  </q-btn>
</template>

<script setup>
  import { ref } from "vue";

  const items = ref([
    {
      id: 1,
      name: "Sls_Invoice_View",
      icon: "receipt",
      to: "/sls/invoice",
    },
    {
      id: 2,
      name: "Trs_Receipt_View",
      icon: "arrow_downward",
      to: "/trs/receipt",
    },
    {
      id: 3,
      name: "Trs_Payment_View",
      icon: "arrow_upward",
      to: "/trs/payment",
    },
    {
      id: 4,
      name: "Sls_Quote_View",
      icon: "assignment",
      to: "/sls/quote",
    },
    {
      id: 5,
      name: "Acc_Voucher_View",
      icon: "receipt",
      to: "/acc/voucher",
    },
    {
      id: 6,
      name: "Acc_Report_IncomeStatement",
      icon: "reorder",
      to: "Acc/Report/IncomeStatement",
    },
  ]);
</script>
