import { useEffect, useState } from "react";

const SpecCreator = () => {
  const [inputString, setInputString] = useState<any>();
  const [outputString, setOutputString] = useState<any>();

  function mergeOddEvenLines(input: any) {
    const lines = input.split("\n"); // Split the string into lines
    let mergedLines = [];

    for (let i = 0; i < lines.length; i += 2) {
      // Merge the current odd line with the next even line if it exists
      if (i + 1 < lines.length) {
        mergedLines.push(
          "'" + lines[i] + "'" + ": " + "'" + lines[i + 1] + "'" + ","
        ); // Merge with a space
      } else {
        mergedLines.push(lines[i]); // Add the last odd line if no even line to merge with
      }
    }

    return mergedLines.join("\n"); // Join the merged lines back into a single string
  }
  useEffect(() => {
    if (inputString) {
      setOutputString(mergeOddEvenLines(inputString));
      //   let result = inputString
      //     .split("\n") // Split the text by line breaks
      //     .join("\n")
      //     .replace(/:/g, '":"')
      //     .split("\n") // Split by line breaks
      //     .map((line) => `"${line}",`) // Add double quotes around each line
      //     .join("\n"); // Join lines back with line breaks
      //   setOutputString(result);
    }
  }, [inputString]);

  return (
    <div className="flex space-x-3">
      <textarea
        className="h-[40vw] w-[40vw] border-2 border-gray-300 p-2"
        placeholder="enter input text"
        onChange={(e) => setInputString(e.target.value)}
      />
      <textarea
        value={outputString}
        className="h-[40vw] w-[40vw] border-2 border-gray-300 p-2"
      />
    </div>
  );
};

export default SpecCreator;
