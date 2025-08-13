import React, { useEffect, useState } from "react";
import { CloudUpload, InsertDriveFile, Close } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format, parseISO } from "date-fns";

import {
  Formik,
  Form,
  Field,
  FormikProps,
  FormikValues,
  FieldArray,
} from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormHelperText,
  Grid,
  Paper,
  Typography,
  IconButton,
  Box,
  Modal,
} from "@mui/material";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";

import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { fetchSeries } from "store/slice/seriesSlice";

// Define types for our form
interface FormField {
  name: string;
  label: string;
  type:
    | "text"
    | "email"
    | "password"
    | "number"
    | "select"
    | "checkbox"
    | "radio"
    | "file"
    | "date"
    | "subForm"
    | "textarea"
    | "array";
  options?: { value: string | number; label: string }[];
  required?: boolean;
  subForm?: any;
  rows?: any;
  validation?: Yup.AnySchema;
  fields?: FormField[]; // For array type fields
}

interface DynamicFormProps {
  formFields: FormField[];
  initialValues: FormikValues;
  validationSchema: Yup.ObjectSchema<any>;
  onSubmit: any;
  handleForm: any;
  isAddModalOpen: any;
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  formFields,
  initialValues,
  validationSchema,
  onSubmit,
  handleForm,
  isAddModalOpen,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [series, setSeries] = useState<any>(null);
  const [newItemValue, setNewItemValue] = useState<any>("");
  const [image, setImage] = useState<any>("");
  const dispatch = useAppDispatch();
  const { entities, entity } = useAppSelector((state) => state.user.series);
  const [newItemName, setNewItemName] = useState("");
  const [newValueInputs, setNewValueInputs] = useState<{
    [key: number]: string;
  }>({});

  useEffect(() => {
    dispatch(fetchSeries());
  }, []);

  useEffect(() => {
    const newArray =
      Array.isArray(entities) &&
      entities.map((series: any) => ({
        value: series.id,
        label: series.seriesName,
      }));

    setSeries(newArray);
  }, [entities]);

