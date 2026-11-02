import { logError } from "@/lib/logError";
import { useEffect } from "react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorPage(){
    const error = useRouteError();
    const is404 = !error || (isRouteErrorResponse(error) && error.status === 404);

    useEffect(() =>{
        if(!is404){
            logError(error);
        }
    }, [error,is404]);
    return (
        <div role="alert">
            <h1>{is404 ? "Không tìm thấy trang" : "Đã có lỗi xảy ra"}</h1>
            <p>{is404 ? "Đường dẫn truy cập không tồn tại" : "Vui lòng thử lại sau"}</p>
            <a href="/">về trang chủ</a>
        </div>
    )
}