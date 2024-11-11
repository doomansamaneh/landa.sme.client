import { ref, computed, watch } from "vue";

export function useDraggableWidgets(metaData) {
  const storageKey = "widgetsLayout";

  const widgets = ref(
    JSON.parse(localStorage.getItem(storageKey)) || [...metaData]
  );

  const draggedIndex = ref(null);
  const isShaking = ref(false);

  const onDragStart = (index) => {
    draggedIndex.value = index;
  };

  const onDrop = (index) => {
    if (draggedIndex.value !== null) {
      const draggedItem = widgets.value[draggedIndex.value];
      widgets.value.splice(draggedIndex.value, 1);
      widgets.value.splice(index, 0, draggedItem);
      draggedIndex.value = null;
      saveToLocalStorage();
    }
  };

  const toggleShake = () => {
    isShaking.value = !isShaking.value;
  };

  const isDefaultChanged = computed(() => {
    return JSON.stringify(widgets.value) !== JSON.stringify(metaData);
  });

  const resetToDefault = () => {
    widgets.value = [...metaData];
    saveToLocalStorage();
  };

  const saveToLocalStorage = () => {
    localStorage.setItem(storageKey, JSON.stringify(widgets.value));
  };

  watch(widgets, saveToLocalStorage, { deep: true });

  return {
    widgets,
    onDragStart,
    onDrop,
    isShaking,
    toggleShake,
    resetToDefault,
    isDefaultChanged,
  };
}
