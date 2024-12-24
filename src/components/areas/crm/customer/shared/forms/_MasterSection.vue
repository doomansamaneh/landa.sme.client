<template>
  <div
    class="row"
    :class="$q.screen.gt.xs ? 'q-col-gutter-xl' : 'q-col-gutter-lg'"
  >
    <div class="col-md-4 col-sm-4 col-xs-12">
      <div class="row justify-center items-center">
        <customer-avatar
          size="200px"
          text-color="white"
          :item="model.value.id"
          :text-holder="model.value.name"
          text-holder-class="text-bold"
          :avatar="model.value.avatar"
        />
      </div>
      <div class="column items-center q-gutter-y-sm q-mt-sm">
        <q-btn
          style="width: 150px"
          rounded
          flat
          class="primary-shadow primary-gradient text-body2 text-white"
        >
          آپلود تصویر جدید
        </q-btn>
        <q-btn
          style="width: 150px"
          rounded
          flat
          class="text-body2 text-on-dark"
        >
          حذف
        </q-btn>
      </div>
    </div>

    <div class="col-md col-sm col-xs-12">
      <div class="q-col-gutter-lg">
        <div class="row">
          <div class="col-md-4 col-sm-8 col-xs-12">
            <custom-input label="کد" v-model="model.value.code" />
          </div>
        </div>
        <div>
          <q-option-group
            label="نوع"
            inline
            :options="
              helper.getEnumOptions(customerType, 'customerType')
            "
            type="radio"
            v-model="model.value.typeId"
          />
        </div>
        <div v-if="model.value?.typeId == customerType.legal">
          <custom-input label="نام" v-model="model.value.name" />
        </div>
        <div v-else class="row q-col-gutter-lg">
          <div class="col-md col-sm col-xs-12">
            <custom-input
              label="نام"
              v-model="model.value.person.name"
            />
          </div>
          <div class="col-md col-sm col-xs-12">
            <custom-input
              label="نام خانوادگی"
              v-model="model.value.person.lastName"
            />
          </div>
          <div class="col-md col-sm col-xs-12">
            <q-item-label
              class="q-mb-sm text-body2 caption-on-dark no-letter-spacing"
            >
              جنسیت
            </q-item-label>
            <div class="row q-pt-xs q-col-gutter-md">
              <q-option-group
                inline
                :options="helper.getEnumOptions(gender, 'gender')"
                type="radio"
                v-model="model.value.person.gender"
              />
            </div>
          </div>
        </div>

        <div>
          <unit-lookup
            label="واحد سازمانی"
            v-model:selectedId="model.value.unitId"
            v-model:selectedText="model.value.unitTitle"
          />
        </div>
        <div>
          <q-item-label
            class="q-mb-sm text-body2 caption-on-dark no-letter-spacing"
          >
            نقش
          </q-item-label>
          <div class="q-gutter-sm q-pt-xs">
            <q-option-group
              inline
              :options="
                helper.getEnumOptions(customerRole, 'customerRole')
              "
              type="checkbox"
              v-model="model.value.roleIds"
            />
          </div>
        </div>
        <div>
          <custom-input
            label="شرح"
            v-model="model.value.comment"
            type="textarea"
            autogrow
          />
        </div>
        <div class="row q-col-gutter-lg">
          <div class="col-md-4 col-sm-4 col-xs-6">
            <custom-input-number
              label="درصد بازاریابی"
              v-model="model.value.marketingPercent"
            />
          </div>
        </div>
        <div>
          <q-checkbox
            size="46px"
            class="q-mb-sm text-body2 no-letter-spacing"
            dense
            v-model="model.value.isActive"
            label="فعال"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed } from "vue";
  import { helper } from "src/helpers";
  import { customerType, gender, customerRole } from "src/constants";

  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import CustomInputNumber from "src/components/shared/forms/CustomInputNumber.vue";
  import UnitLookup from "src/components/shared/lookups/UnitLookup.vue";
  import CustomerAvatar from "src/components/shared/CustomerAvatar.vue";

  const props = defineProps({
    formStore: Object,
  });

  const model = computed(() => props.formStore.model);
</script>
