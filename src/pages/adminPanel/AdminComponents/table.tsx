import { FC } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface props {
  TableHead: any;
  TableData: any;
}
const TableData: FC<props> = ({ TableHead, TableData }) => {
  console.log(TableData);
  return (
    <table className="w-full border-collapse [&_tr:nth-child(odd)]:bg-gray-100">
      <tr>
        <th className="border-black text-left p-2">Sl No</th>
        {TableHead?.map((head: any) => (
          <th className="border-black text-left p-2">{head?.title}</th>
        ))}
        <th className="border-black text-left p-2">
          <SettingsIcon />
        </th>
      </tr>

      {TableData?.map((data: any, key: number) => (
        <tr>
          <td className="border-black text-left p-2">{key + 1}</td>
          {TableHead?.map((head: any) => (
            <td className="border-black text-left p-2">{data[head?.key]}</td>
          ))}
          <td className="flex space-x-2 border-black text-left p-2">
            <RemoveRedEyeIcon />
            <EditIcon />
            <DeleteIcon />
          </td>
        </tr>
      ))}
    </table>
  );
};
export default TableData;
