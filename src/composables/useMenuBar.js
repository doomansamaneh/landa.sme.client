import { ref, computed, watch } from "vue";
import { useI18n } from "vue-i18n";
import { fetchWrapper } from "src/helpers";

const state = {
  firstLoad: ref(true),
  visible: ref(true),
  items: ref([]),
};

const showLoader = ref(false);

const searchText = ref("");

export function useMenuBar() {
  const { t, locale } = useI18n();

  const reset = () => {
    state.firstLoad.value = true;
    state.items.value = [];
  };

  const toggle = () => {
    state.visible.value = !state.visible.value;
  };

  //todo: what is this for
  watch(locale, () => {
    //alert("locale changed");
    setMenuTitle();
  });

  async function loadData() {
    if (state.firstLoad.value) {
      await reloadData();
      state.firstLoad.value = false;
    }
  }

  async function reloadData() {
    showLoader.value = true;
    const response = await fetchWrapper.get(
      "scr/users/getMenuItems",
      undefined,
      true
    );
    handleMenuItemsData(response.data.data);
    showLoader.value = false;
  }

  function handleMenuItemsData(data) {
    state.items.value = data;
    setMenuTitle();
  }

  function setMenuTitle() {
    state.items.value.forEach((item) => {
      item.title = t(`main-menu-items.${item.name}`);
    });
  }

  const drawerMenuItems = computed(() => {
    const menuItemsWithSubItems = state.items.value.filter((item) =>
      state.items.value.some(
        (subItem) => subItem.parentName === item.name
      )
    );

    const menuItemsIncludingSubItems = menuItemsWithSubItems.map(
      (item) => ({
        ...item,
        subItems: state.items.value.filter(
          (subItem) => subItem.parentName === item.name
        ),
      })
    );

    if (!searchText.value || searchText.value.trim() === "") {
      return menuItemsIncludingSubItems;
    } else {
      const searchLower = searchText.value.toLowerCase();
      return menuItemsIncludingSubItems
        .map((item) => {
          const menuItemsWithSubItems = item.subItems.filter(
            (subItem) =>
              subItem.title.toLowerCase().includes(searchLower) ||
              subItem.name.toLowerCase().includes(searchLower)
          );

          if (
            menuItemsWithSubItems.length > 0 ||
            item.title.toLowerCase().includes(searchLower)
          ) {
            return {
              ...item,
              subItems: menuItemsWithSubItems,
            };
          } else {
            return null;
          }
        })
        .filter(Boolean);
    }
  });

  return {
    state,
    drawerMenuItems,
    searchText,

    reset,
    toggle,
    loadData,
    reloadData,
    showLoader,
  };
}
