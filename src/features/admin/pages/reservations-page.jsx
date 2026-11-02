import { Button } from "@/components/ui/button";
import { NEXT_ACTIONS } from "@/features/reservation/constants";
import { useReservations, useUpdateReservationStatus } from "@/features/reservation/hooks";
import { useState } from "react";

export default function ReservationsPage(){
    const [page,setPage] = useState(0)
    const {data, isLoading, isError, error} = useReservations({page,size:10, sort: "createdAt.desc"})
    const updateStatus = useUpdateReservationStatus()

    if(isLoading){
        return <p className="p-6">Đang tải...</p>
    }
    if(isError){
        return <p className="p-6 text-destructive">{error.message}</p>
    }

    return(
        <main className="space-y-6 p-6">
            <h1 className="font-serif text-3xl font-semibold">Quản lý đặt bàn</h1>
            <div className="overflow-x-auto rounded-lg border">
                <table className="w-full text-left text-sm">
                <thead className="bg-muted/50">
                    <tr>
                        <th className="p-3">Mã</th>
                        <th>Họ và tên</th>
                        <th>Số điện thoại</th>
                        <th>Thời gian</th>
                        <th>Số lượng</th>
                        <th>Trạng thái</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {data.content.map((r) =>{
                        return (
                            <tr key={r.id} className="border-t">
                                <td className="p-3">{r.reservationCode}</td>
                                <td>{r.contactName}</td>
                                <td>{r.contactPhone}</td>
                                <td>{r.reservationTime}</td>
                                <td>{r.partySize}</td>
                                <td>{r.reservationStatus}</td>
                                <td className="p-3 space-x-2">
                                    {
                                        (NEXT_ACTIONS[r.reservationStatus] ?? []).map((a) => (
                                            <Button 
                                                key={a.status}
                                                size="sm"
                                                disabled={updateStatus.isPending}
                                                onClick={() => updateStatus.mutate({id:r.id,status:a.status})}
                                            >
                                                {a.label}
                                            </Button>
                                        ))
                                    }


                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Trang {data.number+1} / {data.totalPages}  ({data.totalElements} đơn)</p>
                <div className="space-x-2">
                    <Button variant="outline" disabled={data.first} onClick={() => setPage((p) => p - 1) }>Trước</Button>
                    <Button variant="outline" disabled={data.last} onClick={() => setPage((p) => p + 1) }>Sau</Button>
              
                </div>
            </div>
            </div>
        </main>
    )
}