import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { userApi } from "./api"

export const useUsers = (params) =>
    useQuery({
        queryKey: ["users", params],
        queryFn: () => userApi.getAll(params),
        placeholderData: keepPreviousData,
    })

const useInvalidate = () => {
    const qc = useQueryClient()
    return () => {
        qc.invalidateQueries({ queryKey: ["users"] })
        qc.invalidateQueries({ queryKey: ["employees"] })
}

export const useUpdateUserRoles = () => {
    const invalidate = useInvalidate()
    return useMutation({
        mutationFn: ({ id, roles }) => userApi.updateRoles(id, roles),
        onSuccess: () => {
            invalidate()
            toast.success("Đã cập nhật vai trò. Người dùng cần đăng nhập lại để áp dụng.")
        },
        onError: (err) => toast.error(err.message),
    })
}

export const useUpdateUserStatus = () => {
    const invalidate = useInvalidate()
    return useMutation({
        mutationFn: ({ id, status }) => userApi.updateStatus(id, status),
        onSuccess: (_, { status }) => {
            invalidate()
            toast.success(status === "LOCKED" ? "Đã khóa tài khoản" : "Đã mở khóa tài khoản")
        },
        onError: (err) => toast.error(err.message),
    })
}
