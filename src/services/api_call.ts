const API_BASE_URL = "https://qurankuv2.vercel.app";
const API_BASE_URL_2 = "https://quranku-alpha.vercel.app";
const API_BASE_URL_PRAYER = "https://waktu-sholat.vercel.app";
export const APIgetAllSurah = async () => {
  const response = await fetch(`${API_BASE_URL}/surah`);
  return response.json();
};
export const APIgetAllSurahBySurah = async (id: any) => {
  const response = await fetch(`${API_BASE_URL}/surah/${id}`);
  return response.json();
};
export const APIgetJuz = async (id: any) => {
  const response = await fetch(`${API_BASE_URL}/juz/${id}`);
  return response.json();
};
export const APIgetAllSurahByAyat = async (surah: any, ayat: any) => {
  const response = await fetch(`${API_BASE_URL}/surah/${surah}/${ayat}`);
  return response.json();
};
export const APIgetAllAsmaulHusna = async () => {
  const response = await fetch(`${API_BASE_URL_2}/dzikir/asmaulHusna`);
  return response.json();
};
export const APIgetAllDoaDoa = async () => {
  const response = await fetch(`${API_BASE_URL_2}/doa`);
  return response.json();
};
export const APIgetAllDzikir = async () => {
  const response = await fetch(`${API_BASE_URL_2}/dzikir`);
  return response.json();
};
export const APIgetAllDzikirPagi = async () => {
  const response = await fetch(`${API_BASE_URL_2}/dzikir/dzikirpagi`);
  return response.json();
};
export const APIgetAllDzikirSore = async () => {
  const response = await fetch(`${API_BASE_URL_2}/dzikir/dzikirsore`);
  return response.json();
};
export const APIgetJadwalSholat = async () => {
  const response = await fetch(`${API_BASE_URL_PRAYER}/province`);
  return response.json();
};
export const APIgetProvince = async (provinceId: any) => {
  const response = await fetch(`${API_BASE_URL_PRAYER}/province/${provinceId}`);
  return response.json();
};
export const APIgetPrayer = async (latitude: any, longitude: any) => {
  const response = await fetch(
    `${API_BASE_URL_PRAYER}/prayer?latitude=${latitude}&longitude=${longitude}`
  );
  return response.json();
};
