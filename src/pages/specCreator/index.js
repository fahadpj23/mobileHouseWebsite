import { useEffect, useState } from "react";

const SpecCreator = () => {
  const [inputString, setInputString] = useState();
  const [outputString, setOutputString] = useState();

  useEffect(() => {
    if (inputString) {
      let result = inputString
        .split("\n") // Split the text by line breaks
        .filter((line) => line.includes(":")) // Keep only lines with a colon
        .join("\n")
        .replace(/:/g, '":"')
        .split("\n") // Split by line breaks
        .map((line) => `"${line}",`) // Add double quotes around each line
        .join("\n"); // Join lines back with line breaks

      setOutputString(result);
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
