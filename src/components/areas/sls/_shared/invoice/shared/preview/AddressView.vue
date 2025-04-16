<template>
  <toolbar buttons margin :title="title" back-button>
    <template #buttons>
      <menu-button-print
        class="primary-gradient primary-shadow text-white text-body2"
        @click="printStore.handlePrint()"
      />
    </template>
  </toolbar>

  <q-card bordered square>
    <div :ref="printStore.printRef">
      <q-card-section>
        <div
          class="address-view"
          style="display: flex; gap: 16px; margin-top: 8px"
        >
          <div
            class="column q-gutter-y-sm q-pa-md col"
            :style="
              $q.dark.isActive
                ? 'border: 1px solid #ffffff'
                : 'border: 1px solid #2d2d2d'
            "
          >
            <div>
              <div
                style="display: flex; gap: 6px; align-items: center"
              >
                <span class="text-body1 text-bold">فرستنده:</span>
                <span>
                  {{ appConfigStore.model.value.companySetting.name }}
                </span>
              </div>
            </div>
            <div class="text-body3">
              <strong>
                {{
                  appConfigStore.model.value.companySetting.location
                }}
                -
              </strong>
              <span class="text-wrap">
                {{
                  appConfigStore.model.value.companySetting.address
                }}
              </span>
            </div>
            <div>
              <div
                style="display: flex; gap: 6px; align-items: center"
              >
                <span class="text-body3 text-bold">کد پستی:</span>
                <span>
                  {{
                    appConfigStore.model.value.companySetting
                      .postalCode
                  }}
                </span>
              </div>
            </div>
            <div>
              <div
                style="display: flex; gap: 6px; align-items: center"
              >
                <span class="text-body3 text-bold">تلفن:</span>
                <span>
                  {{
                    appConfigStore.model.value.companySetting.phone
                  }}
                </span>
              </div>
            </div>
          </div>

          <div
            class="column q-gutter-y-sm q-pa-md col"
            :style="
              $q.dark.isActive
                ? 'border: 1px solid #ffffff'
                : 'border: 1px solid #2d2d2d'
            "
          >
            <div>
              <div
                style="display: flex; gap: 6px; align-items: center"
              >
                <span class="text-body1 text-bold">گیرنده:</span>
                <span>
                  {{ model.customerName }}
                </span>
              </div>
            </div>
            <div class="text-body3">
              <span>
                <strong>
                  {{ model.customerSummary?.address?.locationTitle }}
                  -
                </strong>
                <span class="text-wrap">
                  {{ model.customerSummary?.address?.address }}
                </span>
              </span>
            </div>
            <div>
              <div
                style="display: flex; gap: 6px; align-items: center"
              >
                <span class="text-body3 text-bold">کد پستی:</span>
                <span>
                  {{ model.customerSummary?.address?.postalCode }}
                </span>
              </div>
            </div>
            <div>
              <div
                style="display: flex; gap: 6px; align-items: center"
              >
                <span class="text-body3 text-bold">تلفن:</span>
                <span>
                  {{ model.customerSummary?.phone?.value }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </div>
  </q-card>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { useFormActions } from "src/composables/useFormActions";
  import { useAppConfigModel } from "src/components/areas/cmn/_composables/useAppConfigModel";
  import { usePrint } from "src/composables/usePrint";

  import Toolbar from "src/components/shared/ToolBarDesktop.vue";
  import MenuButtonPrint from "src/components/shared/buttons/MenuButtonPrint.vue";

  const props = defineProps({
    title: String,
  });
  const appConfigStore = useAppConfigModel();
  const printStore = usePrint();
  const route = useRoute();
  const id = computed(() => route.params.id);
  const model = ref({});
  const crudStore = useFormActions("", model, true);

  onMounted(async () => {
    model.value = await crudStore.customGetAction(
      `sls/invoice/getAddress/${id.value}`
    );
  });
</script>
