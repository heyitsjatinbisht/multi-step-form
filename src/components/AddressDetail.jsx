import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  street: yup.string().required("Street is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  zip: yup.string().required("Zip code is required"),
});

const AddressDetail = ({ next, prev }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    next(data, "addressDetails");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        Address Details
      </h2>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Street
        </label>
        <input
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
          {...register("street")}
        />
        <p className="text-red-500 text-sm mt-1">{errors.street?.message}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">City</label>
        <input
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
          {...register("city")}
        />
        <p className="text-red-500 text-sm mt-1">{errors.city?.message}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">State</label>
        <input
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
          {...register("state")}
        />
        <p className="text-red-500 text-sm mt-1">{errors.state?.message}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Zip Code
        </label>
        <input
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
          {...register("zip")}
        />
        <p className="text-red-500 text-sm mt-1">{errors.zip?.message}</p>
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
          className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default AddressDetail;
