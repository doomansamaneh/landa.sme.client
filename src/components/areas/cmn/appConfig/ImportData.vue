<template>
  <div style="margin-top: 0" :class="styles()">
    <q-card-section class="q-gutter-y-md">
      <div
        v-for="(item, index) in importList"
        :key="item.importAction"
      >
        <import-file
          :title="`${index + 1}. ${item.title}`"
          :import-action="item.importAction"
          :file-template="item.fileTemplate"
        />
      </div>
    </q-card-section>
  </div>
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
    },
    {
      title: "کالا، خدمت",
      importAction: "importProduct",
      fileTemplate: "productTemplate.xlsx",
    },
    {
      title: "اسناد حسابداری",
      importAction: "importVoucher",
      fileTemplate: "voucherTemplate.xlsx",
    },
    {
      title: "فاکتورهای فروش",
      importAction: "importInvoice",
      fileTemplate: "invoiceTemplate.xlsx",
    },
    {
      title: "فاکتورهای خرید",
      importAction: "importPurchase",
      fileTemplate: "purchaseTemplate.xlsx",
    },
  ];

  const styles = () => {
    if (!props.inside && $q.screen.gt.sm) {
      return "q-card form-container settings-card";
    } else if (!props.inside) {
      return "q-card form-container";
    } else {
      return "";
    }
  };
</script>
<style>
  .settings-card {
    width: 900px;
  }
</style>
