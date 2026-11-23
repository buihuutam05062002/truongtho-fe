import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import toast from "react-hot-toast"
import { Info, Save, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useCategories } from "@/features/categories/hooks"
import { useCreateProduct, useUpdateProduct, useUploadImage } from "../hooks"
import { productSchema } from "../schemas"
import ProductImages from "./product-images"
import { MAX_IMAGES, MAX_IMAGE_MB, PRODUCT_STATUS_LABEL } from "../constants"

const control =
    "h-[38px] w-full rounded-lg border border-input bg-background px-2.5 text-xs text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive dark:bg-background"
const inputClass = "h-[38px] bg-background text-xs md:text-xs dark:bg-background"
const actionBtn = "h-[38px] px-3.5 text-xs font-semibold"

function Field({ id, label, error, children, className }) {
    return (
        <div className={cn("space-y-1.5", className)}>
            <Label htmlFor={id} className="text-[11px] font-normal text-muted-foreground">
                {label}
            </Label>
            {children}
            {error && (
                <p id={`${id}-error`} role="alert" className="text-xs text-destructive">
                    {error}
                </p>
            )}
        </div>
    )
}


const fromServer = (img) => ({ id: img.id, src: img.imageUrl, altText: img.altText ?? "" })

export default function ProductForm({ initial, onSaved, onCancel, onDelete }) {
    const isEdit = !!initial.id
    const create = useCreateProduct()
    const update = useUpdateProduct()
    const upload = useUploadImage()
    const { data: categories = [] } = useCategories()

    const initialImages = (initial.productImageResponses ?? []).map(fromServer)
    const [images, setImages] = useState(initialImages)

    const defaults = {
        name: initial.name ?? "",
        unitPrice: initial.unitPrice ?? 0,
        description: initial.description ?? "",
        productStatus: initial.productStatus ?? "ON_SALE",
        categoryId: initial.categoryResponse?.id ?? "",
    }

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ resolver: zodResolver(productSchema), defaultValues: defaults })

    const addImages = async (files) => {
        const room = MAX_IMAGES - images.length
        if (files.length > room) toast.error(`Mỗi món tối đa ${MAX_IMAGES} ảnh`)
        for (const file of files.slice(0, Math.max(room, 0))) {
            if (file.size > MAX_IMAGE_MB * 1024 * 1024) {
                toast.error(`${file.name} vượt quá ${MAX_IMAGE_MB}MB`)
                continue
            }
            try {
                const { key } = await upload.mutateAsync(file)
                setImages((list) => [...list, { key, src: URL.createObjectURL(file), altText: "" }])
            } catch {
                /* toast lỗi đã hiển thị ở hook */
            }
        }
    }

    const onSubmit = (values) => {
        const body = {
            ...values,
            productImageRequests: images.map((img) => ({
                ...(img.id ? { id: img.id } : { key: img.key }),
                altText: img.altText || values.name,
            })),
        }
        const opts = {
    onSuccess: (res) => {
        setImages((res?.productImageResponses ?? []).map(fromServer))
        onSaved?.(res)
    },
}



        if (isEdit) update.mutate({ id: initial.id, body }, opts)
        else create.mutate(body, opts)
    }

    const handleCancel = () => {
        if (!isEdit) return onCancel?.()
        reset(defaults)
        setImages(initialImages)
    }

    const pending = create.isPending || update.isPending || upload.isPending

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
            <ProductImages
                images={images}
                onChange={setImages}
                onAdd={addImages}
                uploading={upload.isPending}
                name={initial.name}
            />

            <Field id="name" label="Tên món" error={errors.name?.message}>
                <Input id="name" className={inputClass} aria-invalid={!!errors.name} {...register("name")} />
            </Field>

            <div className="grid grid-cols-2 gap-3">
                <Field id="categoryId" label="Danh mục" error={errors.categoryId?.message}>
                    <select
                        id="categoryId"
                        className={control}
                        aria-invalid={!!errors.categoryId}
                        {...register("categoryId", { setValueAs: (v) => (v === "" ? undefined : Number(v)) })}
                    >
                        <option value="">Chọn danh mục</option>
                        {categories.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                </Field>
                <Field id="unitPrice" label="Giá bán (VND)" error={errors.unitPrice?.message}>
                    <Input
                        id="unitPrice"
                        type="number"
                        min={0}
                        step={1000}
                        className={inputClass}
                        aria-invalid={!!errors.unitPrice}
                        {...register("unitPrice", { valueAsNumber: true })}
                    />
                </Field>
            </div>

            <Field id="description" label="Mô tả món" error={errors.description?.message}>
                <Textarea
                    id="description"
                    className="min-h-[74px] bg-background text-xs md:text-xs dark:bg-background"
                    {...register("description")}
                />
            </Field>

            <div className="flex items-center justify-between gap-3">
                <Label htmlFor="productStatus" className="text-[11px] font-normal text-muted-foreground">
                    Tình trạng bán
                </Label>
                <select id="productStatus" className={cn(control, "w-[150px]")} {...register("productStatus")}>
                    {Object.entries(PRODUCT_STATUS_LABEL).map(([value, label]) => (
                        <option key={value} value={value}>
                            {label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex items-start gap-2 rounded-sm bg-amber-500/10 p-3 text-[11px] text-amber-700 dark:text-[#d8b775]">
                <Info className="mt-0.5 size-3.5 shrink-0" />
                <p>Giá mới chỉ áp dụng cho đơn tạo sau khi lưu. Các đơn đang mở giữ nguyên giá cũ.</p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
                <Button type="button" variant="outline" className={actionBtn} onClick={handleCancel}>
                    {isEdit ? "Hủy thay đổi" : "Hủy"}
                </Button>
                <Button type="submit" className={actionBtn} disabled={pending}>
                    <Save className="size-[15px]" />
                    {isEdit ? "Lưu món" : "Thêm món"}
                </Button>
                {isEdit && (
                    <Button
                        type="button"
                        variant="destructive"
                        className={cn(actionBtn, "ml-auto")}
                        aria-label={`Xóa ${initial.name}`}
                        onClick={onDelete}
                    >
                        <Trash2 className="size-[15px]" />
                        Xóa
                    </Button>
                )}
            </div>
        </form>
    )
}
