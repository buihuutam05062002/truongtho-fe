import { useQuery } from "@tanstack/react-query"
import { loyaltyApi } from "./api"

export const useMyLoyalty = () =>
    useQuery({
        queryKey: ["loyalty", "me"],
        queryFn: loyaltyApi.me,
        retry: false,
    })
