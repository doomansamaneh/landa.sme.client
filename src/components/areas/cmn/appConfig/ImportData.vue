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
  import { useI18n } from "vue-i18n";

  import ImportFile from "./_ImportFile.vue";
  const { t: $t } = useI18n();
  const props = defineProps({
    inside: Boolean,
  });

  const $q = useQuasar();

  const importList = [
    {
      title: $t("shared.labels.contactPerson"),
      importAction: "importCustomer",
      fileTemplate: "customerTemplate.xlsx",
      permission: "crm.customer.create",
    },
    {
      title: $t("shared.labels.productService"),
      importAction: "importProduct",
      fileTemplate: "productTemplate.xlsx",
      permission: "cmn.product.create",
    },
    {
      title: $t("shared.labels.accountingDocuments"),
      importAction: "importVoucher",
      fileTemplate: "voucherTemplate.xlsx",
      permission: "acc.voucher.create",
    },
    {
      title: $t("shared.labels.salesInvoices"),
      importAction: "importInvoice",
      fileTemplate: "invoiceTemplate.xlsx",
      permission: "sls.invoice.create",
    },
    {
      title: $t("shared.labels.purchaseInvoices"),
      importAction: "importPurchase",
      fileTemplate: "purchaseTemplate.xlsx",
      permission: "sls.purchase.create",
    },
  ];
</script>
