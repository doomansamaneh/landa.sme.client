<template>
  <lookup-view
    ref="lookup"
    dataSource="crm/customer/getlookupData"
    sortColumn="code"
    textTemplate="{{ code }} {{ name }}"
    searchField="name"
    columns="code,name"
    width="450px"
    show-add
    clearable
    :create-form="CreateForm"
    @add="add"
  >
    <template #td="{ row }">
      <q-item
        class="rounded-borders"
        style="padding: 12px"
        clickable
        v-close-popup
      >
        <div class="flex">
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
              square
              class="primary-shadow border-radius-xs"
              size="52px"
              :style="helper.generateAvatarStyle(row.id)"
              text-color="white"
              v-else
            >
              <div class="char text-body1 text-bold">
                {{ helper.getFirstChar(row.name) }}
              </div>
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label
              class="ellipsis-2-lines text-on-dark text-caption text-bold q-pb-xs"
            >
              {{ row.code }} {{ row.name }}
            </q-item-label>
            <div
              v-if="row.locationName"
              class="text-body3 text-on-caption ellipsis-2-lines q-mt-xs"
            >
              <q-icon
                name="o_location_on"
                size="13px"
                color="primary"
              />
              {{ row.locationName }} {{ row.address }}
            </div>
            <div class="row items-center q-pt-xs q-gutter-xs">
              <div
                class="flex text-body3 text-on-caption items-center rtl"
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
                class="flex text-body3 text-on-caption items-center rtl"
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
    </template>

    <template #title>فروشنده</template>
  </lookup-view>
</template>

<script setup>
  import { ref } from "vue";
  import { helper } from "src/helpers";

  import LookupView from "src/components/shared/dataTables/LookupView.vue";
  import CreateForm from "src/components/areas/crm/customer/shared/forms/CreateForm.vue";

  const lookup = ref(null);

  defineExpose({
    lookup,
  });
</script>
