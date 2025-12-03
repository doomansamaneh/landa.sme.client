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
        <th style="width: 25%">{{ $t("shared.columns.expense") }}</th>
        <th>{{ $t("shared.columns.subject") }}</th>
        <th style="width: 12%">{{ $t("shared.columns.amount") }}</th>
        <th style="width: 10%">
          {{ $t("shared.columns.vatAmount") }}
        </th>
        <th style="width: 9%">
          {{ $t("shared.columns.taxAmount") }}
        </th>
        <th style="width: 12%">
          {{ $t("shared.columns.totalPrice") }}
        </th>
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
            :placeholder="$t('shared.columns.expense')"
            v-model:selectedId="row.slId"
            v-model:selectedText="row.slTitle"
            :filterExpression="slFilter"
            required
          />
        </td>
        <td>
          <custom-input
            v-model="row.comment"
            type="textarea"
            autogrow
            :placeholder="$t('shared.columns.subject')"
            required
          />
        </td>
        <td>
          <custom-input-number
            v-model="row.amount"
            :placeholder="$t('shared.columns.amount')"
            required
          />
        </td>
        <td>
          <vat-lookup
            :placeholder="$t('shared.columns.vatAmount')"
            v-model:selectedId="row.vatId"
            v-model:selectedText="row.vatTitle"
            :filterExpression="vatFilter"
            required
            @rowSelected="vatChanged($event, row)"
          />
        </td>
        <td>
          <custom-input-number
            v-model="row.vatAmount"
            :placeholder="$t('shared.columns.taxAmount')"
          />
        </td>
        <td>
          <q-field outlined dense disable>
            <template v-slot:control>
              <div
                class="self-center full-width no-outline"
                tabindex="0"
              >
                {{ helper.formatNumber(row.total) }}
              </div>
            </template>
          </q-field>
        </td>
        <td class="text-center q-gutter-x-sm">
          <q-btn
            no-caps
            color="primary"
            unelevated
            round
            class="text-on-dark"
            size="sm"
            icon="o_add"
            @click="formStore.addNewItem(index, row)"
          />
          <q-btn
            no-caps
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
            padding="8px 16px"
            no-caps
            class="q-my-xl primary-gradient primary-shadow text-white"
            rounded
            unelevated
            @click="formStore.pushNewItem()"
          >
            <q-icon name="o_add" size="20px" class="q-mr-xs" />
            {{ $t("shared.labels.addRow") }}
          </q-btn>
        </td>
      </tr>
    </tbody>
    <tbody v-else>
      <tr>
        <td colspan="6" class="text-right text-weight-700">
          {{ $t("shared.labels.subTotal") }}:
        </td>
        <td>
          <strong>
            {{
              helper.formatNumber(formStore.totalBillAmount?.value)
            }}
          </strong>
        </td>
        <td></td>
      </tr>
    </tbody>
  </q-markup-table>
</template>

<script setup>
  import { helper } from "src/helpers";
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
