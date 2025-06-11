import Image from "next/image";

interface Props {
  title: string;
  iconSrc: string;
  value: string;
  borderColor: string;
}

const PriceInfoCard = ({title, iconSrc, value, borderColor}: Props) => {
  return (
    <div className="flex-1 min-w-[200px] flex flex-col gap-2 rounded-[10px] bg-gray-200 px-5 py-4">
        <p className="text-base text-black-100">
            {title}
        </p>
        <div className="flex gap-1">
            <Image src={iconSrc} alt={title} width={24} height={24} />
            <p className="text-2xl font-bold text-secondary">{value}</p>
        </div>
    </div>
  )
}

export default PriceInfoCard