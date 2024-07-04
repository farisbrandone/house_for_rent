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
import { MapPin, UserSearch } from "lucide-react";
import { typeOffer } from "@/data/dataTypeOffer";
import { useMobileStore } from "@/store/mobile-navbar";
import { useSearchParams } from "next/navigation";
import { getQueryParams } from "@/lib/utils";
interface SelectMenuOffreProps {
  monOffre: string;
}
const SelectMenuOffre = () => {
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
    modifyOffre(val);
  };

  const { monOffre } = getQueryParams();

  return (
    <Select onValueChange={onChangeValue} defaultValue={""}>
      <SelectTrigger className="md:w-[180px] w-full">
        <UserSearch />
        <SelectValue
          placeholder={!!monOffre ? monOffre : "Que cherchez-vous"}
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Chambre</SelectLabel>
          {typeOffer.chambre.map((value: string, index: number) => (
            <SelectItem value={value} key={index}>
              {value}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Studio</SelectLabel>
          {typeOffer.studio.map((value: string, index: number) => (
            <SelectItem value={value} key={index}>
              {value}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Appartement</SelectLabel>
          {typeOffer.appartement.map((value: string, index: number) => (
            <SelectItem value={value} key={index}>
              {value}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Autres</SelectLabel>
          {typeOffer.autres.map((value: string, index: number) => (
            <SelectItem value={value} key={index}>
              {value}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectMenuOffre;
