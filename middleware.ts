import { NextResponse } from "next/server";
import { getUserMeLoader } from "./data/services/get-user-me-loader";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  return NextResponse.next();
}