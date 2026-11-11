import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {categoryApi} from "./api"
import toast from "react-hot-toast";

export const useTables = () =>{
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
            qc.invalidateQueries({queryKey: ["tables"]})
            toast.success("Đã thêm bàn")
        },
        onError: (err) => toast.error(err.message)
    })
}
export const useDeleteCategory = () =>{
    const qc = useQueryClient()
    return useMutation({
        mutationFn: (id) => categoryApi.delete(id),
        onSuccess: () =>{
            qc.invalidateQueries({queryKey: ["tables"]})
            toast.success("Đã xóa bàn")
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
                qc.invalidateQueries({queryKey: ["tables"]})
                toast.success("Đã cập nhật bàn thành công")
            },
            onError: (err) =>{
                toast.error(err.message)
            }
        
        }
    )
}