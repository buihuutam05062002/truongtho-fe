import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { MoveUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { FormField } from "@/components/form/form-field"
import { applyServerErrors } from "@/lib/form"
import { contactSchema } from "../schemas"
import { useSendContact } from "../hooks"
import { CONTACT_TOPICS } from "../constants"

const labelClass = "text-[11px] normal-case tracking-normal font-normal"
const controlClass = "h-[52px] rounded-[2px] bg-card px-3.5 text-[13px] dark:bg-card"

export function ContactForm() {
  const send = useSendContact()
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", phone: "", email: "", topic: CONTACT_TOPICS[0], message: "" },
  })

  const onSubmit = (values) =>
    send.mutate(values, {
      onSuccess: () => reset(),
      onError: (err) => applyServerErrors(err, setError),
    })

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-5 bg-secondary p-6 sm:p-10 lg:p-12"
    >
      <h3 className="font-serif text-[28px] leading-[34px] text-foreground">Gửi lời nhắn cho chúng tôi</h3>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField id="contact-name" label="Họ và tên" labelClassName={labelClass} error={errors.name?.message}>
          <Input id="contact-name" autoComplete="name" placeholder="Nguyễn Văn A" aria-invalid={!!errors.name} className={controlClass} {...register("name")} />
        </FormField>

        <FormField id="contact-phone" label="Số điện thoại" labelClassName={labelClass} error={errors.phone?.message}>
          <Input id="contact-phone" type="tel" autoComplete="tel" placeholder="0xxx xxx xxx" aria-invalid={!!errors.phone} className={controlClass} {...register("phone")} />
        </FormField>

        <FormField id="contact-email" label="Email" labelClassName={labelClass} error={errors.email?.message}>
          <Input id="contact-email" type="email" autoComplete="email" placeholder="ban@email.com" aria-invalid={!!errors.email} className={controlClass} {...register("email")} />
        </FormField>

        <FormField id="contact-topic" label="Bạn cần hỗ trợ về" labelClassName={labelClass} error={errors.topic?.message}>
          <Select
            id="contact-topic"
            selectClassName="h-[52px] rounded-[2px] bg-card pl-3.5 pr-9 text-[13px]"
            {...register("topic")}
          >
            {CONTACT_TOPICS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </Select>
        </FormField>
      </div>

      <FormField id="contact-message" label="Lời nhắn" labelClassName={labelClass} error={errors.message?.message}>
        <Textarea
          id="contact-message"
          rows={5}
          placeholder="Bạn muốn chúng tôi chuẩn bị điều gì?"
          aria-invalid={!!errors.message}
          className="min-h-[130px] resize-y rounded-[2px] bg-card px-3.5 py-3 text-[13px] dark:bg-card"
          {...register("message")}
        />
      </FormField>

      {send.isError && (
        <p role="alert" className="text-sm text-destructive">{send.error.message}</p>
      )}

      <Button type="submit" disabled={send.isPending} className="h-[50px] w-full rounded-[2px] text-[13px] font-medium">
        {send.isPending ? "Đang gửi..." : "Gửi lời nhắn"} <MoveUpRight />
      </Button>

      <p className="text-[11px] leading-[18px] text-subtle">
        Chúng tôi sẽ phản hồi trong thời gian sớm nhất.
      </p>
    </form>
  )
}