import "server-only"
import { searchReviews } from "@/lib/reviews";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request:NextRequest) {

  const query = request.nextUrl.searchParams.get("query")
  
  const reviews = await searchReviews(query ? query : "")

  // console.log("api/search GET reviews: ", reviews)
  return NextResponse.json(reviews)
}
