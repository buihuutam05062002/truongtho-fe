import {  Broccoli,Flame ,HeartPlus} from 'lucide-react';
import { FeatureItem } from './FeatureItem';
{/* <Flame color="#bca27a" /> */}
{/* <HeartPlus color="#bca27a" /> */}
const features = [
  { icon: Broccoli, title: "Nguyên liệu chọn lọc", description: "Tươi ngon theo mùa, trọn vẹn tự nhiên." },
  { icon: Flame, title: "Tâm huyết trong từng món", description: "Kỹ nghệ Á Đông, chăm chút từng chi tiết." },
  { icon: HeartPlus, title: "Nồng hậu mỗi lần ghé", description: "Một chỗ ngồi ấm áp, một bữa ăn an yên." },
];

export function Features(){
    return(
        <section className='features flex justify-around bg-mist-950 border py-10'>
            {features.map((item) =>
                        (<FeatureItem key={item.title} icon={item.icon} title={item.title} description={item.description}></FeatureItem>)

            )}
        </section>
    )
}