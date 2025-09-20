<template>
  <div class="row q-gutter-lg q-px-sm q-pb-sm">
    <div class="col-4">
      <div>
        <q-item-label caption class="q-mb-sm">نوع تماس</q-item-label>
        <q-select
          hide-dropdown-icon
          dense
          v-model="selectedContactType"
          @update:model-value="selectedContactType"
          :options="items"
          behavior="menu"
          outlined
          auto-close
          class="period-select"
        >
          <template #append>
            <q-icon
              name="o_expand_more"
              class="show-lookup-icon cursor-pointer"
              size="sm"
            />
          </template>
          <template v-slot:option="scope">
            <q-item
              v-bind="scope.itemProps"
              clickable
              v-close-popup
              tabindex="0"
            >
              <div class="q-py-sm">
                <q-item-section avatar>
                  <q-avatar class="bg-on-dark" size="sm">
                    <q-icon :name="scope.opt.icon" size="14px" />
                  </q-avatar>
                </q-item-section>
              </div>
              <q-item-section>
                <div class="text-caption">{{ scope.opt.label }}</div>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
    </div>
    <div class="col">
      <div>
        <q-item-label caption class="q-mb-sm">شماره</q-item-label>
        <q-input outlined dense />
      </div>
    </div>
    <div class="col-2">
      <div>
        <q-item-label caption class="q-mb-sm">وضعیت</q-item-label>
        <q-checkbox
          dense
          v-model="status"
          val="customer"
          label="اصلی"
        />
      </div>
    </div>
  </div>
  <div class="col q-pa-sm">
    <div>
      <q-item-label caption class="q-mb-sm">شرح</q-item-label>
      <q-input v-model="text" outlined type="textarea" autogrow />
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";

  const selectedContactType = ref(null);
  const status = ref(false);

  const items = [
    {
      label: "تلفن منزل",
      value: "home",
      icon: "o_home",
    },
    {
      label: "تلفن محل کار",
      value: "business",
      icon: "o_business",
    },
    {
      label: "تلفن داخلی",
      value: "income",
      icon: "o_sensor_door",
    },
    {
      label: "فکس",
      value: "fax",
      icon: "o_fax",
    },
  ];
</script>
<style scoped>
  .q-item__label--caption {
    font-size: 16px;
    letter-spacing: 0;
    color: #697588;
  }
</style>
