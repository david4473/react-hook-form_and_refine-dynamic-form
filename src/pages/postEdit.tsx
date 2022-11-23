import React from "react";
import { Edit, Box, TextField, Button } from "@pankod/refine-mui";
import {
  useForm,
  Controller,
  useFieldArray,
} from "@pankod/refine-react-hook-form";

interface IPost {
  firstName: string;
  email: string;
  skills: string;
}

const defaultValues = {
  firstName: "",
  email: "",
  skills: "",
};

function PostEdit(Props: any) {
  const {
    refineCore: { onFinish },
    saveButtonProps,
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<IPost>({
    mode: "onChange",
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
    rules: {
      required: "please add at least one skill",
    },
  });

  const onSubmit = (values: any) => {
    let fieldValue: string[] = [];
    values.skills.forEach((val: any) => {
      fieldValue.push(val.skills);
    });
    console.log(fieldValue);

    onFinish({
      firstName: values.firstName,
      email: values.email,
      skills: fieldValue,
    });
  };

  return (
    <Edit
      saveButtonProps={saveButtonProps}
      footerButtons={({ defaultButtons }) => (
        <>
          <Button
            type="submit"
            form="myForm"
            style={{ backgroundColor: "#67BE23", color: "white" }}
          >
            Save
          </Button>
        </>
      )}
    >
      <Box component="form" id="myForm" onSubmit={handleSubmit(onSubmit)}>
        <>
          <Controller
            control={control}
            name="firstName"
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors?.firstName}
                helperText={errors.firstName && `${errors.firstName.message}`}
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors?.email}
                helperText={errors.email && `${errors.email.message}`}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
              />
            )}
          />
          {fields.map(({ id }, index) => {
            return (
              <Box key={id} sx={{ display: "inline-flex" }}>
                <Controller
                  control={control}
                  name={`skills[${index}].skills`}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      error={!!errors?.skills}
                      helperText={errors.skills && `${errors.skills.message}`}
                      margin="normal"
                      required
                      fullWidth
                      id="skills"
                      label={`Skill - ${index + 1}`}
                    />
                  )}
                />
                <Button
                  onClick={() => {
                    remove(index);
                  }}
                >
                  delete
                </Button>
              </Box>
            );
          })}
        </>
      </Box>
      <p>{errors.skills && `${errors.skills?.root?.message}`}</p>
      <Button
        variant="outlined"
        fullWidth
        onClick={() => {
          append({ skills: "Javascript" });
        }}
      >
        Add a skill
      </Button>
    </Edit>
  );
}

export default PostEdit;
