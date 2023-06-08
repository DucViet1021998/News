'use client';

import { DanhSachTinTuc } from '~/app/page';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

export default function NewsCard({
    anhDaiDien,
    tomTat,
    tieuDe,
    ngayTao,
    id,
}: Partial<DanhSachTinTuc>) {
    const router = useRouter();

    return (
        <div
            onClick={() => router.push(`/chi-tiet-tin-tuc/${id}`)}
            className="relative w-4/12 h-80 bg-gradient cursor-pointer overflow-hidden p-2 mb-4"
        >
            <img
                style={{
                    width: '100%',
                    height: '100%',
                }}
                src={anhDaiDien}
                alt={tomTat}
            />
            <span className="absolute top-3/4 left-5 text-transparent text-white text-lg z-40">
                {tieuDe}
            </span>
            <span className="absolute bottom-0 right-2 text-white z-40">
                Ngày tạo: {dayjs(ngayTao).format('DD MM YYYY')}
            </span>
        </div>
    );
}
