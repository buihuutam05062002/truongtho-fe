import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { productApi, uploadApi } from "./api"

export const useProducts = (params) =>
    useQuery({
        queryKey: ["products", params],
        queryFn: () => productApi.getAll(params),
        placeholderData: keepPreviousData,
    })

export const useProductStats = () =>
    useQuery({
        queryKey: ["products", "stats"],
        queryFn: () => productApi.getStats(),
    })

export const useCreateProduct = () => {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: productApi.create,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["products"] })
            toast.success("Đã thêm món")
        },
        onError: (err) => toast.error(err.message),
    })
}

export const useUpdateProduct = () => {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: ({ id, body }) => productApi.update(id, body),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["products"] })
            toast.success("Đã cập nhật món")
        },
        onError: (err) => toast.error(err.message),
    })
}

export const useDeleteProduct = () => {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: (id) => productApi.delete(id),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["products"] })
            toast.success("Đã xóa món")
        },
        onError: (err) => toast.error(err.message),
    })
}

export const useUploadImage = () =>
    useMutation({
        mutationFn: (file) => uploadApi.upload(file),
        onError: (err) => toast.error(err.message),
    })
