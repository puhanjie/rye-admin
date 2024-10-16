import { type NextRequest, NextResponse } from "next/server";
import { success } from "@/utils/unify";
import { dictionaryData } from "@/data/dictionary";

export function GET(request: NextRequest) {
  const url = new URL(request.url);
  const dictType = url.searchParams.get("dictType");
  const data = dictionaryData.filter((item) => item.dictType === dictType);
  return NextResponse.json(
    success<API.DictionaryInfo[]>(request.nextUrl.pathname, data)
  );
}
