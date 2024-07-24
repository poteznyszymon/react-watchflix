import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

interface PaginationFooterProps {
  activePage: number;
  totalPages: number;
  handleClick: (page: number) => void;
}

export function PaginationFooter({
  activePage,
  totalPages,
  handleClick,
}: PaginationFooterProps) {
  return (
    <div className="m-5 flex justify-center items-center">
      <Pagination>
        <PaginationContent>
          <PaginationItem
            onClick={() => handleClick(activePage - 1)}
            className={`${activePage < 2 ? "pointer-events-none opacity-50" : ""}`}
          >
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              {activePage}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem onClick={() => handleClick(activePage + 1)}>
            <PaginationLink href="#">{activePage + 1}</PaginationLink>
          </PaginationItem>
          <PaginationItem onClick={() => handleClick(activePage + 2)}>
            <PaginationLink href="#">{activePage + 2}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => handleClick(activePage + 1)}
              className={`${activePage === totalPages ? "pointer-events-none opacity-50" : ""}`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
