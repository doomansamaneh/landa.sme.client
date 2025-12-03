import { ref, nextTick } from "vue";

export function useFormItemsModel() {
  const newAddedItemIndex = ref(0);

  const handleFocus = (index) => {
    nextTick(() => {
      const autofocusElement = document.querySelector(
        '[data-autofocus="true"]'
      );
      if (autofocusElement) {
        autofocusElement.focus();
      }
    });
  };

  const addNewItem = (items, index, newItem) => {
    items.splice(index + 1, 0, newItem);
    newAddedItemIndex.value = index + 1;
    handleFocus(index + 1);
  };

  const pushNewItem = (items, newItem) => {
    items.push({ ...newItem });
    newAddedItemIndex.value = items.length - 1;
    handleFocus(items.length - 1);
  };

  const deleteItem = (items, index) => {
    if (index < 0) return;
    items.splice(index, 1);
    const newIndex = Math.min(index, items.length - 1);
    newAddedItemIndex.value = newIndex;
    handleFocus(newIndex);
  };

  const editItem = (items, index, item) => {
    const row = items[index];
    Object.assign(row, item);
  };

  return {
    newAddedItemIndex,
    pushNewItem,
    addNewItem,
    editItem,
    deleteItem,
  };
}
