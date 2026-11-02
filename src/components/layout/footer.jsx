export function Footer(){
    return (
        <div className="bg-black">
                    <div className="mx-auto container">
            <div className="flex px-5 justify-between pt-24 align justify-items-center mb-10 ">
                <img src="/logo.webp" alt="" className="hidden lg:block size-56 rounded-full" />
                <div className="flex justify-between gap-5">
                    <div>
                        <p className="mb-4">Khám phá</p>
                        <ul className="uppercase">
                            <li><a href="#"><span>Thực đơn</span></a></li>
                            <li><a href="#"><span>Địa điểm</span></a></li>
                            <li><a href="#"><span>Thẻ quà tặng</span></a></li>
                            <li><a href="#"><span>Khám phá</span></a></li>
                            <li><a href="#"><span>Tiệc riêng/ ăn uống riêng tư</span></a></li>
                        </ul>
                    </div>
                                        <div>
                        <p  className="mb-4">About</p>
                        <ul className="uppercase">
                            <li><a href="#"><span>Tuyển dụng</span></a></li>
                            <li><a href="#"><span>câu hỏi thường gặp</span></a></li>
                            <li><a href="#"><span>báo chí</span></a></li>
                            <li><a href="#"><span>liên hệ</span></a></li>
                        </ul>
                    </div>
                                        <div>
                        <p  className="mb-4">Legal</p>
                        <ul className="uppercase">
                            <li><a href="#"><span>điều khoản sử dụng</span></a></li>
                            <li><a href="#"><span>chính sách bảo mật</span></a></li>

                        </ul>
                    </div>
                </div>
            </div>
            <div>
                <hr className="border " />
                <div className="flex lg:grid-cols-[1.1fr_3fr] gap-5 justify-between  py-5 ">
                    <select name="" id="" className="aria-label">
                        <option value="">EN-US</option>
                        <option value="">VN</option>
                    </select>

                    <div>
                        <a href="" className="pe-2">Instagram</a>
                        <a href="">Facebook</a>
                    </div>
                    <div>©2026 Truong Tho Da Nang Viet Nam. All rights reserved</div>
                </div>
            </div>
        </div>
        </div>

    )
}