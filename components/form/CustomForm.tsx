"use client";
import React, { useState } from "react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Button } from "../ui/button";

import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import PhoneInput from "react-phone-number-input";

import "react-phone-number-input/style.css";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import Image from "next/image";
import { Label } from "../ui/label";
import { Eye, EyeOff } from "lucide-react";

export enum FormFieldType {
  INPUT = "INPUT",
  PASSWORD = "PASSWORD",
  TEXTAREA = "TEXTAREA",
  SELECT = "SELECT",
  CHECKBOX = "CHECKBOX",
  PHONE_NUMBER = "PHONE_NUMBER",
  DATE_PICKER = "DATE_PICKER",
  RADIOGROUP = "RADIOGROUP",
  FILE = "FILE",
}
interface CustomFormProps {
  control: any;
  fieldType: FormFieldType;
  name: string;
  placeholder?: string;
  label?: string;
  iconSrc?: string;
  description?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
  onValueChange?: (value: string) => void;
  onBlur?: () => void;
  selectOptions?: { value: string; label: string; imgUrl?: string }[];
}
// Add this function BEFORE your components (around line 20)
const convertFileToBase64 = (file: File, callback: (result: string) => void) => {
  const reader = new FileReader();
  reader.onloadend = () => {
    callback(reader.result as string);
  };
  reader.readAsDataURL(file);
};

const RenderField = ({
  field,
  props,
}: {
  field: any;
  props: CustomFormProps;
}) => {
  const { fieldType, iconSrc, placeholder, disabled, selectOptions } = props;
  const [fileName, setFileName] = useState<string | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="relative">
          {iconSrc && (
            <img
              src={iconSrc}
              alt="icon"
              className="absolute left-3 top-3 h-4 w-4"
            />
          )}
          <Input
            className={iconSrc ? "pl-8" : ""}
            placeholder={placeholder}
            disabled={disabled}
            onBlur={() => {
              field.onBlur();
              props.onBlur?.();
            }}
            {...field}
          />
        </div>
      );
    case FormFieldType.PASSWORD:
      return (
        <div className="relative">
          <Input
            type={isPasswordVisible ? "text" : "password"}
            placeholder={placeholder}
            disabled={disabled}
            {...field}
          />
          <button
            type="button"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {isPasswordVisible ? (
              <EyeOff className="h-5 w-5 text-gray-400" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>
      );
    case FormFieldType.TEXTAREA:
      return (
        <textarea
          placeholder={placeholder}
          disabled={disabled}
          {...field}
          className="border p-2 rounded-md w-full"
        />
      );
    case FormFieldType.SELECT:
      return (
        <Select
          value={field.value}
          onValueChange={(value) => {
            field.onChange(value); // React Hook Form
            props.onValueChange?.(value); // Parent handler
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>

          <SelectContent>
            {selectOptions
              ?.filter((option) => option.value !== "")
              ?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                <div className="flex items-center gap-2">
                  {option.imgUrl && (
                    <Image
                      src={option.imgUrl}
                      width={32}
                      height={32}
                      alt={option.label}
                      className="rounded-full"
                    />
                  )}
                  <p>{option.label}</p>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );

    case FormFieldType.CHECKBOX:
      return (
        <FormItem className="flex items-start space-x-2">
          <FormControl>
            <Checkbox
              id={props.name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <FormLabel className="text-sm font-medium leading-none cursor-pointer">
            {props.label}
          </FormLabel>
        </FormItem>
      );

    case FormFieldType.PHONE_NUMBER:
      return (
        <FormControl>
          <PhoneInput
            {...field}
            onChange={(value) => field.onChange(value)}
            disabled={disabled}
            international
            defaultCountry="US"
            className="border p-2 rounded-md w-full"
          />
        </FormControl>
      );
    case FormFieldType.DATE_PICKER:
      return (
        <div className="rounded-md flex border-2 border-solid border-grey-800 py-2">
          <Image
            src="/assets/icons/calendar.svg"
            alt=""
            height={24}
            width={24}
            className="ml-2"
          />
          <FormControl>
            <DatePicker
              selected={field.value}
              onChange={(date: Date | null) => field.onChange(date)}
              dateFormat={props.dateFormat ?? "MM/dd/yyyy"}
              showTimeSelect={props.showTimeSelect ?? false}
              withPortal
            />
          </FormControl>
        </div>
      );
    case FormFieldType.RADIOGROUP:
      return (
        <div className="rounded-md border-2 border-solid border-grey-800 py-1 px-1">
          <RadioGroup
            className="flex h-11 gap-6 xl:justify-between"
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            {selectOptions?.map((option) => (
              <div key={option.value} className="flex items-center">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="cursor-pointer ml-2">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      );
    case FormFieldType.FILE:
      return (
        <FormControl>
          <div>
            <Label htmlFor={props.name}>
              <div className="flex items-center gap-2 cursor-pointer bg-gray-900 w-full justify-center py-4 rounded-md">
                <Image
                  src="/assets/icons/upload.svg"
                  alt="upload"
                  width={24}
                  height={24}
                />
                <p>{fileName || "Upload File"}</p>
              </div>
            </Label>
            <Input
              type="file"
              id={props.name}
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setFileName(file.name);
                  convertFileToBase64(file, (result) => {
                    field.onChange(result);
                  });
                }
              }}
            />
          </div>
        </FormControl>
      );

    default:
      return null;
  }
};

const CustomForm = (props: CustomFormProps) => {
  const {
    control,
    fieldType,
    name,
    placeholder,
    label,
    iconSrc,
    description,
    disabled,
    dateFormat,
    showTimeSelect,
    children,
    renderSkeleton,
    onValueChange,
    onBlur,
    selectOptions,
  } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {props.fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}
          <FormControl>
            <RenderField field={field} props={props} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomForm;
