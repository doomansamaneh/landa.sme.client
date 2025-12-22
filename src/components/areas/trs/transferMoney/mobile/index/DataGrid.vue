<template>
  <data-grid
    :data-table-store="tableStore"
    :create-url="`/${baseRoute}/create`"
    :base-route="baseRoute"
    show-avatar
    avatar-field="fromTitle"
    show-badge_
  >
    <template #header>
      <q-input
        outlined
        rounded
        dense
        class="searchbox text-body2"
        v-model="pagination.searchTerm"
        :placeholder="$t('page.card-searchbar')"
        @keydown.enter="resetPage"
      >
        <template #prepend>
          <q-icon
            name="search"
            class="search-icon cursor-pointer"
            size="sm"
            color="primary"
          />
        </template>

        <template #append>
          <q-icon
            v-if="!isSearchEmpty"
            name="clear"
            class="cursor-pointer"
            size="16px"
            color="primary"
            @click="clearSearch"
          />
          <q-btn
            no-caps
            round
            unelevated
            dense
            icon="o_refresh"
            size="12px"
            class="text-on-dark"
            @click="resetPage"
          />
        </template>
      </q-input>
    </template>

    <template #row-avatar-title="{ item }">
      {{
        helper.getFirstChar(
          item.customerName ?? item.amount.toString()
        )
      }}
    </template>

    <template #row-body="{ item }">
      <div class="row justify-between">
        <div class="col ellipsis text-body3 text-weight-500">
          {{ $t("shared.labels.fromTitle") }}: {{ item.fromTitle }}
        </div>
      </div>
      <div class="col ellipsis text-body3 text-weight-500_">
        {{ $t("shared.labels.toTitle") }}: {{ item.toTitle }}
      </div>

      <div class="ellipsis-2-lines text-body1 text-bold">
        {{ helper.formatNumber(item.amount) }}
        <span class="text-caption">
          {{ item.currencyTitle ?? "ریال" }}
        </span>
      </div>

      <div class="row q-gutter-x-xs text-caption">
        <div>{{ item.rowNo }}#</div>
        <div class="row items-center q-gutter-xs">
          <q-icon name="o_schedule" />
          <div>{{ helper.formatPersianDate(item.date) }}</div>
          <div class="ellipsis-2-lines text-caption-sm_">
            / {{ item.subject }} {{ item.summary }}
          </div>
        </div>
      </div>
    </template>

    <template #row-badge="{ item }">
      <contract-badge :title="item.contractTitle" />
    </template>

    <template #row-toolbar="{ item }">
      <mobile-row-toolbar
        :title="`${item.subject}`"
        :menu-items="getItemMenu(item)"
      />
    </template>
  </data-grid>
</template>

<script setup>
  import { computed } from "vue";
  import { helper } from "src/helpers";
  import { useDataTable } from "src/composables/useDataTable";

  import { usePreviewMenuContext } from "src/components/areas/_shared/menus/usePreviewMenuContext";
  import { useTransferMoneyPreviewMenu } from "../../../_menus/useTransferMoneyPreviewMenu";

  import MobileRowToolbar from "src/components/shared/toolbars/MobileRowToolbar.vue";
  import DataGrid from "components/shared/dataTables/mobile/DataGrid.vue";
  import ContractBadge from "src/components/areas/_shared/badges/ContractBadge.vue";
  import RowNoBadge from "src/components/areas/_shared/badges/RowNoBadge.vue";

  const props = defineProps({
    tableStore: useDataTable,
    baseRoute: String,
    title: String,
  });

  const pagination = computed(
    () => props.tableStore?.pagination?.value
  );
  const isSearchEmpty = computed(
    () => !pagination.value?.searchTerm?.trim()
  );

  async function resetPage() {
    if (pagination.value) {
      pagination.value.currentPage = 1;
      await props.tableStore?.reloadData();
    }
  }

  async function clearSearch() {
    if (pagination.value) {
      pagination.value.searchTerm = "";
      await resetPage();
    }
  }

  function getItemMenu(item) {
    const context = usePreviewMenuContext(item, props.baseRoute, {
      onDeleteSuccess: async () =>
        await props.tableStore?.reloadData(),
    });
    return useTransferMoneyPreviewMenu(context.value);
  }
</script>
