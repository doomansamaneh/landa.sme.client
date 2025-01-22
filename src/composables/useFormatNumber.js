import { computed } from "vue";

export function useFormatNumber() {
  const props = defineProps({
    gridStore: Object,
  });

  const searchModel = computed(
    () => props.gridStore.state.searchModel.value
  );

  const doFormat = () => {
    searchModel.value.amountFrom = searchModel.value.amountFrom
      .replace(/\D/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return {
    searchModel,
    doFormat,
    props,
  };
}
