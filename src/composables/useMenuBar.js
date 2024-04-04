import { ref, computed, watch } from "vue"
import { useI18n } from "vue-i18n"
import { fetchWrapper } from "src/helpers"
import { useComposables } from "src/stores/useComposables"

const state = {
  firstLoad: ref(false),
  visible: ref(true),
  items: ref([])
}

const searchText = ref("")

export function useMenuBar() {
  const composablesStore = useComposables()
  composablesStore.registerComposable({
    reset: () => {
      state.firstLoad.value = false
    }
  })

  const { t, locale } = useI18n()

  const toggle = () => {
    state.visible.value = !state.visible.value
  }

  // Watch for changes in locale and reload data accordingly
  watch(locale, () => {
    state.firstLoad.value = false // Reset firstLoad to trigger data reload
    loadData()
  })

  async function loadData() {
    if (!state.firstLoad.value) {
      await reloadData()
      state.firstLoad.value = true
    }
  }

  async function reloadData() {
    await fetchWrapper
      .get("scr/users/getMenuItems")
      .then((response) => {
        handleMenuItemsData(response.data.data)
      })
      .finally(() => { })
  }

  function handleMenuItemsData(data) {
    data.forEach((item) => {
      item.title = t(`main-menu-items.${item.name}`)
    })
    state.items.value = data
  }

  const drawerMenuItems = computed(() => {
    const menuItemsWithSubItems = state.items.value.filter((item) =>
      state.items.value.some((subItem) => subItem.parentName === item.name)
    )

    const menuItemsIncludingSubItems = menuItemsWithSubItems.map((item) => ({
      ...item,
      subItems: state.items.value.filter((subItem) => subItem.parentName === item.name)
    }))

    if (!searchText.value
      || searchText.value.trim() === "") {
      return menuItemsIncludingSubItems
    } else {
      const searchLower = searchText.value.toLowerCase()
      return menuItemsIncludingSubItems
        .map((item) => {
          const menuItemsWithSubItems = item.subItems.filter((subItem) =>
            subItem.title.toLowerCase().includes(searchLower) || subItem.name.toLowerCase().includes(searchLower)
          )

          if (
            menuItemsWithSubItems.length > 0 ||
            item.title.toLowerCase().includes(searchLower)
          ) {
            return {
              ...item,
              subItems: menuItemsWithSubItems
            }
          } else {
            return null
          }
        })
        .filter(Boolean)
    }
  })


  return {
    state,
    drawerMenuItems,
    searchText,

    toggle,
    loadData,
    reloadData
  }
}