  // Format date for backend (ISO string)
  const formatDateForBackend = (date: Date | null) => {
    return date ? format(date, "yyyy-MM-dd") : null;
  };

  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  };

  //form  dynamic rendering
  const renderFormField = (
    field: FormField,
    formik: FormikProps<FormikValues>
  ) => {
    const { name, label, type, options = [], required = false } = field;
    const error = formik.touched[name] && Boolean(formik.errors[name]);
    const helperText =
      formik.touched[name] && formik.errors[name]
        ? String(formik.errors[name])
        : "";

    switch (type) {
      case "text":
      case "email":
      case "password":
      case "number":
        return (
          <Field
            as={TextField}
            name={name}
            label={label}
            type={type}
            size="small"
            fullWidth
            margin="normal"
            variant="outlined"
            required={required}
            error={error}
            helperText={helperText}
          />
        );
      case "select":
        return (
          <FormControl fullWidth margin="normal" error={error} size="small">
            <InputLabel>{label}</InputLabel>
            <Field as={Select} name={name} label={label} required={required}>
              {name === "seriesId"
                ? series &&
                  series.map((option: any) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))
                : options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
            </Field>
            {error && <FormHelperText>{helperText}</FormHelperText>}
          </FormControl>
        );
      case "checkbox":
        return (
          <FormControlLabel
            control={<Field as={Checkbox} name={name} color="primary" />}
            label={label}
          />
        );
      case "radio":
        return (
          <FormControl component="fieldset" margin="normal" error={error}>
            <Typography variant="subtitle1">{label}</Typography>
            <Field as={RadioGroup} name={name}>
              {options.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio />}
                  label={option.label}
                />
              ))}
            </Field>
            {error && <FormHelperText>{helperText}</FormHelperText>}
          </FormControl>
        );
      case "date":
        return (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label={label}
              value={formik.values[name] ? new Date(formik.values[name]) : null}
              onChange={(date: any) => {
                formik.setFieldValue(name, formatDateForBackend(date));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  margin="normal"
                  size="small"
                  error={error}
                  helperText={helperText}
                  inputProps={{
                    ...params.inputProps,
                    readOnly: true,
                  }}
                />
              )}
            />
          </LocalizationProvider>
        );

      case "subForm":
        return (
          <FieldArray name={name}>
            {({ push, remove }) => {
              // Define options for RAM and Storage
              const ramOptions = ["2", "4", "6", "8", "12", "16", "32"];
              const storageOptions = ["32", "64", "128", "256", "512", "1024"];

              const handleAddVariant = (arrayIndex: number) => {
                let updatedItems: any = [...formik.values[name]];
                updatedItems.push({
                  id: generateId(),
                  ram: "",
                  storage: "",
                  price: "",
                  mrp: "",
                });
                formik.setFieldValue(name, updatedItems);
                setNewItemValue("");
              };

              return (
                <Box marginY={2}>
                  <Typography variant="h6">{label}</Typography>

                  {formik.values[name]?.map(
                    (variant: any, variantIndex: number) => (
                      <Paper
                        key={variantIndex}
                        elevation={1}
                        style={{ padding: "16px", margin: "8px 0" }}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <IconButton
                            onClick={() => remove(variantIndex)}
                            color="error"
                          >
                            <RemoveCircleOutline />
                          </IconButton>
                        </div>

                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6} md={3}>
                            <FormControl fullWidth size="small">
                              <InputLabel>RAM (GB)</InputLabel>
                              <Select
                                value={variant.ram}
                                label="RAM (GB)"
                                onChange={(e) => {
                                  const updatedItems = [...formik.values[name]];
                                  updatedItems[variantIndex].ram =
                                    e.target.value;
                                  formik.setFieldValue(name, updatedItems);
                                }}
                              >
                                {ramOptions.map((option) => (
                                  <MenuItem key={option} value={option}>
                                    {option} GB
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={6} md={3}>
                            <FormControl fullWidth size="small">
                              <InputLabel>Storage (GB)</InputLabel>
                              <Select
                                value={variant.storage}
                                label="Storage (GB)"
                                onChange={(e) => {
                                  const updatedItems = [...formik.values[name]];
                                  updatedItems[variantIndex].storage =
                                    e.target.value;
                                  formik.setFieldValue(name, updatedItems);
                                }}
                              >
                                {storageOptions.map((option) => (
                                  <MenuItem key={option} value={option}>
                                    {option} GB
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={6} md={3}>
                            <TextField
                              label="Price"
                              type="number"
                              value={variant.price}
                              onChange={(e) => {
                                const updatedItems = [...formik.values[name]];
                                updatedItems[variantIndex].price =
                                  e.target.value;
                                formik.setFieldValue(name, updatedItems);
                              }}
                              size="small"
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} md={3}>
                            <TextField
                              label="MRP"
                              type="number"
                              value={variant.mrp}
                              onChange={(e) => {
                                const updatedItems = [...formik.values[name]];
                                updatedItems[variantIndex].mrp = e.target.value;
                                formik.setFieldValue(name, updatedItems);
                              }}
                              size="small"
                              fullWidth
                            />
                          </Grid>
                        </Grid>
                      </Paper>
                    )
                  )}
                  <Button
                    variant="outlined"
                    onClick={() =>
                      handleAddVariant(formik.values[name]?.length)
                    }
                    startIcon={<AddCircleOutline />}
                    sx={{ mb: 2 }}
                  >
                    Add Variant
                  </Button>
                </Box>
              );
            }}
          </FieldArray>
        );
      // case "array":
      //   return (
      //     <FieldArray name={name}>
      //       {({ push, remove }) => {
      //         const handleAddItem = () => {
      //           if (newItemName.trim()) {
      //             push({
      //               id: generateId(),
      //               name: newItemName.trim(),
      //               values: [],
      //             });
      //             setNewItemName("");
      //           }
      //         };

      //         const handleAddValue = (index: number) => {
      //           const valueToAdd = newValueInputs[index]?.trim();
      //           if (!valueToAdd) return;

      //           const updatedItems = [...formik.values[name]];
      //           updatedItems[index].values = [
      //             ...updatedItems[index].values,
      //             valueToAdd,
      //           ];
      //           formik.setFieldValue(name, updatedItems);
      //           setNewValueInputs({ ...newValueInputs, [index]: "" });
      //         };

      //         const handleRemoveValue = (
      //           itemIndex: number,
      //           valueIndex: number
      //         ) => {
      //           const updatedItems = [...formik.values[name]];
      //           updatedItems[itemIndex].values.splice(valueIndex, 1);
      //           formik.setFieldValue(name, updatedItems);
      //         };

      //         return (
      //           <Box marginY={2}>
      //             <Typography variant="h6">{label}</Typography>

      //             {formik.values[name]?.map(
      //               (
      //                 item: { name: string; values: string[] },
      //                 index: number
      //               ) => (
      //                 <Paper
      //                   key={index}
      //                   elevation={2}
      //                   style={{ padding: "16px", margin: "8px 0" }}
      //                 >
      //                   <Box
      //                     display="flex"
      //                     justifyContent="space-between"
      //                     alignItems="center"
      //                     mb={2}
      //                   >
      //                     <Typography variant="subtitle1">
      //                       {item.name}
      //                     </Typography>
      //                     <IconButton
      //                       onClick={() => remove(index)}
      //                       color="error"
      //                     >
      //                       <RemoveCircleOutline />
      //                     </IconButton>
      //                   </Box>

      //                   {/* Values List */}
      //                   <Box mb={2}>
      //                     {item.values.map((value, valueIndex) => (
      //                       <Box
      //                         key={valueIndex}
      //                         display="flex"
      //                         alignItems="center"
      //                         gap={1}
      //                         mb={1}
      //                       >
      //                         <TextField
      //                           value={value}
      //                           onChange={(e) => {
      //                             const updatedItems = [...formik.values[name]];
      //                             updatedItems[index].values[valueIndex] =
      //                               e.target.value;
      //                             formik.setFieldValue(name, updatedItems);
      //                           }}
      //                           fullWidth
      //                           size="small"
      //                         />
      //                         <IconButton
      //                           onClick={() =>
      //                             handleRemoveValue(index, valueIndex)
      //                           }
      //                           size="small"
      //                           color="error"
      //                         >
      //                           <Close fontSize="small" />
      //                         </IconButton>
      //                       </Box>
      //                     ))}
      //                   </Box>

      //                   {/* Add New Value */}
      //                   <Box display="flex" gap={1}>
      //                     <TextField
      //                       value={newValueInputs[index] || ""}
      //                       onChange={(e) =>
      //                         setNewValueInputs({
      //                           ...newValueInputs,
      //                           [index]: e.target.value,
      //                         })
      //                       }
      //                       placeholder="Add new value"
      //                       fullWidth
      //                       size="small"
      //                       onKeyPress={(e) =>
      //                         e.key === "Enter" && handleAddValue(index)
      //                       }
      //                     />
      //                     <Button
      //                       variant="outlined"
      //                       onClick={() => handleAddValue(index)}
      //                       size="small"
      //                     >
      //                       Add Value
      //                     </Button>
      //                   </Box>
      //                 </Paper>
      //               )
      //             )}

      //             {/* Add New Item */}
      //             <Box display="flex" gap={2} mt={2}>
      //               <TextField
      //                 value={newItemName}
      //                 onChange={(e) => setNewItemName(e.target.value)}
      //                 placeholder={`Add new ${label.toLowerCase()}`}
      //                 fullWidth
      //                 size="small"
      //                 onKeyPress={(e) => e.key === "Enter" && handleAddItem()}
      //               />
      //               <Button
      //                 variant="contained"
      //                 onClick={handleAddItem}
      //                 disabled={!newItemName.trim()}
      //               >
      //                 Add Item
      //               </Button>
      //             </Box>
      //           </Box>
      //         );
      //       }}
      //     </FieldArray>
      //   );
      case "array":
        return (
          <FieldArray name={name}>
            {({ push, remove }) => {
              const handleAddItem = () => {
                if (newItemValue.trim()) {
                  push({ name: newItemValue.trim(), images: [] });
                  setNewItemValue("");
                }
              };

              return (
                <Box marginY={2}>
                  <Typography variant="h6">{label}</Typography>

                  {formik.values[name]?.map((item: any, index: number) => (
                    <Paper
                      key={index}
                      elevation={2}
                      style={{ padding: "16px", margin: "8px 0" }}
                    >
                      <div className="flex space-x-2 items-center">
                        <h1>{item?.name}</h1>
                        <IconButton onClick={() => remove(index)} color="error">
                          <RemoveCircleOutline />
                        </IconButton>
                      </div>

                      {/* File Input (Hidden) */}
                      <input
                        accept="image/*"
                        style={{ display: "none" }}
                        id={`${name}-file-input-${index}`} // Unique ID per item
                        multiple
                        type="file"
                        onChange={(event) => {
                          const files = event.currentTarget.files;
                          if (files) {
                            const newFiles = Array.from(files);
                            const updatedItems = [...formik.values[name]];
                            updatedItems[index] = {
                              ...updatedItems[index],
                              images: [
                                ...(updatedItems[index].images || []),
                                ...newFiles,
                              ],
                            };
                            formik.setFieldValue(name, updatedItems);
                          }
                        }}
                      />

                      {/* Preview Uploaded Images */}
                      <div>
                        {item?.id ? (
                          <div className="space-y-2">
                            {item?.images?.map(
                              (file: any, fileIndex: number) => (
                                <img
                                  src={file?.url}
                                  alt={file.name}
                                  style={{
                                    width: "100%",
                                    height: "150px",
                                    objectFit: "contain",
                                    borderRadius: "4px",
                                  }}
                                />
                              )
                            )}
                          </div>
                        ) : (
                          item?.images?.map((file: any, fileIndex: number) =>
                            file.type.startsWith("image/") ? (
                              <img
                                key={fileIndex}
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                                style={{
                                  width: "100%",
                                  height: "150px",
                                  objectFit: "cover",
                                  borderRadius: "4px",
                                }}
                              />
                            ) : (
                              <Box
                                key={fileIndex}
                                style={{
                                  width: "100%",
                                  height: "150px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  backgroundColor: "#f5f5f5",
                                }}
                              >
                                <InsertDriveFile
                                  style={{ fontSize: 48, color: "#757575" }}
                                />
                              </Box>
                            )
                          )
                        )}
                      </div>

                      {/* Upload Button (Now Linked to Correct Input) */}
                      <FormControl fullWidth margin="normal" error={error}>
                        <InputLabel shrink>{label}</InputLabel>
                        <Box mt={2}>
                          <label htmlFor={`${name}-file-input-${index}`}>
                            {" "}
                            {/* Matches input ID */}
                            <Button
                              variant="outlined"
                              component="span"
                              startIcon={<CloudUpload />}
                            >
                              Upload Files
                            </Button>
                          </label>
                        </Box>
                        {error && <FormHelperText>{helperText}</FormHelperText>}
                      </FormControl>
                    </Paper>
                  ))}
                  <Box display="flex" gap={2} mb={2}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      value={newItemValue}
                      onChange={(e) => setNewItemValue(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleAddItem()}
                      label={`Add new ${label.toLowerCase()}`}
                    />
                    <Button
                      variant="contained"
                      onClick={handleAddItem}
                      disabled={!newItemValue.trim()}
                    >
                      Add
                    </Button>
                  </Box>
                </Box>
              );
            }}
          </FieldArray>
        );
      case "textarea":
        return (
          <Field
            as={TextField}
            name={name}
            label={label}
            multiline
            rows={field.rows || 4} // Default to 4 rows if not specified
            fullWidth
            margin="normal"
            variant="outlined"
            required={required}
            error={error}
            helperText={helperText}
          />
        );
      case "file":
        return (
          <FormControl fullWidth margin="normal" error={error}>
            <InputLabel shrink>{label}</InputLabel>
            <Box mt={2}>
              <input
                accept="image/*" // Adjust accepted file types as needed
                style={{ display: "none" }}
                id={`${name}-file-input`}
                multiple
                type="file"
                onChange={(event) => {
                  const files = event.currentTarget.files;
                  if (files) {
                    const newFiles = Array.from(files);
                    const existingFiles = formik.values[name] || [];
                    formik.setFieldValue(name, [...existingFiles, ...newFiles]);
                  }
                }}
              />
              <label htmlFor={`${name}-file-input`}>
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<CloudUpload />}
                >
                  Upload Files
                </Button>
              </label>
            </Box>

            {formik.values[name]?.length > 0 && (
              <Box mt={2}>
                <Grid container spacing={2}>
                  {formik.values[name].map((file: any, index: number) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Paper
                        elevation={2}
                        style={{ padding: "8px", position: "relative" }}
                      >
                        {file?.type ? (
                          file.type.startsWith("image/") ? (
                            <img
                              src={URL.createObjectURL(file)}
                              alt={file.name}
                              style={{
                                width: "100%",
                                height: "150px",
                                objectFit: "cover",
                                borderRadius: "4px",
                              }}
                            />
                          ) : (
                            <Box
                              style={{
                                width: "100%",
                                height: "150px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "#f5f5f5",
                              }}
                            >
                              <InsertDriveFile
                                style={{ fontSize: 48, color: "#757575" }}
                              />
                            </Box>
                          )
                        ) : (
                          <div>
                            <img
                              src={file?.url}
                              alt={file.name}
                              style={{
                                width: "100%",
                                height: "150px",
                                objectFit: "cover",
                                borderRadius: "4px",
                              }}
                            />
                          </div>
                        )}
                        <Typography
                          variant="body2"
                          style={{
                            marginTop: "8px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {file.name}
                        </Typography>
                        <IconButton
                          style={{
                            position: "absolute",
                            top: 4,
                            right: 4,
                            backgroundColor: "rgba(255,255,255,0.7)",
                          }}
                          size="small"
                          onClick={() => {
                            const updatedFiles = [...formik.values[name]];
                            updatedFiles.splice(index, 1);
                            formik.setFieldValue(name, updatedFiles);
                          }}
                        >
                          <Close fontSize="small" />
                        </IconButton>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
            {error && <FormHelperText>{helperText}</FormHelperText>}
          </FormControl>
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      className="flex space-x-3 w-screen h-screen items-center justify-center"
      open={isAddModalOpen}
      onClose={handleForm}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="  bg-white p-4 max-h-[80%] w-[90%] md:w-[80%] overflow-y-auto relative">
        <button
          onClick={() => handleForm()}
          className="absolute top-2 right-2 z-50"
        >
          <CloseIcon />
        </button>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <Form>
              <div className="mt-5"></div>

              <Grid container spacing={3}>
                {formFields.map((field) => (
                  <Grid
                    item
                    xs={12}
                    sm={["array", "subForm"].includes(field.type) ? 12 : 4}
                    key={field.name}
                  >
                    {renderFormField(field, formik)}
                  </Grid>
                ))}
              </Grid>
              <Box marginTop={3}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  // disabled={formik.isSubmitting}
                  size="large"
                >
                  Submit
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default DynamicForm;
