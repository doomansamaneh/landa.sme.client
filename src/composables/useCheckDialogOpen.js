import { ref, onMounted, onBeforeUnmount } from "vue";

const hasScrollbarClass = ref(false);

export function useCheckDialogOpen() {
  const checkScrollbarClass = () => {
    return document.body.classList.contains(
      "q-body--force-scrollbar-y"
    );
  };

  const handleClassChange = () => {
    const currentClassExists = checkScrollbarClass();
    if (currentClassExists !== hasScrollbarClass.value) {
      hasScrollbarClass.value = currentClassExists;
    }

    if (currentClassExists) console.log("True");
  };

  let observer;

  onMounted(() => {
    hasScrollbarClass.value = checkScrollbarClass();

    observer = new MutationObserver(handleClassChange);
    observer.observe(document.body, {
      attributes: true,
      childList: true,
      subtree: true,
    });
  });

  onBeforeUnmount(() => {
    if (observer) {
      observer.disconnect();
    }
  });

  return {
    hasScrollbarClass,
  };
}
