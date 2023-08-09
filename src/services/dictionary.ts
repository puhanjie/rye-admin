import request from '@/utils/http';

export async function addDictionary(data: API.DictionaryParams) {
  const res = await request<boolean>({
    url: '/api/v1/dictionary',
    method: 'post',
    data
  });
  return res;
}

export async function removeDictionary(ids: number[]) {
  const res = await request<boolean>({
    url: `/api/v1/dictionary`,
    method: 'delete',
    data: ids
  });
  return res;
}

export async function editDictionary(data: API.DictionaryParams) {
  const res = await request<boolean>({
    url: '/api/v1/dictionary',
    method: 'put',
    data
  });
  return res;
}

export async function getDictionaryList(params?: API.DictionaryPageQuery) {
  const res = await request<API.PageInfo<API.DictionaryInfo[]>>({
    url: '/api/v1/dictionary/list',
    method: 'get',
    params
  });
  return res;
}

export async function getDictionarys(params: { dictName: string }) {
  const res = await request<API.DictionaryInfo[]>({
    url: '/api/v1/dictionary',
    method: 'get',
    params
  });
  return res;
}
