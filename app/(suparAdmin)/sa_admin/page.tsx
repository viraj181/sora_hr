"use client"
import React from "react";
import UserTable from "./userTable";

const AdminPage = () => {
  return <>
    <div className="flex flex-col bg-white rounded-lg flex-1 shadow-olive border border-borderLine">

      <div className="flex items-center gap-2 justify-between p-4 border-b border-borderLine">
        <p className="font-bold uppercase">Admin</p>
        {/* <ModalButton isSubmitting={isSubmitting} handleClose={() => { }} /> */}
      </div>
      <UserTable />
    </div>
  </>;
};

export default AdminPage;
