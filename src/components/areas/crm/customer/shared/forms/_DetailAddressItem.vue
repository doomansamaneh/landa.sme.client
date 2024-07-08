<template>
  <q-card flat bordered class="form-container">
    <div :class="$q.screen.gt.xs ? 'q-py-sm q-px-md' : 'q-pb-sm'">
      <div class="row items-center no-wrap">
        <div class="col">
          <div
            class="row items-center text-bold text-body1 no-letter-spacing"
          >
            <q-btn
              unelevated
              size="8px"
              class="q-mr-sm text-caption-sm no-pointer-events no-letter-spacing"
              round
            >
              <span class="text-body2 no-letter-spacing">
                {{ index + 1 }}
              </span>
            </q-btn>
          </div>
        </div>

        <div class="col-auto">
          <q-btn size="11px" round flat @click="addItem()">
            <q-icon size="22px" name="o_add" />
          </q-btn>
          <q-btn size="11px" round flat @click="deleteItem()">
            <q-icon size="22px" name="o_delete" />
          </q-btn>
        </div>
      </div>
    </div>

    <q-separator size="0.5px" :class="{ 'q-mb-md': $q.screen.xs }" />

    <q-card-section>
      <div class="row q-col-gutter-md q-mb-md">
        <div class="col-md col-sm col-xs-12">
          <q-checkbox
            size="46px"
            dense
            v-model="model.isPrimary"
            val="customer"
            label="اصلی"
          />
        </div>
      </div>

      <div class="row q-col-gutter-md q-mb-md">
        <div class="col-md col-sm col-xs-12">
          <q-item-label
            class="text-body2 no-letter-spacing caption-on-dark q-mb-sm"
          >
            نوع
          </q-item-label>
          <custom-select options="" v-model="model.contactTypeId" />
        </div>
        <div class="col-md col-sm col-xs-12">
          <q-item-label
            class="text-body2 no-letter-spacing caption-on-dark q-mb-sm"
          >
            محل جغرافیایی
          </q-item-label>
          <location-lookup
            v-model:selectedId="model.locationId"
            v-model:selectedText="model.locationTitle"
          />
        </div>
      </div>

      <div class="row q-col-gutter-md q-mb-md">
        <div class="col-md col-sm col-xs-12">
          <q-item-label
            class="text-body2 no-letter-spacing caption-on-dark q-mb-sm"
          >
            نشانی
          </q-item-label>
          <custom-input
            v-model="model.address"
            type="textarea"
            autogrow
          />
        </div>
      </div>

      <!-- <div class="row q-gutter-lg q-mb-md">
      <div class="col-md col-sm col-xs-12">
        <q-item-label
          class="text-body2 no-letter-spacing caption-on-dark q-mb-sm"
        >
          طبقه
        </q-item-label>
        <custom-input model="model.floor" />
      </div>
      <div class="col-md col-sm col-xs-12">
        <q-item-label
          class="text-body2 no-letter-spacing caption-on-dark q-mb-sm"
        >
          اتاق
        </q-item-label>
        <custom-input model="model.room" />
      </div>
    </div> -->

      <div class="row q-col-gutter-md q-mb-md">
        <div class="col-md col-sm col-xs-12">
          <q-item-label
            class="text-body2 no-letter-spacing caption-on-dark q-mb-sm"
          >
            کد پستی
          </q-item-label>
          <custom-input model="model.postalCode" />
        </div>
        <div class="col-md col-sm col-xs-12">
          <q-item-label
            class="text-body2 no-letter-spacing caption-on-dark q-mb-sm"
          >
            صندوق پستی
          </q-item-label>
          <custom-input model="model.postBox" />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { ref, computed } from "vue";

  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import LocationLookup from "src/components/shared/lookups/LocationLookup.vue";
  import CustomSelect from "src/components/shared/forms/CustomSelect.vue";

  const props = defineProps({
    item: Object,
    index: Number,
  });

  const model = computed(() => props.item);

  const emit = defineEmits(["item-deleted", "item-added"]);
  const deleteItem = () => {
    emit("item-deleted");
  };
  const addItem = () => {
    emit("item-added");
  };
</script>
