<template>
  <!-- <tool-bar :inside="inside" buttons title="قرارداد">
    <template #buttons>
      <q-btn no-caps
        :to="`/doc/contract/edit/${id}`"
        class="primary-gradient primary-shadow text-white text-body2 "
        padding="4px 12px"
        rounded
        unelevated
        no-caps
      >
        <q-icon size="20px" name="o_edit" class="q-mr-xs" />
        ویرایش
      </q-btn>

      <q-btn no-caps
        padding="4px 12px"
        class="text-body2 "
        rounded
        unelevated
      >
        <q-icon size="20px" name="more_horiz" class="q-mr-xs" />
        {{ $t("shared.labels.more") }}

        <q-menu class="border-radius-lg" fit :offset="[0, 10]">
          <q-list>
            <q-item
              clickable
              v-close-popup
              tabindex="0"
              @click="exportAll()"
            >
              <div class="q-py-sm">
                <q-item-section avatar>
                  <q-avatar class="bg-on-dark" size="sm">
                    <q-icon name="o_download" size="20px" />
                  </q-avatar>
                </q-item-section>
              </div>
              <q-item-section>
                <div class="text-body2 ">
                  {{ $t("shared.labels.eportToExcel") }}
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </template>
  </tool-bar> -->

  <div class="row q-mb-md">
    <span class="col-1">{{ $t("shared.labels.no") }}:</span>
    <span>{{ model?.no }}</span>
  </div>
  <div class="row q-mb-md">
    <span class="col-1">{{ $t("shared.labels.title") }}:</span>
    <span>{{ model?.title }}</span>
  </div>
  <div class="row q-mb-md">
    <span class="col-1">{{ $t("shared.labels.date") }}:</span>
    <span>
      {{ model?.startDate?.substring(0, 10) }} -
      {{ model?.finishDate?.substring(0, 10) }}
    </span>
  </div>
  <div class="row q-mb-md">
    <span class="col-1">{{ $t("shared.labels.description") }}:</span>
    <span>
      {{ model?.comment }}
    </span>
  </div>
</template>

<script setup>
  const props = defineProps({
    model: Object,
  });
</script>
