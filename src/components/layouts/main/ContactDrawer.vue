<template>
  <q-drawer
    bordered
    side="right"
    v-model="contactDrawerStore.state.value"
    overlay
    :width="$q.screen.gt.xs ? 350 : deviceWidth"
    :breakpoint="500"
    class="no-scroll q-py-lg_"
    :class="$q.dark.isActive ? 'bg-dark' : 'bg-light'"
  >
    <loadable-data-grid
      data-source="crm/customer/getLookupData"
      show-search
    >
      <template #close>
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
      </template>

      <template #item="{ item, index }">
        <q-item
          :to="`/crm/customer/preview/${item.id}`"
          :key="index"
          clickable
          v-close-popup
          class="text-on-dark"
        >
          <div class="row items-center q-my-xs q-pl-sm">
            <q-item-section avatar>
              <q-avatar
                v-if="item.avatar"
                color="primary"
                text-color="white"
                size="52px"
                square
                class="border-radius-xs"
              >
                <img :src="item.avatar" />
              </q-avatar>

              <q-avatar
                size="52px"
                text-color="white"
                square
                class="border-radius-xs"
                :style="helper.generateAvatarStyle(item.id)"
                v-else
              >
                <div class="char text-body1 text-bold">
                  {{ helper.getFirstChar(item.name) }}
                </div>
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label
                class="ellipsis text-on-caption text-caption text-bold q-py-xs"
                style="width: 200px"
              >
                {{ item.code }} {{ item.name }}
              </q-item-label>
              <div
                v-if="item.locationName"
                class="ellipsis text-body3 no-letter-spacing q-mt-xs"
                style="width: 200px"
              >
                <q-icon
                  name="o_location_on"
                  size="13px"
                  color="primary"
                />
                {{ item.locationName }} {{ item.address }}
              </div>
              <div class="row items-center q-gutter-xs">
                <div
                  class="flex text-body3 no-letter-spacing items-center rtl"
                  v-if="item.phoneNo"
                >
                  {{ helper.separatePhoneNumbers(item.phoneNo) }}
                  <q-icon
                    name="o_phone"
                    class="q-mr-xs"
                    color="primary"
                    size="13px"
                  />
                </div>
                <div
                  class="flex text-body3 no-letter-spacing items-center rtl"
                  v-if="item.mobileNo"
                >
                  {{ helper.separatePhoneNumbers(item.mobileNo) }}
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
      </template>
    </loadable-data-grid>
  </q-drawer>
</template>

<script setup>
  import { useContactDrawer } from "src/composables/useContactDrawer";
  import { helper } from "src/helpers";

  import LoadableDataGrid from "src/components/shared/dataTables/LoadableDataGrid.vue";

  const contactDrawerStore = useContactDrawer();

  const deviceWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
</script>
