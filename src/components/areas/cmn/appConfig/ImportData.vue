<template>
  <q-card bordered>
    <q-card-section :class="$q.screen.gt.xs ? 'q-pa-lg' : 'q-pa-md'">
      <div class="q-gutter-y-lg">
        <div v-for="item in importList" :key="item.importAction">
          <import-file
            v-access="item.permission"
            :title="item.title"
            :import-action="item.importAction"
            :file-template="item.fileTemplate"
          />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { useQuasar } from "quasar";

  import ImportFile from "./_ImportFile.vue";
  const props = defineProps({
    inside: Boolean,
  });

  const $q = useQuasar();

  const importList = [
    {
      title: "مخاطب، شخص",
      importAction: "importCustomer",
      fileTemplate: "customerTemplate.xlsx",
      permission: "crm.customer.create",
    },
    {
      title: "کالا، خدمت",
      importAction: "importProduct",
      fileTemplate: "productTemplate.xlsx",
      permission: "cmn.product.create",
    },
    {
      title: "اسناد حسابداری",
      importAction: "importVoucher",
      fileTemplate: "voucherTemplate.xlsx",
      permission: "acc.voucher.create",
    },
    {
      title: "فاکتورهای فروش",
      importAction: "importInvoice",
      fileTemplate: "invoiceTemplate.xlsx",
      permission: "sls.invoice.create",
    },
    {
      title: "فاکتورهای خرید",
      importAction: "importPurchase",
      fileTemplate: "purchaseTemplate.xlsx",
      permission: "sls.purchase.create",
    },
  ];
</script>
