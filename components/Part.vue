<template>
  <section>
    <div
      ref="root_element"
      class="flex flex-row"
      data-counter="part"
      data-component-id
    >
      <div class="w-10 font-bold">{{ label }}</div>
      <div class="w-full">
        <div class="flex flex-col space-y-4">
          <slot mdc-unwrap="div" />
        </div>
        <div v-if="marks" class="flex flex-row justify-end">
          <div class="font-bold">
            [{{ marks }} {{ marks > 1 ? "marks" : "mark" }}]
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  marks?: number;
}>();

const part_index = ref<number | null>(null);
const root_element = ref<HTMLElement | null>(null);
const depth = ref(0);

const getLabel = useQuestionNumbering().getLabel;

const label = computed(() => {
  if (part_index.value === null) {
    return "-";
  }
  return getLabel(part_index.value, depth.value);
});

onMounted(() => {
  let current = root_element.value?.parentElement;
  let count = 0;
  let question: string | null = null;

  while (current) {
    console.log(current.dataset.component);
    if (
      current.dataset.counter === "part" ||
      current.dataset.counter === "question"
    ) {
      count++;
    }

    if (current.dataset.question) question = current.dataset.question;
    current = current.parentElement;
  }

  depth.value = count + 1;
  part_index.value = useQuestionNumbering().defineQuestion(
    question ?? "",
    depth.value
  );
});
</script>
