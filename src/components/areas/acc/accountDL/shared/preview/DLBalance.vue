<template>
  <div class="row q-col-gutter-lg">
    <div class="col-md-4 col-sm-4 col-xs-12">
      <number-widget
        :value="balanceModel.debit"
        :title="$t('shared.columns.debit')"
      />
    </div>
    <div class="col-md-4 col-sm-4 col-xs-12">
      <number-widget
        :value="balanceModel.credit"
        :title="$t('shared.columns.credit')"
      />
    </div>
    <div class="col-md-4 col-sm-4 col-xs-12">
      <div class="text-negative prmary-shadow">
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
  </div>
</template>

<script setup>
  import { ref, watch, onMounted } from "vue";
  import { useAccountDL } from "src/components/areas/acc/_composables/useAccountDL";

  import NumberWidget from "src/components/areas/dashboard/widgets/NumberWidget.vue";

  const props = defineProps({
    id: String,
  });

  const balanceModel = ref({});
  const accountDLStore = useAccountDL();

  const loadData = async () => {
    if (props.id)
      balanceModel.value = await accountDLStore.getDlBalance(
        props.id,
      );
  };

  onMounted(() => {
    loadData();
  });

  watch(
    () => props.model,
    () => {
      loadData();
    },
  );
</script>
