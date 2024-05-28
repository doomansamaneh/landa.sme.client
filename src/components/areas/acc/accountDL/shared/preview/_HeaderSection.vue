<template>
  <q-markup-table
    flat
    class="border-radius-lg bordered q-mt-sm q-mb-md"
  >
    <tbody>
      <tr>
        <td style="width: 90px">
          <div class="text-body3 no-letter-spacing q-mb-sm">
            عنوان
          </div>
        </td>
        <td>
          <div class="text-body3 no-letter-spacing">
            {{ model.code }} / {{ model.title }}
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
