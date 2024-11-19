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

  <div :style="marginTop()">
    <div class="row items-center q-gutter-md">
      <q-avatar
        v-if="model.avatar"
        color="primary"
        text-color="white"
        size="56px"
      >
        <img :src="model.avatar" />
      </q-avatar>

      <q-avatar
        size="56px"
        text-color="white"
        :style="helper.generateAvatarStyle(model.id)"
        v-else
      >
        <div class="char text-body1 text-bold">
          {{ helper.getFirstChar(model.name) }}
        </div>
      </q-avatar>
      <div class="column q-mt-md">
        <q-item-label
          class="text-body2 text-weight-700 no-letter-spacing"
        >
          {{ model.name }}
        </q-item-label>
        <q-item-label
          class="caption-on-dark text-body2 no-letter-spacing"
        >
          {{ model.unitTitle }}
          <span v-if="model.jobTitle">/ {{ model.jobTitle }}</span>
        </q-item-label>
      </div>
    </div>

    <div class="row q-col-gutter-md q-mt-lg">
      <!-- <div class="col"></div> -->
      <div class="col-md-2 col-sm col-xs-12">
        <number-widget
          :value="balanceModel.debit"
          title="گردش بدهکار"
        />
      </div>

      <div class="col-md-2 col-sm col-xs-12">
        <number-widget
          :value="balanceModel.credit"
          title="گردش بستانکار"
        />
      </div>

      <div class="col-md-2 col-sm col-xs-12">
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

      <div class="col-md-6 col-sm-8 col-xs-12">
        <invoice-summary :customer-id="id" />
      </div>
    </div>
  </div>

  <tabs :item="model" />
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

  const marginTop = () => {
    return [
      $q.screen.xs ? "margin-top:64px" : "",
      $q.screen.sm ? "margin-top:64px" : "",
      $q.screen.gt.sm ? "margin-top:56px" : "",
    ];
  };

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

<style lang="scss">
  .profile-section {
    width: 400px;
  }

  // .info-box:hover {
  //   border: 1px solid var(--q-primary) !important;
  //   cursor: pointer;
  // }
</style>
