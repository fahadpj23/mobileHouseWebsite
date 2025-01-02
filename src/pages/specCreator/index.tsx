// import { useEffect, useState } from "react";

// const SpecCreator = () => {
//   const [inputString, setInputString] = useState<any>();
//   const [outputString, setOutputString] = useState<any>();

//   function mergeOddEvenLines(input: any) {
//     const lines = input.split("\n"); // Split the string into lines
//     let mergedLines = [];

//     for (let i = 0; i < lines.length; i += 2) {
//       // Merge the current odd line with the next even line if it exists
//       if (i + 1 < lines.length) {
//         mergedLines.push(
//           "'" + lines[i] + "'" + ": " + "'" + lines[i + 1] + "'" + ","
//         ); // Merge with a space
//       } else {
//         mergedLines.push(lines[i]); // Add the last odd line if no even line to merge with
//       }
//     }

//     return mergedLines.join("\n"); // Join the merged lines back into a single string
//   }
//   useEffect(() => {
//     if (inputString) {
//       setOutputString(mergeOddEvenLines(inputString));
//       //   let result = inputString
//       //     .split("\n") // Split the text by line breaks
//       //     .join("\n")
//       //     .replace(/:/g, '":"')
//       //     .split("\n") // Split by line breaks
//       //     .map((line) => `"${line}",`) // Add double quotes around each line
//       //     .join("\n"); // Join lines back with line breaks
//       //   setOutputString(result);
//     }
//   }, [inputString]);

//   return (
//     <div className="flex space-x-3">
//       <textarea
//         className="h-[40vw] w-[40vw] border-2 border-gray-300 p-2"
//         placeholder="enter input text"
//         onChange={(e) => setInputString(e.target.value)}
//       />
//       <textarea
//         value={outputString}
//         className="h-[40vw] w-[40vw] border-2 border-gray-300 p-2"
//       />
//     </div>
//   );
// };

// export default SpecCreator;

import React, { useEffect, useState } from "react";
import app from "constants/firebaseCofig";
import { getDatabase, ref, set, push, get } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { ALLPHONES } from "constants/allPhone";
function SpecCreator() {
  const navigate = useNavigate();

  let [inputValue1, setInputValue1] = useState("");
  let [inputValue2, setInputValue2] = useState("");
  let [data, setData] = useState([]);

  const saveData = async () => {
    // const db = getDatabase(app);
    // ALLPHONES?.map((item: any, key: any) => {
    //   const newDocRef = push(ref(db, "products"));
    //   set(newDocRef, item)
    //     .then(() => {
    //       console.log("data saved successfully");
    //     })
    //     .catch((error) => {
    //       console.log("error: ");
    //     });
    // });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, "products");
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      setData(Object.values(snapshot.val()));
    } else {
      alert("error");
    }
  };
  // useEffect(() => {
  //   data?.length &&
  //     data?.flat()?.map((item, key) => {
  //       // console.log(item);
  //     });
  // }, [data]);
  console.log(data);
  return (
    <div>
      <h1>WRITE/HOMEPAGE</h1>
      <input
        className="border-2 border-gray-400"
        type="text"
        value={inputValue1}
        onChange={(e) => setInputValue1(e.target.value)}
      />
      <input
        className="border-2 border-gray-400"
        type="text"
        value={inputValue2}
        onChange={(e) => setInputValue2(e.target.value)}
      />{" "}
      <br />
      <button onClick={saveData}>SAVE DATA</button>
      <br />
      <br />
      <br />
      <button className="button1" onClick={() => navigate("/updateread")}>
        GO UPDATE READ
      </button>{" "}
      <br />
      <button className="button1" onClick={() => navigate("/read")}>
        GO READ PAGE
      </button>
      {/* {data?.length &&
        data?.map((item, key) => {
          return <div>{item?.name}</div>;
        })} */}
    </div>
  );
}

export default SpecCreator;
