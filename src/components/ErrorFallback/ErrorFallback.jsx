export default function ErrorFallback({ error, resetErrorBoundary }) {
  const isChunkError = /dynamically imported module|Loding chunk/i.test(
    error?.message ?? "",
  );
  return (
    <div role="alert" className="p-6 text-center">
      <h2>{isChunkError ? "Đã có phiên bản mới" : "Đã có lỗi xảy ra"}</h2>
      <p>
        {isChunkError
          ? "Vui lòng tải lại trang để cập nhật."
          : "ĐBạn thử lại hoặc quay về trang chủ"}
      </p>
      <button
        onClick={() =>
          isChunkError ? window.location.reload() : resetErrorBoundary()
        }
      >
        {isChunkError ? "Tải lại trang" : "Thử lại"}
      </button>
      <a href="/">Về trang chủ</a>
        {import.meta.env.DEV && <pre>{error.message}</pre>}
    </div>
  );
}
