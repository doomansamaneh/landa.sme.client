<template>
  <q-drawer
    bordered
    side="right"
    v-model="contactDrawerStore.state.value"
    overlay
    :width="$q.screen.gt.xs ? 350 : deviceWidth"
    :breakpoint="500"
    class="no-scroll"
    :class="$q.dark.isActive ? 'bg-dark' : 'bg-light'"
  >
    <q-inner-loading
      :showing="tableStore.showLoader.value"
      class="transparent z-max"
    >
      <q-spinner size="52px" color="primary" />
    </q-inner-loading>

    <div
      class="row items-center justify-between q-gutter-md q-px-md q-py-lg"
    >
      <div class="col">
        <q-input
          inputmode="search"
          color="grey-5"
          outlined
          v-model="tableStore.pagination.value.searchTerm"
          :placeholder="$t('shared.labels.contactSearch')"
          dense
          clearable
          clear-icon="o_clear"
          rounded
          @keydown.enter="loadData"
          class="text-body2 no-letter-spacing"
        >
          <template v-slot:prepend>
            <q-icon name="o_search" color="primary" />
          </template>
        </q-input>
      </div>
      <div v-if="$q.screen.lt.md" class="col-1">
        <q-btn
          round
          unelevated
          text-color="white"
          class="red-gradient red-shadow col-1"
          padding="5px"
          @click="contactDrawerStore.toggle"
        >
          <q-icon size="16px" name="o_close" />
        </q-btn>
      </div>
    </div>

    <q-scroll-area
      :style="
        $q.screen.gt.xs
          ? 'height: calc(100vh - 180px);'
          : 'height: calc(100vh - 120px);'
      "
      :thumb-style="helper.thumbStyle"
      :bar-style="helper.barStyle"
    >
      <q-item
        v-for="(row, index) in customerStore.rows.value"
        :to="`/crm/customer/preview/${row.id}`"
        :key="index"
        clickable
        v-close-popup
        class="text-on-dark"
      >
        <div class="row items-center q-my-xs q-pl-sm">
          <q-item-section avatar>
            <q-avatar
              v-if="row.avatar"
              color="primary"
              text-color="white"
              size="52px"
              square
              class="border-radius-xs"
            >
              <img :src="row.avatar" />
            </q-avatar>

            <q-avatar
              size="52px"
              text-color="white"
              square
              class="border-radius-xs"
              :style="helper.generateAvatarStyle(row.id)"
              v-else
            >
              <div class="char text-body1 text-bold">
                {{ helper.getFirstChar(row.name) }}
              </div>
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label
              class="ellipsis text-on-caption text-caption text-bold q-py-xs"
              style="width: 200px"
            >
              {{ row.code }} {{ row.name }}
            </q-item-label>
            <div
              v-if="row.locationName"
              class="ellipsis text-body3 no-letter-spacing q-mt-xs"
              style="width: 200px"
            >
              <q-icon
                name="o_location_on"
                size="13px"
                color="primary"
              />
              {{ row.locationName }} {{ row.address }}
            </div>
            <div class="row items-center q-gutter-xs">
              <div
                class="flex text-body3 no-letter-spacing items-center rtl"
                v-if="row.phoneNo"
              >
                {{ helper.separatePhoneNumbers(row.phoneNo) }}
                <q-icon
                  name="o_phone"
                  class="q-mr-xs"
                  color="primary"
                  size="13px"
                />
              </div>
              <div
                class="flex text-body3 no-letter-spacing items-center rtl"
                v-if="row.mobileNo"
              >
                {{ helper.separatePhoneNumbers(row.mobileNo) }}
                <q-icon
                  name="o_phone_android"
                  class="q-mr-xs"
                  color="primary"
                  size="13px"
                />
              </div>
            </div>
          </q-item-section>
        </div>
      </q-item>

      <div
        v-if="
          !tableStore.showLoader.value &&
          customerStore.rows.value.length === 0
        "
        class="text-on-dark"
      >
        <no-data-found />
      </div>

      <div class="row justify-center" v-if="hasMoreData">
        <q-btn
          rounded
          unelevated
          @click="gotoNext"
          class="primary-shadow q-ma-lg primary-gradient text-white"
        >
          <span class="text-body3">
            {{ $t("shared.labels.loadMore") }} ...
          </span>
        </q-btn>
      </div>
    </q-scroll-area>
  </q-drawer>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { useDataTable } from "src/composables/useDataTable";
  import { useContactDrawer } from "src/composables/useContactDrawer";
  import { helper } from "src/helpers";

  import NoDataFound from "src/components/shared/dataTables/NoDataFound.vue";

  const contactDrawerStore = useContactDrawer();

  const deviceWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  const customerStore = {
    rows: ref([]),
    pagination: ref({
      searchTerm: "",
    }),
    state: {
      disableApplySearch: true,
      firstLoad: ref(true),
      rows: ref([]),
      allSelectedIds: ref([]),
      activeRow: ref(null),
    },
  };

  const tableStore = useDataTable({
    dataSource: "crm/customer/getLookupData",
    store: customerStore,
  });

  async function gotoNext() {
    if (hasMoreData.value) {
      tableStore.pagination.value.currentPage += 1;
      await reloadData();
    }
  }

  async function reloadData() {
    await tableStore.reloadData();
    customerStore.rows.value = [
      ...customerStore.rows.value,
      ...tableStore.rows.value,
    ];
  }

  async function loadData() {
    tableStore.pagination.value.currentPage = 1;
    await tableStore.reloadData();
    customerStore.rows.value = tableStore.rows.value;
  }

  const hasMoreData = computed(() => {
    return (
      tableStore.pagination.value.currentPage <
      tableStore.pagination.value.totalPages
    );
  });
</script>
