<template>
  <q-markup-table
    bordered
    flat
    separator="horizontal"
    class="q-markup-table--impacted"
  >
    <thead>
      <!-- <tr>
        <th colspan="100%">
          <div class="row items-center">
            <div class="col-md-6 col-sm-12">
              <add-by-code :form-store="formStore" />
            </div>
          </div>
        </th>
      </tr> -->
      <tr>
        <th style="width: 1%">#</th>
        <th style="width: 28%">کالا/خدمت</th>
        <th style="width: 7%">تعداد/مقدار</th>
        <th style="width: 15%">واحد سنجش</th>
        <th style="width: 15%">مبلغ واحد</th>
        <th style="width: 15%">
          مبلغ کل
          <q-icon
            name="o_info"
            size="xs"
            color="primary"
            class="cursor-pointer"
          >
            <q-tooltip
              :delay="600"
              class="custom-tooltip"
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
        <th style="width: 10%"></th>
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
          <product-lookup
            autogrow
            :autofocus="index === formStore.newAddedItemIndex.value"
            placeholder="انتخاب کالا/خدمت"
            v-model:selectedId="row.productId"
            v-model:selectedText="row.productTitle"
            :filterExpression="productFilter"
            required
            @rowSelected="productChanged($event, row)"
          />
        </td>
        <td>
          <custom-input-number
            v-model="row.quantity"
            placeholder="مقدار"
            required
          />
        </td>
        <td>
          <product-unit-lookup
            placeholder="واحد سنجش"
            v-model:selectedId="row.productUnitId"
            v-model:selectedText="row.productUnitTitle"
            required
          />
        </td>
        <td>
          <custom-input-number
            v-model="row.price"
            placeholder="مبلغ واحد"
            required
          />
        </td>
        <td>
          <q-field outlined dense disable>
            <template #control>
              <div
                class="text-body2 no-letter-spacing self-center full-width no-outline"
                tabindex="0"
              >
                {{ helper.formatNumber(row.totalPrice) }}
              </div>
            </template>
          </q-field>
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
    <tbody v-if="model.invoiceItems.length === 0">
      <tr>
        <td colspan="100%" class="text-center">
          <no-product-selected class="q-mt-md" />
          <q-btn
            class="q-mb-xl primary-shadow"
            rounded
            unelevated
            color="primary"
            @click="formStore.pushNewRow()"
          >
            <q-icon name="o_add" size="20px" class="q-mr-xs" />
            افزودن ردیف
          </q-btn>
        </td>
      </tr>
    </tbody>
  </q-markup-table>

  <q-btn
    v-if="model.invoiceItems.length > 0"
    padding="4px 12px"
    unelevated
    rounded
    dense
    class="bg-primary primary-shadow text-white q-mt-md"
    @click="formStore.pushNewRow()"
  >
    <q-icon size="20px" name="o_add" class="q-mr-xs" />
    <div class="no-letter-spacing">افزودن ردیف</div>
  </q-btn>

  <footer-section
    v-if="model.invoiceItems.length > 0"
    :form-store="formStore"
    :invoice-form-type="invoiceFormType"
  />
</template>

<script setup>
  import { sqlOperator, invoiceFormType } from "src/constants";
  import { helper } from "src/helpers";
  import { useDialog } from "src/composables/useDialog";
  import { useInvoiceModel } from "src/components/areas/sls/_composables/useInvoiceModel";
  import { invoiceModel } from "src/models/areas/sls/invoiceModel";

  import FooterSection from "./FooterSection.vue";
  import ProductLookup from "src/components/shared/lookups/ProductLookup.vue";
  import ProductUnitLookup from "src/components/shared/lookups/ProductUnitLookup.vue";
  import CustomInputNumber from "src/components/shared/forms/CustomInputNumber.vue";
  import NoProductSelected from "../NoProductSelected.vue";
  import AddByCode from "../AddByCode.vue";
  import RowDetailSheet from "./RowDetailSheet.vue";

  const props = defineProps({
    formStore: useInvoiceModel,
    formType: invoiceFormType,
    model: invoiceModel,
  });

  const dialogStore = useDialog();

  const openRowDetailSheet = (item) => {
    dialogStore.openDialog({
      title: "shared.labels.additionalInformation",
      component: RowDetailSheet,
      props: { formType: props.formType },
      item: item,
    });
  };

  const productFilter =
    props.formType == invoiceFormType.sales
      ? [
          {
            fieldName: "isForSale",
            operator: sqlOperator.equal,
            value: "1",
          },
        ]
      : [
          {
            fieldName: "isForPurchase",
            operator: sqlOperator.equal,
            value: "1",
          },
        ];

  const productChanged = (product, row) => {
    row.price = product?.price ?? product?.maxPrice ?? 0;
    row.productUnitId = product?.productUnitId ?? null;
    row.productUnitTitle = product?.productUnitTitle ?? null;
  };
</script>
