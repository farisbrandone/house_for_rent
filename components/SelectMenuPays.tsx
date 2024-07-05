"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin } from "lucide-react";
import { listOfSelectCountry } from "@/data/dataTypeOffer";
import { useMobileStore } from "@/store/mobile-navbar";

import { useSearchParams } from "next/navigation";

interface selectMenuPaysProps {
  monPays: string;
}

const SelectMenuPays = () => {
  const {
    collapsed,
    value,
    payss,
    ville,
    offre,
    modifyPays,
    modifyVille,
    modifyOffre,
    onExpand,
    onCollapse,
    onChangePays,
  } = useMobileStore((state) => state);
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const monPays = params.get("pays");
  const onChangeValue = (val: string) => {
    modifyPays(val);
    onChangePays(val);
  };
  /*const { monPays } = GetQueryParams();*/
  return (
    <Select onValueChange={onChangeValue} defaultValue={""}>
      <SelectTrigger className="md:w-[180px] w-full">
        <MapPin />
        <SelectValue placeholder={!!monPays ? monPays : "Votre pays"} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Pays</SelectLabel>
          {listOfSelectCountry.map((value: string, index: number) => (
            <SelectItem value={value} key={index}>
              {value}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectMenuPays;
