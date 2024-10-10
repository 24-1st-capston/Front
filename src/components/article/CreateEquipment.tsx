import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import useToken from "../../hooks/useToken";
import { postWithToken } from "../../utils/axios";
import Header from "../header";
import picture from "../../assets/picture.png";
import styles from "../../css/createEq.module.css";

const CreateEquipment = () => {
   const [title, setTitle] = useState("");
   const [content, setContent] = useState("");
   const [image, setImage] = useState<File | null>(null);

   const { token } = useToken();
   const navigate = useNavigate();

   useEffect(() => {
      if (!token) {
         navigate("/signin");
         alert("먼저 로그인을 해주세요");
      }
   }, [token, navigate]);

   const [imageSrc, setImageSrc] = useState<any>(picture);

   const onUpload = (e: any) => {
      const file = e.target.files?.[0];
      if (file) {
         setImage(file);
         const reader = new FileReader();
         reader.readAsDataURL(file);

         reader.onload = () => {
            setImageSrc(reader.result);
         };
      }
   };

   const handleImageClick = () => {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = '.png, .jpeg, .jpg';
      fileInput.name = 'image';
      fileInput.style.display = 'none';
      fileInput.onchange = onUpload;
      document.body.appendChild(fileInput);
      fileInput.click();
      document.body.removeChild(fileInput);
   };

   const createArticle = async (e: any) => {
      e.preventDefault();

      if (!image) {
         alert("이미지를 선택해주세요");
         return;
      }

      const formData = new FormData();
      formData.append('dto', new Blob([JSON.stringify({ title, content })], { type: 'application/json' }));
      if (image) {
         formData.append('image', image);
      }

      try {
         await postWithToken(token, '/articles', formData);
         alert("게시물을 등록했습니다");
         navigate('/equipment');
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <div>
         <Header />
         <div className={styles.main}>
            <div className={styles.box}>
               <form onSubmit={createArticle}>
                  <div className={styles.main_img}>
                     <p>상품 사진 등록</p>
                     <img
                        src={imageSrc}
                        onClick={handleImageClick}
                        style={{ cursor: 'pointer' }}
                     />
                  </div>
                  <p>모델명</p>
                  <div className={styles.title}>
                     <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="모델명"
                     />
                  </div>
                  <p>상세 정보</p>
                  <div className={styles.detail}>
                     <textarea
                        value={content}
                        cols={30}
                        rows={10}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="상세 정보"
                     />
                  </div>
                  <div className={styles.button}>
                     <button type="submit">등록하기</button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
};

export default CreateEquipment;
