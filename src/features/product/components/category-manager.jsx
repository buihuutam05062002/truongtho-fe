import { useState } from "react"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import {
    useCategories,
    useCreateCategory,
    useDeleteCategory,
    useUpdateCategory,
} from "@/features/categories/hooks"

const inputClass = "h-[38px] bg-background text-xs md:text-xs dark:bg-background"

function CategoryRow({ category }) {
    const [name, setName] = useState(category.name)
    const [confirming, setConfirming] = useState(false)
    const update = useUpdateCategory()
    const remove = useDeleteCategory()
    const dirty = name.trim() !== "" && name.trim() !== category.name

    return (
        <li className="flex items-center gap-2">
            <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-label={`Tên danh mục ${category.name}`}
                className={inputClass}
            />
            {dirty && (
                <Button
                    size="lg"
                    className="h-[38px]"
                    disabled={update.isPending}
                    onClick={() => update.mutate({ id: category.id, body: { name: name.trim() } })}
                >
                    Lưu
                </Button>
            )}
            {confirming ? (
                <>
                    <Button
                        variant="destructive"
                        className="h-[38px]"
                        disabled={remove.isPending}
                        onClick={() => remove.mutate(category.id, { onSettled: () => setConfirming(false) })}
                    >
                        Xác nhận xóa
                    </Button>
                    <Button variant="ghost" className="h-[38px]" onClick={() => setConfirming(false)}>
                        Hủy
                    </Button>
                </>
            ) : (
                <Button
                    variant="ghost"
                    size="icon-lg"
                    aria-label={`Xóa danh mục ${category.name}`}
                    onClick={() => setConfirming(true)}
                >
                    <Trash2 />
                </Button>
            )}
        </li>
    )
}

export default function CategoryManager({ open, onClose }) {
    const { data: categories = [], isLoading } = useCategories()
    const create = useCreateCategory()
    const [name, setName] = useState("")

    const add = (e) => {
        e.preventDefault()
        const value = name.trim()
        if (!value) return
        create.mutate({ name: value }, { onSuccess: () => setName("") })
    }

    return (
        <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
            <DialogContent
                title="Quản lý danh mục"
                description="Thêm, đổi tên hoặc xóa danh mục món. Danh mục còn món sẽ không xóa được."
            >
                <form onSubmit={add} className="mb-4 flex gap-2">
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Tên danh mục mới"
                        aria-label="Tên danh mục mới"
                        className={inputClass}
                    />
                    <Button type="submit" className="h-[38px]" disabled={create.isPending || !name.trim()}>
                        Thêm
                    </Button>
                </form>

                {isLoading ? (
                    <p className="py-4 text-center text-xs text-muted-foreground">Đang tải...</p>
                ) : categories.length === 0 ? (
                    <p className="py-4 text-center text-xs text-muted-foreground">Chưa có danh mục nào</p>
                ) : (
                    <ul className="max-h-[50svh] space-y-2 overflow-y-auto">
                        {categories.map((c) => (
                            <CategoryRow key={c.id} category={c} />
                        ))}
                    </ul>
                )}
            </DialogContent>
        </Dialog>
    )
}
