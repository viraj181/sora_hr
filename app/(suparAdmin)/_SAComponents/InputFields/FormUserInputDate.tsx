"use client";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";
import DatePicker, { DateObject } from "react-multi-date-picker";
// import InputUsersLabel from "./InputUsersLabel";
// import InputUsersError from "./InputUsersError";
import { PiCalendarDotsFill } from "react-icons/pi";
import { ChangeEvent, useState } from "react";
import InputError from "@/components/InputError";
import FloatingLabel from "@/components/FloatingLabel";

const DATE_FORMAT = "DD-MM-YYYY";

const FormUserInputDate = <T extends FieldValues>({
  dateLabel,
  dateName,
  datePlaceholder,
  control,
  errors,
  mandatory = false,
  currentDate,
  maxDate,
  minDate,
  isDisabled = false,
  handelOnChangeDate,
}: {
  dateLabel: string;
  dateName: Path<T>;
  datePlaceholder?: string;
  control: Control<T>;
  errors: FieldErrors<T>;
  mandatory?: boolean;
  currentDate?: Date | DateObject;
  maxDate?: DateObject | Date | string | undefined | null;
  minDate?: DateObject | Date | string | undefined | null;
  isDisabled?: boolean;
  handelOnChangeDate?: () => void;
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const convertToDateObject = (
    date: Date | DateObject | string | undefined | null,
  ): DateObject | undefined => {
    if (!date) return undefined;

    if (date instanceof DateObject) {
      return date;
    }

    if (typeof date === "string") {
      if (/^\d{2}-\d{2}-\d{4}$/.test(date)) {
        return new DateObject({
          date: date,
          format: DATE_FORMAT,
        });
      }
      const d = new Date(date);
      if (!isNaN(d.getTime())) {
        return new DateObject(d);
      }
      return undefined;
    }

    if (date instanceof Date) {
      return new DateObject(date);
    }

    return undefined;
  };

  const getInitialDate = (fieldValue?: string): DateObject | undefined => {
    if (currentDate) return convertToDateObject(currentDate);
    if (fieldValue) return convertToDateObject(fieldValue);
    if (maxDate) return convertToDateObject(maxDate);
    return undefined;
  };

  const getDatePickerValue = (
    value: string | undefined,
  ): DateObject | undefined => {
    if (!value) return undefined;
    return convertToDateObject(value);
  };

  // --- UPDATED VALIDATION LOGIC WITH YEAR CHECK ---
  const formatInputDate = (value: string) => {
    // 1. Remove non-digits
    let cleanVal = value.replace(/\D/g, "");

    // 2. Prevent typing more than 8 digits (DDMMYYYY)
    if (cleanVal.length > 8) cleanVal = cleanVal.slice(0, 8);

    // 3. Slice into parts
    let day = cleanVal.slice(0, 2);
    let month = cleanVal.slice(2, 4);
    let year = cleanVal.slice(4, 8);

    // 4. Validate DAY (Max 31)
    if (day.length === 2) {
      const dayNum = parseInt(day);
      if (dayNum === 0) day = "01";
      else if (dayNum > 31) day = "31";
    }

    // 5. Validate MONTH (Max 12)
    if (month.length === 2) {
      const monthNum = parseInt(month);
      if (monthNum === 0) month = "01";
      else if (monthNum > 12) month = "12";
    }

    // 6. Validate YEAR (Min 1900)
    // We only validate the year if the user has finished typing it (length 4)
    if (year.length === 4) {
      const yearNum = parseInt(year);
      if (yearNum < 1900) {
        year = "1900";
      }
    }

    // 7. Reconstruct string with hyphens
    let result = day;
    if (cleanVal.length >= 3) {
      result += `-${month}`;
    }
    if (cleanVal.length >= 5) {
      result += `-${year}`;
    }

    return result;
  };

  return (
    <>
      <div className="w-full mb-2">
        {/* <InputUsersLabel inputUsersLabel={dateLabel} mandatory={mandatory} /> */}

        <div className="relative ">
          <Controller
            control={control}
            name={dateName}
            render={({ field }) => (
              <DatePicker
                onChange={(selectedDate) => {
                  if (selectedDate && selectedDate instanceof DateObject) {
                    const formattedDate = selectedDate.format(DATE_FORMAT);
                    field.onChange(formattedDate);
                  } else {
                    field.onChange("");
                  }
                  handelOnChangeDate?.();
                }}
                format={DATE_FORMAT}
                value={getDatePickerValue(field.value)}
                name={dateName}
                placeholder={datePlaceholder}
                currentDate={getInitialDate(field.value)}
                maxDate={maxDate ? convertToDateObject(maxDate) : undefined}
                minDate={minDate ? convertToDateObject(minDate) : undefined}
                onOpen={() => setIsFocused(true)}
                onClose={() => setIsFocused(false)}
                disabled={isDisabled}
                arrow={true}
                render={(value, openCalendar) => {
                  const isFloating = isFocused || !!value;

                  return (
                    <>
                      {dateLabel && (
                        <FloatingLabel
                          label={dateLabel}
                          InputName={String(dateName)}
                          isFloating={isFloating}
                          hasError={!!errors?.[dateName]?.message}
                          isDisabled={isDisabled}
                          mandatory={mandatory}
                        />
                      )}
                      <div className="flex items-center relative w-full">
                        <input
                          value={field.value || ""}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            const formatted = formatInputDate(e.target.value);
                            field.onChange(formatted);

                            if (formatted.length === 10) {
                              handelOnChangeDate?.();
                            }
                          }}
                          onFocus={openCalendar}
                          disabled={isDisabled}
                          placeholder={datePlaceholder}
                          className={`formInputClass placeholder:capitalize w-full ${
                            errors[dateName] ? "border! border-red-500!" : ""
                          }`}
                        />
                        <PiCalendarDotsFill
                          onClick={isDisabled ? undefined : openCalendar}
                          className={`text-avocado text-[23px] ml-2 absolute right-2 top-1/2 -translate-y-1/2 ${
                            isDisabled ? "cursor-not-allowed" : "cursor-pointer"
                          }`}
                        />
                      </div>
                    </>
                  );
                }}
                zIndex={50}
              />
            )}
          />
        </div>
        <InputError errors={errors} inputName={dateName} />
      </div>
    </>
  );
};

export default FormUserInputDate;
