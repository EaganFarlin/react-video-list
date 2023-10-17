import { useState } from "react";
import "./App.css";

const Sorter = () => {};

const Filter = ({ videoList, onFilter }) => {
  console.log(videoList);
  console.log(onFilter);

  return (
    <div className="filter">
      <button onClick={onFilter}>
        {videoList.map((video) => {
          return video.title + ", ";
        })}
      </button>
    </div>
  );
};

const LikeButton = ({ video }) => {
  const [numOfLikes, setNumOfLikes] = useState(video.likes);
  const [isLiked, setIsLiked] = useState(false);

  function handleLikeButtonClick() {
    if (isLiked === true) {
      setNumOfLikes(numOfLikes - 1);
    } else {
      setNumOfLikes(numOfLikes + 1);
    }
    setIsLiked(!isLiked);
  }

  return (
    <div>
      <button className={"liked-" + isLiked} onClick={handleLikeButtonClick}>
        👍
      </button>
      <p>{numOfLikes + " likes"}</p>
    </div>
  );
};

const Video = ({ video }) => {
  return (
    <div className="video">
      <p>{video.title}</p>
      <p>{video.views} views</p>
      <LikeButton video={video} />
    </div>
  );
};

let videoindex = 0;

function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

export default function VideoList() {
  class VideoClass {
    constructor(title, numofViews, numOfLikes) {
      this.title = title;
      this.id = uuidv4();
      this.views = numofViews;
      this.likes = numOfLikes;
    }
  }

  let video1 = new VideoClass("Top 10 Pokemon Catches of All Time", 48, 5);
  let video2 = new VideoClass(
    "Try Not To Laugh Challenge (WENT WRONG!)",
    623_523,
    623_523
  );
  let video3 = new VideoClass("APause Challenge on Family", 500, 32);

  const [videoList, setVideoList] = useState([video1, video2, video3]);

  function sortByAlphabeticOrder() {
    console.log("TEST");
    setVideoList(videoList.sort((a, b) => a.title.localeCompare(b.title)));
    console.log(videoList);
  }

  return (
    <div className="videoList">
      <Filter
        videoList={videoList}
        onFilter={() => sortByAlphabeticOrder()}
      ></Filter>
      <div className="video-list">
        {videoList.map((video) => (
          <Video key={video.id} video={video} videoList={videoList} />
        ))}
      </div>
    </div>
  );
}
