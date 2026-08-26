"use client";
import { ModalButton } from "@/components/Buttons/ModalButton";
import { adminValidationSchema } from "@/validation/adminSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm, useWatch } from "react-hook-form";
import FormSAInputText from "../../_SAComponents/InputFields/FormSAInputText";
import FormSAInputNumber from "../../_SAComponents/InputFields/FormSAInputNumber";
import FormSASelectStateValue from "../../_SAComponents/InputFields/FormSASelectStateValue";
import UploadImageArray, { ImageUrlDataType } from "@/components/imageComponents/UploadImageArray";
import ImageUpload from "../../_SAComponents/InputFields/ImageUpload";
import { AdminFormValues } from "@/types/admintypes";
import { UploadImageApi } from "@/apis/ExtraAips";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hook";
import { createAdmin } from "@/store/slices/adminSlice";

const gstTypeOption = [
  // { label: "Composition", value: "COMPOSITION" },
  { label: "REGISTERED", value: "REGISTERED" },
  { label: "UNREGISTERED", value: "UNREGISTERED" },
  // { label: "SEZ", value: "SEZ" },
  // { label: "Exports", value: "EXPORTS" },
  // { label: "Ecommerce", value: "ECOMMERCE" },
];

const AdminFormPage = () => {

  const router = useRouter();

  const dispatch = useAppDispatch();

  const [image, setImage] = useState<string | File | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [imageUrlData, setImageUrlData] = useState<ImageUrlDataType[]>([]);

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

  const handelDeleteUrlData = (id: number | string) => {
    setImageUrlData((prev) => prev.filter((item) => item.id !== id));
  };
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {

    const profileRes = await UploadImageApi({
      uploadedFiles: image ? [image as File] : [],
      fileType: "PROFILE_PHOTO",
    });

    console.log("profileRes", profileRes);

    const documentsRes = await UploadImageApi({
      uploadedFiles: uploadedFiles,
      fileType: "DOCUMENT",
    });
    console.log("documentsRes", documentsRes);
    if (profileRes?.st && documentsRes?.st) {

      const payload = {
        first_name: data?.first_name,
        last_name: data?.last_name,
        email: data?.email,
        contact_number: data?.contact_number,
        company_name: data?.company_name,
        address: data?.address,
        gst_number: data?.gst_number,
        gst_type: data?.gst_type,
        profile_photo_id: profileRes?.files?.[0]?.id || 0,
        documents: documentsRes?.files && documentsRes?.files.length > 0 ? documentsRes?.files.map((file: { id: number }) => file.id) : [],
      };
      const res = await dispatch(createAdmin(payload)).unwrap();
      console.log("res", res);
      if (res) {
        router.back();
      }
    }


  }

  return (
    <>
      <form className="flex flex-col overflow-y-hidden bg-white rounded-lg flex-1 shadow-olive border border-borderLine" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center gap-2 justify-between p-4 border-b border-borderLine">
          <p className="font-bold uppercase">create Admin</p>
          <ModalButton isSubmitting={isSubmitting} handleClose={() => {
            router.back();
          }} />
        </div>
        <div className="flex-1 overflow-auto">

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 p-4">
            <FormSAInputText
              inputLabel="first name"
              inputName="first_name"
              register={register}
              errors={errors}
              mandatory={true}
              value={formValues.first_name || ""}
            />
            <FormSAInputText
              inputLabel="last name"
              inputName="last_name"
              register={register}
              errors={errors}
              mandatory={true}
              value={formValues.last_name || ""}
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
              value={formValues.company_name || ""}
            />
            <FormSAInputText
              inputLabel="address"
              inputName="address"
              register={register}
              errors={errors}
              value={formValues.address || ""}
            />{" "}
            <FormSAInputText
              inputLabel="gst number"
              inputName="gst_number"
              register={register}
              errors={errors}
              value={formValues.gst_number || ""}
            />
            <FormSASelectStateValue
              options={gstTypeOption}
              name="gst_type"
              selectLabel="gst type"
              control={control}
              errors={errors}
            />
          </div>
          <div className="p-4 pt-0">

            <p className="mb-2 font-bold uppercase">profile picture</p>
            <div className="flex items-start w-40  mb-2 ">
              <ImageUpload image={image} setImage={setImage} />
            </div>
            <p className="mb-2 font-bold uppercase">upload admin related documents</p>
            <UploadImageArray
              uploadedFiles={uploadedFiles}
              setUploadedFiles={setUploadedFiles}
              imageUrlData={imageUrlData}
              handelDeleteUrlData={handelDeleteUrlData}
            />


          </div>
        </div>
      </form>
    </>
  );
};

export default AdminFormPage;
