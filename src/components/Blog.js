import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInput, setBlogData } from "../features/userSlice";
import "../styling/blogs.css";



const Blogs = () => {
    const searchInput = useSelector(selectUserInput);
    const blog_url = `https://gnews.io/api/v4/search?q=${searchInput}&token=82343c6a477eaf08923fa339413b1dd1`
    const dispatch = useDispatch();
    const [blogs, setBlogs] = useState();
    
   
    const [loading, setLoading] = useState(true)



    useEffect(() => {
       axios
         .get(blog_url)
         .then((response) =>{
             dispatch(setBlogData(response.data));
             setBlogs(response.data);
             setLoading(false);
         })
          .catch((error) => {
              console.log(error);
          });
    }, [searchInput]);

     
    return (
        <div className="blog_page">
            <h1 className="blog_page_header">Articles</h1>
            {loading ? <h1 className="loading">Loading...</h1> : " " }
           <div className="blogs">
               {blogs?.articles?.map((blog)=> (
                   <a className="blog" target="_blank" href={blog.url}>
                       <img src={blog.image} />
                       <div>
                           <h3 className="sourceName">
                               <span>{blog.source.name}</span>
                               <p>{blog.publishedAt}</p>
                           </h3>
                           <h1>{blog.title}</h1>
                           <p>{blog.description}</p>
                           </div>
                   </a>
               ))}

      {blogs?.titleArticles == 0 && (
          <h1 className="no_blogs">nothing found, Search something else</h1>
      ) }

           </div>
        </div>
    );
};


export default Blogs;