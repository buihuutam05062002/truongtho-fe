import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { FormField } from "@/components/form/form-field"
import { Input } from "@/components/ui/input"
import { useCreateTable, useUpdateTable } from "../hook"
import { diningTableSchema } from "../schemas"
import { TABLE_STATUS_LABEL } from "../constants"

const selectClass =
    "h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"


const toNumber = (v) => (v === "" || v == null ? undefined : Number(v))

export default function TableForm({ initial, onDone }) {
    const isEdit = !!initial.id
    const create = useCreateTable()
    const update = useUpdateTable()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(diningTableSchema),
        defaultValues: {
            name: initial.name ?? "",
            position: initial.position ?? 1,
            capacity: initial.capacity ?? 2,
            tableStatus: initial.tableStatus ?? "AVAILABLE",
        },
    })

    const onSubmit = (values) => {
        const opts = { onSuccess: onDone }
        if (isEdit) update.mutate({ id: initial.id, body: values }, opts)
        else create.mutate(values, opts)
    }

    const pending = create.isPending || update.isPending

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-4 sm:grid-cols-2">
                <FormField id="name" label="Tên bàn" error={errors.name?.message}>
                    <Input
                        id="name"
                        className="h-10"
                        aria-invalid={!!errors.name}
                        {...register("name")}
                    />
                </FormField>

                <FormField id="tableStatus" label="Trạng thái" error={errors.tableStatus?.message}>
                    <select id="tableStatus" className={`${selectClass} h-10`} {...register("tableStatus")}>
                        {Object.entries(TABLE_STATUS_LABEL).map(([value, label]) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                    </select>
                </FormField>

                <FormField id="capacity" label="Sức chứa (người)" error={errors.capacity?.message}>
                    <Input
                        id="capacity"
                        type="number"
                        min={1}
                        max={50}
                        className="h-10"
                        aria-invalid={!!errors.capacity}
                        {...register("capacity", { valueAsNumber: true })}
                    />
                </FormField>

                <FormField id="position" label="Vị trí" error={errors.position?.message}>
                    <Input
                        id="position"
                        type="number"
                        className="h-10"
                        aria-invalid={!!errors.position}
                        {...register("position", { setValueAs: toNumber })}
                    />
                </FormField>

                <div className="flex gap-2 sm:col-span-2">
                    <Button type="submit" disabled={pending}>
                        {isEdit ? "Lưu thay đổi" : "Thêm bàn"}
                    </Button>
                    <Button type="button" variant="outline" onClick={onDone}>
                        Hủy
                    </Button>
                </div>
            </form>
        </>
    )
}
