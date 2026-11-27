import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { reservationApi } from "./api";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export const useCreateReservation = () => {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: reservationApi.create,
        onSuccess: () => qc.invalidateQueries({ queryKey: ["reservations"] }),
    })
}

export const useReservations = (params) =>
    useQuery({
        queryKey: ["reservations",params],
        queryFn: () =>reservationApi.getAll(params),
        placeholderData: keepPreviousData,
    })

export const useMyReservations = (params) =>
    useQuery({
        queryKey: ["reservations", "mine", params],
        queryFn: () => reservationApi.mine(params),
        placeholderData: keepPreviousData,
    })

export const useUpdateMyReservation = () => {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: ({ id, body }) => reservationApi.updateMine(id, body),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["reservations"] })
            toast.success("Đã cập nhật đặt bàn")
        },
    })
}

export const useCancelMyReservation = () => {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: reservationApi.cancelMine,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["reservations"] })
            toast.success("Đã hủy đặt bàn")
        },
        onError: (err) => toast.error(err.message),
    })
}

export const useUpdateReservationStatus = () => {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: ({id,status,tableId} ) => reservationApi.updateStatus(id,status,tableId),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["reservations"] })
            toast.success("Đã cập nhật thành công");
        },
        onError: (err) =>{
            toast.error(err.message)
        }
    })


}
