import { useState } from "react";
import "./App.css";

const Filter = ({ onFilter }) => {
  return (
    <div className="filter">
      <p>Filter:</p>
      <select onChange={onFilter}>
        <option value="alphabetical">Alphabetical</option>
        <option value="views">Views</option>
        <option value="likes">Likes</option>
      </select>
    </div>
  );
};

const SearchInput = ({ videoList, setVideoList, onChange }) => {
  return <input type="text" onChange={onChange} />;
};

const LikeButton = ({ video, onLike }) => {
  return (
    <div>
      <button className={"liked-" + video.isLiked} onClick={onLike}>
        👍
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

    // If current filter is set to sort by likes, update Video List
    if (filteredByLikes) {
      setVideoList(videoList.sort((a, b) => b.likes - a.likes));
    }

    setVideoList(videoList.map((item) => item));
  };

  return (
    <div className="video">
      <p>{video.title}</p>
      <p>{video.views} views</p>
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

var filteredByLikes = false;

export default function FilterableVideoList() {
  class VideoClass {
    constructor(title, numofViews, numOfLikes) {
      this.title = title;
      this.id = uuidv4();
      this.views = numofViews;
      this.likes = numOfLikes;
      this.isLiked = false;
    }
  }

  function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }

  let video1 = new VideoClass("Top 10 Pokemon Catches of All Time", 48, 12);
  let video2 = new VideoClass(
    "Try Not To Laugh Challenge (GONE WRONG!)",
    623_523,
    623_523
  );
  let video3 = new VideoClass("Pause Challenge on Family", 500, 12);

  const [videoList, setVideoList] = useState([video1, video2, video3]);

  const filter = (event) => {
    switch (event.target.value) {
      case "alphabetical":
        setVideoList(videoList.sort((a, b) => a.title.localeCompare(b.title)));
        break;
      case "views":
        setVideoList(videoList.sort((a, b) => b.views - a.views));
        break;
      case "likes":
        setVideoList(videoList.sort((a, b) => b.likes - a.likes));
        break;
    }
    filteredByLikes = event.target.value === "likes" ? true : false;

    setVideoList(videoList.map((item) => item));
  };

  const [searchText, setSearchText] = useState("");
  const [visibleVideoList, setVisibleVideoList] = useState([]);
  // const foundVideos = filterVideos(videos, searchText);

  const search = (event) => {
    console.log(event.target.value);
    // setSearchText(newText);
  };

  return (
    <div className="filterable-video-list">
      <Filter onFilter={filter}></Filter>
      <br />
      <SearchInput
        videoList={videoList}
        setVideoList={setVideoList}
        onChange={search}
      />
      <br />
      <VideoList videoList={videoList} setVideoList={setVideoList}></VideoList>
    </div>
  );
}
