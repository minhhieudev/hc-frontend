import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Config } from "@/core/constants/configs";
import { useSelector } from "react-redux";
import { AuthSelectors } from "@/modules/auth/slice";
interface Meal {
  _id: string;
  name: string;
  mainImage: string;
  description: string;
  price: string;
  subscriptionID?: any;
  type?: boolean;
  images: any
}

const MealCard: React.FC<Meal> = ({ _id, name, images, mainImage, description, price, subscriptionID, type }) => {
  const truncatedDescription = description.split(" ").slice(0, 20).join(" ") + (description.split(" ").length > 20 ? "..." : "");
  const client = useSelector(AuthSelectors.client);
  const formatCurrency = (amount: number | undefined): string => {
    if (amount === undefined) {
      return '0';
    }
    return amount.toLocaleString('vi-VN');
  };

  return (
    <div className="flex flex-col h-fit shadow-xl">
      <Link href={`/orderFood/${_id}`} className="flex-grow">
        <div className={`bg-white shadow-xl rounded-t-lg px-4 pb-2 pt-4 flex flex-col ${!type ? 'rounded-b-lg' : ''}`}>
          <div className="w-full h-32 bg-gray-300 rounded-lg mb-4">
            {mainImage && <Image src={Config.CDN_URL + mainImage} alt="banner" className="w-full h-full object-cover" width={300} height={150} />}
          </div>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-orange-500 font-bold">{formatCurrency(Number(price))}đ</p>
          </div>
          {type &&
            <p className="text-green-600 mb-2">{subscriptionID?.totalSub} KH đang tham gia</p>
          }
          <p className="text-sm text-gray-500 mb-4" dangerouslySetInnerHTML={{ __html: truncatedDescription }}></p>
        </div>
      </Link>
      {type && (
        <div className="text-white h-7 bg-red-800 rounded-b-lg text-md flex flex-col justify-center items-center ">
          {`${subscriptionID.mealsPerDay} phần / ${subscriptionID.totalDate} ngày`}
        </div>
      )}
    </div>
  );
};

export default MealCard;
