"use client";

import BaseButton from "@/components/Buttons/BaseButton";
import FilePreviewBox from "@/components/imageComponents/FilePreview";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { fetchAdminData } from "@/store/slices/adminSlice";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BsCaretLeftSquare } from "react-icons/bs";
import { twMerge } from "tailwind-merge";
import RolePage from "./rolePage";

const AdminOverViewPage = () => {
    const router = useRouter();
    const params = useParams();
    const adminId = Number(params?.adminOverViewId);

    const dispatch = useAppDispatch();
    const { adminModalData } = useAppSelector((state) => state.admin);

    const [activeMenu, setActiveMenu] = useState("Profile");

    const menuButtons = [
        {
            id: 1,
            name: "Profile",
        },
        // {
        //   id: 2,
        //   name: "User Mapping",
        // },
        {
            id: 3,
            name: "Role",
        },
        // {
        //   id: 4,
        //   name: "Bank",
        // },
    ];


    const userDetails = [
        {
            id: 1,
            label: "name",
            value: adminModalData?.first_name + " " + adminModalData?.last_name,
        },
        // {
        //     id: 2,
        //     label: "PAN Number",
        //     value: "",
        // },
        // {
        //     id: 3,
        //     label: "Aadhar Number",
        //     value: "",
        // },
        {
            id: 4,
            label: "Email",
            value: adminModalData?.email,
        },
        {
            id: 5,
            label: "Phone Number",
            value: adminModalData?.contact_number,
        },
        {
            id: 6,
            label: "address",
            value: [
                adminModalData?.address,
                // adminModalData?.cityName,
                // adminModalData?.stateName,
                // adminModalData?.pincode,
            ]
                .filter(Boolean)
                .join(", "),
        },
    ];

    const companyDetails = [
        {
            id: 1,
            label: "Company Name",
            value: adminModalData?.company_name,
        },
        {
            id: 2,
            label: "GST Type",
            value: adminModalData?.gst_type,
        },
        {
            id: 3,
            label: "GST Number",
            value: adminModalData?.gst_number,
        },
    ];

    useEffect(() => {
        if (adminId) {
            dispatch(fetchAdminData({ adminId: adminId }));
        }
    }, [adminId, dispatch]);
    return (
        <>
            <div className="flex flex-col flex-1 space-y-2 overflow-hidden">
                <div className="">
                    {/* partner overview part */}
                    <div className="p-4 bg-white rounded-lg border border-borderLine flex items-center justify-between">
                        <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4">
                            <div className="flex items-center gap-2">
                                <BsCaretLeftSquare
                                    className="text-avocado cursor-pointer text-font20"
                                    onClick={() => {
                                        router.push("/sa_admin")
                                    }}
                                />
                                <h1 className="text-font12 md:text-font16 font-bold uppercase text-darkOlive">
                                    {adminModalData?.first_name + " " + adminModalData?.last_name}&apos;s Overview
                                </h1>
                            </div>
                            {/* <BaseButton btnName="Back" onBaseButtonClick={() => router.push("/sa_admin")} btnClassName="py-1!" /> */}
                            <div className="flex flex-wrap gap-2">
                                {menuButtons.map((menu) => (
                                    <React.Fragment key={menu.id}>
                                        <div
                                            key={menu.name}
                                            onClick={() => setActiveMenu(menu.name)}
                                            className={twMerge(
                                                "button py-1! font-medium! border border-avocado!",
                                                activeMenu !== menu.name &&
                                                "bg-none! text-avocado! font-medium!",
                                            )}
                                        >
                                            <span>{menu.name}</span>
                                        </div>
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>


                {activeMenu === "Profile" && (<div className="flex flex-col gap-2 overflow-y-auto horizontalScroll">
                    {/* user-info part */}
                    <div className=" bg-white border border-borderLine rounded-lg flex flex-col ">
                        <p className="font-bold text-font16 p-2 md:p-3 border-b border-borderLine">
                            Admin Information
                        </p>
                        <div className="w-full p-2 md:p-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
                            {userDetails.map((item) => (
                                <div key={item?.id} className={` pb-1`}>
                                    <span>
                                        <p className="text-font8 md:text-font10 text-mandalay uppercase font-medium">
                                            {item.label}
                                        </p>

                                        <span className="flex items-center gap-1.5">
                                            <p
                                                className={`text-font10 md:text-font13 font-bold text-darkOlive ${item.label === "Communication Address"
                                                    ? "truncate"
                                                    : ""
                                                    }`}
                                            >
                                                {item.value || "-"}
                                            </p>
                                        </span>
                                    </span>
                                </div>
                            ))}

                        </div>
                    </div>

                    {/* company information part */}
                    <div className=" bg-white border border-borderLine rounded-lg flex flex-col ">
                        <p className="font-bold text-font16 p-2 md:p-3 border-b border-borderLine">
                            Company Information
                        </p>
                        <div className="w-full p-2 md:p-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
                            {companyDetails.map((item) => (
                                <div key={item?.id} className={` pb-1`}>
                                    <span>
                                        <p className="text-font8 md:text-font10 text-mandalay uppercase font-medium">
                                            {item.label}
                                        </p>

                                        <span className="flex items-center gap-1.5">
                                            <p
                                                className={`text-font10 md:text-font13 font-bold text-darkOlive ${item.label === "Communication Address"
                                                    ? "truncate"
                                                    : ""
                                                    }`}
                                            >
                                                {item.value || "-"}
                                            </p>
                                        </span>
                                    </span>


                                </div>
                            ))}
                        </div>
                    </div>

                    {/* profile part */}
                    {adminModalData?.profile_photo && (
                        <div className=" bg-white border border-borderLine rounded-lg flex flex-col ">
                            <p className="font-bold text-font16 p-2 md:p-3 border-b border-borderLine">
                                Profile Information
                            </p>
                            <div className="w-full p-2 md:p-3 flex flex-wrap  gap-2">
                                {adminModalData?.profile_photo && (
                                    <div
                                        className={` w-40 h-40 border border-borderLine rounded-lg bg-white`}
                                    >
                                        <FilePreviewBox
                                            name={adminModalData?.profile_photo?.original_filename}
                                            type={adminModalData?.profile_photo?.content_type}
                                            imageUrl={adminModalData?.profile_photo?.url}
                                        />

                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* document part */}
                    {adminModalData?.documents &&
                        adminModalData?.documents?.length > 0 && (
                            <div className=" bg-white border border-borderLine rounded-lg flex flex-col ">
                                <p className="font-bold text-font16 p-2 md:p-3 border-b border-borderLine">
                                    Document Information
                                </p>
                                <div className="w-full p-2 md:p-3 flex flex-wrap  gap-2">
                                    {adminModalData?.documents?.map((item) => {
                                        return (
                                            <div
                                                key={item?.id}
                                                className={` w-40 h-40 border border-borderLine rounded-lg bg-white`}
                                            >
                                                <FilePreviewBox
                                                    name={item?.original_filename}
                                                    type={item.content_type}
                                                    imageUrl={item.url}
                                                />

                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                </div>)}


                {/* Permission part  */}
                {activeMenu === "Role" && (
                    <RolePage />
                )}


            </div>
        </>
    );
};

export default AdminOverViewPage;