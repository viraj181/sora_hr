"use client"
import React from "react";
import UserTable from "./userTable";
import TableSearch from "../_SAComponents/layout/shorting/TableSearch";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setAdminFilters } from "@/store/slices/adminSlice";
import BaseButton from "@/components/Buttons/BaseButton";
import { useRouter } from "next/navigation";

const AdminPage = () => {

  const router = useRouter();

  const dispatch = useDispatch();
  const { adminFilters } = useSelector((state: RootState) => state.admin);

  return <>
    <div className="flex flex-col bg-white rounded-lg flex-1 shadow-olive border border-borderLine">

      <div className="flex items-center gap-2 justify-between p-4 border-b border-borderLine">
        <p className="font-bold uppercase">Admin</p>

        <div className="flex items-center gap-2">
          <TableSearch
            onChangeSearch={(search) => {
              dispatch(
                setAdminFilters({ ...adminFilters, search: search }),
              );
            }}
            search={adminFilters.search}
          />
          <BaseButton
            btnName="create admin"
            btnClassName="py-1! w-fit!"
            onBaseButtonClick={() => {
              router.push(`/sa_admin/0`)
            }}
          />
        </div>
      </div>
      <UserTable />
    </div>
  </>;
};

export default AdminPage;
