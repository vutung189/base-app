import { SearchApi } from "api/Search";
import { format } from "date-fns";
import _ from "lodash";
import { useState } from "react";
import { FORMAT_DATE } from "utils/constants";
import { QueryKeys } from "utils/constants/queryKeys";
import { useDefaultForm } from "utils/hooks/useDefaultForm";
import { usePaginatedFilterUrl } from "utils/hooks/usePaginatedFilterUrl";
import Result from "./Result";
import Search from "./Search";

const value = {
  lgReference: "",
  lgType: "",
  startDate: format(new Date(), FORMAT_DATE),
  applicantCif: "",
  issueDate: null,
  iban: "",
  endDate: format(new Date(), FORMAT_DATE),
};
const SearchScreen = () => {
  const initFormValues = useDefaultForm(value);

  const [submitedFormValues, submitFormValues] = useState(initFormValues);

  const {
    data: dataFilter,
    isLoading,
  } = usePaginatedFilterUrl(
    QueryKeys.GET_LIST,
    SearchApi.search,
    convertPayload,
    initFormValues,
    submitedFormValues
  );

  return (
    <>
      <Search
        submitFormValues={submitFormValues}
        initFormValues={initFormValues}
        defaultFormValues={value}
        isLoading={isLoading}
      />
      <Result
        data={dataFilter}
        // loading={isLoading}
        // totalRecord={totalRecord}
        // submitFormValues={submitFormValues}
        // defaultPage={defaultPage}
      />
    </>
  );
};

export default SearchScreen;

const convertPayload = (form: Record<string, any>) => {
  const IGNORE: string[] = Object.entries(form)
    .filter(([_, value]) => !value)
    .map(([key, _]) => key);

  return _.omit(
    {
      ...form,
    },
    IGNORE
  );
};
