import { ToFixedTwo } from "@/components/EmptyDataCheck";
import StaticStatus from "@/components/status/StaticStatus";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { IoEyeSharp } from "react-icons/io5";
import ActionDropDown from "@/components/dropDowns/ActionDropDown";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { fetchAdmin, setAdminFilters } from "@/store/slices/adminSlice";
import FullTableLayout from "../_SAComponents/layout/table/FullTableLayout";
import TableRows from "../_SAComponents/layout/table/TableRows";

const UserHeader = [
  { label: "sr.no", width: "w-[50px]" },
  { label: "Date" },
  { label: "user Details" },
  { label: "parent Details" },
  { label: "user Category" },
  { label: "Contact" },
  { label: "Email ID" },
  { label: "main" },
  { label: "pg" },
  { label: "cashin" },
  { label: "commission" },
  { label: "total BL" },
  { label: "Status", width: "w-[130px]" },
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
              item.customIndex,
              item.created_at,
              <>
                <p>{item?.first_name} {item?.last_name}</p>
                <p>{item?.uuid}</p>
              </>,
              <>
                <p>{item?.company_name}</p>
                <p>{item?.gst_number}</p>
              </>,
              item?.gst_type,
              item?.contact_number,
              item?.email,
              item?.address,
              item?.status,
              item?.db_name,
              item?.schema_name,
              <StaticStatus
                key={item.customIndex}
                status={item?.status}
                statusClassName="w-full"
              />,
              <>
                <div className="flex items-center justify-center gap-2">
                  <IoEyeSharp
                    className="text-font18 cursor-pointer text-avocado"
                    onClick={(e) => {
                      e.stopPropagation();
                      // router.push(`/admin/adminOverView/${item.id}`);
                    }}
                  />

                  <ActionDropDown
                    dataSize={adminDataLength}
                    index={index}
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
