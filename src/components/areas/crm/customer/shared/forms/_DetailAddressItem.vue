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
      <create-or-edit :item="item" />
    </q-card-section>
  </q-card>
</template>

<script setup>
  import CreateOrEdit from "components/areas/crm/customerAddress/shared/forms/_CreateOrEdit.vue";

  const props = defineProps({
    item: Object,
    index: Number,
  });

  const emit = defineEmits(["item-deleted", "item-added"]);
  const deleteItem = () => {
    emit("item-deleted");
  };
  const addItem = () => {
    emit("item-added");
  };
</script>
