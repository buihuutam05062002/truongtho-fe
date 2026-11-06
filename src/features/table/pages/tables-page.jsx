import { useState } from "react"
import { useDeleteTable, useTables } from "../hook"
import { Button } from "@/components/ui/button"
import TableForm from "../components/table-form"

export default function TablePage() {
    const {data,isLoading,isError, error} = useTables()
    console.log(data)

    const [editing, setEditing] = useState(null)
    const remove = useDeleteTable()


    if(isLoading) {
        return <p className="p-6">Đang tải.</p>
    }
    if(isError){
        return <p className="p-6 text-destructive">{error.message}</p>
    }
    return (
        <main>
            <h1 className="font-serif text-3xl font-semibold ">Quản lý bàn</h1>
            <Button onClick={() => setEditing({})}>Thêm bàn</Button>

            {editing && (
                <TableForm
                    key={editing.id ?? "new"}
                    initial={editing}
                    onDone={() => setEditing(null)}
                />
            )}
            <div className="overflow-x-auto rounded-lg border ">
                <table className="w-full text-left text-sm">
                    <thead className="bg-muted/50">
                    <tr>
                        <th className="p-3">Tên bàn</th>
                        <th>Vị trí</th>
                        <th>Sức chứa</th>
                        <th>Tình trạng</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((r) =>{
                        return (
                            <tr key={r.id} className="p-3 border-t">
                                <td>{r.name}</td>
                                <td>{r.position}</td>
                                <td>{r.capacity}</td>
                                <td>{r.tableStatus}</td>
                                <td className="p-3 space-x-2">
                                    <Button size="sm" variant="outline"  onClick={() => setEditing(r)}>Sửa</Button>
                                    <Button size="sm" disabled = {remove.isPending} onClick={() =>{
                                        if(window.confirm(`Xóa ${r.name}`)){
                                            remove.mutate(r.id)
                                        }
                                    }}>Xóa</Button>
                             
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
                </table>
            </div>
        
        </main>
    )
}