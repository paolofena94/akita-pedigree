import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface SharedPaginationProps {
  currentPage: number;
  totalPages: number;
  /** * Funzione passata dal genitore che, dato un numero di pagina, 
   * restituisce l'URL completo con i query params aggiornati 
   */
  createPageUrl: (pageNumber: number) => string;
}

export function SharedPagination({ 
  currentPage, 
  totalPages, 
  createPageUrl 
}: SharedPaginationProps) {
  
  // Se c'è solo una pagina (o zero), nascondiamo la paginazione
  if (totalPages <= 1) return null;

  // Funzione interna per generare l'array in modo intelligente [1, 2, "ELLIPSIS", 7, 8, 9]
  const generatePaginationRange = () => {
    const delta = 1; // Quante pagine mostrare a destra e sinistra di quella attiva
    const range: (number | "ELLIPSIS")[] = [];

    // Calcoliamo i vicini
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    // Aggiungiamo i puntini di sospensione se necessario
    if (currentPage - delta > 2) range.unshift("ELLIPSIS");
    if (currentPage + delta < totalPages - 1) range.push("ELLIPSIS");

    // Aggiungiamo sempre la prima e l'ultima pagina
    range.unshift(1);
    if (totalPages > 1) range.push(totalPages);

    return range;
  };

  const paginationRange = generatePaginationRange();

  return (
    <div className="mt-auto pt-6 border-t border-slate-100">
      <Pagination>
        <PaginationContent>
          {/* Tasto Precedente */}
          <PaginationItem>
            <PaginationPrevious
              href={currentPage > 1 ? createPageUrl(currentPage - 1) : "#"}
              className={currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              scroll={false}
            />
          </PaginationItem>

          {/* Numeri e Puntini */}
          {paginationRange.map((p, idx) => (
            <PaginationItem key={idx}>
              {p === "ELLIPSIS" ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href={createPageUrl(p)}
                  isActive={currentPage === p}
                  scroll={false}
                >
                  {p}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          {/* Tasto Successivo */}
          <PaginationItem>
            <PaginationNext
              href={currentPage < totalPages ? createPageUrl(currentPage + 1) : "#"}
              className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              scroll={false}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}