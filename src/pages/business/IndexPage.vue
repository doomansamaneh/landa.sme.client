<template>
  <q-page class="row justify-center items-center bg-blue-1">
    <!-- <div class="row q-py-md">
      <div class="col col-3"></div>
      <div class="col">
        <div class="q-pb-md q-gutter-sm">
          <q-btn color="blue" @click="reloadData()" no-caps icon="refresh" label="load data" />
          <q-btn color="red" @click="gotoBusiness()" no-caps icon="directions" label="Goto Business" />
        </div>
        <div>
          <data-grid ref="gridBusiness" title="my business list" color="bg-primary text-white"
            dataSource="business/getBusinessGridData" :columns="columns" @changeSelected="gridChangeSelected">
          </data-grid>
        </div>
      </div>
      <div class="col col-3"></div>
    </div> -->

    <q-page class="row justify-center items-center bg-blue-1">
      <q-footer bordered class="bg-white text-dark q-py-md xs">
        <div class="q-pb-sm" v-if="showMoreOptions">
          <q-item clickable v-ripple class="q-py-md">
            <q-item-section avatar>
              <q-avatar
                color="grey-4"
                text-color="dark"
                icon="o_person"
                size="md"
              />
            </q-item-section>
            <q-item-section>Entering the Business</q-item-section>
          </q-item>
          <q-item clickable v-close-popup v-ripple class="q-py-md">
            <q-item-section avatar>
              <q-avatar
                color="grey-4"
                text-color="dark"
                icon="o_person_add"
                size="md"
              />
            </q-item-section>
            <q-item-section>Invite User</q-item-section>
          </q-item>
          <q-item clickable v-ripple class="q-py-md">
            <q-item-section avatar>
              <q-avatar
                color="grey-4"
                text-color="dark"
                icon="o_delete"
                size="md"
              />
            </q-item-section>
            <q-item-section>Delete</q-item-section>
          </q-item>
          <q-item clickable v-ripple class="q-py-md">
            <q-item-section avatar>
              <q-avatar
                color="grey-4"
                text-color="dark"
                icon="credit_card"
                size="md"
              />
            </q-item-section>
            <q-item-section>Invite User</q-item-section>
          </q-item>
        </div>
        <div class="flex justify-between items-center q-pl-sm q-pr-lg">
          <div class="col-2">

              <q-btn
                class="more-icon"
                style="color: grey"
                key="more-button"
                unelevated
                falt
                round
                :ripple="false"
                icon="more_vert"
                size="md"
                @click="showMoreOptions = !showMoreOptions"
              >
              </q-btn>

          </div>
          <div class="flex q-gutter-sm col-2">
            <q-chip
              class="chips expire-date"
              square
              icon="o_history"
              :ripple="false"
              style="font-size: 12px; background-color: #ffe1b4"
              >1402/08/09</q-chip
            >
            <div class="col-2">
              <q-btn
                class="service-extension"
                unelevated
                color="orange"
                icon="o_shopping_bag"
                size="sm"
              />
            </div>
          </div>
        </div>
      </q-footer>

      <!-- Mobile View -->
      <div class="q-pa-md items-start q-gutter-md xs q-mt-sm q-mb-lg">
        <q-card class="select-business-card-mobile q-card-mobile" bordered>
          <q-item class="q-px-lg q-py-lg">
            <q-item-section>
              <q-item-label
                class="text-weight-bold text-grey-10"
                style="font-size: 18px"
                >My Businesses</q-item-label
              >
              <q-item-label
                class="text-body text-grey-7 q-pr-lg"
                caption
                style="font-size: 13px"
              >
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
            <q-card
              class="row selectable my-inner-card row justify-start q-px-md items-center no-shadow"
              bordered
            >
              <div class="icon flex items-center q-gutter-md">
                <div class="">
                  <q-avatar
                    color="grey-4"
                    text-color="dark"
                    icon="o_person_add"
                    size="lg"
                  />
                </div>

                <div class="business-button">
                  <q-btn
                    class="business-name-btn ellipsis-2-lines"
                    flat
                    no-caps
                    text-color="dark"
                    :ripple="{ color: 'grey-6' }"
                  >
                    <div class="text-weight-bold business-name-mobile ellipsis-2-lines" style="font-size: 12px">
                     Dooman Samaneh for Test
                    </div>
                    <q-icon right size="xs" name="o_login" />
                  </q-btn>
                </div>
              </div>
            </q-card>

            <q-card
              class="selectable my-inner-card row justify-start q-px-md items-center no-shadow"
              bordered
            >
              <div class="icon flex items-center q-gutter-md">
                <div class="">
                  <q-avatar
                    color="grey-4"
                    text-color="dark"
                    icon="o_person"
                    size="lg"
                  />
                </div>

                <div class="business-button">
                  <q-btn
                    class="business-name-btn"
                    flat
                    no-caps
                    text-color="dark"
                    :ripple="{ color: 'grey-6' }"
                  >
                    <div class="text-weight-bold business-name-mobile ellipsis-2-lines" style="font-size: 12px">
                      Daftar Kargosha (Demo)
                    </div>
                    <q-icon right size="xs" name="o_login" />
                  </q-btn>
                </div>
              </div>
            </q-card>
          </q-card-section>
        </q-card>
      </div>

      <!-- Desktop View -->
      <div class="q-pa-md q-mt-md q-mb-xl row items-start q-gutter-md md">
        <q-card class="select-business-card q-card-desktop" bordered>
          <q-item class="q-px-lg q-py-lg">
            <q-item-section>
              <q-item-label
                class="text-weight-bold text-grey-10"
                style="font-size: 18px"
                >My Businesses</q-item-label
              >
              <q-item-label
                class="text-body text-grey-7"
                caption
                style="font-size: 13px"
              >
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
            <q-card
              class="selectable my-inner-card row justify-around items-center no-shadow q-pl-sm"
              bordered
            >
              <div class="icon flex items-center q-gutter-md col-6">
                <q-avatar
                  color="grey-4"
                  text-color="dark"
                  icon="o_person_add"
                  size="lg"
                />

                <q-btn
                  class="business-name-btn"
                  flat
                  no-caps
                  text-color="dark"
                  :ripple="{ color: 'grey-6' }"
                >
                  <div class="text-weight-bold business-name-desktop ellipsis-2-lines" style="font-size: 12px">
                   Dooman Samaneh for Test
                  </div>
                  <q-icon right size="xs" name="o_login" />
                </q-btn>
              </div>

              <div class="flex items-center q-gutter-xs col-4 q-pl-md">
                <div class="">
                  <q-chip
                    class="chips expire-date flex items-center"
                    square
                    icon="o_history"
                    :ripple="false"
                    style="font-size: 12px; background-color: #ffe1b4"
                    >1402/08/09</q-chip
                  >
                </div>
                <div class="">
                  <q-btn
                    class="service-extension"
                    unelevated
                    color="orange"
                    icon="o_shopping_bag"
                    size="sm"
                  />
                </div>
              </div>
              <div class="more-options col-1 q-pl-xs">
                <q-btn
                  class="more-icon"
                  style="color: grey"
                  unelevated
                  falt
                  round
                  :ripple="false"
                  icon="more_vert"
                  size="md"
                />
                <q-menu>
                  <q-list style="min-width: 100px">
                    <q-item clickable v-close-popup>
                      <q-item-section>
                        <div class="flex items-center q-gutter-sm">
                          <q-avatar
                            color="grey-4"
                            text-color="dark"
                            icon="login"
                            size="sm"
                          />
                          <div class="text-body" style="font-size: 12px">
                            Entering the Business
                          </div>
                        </div>
                      </q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup>
                      <q-item-section
                        ><div class="flex items-center q-gutter-sm">
                          <q-avatar
                            color="grey-4"
                            text-color="dark"
                            icon="o_person_add"
                            size="sm"
                          />
                          <div class="text-body" style="font-size: 12px">
                            Invite User
                          </div>
                        </div></q-item-section
                      >
                    </q-item>
                    <q-separator />
                    <q-item clickable v-close-popup>
                      <q-item-section>
                        <div class="flex items-center q-gutter-sm">
                          <q-avatar
                            color="grey-4"
                            text-color="dark"
                            icon="o_delete"
                            size="sm"
                          />
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
                          <q-avatar
                            color="grey-4"
                            text-color="dark"
                            icon="credit_card"
                            size="sm"
                          />
                          <div class="text-body" style="font-size: 12px">
                            Payment History
                          </div>
                        </div>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </div>
            </q-card>

            <q-card
              class="selectable my-inner-card row justify-around items-center no-shadow q-pl-sm"
              bordered
            >
              <div class="icon flex items-center q-gutter-md col-6">
                <div class="">
                  <q-avatar
                    color="grey-4"
                    text-color="dark"
                    icon="o_person"
                    size="lg"
                  />
                </div>

                <div class="">
                  <q-btn
                    class="business-name-btn"
                    flat
                    no-caps
                    text-color="dark"
                    :ripple="{ color: 'grey-6' }"
                  >
                    <div class="text-weight-bold business-name-desktop ellipsis-2-lines" style="font-size: 12px">
                      Daftar Kargosha (Demo)
                    </div>
                    <q-icon right size="xs" name="o_login" />
                  </q-btn>
                </div>
              </div>

              <div class="flex items-center q-gutter-xs col-4 q-pl-md">
                <div class="">
                  <q-chip
                    class="chips expire-date flex items-center"
                    square
                    icon="o_history"
                    :ripple="false"
                    style="font-size: 12px; background-color: #ffe1b4"
                    >1402/08/09</q-chip
                  >
                </div>
              </div>
              <div class="more-options col-1 q-pl-xs">
                <q-btn
                  class="more-icon"
                  style="color: grey"
                  unelevated
                  falt
                  :ripple="false"
                  round
                  icon="more_vert"
                  size="md"
                />
                <q-menu>
                  <q-list style="min-width: 100px">
                    <q-item clickable v-close-popup>
                      <q-item-section>
                        <div class="flex items-center q-gutter-sm">
                          <q-avatar
                            color="grey-4"
                            text-color="dark"
                            icon="login"
                            size="sm"
                          />
                          <div class="text-body" style="font-size: 12px">
                            Entering the Business
                          </div>
                        </div>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </div>
            </q-card>
          </q-card-section>
        </q-card>
      </div>
    </q-page>
    </q-page>
