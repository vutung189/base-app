import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import React from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { getPageSizeParams } from "utils/utils";

export interface Page {
  totalPages: number;
  numberOfElements: number;
  totalElements: number;
  size: number;
  number: number;
}

interface PaginationProps {
  pagingRes: Page;
}

const Pagination = ({ pagingRes }: PaginationProps) => {
  const { t } = useTranslation();
  /**
   * pagination count , index
   */
  const history = useHistory();
  const search = history.location.search;
  const { page: pageIndex, params } = getPageSizeParams(search);
  const pageCount = pagingRes.totalPages;
  const activePage: number = pageIndex;
  const visiblePages = filterPages(
    getVisiblePages(pagingRes.number, pageCount),
    pageCount
  );

  const handleChangePage = (page: number) => {
    const activePage = pageIndex;

    if (page === activePage) {
      return;
    }
    params.set("page", String(page));
    history.push(`${window.location.pathname}?${params.toString()}`);
  };

  return (
    <>
      <div className="d-lg-flex align-items-center text-center pb-1 mt-2">
        <div className="d-inline-block me-3">
          {/* <label className="me-1">{t("Display")} :</label>
          <select
            value={String(size)}
            onChange={(e: any) => {
              handleChangeSize(Number(e.target.value));
            }}
            className="form-select d-inline-block w-auto"
          >
            {sizePerPageList.map((pageSize, index) => {
              return (
                <option key={index} value={pageSize.value}>
                  {pageSize.text}
                </option>
              );
            })}
          </select> */}
        </div>

        <span className="me-3 mb-2">
          {t("Page")}{" "}
          <strong>
            {pageIndex} / {pageCount}
          </strong>{" "}
        </span>

        <span className="d-flex  align-items-center text-sm-start text-center my-sm-0 my-2">
          <label className="form-label text-nowrap">{t("Go to page")}: </label>
          <input
            type="number"
            value={pageIndex}
            min="1"
            max={pageCount}
            onChange={(e: any) => {
              const page = e.target.value ? Number(e.target.value) : 1;
              handleChangePage(page);
            }}
            className="form-control w-50 ms-1 d-inline-block"
          />
        </span>

        <ul className="pagination pagination-rounded d-inline-flex ms-auto align-item-center mb-0">
          <li
            key="prevpage"
            className={classNames("page-item", "paginate_button", "previous", {
              disabled: activePage === 1,
            })}
            onClick={() => {
              if (activePage === 1) return;
              handleChangePage(activePage - 1);
            }}
          >
            <Button className="page-link">
              <FontAwesomeIcon icon={faChevronLeft} />
            </Button>
          </li>
          {(visiblePages || []).map((page, index, array) => {
            return array[index - 1] + 1 < page ? (
              <React.Fragment key={page}>
                <li className="page-item disabled d-none d-xl-inline-block">
                  <Button className="page-link">...</Button>
                </li>
                <li
                  className={classNames(
                    "page-item",
                    "d-none",
                    "d-xl-inline-block",
                    {
                      active: activePage === page,
                    }
                  )}
                  onClick={() => {
                    // if (activePage === pageCount) return;
                    handleChangePage(page);
                  }}
                >
                  <Button className="page-link">{page}</Button>
                </li>
              </React.Fragment>
            ) : (
              <li
                key={page}
                className={classNames(
                  "page-item",
                  "d-none",
                  "d-xl-inline-block",
                  {
                    active: activePage === page,
                  }
                )}
                onClick={(e: any) => handleChangePage(page)}
              >
                <Button className="page-link">{page}</Button>
              </li>
            );
          })}
          <li
            key="nextpage"
            className={classNames("page-item", "paginate_button", "next", {
              disabled: activePage === pageCount,
            })}
            onClick={() => {
              if (activePage === pageCount) return;
              handleChangePage(activePage + 1);
            }}
          >
            <Button className="page-link">
              <FontAwesomeIcon icon={faChevronRight} />
            </Button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Pagination;

/**
 * get filter pages
 */
const filterPages = (visiblePages: number[], pageCount: number) => {
  return visiblePages.filter((page) => page <= pageCount);
};

const getVisiblePages = (page: number | null, total: number): number[] => {
  if (total < 7) {
    return filterPages([1, 2, 3, 4, 5, 6], total);
  } else {
    if (page! % 5 >= 0 && page! > 4 && page! + 2 < total) {
      return [1, page! - 1, page!, page! + 1, total];
    } else if (page! % 5 >= 0 && page! > 4 && page! + 2 >= total) {
      return [1, total - 3, total - 2, total - 1, total];
    } else {
      return [1, 2, 3, 4, 5, total];
    }
  }
};
