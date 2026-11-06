import { useForm } from "react-hook-form"
import { useCreateTable, useUpdateTable } from "../hook"
import { zodResolver } from "@hookform/resolvers/zod"
import { diningTableSchema } from "../schemas"
import { Button } from "@/components/ui/button"
import { FormField } from "@/components/form/form-field"
import { Input } from "@/components/ui/input"

function TableForm({initial, onDone}) {
    const isEdit = !!initial.id
    const create = useCreateTable()
    const update = useUpdateTable()

    const {register, handleSubmit, formState:{errors}} = useForm({
        resolver:zodResolver(diningTableSchema),
        defaultValues:{
            name: initial.name ?? "",
            position: initial.position ?? 1,
            capacity: initial.capacity ?? 2,
            tableStatus: initial.tableStatus ?? "AVAILABLE"
        }
    })
    const onSubmit = (values) =>{
        const opts = {onSuccess: onDone}
        if(isEdit){
            update.mutate({id: initial.id,body:values},opts)
        }





        else{
            create.mutate(values,opts)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4 rouded-lg border p-4">

            <FormField id="name" label="Tên bàn" error={errors.name?.message}>
                <Input id="name" autoComplete="name" {...register("name")} className="h-11" aria-invalid={!!errors.name}></Input>
            </FormField>
            <FormField id="position" label="Vị trí" error={errors.position?.message}>
                <Input id="position" autoComplete="position"  {...register("position")} aria-invalid={!!errors.position}></Input>
            </FormField>
            <FormField id="capacity" label="Sức chứa" error={errors.capacity?.message}>
                <Input id="capacity" autoComplete="capacity"  {...register("capacity")} aria-invalid={!!errors.position}></Input>
            </FormField>
            <select name="tableStatus" id="tableStatus"></select>


            <Button type="submit" disabled={create.isPending || update.isPending}>
                {isEdit ? "Lưu" : "Thêm"}
            </Button>
            <Button type="button" variant="outline" onClick={onDone}>Hủy</Button>
        </form>
    )
}
export default TableForm