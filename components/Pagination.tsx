"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { generatePagination } from "@/lib/utils";
import clsx from "clsx";
import { usePathname, useSearchParams } from "next/navigation";

export function PaginationPage({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const allPages = generatePagination(currentPage, totalPages);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={createPageURL(currentPage - 1)}
            isActive={currentPage > 1}
          />
        </PaginationItem>

        {allPages.map((page, index) => {
          let position: "first" | "last" | "single" | "middle" | undefined;

          if (index === 0) position = "first";
          if (index === allPages.length - 1) position = "last";
          if (allPages.length === 1) position = "single";
          if (page === "...") position = "middle";

          const isActive = currentPage === page;

          const className = clsx(
            "flex h-10 w-10 items-center justify-center text-sm border",
            {
              "rounded-l-md": position === "first" || position === "single",
              "rounded-r-md": position === "last" || position === "single",
              "z-10 bg-blue-600 border-blue-600 text-white": isActive,
              "hover:bg-gray-100": !isActive && position !== "middle",
              "text-gray-300": position === "middle",
            }
          );

          return (
            <PaginationItem key={page}>
              {isActive || position === "middle" ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href={createPageURL(page)}
                  isActive={isActive}
                  className={className}
                >
                  {page}
                </PaginationLink>
              )}
              {/*<PaginationNumber
                key={page}
                href={createPageURL(page)}
                page={page}
                position={position}
                isActive={currentPage === page}
              />*/}
            </PaginationItem>
          );
        })}
        {/* <PaginationItem>
            <PaginationLink href={createPageURL(1)}>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href={createPageURL(2)} isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href={createPageURL(3)}>3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          */}

        <PaginationItem>
          <PaginationNext
            href={createPageURL(currentPage + 1)}
            isActive={currentPage < totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
