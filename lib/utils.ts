import { type ClassValue, clsx } from "clsx";

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

/*export function GetQueryParams(): getQueryParamsReturnType {
 
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const monOffre = params.get("type_offre");
  const monPays = params.get("pays");
  const maVille = params.get("ville");
  console.log({ monOffre, monPays, maVille });

  return { monOffre, monPays, maVille };
}*/

export const formSchemaForSign = (choice: boolean) =>
  z.object({
    nom: choice ? z.string().min(3) : z.string().optional(),
    prenom: choice ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(8),
  });
export interface compressImageProps {
  tabImage: string[];
  tabName: string[];
}
export async function compressImage(
  files: any[],
  maxWidth: any,
  maxHeight: any,
  quality: any
): Promise<compressImageProps> {
  const tabImages: string[] = [];
  const tabNames: string[] = [];

  for (let i = 0; i < files.length; i++) {
    let urlImage: string;
    const name = files[i].name;

    const data = await (function (file: File, name: string): Promise<string[]> {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (event) => {
          const img = new Image();
          console.log("niveaui2");
          img.src = event.target?.result as string;
          img.onload = () => {
            console.log("niveau3");
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
            urlImage = canvas.toDataURL("image/jpeg", quality);
            console.log(urlImage.length);
            console.log("niveaui4");
            console.log({ urlImage, name });
            resolve([urlImage, name]);
          };
        };
        reader.onerror = (error) => {
          reject(error);
        };
      });
    })(files[i], name);
    tabImages[i] = data[0];
    tabNames[i] = data[1];
  }
  /*reader.onerror = (error) => {
        reject(error);
      };
     */
  /* const data = files.map((files: any) => {
     
     
    });
    console.log(data);
    const tabImage = data.map((elt: any) => {
      return elt.urlImage;
    });
    const tabName = data.map((elt: any) => {
      return elt.name;
    });

    console.log({ tabImage, tabName });*/
  console.log("niveau3");
  console.log(tabImages, tabNames);
  return { tabImage: tabImages, tabName: tabNames };
}

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};
