"use client";
import { ModalButton } from "@/components/Buttons/ModalButton";
import { adminValidationSchema } from "@/validation/adminSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm, useWatch } from "react-hook-form";
import FormSAInputText from "../../_SAComponents/InputFields/FormSAInputText";
import FormSAInputNumber from "../../_SAComponents/InputFields/FormSAInputNumber";
import FormSASelectStateValue from "../../_SAComponents/InputFields/FormSASelectStateValue";

const gstTypeOption = [
  // { label: "Composition", value: "COMPOSITION" },
  { label: "Regular", value: "REGULAR" },
  { label: "Unregister", value: "UNREGISTER" },
  // { label: "SEZ", value: "SEZ" },
  // { label: "Exports", value: "EXPORTS" },
  // { label: "Ecommerce", value: "ECOMMERCE" },
];

const AdminFormPage = () => {
  const {
    control,
    setValue,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "all",
    resolver: yupResolver(adminValidationSchema),
  });

  const formValues = useWatch({
    control,
  });
  return (
    <>
      <form className="bg-white rounded-lg flex-1 shadow-olive border border-borderLine">
        <div className="flex items-center gap-2 justify-between p-4 border-b border-borderLine">
          <p>create Admin</p>
          <ModalButton isSubmitting handleClose={() => {}} />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 p-4">
          <FormSAInputText
            inputLabel="first name"
            inputName="first_name"
            register={register}
            errors={errors}
            mandatory={true}
            value={formValues.email || ""}
          />
          <FormSAInputText
            inputLabel="last name"
            inputName="last_name"
            register={register}
            errors={errors}
            mandatory={true}
            value={formValues.email || ""}
          />
          <FormSAInputText
            inputLabel="email"
            inputName="email"
            register={register}
            errors={errors}
            mandatory={true}
            value={formValues.email || ""}
          />
          <FormSAInputNumber
            inputLabel="contact name"
            inputName="contact_number"
            control={control}
            errors={errors}
            mandatory={true}
            maxLength={10}
          />
          <FormSAInputText
            inputLabel="company name"
            inputName="company_name"
            register={register}
            errors={errors}
            mandatory={true}
            value={formValues.email || ""}
          />
          <FormSAInputText
            inputLabel="address"
            inputName="address"
            register={register}
            errors={errors}
            mandatory={true}
            value={formValues.email || ""}
          />{" "}
          <FormSAInputText
            inputLabel="gst number"
            inputName="gst_number"
            register={register}
            errors={errors}
            mandatory={true}
            value={formValues.email || ""}
          />
          <FormSASelectStateValue
            options={gstTypeOption}
            name="gst_type"
            selectLabel="gst type"
            control={control}
            errors={errors}
            mandatory
          />
        </div>
      </form>
    </>
  );
};

export default AdminFormPage;
