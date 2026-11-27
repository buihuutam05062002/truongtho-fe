import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { categoryApi } from "./api"

export const useCategories = () =>
    useQuery({
        queryKey: ["categories"],
        queryFn: () => categoryApi.getAll(),
    })


const useRefresh = () => {
    const qc = useQueryClient()
    return () => {
        qc.invalidateQueries({ queryKey: ["categories"] })
        qc.invalidateQueries({ queryKey: ["products"] })
    }
}

export const useCreateCategory = () => {
    const refresh = useRefresh()
    return useMutation({
        mutationFn: categoryApi.create,
        onSuccess: () => {
            refresh()
            toast.success("Đã thêm danh mục")
        },
        onError: (err) => toast.error(err.message),
    })
}

export const useUpdateCategory = () => {
    const refresh = useRefresh()
    return useMutation({
        mutationFn: ({ id, body }) => categoryApi.update(id, body),
        onSuccess: () => {
            refresh()
            toast.success("Đã cập nhật danh mục")
        },
        onError: (err) => toast.error(err.message),
    })
}

export const useDeleteCategory = () => {
    const refresh = useRefresh()
    return useMutation({
        mutationFn: (id) => categoryApi.delete(id),
        onSuccess: () => {
            refresh()
            toast.success("Đã xóa danh mục")
        },
        onError: (err) => toast.error(err.message),
    })
}
