<template>
  <q-btn round dense unelevated @click="toggleStatus">
    <q-icon name="o_bolt" size="24px" color="orange-7" />
  </q-btn>

  <q-dialog
    ref="bottomSheet"
    :model-value="status"
    auto-close
    full-width
    position="bottom"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card>
      <q-card-section class="q-pa-lg">
        <div class="flex items-center justify-between">
          <div class="text-on-dark text-body2 text-bold">
            <q-icon class="q-mr-sm" name="o_bolt" size="sm" color="orange-7" />
            <span class="text-bold text-on-dark">دسترسی سریع</span>
          </div>

          <q-btn unelevated round dense icon="close" v-close-popup />
        </div>
      </q-card-section>

      <q-card-section class="row q-col-gutter-md q-pa-lg">
        <div class="col-4" v-for="item in items" :key="item.id">
          <router-link class="no-decoration" :to="item.to">
            <q-item
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
  </q-dialog>
</template>

<script setup>
  import { ref } from "vue";

  const status = ref(false);
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

  const toggleStatus = () => {
    status.value = !status.value;
  };
</script>
