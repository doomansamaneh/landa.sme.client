<template>
  <tool-bar buttons :title="title" back-button :inside="inside">
    <template #buttons>
      <q-btn
        :to="`/crm/customer/edit/${id}`"
        class="primary-gradient primary-shadow text-white text-body2 no-letter-spacing"
        padding="6px 12px"
        rounded
        unelevated
        no-caps
      >
        <q-icon size="20px" name="o_edit" class="q-mr-xs" />
        {{ $t("shared.labels.edit") }}
        <!-- ({{ tableStore?.activeRow?.value?.code }}) -->
      </q-btn>
    </template>
  </tool-bar>

  <div class="q-mt-xl">
    <div class="row items-center justify-between">
      <div class="row items-center q-gutter-lg">
      <customer-avatar
        size="120px"
        text-color="white"
        :text-holder="model.name"
        text-holder-class="text-bold no-letter-spacing"
        :avatar="model.avatar"
        :item="model.id"
      />
      <div class="column q-mt-md">
        <q-item-label
          class="text-h3 text-weight-700 no-letter-spacing"
        >
          {{ model.name }}
        </q-item-label>
        <q-item-label
          class="caption-on-dark text-h6 no-letter-spacing"
        >
          {{ model.unitTitle }}
          <span v-if="model.jobTitle">/ {{ model.jobTitle }}</span>
        </q-item-label>
      </div>
    </div>

    <div class="row q-col-gutter-sm">
      <div class="col-md col-sm col-xs-12">
        <number-widget
          :value="balanceModel.debit"
          title="گردش بدهکار"
        />
      </div>

      <div class="col-md col-sm col-xs-12">
        <number-widget
          :value="balanceModel.credit"
          title="گردش بستانکار"
        />
      </div>

      <div class="col-md col-sm col-xs-12">
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


    <div class="row q-col-gutter-md q-mt-lg">
      <div class="col-md-12 col-sm-8 col-xs-12">
        <invoice-summary :customer-id="id" />
      </div>
    </div>

    <tabs :item="model" />
  </div>
</template>

<script setup>
  import { ref, computed, watch, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { helper } from "src/helpers";
  import { useQuasar } from "quasar";
  import { guidEmpty } from "src/constants";
  import { useFormActions } from "src/composables/useFormActions";
  import { useAccountDL } from "src/components/areas/acc/_composables/useAccountDL";

  import ToolBar from "src/components/shared/ToolBarDesktop.vue";
  import InvoiceSummary from "./_InvoiceSummary.vue";
  import NumberWidget from "src/components/areas/dashboard/widgets/NumberWidget.vue";
  import Tabs from "./_PreviewTabs.vue";
  import CustomerAvatar from "src/components/shared/CustomerAvatar.vue";

  const $q = useQuasar();

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
