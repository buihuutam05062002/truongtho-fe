import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { dashboardApi } from "./api"

export const useDashboard = (date) =>
    useQuery({
        queryKey: ["dashboard", date],
        queryFn: () => dashboardApi.get({ date }),
        placeholderData: keepPreviousData,
        refetchInterval: 60_000,
    })
