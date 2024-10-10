import { useState, useEffect } from 'react';
import { customAxios } from '../../utils/axios';
import dayjs from 'dayjs';
import { Job } from '../../interface/job';
import { Link } from 'react-router-dom';
import styles from "../../css/job.module.css";
import Header from '../header';

const JobPosts: React.FC = () => {
   const [jobs, setJobs] = useState<Job[]>([]);
   const [searchTerm, setSearchTerm] = useState("");

   useEffect(() => {
      const fetchJobPosts = async () => {
         try {
            const response = await customAxios.get<Job[]>('/jobs');
            setJobs(response.data);
         } catch (error) {
            alert("게시물을 가져올 수 없습니다")
         }
      };
      fetchJobPosts();
   }, []);

   const filteredJobs = jobs.filter((jobs) =>
      jobs.title.toLowerCase().includes(searchTerm.toLowerCase())
   );

   return (
      <div>
         <Header />
         <div className={styles.main}>
            <div className={styles.search_container}>
               <input
                  type="text"
                  className={styles.search_input}
                  placeholder="검색어를 입력해 주세요."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>

            <div className={styles.write}>
               <Link to="/createJob">
                  <button className={styles.write_button}>글 작성하기</button>
               </Link>
            </div>
            
            <div className={styles.box_container}>
               {filteredJobs.map(job => (
                  <Link to={`/job/${job.id}`}>
                     <div className={styles.box_item}>
                        <p className={styles.title}>{job.title}</p>
                        <p>{job.content}</p>
                        <p>등록일: {dayjs(job.createdAt).format("YYYY년 MM월 DD일")}</p>
                     </div>
                  </Link>
               ))}
            </div>
         </div>
      </div>

   );
};

export default JobPosts;
