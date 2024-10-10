import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { customAxios, postWithToken, deleteWithToken } from "../../utils/axios";
import dayjs from "dayjs";
import useToken from "../../hooks/useToken";
import { Job } from "../../interface/job";
import styles from "../../css/jobDetail.module.css"
import profile from "../../assets/profile.png"
import Header from "../header";

const JobDetail = () => {
   const { id } = useParams<{ id: string }>();
   const [job, setJob] = useState<Job | null>(null);

   const navigate = useNavigate();
   const { token } = useToken();

   useEffect(() => {
      const fetchAJob = async () => {
         try {
            const response = await customAxios.get<Job>(`/jobs/${id}`);
            setJob(response.data);
         } catch (error: any) {
            alert(error)
         }
      };
      fetchAJob();
   }, [id]);


   const handleChat = async (userName: string) => {
      try {
         const response = await postWithToken(token, `/chat/create/job/${id}`, {});

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

   const deleteJob = async () => {
      try {
         const confirmDelete = window.confirm("모집완료됌에 따라 게시물이 삭제됩니다. 정말로 삭제하시겠습니까?");
         if (confirmDelete) {
            await deleteWithToken(token, `/jobs/${id}`);

            alert("삭제되었습니다");
            navigate("/job");
         }
      } catch (error: any) {
         alert("자신의 글만 삭제할 수 있습니다")
      }
   }

   if (!job) {
      return <div>Loading...</div>;
   }

   return (
      <div>
         <Header />
         <div className={styles.main}>
            <div className={styles.main_container}>
               <div className={styles.profile}>
                  <img id="profile_img" src={profile} alt="profile" />
                  <p id="profile_name">{job.user.name}</p>
               </div>
               <h2 id="title">{job.title}</h2>
               <p id="content">{job.content}</p>
               <p id="date">등록일: {dayjs(job.createdAt).format("YYYY년 MM월 DD일")}</p>
               <div className={styles.button}>
               <button onClick={() => handleChat(job.user.name)} className={styles.btn}>채팅하기</button>
                  <button className={styles.btn} onClick={deleteJob}>모집완료</button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default JobDetail;
