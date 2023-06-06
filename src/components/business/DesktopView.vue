<template>
  <div class="screen--md xl">
    <div class="q-pa-md q-mt-md q-mb-xl row items-start q-gutter-md">
      <q-card class="select-business-card q-card-desktop" bordered>
        <q-item class="q-px-lg q-py-lg">
          <q-item-section>
            <q-item-label class="text-weight-bold text-grey-10" style="font-size: 18px">My Businesses</q-item-label>
            <q-item-label class="text-body text-grey-7" caption style="font-size: 13px">
              Click on the business name to enter
            </q-item-label>
          </q-item-section>
          <div class="flex items-center q-gutter-md">
            <q-icon color="grey" size="md" name="o_help_outline" />
            <q-btn unelevated round color="green-7" icon="add">
              <q-tooltip anchor="top right" self="top left">
                Add New Business
              </q-tooltip>
            </q-btn>
          </div>
        </q-item>

        <q-separator />
        <q-card-section class="q-pa-lg q-gutter-md">
          <q-card class="selectable my-inner-card row justify-around items-center no-shadow q-pl-sm" bordered
            v-for="(item, index) in rows" :key="index">
            <div class="icon flex items-center q-gutter-md col-6">
              <q-avatar color="grey-4" text-color="dark" icon="o_person_add" size="lg" v-if="item.isOwner" />
              <q-avatar color="grey-4" text-color="dark" icon="o_person" size="lg" v-else />

              <q-btn class="business-name-btn" flat no-caps text-color="dark" :ripple="{ color: 'grey-5' }">
                <div class="text-weight-bold business-name-desktop ellipsis-2-lines" style="font-size: 12px"
                  @click="gotoBusiness">
                  <span>{{ item.name }}</span>
                </div>
                <q-icon right size="xs" name="o_login" />
              </q-btn>
            </div>

            <div class="flex items-center q-gutter-xs col-4 q-pl-md">
              <div class="">
                <q-chip class="chips expire-date flex items-center" square icon="o_history" :ripple="false"
                  style="font-size: 12px; background-color: #ffe1b4"><span>{{ item.dateCreatedString }}</span></q-chip>
              </div>
              <div class="" v-if="item.isOwner">
                <q-btn class="service-extension" unelevated color="orange" icon="o_shopping_bag" size="sm" />
              </div>
              <div class="" v-else>
                <q-btn class="service-extension" unelevated color="grey" icon="o_shopping_bag" size="sm" />
              </div>
            </div>
            <div class="more-options col-1 q-pl-xs">
              <q-btn class="more-icon" style="color: grey" unelevated falt round :ripple="false" icon="more_vert"
                size="md" />
              <q-menu>
                <q-list style="min-width: 100px">
                  <q-item clickable v-close-popup>
                    <q-item-section>
                      <div class="flex items-center q-gutter-sm">
                        <q-avatar color="grey-4" text-color="dark" icon="login" size="sm" />
                        <div class="text-body" style="font-size: 12px">
                          Entering the Business
                        </div>
                      </div>
                    </q-item-section>
                  </q-item>
                  <div class="isNotOwner" v-if="item.isOwner">
                    <q-item clickable v-close-popup>
                      <q-item-section>
                        <div class="flex items-center q-gutter-sm">
                          <q-avatar color="grey-4" text-color="dark" icon="o_person_add" size="sm" />
                          <div class="text-body" style="font-size: 12px">
                            Invite User
                          </div>
                        </div>
                      </q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item clickable v-close-popup>
                      <q-item-section>
                        <div class="flex items-center q-gutter-sm">
                          <q-avatar color="grey-4" text-color="dark" icon="o_delete" size="sm" />
                          <div class="text-body" style="font-size: 12px">
                            Delete
                          </div>
                        </div>
                      </q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item clickable v-close-popup>
                      <q-item-section>
                        <div class="flex items-center q-gutter-sm">
                          <q-avatar color="grey-4" text-color="dark" icon="credit_card" size="sm" />
                          <div class="text-body" style="font-size: 12px">
                            Payment History
                          </div>
                        </div>
                      </q-item-section>
                    </q-item>
                  </div>
                </q-list>
              </q-menu>
            </div>
          </q-card>
        </q-card-section>
      </q-card>
    </div>
  </div>

  <!-- <q-page class="row justify-center items-center"> -->
  <!-- </q-page> -->

</template>

<script setup>
  import { fetchWrapper } from "../../helpers"
  import { onMounted } from "vue"
  import { ref } from "vue"

  const rows = ref([])
  const loading = ref(false)

  const pagination = ref({
    sortBy: "name",
    page: 1,
    rowsPerPage: 10,
    rowsNumber: 0
  })

  async function gotoBusiness() {
    await fetchWrapper
      .post("business/gotoBusiness/41f1c444-8450-40c9-b590-c0807a41a4e5")
      .then((response) => {
        console.log(response)
      })
      .finally(() => { })
  }

  onMounted(() => {
    reloadData()
  })

  async function reloadData() {
    loadData(pagination.value)
  }

  async function loadData(data) {
    loading.value = true
    await fetchWrapper
      .post("business/getBusinessGridData", {
        pageSize: data.rowsPerPage,
        sortColumn: data.sortBy,
        sortOrder: data.descending ? 1 : 2,
        currentPage: data.page
        //columns: columns
      })
      .then((response) => {
        handleResponse(response, data)
      })
      .finally(() => {
        loading.value = false
      })
  }

  function handleResponse(response, data) {
    rows.value = response.data.items
    pagination.value.rowsNumber = response.data.page.totalItems
    pagination.value.rowsPerPage = response.data.page.pageSize
    pagination.value.page = response.data.page.currentPage
    pagination.value.sortBy = data.sortBy
    pagination.value.descending = data.descending
  }
</script>

<style>
  .q-card-desktop {
    width: 620px;
  }

  .select-business-card {
    border-radius: 10px;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
  }

  .my-inner-card {
    width: auto;
    height: 90px;
    border-radius: 5px;
  }

  .business-name-btn {
    border-radius: 5px;
    padding: 8px 12px;
    border: 1px solid rgb(230, 230, 230);
  }

  .chips {
    padding: 21px 15px;
  }

  .service-extension {
    padding: 12px 12px;
    border-radius: 5px;
  }

  .q-btn .q-focus-helper {
    display: none;
  }

  .selectable {
    cursor: pointer;
  }

  .card-selection {
    border: 1.5px solid #2196f3;
  }

  .more-icon {
    margin-left: 2px;
  }

  .business-name-desktop {
    width: 130px;
  }

  .q-btn:hover {
    background-color: rgb(241, 241, 241);
  }
</style>