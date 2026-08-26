"use client";
import TableSearch from "@/app/(suparAdmin)/_SAComponents/layout/shorting/TableSearch";
import FullTableLayout from "@/app/(suparAdmin)/_SAComponents/layout/table/FullTableLayout";
import TableRows from "@/app/(suparAdmin)/_SAComponents/layout/table/TableRows";
import BaseButton from "@/components/Buttons/BaseButton";
import SubmitButton from "@/components/Buttons/SubmitButton";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { fetchAdminRoles, updateAdminRoles } from "@/store/slices/adminSlice";
import { useParams } from "next/navigation";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

type Permission = {
  module_code: string;
  can_view: boolean;
  can_add: boolean;
  can_change: boolean;
  can_delete: boolean;
};

type FormType = {
  permissions: Permission[];
};

// {
// "module_code": "attendance",
//   "module_name": "Attendance",
//     "can_view": false,
//       "can_add": false,
//         "can_change": false,
//           "can_delete": false,
//             "updated_at": null
// }

const retailerHeader = [{
  label: "module name",
}, {
  label: "view",
}, {
  label: "add",
}, {
  label: "updated",
}, {
  label: "delete",
},]

const RolePage = () => {

  const params = useParams();
  const adminId = Number(params?.adminOverViewId);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const { adminPermissionModalData } = useAppSelector((state) => state.admin);

  console.log(adminPermissionModalData, "adminPermissionModalData");



  const { handleSubmit, reset, setValue, watch } = useForm<FormType>({
    defaultValues: {
      permissions: [],
    },
  });

  const permissions = watch("permissions");
  const handlePermissionChange = (
    rowIndex: number,
    field: keyof Omit<Permission, "module_code">,
    checked: boolean
  ) => {
    setValue(`permissions.${rowIndex}.${field}`, checked);
  };

  const onSubmit = async (data: FormType) => {
    const payload = {
      adminId: adminId,
      permissions: data.permissions,
    };

    console.log(payload);

    const res = await dispatch(updateAdminRoles(payload)).unwrap();
    console.log(res, "res");

    if (res) {
      setIsEdit(false);
    }
  };



  useEffect(() => {
    if (adminPermissionModalData?.length) {
      reset({
        permissions: adminPermissionModalData.map((item) => ({
          module_code: item.module_code,
          can_view: item.can_view ?? false,
          can_add: item.can_add ?? false,
          can_change: item.can_change ?? false,
          can_delete: item.can_delete ?? false,
        })),
      });
    }
  }, [adminPermissionModalData, reset]);

  useEffect(() => {
    if (adminId) {
      dispatch(fetchAdminRoles({ adminId }));
    }
  }, [dispatch, adminId]);
  return (
    <>
      {" "}
      <form
        className="flex flex-col overflow-hidden flex-1"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="">
          <div className="flex gap-2 overflow-auto p-4 bg-white border-b border-borderLine rounded-lg horizontalScroll justify-end">
            {!isEdit ? (
              <button
                type="button"
                className="button py-2!"
                onClick={() => setIsEdit(true)}
              >
                edit
              </button>
            ) : (
              <>
                <BaseButton
                  btnName="cancel"
                  onBaseButtonClick={() => {
                    setIsEdit(false);
                  }}
                  btnClassName="py-2!"
                />
                <SubmitButton
                  isSubmitting={false}
                  btnClassName="py-2! max-w-[100px]"
                />
              </>
            )}
          </div>
        </div>
        <FullTableLayout
          headerTitle=""
          tableHeader={retailerHeader}
          dataLength={adminPermissionModalData?.length || 0}
          tableLoader={false}
          totalPages={1}
          totalItems={1}
          pageNumber={1}
          pageLimit={1}
          onclickLimit={(e: number) => {

          }}
          onClickPagination={(page: number) => {

          }}
          viewPagination={false}
        // headerChildren={
        //   <>
        //     <TableSearch
        //       onChangeSearch={(search) => {
        //         dispatch(
        //           setServiceRetailerTransactionsFilters({
        //             ...serviceRetailerTransactionsFilters,
        //             search: search,
        //           }),
        //         );
        //       }}
        //       search={serviceRetailerTransactionsFilters.search}
        //     />
        //   </>
        // }
        >
          {adminPermissionModalData?.map((item, index) => (
            <tr
              key={item.module_code}
              className={`${index % 2 === 0 ? "bg-grayishYellow" : "bg-white"
                } drop-shadow-sm`}
            >
              {[
                item.module_name,

                // View
                <>
                  <input
                    type="checkbox"
                    disabled={!isEdit}
                    checked={permissions[index]?.can_view ?? false}
                    onChange={(e) =>
                      handlePermissionChange(
                        index,
                        "can_view",
                        e.target.checked
                      )
                    }
                    className="w-4 h-4 accent-avocado"
                  />
                </>,

                // Add
                <>
                  <input
                    type="checkbox"
                    disabled={!isEdit}
                    checked={permissions[index]?.can_add ?? false}
                    onChange={(e) =>
                      handlePermissionChange(
                        index,
                        "can_add",
                        e.target.checked
                      )
                    }
                    className="w-4 h-4 accent-avocado"
                  />
                </>,

                // Change
                <>
                  <input
                    type="checkbox"
                    disabled={!isEdit}
                    checked={permissions[index]?.can_change ?? false}
                    onChange={(e) =>
                      handlePermissionChange(
                        index,
                        "can_change",
                        e.target.checked
                      )
                    }
                    className="w-4 h-4 accent-avocado"
                  />
                </>,

                // Delete
                <>
                  <input
                    type="checkbox"
                    disabled={!isEdit}
                    checked={permissions[index]?.can_delete ?? false}
                    onChange={(e) =>
                      handlePermissionChange(
                        index,
                        "can_delete",
                        e.target.checked
                      )
                    }
                    className="w-4 h-4 accent-avocado"
                  />
                </>,
              ].map((cell, cellIndex) => (
                <TableRows
                  key={cellIndex}
                  cell={cell}
                  thIndex={cellIndex}
                  totalHeaders={retailerHeader.length}
                />
              ))}
            </tr>
          ))}

        </FullTableLayout>
      </form>
    </>
  );
};

export default RolePage;
