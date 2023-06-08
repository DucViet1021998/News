'use client';

import NewsCard from '../NewsCard/NewsCard';
const CardList = ({ data }) => {
    return (
        <div className="flex flex-wrap w-full h-max mt-10 justify-center pl-12 pr-12">
            {data?.map((news) => {
                return (
                    <NewsCard
                        id={news.id}
                        key={news.id}
                        anhDaiDien={news.anhDaiDien}
                        tomtat={news.tomtat}
                        tieuDe={news.tieuDe}
                        ngayTao={news.ngayTao}
                    />
                );
            })}
        </div>
    );
};

export default CardList;
