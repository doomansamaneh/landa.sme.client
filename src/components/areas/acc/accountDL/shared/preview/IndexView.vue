<template>
  <!-- <tool-bar :inside="inside" buttons :title="title" back-button>
    <template #buttons>
      <menu-button-print @click="printStore.handlePrint()" />
    </template>
  </tool-bar> -->

  <q-card flat class="bordered shadow overflow-hidden">
    <card-title :title="title" icon="o_repeat" />

    <div :ref="printStore.printRef" v-if="model">
      <q-card-section>
        <header-section :model="model" />
      </q-card-section>

      <q-separator size="1px" />

      <q-card-section class="q-pa-none">
        <account-item
          flat
          :columns="accountItemColumns"
          :filter-expression="filterExpression"
          :title="title"
          :sub-title="model.code"
        />
      </q-card-section>
    </div>
  </q-card>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useRoute } from "vue-router";

  import { usePrint } from "src/composables/usePrint";
  import { useFormActions } from "src/composables/useFormActions";
  import { accountItemDLColumns } from "src/components/areas/acc/_composables/constants";
  import { sqlOperator } from "src/constants";
  // import { useDataTable } from "src/composables/useDataTable";

  // import ToolBar from "src/components/shared/ToolBarDesktop.vue";
  import HeaderSection from "./_HeaderSection.vue";
  import AccountItem from "src/components/areas/acc/report/desktop/AccountItem.vue";
  import CardTitle from "src/components/shared/CardTitle.vue";
  // import MenuButtonPrint from "src/components/shared/buttons/MenuButtonPrint.vue";

  const props = defineProps({
    item: Object,
    title: String,
    inside: Boolean,
  });

  const model = ref(null);
  const baseRoute = "acc/accountDL";
  const crudStore = useFormActions(baseRoute, model);
  const printStore = usePrint();
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

  // const tableStore = useDataTable({
  //   dataSource: "",
  //   store: null,
  // });

  onMounted(() => {
    crudStore.getById(id.value);
  });
</script>
