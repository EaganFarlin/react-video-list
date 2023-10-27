import { useState } from "react";
import "./App.css";

const VideoUpload = ({ handleUpload }) => {
  return (
    <div className="video-upload">
      <p>Upload</p>

      <form onSubmit={handleUpload}>
        <label htmlFor="title">Title:</label>
        <br />
        <input id="title" type="text" />
        <input type="submit" value="Upload" />
      </form>
    </div>
  );
};

const SearchInput = ({ query, onChange }) => {
  return (
    <div className="search">
      <p>Search:</p>
      <input value={query} type="search" onChange={onChange} />
    </div>
  );
};

const Sorter = ({ handleSort }) => {
  return (
    <div className="sorter">
      <p>Sort by</p>
      <select onChange={handleSort}>
        <option value="recent">Recent</option>
        <option value="alphabetical">Alphabetical</option>
        <option value="views">Views</option>
        <option value="likes">Likes</option>
      </select>
    </div>
  );
};

const LikeButton = ({ video, onLike }) => {
  return (
    <div className="video-disp-like">
      <button className={"like-btn liked-" + video.isLiked} onClick={onLike}>
        <span>👍</span>
      </button>
      <p>{video.likes + " likes"}</p>
    </div>
  );
};

const Video = ({ videoList, setVideoList, video }) => {
  const handleLikeButtonClick = () => {
    video.isLiked = !video.isLiked;
    if (video.isLiked === true) {
      video.likes++;
    } else {
      video.likes--;
    }

    // If current sorter is set to sort by likes, update Video List
    if (isSortedByLikes) {
      setVideoList(videoList.sort((a, b) => b.likes - a.likes));
    }

    setVideoList(videoList.map((item) => item));
  };

  return (
    <div className="video">
      <p className="video-disp-title">{video.title}</p>
      <p className="video-disp-views">{video.views} views</p>
      <LikeButton
        videoList={videoList}
        video={video}
        onLike={handleLikeButtonClick}
      />
    </div>
  );
};

const VideoList = ({ videoList, setVideoList }) => {
  return (
    <div className="video-list">
      {videoList.map((video) => (
        <Video
          key={video.id}
          videoList={videoList}
          setVideoList={setVideoList}
          video={video}
        />
      ))}
    </div>
  );
};

var isSortedByLikes = false;
var currentVideoId = 0;

export default function FilterableVideoList() {
  class VideoClass {
    constructor(title) {
      this.title = title;
      this.id = currentVideoId;
      this.views = Math.floor(Math.random() * 101);
      this.likes = Math.floor(this.views * (Math.random() * Math.random()));
      this.isLiked = false;
    }
  }

  const uuidv4 = () => {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  };

  const [videoList, setVideoList] = useState([]);
  const [query, setQuery] = useState("");

  const handleUpload = (e) => {
    e.preventDefault();
    if (e.currentTarget.title.value.length === 0) {
      alert("Please enter a title name");
      return;
    }

    const value = new VideoClass(e.currentTarget.title.value.toString());
    setVideoList((prev) => {
      return [value, ...prev];
    });
    currentVideoId++;

    e.currentTarget.title.value = "";
  };

  const foundVideos = videoList.filter(
    (video) => {
      return video.title.toLowerCase().includes(query.toLowerCase());
    },
    [videoList, query]
  );

  const handleSort = (e) => {
    switch (e.target.value) {
      case "alphabetical":
        setVideoList(videoList.sort((a, b) => a.title.localeCompare(b.title)));
        break;
      case "views":
        setVideoList(videoList.sort((a, b) => b.views - a.views));
        break;
      case "likes":
        setVideoList(videoList.sort((a, b) => b.likes - a.likes));
        break;
      default:
        setVideoList(videoList.sort((a, b) => b.id - a.id));
        break;
    }
    isSortedByLikes = e.target.value === "likes" ? true : false;

    setVideoList(videoList.map((item) => item));
  };

  return (
    <div className="filterable-video-list">
      <br />
      <VideoUpload handleUpload={handleUpload} />
      <br />
      <SearchInput
        videoList={videoList}
        setVideoList={setVideoList}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Sorter handleSort={handleSort} />
      <br />
      <VideoList videoList={foundVideos} setVideoList={setVideoList} />
    </div>
  );
}
