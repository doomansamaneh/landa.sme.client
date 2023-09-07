import { ref } from "vue"
const globalCount = ref(0)

export function useTest() {
  const localCount = ref(0)
  const increamentLocal = () => {

    localCount.value += 10
  }
  const increamentGlobal = () => {
    globalCount.value += 10
  }

  return {
    globalCount,
    localCount,
    increamentGlobal,
    increamentLocal
  }
}
