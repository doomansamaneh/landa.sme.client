import { ref } from "vue";

export const vAccess = {
  mounted(el, binding) {
    const requiredPermission = binding.value;

    const permissions = ref([
      "sls.invoice.create",
      "sls.invoice.edit",
      "sls.invoice.delete",
      "sls.invoice.cancelInvoice",
      "sls.invoice.print",
      "sls.invoice.export",

      "sls.purchase.create",
      "sls.salesReturn.create",

      "acc.voucher.create",
      "acc.voucher.edit",
      "acc.voucher.delete",
      "acc.voucher.print",
      "acc.voucher.export",

      "acc.operation.reorder",
    ]);

    const hasPermission = permissions.value.includes(
      requiredPermission
    );

    if (!hasPermission) {
      el.style.display = "none";
    }
  },
};
