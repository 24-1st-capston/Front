import { useEffect, useState } from "react";
import { fetcherWithToken } from "../../utils/axios";
import dayjs from "dayjs";
import useToken from "../../hooks/useToken";
import { rent } from "../../interface/rent";
import styles from "../../css/equipment.module.css";
import Header from "../header";
import { Link } from "react-router-dom";

const EquipmentMe = () => {
    const [articles, setArticles] = useState<rent[]>([]);

    const { token } = useToken();

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetcherWithToken(token, `/articles/rented`);
                setArticles(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchArticles();
    }, [token]);

    if (articles.length === 0) {
        return <div>
            <Header />
            <div className={styles.main}>
                <h3>빌린 장비가 없습니다</h3>
            </div>
        </div>
            ;
    }

    return (
        <div>
            <Header />
            <div className={styles.main}>
                <div className={`${styles.grid_container} ${styles.center}`}>
                    {articles.map((rent) => (
                        <Link to={`/equipment/${rent.id}`} key={rent.id}>
                            <div className={styles.grid_item}>
                                {rent.imgUrl && (
                                    <img src={rent.imgUrl} alt="Article Image" className={styles.image} />
                                )}
                                <p>모델명: {rent.title}</p>
                                <p>대여일: {dayjs(rent.rentAt).format("YYYY년 MM월 DD일")}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EquipmentMe;
