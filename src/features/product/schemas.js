import { z } from "zod"
import { PRODUCT_STATUS_LABEL } from "./constants"

export const productSchema = z.object({
    name: z.string().trim().min(1, "Vui lòng nhập tên món"),
    unitPrice: z
        .number({ error: "Vui lòng nhập giá" })
        .min(0, "Giá không được nhỏ hơn 0"),
    description: z.string().trim().optional(),
    productStatus: z.enum(Object.keys(PRODUCT_STATUS_LABEL), "Trạng thái không hợp lệ"),
    categoryId: z.number({ error: "Vui lòng chọn danh mục" }),
})
