import React, { forwardRef } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Stack,
} from "@mui/material";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RHFAutoComplete, RHFTextField } from "../../components/hook-form";
import FormProvider from "../../components/hook-form/FormProvider";

const MEMBERS = ["Name 1", "Name 2", "Name 3"];

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateGroupForm = ({handleClose}) => {
  const NewGroupSchema = Yup.object().shape({
    title: Yup.string().required("Group name is Required"),
    members: Yup.array()
      .min(2, "Must have at least 2 members")
      .required("Password is required"),
  });

  const defaultValues = {
    title: "",
    members: [],
  };

  const methods = useForm({
    resolver: yupResolver(NewGroupSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data) => {
    try {
      // API CALL
    } catch (error) {
      console.log(error);
      reset();
      setError("afterSubmit", {
        ...error,
        message: error.message,
      });
    }
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="title" label="Title" />
        <RHFAutoComplete
          name="members"
          label="Members"
          multiple
          freeSolo
          options={MEMBERS.map((option) => option)}
          ChipProps={{ size: "medium" }}
        />
      </Stack>
      <Stack
        spacing={2}
        direction={"row"}
        alignItems={"center"}
        justifyContent={"end"}
      >
        <Button onClick={handleClose}>Close</Button>
        <Button type="submit" variant="contained">
          Create
        </Button>
      </Stack>
    </FormProvider>
  );
};

const CreateGroup = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="xs"
      sx={{ p: 4 }}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle sx={{mb: 3}}>Create New Group</DialogTitle>
      <DialogContent>
        <CreateGroupForm handleClose={handleClose} />
        {/* <DialogContentText id="alert-dialog-slide-description">
          Are you sure you want to block this Contact?
        </DialogContentText> */}
      </DialogContent>
      {/* <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Confirm</Button>
      </DialogActions> */}
    </Dialog>
  );
};

export default CreateGroup;
