import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {tableApi} from "./api"
import toast from "react-hot-toast";

export const useTables = () =>{
    return useQuery({
        queryKey: ["tables"],
        queryFn: () => tableApi.getAll(),
    })
}
export const useCreateTable = () => {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: tableApi.create,
        onSuccess: () =>{
            qc.invalidateQueries({queryKey: ["tables"]})
            toast.success("Đã thêm bàn")
        },
        onError: (err) => toast.error(err.message)
    })
}
export const useDeleteTable = () =>{
    const qc = useQueryClient()
    return useMutation({
        mutationFn: (id) => tableApi.delete(id),
        onSuccess: () =>{
            qc.invalidateQueries({queryKey: ["tables"]})
            toast.success("Đã xóa bàn")
        },
        onError: (err) => toast.error(err.message)
    })
}



export const useUpdateTable = () => {
    const qc = useQueryClient()
    return useMutation(
        {
            mutationFn: ({id,body}) => tableApi.update(id,body),
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