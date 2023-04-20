<template>
    <div class="fullscreen bg-blue text-white text-center flex flex-center">
        <q-card square class="shadow-24">
            <q-card-section class="bg-deep-purple-7">
                <h4 class="text-h4 text-white">Landa SME</h4>
                <div v-if="showRegister" class="absolute-bottom-right q-pr-md" style="transform: translateY(50%);">
                    <q-btn fab icon="add" color="purple-4" />
                </div>
            </q-card-section>
            <q-card-section>
                <q-form class="q-pt-md" style="width: 320px;">
                    <q-input square clearable v-model="username" type="username" label="Email">
                        <template v-slot:prepend>
                            <q-icon name="person" />
                        </template>
                    </q-input>
                    <q-input class="q-mt-md" square clearable v-model="password" type="password" label="Password">
                        <template v-slot:prepend>
                            <q-icon name="lock" />
                        </template>
                    </q-input>
                </q-form>
            </q-card-section>
            <q-card-actions>
                <q-btn unelevated color="blue" class="q-mx-sm full-width_text-white" label="Sign In"
                    @click="authenticate" />
            </q-card-actions>
            <q-card-section class="text-center q-pa-sm">
                <p class="text-grey-6">Forgot your password?</p>
            </q-card-section>
        </q-card>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import { useAuthStore } from '../../stores';

    const showRegister = 0
    const username = ref('')
    const password = ref('')

    async function authenticate() {
        const authStore = useAuthStore();
        await authStore.login(username.value, password.value);
    }
</script>