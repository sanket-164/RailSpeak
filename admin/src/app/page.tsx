"use client";

import { Button, Input } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { trpc } from "@/utils/trpc";

type FormSchema = {
  username: string;
  password: string;
};

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const loginClient = trpc.login.useMutation();
  const router = useRouter();
  function onSubmit(values: FormSchema) {
    loginClient.mutate(values, {
      onSuccess(data) {
        if (data) {
          toast.success("Login successful");
          router.push("/home");
        } else {
          toast.error("Invalid credentials");
        }
      },
      onError(error) {
        toast.error(error.message);
      },
    });
  }
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100 ">
      {/* card */}
      <div className="shadow-lg rounded-sm border-gray-700 flex flex-col w-[600px] pb-10 justify-center items-center">
        <Image src="/logo.png" alt="Logo" height={100} width={400} />
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Enter username"
            className="w-[500px]"
            variant="bordered"
            isInvalid={!!errors.username}
            {...register("username", { required: true })}
            disabled={loginClient.isPending}
            isDisabled={loginClient.isPending}
          />
          <Input
            label="Enter password"
            className="w-[500px]"
            variant="bordered"
            type="password"
            isInvalid={!!errors.password}
            {...register("password", { required: true })}
            disabled={loginClient.isPending}
            isDisabled={loginClient.isPending}
          />
          <Button
            variant="shadow"
            type="submit"
            disabled={loginClient.isPending}
            isDisabled={loginClient.isPending}
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
