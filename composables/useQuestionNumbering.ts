/**
 * Trackers
 */
const state = ref<{ [key: number]: number }>({});
const current_question = ref<string | null>(null);

export default () => {
  /**
   * Methods
   */
  const defineQuestion = (id: string, depth: number): number => {
    // If this is a new question, reset the counter
    if (current_question.value !== id) state.value = {};
    // Store the current question
    current_question.value = id;

    // Initialise the counter, if required
    if (state.value[depth] === undefined) state.value[depth] = 0;

    // Reset all higher depth counters
    for (const key in state.value) {
      if (parseInt(key) > depth) {
        state.value[key] = 0;
      }
    }

    const output = state.value[depth];
    state.value[depth] += 1;
    return output;
  };

  /**
   * Get the label for a question based on its number and depth.
   */
  const getLabel = (number: number, depth: number): string => {
    const labelling_systems: ((x: number) => string)[] = [
      (x) => `${x}`,
      (x) => `(${convertToLetters(x)})`,
      (x) => `(${convertToRomanNumerals(x).toLowerCase()})`,
      (x) => `(${convertToRomanNumerals(x)})`,
    ];

    return labelling_systems[(depth - 1) % labelling_systems.length](
      number + 1
    );
  };

  return { defineQuestion, getLabel };

  /**
   * Helpers
   */

  /**
   * Convert a number to a letter (1 = a, 2 = b, etc.)
   */
  function convertToLetters(input: number) {
    return "abcdefghijklmnopqrstuvwxyz".charAt(input - 1) || "";
  }

  /**
   * Convert a number to Roman numerals
   */
  function convertToRomanNumerals(input: number) {
    if (isNaN(input)) return "";
    var digits = String(+input).split(""),
      key = [
        "",
        "C",
        "CC",
        "CCC",
        "CD",
        "D",
        "DC",
        "DCC",
        "DCCC",
        "CM",
        "",
        "X",
        "XX",
        "XXX",
        "XL",
        "L",
        "LX",
        "LXX",
        "LXXX",
        "XC",
        "",
        "I",
        "II",
        "III",
        "IV",
        "V",
        "VI",
        "VII",
        "VIII",
        "IX",
      ],
      roman = "",
      i = 3;
    while (i--) {
      const digit = digits.pop() ?? "0";
      roman = (key[+digit + i * 10] || "") + roman;
    }
    return Array(+digits.join("") + 1).join("M") + roman;
  }
};
