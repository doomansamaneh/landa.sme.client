<template>
  <div class="row q-col-gutter-lg">
    <div class="col-md-4 col-sm-4 col-xs-12">
      <number-widget
        :value="balanceModel.debit"
        :title="$t('shared.labels.debitTurnover')"
      />
    </div>
    <div class="col-md-4 col-sm-4 col-xs-12">
      <number-widget
        :value="balanceModel.credit"
        :title="$t('shared.labels.creditTurnover')"
      />
    </div>
    <div class="col-md-4 col-sm-4 col-xs-12">
      <number-widget
        v-if="balanceModel.creditRemained"
        :value="balanceModel.creditRemained"
        :title="$t('shared.labels.creditBalance')"
      />
      <number-widget
        v-else
        :value="balanceModel.debitRemained"
        :title="$t('shared.labels.debitBalance')"
      />
    </div>
  </div>
</template>

<script setup>
  import { ref, watch, onMounted } from "vue";
  import { guidEmpty } from "src/constants";
  import { useAccountDL } from "src/components/areas/acc/_composables/useAccountDL";

  import NumberWidget from "src/components/areas/dashboard/widgets/NumberWidget.vue";

  const props = defineProps({
    model: Object,
  });

  const balanceModel = ref({});
  const accountDLStore = useAccountDL();

  const loadData = async () => {
    balanceModel.value = await accountDLStore.getDlBalance(
      props.model?.dlId ?? guidEmpty
    );
  };

  onMounted(() => {
    loadData();
  });

  watch(
    () => props.model,
    () => {
      loadData();
    }
  );
</script>
