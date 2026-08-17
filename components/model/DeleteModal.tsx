import { DeleteApi } from "@/apis/ExtraAips";
import deleteModalImage from "@/image/deleteModalImage.png";
import Image from "next/image";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ModalButton } from "../Buttons/ModalButton";
import { useEffect } from "react";
import useEscapeKey from "@/hooks/useEscapeKey";
import WithoutHeaderModalWrapper from "./WithoutHeaderModalWrapper";
import TransparentScreen from "../loaders/TransparentScreen";
import useTabKey from "@/hooks/useTabKey";

const DeleteModal = ({
  aipData,
  deleteModal,
  url,
  onClose,
  fileName,
}: {
  aipData: { [key: string]: string | number };
  deleteModal: boolean;
  url: string;
  onClose: (isApiCall: boolean) => void;
  fileName: string;
}) => {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    mode: "onSubmit",
  });

  const onSubmit = async () => {
    const deleteApi = await DeleteApi({
      url: url,
      data: aipData,
    });

    if (deleteApi?.status === 200 || deleteApi?.st) {
      toast.success(deleteApi?.msg ?? "deleted successfully!");
      onClose(true);
    } else {
      toast.error(deleteApi?.msg ?? "deleted failed!");
    }
  };

  useTabKey({ isSubmitting });

  useEscapeKey({
    isOpen: deleteModal,
    onClose: () => onClose(false),
  });

  return (
    <>
      {isSubmitting && <TransparentScreen />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <WithoutHeaderModalWrapper model={deleteModal}>
          <div className="flex flex-col  items-center justify-center gap-3 p-4">
            <div className="w-50 h-50">
              <Image
                src={deleteModalImage}
                alt="deleteModalImage"
                width={3000}
                height={100}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="text-center">
              <p className="text-font16 font-bold uppercase">
                Delete {fileName} permanently?
              </p>
              <p className="text-font14 text-center font-light px-5">
                If you delete this {fileName}, you won&apos; be able to recover
                it. Do you want to delete it?
              </p>
            </div>
            <ModalButton
              closeButtonText="Cancel"
              submitButtonText="Delete"
              handleClose={() => onClose(false)}
              isSubmitting={false}
            />
          </div>
        </WithoutHeaderModalWrapper>
      </form>
    </>
  );
};

export default DeleteModal;
