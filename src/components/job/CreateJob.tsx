import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useToken from "../../hooks/useToken";
import { postWithToken } from "../../utils/axios";
import Header from '../header';
import styles from '../../css/createJob.module.css';

const CreateArticle = () => {
   const [title, setTitle] = useState('');
   const [content, setContent] = useState('');

   const { token } = useToken()

   const navigate = useNavigate();

   useEffect(() => {
      if (!token) {
         navigate("/signin")
         alert("먼저 로그인을 해주세요")
      }
   }, [token, navigate])

   const createArticle = async (e: any) => {
      e.preventDefault();

      const data = { title, content };

      try {
         if(!title || ! content){
            return alert("모든 항목을 작성해주세요")
         }

         await postWithToken(token, '/jobs', data);

         alert("게시물이 성공적으로 등록되었습니다");
         navigate('/job');
      } catch (error: any) {
         alert(error.response.data);
      }
   };

   return (
      <div>
         <Header />
         <div className={styles.main}>
            <div className={styles.box_container}>
               <h1>구인공고 등록</h1>
               <div className={styles.box}>
                  <form onSubmit={createArticle}>
                     <p>제목</p>
                     <div className={styles.title}>
                        <input
                           type="text"
                           value={title}
                           onChange={(e) => setTitle(e.target.value)}
                           placeholder="제목"
                        />
                     </div>
                     <p>상세 정보</p>
                     <div className={styles.detail}>
                        <textarea
                           value={content}
                           onChange={(e) => setContent(e.target.value)}
                           placeholder="내용"
                        />
                     </div>
                     <div className={styles.create_button}>
                        <button type="submit">등록하기</button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
   );
};

export default CreateArticle;
