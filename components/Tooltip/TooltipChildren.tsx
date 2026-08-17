import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const TooltipChildren = ({
  mainChildren,
  children,
}: {
  mainChildren: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button type="button" className="cursor-pointer">
            {mainChildren}
          </button>
        </TooltipTrigger>

        <TooltipContent className="max-w-[400px] max-h-[200px] break-words overflow-y-auto w-full text-font12 bg-white border border-border quill-content">
          {children}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipChildren;

// import React from "react";

// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "../ui/tooltip";

// const TooltipChildren = ({
//   mainChildren,
//   children,
// }: {
//   mainChildren: React.ReactNode;
//   children: React.ReactNode;
// }) => {
//   return (
//     <>
//       <TooltipProvider>
//         <Tooltip>
//           <TooltipTrigger className="text-start ">
//             {mainChildren}
//           </TooltipTrigger>
//           <TooltipContent className="max-w-[400px] max-h-[200px] break-words overflow-y-auto horizontal-scroll w-full !text-font12 bg-white border border-border">
//             {children}
//           </TooltipContent>
//         </Tooltip>
//       </TooltipProvider>
//     </>
//   );
// };

// export default TooltipChildren;
