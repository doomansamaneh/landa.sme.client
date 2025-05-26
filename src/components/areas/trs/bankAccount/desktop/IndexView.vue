<template>
  <tool-bar
    :margin="!inside"
    :inside="inside"
    buttons
    :title="`${model?.bankTitle}`"
    back-button
  >
    <template #buttons>
      <menu-button-edit
        :to="`/trs/bankAccount/edit/${id}`"
        class="primary-gradient primary-shadow text-white text-body2"
      />
      <menu-button-copy :to="`/trs/bankAccount/copy/${id}`" />
      <menu-button-delete
        @click="crudStore.deleteById(id, deleteCallBack)"
      />
    </template>
  </tool-bar>

  <q-card flat bordered class="overflow-hidden">
    <div :ref="printStore.printRef" v-if="model">
      <q-card-section>
        <header-section :model="model" />
      </q-card-section>
      <q-separator />
      <account-item
        flat
        :columns="accountItemColumns"
        :filter-expression="filterExpression"
        :title="model.bankTitle"
        :sub-title="model.bankBranchTitle"
      />
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
  import HeaderSection from "../shared/preview/_HeaderSection.vue";
  import AccountItem from "src/components/areas/acc/report/desktop/AccountItem.vue";
  import MenuButtonCopy from "src/components/shared/buttons/MenuButtonCopy.vue";
  import MenuButtonDelete from "src/components/shared/buttons/MenuButtonDelete.vue";
  import MenuButtonEdit from "src/components/shared/buttons/MenuButtonEdit.vue";

  const props = defineProps({
    item: Object,
    title: String,
    inside: Boolean,
  });

  const model = ref(null);
  const baseRoute = "trs/bankAccount";
  const crudStore = useFormActions(baseRoute, model);
  const printStore = usePrint();
  const accountItemColumns = accountItemDLColumns;
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
