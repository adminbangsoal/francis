export const dummyDataTO = [
  {
    id: "1",
    number: 1,
    name: "Try Out No 1",
    caption: "18 Februari 2024",
  },
  {
    id: "2",
    number: 2,
    name: "Try Out No 2",
    caption: "19 Februari 2024",
  },
];

export const dummyQuestion = {
  id: "6d2e5723-b687-48b3-8d15-2f75d02bf44g",
  topic: "string",
  label: "string",
  content: {
    content: "string",
    asset_url: "string",
  },
  options: {
    option_id: "6d2e5723-b687-48b3-8d15-2f75d02bf44a",
    data: [
      {
        choice_id: "6d2e5723-b687-48b3-8d15-2f75d02bf44b",
        key: "A",
        content: "mitochondria",
      },
      {
        choice_id: "6d2e5723-b687-48b3-8d15-2f75d02bf44c",
        key: "B",
        content: "is the",
      },
      {
        choice_id: "6d2e5723-b687-48b3-8d15-2f75d02bf44d",
        key: "C",
        content: "powerhouse",
      },
      {
        choice_id: "6d2e5723-b687-48b3-8d15-2f75d02bf44e",
        key: "D",
        content: "of the",
      },
      {
        choice_id: "6d2e5723-b687-48b3-8d15-2f75d02bf44f",
        key: "E",
        content: "cell",
      },
    ],
  },
};

export const getAllActiveTOProsDummy = {
  mode: "kilat",
  tryouts: [
    {
      id: "12f6e4f0-6a38-4bc2-949a-44283768656e",
      name: "Try Out No 1",
      end_date: "2024-10-30T16:30:00Z",
      start_date: "2024-10-30T16:30:00Z", // started
      started_at: null, // not yet started
      submitted_at: null,
      current_set_id: null,
    },
    {
      id: "12f6e4f0-6a38-4bc2-949a-44283768656e",
      name: "Try Out No 1",
      end_date: "2024-10-30T16:30:00Z",
      start_date: "2024-10-30T16:30:00Z", // started
      started_at: "2024-10-30T16:30:00Z",
      submitted_at: null, // not yet finished
      current_set_id: null,
    },
    {
      id: "12f6e4f0-6a38-4bc2-949a-44283768656e",
      name: "Try Out No 1",
      end_date: "2024-10-30T16:30:00Z",
      start_date: "2024-10-30T16:30:00Z", // started
      started_at: "2024-10-30T16:30:00Z",
      submitted_at: "2024-10-30T16:30:00Z", // finished
      current_set_id: null,
    },
  ],
};

export const getAllActiveTOKilatsDummy = {
  mode: "kilat",
  tryouts: [
    {
      id: "12f6e4f0-6a38-4bc2-949a-44283768656e",
      name: "TO Kilat 1",
      expiry_date: "2024-10-30T16:30:00Z",
      started_at: null, // not yet started
      submitted_at: null,
    },
    {
      id: "12f6e4f0-6a38-4bc2-949a-44283768656f",
      name: "TO Kilat 2",
      expiry_date: "2024-10-30T16:30:00Z",
      started_at: "2024-10-30T16:30:00Z",
      submitted_at: null, // still ongoing
    },
    {
      id: "33f6e4f0-6a38-4bc2-949a-44283768656e",
      name: "TO Kilat 3",
      expiry_date: "2024-10-30T16:30:00Z",
      started_at: "2024-10-30T16:30:00Z",
      submitted_at: "2024-10-30T16:30:00Z", // finished
    },
  ],
};

export const getTOProDetailsDummy = {
  id: "12f6e4f0-6a38-4bc2-949a-44283768656e",
  name: "TO Pro 1",
  expiry_date: "2024-10-30T16:30:00Z",
  description: "blablabalbalbla",
  is_kilat: false,
  sets: [
    {
      id: "12f6e4f0-6a38-4bc2-949a-44283768656g",
      subject_id: "12f6e4f0-6a38-4bc2-949a-44283768656g",
      subject_name: "Penalaran Induktif",
      duration: 10000, // in seconds? @umar
      total_questions: 10,
    },
    {
      id: "12f6e4f0-6a38-4bc2-949a-44283768656g",
      subject_id: "12f6e4f0-6a38-4bc2-949a-44283768656g",
      subject_name: "Penalaran Kuantitatif",
      duration: 30000, // in seconds? @umar
      total_questions: 20,
    },
  ],
  total_sets_questions: 30,
  total_sets_duration: 40000,
  buffer_duration: 500,
  total_duration: 40500,
};

export const getTOKilatDetailsDummy = {
  id: "12f6e4f0-6a38-4bc2-949a-44283768656e",
  name: "TO Kilat 1",
  expiry_date: "2024-10-30T16:30:00Z",
  description: "blablabalbalbla",
  is_kilat: false,
  sets: [
    {
      id: "12f6e4f0-6a38-4bc2-949a-44283768656g",
      subject_id: "12f6e4f0-6a38-4bc2-949a-44283768656g",
      subject_name: "Penalaran Induktif",
      duration: 10000, // in seconds? @umar
      total_questions: 10,
    },
  ],
  total_sets_questions: 10,
  total_sets_duration: 10000,
  buffer_duration: 0,
  total_duration: 10000,
};

export const getAllQuestionsInASet = {
  questions: [
    {
      id: "12f6e4f0-6a38-4bc2-949a-44283768656g",
      is_answered: false,
      is_flagged: false,
    },
    {
      id: "12f6e4f0-6a38-4bc2-949a-44283768656g",
      is_answered: false,
      is_flagged: false,
    },
    {
      id: "12f6e4f0-6a38-4bc2-949a-44283768656g",
      is_answered: false,
      is_flagged: false,
    },
  ],
};

export const getQuestionDetails = {
  id: "12f6e4f0-6a38-4bc2-949a-44283768656g",
  content: "Manakah yang dibawah ini benar?",
  options: [
    {
      id: "12f6e4f0-6a38-4bc2-949a-44283768657g",
      key: "a",
      content: "1 + 1 adalah 4",
    },
    {
      id: "12f6e4f0-6a38-4bc2-949a-44283768654h",
      key: "b",
      content: "1 + 1 adalah 5",
    },
    {
      id: "12f6e4f0-6a38-4bc2-949a-44283768659k",
      key: "c",
      content: "1 + 1 adalah 6",
    },
    {
      id: "12f6e4f0-6a38-4bc2-949a-44283768658i",
      key: "d",
      content: "1 + 1 adalah 7",
    },
  ],
  is_text_answer: false,
  answer: "12f6e4f0-6a38-4bc2-949a-44283768657g",
  is_flagged: true,
};
