import { ReactNode } from "react";
import { FaUser } from "react-icons/fa";
import { TbLayoutDashboardFilled } from "react-icons/tb";

interface SubMenuItem {
  id: number;
  name: string;
  label: string;
  url: string | null;
  icon?: ReactNode;
}

interface MenuItem {
  id: number;
  name: string;
  label: string;
  icon: ReactNode;
  url: string | null;
  subMenu?: SubMenuItem[];
}

export const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "dashboard",
    label: "dashboard",
    icon: <TbLayoutDashboardFilled className="w-5 h-5 text-avocado" />,
    url: "/",
  },
  // {
  //   id: 2,
  //   name: "master",
  //   label: "master",
  //   url: null,
  //   icon: <FaIdCardAlt className="w-5 h-5 text-avocado" />,
  //   subMenu: [
  //     {
  //       id: 21,
  //       name: "hsn",
  //       label: "hsn",
  //       url: "/master/hsn",
  //       icon: null,
  //     },

  //     {
  //       id: 22,
  //       name: "globalBank",
  //       label: "global Bank",
  //       url: "/master/globalBank",
  //       icon: null,
  //     },
  //     {
  //       id: 23,
  //       name: "distributorHierarchy",
  //       label: "Distributor Hierarchy",
  //       url: "/master/distributorHierarchy",
  //       icon: null,
  //     },
  //   ],
  // },
  // {
  //   id: 3,
  //   name: "servicesManager",
  //   label: "service manager",
  //   url: null,
  //   icon: <GrServices className="w-5 h-5 text-avocado" />,
  //   subMenu: [
  //     {
  //       id: 31,
  //       name: "service",
  //       label: "service",
  //       url: "/servicesManager/service",
  //       icon: null,
  //     },
  //     {
  //       id: 32,
  //       name: "serviceProvider",
  //       label: "service Provider",
  //       url: "/servicesManager/serviceProvider",
  //       icon: null,
  //     },
  //     {
  //       id: 33,
  //       name: "serviceLabel",
  //       label: "service Label",
  //       url: "/servicesManager/serviceLabel",
  //       icon: null,
  //     },
  //   ],
  // },
  // {
  //   id: 10,
  //   name: "internalOperation",
  //   label: "internal Operation",
  //   icon: <FaUser className="w-5 h-5 text-avocado" />,
  //   url: "/internalOperation",
  // },

  // {
  //   id: 5,
  //   name: "fundRequest",
  //   label: "fund Request",
  //   icon: <GrCurrency className="w-5 h-5 text-avocado" />,
  //   url: null,
  //   subMenu: [
  //     {
  //       id: 51,
  //       name: "banks",
  //       label: "bank",
  //       url: "/fundRequest/banks",
  //       icon: null,
  //     },
  //     {
  //       id: 52,
  //       name: "deposits",
  //       label: "fund Requests",
  //       url: "/fundRequest/deposits",
  //       icon: null,
  //     },
  //   ],
  // },
  // {
  //   id: 6,
  //   name: "capital",
  //   label: "capital",
  //   icon: <GiMoneyStack className="w-5 h-5 text-avocado" />,
  //   url: "/capital",
  // },
  {
    id: 7,
    name: "sa_admin",
    label: "admin",
    icon: <FaUser className="w-5 h-5 text-avocado" />,
    url: "/sa_admin",
  },
  // {
  //   id: 9,
  //   name: "reports",
  //   label: "reports",
  //   icon: <PiChartDonutFill className="w-5 h-5 text-avocado" />,
  //   url: "/reports",
  // },
  // {
  //   id: 8,
  //   name: "setting",
  //   label: "setting",
  //   icon: <IoSettings className="w-5 h-5 text-avocado" />,
  //   url: "/setting",
  // },
  // {
  //   id: 4,
  //   name: "admin",
  //   label: "admin",
  //   icon: <FaUser className="w-5 h-5 text-avocado" />,
  //   url: "/admin",
  // },
];
