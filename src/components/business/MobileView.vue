<template>
  <div class="screen--xs xs">
    <q-footer bordered class="bg-white text-dark q-py-md">
      <div class="q-pb-sm" v-if="showMoreOptions">
        <q-item clickable v-ripple class="q-py-md">
          <q-item-section avatar>
            <q-avatar color="grey-4" text-color="dark" icon="o_person" size="md" />
          </q-item-section>
          <q-item-section>Entering the Business</q-item-section>
        </q-item>
        <q-item clickable v-close-popup v-ripple class="q-py-md">
          <q-item-section avatar>
            <q-avatar color="grey-4" text-color="dark" icon="o_person_add" size="md" />
          </q-item-section>
          <q-item-section>Invite User</q-item-section>
        </q-item>
        <q-item clickable v-ripple class="q-py-md">
          <q-item-section avatar>
            <q-avatar color="grey-4" text-color="dark" icon="o_delete" size="md" />
          </q-item-section>
          <q-item-section>Delete</q-item-section>
        </q-item>
        <q-item clickable v-ripple class="q-py-md">
          <q-item-section avatar>
            <q-avatar color="grey-4" text-color="dark" icon="credit_card" size="md" />
          </q-item-section>
          <q-item-section>Invite User</q-item-section>
        </q-item>
      </div>
      <div class="flex justify-between items-center q-pl-sm q-pr-lg">
        <div class="col-2">
          <q-btn class="more-icon" style="color: grey" key="more-button" unelevated falt round :ripple="false"
            icon="more_vert" size="md" @click="showMoreOptions = !showMoreOptions">
          </q-btn>
        </div>
        <div class="flex q-gutter-sm col-2">
          <q-chip class="chips expire-date" square icon="o_history" :ripple="false"
            style="font-size: 12px; background-color: #ffe1b4">1402/08/09</q-chip>
          <div class="col-2">
            <q-btn class="service-extension" unelevated color="orange" icon="o_shopping_bag" size="sm" />
          </div>
        </div>
      </div>
    </q-footer>
    <div class="q-pa-md items-start q-gutter-md q-mt-sm q-mb-lg">
      <q-card class="select-business-card-mobile q-card-mobile" bordered>
        <q-item class="q-px-lg q-py-lg">
          <q-item-section>
            <q-item-label class="text-weight-bold text-grey-10" style="font-size: 18px">My Businesses</q-item-label>
            <q-item-label class="text-body text-grey-7 q-pr-lg" caption style="font-size: 13px">
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
          <q-card class="row selectable my-inner-card row justify-start q-px-md items-center no-shadow" bordered>
            <div class="icon flex items-center q-gutter-md">
              <div class="">
                <q-avatar color="grey-4" text-color="dark" icon="o_person_add" size="lg" />
              </div>

              <div class="business-button">
                <q-btn class="business-name-btn ellipsis-2-lines" flat no-caps text-color="dark"
                  :ripple="{ color: 'grey-6' }">
                  <div class="text-weight-bold business-name-mobile ellipsis-2-lines" style="font-size: 12px">
                    Dooman Samaneh for Test
                  </div>
                  <q-icon right size="xs" name="o_login" />
                </q-btn>
              </div>
            </div>
          </q-card>

          <q-card class="selectable my-inner-card row justify-start q-px-md items-center no-shadow" bordered>
            <div class="icon flex items-center q-gutter-md">
              <div class="">
                <q-avatar color="grey-4" text-color="dark" icon="o_person" size="lg" />
              </div>

              <div class="business-button">
                <q-btn class="business-name-btn" flat no-caps text-color="dark" :ripple="{ color: 'grey-6' }">
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
  </div>
</template>

<script setup>
  import { ref } from "vue"

  const showMoreOptions = ref(false)
</script>

<style>
  .q-card-mobile {
    width: 320px;
  }

  .select-business-card-mobile {
    border-radius: 10px;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
  }

  .business-name-mobile {
    width: 125px;
  }
</style>