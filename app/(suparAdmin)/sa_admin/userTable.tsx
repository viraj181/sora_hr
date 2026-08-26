import { ToFixedTwo } from "@/components/EmptyDataCheck";
import StaticStatus from "@/components/status/StaticStatus";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { IoEyeSharp } from "react-icons/io5";
import ActionDropDown from "@/components/dropDowns/ActionDropDown";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { fetchAdmin, setAdminData, setAdminFilters, updateAdminStatus } from "@/store/slices/adminSlice";
import FullTableLayout from "../_SAComponents/layout/table/FullTableLayout";
import TableRows from "../_SAComponents/layout/table/TableRows";
import toast from "react-hot-toast";
import ToggleButton from "@/components/Buttons/ToggleButton";
import { AdminDataTypes } from "@/types/admintypes";

const UserHeader = [
  { label: "sr.no", width: "w-[50px]" },
  { label: "admin name" },
  { label: "Email ID" },
  { label: "Contact" },
  { label: "company name" },
  { label: "Address" },
  { label: "gst number" },
  { label: "gst type" },
  { label: "status" },
  { label: "on/off" },
  { label: "action", width: "w-[50px]" },
];

const UserTable = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const {
    adminData,
    adminTotalItems,
    adminTotalPages,
    adminDataLength,
    adminFilters,
    adminLoading,
    adminTableDataReload,
  } = useAppSelector((state) => state.admin);

  // toggle button api integration
  const handleServiceStatusChange = async (item: AdminDataTypes) => {
    const response = await dispatch(
      updateAdminStatus({
        id: item?.id,
        status: item?.is_active ? "BLOCKED" : "ACTIVE",
      }),
    ).unwrap();
    console.log("response::", response);

    if (response?.success) {
      toast.success(response?.msg || "Service status updated successfully!");
      const updatedResults = adminData?.map((adminItem) =>
        adminItem.id === item.id ? { ...adminItem, is_active: !adminItem.is_active } : adminItem,
      );
      dispatch(setAdminData({ adminData: updatedResults }));
    }
  };

  useEffect(() => {
    const fetchData = () => {
      dispatch(
        fetchAdmin({
          pageNumber: adminFilters?.page,
          pageSize: adminFilters?.limit,
          search: adminFilters?.search,
        }),
      );
    };
    if (adminFilters?.search) {
      const handler = setTimeout(fetchData, 400);
      return () => clearTimeout(handler);
    } else {
      fetchData();
    }
  }, [
    dispatch,
    adminFilters?.search,
    adminFilters?.page,
    adminFilters?.limit,
    adminTableDataReload,
  ]);

  return (
    <>
      <FullTableLayout
        tableHeader={UserHeader}
        dataLength={adminDataLength}
        tableLoader={adminLoading}
        totalPages={adminTotalPages}
        totalItems={adminTotalItems}
        pageNumber={adminFilters.page}
        pageLimit={adminFilters.limit}
        onclickLimit={(e: number) => {
          dispatch(setAdminFilters({ ...adminFilters, limit: e }));
        }}
        onClickPagination={(page: number) => {
          dispatch(setAdminFilters({ ...adminFilters, page: page }));
        }}
      >
        {adminData?.map((item, index) => (
          <tr
            key={item.customIndex}
            className={`${index % 2 === 0 ? "bg-grayishYellow" : "bg-white"} drop-shadow-sm`}
          >
            {[
              item.customIndex || item.id,
              <>
                <p>{item?.first_name} {item?.last_name}</p>
              </>,
              <>
                <p>{item?.email}</p>
              </>,
              item?.contact_number,
              item?.company_name,
              item?.address,
              item?.gst_number,
              item?.gst_type,

              <>

                <StaticStatus
                  key={item.customIndex}
                  status={item?.status}
                  statusClassName="w-full"
                />
              </>,
              <>
                <div className="flex items-center justify-center">
                  <ToggleButton
                    isActive={item?.is_active}
                    toggleClick={() => {
                      handleServiceStatusChange(item);
                    }}
                  />
                </div>
              </>,
              <>
                <div className="flex items-center justify-center gap-2">
                  <IoEyeSharp
                    className="text-font18 cursor-pointer text-avocado"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/sa_admin/adminOverView/${item.id}`);
                    }}
                  />


                </div>
              </>,
            ].map((cell, cellIndex) => {
              return (
                <TableRows
                  key={cellIndex}
                  cell={cell}
                  thIndex={cellIndex}
                  totalHeaders={UserHeader.length}
                />
              );
            })}
          </tr>
        ))}
      </FullTableLayout>
    </>
  );
};

export default UserTable;
