import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";

interface Props {
  offset: number;
  limit: number;
  count: number;
  handleChangeOffset: (newOffset: number) => void;
}

function ListPagination({ offset, limit, count, handleChangeOffset }: Props) {
  const page = Math.floor(offset / limit) + 1;
  const totalPages = Math.ceil(count / limit);

  const handlePageClick = (newPage: number) => {
    handleChangeOffset((newPage - 1) * limit);
  };

  return (
    <div className="container mx-auto my-8 flex justify-center">
      <Pagination>
        <PaginationContent>
          {page > 1 && (
            <PaginationItem>
              <PaginationPrevious onClick={() => handlePageClick(page - 1)} />
            </PaginationItem>
          )}

          {page > 2 && (
            <>
              <PaginationItem>
                <PaginationLink onClick={() => handlePageClick(1)}>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            </>
          )}

          {page > 1 && (
            <PaginationItem>
              <PaginationLink onClick={() => handlePageClick(page - 1)}>{page - 1}</PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationLink isActive>{page}</PaginationLink>
          </PaginationItem>

          {page < totalPages && (
            <PaginationItem>
              <PaginationLink onClick={() => handlePageClick(page + 1)}>{page + 1}</PaginationLink>
            </PaginationItem>
          )}

          {page < totalPages - 1 && (
            <>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink onClick={() => handlePageClick(totalPages)}>{totalPages}</PaginationLink>
              </PaginationItem>
            </>
          )}

          {page < totalPages && (
            <PaginationItem>
              <PaginationNext onClick={() => handlePageClick(page + 1)} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default ListPagination;
