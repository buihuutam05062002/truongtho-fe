import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { employeeApi } from "./api"

export const useEmployees = (params) =>
    useQuery({
        queryKey: ["employees", params],
        queryFn: () => employeeApi.getAll(params),
        placeholderData: keepPreviousData,
    })

export const useEmployeeStats = () =>
    useQuery({
        queryKey: ["employees", "stats"],
        queryFn: () => employeeApi.getStats(),
    })

export const useCreateEmployee = () => {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: employeeApi.create,
        onSuccess: () => qc.invalidateQueries({ queryKey: ["employees"] }),
        onError: (err) => toast.error(err.message),
    })
}

export const useUpdateEmployee = () => {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: ({ id, body }) => employeeApi.update(id, body),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["employees"] })
            toast.success("Đã cập nhật hồ sơ nhân viên")
        },
        onError: (err) => toast.error(err.message),
    })
}

export const useDeleteEmployee = () => {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: (id) => employeeApi.remove(id),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["employees"] })
            toast.success("Đã xóa nhân viên")
        },
        onError: (err) => toast.error(err.message),
    })
}

export const useResetEmployeePassword = () =>
    useMutation({
        mutationFn: (id) => employeeApi.resetPassword(id),
        onError: (err) => toast.error(err.message),
    })
