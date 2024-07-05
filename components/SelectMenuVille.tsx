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
import { MapPinned } from "lucide-react";
import { cityOfCountry } from "@/data/dataTypeOffer";
import { useMobileStore } from "@/store/mobile-navbar";
import { GetQueryParams } from "@/lib/utils";

interface SelectMenuVilleProps {
  pays: string;
}

const SelectMenuVille = ({ pays }: SelectMenuVilleProps) => {
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

  const onChangeValue = (val: string) => {
    modifyVille(val);
  };
  const { maVille } = GetQueryParams();
  return (
    <Select onValueChange={onChangeValue} defaultValue={""}>
      <SelectTrigger className="md:w-[180px] w-full">
        <MapPinned />
        <SelectValue placeholder={!!maVille ? maVille : "Votre ville"} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Ville - {pays}</SelectLabel>
          {!!pays &&
            cityOfCountry[`${pays}`].map((value: string, index: number) => (
              <SelectItem value={value} key={index}>
                {value}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectMenuVille;
