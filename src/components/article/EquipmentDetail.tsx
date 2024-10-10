import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { customAxios, postWithToken, deleteWithToken } from "../../utils/axios";
import dayjs from "dayjs";
import useToken from "../../hooks/useToken";
import { Article } from "../../interface/article";
import styles from "../../css/EqDetail.module.css";
import Header from "../header";
import profile from "../../assets/profile.png";

const ArticleDetail = () => {
   const { id } = useParams<{ id: string }>();
   const [article, setArticle] = useState<Article | null>(null);

   const navigate = useNavigate();
   const { token } = useToken();

   useEffect(() => {
      const fetchArticle = async () => {
         try {
            const response = await customAxios.get<Article>(`/articles/${id}`);
            setArticle(response.data);
         } catch (error) {
            console.error(error);
         }
      };
      fetchArticle();
   }, [id]);

   const handleChat = async (userName: string) => {
      try {
         const response = await postWithToken(token, `/chat/create/article/${id}`, {});

         if(!token) {
            alert('로그인을 먼저 해주세요')
            navigate("/signin")
         }

         const roomId = response.data.roomId;
         navigate(`/chat/${roomId}`, { state: { userName: userName } });
      } catch (error: any) {
         if (error.response && error.response.data) {
            alert(error.response.data)
         }
      }
   };

   const deleteArticle = async () => {
      try {
         const confirmDelete = window.confirm("게시물을 삭제 하시겠습니까?");
         if (confirmDelete) {
            await deleteWithToken(token, `/articles/${id}`);
            alert('삭제가 완료되었습니다');
            navigate("/equipment");
         }
      } catch (error: any) {
         if (error.response && error.response.data) {
            alert(error.response.data)
         }
      }
   }

   if (!article) {
      return <div>Loading...</div>;
   }

   return (
      <div>
         <Header />
         <div className={styles.main}>
            <div className={styles.main_container}>
               <div className={styles.image_slider}>
                  {article.imgUrl && (
                     <img
                        src={article.imgUrl}
                        alt="Article Image"
                        className={styles.main_img}
                     />
                  )}
               </div>
               <div className={styles.details}>
                  <div className={styles.user_info}>
                     <div className={styles.user_icon}>
                        <img src={profile} />
                     </div>
                     <p>{article.user.name}</p>
                  </div>
                  <p id={styles.title}>{article.title}</p>
                  <p id={styles.date}>{dayjs(article.createdAt).format("YYYY년 MM월 DD일")}</p>
                  <p id={styles.content}>{article.content}</p>
                  <div className={styles.buttons}>
                     <button onClick={() => handleChat(article.user.name)} className={styles.chat_btn}>채팅하기</button>
                     <button onClick={deleteArticle} className={styles.chat_btn}>삭제하기</button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ArticleDetail;
