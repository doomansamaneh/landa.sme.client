<template>
  <q-card flat class="bordered shadow overflow-hidden">
    <card-title
      :title="$t('shared.columns.dlTitle')"
      icon="o_repeat"
    />

    <div :ref="printStore.printRef" v-if="model">
      <q-card-section>
        <div class="row q-col-gutter-lg">
          <div class="col-md-4 col-sm-5 col-xs-12">
            <header-section :model="model" />
          </div>
          <div class="col-md-8 col-sm-7 col-xs-12">
            <dl-balance :key="id" :id="id" />
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section class="q-px-none">
        <account-item
          :key="id"
          flat
          :columns="accountItemColumns"
          :filter-expression="filterExpression"
          :title="title"
          :sub-title="model.code"
          data-source="acc/report/getItemAllData"
        />
      </q-card-section>
    </div>
  </q-card>
</template>

<script setup>
  import { ref, computed, onMounted, watch } from "vue";
  import { useRoute } from "vue-router";

  import { usePrint } from "src/composables/usePrint";
  import { useFormActions } from "src/composables/useFormActions";
  import { accountItemDLColumns } from "src/components/areas/acc/_composables/constants";
  import { sqlOperator } from "src/constants";

  import HeaderSection from "./_HeaderSection.vue";
  import DlBalance from "./DLBalance.vue";
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
  const printStore = usePrint();
  const accountItemColumns = accountItemDLColumns;
  const filterExpression = computed(() => [
    {
      fieldName: "vi.dlId",
      operator: sqlOperator.equal,
      value: id.value,
    },
  ]);

  const route = useRoute();
  const id = computed(() => props.item?.id ?? route.params.id);

  const loadData = async (id) => {
    await crudStore.getById(id);
  };

  onMounted(() => {
    loadData(id.value);
  });

  watch(
    () => route.params.id,
    (newId) => {
      loadData(newId);
    },
  );
</script>
