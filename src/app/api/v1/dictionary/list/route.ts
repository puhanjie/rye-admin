import { type NextRequest, NextResponse } from "next/server";
import { success } from "@/utils/unify";
import { dictionaryData } from "@/data/dictionary";

export function GET(request: NextRequest) {
  const pageList: API.Page<API.DictionaryInfo[]> = {
    records: dictionaryData,
    total: dictionaryData.length,
    size: 14,
    current: 1,
    pages: 10,
  };
  return NextResponse.json(
    success<API.Page<API.DictionaryInfo[]>>(request.nextUrl.pathname, pageList)
  );
}
