import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { reservationApi } from "./api";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export const useCreateReservation = () => {
    return useMutation({
        mutationFn: reservationApi.create
    })
}

export const useReservations = (params) =>
    useQuery({
        queryKey: ["reservations",params],
        queryFn: () =>reservationApi.getAll(params),
        placeholderData: keepPreviousData,
    })

export const useUpdateReservationStatus = () => {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: ({id,status} ) => reservationApi.updateStatus(id,status),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["reservations"] })
            toast.success("Đã cập nhật thành công");
        },
        onError: (err) =>{
            toast.error(err.message)
        }
    })


}
