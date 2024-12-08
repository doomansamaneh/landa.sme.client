<template>
  <tool-bar
    :inside="inside"
    buttons
    :title="title"
    back-button
  >
    <template #buttons>
      <q-btn
        @click="helper.print('invoicePreview')"
        class="text-body2 no-letter-spacing"
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
    <card-title title="گردش حساب" icon="o_repeat" />

    <div id="invoicePreview" v-if="model">
      <q-card-section>
        <header-section :model="model" />
      </q-card-section>

      <q-separator size="1px" />

      <q-card-section class="q-pa-none">
        <account-item
          flat
          :columns="accountItemColumns"
          :filter-expression="filterExpression"
        />
      </q-card-section>
    </div>
  </q-card>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useRoute } from "vue-router";

  import { helper } from "src/helpers";
  import { useFormActions } from "src/composables/useFormActions";
  import { accountItemDLColumns } from "src/components/areas/acc/_composables/constants";
  import { sqlOperator } from "src/constants";
  import { useDataTable } from "src/composables/useDataTable";

  import ToolBar from "src/components/shared/ToolBarDesktop.vue";
  import HeaderSection from "./_HeaderSection.vue";
  import AccountItem from "src/components/areas/acc/report/desktop/AccountItem.vue";
  import CardTitle from "src/components/shared/CardTitle.vue";

  const props = defineProps({
    item: Object,
    title: String,
    inside: Boolean,
  });

  const model = ref(null);
  const baseRoute = "acc/accountDL";
  const crudStore = useFormActions(baseRoute, model);
  const accountItemColumns = accountItemDLColumns;
  const filterExpression = computed(() => [
    {
      fieldName: "vi.dlId",
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
