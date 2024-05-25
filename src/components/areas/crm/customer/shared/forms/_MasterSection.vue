<template>
  <div
    class="row"
    :class="$q.screen.gt.xs ? 'q-col-gutter-xl' : 'q-col-gutter-lg'"
  >
    <div class="col-md-4 col-sm-4 col-xs-12">
      <div class="row justify-center items-center">
        <q-avatar size="200px" class="q-my-md">
          <img
            class="avatar"
            src="https://cdn.quasar.dev/img/avatar4.jpg"
          />
        </q-avatar>
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
            <q-item-label
              class="q-mb-sm text-body2 caption-on-dark no-letter-spacing"
            >
              کد
            </q-item-label>
            <custom-input v-model="model.value.code" />
          </div>
        </div>
        <div>
          <q-item-label
            class="q-mb-sm text-body2 caption-on-dark no-letter-spacing"
          >
            نوع
          </q-item-label>
          <q-option-group
            inline
            :options="
              helper.getEnumOptions(customerType, 'customerType')
            "
            type="radio"
            v-model="model.value.typeId"
          />
        </div>
        <div v-if="model.value?.typeId == customerType.legal">
          <q-item-label
            class="q-mb-sm text-body2 caption-on-dark no-letter-spacing"
          >
            نام
          </q-item-label>
          <custom-input v-model="model.value.name" />
        </div>
        <div v-else class="row q-col-gutter-lg">
          <div class="col-md col-sm col-xs-12">
            <q-item-label
              class="q-mb-sm text-body2 caption-on-dark no-letter-spacing"
            >
              نام
            </q-item-label>
            <custom-input v-model="model.value.person.name" />
          </div>
          <div class="col-md col-sm col-xs-12">
            <q-item-label
              class="q-mb-sm text-body2 caption-on-dark no-letter-spacing"
            >
              نام خانوادگی
            </q-item-label>
            <custom-input v-model="model.value.person.lastName" />
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
          <q-item-label
            class="q-mb-sm text-body2 caption-on-dark no-letter-spacing"
          >
            واحد سازمانی
          </q-item-label>
          <unit-lookup
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
              v-model="model.value.roleIdList"
            />
          </div>
        </div>
        <div>
          <q-item-label
            class="q-mb-sm text-body2 caption-on-dark no-letter-spacing"
          >
            شرح
          </q-item-label>
          <custom-input
            v-model="model.value.comment"
            type="textarea"
            autogrow
          />
        </div>
        <div class="row q-col-gutter-lg">
          <div class="col-md-4 col-sm-4 col-xs-6">
            <q-item-label
              class="q-mb-sm text-body2 caption-on-dark no-letter-spacing"
            >
              درصد بازاریابی
            </q-item-label>
            <custom-input-number
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

  const props = defineProps({
    formStore: Object,
  });

  const model = computed(() => props.formStore.model);
</script>
