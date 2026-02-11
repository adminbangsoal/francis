import { useEffect } from "react";

// Updates the height of a <textarea> based on its value changes
const useAutosizeTextArea = (
  textAreaRef: React.RefObject<HTMLTextAreaElement>,
) => {
  useEffect(() => {
    const textArea = textAreaRef.current;
    if (textArea) {
      textArea.style.height = "0px"; // Reset the height to recalculate
      const scrollHeight = textArea.scrollHeight;
      textArea.style.height = `${scrollHeight}px`;
    }
  });
};

export default useAutosizeTextArea;
