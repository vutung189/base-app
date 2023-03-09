import classNames from "classnames";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import {
  useAsyncDebounce,
  useExpanded,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import { sizePerPageList } from "utils/constants";
import Pagination, { Page } from "./Pagination";

// components

interface GlobalFilterProps {
  preGlobalFilteredRows: any;
  globalFilter: any;
  setGlobalFilter: any;
  searchBoxClass: any;
}

// Define a default UI for filtering
const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  searchBoxClass,
}: GlobalFilterProps) => {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState<any>(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <div className={classNames(searchBoxClass)}>
      <span className="d-flex align-items-center">
        Search :{" "}
        <input
          type="search"
          value={value || ""}
          onChange={(e: any) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`${count} records...`}
          className="form-control w-auto ms-1"
        />
      </span>
    </div>
  );
};

interface IndeterminateCheckboxProps {
  indeterminate: any;
  children?: React.ReactNode;
}

const IndeterminateCheckbox = forwardRef<
  HTMLInputElement,
  IndeterminateCheckboxProps
>(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef();
  const resolvedRef: any = ref || defaultRef;

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          ref={resolvedRef}
          {...rest}
        />
        <label htmlFor="form-check-input" className="form-check-label"></label>
      </div>
    </>
  );
});

interface TableProps {
  isSearchable?: boolean;
  isSortable?: boolean;
  pagination?: boolean;
  isSelectable?: boolean;
  isExpandable?: boolean;
  sizePerPageList?: {
    text: string;
    value: number;
  }[];
  columns: {
    Header: any;
    accessor: string;
    sort?: boolean;
    Cell?: any;
    className?: string;
    show?: boolean;
  }[];
  data: any[];
  pagingRes?: Page;
  pageSize?: any;
  searchBoxClass?: string;
  tableClass?: string;
  theadClass?: string;
  thClass?: string;
  styleOutTable?: React.CSSProperties;
  isScroll?: boolean;
}

const Table = (props: TableProps) => {
  const isSearchable = props["isSearchable"] || false;
  const isSortable = props["isSortable"] || false;
  const pagination = props["pagination"] || false;
  const isSelectable = props["isSelectable"] || false;
  const isExpandable = props["isExpandable"] || false;
  const otherProps: any = {};

  if (isSearchable) {
    otherProps["useGlobalFilter"] = useGlobalFilter;
  }
  if (isSortable) {
    otherProps["useSortBy"] = useSortBy;
  }
  if (isExpandable) {
    otherProps["useExpanded"] = useExpanded;
  }
  if (pagination) {
    otherProps["usePagination"] = usePagination;
  }
  if (isSelectable) {
    otherProps["useRowSelect"] = useRowSelect;
  }
  const columnsHidden: any[] = [];
  props.columns
    .filter((x) => x.show === false)
    .forEach((element) => {
      columnsHidden.push(element.accessor);
    });

  const dataTable = useTable(
    {
      columns: props["columns"],
      data: props["data"],
      initialState: {
        // pageSize: props?.pageSize || sizePerPageList[0]?.value || 10,
        hiddenColumns: columnsHidden,
      },
    },
    Object.prototype.hasOwnProperty.call(otherProps, "useGlobalFilter") &&
      otherProps["useGlobalFilter"],
    Object.prototype.hasOwnProperty.call(otherProps, "useSortBy") &&
      otherProps["useSortBy"],
    Object.prototype.hasOwnProperty.call(otherProps, "useExpanded") &&
      otherProps["useExpanded"],
    Object.prototype.hasOwnProperty.call(otherProps, "usePagination") &&
      otherProps["usePagination"],
    Object.prototype.hasOwnProperty.call(otherProps, "useRowSelect") &&
      otherProps["useRowSelect"],
    (hooks) => {
      isSelectable &&
        hooks.visibleColumns.push((columns: any) => [
          // Let's make a column for selection
          {
            id: "selection",
            // The header can use the table's getToggleAllRowsSelectedProps method
            // to render a checkbox
            Header: ({ getToggleAllPageRowsSelectedProps }: any) => (
              <div>
                <IndeterminateCheckbox
                  {...getToggleAllPageRowsSelectedProps()}
                />
              </div>
            ),
            // The cell can use the individual row's getToggleRowSelectedProps method
            // to the render a checkbox
            Cell: ({ row }: any) => (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          },
          ...columns,
        ]);

      // isExpandable &&
      //   hooks.visibleColumns.push((columns: any) => [
      //     // Let's make a column for selection
      //     {
      //       // Build our expander column
      //       id: "expander", // Make sure it has an ID
      //       Header: ({
      //         getToggleAllRowsExpandedProps,
      //         isAllRowsExpanded,
      //       }: any) => (
      //         <span {...getToggleAllRowsExpandedProps()}>
      //           {isAllRowsExpanded ? "-" : "+"}
      //         </span>
      //       ),
      //       Cell: ({ row }) =>
      //         // Use the row.canExpand and row.getToggleRowExpandedProps prop getter
      //         // to build the toggle for expanding a row
      //         row.canExpand ? (
      //           <span
      //             {...row.getToggleRowExpandedProps({
      //               style: {
      //                 // We can even use the row.depth property
      //                 // and paddingLeft to indicate the depth
      //                 // of the row
      //                 paddingLeft: `${row.depth * 2}rem`,
      //               },
      //             })}
      //           >
      //             {row.isExpanded ? "-" : "+"}
      //           </span>
      //         ) : null,
      //     },
      //     ...columns,
      //   ]);
    }
  );

  const rows = dataTable.rows;

  return (
    <>
      {/* {isSearchable && (
        <GlobalFilter
          preGlobalFilteredRows={dataTable.preGlobalFilteredRows}
          globalFilter={dataTable.state.globalFilter}
          setGlobalFilter={dataTable.setGlobalFilter}
          searchBoxClass={props["searchBoxClass"]}
        />
      )} */}

      <div
        className={props.isScroll ? "" : "table-responsive react-table"}
        style={props["styleOutTable"]}
      >
        <table
          {...dataTable.getTableProps()}
          className={classNames(
            "table table-centered",
            props.isScroll ? "table-scroll-sticky" : "",
            props["tableClass"]
          )}
        >
          <thead className={props["theadClass"]}>
            {(dataTable.headerGroups || []).map((headerGroup: any) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {(headerGroup.headers || []).map((column: any) => (
                  <th
                    {...column.getHeaderProps(
                      column.sort && column.getSortByToggleProps()
                    )}
                    className={classNames(
                      {
                        sorting_desc: column.isSortedDesc === true,
                        sorting_asc: column.isSortedDesc === false,
                        sortable: column.sort === true,
                      },
                      props["thClass"]
                    )}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...dataTable.getTableBodyProps()}>
            {(rows || []).map((row: any, i: number) => {
              dataTable.prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {(row.cells || []).map((cell: any) => {
                    return (
                      <td
                        {...cell.getCellProps([
                          {
                            className: cell.column.className,
                          },
                        ])}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {pagination && props.pagingRes && (
        <Pagination pagingRes={props.pagingRes} />
      )}
    </>
  );
};
export default Table;
