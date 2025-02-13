<template>
  <tool-bar :inside="inside" buttons :title="title" back-button>
    <template #buttons>
      <menu-button-edit
        :to="`/trs/cash/edit/${id}`"
        class="primary-gradient primary-shadow text-white text-body2"
      />
      <menu-button-copy :to="`/trs/cash/copy/${id}`" />
      <menu-button-delete
        @click="crudStore.deleteById(id, deleteCallBack)"
      />
      <menu-button-print @click="printStore.handlePrint()" />
    </template>
  </tool-bar>

  <q-card>
    <card-title title="صندوق نقدی" />
    <div :ref="printStore.printRef" v-if="model">
      <q-card-section>
        <header-section :model="model" />
      </q-card-section>
      <q-card-section class="q-px-none">
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
  import { useRoute, useRouter } from "vue-router";

  import { usePrint } from "src/composables/usePrint";
  import { useFormActions } from "src/composables/useFormActions";
  import { accountItemDLColumns } from "src/components/areas/acc/_composables/constants";
  import { sqlOperator } from "src/constants";

  import ToolBar from "src/components/shared/ToolBarDesktop.vue";
  import HeaderSection from "./_HeaderSection.vue";
  import AccountItem from "src/components/areas/acc/report/desktop/AccountItem.vue";
  import CardTitle from "src/components/shared/CardTitle.vue";
  import MenuButtonCopy from "src/components/shared/buttons/MenuButtonCopy.vue";
  import MenuButtonDelete from "src/components/shared/buttons/MenuButtonDelete.vue";
  import MenuButtonEdit from "src/components/shared/buttons/MenuButtonEdit.vue";
  import MenuButtonPrint from "src/components/shared/buttons/MenuButtonPrint.vue";

  const props = defineProps({
    item: Object,
    title: String,
    inside: Boolean,
  });

  const model = ref(null);
  const baseRoute = "trs/cash";
  const crudStore = useFormActions(baseRoute, model);
  const accountItemColumns = accountItemDLColumns;
  const printStore = usePrint();
  const filterExpression = computed(() => [
    {
      fieldName: "vi.dlId",
      operator: sqlOperator.equal,
      value: model?.value.dlId,
    },
  ]);

  const route = useRoute();
  const router = useRouter();

  const id = computed(() => props.item?.id ?? route.params.id);

  function deleteCallBack() {
    router.back();
  }

  onMounted(() => {
    crudStore.getById(id.value);
  });
</script>
