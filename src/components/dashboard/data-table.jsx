import { cn } from "@/lib/utils"

export function DataTable({ columns, rows, getRowKey, empty = "Chưa có dữ liệu", className }) {
  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full text-left text-xs">
        <thead>
          <tr className="bg-secondary">
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className={cn(
                  "h-9 px-2.5 text-[9px] font-normal uppercase tracking-wide text-subtle",
                  col.align === "right" && "text-right",
                  col.className
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="h-[54px] px-2.5 text-center text-muted-foreground"
              >
                {empty}
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr key={getRowKey(row)} className="border-b border-border last:border-b-0">
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn(
                      "h-[54px] px-2.5 text-foreground",
                      col.align === "right" && "text-right",
                      col.className
                    )}
                  >
                    {col.cell ? col.cell(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}