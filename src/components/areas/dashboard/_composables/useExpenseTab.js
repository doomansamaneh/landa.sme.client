import { ref, computed, watch, onMounted } from "vue";

const isShaking = ref(false);
const draggedIndex = ref(null);
const expenseStorageKey = "expenseWidgetsLayout";
const expenseHiddenWidgetsKey = "expenseHiddenWidgetsKey";

export function useExpenseTab(metaData = []) {
  const widgets = ref([]);
  const hiddenWidgets = ref([]);

  const loadWidgets = () => {
    widgets.value = JSON.parse(
      localStorage.getItem(expenseStorageKey)
    ) || [...metaData];
    hiddenWidgets.value =
      JSON.parse(localStorage.getItem(expenseHiddenWidgetsKey)) || [];
  };

  const onDragStart = (index) => {
    draggedIndex.value = index;
  };

  const onDrop = (index) => {
    if (draggedIndex.value !== null) {
      const draggedItem = widgets.value[draggedIndex.value];
      widgets.value.splice(draggedIndex.value, 1);
      widgets.value.splice(index, 0, draggedItem);
      draggedIndex.value = null;
    }
  };

  const resetCursor = () => {
    document.body.style.cursor = "default";
  };

  const toggleShake = () => {
    isShaking.value = !isShaking.value;
  };

  const resetToDefault = () => {
    widgets.value = [...metaData];
    hiddenWidgets.value = [];
    clearLocalStorage();
  };

  const saveLayoutToLocalStorage = () => {
    localStorage.setItem(
      expenseStorageKey,
      JSON.stringify(widgets.value)
    );
  };

  const saveHiddenWidgetsToLocalStorage = () => {
    localStorage.setItem(
      expenseHiddenWidgetsKey,
      JSON.stringify(hiddenWidgets.value)
    );
  };

  const clearLocalStorage = () => {
    localStorage.removeItem(expenseStorageKey);
    localStorage.removeItem(expenseHiddenWidgetsKey);
  };

  const hideWidget = (id) => {
    const widgetToHide = widgets.value.find(
      (widget) => widget.id === id
    );
    if (widgetToHide && !isWidgetHidden(id)) {
      hiddenWidgets.value.push(widgetToHide);
      widgets.value = widgets.value.filter(
        (widget) => widget.id !== id
      );
      saveLayoutToLocalStorage();
      saveHiddenWidgetsToLocalStorage();
    }
  };

  const isWidgetHidden = (id) =>
    hiddenWidgets.value.some((widget) => widget.id === id);

  const isDefaultChanged = computed(() => {
    const widgetIds = widgets.value.map((w) => w.id);
    const defaultIds = metaData.map((m) => m.id);
    return !widgetIds.every((id, index) => id === defaultIds[index]);
  });

  const saveLayoutChanges = () => {
    saveLayoutToLocalStorage();
    saveHiddenWidgetsToLocalStorage();
    isShaking.value = false;
  };

  onMounted(() => {
    loadWidgets();
  });

  return {
    widgets,
    hiddenWidgets,
    onDragStart,
    onDrop,
    isShaking,
    toggleShake,
    resetToDefault,
    isDefaultChanged,
    hideWidget,
    isWidgetHidden,
    resetCursor,
    saveLayoutChanges,
    loadWidgets,
  };
}
