import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";

interface props {
  current: number;
  next: string | null;
  previous: string | null;
  count: number;
  limit: number;
}

function ListPagination({ current, next, previous, count, limit }: props) {
  const p = previous ? new URL(previous).searchParams.get("offset") : null;
  const n = next ? new URL(next).searchParams.get("offset") : null;

  const page = Math.floor(current / limit) + 1;
  const totalPages = Math.ceil(count / limit);

  return (
    <div className="container mx-auto my-8 flex justify-center">
      <Pagination>
        <PaginationContent>
          {p && (
            <PaginationItem>
              <PaginationPrevious href={`/?o=${p}`} prefetch={true} />
            </PaginationItem>
          )}

          {/* Show first page if current page is greater than 2 */}
          {page > 2 && (
            <>
              <PaginationItem>
                <PaginationLink href="/?o=0" prefetch={true}>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            </>
          )}

          {/* Show previous page if it exists and current page is not the first page */}
          {page > 1 && (
            <PaginationItem>
              <PaginationLink href={`/?o=${(page - 2) * limit}`} prefetch={true}>
                {page - 1}
              </PaginationLink>
            </PaginationItem>
          )}

          {/* Show current page */}
          <PaginationItem>
            <PaginationLink href={`/?o=${(page - 1) * limit}`} prefetch={true} isActive>
              {page}
            </PaginationLink>
          </PaginationItem>

          {/* Show next page if it exists and current page is not the last page */}
          {page < totalPages && (
            <PaginationItem>
              <PaginationLink href={`/?o=${page * limit}`} prefetch={true}>
                {page + 1}
              </PaginationLink>
            </PaginationItem>
          )}

          {/* Show last page if current page is less than totalPages - 1 */}
          {page < totalPages - 1 && (
            <>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href={`/?o=${(totalPages - 1) * limit}`} prefetch={true}>
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          )}

          {n && (
            <PaginationItem>
              <PaginationNext href={`/?o=${n}`} prefetch={true} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default ListPagination;
