<template>
  <q-drawer
    side="right"
    v-model="contactDrawerStore.state.value"
    overlay
    :width="350"
    :breakpoint="500"
    class="text-white"
    bordered
  >
    <q-scroll-area
      class="fit"
      dark
      :thumb-style="thumbStyle"
      :bar-style="barStyle"
    >
      <div class="searchbar-sidebar q-my-md q-px-md">
        <q-input
          color="grey-5"
          outlined
          v-model="tableStore.pagination.value.searchTerm"
          :placeholder="$t('shared.labels.contact-search')"
          dense
          clearable
          rounded
          @keydown.enter="reloadData"
          class="text-caption"
        >
          <template v-slot:prepend>
            <q-icon
              name="o_search"
              color="primary"
            />
          </template>
        </q-input>
      </div>
      <q-list
        dense
        padding
      >
        <q-item
          v-for="(row) in rows"
          :key="row.id"
          clickable
          v-close-popup
          class="q-py-sm text-on-dark"
        >
          <div class="row q-gutter-x-md items-center q-my-md q-pl-sm">
            <q-item-section
              avatar
              @click="goToCustomer"
            >
              <q-btn
                round
                v-if="row.avatar"
                class="avatar"
              >
                <q-avatar
                  color="primary"
                  text-color="white"
                  size="52px"
                >
                  <img :src="row.avatar">
                  <q-icon
                    name="o_visibility"
                    size="sm"
                  />
                </q-avatar>
              </q-btn>
              <q-btn
                class="first-char"
                round
                v-else
              >
                <q-avatar
                  size="52px"
                  color="primary"
                  text-color="white"
                >
                  <div class="char text-body1 text-bold">
                    {{ getFirstChar(row.name) }}
                  </div>
                  <q-icon
                    name="o_visibility"
                    size="sm"
                  />
                </q-avatar>
              </q-btn>
            </q-item-section>

            <q-item-section>
              <q-item-label
                class="ellipsis text-on-dark text-caption text-bold q-py-xs"
                style="width:200px"
              >
                {{ row.code }} {{ row.name }}
              </q-item-label>
              <q-item-label
                v-if="row.locationName"
                caption
                class="ellipsis q-mt-xs"
                style="width: 200px;"
              >
                <q-icon
                  name="o_location_on"
                  class="q-mr-xs"
                  size="13px"
                  color="primary"
                />
                {{ row.locationName }} {{ row.address }}
              </q-item-label>
              <q-item-label
                @click="telephoneToMobile"
                v-if="row.phoneNo || row.mobileNo"
                caption
              >
                <q-icon
                  :name="icon"
                  class="icon-hover q-mr-xs"
                  color="primary"
                  size="13px"
                />
                {{ togglePhoneNumber(row) }}
              </q-item-label>
            </q-item-section>
          </div>
        </q-item>
      </q-list>
      <q-btn
        v-if="false"
        class="bg-blue"
        @click="gotoNext"
      >load more ...</q-btn>
    </q-scroll-area>
  </q-drawer>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import { useRouter } from "vue-router"
import { useDataTable } from "src/composables/useDataTable"
import { useCustomer } from "src/components/areas/crm/_composables/useCustomer"
import { useContactDrawer } from "src/composables/useContactDrawer"

const customerStore = useCustomer()
const contactDrawerStore = useContactDrawer()

const tableStore = useDataTable("crm/customer/getLookupData", customerStore.columns, customerStore)

const router = useRouter()

const togglePhone = ref(true)

const thumbStyle = {
  left: '4px',
  borderRadius: '5px',
  width: '6px',
  opacity: 0.75
}

const barStyle = {
  left: '2px',
  width: '8px',
  opacity: 0.2
}

const rows = ref([]);

onMounted(() => {
  //todo: 
  //alert("customer search data loaded. why?")
  //tableStore.loadData()
  //rows.value = tableStore.rows.value//.push(...tableStore.rows.value)
})

async function gotoNext() {
  tableStore.pagination.value.currentPage += 1
  await reloadData()
}

async function reloadData() {
  await tableStore.reloadData()
  rows.value = tableStore.rows.value//rows.value.push(...tableStore.rows.value)
}

function getFirstChar(str) {
  return str.charAt(0)
}

const telephoneToMobile = () => {
  togglePhone.value = !togglePhone.value
}

const icon = computed(() => (togglePhone.value ? 'o_call_end' : 'o_phone_android'));

const togglePhoneNumber = (row) => {
  if (togglePhone.value) {
    return row.phoneNo || "تلفن ندارد";
  } else {
    return row.mobileNo || "موبایل ندارد";
  }
};

const goToCustomer = () => {
  router.push("/crm/customer")
}

</script>

<style lang="scss">
.avatar {
  &:hover img {
    display: none;
    transition: 0.9s ease-in-out;

    .q-icon {
      visibility: 1;
      transition: 0.9s ease-in-out;
    }
  }
}

.first-char {
  .q-icon {
    display: none;
  }

  &:hover {
    .char {
      display: none;
    }

    .q-icon {
      display: block;
    }
  }
}
</style>
