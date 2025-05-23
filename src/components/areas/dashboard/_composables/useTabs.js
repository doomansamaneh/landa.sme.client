import { ref, computed, watch, onMounted } from "vue";
import { useTabsState } from "./useTabsState";

export function useTabs(metaData = [], storageKeyPrefix = "widgets") {
  const state = useTabsState();
  const draggedIndex = ref(null);

  const widgets = ref([]);
  const hiddenWidgets = ref([]);

  const storageKey = `${storageKeyPrefix}Layout`;
  const hiddenWidgetsKey = `${storageKeyPrefix}HiddenWidgetsKey`;

  const loadWidgets = () => {
    widgets.value = JSON.parse(localStorage.getItem(storageKey)) || [
      ...metaData,
    ];
    hiddenWidgets.value =
      JSON.parse(localStorage.getItem(hiddenWidgetsKey)) || [];
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
    const currentTab = state.tab.value;
    state.shakingStates.value[currentTab] =
      !state.shakingStates.value[currentTab];
  };

  const resetToDefault = () => {
    widgets.value = [...metaData];
    hiddenWidgets.value = [];
    clearLocalStorage();
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

  const clearLocalStorage = () => {
    localStorage.removeItem(storageKey);
    localStorage.removeItem(hiddenWidgetsKey);
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
    const currentTab = state.tab.value;
    state.shakingStates.value[currentTab] = false;
  };

  onMounted(() => {
    loadWidgets();
  });

  return {
    widgets,
    hiddenWidgets,
    onDragStart,
    onDrop,
    state,
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
