import { computed } from "vue";
import {
  documentType,
  paymentStatus,
  menuItemType,
} from "src/constants";

export function usePaymentItemCheckPreviewMenu(context) {
  return computed(() => {
    const items = [];

    const isReceipt =
      context.model.documentTypeId === documentType.receipt;
    const status = context.model.statusId;

    const addMenuItem = (
      label,
      cssClass,
      icon,
      componentName,
      permission,
      handler = null
    ) => {
      items.push({
        type: menuItemType.item,
        label,
        class: cssClass,
        icon,
        permission,
        visible: true,
        handler:
          handler ??
          (() => context?.openForm?.(label, componentName)),
      });
    };

    const primaryBtnClass =
      "primary-gradient primary-shadow text-white";

    if (isReceipt) {
      if (status === paymentStatus.normal) {
        addMenuItem(
          "transferToBank",
          primaryBtnClass,
          "account_balance",
          "TransferToBankForm",
          "trs.payment.create"
        );
        addMenuItem(
          "cashTheCheck",
          "",
          "attach_money",
          "CashCheckReceiptForm",
          "trs.payment.create"
        );
        addMenuItem(
          "bounceTheCheck",
          "",
          "undo",
          "BounceCheckReceiptForm",
          "trs.payment.create"
        );
      } else if (status === paymentStatus.transferedToBank) {
        addMenuItem(
          "cashTheCheck",
          primaryBtnClass,
          "attach_money",
          "CashCheckReceiptForm",
          "trs.receipt.create"
        );
        addMenuItem(
          "bounceTheCheck",
          "",
          "undo",
          "BounceCheckReceiptForm",
          "trs.receipt.create"
        );
      }

      if (status !== paymentStatus.normal) {
        addMenuItem(
          "deleteCheckLog",
          "",
          "delete",
          null,
          "trs.receipt.delete",
          () => context?.deleteById?.()
        );
      }
    } else {
      if (status === paymentStatus.normal) {
        addMenuItem(
          "cashTheCheck",
          primaryBtnClass,
          "attach_money",
          "CashCheckPayedForm",
          "trs.payment.create"
        );
        addMenuItem(
          "bounceTheCheck",
          "",
          "undo",
          "BounceCheckPayedForm",
          "trs.payment.create"
        );
      } else {
        addMenuItem(
          "deleteCheckLog",
          "bg-red-5 primary-shadow text-white",
          "delete",
          null,
          "trs.payment.delete",
          () => context?.deleteById?.()
        );
      }
    }

    return items;
  });
}
