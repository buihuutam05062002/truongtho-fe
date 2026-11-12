import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {categoryApi} from "./api"
import toast from "react-hot-toast";

export const useCategories = () =>{
    return useQuery({
        queryKey: ["categories"],
        queryFn: () => categoryApi.getAll(),
    })
}
export const useCreateCategory = () => {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: categoryApi.create,
        onSuccess: () =>{
            qc.invalidateQueries({queryKey: ["categories"]})
            toast.success("Đã thêm danh mục")
        },
        onError: (err) => toast.error(err.message)
    })
}
export const useDeleteCategory = () =>{
    const qc = useQueryClient()
    return useMutation({
        mutationFn: (id) => categoryApi.delete(id),
        onSuccess: () =>{
            qc.invalidateQueries({queryKey: ["categories"]})
            toast.success("Đã xóa danh mục")
        },
        onError: (err) => toast.error(err.message)
    })
}



export const useUpdateCategory = () => {
    const qc = useQueryClient()
    return useMutation(
        {
            mutationFn: ({id,body}) => categoryApi.update(id,body),
            onSuccess: () => {
                qc.invalidateQueries({queryKey: ["categories"]})
                toast.success("Đã cập nhật danh mục")
            },
            onError: (err) =>{
                toast.error(err.message)
            }
        
        }
    )
}