<template>
  <q-markup-table bordered flat separator="horizontal">
    <thead>
      <tr>
        <th style="width: 1%">#</th>
        <th style="width: 40%">کالا/خدمت</th>
        <th style="width: 10%">تعداد/مقدار</th>
        <th style="width: 15%">واحد سنجش</th>
        <th style="width: 16%">مبلغ واحد</th>
        <th style="width: 17%">
          مبلغ کل
          <q-icon
            name="o_info"
            size="xs"
            color="primary"
            class="cursor-pointer"
          >
            <q-tooltip
              :delay="600"
              class="absolute custom-tooltip"
              anchor="top right"
              self="bottom middle"
              :offset="[50, 10]"
            >
              <span class="text-body2">
                مبلغ کل = (تعداد * مبلغ) - تخفیف + مالیات بر ارزش
                افزوده
              </span>
            </q-tooltip>
          </q-icon>
        </th>
        <th style="width: 1%"></th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, index) in model.invoiceItems"
        :key="index"
        class="q-pa-md"
      >
        <td class="text-center">{{ index + 1 }}</td>
        <td>
          <custom-input
            autogrow
            outlined
            dense
            v-model="row.productCodeTitle"
          />
        </td>
        <td>
          <custom-input-number
            ref="quantityInput"
            v-model="row.quantity"
            placeholder="مقدار"
            type_="number"
            step_="0.01"
            min="0"
          />
        </td>
        <td>
          <product-unit-lookup
            placeholder="واحد سنجش"
            v-model:selectedId="row.productUnitId"
            v-model:selectedText="row.productUnitTitle"
          />
        </td>
        <td>
          <custom-input-number
            v-model="row.price"
            placeholder="مبلغ واحد"
          />
        </td>

        <td>
          <custom-input-number
            v-model="row.totalPrice"
            outlined
            dense
            disable
          />
        </td>
        <td class="text-center">
          <q-btn
            unelevated
            round
            dense
            class="text-on-dark"
            size="14px"
            @click="formStore.deleteRow(index)"
          >
            <q-icon size="24px" name="o_delete" />
          </q-btn>
          <q-btn
            @click="openRowDetailSheet(row)"
            unelevated
            dense
            round
            class="text-on-dark"
            size="14px"
          >
            <q-icon size="24px" name="o_more_horiz" />
          </q-btn>
        </td>
      </tr>
    </tbody>
    <tbody v-if="!model.invoiceItems?.length">
      <tr>
        <td colspan="100%">
          <no-product-selected />
        </td>
      </tr>
    </tbody>
  </q-markup-table>

  <footer-section
    class="q-pt-xl"
    v-if="model.invoiceItems?.length"
    :form-store="formStore"
  />
</template>

<script setup>
  import { ref, watch } from "vue";
  import { useDialog } from "src/composables/useDialog";
  import { invoiceFormType } from "src/constants";
  import { invoiceModel } from "src/models/areas/sls/invoiceModel";

  import FooterSection from "../v1/FooterSection.vue";
  import ProductUnitLookup from "src/components/shared/lookups/ProductUnitLookup.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import CustomInputNumber from "src/components/shared/forms/CustomInputNumber.vue";
  import NoProductSelected from "../NoProductSelected.vue";
  import RowDetailSheet from "src/components/areas/sls/_shared/invoice/desktop/forms/v1/RowDetailSheet.vue";

  const props = defineProps({
    formStore: Object,
    formType: invoiceFormType,
    model: invoiceModel,
  });

  const dialogStore = useDialog();
  const prevQuantities = ref(new Map());

  // const vatFilter =
  //   props.formType == invoiceFormType.sales
  //     ? [
  //         {
  //           fieldName: "isForSale",
  //           operator: sqlOperator.in,
  //           value: `${vatType.sale},${vatType.purchaseAndSale}`,
  //         },
  //       ]
  //     : [
  //         {
  //           fieldName: "isForSale",
  //           operator: sqlOperator.in,
  //           value: `${vatType.purchase},${vatType.purchaseAndSale}`,
  //         },
  //       ];

  const quantityInput = ref([]); // Array to hold the refs for each input

  // const focusInput = (index) => {
  //   if (
  //     quantityInput.value[index] &&
  //     typeof quantityInput.value[index].focus === "function"
  //   ) {
  //     quantityInput.value[index].focus(); // Call the focus method defined in custom-input-number
  //   }
  // };

  const openRowDetailSheet = (item) => {
    dialogStore.openDialog({
      title: "shared.labels.additionalInformation",
      component: RowDetailSheet,
      item: item,
    });
  };

  watch(
    () => props.model.invoiceItems,
    (newItems) => {
      newItems.forEach((item, index) => {
        const prevQuantity = prevQuantities.value.get(item.productId);

        if (prevQuantity === undefined) {
          prevQuantities.value.set(item.productId, item.quantity);
          item.blink = false;
        } else {
          if (item.quantity > prevQuantity) {
            item.blink = true;
            // focusInput(index);
            setTimeout(() => {
              item.blink = false;
            }, 300);
          }

          prevQuantities.value.set(item.productId, item.quantity);
        }
      });
    },
    { deep: true }
  );

  // const vatChanged = (vat, row) => {
  //   row.vatPercent = vat?.rate ?? 0;
  // };
</script>

