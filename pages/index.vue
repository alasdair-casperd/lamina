<template>
  <QuestionContainer>
    <Question v-if="example_question" :question="example_question"></Question>
  </QuestionContainer>
</template>

<script setup lang="ts">
const { data: example_question } = await useAsyncData(() =>
  queryCollection("content").path("/").first()
);

useSeoMeta({
  title: example_question.value?.title,
  description: example_question.value?.description,
});
</script>
