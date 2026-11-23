import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { contactApi } from "./api"

export const useSendContact = () =>
  useMutation({
    mutationFn: contactApi.send,
    onSuccess: () => toast.success("Đã gửi lời nhắn. Trường Thọ sẽ phản hồi sớm nhất!"),
  })