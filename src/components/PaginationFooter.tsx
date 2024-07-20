import {
  Pagination,
  PaginationContent,
  PaginationItem,
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
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handleClick(activePage - 1)}
              className={`${activePage < 2 ? "pointer-events-none opacity-50" : ""}`}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={() => handleClick(activePage + 1)}
              className={`${activePage === totalPages ? "pointer-events-none opacity-50" : ""}`}
            />
          </PaginationItem>
          <PaginationItem className="font-light">
            {activePage}/{totalPages}
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
