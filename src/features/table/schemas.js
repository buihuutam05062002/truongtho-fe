import {z} from "zod"
import {TABLE_STATUS_LABEL} from "./constants.js"
export const diningTableSchema = z.object({
    name: z.string().trim().min(1, " vui lòng nhập tên"),
    capacity: z.number({error: " vui lòng nhập sức chứa"}).int().min(1, "sức chứa không được nhỏ hơn 1 ").max(50, "sức chứa không được lớn hơn 50"),
    tableStatus : z.enum(Object.keys(TABLE_STATUS_LABEL), "không được khác giá trị enum"),
    position: z.number().int().optional()
})