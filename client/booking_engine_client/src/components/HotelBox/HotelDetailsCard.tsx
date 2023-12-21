import React from "react";
import { CalenderIcon } from "../ui/CalenderIcon";
import { GuestIcon } from "../ui/GuestIcon";
import { Star } from "../ui/Star";
import Image from "next/image";
import Img from "@/components/assets/doublebedroom.jpg";
import { useDispatch, useSelector } from "@/Redux/store";

const HotelDetailsCard = (data: {
  data: {
    roomData: {
      data: {
        price: any;
        name:
          | string
          | number
          | boolean
          | React.ReactElement<any, string | React.JSXElementConstructor<any>>
          | Iterable<React.ReactNode>
          | React.ReactPortal
          | React.PromiseLikeOfReactNode
          | null
          | undefined;
        description:
          | string
          | number
          | boolean
          | React.ReactElement<any, string | React.JSXElementConstructor<any>>
          | Iterable<React.ReactNode>
          | React.ReactPortal
          | React.PromiseLikeOfReactNode
          | null
          | undefined;
      };
    };
  };
}) => {
  const imageUrl =
    "https://www.google.com/uhttps://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpn6wvs8jjO-kh6Bpu53TdGrl5cKHmdERfPw&usqp=CAUrl?sa=i&url=https%3A%2F%2Fwww.businessinsider.in%2Fheres-why-hotel-room-rates-in-india-may-double-in-the-next-3-to-4-years%2Farticleshow%2F68664363.cms&psig=AOvVaw3vS1qmib69i8JDrURQt4ky&ust=1702532564318000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOipkKLai4MDFQAAAAAdAAAAABAE";
  const rating = 4.5;
  const roomName = "Deluxe Double Room";
  const description =
    "Spacious and comfortable room with a king-size bed and balcony.";
  const type = "Dulex";
  const bookingDateFrom = "2023-12-15";
  const bookingDateTo = "2023-12-20";
  const price = data?.data?.roomData?.data?.price;
  const discount = 0.1;
  const buttonText = "Book Now";

  const discountAmount = Math.round(price * discount);
  const totalPrice = price; // Replace with your actual total price
  const instantDiscount = 50; // Replace with your actual instant discount
  const couponDiscount = 100; // Replace with your actual coupon discount
  const payableAmount = totalPrice - instantDiscount - couponDiscount;

  console.log("inside the hotel card", data);

  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.authReducer.user);

  const formUser = useSelector((state) => state.userFormReducer.formData)

  console.log(authUser, "user data in hotel details card");
  console.log(formUser, "user data in hotel details card");


  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(<Star key={i} filled={rating > i ? true : false} />);
  }

  return (
    <div className="bg-white shadow-md rounded overflow-hidden max-w-2xl mx-auto border">
      <div className="flex flex-col">
        <div className="flex justify-between m-4">
          <div className="">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {data?.data?.roomData?.data?.name}
            </h2>

            <p className="text-gray-600  mb-4">
              {data?.data?.roomData?.data?.description}
            </p>
            <div className="flex items-center ">
              <span className="text-sm text-gray-600  mr-2">{rating}</span>
              {stars}
              <span className="text-xs text-gray-600 ml-2">(251 ratings)</span>
            </div>
          </div>

          <div className="border-solid border-1 border-gray-300 p-0.5">
            <Image src={Img} width={300} height={100} alt="hotel image" />
          </div>
        </div>

        <div className="px-6 py-4">
          <div className="flex items-center mb-6">
            <span className="text-gray-700 font-bold flex items-center">
              <span className="mr-1">
                <GuestIcon />
              </span>
              {type}
            </span>
          </div>
          <div className="flex items-center mb-6">
            <span className="text-gray-700 font-bold flex items-center">
              <span className="mr-1">
                <CalenderIcon />
              </span>
              {bookingDateFrom} - {bookingDateTo}
            </span>
          </div>
          <hr className="my-3 border-gray-200 mb-4" />

          <div className="flex items-center justify-between mb-6">
            <span className="text-gray-600 mr-2">
              Room Price for 1 Night X 1 Guest:
            </span>
            <span className="text-lg  text-gray-800">{totalPrice}</span>
          </div>
          <div className="flex items-center justify-between mb-6">
            <span className="text-gray-600 mr-2">Instant discount:</span>
            <span className="text-sm  text-gray-500">-{instantDiscount}</span>
          </div>
          <div className="flex items-center justify-between mb-6">
            <span className="text-gray-600 mr-2"> Coupon Discount:</span>
            <span className="text-sm  text-gray-500">-{couponDiscount}</span>
          </div>
          <div className="flex items-center justify-between ">
            <span className="text-gray-600 mr-2">Payable Amount:</span>
            <span className="text-lg font-bold text-gray-800">
              {payableAmount}
            </span>
          </div>
          <div className="flex justify-end mt-8 mb-4">
            <button className="bg-red-500 text-white px-4 py-2 rounded shadow-md hover:bg-red-700">
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetailsCard;
