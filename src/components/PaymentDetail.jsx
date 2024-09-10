import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  cardNumber: yup
    .string()
    .matches(/^\d{16}$/, "Card number must be exactly 16 digits")
    .required("Card number is required"),
  expirationDate: yup
    .string()
    .matches(
      /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
      "Invalid expiration date format (MM/YY)"
    )
    .required("Expiration date is required"),
  cvv: yup
    .string()
    .matches(/^\d{3}$/, "CVV must be exactly 3 digits")
    .required("CVV is required"),
});

const PaymentDetail = ({ next, prev }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    next(data, "paymentDetails");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        Payment Details
      </h2>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Card Number
        </label>
        <input
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
          {...register("cardNumber")}
        />
        <p className="text-red-500 text-sm mt-1">
          {errors.cardNumber?.message}
        </p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Expiration Date (MM/YY)
        </label>
        <input
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
          {...register("expirationDate")}
        />
        <p className="text-red-500 text-sm mt-1">
          {errors.expirationDate?.message}
        </p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">CVV</label>
        <input
          type="password"
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
          {...register("cvv")}
        />
        <p className="text-red-500 text-sm mt-1">{errors.cvv?.message}</p>
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={prev}
          className="py-2 px-4 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-all duration-300"
        >
          Back
        </button>
        <button
          type="submit"
          className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default PaymentDetail;
