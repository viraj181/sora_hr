"use client";
import apiInstance from "@/apis/apiConfig";
import { Option } from "@/components/selectComponents/SelectStyle";
import { AxiosError } from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";

interface Props {
  URL: string;
  refresh?: string;
  label: string;
  value: string;
  payload?: { [key: string]: string };
}

interface DataItem {
  label: string;
  value: unknown;
}

const useGetCityData = ({ URL, refresh, label, value, payload }: Props) => {
  const [loading, setLoading] = useState(false);
  const [allData, setAllData] = useState<DataItem[]>([]);
  const [data, setData] = useState<Option[]>([]);

  const serializedPayload = JSON.stringify(payload);

  const fetchData = useCallback(async () => {
    if (!URL || URL.includes("undefined")) {
      setAllData([]);
      setData([]);
      return;
    }
    setLoading(true);
    try {
      const response = await apiInstance.post(URL, payload);
      const responseData = response?.data?.data?.results;
      if (Array.isArray(responseData)) {
        const keyValueArray = responseData.map(
          (group: { [key: string]: string }) => ({
            label: group[label],
            value: group[value],
          }),
        );
        setAllData(responseData);
        setData(keyValueArray);
      } else {
        setAllData([]);
        setData([]);
      }
    } catch (error) {
      setAllData([]);
      setData([]);
      const errors = error as AxiosError<{
        message?: string;
        detail?: string;
        code?: string;
      }>;
      if (errors?.response?.data?.code == "token_not_valid") {
        window.location.reload();
      }
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [URL, serializedPayload, label, value, refresh]);

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
      allData,
      loading,
      data,
    }),
    [allData, data, loading],
  );
};

export default useGetCityData;
