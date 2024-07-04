import { type ClassValue, clsx } from "clsx";
import { useSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface getQueryParamsReturnType {
  monOffre: string | null;
  monPays: string | null;
  maVille: string | null;
}

export function getQueryParams(): getQueryParamsReturnType {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const monOffre = params.get("type_offre");
  const monPays = params.get("pays");
  const maVille = params.get("ville");
  console.log({ monOffre, monPays, maVille });

  return { monOffre, monPays, maVille };
}

export const formSchemaForSign = (choice: boolean) =>
  z.object({
    nom: choice ? z.string().min(3) : z.string().optional(),
    prenom: choice ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(8),
  });
export interface compressImageProps {
  urlImage: string;
  name: string;
}
export async function compressImage(
  files: any,
  maxWidth: any,
  maxHeight: any,
  quality: any
): Promise<compressImageProps[]> {
  return new Promise((resolve, reject) => {
    const tab: compressImageProps[] = [];
    console.log(files);

    files.forEach((file: any) => {
      const name = file.name;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();

        img.src = event.target?.result as string;
        img.onload = () => {
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);
          const urlImage = canvas.toDataURL("image/jpeg", quality);

          tab.push({ urlImage, name });
        };
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
    console.log({ tab });
    resolve(tab);
  });
}
