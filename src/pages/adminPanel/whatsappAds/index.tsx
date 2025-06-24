import { useAppDispatch, useAppSelector } from "hooks/useRedux";
// import {
//   fetchWhatsappAds,
//   getProductById,
// } from "store/slice/WhatsappAds/WhatsappAdslice";
// import { useEffect, useState } from "react";

import TableData from "components/adminComponents/table";
import { formFields } from "components/adminComponents/addWhatsappAds/formFields";
import { validationSchema } from "components/adminComponents/addWhatsappAds/validationSchema";
import { initialValues } from "components/adminComponents/addWhatsappAds/initialValue";
// import { ProductTableHead } from "constants/admin/tableHead/WhatsappAds";
import Header from "components/adminComponents/header";
import AddProduct from "components/adminComponents/addWhatsappAds";
import { useEffect, useState } from "react";
import AddWhatsappAds from "components/adminComponents/addWhatsappAds";
// import WhatsappAds from "@components/Home/whatsappAds";
// import WhatsappAds from "@components/Home/WhatsappAds";

const WhatsappAds = () => {
  const dispatch = useAppDispatch();
  //   const { entities, entity } = useAppSelector((state) => state.user.WhatsappAds);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [values, setValues] = useState<any>(initialValues);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  //   const [editId, setEditId] = useState<number>(0);

  //   useEffect(() => {
  //     dispatch(fetchWhatsappAds());
  //   }, []);

  const handleAddButton = () => setIsAddModalOpen(!isAddModalOpen);

  //   const handleEdit = (id: number) => {
  //     setEditId(id);
  //     // dispatch(getProductById(id));
  //   };

  //   useEffect(() => {
  //     if (entity !== null && entity?.id) {
  //       setValues(entity);
  //       setIsEdit(true);
  //     } else setValues(initialValues);
  //   }, [entity]);
  //   console.log(values);
  return (
    <div>
      <Header title="WhatsappAds" handleAddButton={handleAddButton} />

      {/* {Array.isArray(entities) && (
        <TableData
          TableHead={ProductTableHead}
          TableData={entities}
          handleEdit={handleEdit}
        />
      )} */}
      {(isAddModalOpen || isEdit) && (
        <AddWhatsappAds
          handleAddButton={handleAddButton}
          isAddModalOpen={isAddModalOpen || isEdit}
          formFields={formFields}
          validationSchema={validationSchema}
          initialValues={values}
        />
      )}
    </div>
  );
};
export default WhatsappAds;
