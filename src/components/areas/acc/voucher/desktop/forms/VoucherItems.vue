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
          <th style="width: 20%">
            {{ $t("shared.columns.slTitle") }}
          </th>
          <th style="width: 20%">
            {{ $t("shared.columns.dlTitle") }}
          </th>
          <th style="width: 20%">
            {{ $t("shared.labels.comment") }}
          </th>
          <th style="width: 10%">{{ $t("shared.columns.debit") }}</th>
          <th style="width: 1px">
            <q-btn
              :disabled="
                formStore.model.value.voucherItems.length === 0
              "
              :class="
                formStore.model.value.voucherItems.length === 0
                  ? 'no-pointer-events'
                  : ''
              "
              no-caps
              size="sm"
              unelevated
              round
              dense
              @click="swapAllRows"
              icon="o_swap_horiz"
            />
          </th>
          <th style="width: 10%">
            {{ $t("shared.columns.credit") }}
          </th>
          <th style="width: 1px" />
        </tr>
      </thead>
      <tbody>
        <template
          v-for="(row, index) in formStore.model.value.voucherItems"
          :key="index"
        >
          <tr class="q-pa-md">
            <td class="text-center">{{ index + 1 }}</td>
            <td>
              <sl-lookup
                v-model:selectedId="row.slId"
                v-model:selectedText="row.slDisplay"
                :autofocus="
                  index === formStore.newAddedItemIndex.value
                "
                :placeholder="$t('shared.columns.slTitle')"
                required
                clearable
                @rowSelected="slChanged($event, row, index)"
              />
            </td>
            <td>
              <dl-lookup
                :ref="setDlRef"
                v-model:selectedId="row.dlId"
                v-model:selectedText="row.dlDisplay"
                :placeholder="$t('shared.columns.dlTitle')"
              />
            </td>
            <td>
              <comment-lookup dense v-model="row.comment" required />
            </td>
            <td>
              <custom-input-number
                v-model="row.debit"
                :placeholder="$t('shared.columns.debit')"
                required_
              />
            </td>
            <td class="text-center">
              <q-btn
                no-caps
                size="sm"
                unelevated
                round
                dense
                icon="o_swap_horiz"
                @click="swapRowValues(index)"
              />
            </td>
            <td>
              <custom-input-number
                v-model="row.credit"
                :placeholder="$t('shared.columns.credit')"
                required_
              />
            </td>
            <td>
              <div
                class="flex no-wrap items-center justify-center q-pt-xs"
                style="gap: 8px"
              >
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
                <q-btn
                  no-caps
                  unelevated
                  round
                  class="text-on-dark"
                  size="sm"
                  @click="duplicateRow(index)"
                >
                  <q-icon size="20px" name="o_copy" />
                </q-btn>
                <q-btn
                  no-caps
                  @click="toggleRowDetails(index)"
                  unelevated
                  dense
                  round
                  class="text-on-dark"
                  size="14px"
                >
                  <q-icon size="24px" name="o_more_horiz" />
                </q-btn>
              </div>
            </td>
          </tr>

          <tr
            class="expanded-row"
            :style="
              $q.dark.isActive
                ? 'background: #ffffff08;'
                : 'background: #00000004;'
            "
            v-if="expandedRows[index]"
          >
            <td class="text-center"></td>
            <td colspan="3">
              <div class="row q-col-gutter-sm">
                <div class="col-4">
                  <dl-lookup
                    v-model:selectedId="row.dl2Id"
                    v-model:selectedText="row.dl2Display"
                    :placeholder="$t('shared.columns.dl2Title')"
                    dense
                  />
                </div>
                <div class="col-4">
                  <dl-lookup
                    v-model:selectedId="row.dl3Id"
                    v-model:selectedText="row.dl3Display"
                    :placeholder="$t('shared.columns.dl3Title')"
                    dense
                  />
                </div>
              </div>
            </td>
            <td colspan="4" />
          </tr>
        </template>
      </tbody>
      <tbody v-if="formStore.model.value.voucherItems.length === 0">
        <tr>
          <td colspan="100%" class="text-center">
            <no-item-selected />
          </td>
        </tr>
      </tbody>
      <tfoot
        class="table-total"
        v-if="formStore.model.value.voucherItems.length > 0"
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
          <td></td>
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
      padding="8px 16px"
      no-caps
      unelevated
      rounded
      class="primary-gradient primary-shadow text-white q-mt-md"
      @click="formStore.pushNewRow()"
    >
      <q-icon size="20px" name="o_add" class="q-mr-xs" />
      <div class="">{{ $t("shared.labels.addRow") }}</div>
    </q-btn>
  </template>
</template>

<script setup>
  import { ref, reactive } from "vue";
  import { sqlOperator } from "src/constants";
  import { helper } from "src/helpers";

  import NoItemSelected from "src/components/shared/dataTables/NoItemSelected.vue";
  import SlLookup from "src/components/shared/lookups/AccountSLLookup.vue";
  import DlLookup from "src/components/shared/lookups/AccountDLLookup.vue";
  import CommentLookup from "src/components/shared/Lookups/CommentLookup.vue";
  import CustomInputNumber from "src/components/shared/forms/CustomInputNumber.vue";
  import MobileVoucherItems from "../../mobile/forms/VoucherItems.vue";

  const props = defineProps({
    formStore: Object,
  });

  const dlRefs = ref([]);
  const expandedRows = reactive({});

  const setDlRef = (el) => {
    if (el) {
      dlRefs.value.push(el);
    }
  };

  const toggleRowDetails = (index) => {
    expandedRows[index] = !expandedRows[index];
  };

  const slChanged = (sl, row, index) => {
    const dlFilters = getDlFilters(row);
    if (dlRefs.value[index]) {
      dlRefs.value[index].lookup.tableStore.setFilterExpression(
        dlFilters,
      );
    }
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

  const swapRowValues = (index) => {
    const row = props.formStore.model.value.voucherItems[index];
    if (row) {
      const tempDebit = row.debit;
      row.debit = row.credit;
      row.credit = tempDebit;
    }
  };

  const swapAllRows = () => {
    props.formStore.model.value.voucherItems.forEach((row) => {
      const tempDebit = row.debit;
      row.debit = row.credit;
      row.credit = tempDebit;
    });
  };

  const duplicateRow = (index) => {
    const items = props.formStore.model.value.voucherItems;
    const currentRow = items[index];
    if (!currentRow) return;

    props.formStore.addNewRow(index);
    const newIndex = index + 1;
    const cloned = { ...currentRow };
    delete cloned.id;
    delete cloned.recordVersion;
    delete cloned.voucherId;
    delete cloned.createdBy;
    delete cloned.createdOn;
    delete cloned.modifiedBy;
    delete cloned.modifiedOn;
    props.formStore.editRow(newIndex, cloned);
  };
</script>

<style lang="scss" scoped>
  .expanded-row td {
    padding-top: 8px;
    padding-bottom: 8px;
  }

  th {
    background-color: #{$primary}10;
    border-bottom: 2px solid $primary;
  }

  .q-table td {
    vertical-align: top;
  }
</style>
