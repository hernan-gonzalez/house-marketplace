import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    collection,
    getDocs,
    query,
    orderBy,
    limit,
    connectFirestoreEmulator,
} from "firebase/firestore";
import { db } from "../firebase.config";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import Spinner from "./Spinner";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export default function Slider() {
    const [loading, setLoading] = useState(true);
    const [listings, setListings] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchListings = async () => {
            const listingsRef = collection(db, "listings");
            const q = query(
                listingsRef,
                orderBy("timestamp", "desc"),
                limit(5)
            );
            const querySnapshot = await getDocs(q);

            let listingsData = [];

            querySnapshot.forEach((doc) => {
                return listingsData.push({
                    id: doc.id,
                    data: doc.data(),
                });
            });
            setListings(listingsData);
            setLoading(false);
        };
        fetchListings();
    }, []);

    if (loading) {
        return <Spinner />;
    }

    if (listings.length === 0) {
        return <></>;
    }

    return (
        listings && (
            <>
                <p className="exploreHeading">Recommended </p>

                <Swiper
                    className="swiper-container"
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                >
                    {listings.map(({ data, id }) => (
                        <SwiperSlide
                            key={id}
                            onClick={() =>
                                navigate(`/category/${data.type}/${id}`)
                            }
                        >
                            <div
                                style={{
                                    background: `url(${data.imageUrls[0]}) center no-repeat`,
                                    backgroundSize: "cover",
                                }}
                                className="swiperSlideDiv"
                            >
                                <p className="swiperSlideText">{data.name}</p>
                                <p className="swiperSlidePrice">
                                    ${data.discountedPrice ?? data.regularPrice}{" "}
                                    {data.type === "rent" && "/ month"}
                                </p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </>
        )
    );
}
