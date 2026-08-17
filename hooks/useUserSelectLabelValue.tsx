"use client";
import apiInstance from "@/apis/apiConfig";
import { withReferenceKey } from "@/apis/loginApis";
import { AxiosError } from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";

interface Props {
  URL: string;
  refresh?: string | number;
  label: string;
  label2?: string;
  value: string;
  payload?: { [key: string]: string | number | boolean };
  isLimit?: boolean;
}

const useUserSelectLabelValue = ({
  URL,
  refresh,
  label,
  label2,
  value,
  payload,
  isLimit = true,
}: Props) => {
  const [selectAllData, setSelectAllData] = useState({});
  const [selectData, setSelectData] = useState([]);
  const [selectLoading, setSelectLoading] = useState(false);
  const [selectSearchValue, setSelectSearchValue] = useState("");

  const fetchData = useCallback(async () => {
    setSelectLoading(true);

    try {
      const existingObj = {
        ...(isLimit && { pageNumber: 1, pageSize: 20 }),
        search: selectSearchValue,
        ...payload,
      };

      const response = await apiInstance.post(
        URL,
        withReferenceKey(existingObj),
      );
      setSelectAllData(response?.data?.data);

      const keyValueArray = response?.data?.data?.results?.map(
        (group: { [key: string]: string }) => ({
          label: label2
            ? `${group[label]} (${group[label2]})`
            : group[label].slice(0, 60) +
              (group[label].length > 60 ? "..." : ""),
          value: group[value],
          ...group,
        }),
      );
      setSelectData(keyValueArray);
    } catch (error) {
      const errors = error as AxiosError<{
        message?: string;
        detail?: string;
        code?: string;
      }>;
      return errors.response?.data;
    } finally {
      setSelectLoading(false);
    }
  }, [URL, label, label2, value, isLimit, selectSearchValue, refresh]);

  useEffect(() => {
    let active = true;
    Promise.resolve().then(() => {
      if (active) {
        fetchData();
      }
    });
    return () => {
      active = false;
    };
  }, [fetchData]);

  return useMemo(
    () => ({
      selectAllData,
      setSelectAllData,
      selectLoading,
      selectData,
      setSelectSearchValue,
    }),
    [selectAllData, selectData, selectLoading, selectSearchValue],
  );
};

export default useUserSelectLabelValue;
