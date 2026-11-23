import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { reportApi } from "./api"

export const useReport = (from, to) =>
    useQuery({
        queryKey: ["report", from, to],
        queryFn: () => reportApi.get({ from, to }),
        placeholderData: keepPreviousData,
    })
