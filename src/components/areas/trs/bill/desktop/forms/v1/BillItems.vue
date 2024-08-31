<template>
  <q-markup-table
    class="q-pa-md-"
    bordered
    flat
    dense
    separator="horizontal"
  >
    <thead>
      <tr>
        <th style="width: 1%">#</th>
        <th style="width: 28%">هزینه</th>
        <th>شرح</th>
        <th style="width: 8%">مبلغ</th>
        <th style="width: 12%">مالیات بر ارزش افزوده</th>
        <th style="width: 8%">مبلغ مالیات</th>
        <th style="width: 10%">مبلغ کل</th>
        <th style="width: 1px"></th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, index) in formStore.model.value.billItems"
        :key="index"
        class="q-pa-md"
      >
        <td class="text-center">{{ index + 1 }}</td>
        <td>
          <sl-lookup
            :autofocus="index === formStore.newAddedItemIndex.value"
            placeholder="سرفصل هزینه"
            v-model:selectedId="row.slId"
            v-model:selectedText="row.slTitle"
            :filterExpression="slFilter"
          />
        </td>
        <td>
          <custom-input
            v-model="row.comment"
            type="textarea"
            autogrow
            placeholder="شرح"
          />
        </td>
        <td>
          <custom-input-number
            v-model="row.amount"
            placeholder="مبلغ"
          />
        </td>
        <td>
          <vat-lookup
            placeholder="مالیات بر ارزش افزوده"
            v-model:selectedId="row.vatId"
            v-model:selectedText="row.vatTitle"
            :filterExpression="vatFilter"
            @rowSelected="vatChanged($event, row)"
          />
        </td>
        <td>
          <custom-input-number
            v-model="row.vatAmount"
            placeholder="مبلغ مالیات"
          />
        </td>
        <td>
          <q-field outlined dense disable>
            <template v-slot:control>
              <div
                class="self-center full-width no-outline"
                tabindex="0"
              >
                {{ row.total?.toLocaleString() }}
              </div>
            </template>
          </q-field>
        </td>
        <td class="text-center q-gutter-x-sm">
          <q-btn
            color="primary"
            unelevated
            round
            class="text-on-dark"
            size="sm"
            icon="o_add"
            @click="formStore.addNewItem(index, row)"
          />
          <q-btn
            color="red"
            unelevated
            round
            class="text-on-dark"
            size="sm"
            icon="o_delete"
            @click="formStore.deleteItem(index)"
          />
        </td>
      </tr>
    </tbody>
    <tbody v-if="formStore.model.value.billItems?.length === 0">
      <tr>
        <td colspan="100%" class="text-center">
          <q-btn
            class="q-my-xl primary-shadow"
            rounded
            unelevated
            color="primary"
            @click="formStore.pushNewItem()"
          >
            <q-icon name="o_add" size="20px" class="q-mr-xs" />
            افزودن ردیف
          </q-btn>
        </td>
      </tr>
    </tbody>
    <tbody v-else>
      <tr>
        <td colspan="6" class="text-right text-weight-700">سرجمع:</td>
        <td>
          <strong>
            {{ formStore.totalBillAmount?.value.toLocaleString() }}
          </strong>
        </td>
        <td></td>
      </tr>
    </tbody>
  </q-markup-table>
</template>

<script setup>
  import { ref } from "vue";
  import { sqlOperator, vatType, closeAccounts } from "src/constants";

  import SlLookup from "src/components/shared/lookups/AccountSLLookup.vue";
  import VatLookup from "src/components/shared/lookups/VatLookup.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import CustomInputNumber from "src/components/shared/forms/CustomInputNumber.vue";

  const props = defineProps({
    formStore: Object,
  });

  const slFilter = [
    {
      fieldName: "clId",
      operator: sqlOperator.equal,
      value: closeAccounts.expense,
    },
  ];

  const vatFilter = [
    {
      fieldName: "isForSale",
      operator: sqlOperator.in,
      value: `${vatType.purchase},${vatType.purchaseAndSale}`,
    },
  ];

  const vatChanged = (vat, row) => {
    row.vatPercent = vat?.rate ?? 0;
  };
</script>
