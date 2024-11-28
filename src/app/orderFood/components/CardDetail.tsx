'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Config } from "@/core/constants/configs";
import { useSelector } from "react-redux";
import { AuthSelectors } from "@/modules/auth/slice";

interface Meal {
  id?: string;
  name: string;
  description: string;
  price: string;
  type?: boolean;
  image?: string;
  totalSub?: number;
  serviceTags?: [];
  subscriptionID?: {
    mealsPerDay: number,
    totalDate: number
  }
}

const CardDetail: React.FC<Meal> = ({ id, name, description, price, type, image, totalSub, serviceTags, subscriptionID }) => {
  const client = useSelector(AuthSelectors.client);
  const formatCurrency = (amount: number | undefined): string => {
    if (amount === undefined) {
      return '0';
    }
    return amount.toLocaleString('vi-VN');
  };

  return (
    <div className="flex flex-col h-full shadow-xl">
      <Link href={`/orderFood/${id}`} className=" flex-grow">
        <div className='bg-white  px-4 pb-2 pt-4 flex flex-col '>
          <div className="w-full h-32 bg-gray-300 rounded-lg mb-4">
            {image && <Image src={Config.CDN_URL + image} width={300} height={200} alt="banner" className="w-full h-full object-cover" />}
          </div>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-orange-500 text-xl font-bold">{formatCurrency(Number(price))}đ</p>
          </div>
          <p className="text-green-600 mb-2">{totalSub} người đã đặt</p>
          <p className="text-sm text-gray-500 mb-4" dangerouslySetInnerHTML={{ __html: description }}></p>

        </div>
        <div className="bg-white flex ">
          <div className='ml-4 pb-2 space-x-2' >
            {serviceTags?.map((value, index) => (
              <span key={index} className=" border rounded-md px-3 py-1 text-sm">{value}</span>
            ))}
          </div>
        </div>
        {subscriptionID &&
          <div className="text-white h-7 bg-red-800 rounded-b-lg text-md flex flex-col justify-center items-center ">
            {`${subscriptionID?.mealsPerDay} phần / ${subscriptionID?.totalDate} ngày`}
          </div>
        }
      </Link>
    </div>
  );
};

export default CardDetail;
