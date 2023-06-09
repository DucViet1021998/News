'use client';

import axiosClient from '~/utils/axios-client.utils';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import CardList from '../components/CardList/CardList';
import { useRouter } from 'next/navigation';
import { CircularProgress } from '@mui/material';

export interface DanhSachTinTuc {
    id: string;
    anhDaiDien: string;
    ngayTao: string;
    tieuDe: string;
    tomTat: string;
    urlChiTiet: string;
}

const byDate = (a: any, b: any) => {
    return new Date(b.ngayTao).valueOf() - new Date(a.ngayTao).valueOf();
};

export default function Home() {
    const router = useRouter();
    const [data, setData] = useState<DanhSachTinTuc[]>([]);
    const [skip, setSkip] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const GetDanhSachTinTuc = () => {
            try {
                if (skip >= 36) {
                    setIsLoading(false);
                    return;
                }
                setTimeout(async () => {
                    setIsLoading(true);
                    const res = await axiosClient.get(
                        `TinTucHeThong/GetDanhSachTinTuc?cap_don_vi=4&loai_nguoi_dung=4&ma_so=shn&skip=${skip}&limit=30`
                    );
                    setData((prev) => [...prev, ...res.data.data]);
                    setIsLoading(false);
                }, 1500);
            } catch (error) {
                console.log(error);
            }
        };

        GetDanhSachTinTuc();
    }, [skip]);

    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
            if (scrollTop + clientHeight >= scrollHeight) {
                setIsLoading(true);
                setSkip((prev) => prev + 30);
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const sortDataByDate = data.sort(byDate);
    const breakingNews = sortDataByDate?.slice(0, 1);
    const breakingNewsMini = sortDataByDate?.slice(1, 4);
    const newsByDate = sortDataByDate?.slice(4);

    return (
        <main>
            <section style={{ height: '70vh' }} className=" w-full flex gap-2 justify-center ">
                {breakingNews.map((news) => (
                    <div
                        key={news.id}
                        onClick={() => {
                            router.push(`/chi-tiet-tin-tuc/${news.id}`);
                        }}
                        className="relative w-8/12 bg-gradient cursor-pointer"
                    >
                        <img
                            style={{
                                width: '100%',
                                height: '100%',
                            }}
                            src={news.anhDaiDien}
                            alt={news.tomTat}
                        />
                        <span className="absolute bottom-10 left-10 text-white z-40 text-5xl  text-transparent w-4/5">
                            {news.tieuDe}
                        </span>
                        <span className="absolute bottom-0 right-2 text-white z-40">
                            Ngày đăng: {dayjs(news.ngayTao).format('DD MM YYYY')}
                        </span>
                        <span className="absolute top-2 left-2 text-white bg-red-700 text-transparent rounded-md p-1">
                            Tin mới
                        </span>
                    </div>
                ))}

                <div className="w-3/12 flex gap-2 flex-col">
                    {breakingNewsMini.map((news) => (
                        <div
                            onClick={() => {
                                setIsLoading(true);
                                router.push(`/chi-tiet-tin-tuc/${news.id}`);
                            }}
                            key={news.id}
                            className="relative w-full h-1/3 bg-gradient overflow-hidden cursor-pointer "
                        >
                            <img
                                style={{
                                    height: '100%',
                                    width: '100%',
                                }}
                                src={news.anhDaiDien}
                                alt={news.tomTat}
                            />
                            <span className="absolute bottom-5 left-5 text-transparent text-white z-40">
                                {news.tieuDe}
                            </span>
                            <span className="absolute bottom-0 right-2 text-white z-40">
                                Ngày tạo: {dayjs(news.ngayTao).format('DD MM YYYY')}
                            </span>
                            <span className="absolute top-2 left-2 text-white bg-red-700 rounded-md p-1">
                                Tin mới
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            <CardList data={newsByDate} />
            {isLoading && (
                <div className="flex justify-center">
                    {' '}
                    <CircularProgress />
                </div>
            )}
        </main>
    );
}
