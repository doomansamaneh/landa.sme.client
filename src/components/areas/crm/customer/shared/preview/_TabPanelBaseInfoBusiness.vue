<template>
  <div class="q-pa-md">
    <custom-button
      class="text-body2 no-letter-spacing primary-shadow primary-gradient"
      text-color="white"
      icon="o_edit"
      :title="$t('shared.labels.edit')"
      @click="edit"
    />
  </div>
  <div class="q-pa-md q-col-gutter-md">
    <div class="row items-center">
      <div class="col-2 no-letter-spacing">شناسه ملی:</div>
      <div class="col text-body2 text-weight-700 no-letter-spacing">
        {{ model.nationalNo }}
        <copy-clipboard
          v-if="model.nationalNo"
          :text="model.nationalNo"
        />
      </div>
    </div>
    <div class="row items-center">
      <div class="col-2 no-letter-spacing">کد اقتصادی:</div>
      <div class="col text-body2 no-letter-spacing">
        {{ model.taxNo }}
      </div>
    </div>
    <div class="row items-center" v-if="model.branchNo">
      <div class="col-2 no-letter-spacing">کد شعبه:</div>
      <div class="col text-body2 no-letter-spacing">
        {{ model.branchNo }}
      </div>
    </div>
    <div class="row items-center" v-if="model.insuranceWorkNo">
      <div class="col-2 no-letter-spacing">شناسه کارگاه بیمه:</div>
      <div class="col text-body2 no-letter-spacing">
        {{ model.insuranceWorkNo }}
      </div>
    </div>
    <div class="row items-center">
      <div class="col-2 no-letter-spacing">شماره ثبت:</div>
      <div class="col text-body2 no-letter-spacing">
        {{ model.regNo }}
      </div>
    </div>
    <div class="row items-center">
      <div class="col-2 no-letter-spacing">تاریخ ثبت:</div>
      <div class="col text-body2 no-letter-spacing">
        {{ model.regDate?.substring(0, 10) }}
      </div>
    </div>
    <div class="row">
      <div class="col-2 no-letter-spacing">شرح:</div>
      <div class="col no-letter-spacing">
        {{ model.comment }}
      </div>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, ref } from "vue";
  import { useQuasar } from "quasar";
  import { helper } from "src/helpers";
  import { formAction } from "src/constants";
  import { useFormActions } from "src/composables/useFormActions";

  import CopyClipboard from "src/components/shared/buttons/CopyClipboard.vue";
  import CustomButton from "src/components/shared/buttons/CustomButton.vue";
  import CreateFormDialog from "../../../customerBusiness/shared/forms/CreateFormDialog.vue";

  const props = defineProps({
    item: Object,
  });

  const $q = useQuasar();
  const model = ref({});
  const formStore = useFormActions(
    "crm/customerBusiness",
    model,
    true
  );

  const loadData = async () => {
    await formStore.getById(props.item?.id);
  };

  const edit = () => {
    $q.dialog({
      component: CreateFormDialog,
      componentProps: {
        id: props.item.id,
        action: formAction.edit,
      },
    }).onOk(async (response) => {
      if (response?.model) {
        helper.updateModel(model.value, response.model);
      } else {
        await loadData();
      }
    });
  };

  onMounted(() => {
    loadData();
  });
</script>
