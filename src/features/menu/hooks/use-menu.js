import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { productApi } from "@/features/product/api"

export const useMenu = (params) =>
    useQuery({
        queryKey: ["products", "menu", params],
        queryFn: () => productApi.getAll(params),
        placeholderData: keepPreviousData,
    })