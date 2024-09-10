import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
});

const PersonalDetail = ({ next }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    next(data, "personalDetails");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        Personal Details
      </h2>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          First Name
        </label>
        <input
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
          {...register("firstName")}
        />
        <p className="text-red-500 text-sm mt-1">{errors.firstName?.message}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Last Name
        </label>
        <input
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
          {...register("lastName")}
        />
        <p className="text-red-500 text-sm mt-1">{errors.lastName?.message}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
          {...register("email")}
        />
        <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
      </div>
      <button
        type="submit"
        className="w-full py-2 mt-4 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition-all duration-300"
      >
        Next
      </button>
    </form>
  );
};

export default PersonalDetail;
