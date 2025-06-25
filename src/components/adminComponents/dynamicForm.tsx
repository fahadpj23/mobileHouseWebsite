import React, { useEffect, useState } from "react";
import { CloudUpload, InsertDriveFile, Close } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";

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
    | "array";
  options?: { value: string | number; label: string }[];
  required?: boolean;
  validation?: Yup.AnySchema;
  fields?: FormField[]; // For array type fields
}

interface DynamicFormProps {
  formFields: FormField[];
  initialValues: FormikValues;
  validationSchema: Yup.ObjectSchema<any>;
  onSubmit: any;
  handleAddButton: any;
  isAddModalOpen: any;
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  formFields,
  initialValues,
  validationSchema,
  onSubmit,
  handleAddButton,
  isAddModalOpen,
}) => {
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
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
              {options.map((option) => (
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
      case "array":
        return (
          <FieldArray name={name}>
            {({ push, remove }) => (
              <Box marginY={2}>
                <Typography variant="h6">{label}</Typography>
                {formik.values[name]?.map((item: any, index: number) => (
                  <Paper
                    key={index}
                    elevation={2}
                    style={{ padding: "16px", margin: "8px 0" }}
                  >
                    <Grid container spacing={2}>
                      {field.fields?.map((subField) => (
                        <Grid item xs={12} sm={6} key={subField.name}>
                          {renderFormField(
                            {
                              ...subField,
                              name: `${name}.${index}.${subField.name}`,
                            },
                            formik
                          )}
                        </Grid>
                      ))}
                      <Grid item xs={12}>
                        <IconButton onClick={() => remove(index)} color="error">
                          <RemoveCircleOutline />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Paper>
                ))}
                <Button
                  startIcon={<AddCircleOutline />}
                  onClick={() => push({})}
                  variant="outlined"
                  color="primary"
                >
                  Add {label}
                </Button>
              </Box>
            )}
          </FieldArray>
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
                              src={`http://localhost:9000${file?.imageUrl}`}
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
      onClose={handleAddButton}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="  bg-white p-4 h-[90%] md:h-[80%] w-[90%] md:w-[80%] overflow-y-auto relative">
        <button onClick={handleAddButton} className="absolute top-2 right-2">
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
                    sm={field.type === "array" ? 12 : 4}
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
