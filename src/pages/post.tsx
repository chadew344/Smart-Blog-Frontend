// import { useEffect, useState } from "react";
// import { getAllPosts } from "../services/posts";

// export default function Post() {
//   const [page, setpage] = useState(1);
//   const [posts, setPosts] = useState([]);
//   const [totalPages, setTotalPages] = useState(1);

//   const fetchPosts = async () => {
//     try {
//       const data = await getAllPosts(page, 10);
//       setPosts(data.data || []);
//       setTotalPages(data.totalPages || 1);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Initially run with post page -> run
//   // After page use state changes -> run
//   useEffect(() => {
//     fetchPosts();
//   }, [page]);

//   return (
//     <div>
//       <div>
//         <h1 className="text-3xl font-semibold text-gray-800">All Post</h1>
//         <div>
//           {posts?.map((post: any) => (
//             <div>
//               <h3>{post?.title}</h3>
//               <p>{post?.content}</p>
//               {post?.tags?.map((tag: any) => {
//                 <span>{tag}</span>;
//               })}
//               {post?.imageURL && (
//                 <img src={post.imageURL} alt={post?.title}></img>
//               )}
//             </div>
//           ))}
//         </div>
//         <div>
//           <button
//             disabled={page === 1}
//             onClick={() => {
//               if (page > 1) setpage(page - 1);
//             }}
//           >
//             Prev
//           </button>
//           <span>
//             Page {page} of {totalPages}
//           </span>
//           <button
//             disabled={page === totalPages}
//             onClick={() => {
//               if (page < totalPages) setpage(page + 1);
//             }}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { getAllPosts } from "../services/posts";

export default function Post() {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPosts = async () => {
    try {
      const data = await getAllPosts(page, 10);
      setPosts(data.data || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          All Posts
        </h1>

        <div className="space-y-6">
          {posts?.length > 0 ? (
            posts.map((post: any, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-shadow duration-200"
              >
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                  {post?.title}
                </h3>
                <p className="text-gray-600 mb-3">{post?.content}</p>

                {post?.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map((tag: string, i: number) => (
                      <span
                        key={i}
                        className="bg-blue-100 text-blue-700 text-sm font-medium px-2 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {post?.imageURL && (
                  <img
                    src={post.imageURL}
                    alt={post?.title}
                    className="w-full h-64 object-cover rounded-xl mt-3"
                  />
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No posts available.</p>
          )}
        </div>

        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className={`px-4 py-2 rounded-lg text-white font-medium ${
              page === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Prev
          </button>

          <span className="text-gray-700 font-medium">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            className={`px-4 py-2 rounded-lg text-white font-medium ${
              page === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
