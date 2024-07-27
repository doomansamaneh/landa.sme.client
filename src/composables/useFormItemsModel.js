import { ref, nextTick } from "vue";

export function useFormItemsModel() {
  const newAddedItemIndex = ref(0);

  const handleFocus = (index) => {
    nextTick(() => {
      const autofocusElement = document.querySelector(
        '[data-autofocus="true"]'
      );
      if (autofocusElement) {
        console.log(autofocusElement);
        autofocusElement.focus();
      }
    });
  };

  const addNewItem = (items, index, newItem) => {
    items.splice(index + 1, 0, newItem ?? defaultItem);
    newAddedItemIndex.value = index + 1;
    handleFocus(index + 1);
  };

  const pushNewItem = (items, newItem) => {
    items.push(newItem ?? defaultItem);
    newAddedItemIndex.value = items.length - 1;
    handleFocus(items.length - 1);
  };

  const deleteItem = (items, index) => {
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
