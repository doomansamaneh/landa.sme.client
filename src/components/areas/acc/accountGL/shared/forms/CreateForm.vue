<template>
  <q-form ref="form" autofocus>
    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-item-label
          class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
        >
          گروه حساب
        </q-item-label>
        <cl-lookup
          v-model:selectedId="formStore.model.value.clId"
          v-model:selectedText="formStore.model.value.clTitle"
          :rules="[(val) => val !== null && val !== '']"
        />
      </div>
    </div>

    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-md-3 col-sm-6 col-xs-12">
        <q-item-label
          class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
        >
          کد
        </q-item-label>
        <custom-input
          hide-bottom-space
          v-model="formStore.model.value.code"
          :rules="[(val) => val !== null && val !== '']"
        />
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12">
        <q-item-label
          class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
        >
          ماهیت حساب
        </q-item-label>
        <custom-select
          :options="helper.getEnumOptions(accountType, 'accountType')"
          v-model="formStore.model.value.typeId"
        />
      </div>
    </div>

    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-item-label
          class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
        >
          عنوان
        </q-item-label>
        <custom-input
          hide-bottom-space
          v-model="formStore.model.value.title"
          :rules="[(val) => val !== null && val !== '']"
        />
      </div>
    </div>

    <div class="row q-gutter-md q-mb-md">
      <q-checkbox
        dense
        size="48px"
        v-model="formStore.model.value.isActive"
        label="فعال"
      />
    </div>
  </q-form>
</template>

<script setup>
  import { ref } from "vue";
  import { helper } from "src/helpers";
  import { accountType } from "src/constants";
  import { useBaseInfoModel } from "src/components/areas/_shared/_composables/useBaseInfoModel";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import CustomSelect from "src/components/shared/forms/CustomSelect.vue";
  import ClLookup from "src/components/shared/lookups/AccountCLLookup.vue";

  const props = defineProps({
    id: String,
  });

  const form = ref(null);

  const formStore = useBaseInfoModel({
    baseRoute: "acc/accountGL",
    id: props.id,
  });

</script>
