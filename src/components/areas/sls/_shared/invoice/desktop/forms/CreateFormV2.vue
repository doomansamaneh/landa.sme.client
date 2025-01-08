<template>
  <div class="row q-col-gutter-sm">
    <div class="col-md-4">
      <select-product
        :form-store="formStore"
        :model="model"
        :form-type="formType"
      />
    </div>
    <div class="col-md-8">
      <q-card bordered class="fit">
        <q-card-section>
          <div class="q-gutter-md">
            <div>
              <master-section
                :form-store="formStore"
                :model="model"
                :form-type="formType"
              />
            </div>

            <q-separator
              size="1px"
              :color="$q.dark.isActive ? 'white' : 'grey-8'"
            />
            <div>
              <detail-section
                :form-store="formStore"
                :model="model"
                :form-type="formType"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
  import SelectProduct from "./v2/SelectProduct.vue";
  import MasterSection from "./v2/MasterSection.vue";
  import DetailSection from "./v2/DetailSectionTable.vue";

  const props = defineProps({
    formStore: Object,
    formType: Object,
    model: Object,
  });
</script>
