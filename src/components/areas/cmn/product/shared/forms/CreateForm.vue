<template>
  <tool-bar
    :title="title"
    :submit-call-back="submitForm"
  >
  </tool-bar>

  <div class="form-container">
    <q-card>
      <q-card-section>
        <q-form
          ref="form"
          autofocus
        >
          <div class="row q-col-gutter-md q-mb-md">
            <div class="col-md-6 col-sm-12 col-xs-12">
              <q-item-label class="caption-on-dark no-letter-spacing text-body2 q-mb-sm">
                گروه کالا
              </q-item-label>
              <product-group-lookup
                v-model:selectedId="formStore.model.value.productGroupId"
                v-model:selectedText="formStore.model.value.productGroupTitle"
              />
            </div>
          </div>

          <div
            class="row q-col-gutter-md"
            :class="$q.screen.gt.xs ? 'q-mb-xl' : 'q-mb-md'"
          >
            <div class="col-md-2 col-sm col-xs-12">
              <q-item-label class="caption-on-dark no-letter-spacing text-body2 q-mb-sm">
                کد
              </q-item-label>
              <custom-input
                hide-bottom-space
                v-model="formStore.model.value.code"
                lazy-rules
                :rules="[(val) => val !== null && val !== '']"
              />
            </div>
            <div class="col-md-2 col-sm col-xs-12">
              <q-item-label class="caption-on-dark no-letter-spacing text-body2 q-mb-sm">
                بارکد
              </q-item-label>
              <custom-input
                hide-bottom-space
                v-model="formStore.model.value.barcode"
              />
            </div>
            <div class="col-md-2 col-sm col-xs-12">
              <q-item-label class="caption-on-dark no-letter-spacing text-body2 q-mb-sm">
                شناسه مالیاتی
              </q-item-label>
              <custom-input
                hide-bottom-space
                v-model="formStore.model.value.taxCode"
              />
            </div>
          </div>

          <div class="row q-col-gutter-md q-mb-md">
            <div class="col-md-6 col-sm-12 col-xs-12">
              <q-item-label class="caption-on-dark no-letter-spacing text-body2 q-mb-sm">
                عنوان
              </q-item-label>
              <custom-input
                hide-bottom-space
                v-model="formStore.model.value.title"
                lazy-rules
                :rules="[(val) => val !== null && val !== '']"
              />
            </div>
          </div>

          <div
            class="row q-col-gutter-md"
            :class="$q.screen.gt.xs ? 'q-mb-xl' : 'q-mb-md'"
          >

            <div class="col-md-3 col-sm col-xs-12">
              <q-item-label class="caption-on-dark no-letter-spacing text-body2 q-mb-sm">
                نوع
              </q-item-label>
              <custom-select
                hide-bottom-space
                v-model="formStore.model.value.typeId"
                :options="helper.getEnumOptions(productType, 'productType')"
              />
            </div>

            <div class="col-md-3 col-sm col-xs-12">
              <q-item-label class="caption-on-dark no-letter-spacing text-body2 q-mb-sm">
                واحد سنجش
              </q-item-label>
              <product-unit-lookup
                v-model:selectedId="formStore.model.value.productUnitId"
                v-model:selectedText="formStore.model.value.productUnitTitle"
              />
            </div>

          </div>

          <div class="row q-col-gutter-md q-mb-md">
            <div class="col-md-3 col-sm col-xs-12">
              <q-item-label class="caption-on-dark no-letter-spacing text-body2 q-mb-sm">
                قیمت خرید
              </q-item-label>
              <custom-input
                hide-bottom-space
                v-model="formStore.model.value.purchasePrice"
                lazy-rules
                :rules="[(val) => val !== null && val !== '']"
              />
            </div>
            <div class="col-md-3 col-sm col-xs-12">
              <q-item-label class="caption-on-dark no-letter-spacing text-body2 q-mb-sm">
                قیمت فروش
              </q-item-label>
              <custom-input
                hide-bottom-space
                v-model="formStore.model.value.price"
                lazy-rules
                :rules="[(val) => val !== null && val !== '']"
              />
            </div>
          </div>

          <div class="row q-col-gutter-md q-mb-md">
            <div class="col-md-6 col-sm-12 col-xs-12">
              <q-item-label class="caption-on-dark no-letter-spacing text-body2 q-mb-sm">
                شرح
              </q-item-label>
              <custom-input
                hide-bottom-space
                v-model="formStore.model.value.comment"
                type="textarea"
              />
            </div>
          </div>

          <div class="row q-gutter-md q-mb-md">

            <q-checkbox
              dense
              size="48px"
              v-model="formStore.model.value.isForPurchase"
              label="برای خرید"
            />

            <q-checkbox
              dense
              size="48px"
              v-model="formStore.model.value.isForSale"
              label="برای فروش"
            />

            <q-checkbox
              dense
              size="48px"
              v-model="formStore.model.value.isActive"
              label="فعال"
            />

          </div>

        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { productType } from "src/constants"
import { helper } from "src/helpers"
import { useProductModel } from "../../../_composables/useProductModel"

import ToolBar from "src/components/shared/FormToolBar.vue"
import CustomInput from "src/components/shared/forms/CustomInput.vue"
import CustomSelect from "src/components/shared/forms/CustomSelect.vue"
import ProductGroupLookup from "src/components/shared/lookups/ProductGroupLookup.vue"
import ProductUnitLookup from "src/components/shared/lookups/ProductUnitLookup.vue"

const props = defineProps({
  action: String,
  title: String,
})

const form = ref(null)
const route = useRoute()
const router = useRouter()
const formStore = useProductModel()

onMounted(() => {
  formStore.crudStore.getById(route.params.id)
})

async function submitForm() {
  await form.value.validate().then(async (success) => {
    if (success) {
      const response = await formStore.crudStore.createOrEdit(props.action)
      if (response?.data?.code === 200) router.go(-1)
    } else {
      //todo: how to show validation message to user
      alert("validation error")
    }
  })
}
</script>
