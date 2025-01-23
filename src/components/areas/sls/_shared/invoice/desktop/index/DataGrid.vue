<template>
  <data-grid
    :data-table-store="tableStore"
    flat_
    bordered_
    multiSelect
    dense
    toolbar_
    numbered
    wrapCells_
    expandable
    :title="title"
    @row-dbl-click="gotoPreview"
    :no-fullscreen="noFullscreen"
  >
    <template #filter-statusId="{ item }">
      <custom-select
        v-model="item.value"
        :options="helper.getEnumOptions(quoteStatus, 'quoteStatus')"
        @update:model-value="reloadData"
      />
    </template>
    <template #cell-no="{ item }">
      <span>{{ item.no }}</span>
      <tax-badge :tax-id="item.taxId" />
      <notification-badge :count="item.notificationCount" />
    </template>
    <template #cell-amount="{ item }">
      <q-btn
        v-if="item.statusId === voucherStatus.canceled"
        round
        text-color="white"
        dense
        size="9px"
        unelevated
        icon="clear"
        class="q-mr-xs red-gradient red-shadow no-pointer-events"
      />
      <span class="text-weight-600">
        {{ helper.formatNumber(item.amount) }}
      </span>
    </template>
    <template #cell-customerName="{ item }">
      <div class="row items-center no-wrap q-gutter-sm">
        <customer-avatar
          size="32px"
          text-color="white"
          :item="item.customerId"
          :text-holder="item.customerName"
          text-holder-class="text-body2 text-bold no-letter-spacing"
          :avatar="avatar"
        />

        <div class="q-mt-sm">
          <span v-if="item.customerCode && item.customerCode !== '-'">
            {{ item.customerCode }} -
          </span>

          <span>{{ item.customerName }}</span>
        </div>
      </div>
    </template>
    <template #cell-payedAmount="{ item }">
      <span>{{ helper.formatNumber(item.payedAmount) }}</span>
    </template>
    <template #cell-remainedAmount="{ item }">
      <span>{{ helper.formatNumber(item.remainedAmount) }}</span>
    </template>
    <template #cell-discountAmount="{ item }">
      <span>{{ helper.formatNumber(item.discountAmount) }}</span>
    </template>
    <template #cell-subject="{ item }">
      <div>{{ item.subject }}</div>
      <div v-if="item.summary" class="text-caption-sm">
        {{ item.summary }}
      </div>
      <div class="q-gutter-x-sm">
        <type-badge :title="item.typeTitle" />
        <contract-badge
          :title="item.contractTitle"
          :id="item.contractId"
        />
      </div>
    </template>
    <template #cell-statusId="{ item }">
      <is-active
        v-if="item.statusId === quoteStatus.final"
        is-active
      />
      {{
        $t(
          `shared.quoteStatus.${helper.getEnumType(
            item.statusId,
            quoteStatus
          )}`
        )
      }}
    </template>
    <template #expand="{ item }">
      <div>
        <slot name="expand" :item="item"></slot>
      </div>
    </template>

    <template #footer-subtotal="{ selectedRows }">
      <td :colspan="colspan" class="text-right">
        {{ $t("shared.labels.selectedRows") }}
      </td>
      <td>
        <b>
          {{
            helper.formatNumber(
              helper.getSubtotal(selectedRows, "amount")
            )
          }}
        </b>
      </td>
      <td v-if="showDiscount">
        <b>
          {{
            helper.formatNumber(
              helper.getSubtotal(selectedRows, "discountAmount")
            )
          }}
        </b>
      </td>
      <td v-if="showPayed">
        <b>
          {{
            helper.formatNumber(
              helper.getSubtotal(selectedRows, "payedAmount")
            )
          }}
        </b>
      </td>
      <td v-if="showRemained">
        <b>
          {{
            helper.formatNumber(
              helper.getSubtotal(selectedRows, "remainedAmount")
            )
          }}
        </b>
      </td>
      <td colspan="100%"></td>
    </template>

    <template #footer-total="{ summary }">
      <td :colspan="colspan" class="text-right">
        {{ $t("shared.labels.total") }}
      </td>
      <td>
        <b>{{ helper.formatNumber(summary?.amount) }}</b>
      </td>
      <td v-if="showDiscount">
        <b>{{ helper.formatNumber(summary?.discountAmount) }}</b>
      </td>
      <td v-if="showPayed">
        <b>{{ helper.formatNumber(summary?.payedAmount) }}</b>
      </td>
      <td v-if="showRemained">
        <b>{{ helper.formatNumber(summary?.remainedAmount) }}</b>
      </td>

      <td colspan="100%"></td>
    </template>
  </data-grid>
</template>

<script setup>
  import { computed } from "vue";
  import { useRouter } from "vue-router";
  import { quoteStatus, voucherStatus } from "src/constants";
  import { helper } from "src/helpers";

  import DataGrid from "components/shared/dataTables/desktop/DataGrid.vue";
  import CustomSelect from "components/shared/forms/CustomSelect.vue";
  import ContractBadge from "src/components/areas/_shared/badges/ContractBadge.vue";
  import TypeBadge from "src/components/areas/_shared/badges/TypeBadge.vue";
  import NotificationBadge from "src/components/areas/_shared/badges/NotificationBadge.vue";
  import TaxBadge from "src/components/areas/_shared/badges/TaxBadge.vue";
  import IsActive from "src/components/shared/IsActive.vue";
  import CustomerAvatar from "src/components/shared/CustomerAvatar.vue";

  const props = defineProps({
    tableStore: Object,
    baseRoute: String,
    title: String,
    noFullscreen: Boolean,
  });

  const router = useRouter();

  const colspan = computed(
    () =>
      helper.findIndex(
        props.tableStore.columns.value,
        "name",
        "amount"
      ) +
      1 + //numbered column
      1 //multi check column
  );

  const showPayed = computed(
    () =>
      helper.findIndex(
        props.tableStore.columns.value,
        "name",
        "payedAmount"
      ) >= 0

    // props.tableStore.columns.value.findIndex(
    //   (column) => column.name === "payedAmount"
    // ) >= 0
  );

  const showDiscount = computed(
    () =>
      props.tableStore.columns.value.findIndex(
        (column) => column.name === "discountAmount"
      ) >= 0
  );

  const showRemained = computed(
    () =>
      props.tableStore.columns.value.findIndex(
        (column) => column.name === "remainedAmount"
      ) >= 0
  );

  async function reloadData() {
    await props.tableStore.reloadData();
  }

  function gotoPreview(row) {
    router.push(`/${props.baseRoute}/preview/${row.id}`);
  }
</script>
