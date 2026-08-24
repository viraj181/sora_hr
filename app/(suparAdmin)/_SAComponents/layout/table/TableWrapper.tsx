import React from "react";
import NoData from "./NoData";
import TableLoader from "@/components/loaders/TableLoader";
import TableHeader from "./TableHeader";
import { TableWrapperProps } from "@/types/tableLayoutTypes";

const TableWrapper = ({
  dataLength,
  loader,
  HeaderArray,
  action,
  children,
}: TableWrapperProps) => {
  return (
    <div className="relative h-full overflow-auto horizontalScroll whitespace-nowrap bg-white horizontalScroll">
      <table
        className={`w-full border-separate border-spacing-y-1.5 ${loader || dataLength <= 0 ? "h-full" : ""
          }`}
      >
        <thead>
          <tr className="linearBackGround text-white sticky top-0 z-1">
            {HeaderArray.map((value, thIndex) => (
              <TableHeader
                key={thIndex}
                value={value}
                thIndex={thIndex}
                totalHeaders={HeaderArray.length}
                action={action}
              />
            ))}
          </tr>
        </thead>

        {loader ? (
          <tbody>
            <tr>
              <td colSpan={HeaderArray.length}>
                <TableLoader />
              </td>
            </tr>
          </tbody>
        ) : dataLength > 0 ? (
          <tbody className="divide-y divide-[--border]">{children}</tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan={HeaderArray.length}>
                <NoData />
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};

export default TableWrapper;

// import React from "react";
// import NoData from "./NoData";
// import TableLoader from "./TableLoader";
// import TableHeader from "./TableHeader";

// type Header = {
//   label: string;
//   align?: string;
//   width?: string;
//   onClick?: () => void;
//   headerIcon?: React.ReactNode;
// };

// interface TableWrapperProps {
//   dataLength: number;
//   loader: boolean;
//   HeaderArray: Header[];
//   children?: React.ReactNode;
//   action?: boolean;
//   statusHeader?: Header[];
//   statusChildren?: React.ReactNode;
// }

// const TableWrapper = ({
//   dataLength,
//   loader,
//   HeaderArray,
//   action,
//   children,
//   statusHeader,
//   statusChildren,
// }: TableWrapperProps) => {
//   const renderMainTable = (HeaderArrays: Header[]): React.ReactNode => (
//     <table
//       className={`w-full border-collapse border-s-0 border-e-0 ${
//         loader || dataLength <= 0 ? "h-full" : ""
//       }`}
//     >
//       <thead className="!border-b border-border">
//         <tr className="sticky top-0 z-[2] bg-border">
//           {HeaderArrays.map((value, thIndex) => (
//             <TableHeader
//               key={thIndex}
//               value={value}
//               thIndex={thIndex}
//               totalHeaders={HeaderArrays.length}
//               action={action}
//             />
//           ))}
//         </tr>
//       </thead>

//       {loader ? (
//         <tbody>
//           <tr>
//             <td colSpan={HeaderArrays.length}>
//               <TableLoader />
//             </td>
//           </tr>
//         </tbody>
//       ) : dataLength > 0 ? (
//         <tbody className="divide-y divide-[--border]">{children}</tbody>
//       ) : (
//         <tbody>
//           <tr>
//             <td colSpan={HeaderArrays.length}>
//               <NoData />
//             </td>
//           </tr>
//         </tbody>
//       )}
//     </table>
//   );

//   const renderStatusTable = (): React.ReactNode => (
//     <table className="border-collapse md:sticky right-0 z-2 bg-white shadow-[-4px_0_6px_-1px_rgba(0,0,0,0.1)]">
//       <thead className="!border-b border-border">
//         <tr className="sticky top-0 z-[1] bg-border">
//           {statusHeader?.map((value, thIndex) => (
//             <TableHeader
//               key={thIndex}
//               value={value}
//               thIndex={thIndex}
//               totalHeaders={statusHeader.length}
//               action={action}
//             />
//           ))}
//         </tr>
//       </thead>
//       <tbody className="divide-y divide-[--border] bg-white">
//         {statusChildren}
//       </tbody>
//     </table>
//   );
//   const joinArray = [...HeaderArray, ...(statusHeader || [])];
//   return (
//     <div className="relative h-[calc(100%-130px)] overflow-auto horizontalScroll whitespace-nowrap bg-white">
//       <div
//         className={`flex justify-between items-center  ${
//           loader || dataLength <= 0 ? "h-full" : ""
//         }`}
//       >
//         {!loader && dataLength > 0 && renderMainTable(HeaderArray)}
//         {!loader &&
//           (statusHeader?.length || 0) > 0 &&
//           dataLength > 0 &&
//           renderStatusTable()}
//         {(loader || dataLength <= 0) && renderMainTable(joinArray)}
//       </div>
//     </div>
//   );
// };

// export default TableWrapper;

// // import React from "react";
// // import NoData from "./NoData";
// // import TableLoader from "./TableLoader";
// // import TableHeader from "./TableHeader";

// // const TableWrapper = ({
// //   dataLength,
// //   loader,
// //   HeaderArray,
// //   action,
// //   children,
// //   statusHeader,
// //   statusChildren,
// // }: {
// //   dataLength: number;
// //   loader: boolean;
// //   HeaderArray: {
// //     label: string;
// //     align?: string;
// //     width?: string;
// //     onClick?: () => void;
// //     headerIcon?: React.ReactNode;
// //   }[];
// //   action?: boolean;
// //   children?: React.ReactNode;
// //   statusHeader?: {
// //     label: string;
// //     align?: string;
// //     width?: string;
// //     onClick?: () => void;
// //     headerIcon?: React.ReactNode;
// //   }[];
// //   statusChildren?: React.ReactNode;
// // }) => {
// //   return (
// //     <>
// //       <div
// //         className={`relative h-[calc(100%-130px)] overflow-auto horizontalScroll whitespace-nowrap bg-white `}
// //       >
// //         <div className={`flex`}>
// //           <table
// //             className={`w-full border-collapse border-s-0 border-e-0 ${
// //               loader || dataLength <= 0 ? "h-full" : ""
// //             }`}
// //           >
// //             <thead className="!border-b border-border">
// //               <tr className="sticky top-0 z-[1] bg-border ">
// //                 {HeaderArray?.map((value, thIndex) => (
// //                   <TableHeader
// //                     key={thIndex}
// //                     value={value}
// //                     thIndex={thIndex}
// //                     totalHeaders={HeaderArray.length}
// //                     action={action}
// //                   />
// //                 ))}
// //               </tr>
// //             </thead>
// //             {loader ? (
// //               <tbody className="h-full w-full ">
// //                 <tr className="h-full">
// //                   <td className="h-full" colSpan={HeaderArray.length}>
// //                     <TableLoader />
// //                   </td>
// //                 </tr>
// //               </tbody>
// //             ) : (
// //               dataLength > 0 && (
// //                 <tbody className="divide-y divide-[--border] ">
// //                   {children}
// //                 </tbody>
// //               )
// //             )}
// //             {!loader && dataLength <= 0 && (
// //               <tbody className="h-full w-full ">
// //                 <tr className="h-full">
// //                   <td className="h-full" colSpan={HeaderArray.length}>
// //                     <NoData />
// //                   </td>
// //                 </tr>
// //               </tbody>
// //             )}
// //           </table>
// //           {statusHeader && (
// //             <table
// //               className={`w-full border-collapse border-s-0 border-e-0 md:sticky right-0 z-2 ${
// //                 loader || dataLength <= 0 ? "h-full" : ""
// //               }`}
// //             >
// //               <thead className="!border-b border-border">
// //                 <tr className="sticky top-0 z-[1] bg-border ">
// //                   {statusHeader?.map((value, thIndex) => (
// //                     <TableHeader
// //                       key={thIndex}
// //                       value={value}
// //                       thIndex={thIndex}
// //                       totalHeaders={HeaderArray.length}
// //                       action={action}
// //                     />
// //                   ))}
// //                 </tr>
// //               </thead>
// //               {loader ? (
// //                 <tbody className="h-full w-full ">
// //                   <tr className="h-full">
// //                     <td className="h-full" colSpan={HeaderArray.length}>
// //                       <TableLoader />
// //                     </td>
// //                   </tr>
// //                 </tbody>
// //               ) : (
// //                 dataLength > 0 && (
// //                   <tbody className="divide-y divide-[--border] ">
// //                     {statusChildren}
// //                   </tbody>
// //                 )
// //               )}
// //               {!loader && dataLength <= 0 && (
// //                 <tbody className="h-full w-full ">
// //                   <tr className="h-full">
// //                     <td className="h-full" colSpan={HeaderArray.length}>
// //                       <NoData />
// //                     </td>
// //                   </tr>
// //                 </tbody>
// //               )}
// //             </table>
// //           )}
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default TableWrapper;
