import { ref } from "vue"

const showHeader = ref(true)
let previousScrollPosition = 0

export function useHeader() {
  const handleScroll = () => {
    const currentPosition = window.pageYOffset || document.documentElement.scrollTop;
    showHeader.value = currentPosition <= 0 || currentPosition < previousScrollPosition;
    previousScrollPosition = currentPosition;
  };

  return {
    showHeader,
    previousScrollPosition,
    handleScroll
  }
}
