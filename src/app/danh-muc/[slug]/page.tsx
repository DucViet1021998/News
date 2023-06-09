'use client';

import { useParams } from 'next/navigation';
import axiosClient from '~/utils/axios-client.utils';
import { useEffect, useState } from 'react';
import { DanhSachTinTuc } from '~/app/page';
import CardList from '~/components/CardList/CardList';
import { CircularProgress } from '@mui/material';

function DanhMucTinTuc() {
    const params = useParams();
    const [data, setData] = useState<DanhSachTinTuc[]>([]);
    const [skip, setSkip] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const GetDanhSachTinTuc = () => {
            try {
                if (skip >= 57) {
                    setIsLoading(false);
                    return;
                }
                setTimeout(async () => {
                    setIsLoading(true);
                    const res = await axiosClient.get(
                        `http://api-tintuc-dev.enetviet.com/TinTucHeThong/GetDanhSachTinTuc?skip=${skip}&limit=9&danh_muc_tin_tuc_id=${params.slug}`
                    );
                    if (res.data.total === 2 || res.data.total === 4) {
                        setData(res.data.data);
                        setIsLoading(false);
                    } else {
                        setData((prev) => [...prev, ...res.data.data]);
                        setIsLoading(false);
                    }
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
                setSkip((prev) => prev + 9);
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <CardList data={data} />
            {isLoading && (
                <div className="flex justify-center">
                    {' '}
                    <CircularProgress />
                </div>
            )}
        </>
    );
}

export default DanhMucTinTuc;
