import { compressImage, compressImageProps } from "@/lib/utils";
import { CircleX } from "lucide-react";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UseFormReturn, useForm } from "react-hook-form";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { databaseProps } from "@/lib/data";
type formProps = UseFormReturn<
  {
    typeOffre: string;
    nomOffre: string;
    paysOffre: string;
    villeOffre: string;
    descriptifOffre: string;
    prixDuBien: string;
    devise: string;
    typeDeVente: string;
    adresseEmail: string;
    imageOffre?: any[] | undefined;
    nbreDeChambre?: string | undefined;
    nbreDeCuisine?: string | undefined;
    nbreDeDouche?: string | undefined;
    tel?: string | undefined;
  },
  any,
  undefined
>;
interface InputFileProps {
  accept: any;
  multiple: boolean;
  name: string;
  mode: string;
  form: formProps;
  defaultValue: string[];
}
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const InputFile = React.forwardRef<HTMLInputElement, InputFileProps>(
  (props) => {
    const { name, mode = "update", form } = props;
    const label = name;

    const [loading, setLoading] = useState(false);

    const { register, unregister, setValue, watch } = useForm();

    const files = watch(name);

    const onDrop = useCallback(
      async (droppedFiles: any) => {
        setLoading(true);
        let newFiles =
          mode === "update"
            ? droppedFiles
            : [...(files || []), ...droppedFiles];
        if (mode === "append") {
          newFiles = newFiles.reduce((prev: any, file: any) => {
            const fo = Object.entries(file);
            if (
              prev.find((e: any) => {
                const eo = Object.entries(e);
                return eo.every(([key, value], index) => {
                  return key === fo[index][0] && value === fo[index][1];
                });
              })
            ) {
              return prev;
            } else {
              return [...prev, file];
            }
          }, []);
        }

        newFiles?.length < 4 &&
          setValue(name, newFiles, { shouldValidate: true });
        form.setValue("imageOffre", newFiles);
        setLoading(false);
      },
      [setValue, name, mode, files]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept: props.accept,
    });

    const deleteImage = (elt: any, index: any) => {
      const newFiles = [...elt];
      newFiles.splice(index, 1);
      setValue(name, newFiles, { shouldValidate: true });
      form.setValue("imageOffre", newFiles);
    };

    useEffect(() => {
      register(name);
      return () => {
        unregister(name);
      };
    }, [register, unregister, name]);

    return (
      <div className="cursor-pointer">
        <label
          className="block text-gray-700 text-sm font-bold mb-2 capitalize cursor-pointer"
          htmlFor={name}
        >
          {`Insertion des images (maximum 3)`}
        </label>

        <div {...getRootProps()} className="w-full">
          <input
            accept={props.accept}
            multiple={props.multiple}
            name={props.name}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id={name}
            {...getInputProps()}
          />

          <div
            className={
              "w-full p-2 border border-dashed border-gray-900 cursor-pointer" +
              (isDragActive ? "bg-gray-400" : "bg-gray-200")
            }
          >
            <p className="text-center my-2">
              Drop ou insert tes images ici ...
            </p>
            {files?.length >= 3 && (
              <p className="text-center my-2 text-red-700">
                Le maximun de fichier requis est de 3
              </p>
            )}
            {!!files?.length && (
              <div className="grid  grid-cols-4 mt-2">
                {files.map((file: any, index: number) => {
                  return (
                    <div key={file.name} className="relative">
                      <Image
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        width={100}
                        height={100}
                        className="border-2 border-blue-800"
                      />
                      <HoverCard>
                        <HoverCardTrigger>
                          <CircleX
                            className="text-red-800 absolute top-0 right-20 w-5 h-5 bg-white rounded-full"
                            onClick={() => deleteImage(files, index)}
                          />
                        </HoverCardTrigger>
                        <HoverCardContent className="text-white brightness-200">
                          Delete
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);
InputFile.displayName = "Input";

export default InputFile;
