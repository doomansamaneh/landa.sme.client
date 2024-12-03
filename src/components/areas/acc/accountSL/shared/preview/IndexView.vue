<template>
  <tool-bar :inside="inside" buttons :title="title" back-button>
    <template #buttons>
      <!-- <q-btn
        :to="`/trs/cash/edit/${id}`"
        class="primary-gradient primary-shadow text-white text-body2 no-letter-spacing"
        padding="6px 12px"
        rounded
        unelevated
        no-caps
      >
        <q-icon size="20px" name="o_edit" class="q-mr-xs" />
        {{ $t("shared.labels.edit") }}
      </q-btn> -->
      <q-btn
        @click="helper.print('invoicePreview')"
        class="primary-gradient primary-shadow text-white text-body2 no-letter-spacing"
        padding="6px 12px"
        rounded
        unelevated
        no-caps
      >
        <q-icon size="20px" name="o_print" class="q-mr-xs" />
        {{ $t("shared.labels.print") }}
      </q-btn>
    </template>
  </tool-bar>

  <q-card flat class="bordered shadow overflow-hidden">
    <div class="row justify-between primary-gradient-1">
      <div class="row items-center q-px-md">
        <q-avatar
          rounded
          text-color="white"
          icon="o_repeat"
          size="md"
          class="primary-gradient primary-shadow"
        />
        <card-title title="گردش حساب" />
      </div>
      <data-grid-toolbar class="q-pa-md" :table-store="tableStore" />
    </div>

    <q-separator size="0.5px" />

    <div id="invoicePreview" v-if="model">
      <q-card-section>
        <header-section :model="model" />
      </q-card-section>

      <account-item
        flat
        :columns="accountItemColumns"
        :filter-expression="filterExpression"
      />

      <q-separator />
    </div>
  </q-card>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useRoute } from "vue-router";

  import { helper } from "src/helpers";
  import { useFormActions } from "src/composables/useFormActions";
  import { accountItemSLColumns } from "src/components/areas/acc/_composables/constants";
  import { sqlOperator } from "src/constants";
  import { useDataTable } from "src/composables/useDataTable";

  import ToolBar from "src/components/shared/ToolBarDesktop.vue";
  import HeaderSection from "./_HeaderSection.vue";
  import CardTitle from "src/components/shared/CardTitle.vue";
  import AccountItem from "src/components/areas/acc/report/desktop/AccountItem.vue";
  import DataGridToolbar from "components/shared/dataTables/desktop/DataGridToolbar.vue";

  const props = defineProps({
    item: Object,
    title: String,
    inside: Boolean,
  });

  const model = ref(null);
  const baseRoute = "acc/accountSL";
  const crudStore = useFormActions(baseRoute, model);
  const accountItemColumns = accountItemSLColumns;
  const filterExpression = computed(() => [
    {
      fieldName: "vi.slId",
      operator: sqlOperator.equal,
      value: model?.value.id,
    },
  ]);

  const route = useRoute();
  const id = computed(() => props.item?.id ?? route.params.id);

  const tableStore = useDataTable({
    dataSource: "",
    store: null,
  });

  onMounted(() => {
    crudStore.getById(id.value);
  });
</script>
