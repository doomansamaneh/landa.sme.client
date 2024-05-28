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

  <div id="invoicePreview" v-if="model">
    <header-section :model="model" />
    <account-item
      :columns="accountItemColumns"
      :filter-expression="filterExpression"
    />
  </div>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useRoute } from "vue-router";

  import { helper } from "src/helpers";
  import { useFormActions } from "src/composables/useFormActions";
  import { accountItemSLColumns } from "src/components/areas/acc/_composables/constants";
  import { sqlOperator } from "src/constants";

  import ToolBar from "src/components/shared/ToolBarDesktop.vue";
  import HeaderSection from "./_HeaderSection.vue";
  import AccountItem from "src/components/areas/acc/report/desktop/AccountItem.vue";

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

  onMounted(() => {
    crudStore.getById(id.value);
  });
</script>
