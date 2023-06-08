'use client';

import { CircularProgress, Container, Typography } from '@mui/material';
import { useParams } from 'next/navigation';
import useSWR from 'swr';
import dayjs from 'dayjs';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function DetailNews() {
    const params = useParams();

    const { data, error } = useSWR(
        `https://api-tintuc-dev.enetviet.com/TinTucHeThong/GetChiTietTinTuc?id=${params.slug}`
    );

    const news = data?.data.data;
    console.log(news);

    if (error) return <div>Đã xảy ra lỗi</div>;
    if (!data)
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <CircularProgress />
            </div>
        );

    return (
        <Container className=" flex flex-col">
            <Typography variant="h5" align="left">
                {news.tieuDe}
            </Typography>
            <span
                style={{
                    width: 'fit-content',
                    color: '#757575',
                    padding: '4px 12px 4px 6px',
                    backgroundColor: '#f0f0f0',
                }}
                className="flex items-center rounded-tr-2xl rounded-br-2xl mt-2"
            >
                <AccessTimeIcon fontSize="small" />
                <span className="pl-2">{dayjs(news.ngayTao).format('HH:mm DD/MM/YYYY')}</span>
            </span>

            <div className="mt-10" dangerouslySetInnerHTML={{ __html: news.noiDung }}></div>
        </Container>
    );
}
export default DetailNews;