</template>

<script setup>
  import { ref } from 'vue'
  import DataGrid from "../../components/shared/DataGrid.vue";
  import { fetchWrapper } from "../../helpers"

  const gridBusiness = ref(null);

  const columns = [
    {
      name: 'row-number',
      required: true,
      label: '#',
      align: 'left',
      sortable: false,
      headerStyle: 'width: 5px'
    },
    {
      name: 'name',
      required: true,
      label: 'name',
      align: 'left',
      field: row => row.name,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'toDate',
      required: true,
      label: 'to date',
      align: 'left',
      field: "toDateString",
      sortable: true,
      headerStyle: 'width: 50px'
    },
    {
      name: 'dateCreated',
      required: true,
      label: 'dayes to expire',
      field: row => row.daysToExpire,
      sortable: true,
      headerStyle: 'width: 50px'
    },
  ]

  function reloadData() {
    gridBusiness.value.reloadData();
  }

  async function gotoBusiness() {
    await fetchWrapper
      .post("business/gotoBusiness/41f1c444-8450-40c9-b590-c0807a41a4e5")
      .then((response) => { console.log(response); })
      .finally(() => { })
  }

  const selected = ref([]);
  function gridChangeSelected(s, e) {
    selected.value = s;
  }


const showMoreOptions = ref(false);

const cardSelected = ref(false)

const cardSelection = () =>{
  this.cardSelected = !this.cardSelected

}
</script>

<style>
.q-card-desktop {
  width: 620px;
}

.q-card-mobile {
  width: 320px;
}

.select-business-card {
  border-radius: 10px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
}

.select-business-card-mobile {
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

.business-name-mobile{
  width: 125px;
}

.business-name-desktop{
  width: 130px;
}
</style>
