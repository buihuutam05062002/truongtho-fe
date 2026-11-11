import dayjs from "dayjs"
import { useState } from "react"
import { Section } from "@/components/layout/section"
import { useNavigate } from "react-router-dom"
import {MoveUpRight} from "lucide-react"
import { Button } from "@base-ui/react/button"
const TIMES = [
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00",
  "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00",
]

const GUESTS = Array.from({ length: 8 }, (_, i) => i + 1)

const controlClass =
  "h-[52px] w-full rounded-[2px] border border-border bg-card px-3.5 text-xs text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:scheme-dark"


function Field({id,label,children}){
    return(
        <div className="flex flex-col gap-2.5">
            <label htmlFor={id} className="text-[10px] text-muted-foreground">{label}</label>
            {children}
        </div>
    )
}

export function ReserveSection(){
    const navigate = useNavigate()
    const [date,setDate] = useState(() => dayjs().add(1,"day").format("YYYY-MM-DD"))
    const [time,setTime] = useState("19:00")
    const [guests, setGuests] = useState(2)


    function handleSubmit(e){
        e.preventDefault()
        const params = new URLSearchParams({date,time,guests: String(guests)})
        navigate(`/dat-ban?${params}`)
    }

    return (
        <Section className="pt-0 lg:pt-0">
            <div className="grid overflow-hidden bg-secondary lg:grid-cols-[1fr_420px]">
                <div className="space-y-6 p-8 lg:p-14">
                    <div className="flex items-center gap-3">
                        <span className="h-px w-6 bg-rose"></span>
                        <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-gold">Hẹn bạn tại Trường Thọ</p>
                    </div>
                    <h2 className="font-serif text-4xl leading-[1.3] text-foreground lg:text-[44px]">
                        Giữ một chỗ ngồi, 
                        <br />
                        đón một niềm vui
                    </h2>
                    <p className="text-sm leading-[1.85] text-muted-foreground">
                        Một bữa tối đáng mong đợi bắt đầu từ một cuộc hẹn. Chọn thời gian phù hợp, để chúng tôi chăm chút phần còn lại.
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-[18px]">
                        <div className="grid gap-3 sm:grid-cols-3">
                            <Field id="reserve-date" label="Ngày đến">
                                <input id="reserve=date" type="date" required min={dayjs().format("YYYY-MM-DD")} value={date} onChange={(e) => setDate(e.target.value)} className="controlClass"></input>
                            </Field>

                            <Field id="reserve-time" label="Giờ dùng bữa">
                                <select name="" id="reserve-time" onChange={(e) => setTime(e.target.value)} className={controlClass}>
                                    {TIMES.map((t) => (<option key={t} value={t}>{t}</option>))}
                                </select>
                            </Field>
                            <Field id="reserve-guests" label="Số khách">
                                <select name="" id="reserve-guests" value={guests} onChange={(e) => setGuests(Number(e.target.value))} className={controlClass}>
                                    {GUESTS.map((n) => (
                                        <option value={n} key={n}>
                                            {String(n).padStart(2,"0")} khách
                                        </option>
                                    ))}
                                </select>
                            </Field>
                        </div>
                        <Button type="submit" className="h-[50px] w-full rounded-[2px] text-[13px] font-medium">Tiếp tục đặt bàn <MoveUpRight /></Button>
                        <p className="text-[10px] leading-[1.8] text-subtle">Yêu cầu đặt bàn chỉ hoàn tất sau khi được nhà hàng xác nhận. Với nhóm trên 8 khách, vui lòng liên hệ để được hỗ trợ riêng.</p>
                    </form>
                </div>
                <img src="https://i.pinimg.com/736x/e3/36/bd/e336bd02c57a9146f44d7e2d79c7e8a3.jpg" alt="" loading="lazy" className="h-56 w-full lg:h-full object-cover" />
            </div>
        </Section>
    )
}