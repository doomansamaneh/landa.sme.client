import { ref, computed, watch } from "vue";

const isShaking = ref(false);
const draggedIndex = ref(null);
const storageKey = "widgetsLayout";
const hiddenWidgetsKey = "hiddenWidgets";

export function useDraggableWidgets(metaData) {
  const widgets = ref(
    JSON.parse(localStorage.getItem(storageKey)) || [] //[...metaData]
  );
  const hiddenWidgets = ref(
    JSON.parse(localStorage.getItem(hiddenWidgetsKey)) || []
  );

  const onDragStart = (index) => {
    draggedIndex.value = index;
  };

  const onDrop = (index) => {
    if (draggedIndex.value !== null) {
      const draggedItem = widgets.value[draggedIndex.value];
      widgets.value.splice(draggedIndex.value, 1);
      widgets.value.splice(index, 0, draggedItem);
      draggedIndex.value = null;
      saveLayoutToLocalStorage();
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
    localStorage.removeItem(hiddenWidgetsKey);
    saveLayoutToLocalStorage();
    saveHiddenWidgetsToLocalStorage();
  };

  const saveLayoutToLocalStorage = () => {
    localStorage.setItem(storageKey, JSON.stringify(widgets.value));
  };

  const saveHiddenWidgetsToLocalStorage = () => {
    localStorage.setItem(
      hiddenWidgetsKey,
      JSON.stringify(hiddenWidgets.value)
    );
  };

  const hideWidget = (id) => {
    const widgetToHide = widgets.value.find(
      (widget) => widget.id === id
    );
    if (widgetToHide && !isWidgetHidden(id)) {
      hiddenWidgets.value.push(widgetToHide);
      saveHiddenWidgetsToLocalStorage();
      widgets.value = widgets.value.filter(
        (widget) => widget.id !== id
      );
      saveLayoutToLocalStorage();
    }
  };

  const isWidgetHidden = (id) => {
    return hiddenWidgets.value.some((widget) => widget.id === id);
  };

  const isDefaultChanged = computed(() => {
    const widgetIds = widgets.value.map((w) => w.id);
    const defaultIds = metaData.map((m) => m.id);
    return !widgetIds.every((id, index) => id === defaultIds[index]);
  });

  watch(
    [widgets, hiddenWidgets],
    () => {
      saveLayoutToLocalStorage();
      saveHiddenWidgetsToLocalStorage();
    },
    { deep: true }
  );

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
  };
}
