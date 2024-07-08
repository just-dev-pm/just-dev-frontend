import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Extract the path parameter from the URL
  const path = request.nextUrl.pathname;
  console.log(path);
  const match = path.split("/")[2]; // "" / "projects" / ":project_id"

  if (match) {
    const pathValue = match;
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/projects/:project_id*",
};
