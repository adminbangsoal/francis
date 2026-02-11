import { BangCatatanTheme, CatatanTimeline, NoteType } from "@/types/catatan";

export const dummyCatatanTimeline: CatatanTimeline = {
  data: [
    {
      id: "1",
      title: "Example Title 1",
      description: "Example Description 1",
      thumbnail_url: "/illustrations/dummy-catatan.jpg",
      color_pallete: BangCatatanTheme.gray,
      subject_id: "subject_1",
      topic_id: "topic_1",
      note_type: NoteType.catatan,
      like_count: 10,
      download_count: 5,
      author: "Author 1",
      author_picture:
        "https://bangsoal.s3.ap-southeast-1.amazonaws.com/static/user.svg",
      topic: "Topic 1",
      subject: "Subject 1",
    },
    {
      id: "2",
      title: "Example Title 2",
      description: "Example Description 2",
      thumbnail_url: "/illustrations/dummy-catatan.jpg",
      color_pallete: BangCatatanTheme.blue,
      subject_id: "subject_2",
      topic_id: "topic_2",
      note_type: NoteType.pembahasan,
      like_count: 15,
      download_count: 8,
      author: "Author 2",
      author_picture:
        "https://bangsoal.s3.ap-southeast-1.amazonaws.com/static/user.svg",
      topic: "Topic 2",
      subject: "Subject 2",
    },
  ],
  meta: {
    page: 1,
    limit: 10,
    pageCount: 3,
    hasPreviousPage: false,
    hasNextPage: true,
    itemCount: 20,
  },
};
