<template>
  <!-- <tool-bar :inside="inside" buttons title="قرارداد">
    <template #buttons>
      <q-btn
        :to="`/doc/contract/edit/${id}`"
        class="bg-primary primary-shadow text-white text-body2 no-letter-spacing"
        padding="6px 12px"
        rounded
        unelevated
        no-caps
      >
        <q-icon size="20px" name="o_edit" class="q-mr-xs" />
        ویرایش
      </q-btn>

      <q-btn
        padding="6px 12px"
        class="text-body2 no-letter-spacing"
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
              @click="tableStore.exportAll()"
            >
              <div class="q-py-sm">
                <q-item-section avatar>
                  <q-avatar class="bg-on-dark" size="sm">
                    <q-icon name="o_download" size="20px" />
                  </q-avatar>
                </q-item-section>
              </div>
              <q-item-section>
                <div class="text-body2 no-letter-spacing">
                  {{ $t("shared.labels.eportToExcel") }}
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </template>
  </tool-bar> -->

  <q-markup-table
    flat
    class="border-radius-lg bordered q-mt-sm q-mb-md"
  >
    <tbody>
      <tr>
        <td style="width: 90px">
          <div class="text-body3 no-letter-spacing q-mb-sm">
            شماره
          </div>
        </td>
        <td>
          <div class="text-body3 no-letter-spacing">
            {{ model?.no }}
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <div class="text-body3 no-letter-spacing q-mb-sm">
            عنوان
          </div>
        </td>
        <td>
          <div class="text-body3 no-letter-spacing">
            {{ model?.title }}
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <div class="text-body3 no-letter-spacing q-mb-sm">
            تاریخ
          </div>
        </td>
        <td>
          <div class="text-body3 no-letter-spacing">
            {{ model?.startDate?.substring(0, 10) }} -
            {{ model?.finishDate?.substring(0, 10) }}
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <div class="text-body3 no-letter-spacing q-mb-sm">شرح</div>
        </td>
        <td>
          <div class="text-body3 no-letter-spacing">
            {{ model?.comment }}
          </div>
        </td>
      </tr>
    </tbody>
  </q-markup-table>
</template>

<script setup>
  const props = defineProps({
    model: Object,
  });
</script>
