<template>
  <toolbar-container :inside="inside" :table-store="tableStore" :title="title"/>

  <div class="row items-center q-col-gutter-lg q-pb-lg">
    <div class="col-md row items-center q-gutter-md no-wrap">
      <customer-avatar
        size="120px"
        text-color="white"
        :text-holder="model.name"
        text-holder-class="text-bold no-letter-spacing"
        :avatar="model.avatar"
        :item="model.id"
      />
      <div>
        <div
          class="ellipsis-2-lines text-h4 line-height-lg text-weight-700 no-letter-spacing"
        >
          {{ model.name }}
        </div>
        <div
          class="ellipsis caption-on-dark text-h5 no-letter-spacing"
        >
          {{ model.unitTitle }}
          <span v-if="model.jobTitle">/ {{ model.jobTitle }}</span>
        </div>
      </div>
    </div>

    <div class="col-md-8">
      <div class="row q-col-gutter-lg">
        <div class="col-md-4 col-sm-4 col-xs-12">
          <number-widget
            :value="balanceModel.debit"
            title="گردش بدهکار"
          />
        </div>
        <div class="col-md-4 col-sm-4 col-xs-12">
          <number-widget
            :value="balanceModel.credit"
            title="گردش بستانکار"
          />
        </div>
        <div class="col-md-4 col-sm-4 col-xs-12">
          <number-widget
            v-if="balanceModel.creditRemained"
            :value="balanceModel.creditRemained"
            title="مانده بستانکار"
          />
          <number-widget
            v-else
            :value="balanceModel.debitRemained"
            title="مانده بدهکار"
          />
        </div>
      </div>
    </div>
  </div>

  <invoice-summary :customer-id="id" class="q-mb-lg" />

  <tabs :item="model" />
</template>

<script setup>
  import { ref, computed, watch, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { guidEmpty } from "src/constants";
  import { useFormActions } from "src/composables/useFormActions";
  import { useAccountDL } from "src/components/areas/acc/_composables/useAccountDL";

  import ToolbarContainer from "./ToolbarContainer.vue";
  import InvoiceSummary from "./_InvoiceSummary.vue";
  import NumberWidget from "src/components/areas/dashboard/widgets/NumberWidget.vue";
  import Tabs from "./_PreviewTabs.vue";
  import CustomerAvatar from "src/components/shared/CustomerAvatar.vue";

  const props = defineProps({
    item: Object,
    title: String,
    inside: Boolean,
  });

  const route = useRoute();
  const model = ref({});
  const balanceModel = ref({});
  const formStore = useFormActions("crm/customer", model);
  const accountDLStore = useAccountDL();

  const id = computed(() => props.item?.id ?? route.params.id);

  const loadData = async () => {
    await formStore.getById(id.value);
    balanceModel.value = await accountDLStore.getDlBalance(
      model.value.dlId ?? guidEmpty
    );
  };

  onMounted(() => {
    loadData();
  });

  watch(
    () => route.params.id,
    (newId) => {
      loadData(newId);
    }
  );
</script>
