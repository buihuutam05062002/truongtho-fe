import { useIsFetching, useQueryClient } from "@tanstack/react-query"
import dayjs from "dayjs"

export function SyncStatus() {
  const queryClient = useQueryClient()
  useIsFetching() 

  const last = queryClient
    .getQueryCache()
    .getAll()
    .reduce((max, q) => Math.max(max, q.state.dataUpdatedAt ?? 0), 0)

  if (!last) return null
  return (
    <>
      <span className="hidden text-[10px] text-success md:inline">
        • Đã đồng bộ lúc {dayjs(last).format("HH:mm")}
      </span>
      <span aria-hidden="true" className="hidden h-[18px] w-px bg-border md:block" />
    </>
  )
}
