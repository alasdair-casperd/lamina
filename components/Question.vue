<template>
  <h2 class="text-xl font-bold mb-6">Question</h2>
  <div class="flex flex-col gap-10" data-counter="question" :data-question="id">
    <ContentRenderer :value="question" class="question-content" />
  </div>
</template>

<script setup lang="ts">
import type { ContentCollectionItem } from "@nuxt/content";

defineProps<{
  question: ContentCollectionItem;
}>();

onMounted(() => {
  console.log("Question component mounted");
});

const id = generateId();
</script>
