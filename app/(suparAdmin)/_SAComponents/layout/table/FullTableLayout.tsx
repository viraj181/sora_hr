import { Header } from "@/Types/tableLayoutTypes";
import PageSize from "../shorting/PageSize";
import Pagination from "../shorting/Pagination";
import TableWrapper from "./TableWrapper";

const FullTableLayout = ({
  headerTitle,
  headerChildren,
  tableHeader,
  dataLength,
  tableLoader,
  totalPages,
  totalItems,
  pageNumber,
  pageLimit,
  children,
  onclickLimit,
  onClickPagination,
}: {
  headerTitle?: string;
  headerChildren?: React.ReactNode;
  tableHeader: Header[];
  dataLength: number;
  tableLoader: boolean;
  totalPages: number;
  totalItems: number;
  pageNumber: number;
  pageLimit: number;
  children: React.ReactNode;
  onclickLimit: (e: number) => void;
  onClickPagination: (page: number) => void;
}) => {
  return (
    <>
      <div className="p-4 pt-0 flex flex-col flex-1 overflow-hidden rounded-lg">
        {(headerTitle || headerChildren) && (
          <div className="bg-white  rounded-t-lg flex items-center justify-between px-4 py-2 border  border-borderLine ">
            {headerTitle && (
              <p className="font-semibold text-lg uppercase">{headerTitle}</p>
            )}
            {headerChildren && headerChildren}
          </div>
        )}
        <div className="flex-1 overflow-hidden bg-white p-2  border  border-borderLine  whitespace-nowrap">
          <>
            <TableWrapper
              HeaderArray={tableHeader}
              dataLength={dataLength}
              loader={tableLoader}
            >
              {children}
            </TableWrapper>
          </>
        </div>
        <div className="h-10 bg-white border border-borderLine rounded-b-lg flex items-center">
          <PageSize
            onclickLimit={(e: number) => {
              onclickLimit(e);
            }}
            limit={pageLimit}
            totalItems={totalItems}
          />

          <Pagination
            dataLength={dataLength}
            totalItems={totalItems}
            totalPages={totalPages}
            pageNumber={pageNumber}
            onClickPagination={(page) => {
              onClickPagination(page);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default FullTableLayout;
