<template>
  <div class="q-pa-md">
    <custom-button
      class="text-body2 primary-shadow primary-gradient q-mb-md"
      text-color="white"
      icon="o_edit"
      :title="$t('shared.labels.edit')"
      @click="edit"
    />

    <div class="q-gutter-md">
      <div>
        <div class="row items-center q-gutter-sm">
          <div class="col-auto">شناسه ملی:</div>
          <div class="col text-body2 text-weight-700">
            {{ model.nationalNo }}
            <copy-clipboard
              v-if="model.nationalNo"
              :text="model.nationalNo"
            />
          </div>
        </div>
      </div>
      <div>
        <div class="row items-center q-gutter-sm">
          <div class="col-auto">کد اقتصادی:</div>
          <div class="col text-body2">
            {{ model.taxNo }}
          </div>
        </div>
      </div>
      <div>
        <div
          class="row items-center q-gutter-sm"
          v-if="model.branchNo"
        >
          <div class="col-auto">کد شعبه:</div>
          <div class="col text-body2">
            {{ model.branchNo }}
          </div>
        </div>
      </div>
      <div>
        <div
          class="row items-center q-gutter-sm"
          v-if="model.insuranceWorkNo"
        >
          <div class="col-auto">شناسه کارگاه بیمه:</div>
          <div class="col text-body2">
            {{ model.insuranceWorkNo }}
          </div>
        </div>
      </div>
      <div>
        <div class="row items-center q-gutter-sm">
          <div class="col-auto">شماره ثبت:</div>
          <div class="col text-body2">
            {{ model.regNo }}
          </div>
        </div>
      </div>
      <div>
        <div class="row items-center q-gutter-sm">
          <div class="col-auto">تاریخ ثبت:</div>
          <div class="col text-body2">
            {{ model.regDate?.substring(0, 10) }}
          </div>
        </div>
      </div>
      <div>
        <div class="row">
          <div class="col-auto">شرح:</div>
          <div class="col">
            {{ model.comment }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, ref, watch } from "vue";
  import { formAction } from "src/constants";
  import { useFormActions } from "src/composables/useFormActions";
  import { useDialog } from "src/composables/useDialog";

  import CopyClipboard from "src/components/shared/buttons/CopyClipboard.vue";
  import CustomButton from "src/components/shared/buttons/CustomButton.vue";
  import CreateForm from "../../../customerBusiness/shared/forms/CreateForm.vue";

  const props = defineProps({
    item: Object,
  });

  const dialogStore = useDialog();
  const model = ref({});
  const formStore = useFormActions(
    "crm/customerBusiness",
    model,
    true
  );

  const action = ref(formAction.create);
  const loadData = async () => {
    const responseData = await formStore.getById(props.item?.id);
    if (responseData) action.value = formAction.edit;
  };

  const edit = () => {
    dialogStore.openDialog({
      title: "shared.labels.business",
      component: CreateForm,
      actionBar: true,
      props: {
        id: props.item.id,
        action: action.value,
      },
      okCallback: async (response) => {
        await loadData();
      },
    });
  };

  onMounted(() => {
    loadData();
  });

  watch(
    () => props.item.id,
    async (newId) => {
      if (newId) {
        await loadData();
      }
    },
    { immediate: true }
  );
</script>
