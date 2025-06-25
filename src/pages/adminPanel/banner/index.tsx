import { useAppDispatch, useAppSelector } from "hooks/useRedux";
// import {
//   fetchBanner,
//   getProductById,
// } from "store/slice/Banner/Bannerlice";
// import { useEffect, useState } from "react";

import TableData from "components/adminComponents/table";
import { formFields } from "components/adminComponents/addBanner/formFields";
import { validationSchema } from "components/adminComponents/addBanner/validationSchema";
import { initialValues } from "components/adminComponents/addBanner/initialValue";
import { BannerTableHead } from "constants/admin/tableHead/banner";
import Header from "components/adminComponents/header";
import AddBanner from "components/adminComponents/addBanner";
import { useEffect, useState } from "react";
import { fetchBanners } from "store/slice/bannerSlice";

const Banner = () => {
  const dispatch = useAppDispatch();
  const { entities, entity } = useAppSelector((state) => state.user.banner);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [values, setValues] = useState<any>(initialValues);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editId, setEditId] = useState<number>(0);

  useEffect(() => {
    dispatch(fetchBanners());
  }, []);
  console.log(entities);
  const handleAddButton = () => setIsAddModalOpen(!isAddModalOpen);

  const handleEdit = (id: number) => {
    setEditId(id);
    //   dispatch(getProductById(id));
  };

  //   useEffect(() => {
  //     if (entity !== null && entity?.id) {
  //       setValues(entity);
  //       setIsEdit(true);
  //     } else setValues(initialValues);
  //   }, [entity]);
  //   console.log(values);
  return (
    <div>
      <Header title="Banner" handleAddButton={handleAddButton} />

      {Array.isArray(entities) && (
        <TableData
          TableHead={BannerTableHead}
          TableData={entities}
          handleEdit={handleEdit}
        />
      )}
      {(isAddModalOpen || isEdit) && (
        <AddBanner
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
export default Banner;
