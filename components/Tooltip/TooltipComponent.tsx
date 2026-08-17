import React from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { TruncatedDescription } from "./TruncatedDescription";

const TooltipComponent = ({
  reasons,
  quillReasons,
  icon,
  length,
}: {
  reasons?: string;
  quillReasons?: string;
  icon?: React.ReactNode;
  length: number;
}) => {
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="text-start cursor-pointer">
            {icon ? (
              icon
            ) : (
              <>
                {quillReasons ? (
                  <p
                    dangerouslySetInnerHTML={{
                      __html: TruncatedDescription(quillReasons, length),
                    }}
                  />
                ) : reasons ? (
                  TruncatedDescription(reasons, length)
                ) : (
                  <span className="text-text-color tracking-[-2px]">--</span>
                )}
              </>
            )}
          </TooltipTrigger>
          <TooltipContent className="max-w-100 max-h-50 wrap-break-word overflow-y-auto horizontalScroll w-full text-font13! bg-white border border-borderLine rounded-lg">
            <p className="text-darkGrayish w-full whitespace-normal quill-content">
              {quillReasons ? (
                <p
                  dangerouslySetInnerHTML={{
                    __html: quillReasons,
                  }}
                />
              ) : reasons ? (
                reasons
              ) : (
                <span className="text-darkGrayish tracking-[-2px]">--</span>
              )}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};

export default TooltipComponent;
