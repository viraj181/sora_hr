import Papa from "papaparse";
import { toast } from "react-hot-toast";

export interface CommonImportOptions<T = Record<string, string>> {
  file: File;
  onSuccess: (rows: T[]) => void;
  onError?: (error: unknown) => void;
  fileType: string;
}

export const commonImport = <T = Record<string, string>>({
  file,
  onSuccess,
  onError,
  fileType,
}: CommonImportOptions<T>) => {
  if (!file) {
    toast.error("Please select a file");
    return;
  }

  if (!file.name.toLowerCase().endsWith(`.${fileType}`)) {
    toast.error(`Only ${fileType} files are supported`);
    return;
  }

  Papa.parse<T>(file, {
    header: true,
    skipEmptyLines: true,
    complete: (results: Papa.ParseResult<T>) => {
      try {
        if (!results.data.length) {
          toast.error("CSV file is empty");
          return;
        }

        onSuccess(results.data);
      } catch (err) {
        console.error(err);
        toast.error("Invalid CSV format");
        onError?.(err);
      }
    },
    error: (err: unknown) => {
      toast.error("Failed to parse CSV");
      onError?.(err);
    },
  });
};
