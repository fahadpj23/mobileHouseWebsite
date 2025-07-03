import { FC } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface props {
  TableHead: any;
  TableData: any;
  handleEdit: any;
  handleDelete: any;
}
const TableData: FC<props> = ({
  TableHead,
  TableData,
  handleEdit,
  handleDelete,
}) => {
  return (
    <table className="w-full border-collapse [&_tr:nth-child(odd)]:bg-gray-100">
      <thead>
        <tr>
          <th className="border-black text-left p-2">Sl No</th>
          {TableHead?.map((head: any) => (
            <th key={head?.title} className="border-black text-left p-2">
              {head?.title}
            </th>
          ))}
          <th className="border-black text-left p-2">
            <SettingsIcon />
          </th>
        </tr>
      </thead>

      {TableData?.map((data: any, key: number) => (
        <tbody key={data?.id}>
          <tr>
            <td className="border-black text-left p-2">{key + 1}</td>
            {TableHead?.map((head: any) => (
              <td key={head?.key} className="border-black text-left p-2">
                {head.key === "image" ? (
                  <div>
                    <img
                      src={`http://localhost:9000${data[head?.key]}`}
                      alt={data[head?.key]}
                      style={{
                        width: "100%",
                        height: "80px",
                        objectFit: "contain",
                        borderRadius: "4px",
                      }}
                    />
                  </div>
                ) : (
                  data[head?.key]
                )}
              </td>
            ))}
            <td className="flex space-x-2 border-black text-left p-2">
              <RemoveRedEyeIcon />
              <button onClick={() => handleEdit(data?.id)}>
                <EditIcon />
              </button>
              <button onClick={() => handleDelete(data?.id)}>
                <DeleteIcon />
              </button>
            </td>
          </tr>
        </tbody>
      ))}
    </table>
  );
};
export default TableData;
