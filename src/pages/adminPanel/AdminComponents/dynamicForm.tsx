import React from "react";
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
} from "@mui/material";
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
  // onSubmit: (values: FormikValues) => void;
  onSubmit: any;
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  formFields,
  initialValues,
  validationSchema,
  onSubmit,
}) => {
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
          <FormControl fullWidth margin="normal" error={error}>
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
      default:
        return null;
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form>
          <Grid container spacing={2}>
            {formFields.map((field) => (
              <Grid
                item
                xs={12}
                sm={field.type === "array" ? 12 : 6}
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
              disabled={formik.isSubmitting}
              size="large"
            >
              Submit
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default DynamicForm;
