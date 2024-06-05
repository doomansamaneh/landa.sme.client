<template>
  <div class="q-my-lg">
    <div class="invoice-preview-timeline">
      <q-timeline color="accent">
        <q-timeline-entry
          avatar="https://cdn.quasar.dev/img/avatar2.jpg"
          v-for="item in items"
          :key="item"
        >
          <template #default>
            <q-card class="bordered-1 no-shadow q-ml-sm">
              <q-card-section
                class="row justify-between items-center q-gutter-sm"
              >
                <div class="row items-center q-gutter-x-sm">
                  <q-icon
                    :name="item.icon"
                    size="sm"
                    color="accent"
                  />
                  <div class="text-caption text-bold">
                    {{ item.name }}
                  </div>
                  <div class="row items-center">
                    <span class="text-caption">چند دقیقه پیش</span>
                    <q-tooltip
                      transition-show="scale"
                      transition-hide="scale"
                      :delay="700"
                      class="custom-tooltip text-caption"
                    >
                      {{ item.date }}
                    </q-tooltip>
                  </div>
                </div>
                <q-item-label class="row text-caption-sm" caption>
                  {{ item.systemInfo }}
                </q-item-label>
              </q-card-section>
              <q-card-section
                v-if="item.commentValue"
                class="q-pt-none"
              >
                <p
                  class="text-caption line-height-xs no-letter-spacing"
                  contenteditable="true"
                  v-show="!editCommentBtn"
                >
                  {{ item.comment }}
                </p>
                <div class="q-gutter-y-md" v-show="editCommentBtn">
                  <q-editor
                    v-model="editCommentValue"
                    class="text-caption"
                  />
                  <div class="q-gutter-x-sm">
                    <q-btn
                      @click="editCommentBtn = false"
                      padding="4px 12px"
                      flat
                      rounded
                      class="primary-gradient text-white text-body3"
                    >
                      <q-icon
                        name="o_comment"
                        size="xs"
                        class="q-mr-sm"
                      />
                      <span>ذخیره</span>
                    </q-btn>
                    <q-btn
                      @click="editCommentBtn = false"
                      unelevated
                      rounded
                      class="text-on-dark"
                    >
                      <q-icon
                        name="o_close"
                        size="xs"
                        class="q-mr-xs"
                      />
                      <span>انصراف</span>
                    </q-btn>
                  </div>
                </div>
                <div v-if="!editCommentBtn" class="row justify-start">
                  <q-btn
                    @click="editComment"
                    padding="4px 12px"
                    unelevated
                    rounded
                    class="text-on-dark text-body3"
                  >
                    <q-icon name="o_edit" size="xs" class="q-mr-sm" />
                    <span>ویرایش</span>
                  </q-btn>
                  <q-btn
                    @click="deleteAlert"
                    padding="4px 12px"
                    unelevated
                    rounded
                    class="text-on-dark text-body3"
                  >
                    <q-icon
                      name="o_delete"
                      size="xs"
                      class="q-mr-sm"
                    />
                    <span>حذف</span>
                  </q-btn>
                </div>
              </q-card-section>
            </q-card>
          </template>
        </q-timeline-entry>
      </q-timeline>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useRoute } from "vue-router";

  const props = defineProps({
    item: Object,
    formStore: Object,
  });

  const route = useRoute();

  const editor = ref("");
  const editCommentBtn = ref(false);
  const id = computed(() => props.item?.id ?? route.params.id);
</script>
