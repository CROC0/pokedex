"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

function BackButton() {
  const router = useRouter();
  return <Button onClick={() => router.push("/")}>Back</Button>;
}

export default BackButton;
