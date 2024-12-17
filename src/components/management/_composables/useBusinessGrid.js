import { ref } from "vue";
import { useRouter } from "vue-router";
import { fetchWrapper } from "src/helpers";
import { useBusiness } from "src/stores/useBusiness";
import { useAppConfigModel } from "src/components/areas/cmn/_composables/useAppConfigModel";
import { HttpStatusCode } from "axios";

const rows = ref([]);

const state = {
  firstLoad: ref(false),
  rows: ref([]),
  allSelectedIds: ref([]),
  activeRow: ref(null),
  summaryData: ref(null),
  searchModel: ref(null),
};

const pagination = ref({
  currentPage: 1,
  pageSize: 5,
  sortColumn: "title",
  searchField: "title",
  sortOrder: 1,
  totalItems: 0,
  searchTerm: "",
  searchModel: "",
  filterExpression: [],
});

const columns = ref([
  {
    name: "name",
    field: "name",
  },
  {
    name: "title",
    field: "title",
  },
  {
    name: "planTitle",
    field: "planTitle",
  },
]);

export function useBusinessGrid() {
  const router = useRouter();
  const appConfigStore = useAppConfigModel(true);
  const businessStore = useBusiness();

  const reset = () => {
    state.firstLoad.value = false;
    setDefaultSearchModel();
  };

  const gotoBusiness = async (item) => {
    await fetchWrapper
      .post(`business/gotoBusiness/${item.id}`, null, true)
      .then(async (response) => {
        if (response.data.code === HttpStatusCode.Ok) {
          appConfigStore.reset();
          await initBusiness(item);
        }
      });
  };

  const initBusiness = async (item) => {
    await fetchWrapper
      .post(`business/InitBusiness/${item.id}`)
      .then((response) => {
        const data = response.data.data;
        if (response.data.code === HttpStatusCode.Ok) {
          businessStore.set({ id: item.id, title: data.title });
        }
        if (data.url) router.push(data.url);
        else {
          alert(`goto business: ${data.message}`);
        }
      });
  };

  const setDefaultSearchModel = () => {
    state.searchModel.value = {};
  };

  return {
    rows,
    columns,
    pagination,
    state,

    setDefaultSearchModel,
    gotoBusiness,
    reset,
  };
}
