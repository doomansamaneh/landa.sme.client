import { ref, onMounted } from "vue"
import { fetchWrapper } from "src/helpers";

const items = ref([])
const selectedCardIndex = ref([]);

export function useDataTable() {

  function getItems() {
    fetchWrapper
      .post("sls/invoice/getGridData", {
      })
      .then((response) => {
        handleResponse(response.data.data.items);
      });
  }

  function handleResponse(data) {
    items.value = data;
  }

  function selectCard(index) {
    const selectedIndex = selectedCardIndex.value.indexOf(index);
    if (selectedIndex === -1) {
      selectedCardIndex.value.push(index);
    } else {
      selectedCardIndex.value.splice(selectedIndex, 1);
    }

  }

  function isCardSelected(index) {
    return selectedCardIndex.value.includes(index);
  }

  onMounted(() => {
    getItems()
  })

  return {
    items,
    selectedCardIndex,
    getItems,
    handleResponse,
    selectCard,
    isCardSelected
  }
}
