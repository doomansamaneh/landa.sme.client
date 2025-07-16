<template>
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
