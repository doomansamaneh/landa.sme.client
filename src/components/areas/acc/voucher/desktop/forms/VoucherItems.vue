<template>
  <div v-if="$q.screen.lt.md">
    <mobile-voucher-items :form-store="formStore" />
  </div>
  <template v-else>
    <q-markup-table
      bordered
      flat
      separator="horizontal"
      class="q-mt-md q-markup-table--impacted"
    >
      <thead>
        <tr>
          <th style="width: 1px">#</th>
          <th style="width: 25%">
            {{ $t("shared.columns.slTitle") }}
          </th>
          <th style="width: 23%">
            {{ $t("shared.columns.dlTitle") }}
          </th>
          <th style="width: 25%">
            {{ $t("shared.labels.comment") }}
          </th>
          <th style="width: 10%">{{ $t("shared.columns.debit") }}</th>
          <th style="width: 10%">
            {{ $t("shared.columns.credit") }}
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in formStore.model.value.voucherItems"
          :key="index"
          class="q-pa-md"
        >
          <td class="text-center">{{ index + 1 }}</td>
          <td>
            <sl-lookup
              v-model:selectedId="row.slId"
              v-model:selectedText="row.slDisplay"
              :autofocus="index === formStore.newAddedItemIndex.value"
              :placeholder="$t('shared.columns.slTitle')"
              required
              clearable
              @rowSelected="slChanged($event, row, index)"
            />
          </td>
          <td>
            <dl-lookup
              ref="dl"
              v-model:selectedId="row.dlId"
              v-model:selectedText="row.dlDisplay"
              :placeholder="$t('shared.columns.dlTitle')"
            />
            <!-- :filter-expression="getDlFilters(row)" -->
          </td>
          <td>
            <custom-input v-model="row.comment" autogrow required />
            <!-- <custom-input
              v-model:selectedText="row.comment"
              autogrow
              required
            /> -->
          </td>
          <td>
            <custom-input-number
              v-model="row.debit"
              :placeholder="$t('shared.columns.debit')"
              required
            />
          </td>
          <td>
            <custom-input-number
              v-model="row.credit"
              :placeholder="$t('shared.columns.credit')"
              required
            />
          </td>
          <td class="text-center q-gutter-x-xs">
            <q-btn
              no-caps
              color="primary"
              unelevated
              round
              class="text-on-dark"
              size="sm"
              icon="o_add"
              @click="formStore.addNewRow(index, row)"
            />
            <q-btn
              no-caps
              color="red"
              unelevated
              round
              class="text-on-dark"
              size="sm"
              icon="o_delete"
              @click="formStore.deleteRow(index)"
            />

            <!-- <q-btn no-caps
              unelevated
              round
              dense
              class="text-on-dark"
              size="14px"
              @click="formStore.deleteRow(index)"
            >
              <q-icon size="24px" name="o_delete" />
            </q-btn> -->
          </td>
        </tr>
      </tbody>
      <tbody v-if="formStore.model.value.voucherItems.length === 0">
        <tr>
          <td colspan="100%" class="text-center">
            <no-item-selected />
            <!-- <q-btn no-caps
              class="q-my-xl primary-shadow"
              rounded
              unelevated
              color="primary"
              @click="formStore.pushNewRow()"
            >
              <q-icon name="o_add" size="20px" class="q-mr-xs" />
              افزودن ردیف
            </q-btn> -->
          </td>
        </tr>
      </tbody>
      <tfoot
        class="table-total"
        v-if="formStore.totalDebit.value > 0"
      >
        <tr class="grid-total">
          <td colspan="4" class="text-right">
            <strong>{{ $t("shared.labels.subTotal") }}:</strong>
          </td>
          <td>
            <b>
              {{ helper.formatNumber(formStore.totalDebit.value) }}
            </b>
          </td>
          <td>
            <b>
              {{ helper.formatNumber(formStore.totalCredit.value) }}
            </b>
          </td>
          <td>
            <b>{{ helper.formatNumber(formStore.totalDif.value) }}</b>
          </td>
        </tr>
      </tfoot>
    </q-markup-table>

    <q-btn
      no-caps
      padding="4px 12px"
      unelevated
      rounded
      dense
      class="bg-primary primary-shadow text-white q-mt-md"
      @click="formStore.pushNewRow()"
    >
      <q-icon size="20px" name="o_add" class="q-mr-xs" />
      <div class="">{{ $t("shared.labels.addRow") }}</div>
    </q-btn>
  </template>
</template>

<script setup>
  import { ref } from "vue";
  import { sqlOperator } from "src/constants";
  import { helper } from "src/helpers";

  import NoItemSelected from "src/components/shared/dataTables/NoItemSelected.vue";
  import SlLookup from "src/components/shared/lookups/AccountSLLookup.vue";
  import DlLookup from "src/components/shared/lookups/AccountDLLookup.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import CustomInputNumber from "src/components/shared/forms/CustomInputNumber.vue";
  import MobileVoucherItems from "../../mobile/forms/VoucherItems.vue";
  import CommentLookup from "src/components/shared/Lookups/CommentLookup.vue";

  const props = defineProps({
    formStore: Object,
  });

  const dl = ref([]);

  const slChanged = (sl, row, index) => {
    const dlFilters = getDlFilters(row);
    dl.value[index].lookup.tableStore.setFilterExpression(dlFilters);
  };

  const getDlFilters = (row) => {
    return [
      {
        fieldName: "slId",
        operator: sqlOperator.equal,
        value: row.slId,
      },
    ];
  };
</script>
