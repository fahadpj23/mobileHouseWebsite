import { useEffect, useState } from "react";
import axios from "axios";

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

  const [formData, setFormData] = useState<any>({
    name: "54",
    ram: "5",
    storage: "10",
    price: "45000",
    mrp: "50000",
    brand: "vivo",
    series: "vivo",
    networkType: "5g",
    category: "1",
    display: "6",
    frontCamera: "4",
    rearCamera: "5",
    os: "d",
    processor: "f",
    battery: "54",
  });
  const [file, setFile] = useState<File | null>(null);

  const submitForm = async () => {
    // 1. Create a FormData object
    // This is flexible and works for both text data and file uploads.
    const productData: any = new FormData();

    // 2. Append all key-value pairs from our state to the FormData object
    for (const key in formData) {
      productData.append(key, formData[key]);
    }
    productData.append("file", file);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    try {
      // 3. Send the POST request using fetch
      const response = await axios.post(
        "http://localhost:9000/api/products/",
        productData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      // 4. Handle the response from the server
      // if (!response.ok) {
      //   // If the server response is not OK (e.g., status 400, 500)
      //   const errorData = await response.json();
      //   throw new Error(
      //     errorData.message || `HTTP error! Status: ${response.status}`
      //   );
      // }

      // const result = await response.json();
      // console.log("Success:", result);
      // Optionally, you can reset the form here
      // setFormData({ name: '', ram: '', ... });
    } catch (err) {
      console.error("Error submitting form:", err);
    } finally {
      console.log(false);
    }
  };
  const handleFileChange = (e: any) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="flex space-x-3">
      <button onClick={submitForm} className="bg-red-500">
        form submit
      </button>
      <input type="file" onChange={handleFileChange} required />
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
