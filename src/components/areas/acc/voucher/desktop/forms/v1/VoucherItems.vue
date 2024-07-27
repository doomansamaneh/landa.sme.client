<template>
  <q-markup-table bordered flat dense separator="horizontal">
    <thead>
      <tr>
        <th style="width: 1px">#</th>
        <th style="width: 25%">حساب معین</th>
        <th style="width: 23%">تفصیلی</th>
        <th style="width: 25%">شرح</th>
        <th style="width: 10%">بدهکار</th>
        <th style="width: 10%">بستانکار</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, index) in formStore.model.value.voucherItems"
        :key="index"
        class="q-pa-md vertical-top"
      >
        <td class="text-center">{{ index + 1 }}</td>
        <td>
          <sl-lookup
            :autofocus="index === formStore.newAddedItemIndex.value"
            placeholder="حساب معین"
            v-model:selectedId="row.slId"
            v-model:selectedText="row.slTitle"
            @rowSelected="slChanged($event, row, index)"
          />
        </td>
        <td>
          <dl-lookup
            ref="dl"
            placeholder="تفصیلی"
            v-model:selectedId="row.dlId"
            v-model:selectedText="row.dlTitle"
          />
          <!-- :filter-expression="getDlFilters(row)" -->
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
            v-model="row.debit"
            placeholder="بدهکار"
          />
        </td>
        <td>
          <custom-input-number
            v-model="row.credit"
            placeholder="بستانکار"
          />
        </td>
        <td class="text-center q-gutter-x-sm">
          <q-btn
            color="primary"
            unelevated
            round
            class="text-on-dark"
            size="sm"
            icon="o_add"
            @click="formStore.addNewRow(index, row)"
          />
          <q-btn
            color="red"
            unelevated
            round
            class="text-on-dark"
            size="sm"
            icon="o_delete"
            @click="formStore.deleteRow(index)"
          />
        </td>
      </tr>
    </tbody>
    <tbody v-if="formStore.model.value.voucherItems.length === 0">
      <tr>
        <td colspan="100%" class="text-center">
          <q-btn
            class="q-my-xl primary-shadow"
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
    <tfoot class="table-total" v-if="formStore.totalDebit.value > 0">
      <tr class="grid-total">
        <td colspan="4" class="text-right">
          <strong>سرجمع:</strong>
        </td>
        <td>
          <b>{{ formStore.totalDebit.value?.toLocaleString() }}</b>
        </td>
        <td>
          <b>{{ formStore.totalCredit.value?.toLocaleString() }}</b>
        </td>
        <td>
          <b>{{ formStore.totalDif.value?.toLocaleString() }}</b>
        </td>
      </tr>
    </tfoot>
  </q-markup-table>
</template>

<script setup>
  import { ref } from "vue";
  import { sqlOperator } from "src/constants";

  import SlLookup from "src/components/shared/lookups/AccountSLLookup.vue";
  import DlLookup from "src/components/shared/lookups/AccountDLLookup.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import CustomInputNumber from "src/components/shared/forms/CustomInputNumber.vue";

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
