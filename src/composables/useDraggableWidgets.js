import { ref, computed } from "vue";

export function useDraggableWidgets(initialWidgets) {
  const widgets = ref([...initialWidgets]);
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
    }
  };

  const toggleShake = () => {
      isShaking.value = !isShaking.value;
    },
    isDefaultChanged = computed(() => {
      return (
        JSON.stringify(widgets.value) !==
        JSON.stringify(initialWidgets)
      );
    }),
    resetToDefault = () => {
      widgets.value = [...initialWidgets];
    };

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