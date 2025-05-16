import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../styles/ChapterLectures.css";
import mlogo from "../assets/ntmlogo.jpg"; // ✅ Import logo

const ChapterLectures = () => {
  const { subject, chapterIndex } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  const chapterLectures = {
    Notice: {
      0: [
        {
          name: "Introduction Video",
          m3u8Url: "https://d3cx6qbbd4cbso.cloudfront.net/file_library/videos/vod_non_drm_ios/4312904/1740491033_1089325762901906/sunny/1740490966781_94603654451027820_video_VOD.m3u8",
          notesUrl: ""
        },
      ],
    },
    Science: {
      0: [
        {
          name: "Lecture 1 (nhi hua batch shuru)",
          m3u8Url: "m3u8_link_here",
          notesUrl: ""
        },
        {
          name: "Lecture 2",
          m3u8Url: "YOUR_M3U8_LINK_HERE",
          notesUrl: ""
        },
      ],
      1: [
        {
          name: "Lecture 1",
          m3u8Url: "YOUR_M3U8_LINK_HERE",
          notesUrl: ""
        },
      ],
    },
    Maths: {
      0:

[
  { name: "Real Numbers | Lecture 1", youtubeUrl: "https://www.youtube.com/watch?v=6yYg64NzEK4" },
  { name: "Real Numbers | Lecture 2", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17129371342512649384/17129371342512649384_649384.m3u8" },
  { name: "Real Numbers | Lecture 3", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17132822008732649384/17132822008732649384_649384.m3u8" },
  { name: "DPP Solving and Doubt Class", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17133693708701649384/17133693708701649384_649384.m3u8" },
  { name: "Polynomials | Lecture 1", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17134551697755649384/17134551697755649384_649384.m3u8" },
  { name: "Polynomials | Lecture 2", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17135415282903649384/17135415282903649384_649384.m3u8" },
  { name: "Polynomials | Lecture 3", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17138871113253649384/17138871113253649384_649384.m3u8" },
  { name: "Polynomials | Lecture 4", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17139725638892649384/17139725638892649384_649384.m3u8" },
  { name: "DPP Solving cum Doubt Class", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17140595503381649384/17140595503381649384_649384.m3u8" },
  { name: "Pair Of Linear Eq in 2 Variables | Lecture 1", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17141460536824649384/17141460536824649384_649384.m3u8" },
  { name: "Pair Of Linear Eq in 2 Variables | Lecture 2", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17144928065342649384/17144928065342649384_649384.m3u8" },
  { name: "Pair Of Linear Eq in 2 Variables | Lecture 3", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17145783022534649384/17145783022534649384_649384.m3u8" },
  { name: "Pair Of Linear Eq in 2 Variables | Lecture 4", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17146657352563649384/17146657352563649384_649384.m3u8" },
  { name: "Pair Of Linear Eq in 2 Variables | Lecture 5", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17147519235900649384/17147519235900649384_649384.m3u8" },
  { name: "DPP Solving cum Doubt Class", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17150966356342649384/17150966356342649384_649384.m3u8" },
  { name: "Quadratic Equations | Lecture 1", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17151832999338649384/17151832999338649384_649384.m3u8" },
  { name: "Quadratic Equations | Lecture 2", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17152700065912649384/17152700065912649384_649384.m3u8" },
  { name: "Quadratic Equations | Lecture 3", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17153550861285649384/17153550861285649384_649384.m3u8" },
  { name: "DPP Solving cum Doubt Class", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17157012188479649384/17157012188479649384_649384.m3u8" },
  { name: "Quadratic Equations | Lecture 4", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17157871003077649384/17157871003077649384_649384.m3u8" },
  { name: "Quadratic Equations | Lecture 5", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17159600766765649384/17159600766765649384_649384.m3u8" },
  { name: "Quadratic Equation Lec-6", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17163052395820649384/17163052395820649384_649384.m3u8" },
  { name: "Doubt Class", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17163929069468649384/17163929069468649384_649384.m3u8" },
  { name: "Triangles | Lecture 1", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17164785434246649384/17164785434246649384_649384.m3u8" },
  { name: "Triangles | Lecture 2", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17165655241554649384/17165655241554649384_649384.m3u8" },
  { name: "Triangles | Lecture 3", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17169117839592649384/17169117839592649384_649384.m3u8" },
  { name: "Triangles | Lecture 4", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17169977277309649384/17169977277309649384_649384.m3u8" },
  { name: "Triangles | Lecture 5", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17170838739405649384/17170838739405649384_649384.m3u8" },
  { name: "Triangles | Lecture 6", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17183787982575649384/17183787982575649384_649384.m3u8" },
  { name: "Trigonometry | Lecture 1", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17184653924894649384/17184653924894649384_649384.m3u8" },
  { name: "Trigonometry | Lecture 2", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17185521872754649384/17185521872754649384_649384.m3u8" },
  { name: "Trigonometry | Lecture 3", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17187266273378649384/17187266273378649384_649384.m3u8" },
  { name: "Trigonometry | Lecture 4", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17188114594487649384/17188114594487649384_649384.m3u8" },
  { name: "Trigonometry | Lecture 5", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17188979608589649384/17188979608589649384_649384.m3u8" },
  { name: "Trigonometry | Lecture 6", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17189844558492649384/17189844558492649384_649384.m3u8" },
  { name: "Trigonometry | Lecture 7", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17199337187487649384/17199337187487649384_649384.m3u8" },
  { name: "Recap Class", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17201072148079649384/17201072148079649384_649384.m3u8" },
  { name: "Trigonometry | Lecture 8", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17201945531728649384/17201945531728649384_649384.m3u8" },
  { name: "Trigonometry | Lecture 9", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17205408742212649384/17205408742212649384_649384.m3u8" },
  { name: "Trigonometry | Lecture 10", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17206261232662649384/17206261232662649384_649384.m3u8" },
  { name: "Trigonometry | Lecture 11", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17207123403150649384/17207123403150649384_649384.m3u8" },
  { name: "Trigonometry | Lecture 12", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17207985627832649384/17207985627832649384_649384.m3u8" },
  { name: "Doubt Solving Class", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17211459917785649384/17211459917785649384_649384.m3u8" },
  { name: "Some Applications of Trigonometry -1", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17212322626813649384/17212322626813649384_649384.m3u8" },
  { name: "Some Applications of Trigonometry - 2", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17213178213821649384/17213178213821649384_649384.m3u8" },
  { name: "Some Applications of Trigonometry - 3", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17214040194493649384/17214040194493649384_649384.m3u8" },
  { name: "Doubt Solving Class", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17217495494378649384/17217495494378649384_649384.m3u8" },
  { name: "AP 1", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17218362553868649384/17218362553868649384_649384.m3u8" },
  { name: "AP 2", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17219230998502649384/17219230998502649384_649384.m3u8" },
  { name: "AP 3", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17220087841342649384/17220087841342649384_649384.m3u8" },
  { name: "AP 4", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17220948007035649384/17220948007035649384_649384.m3u8" },
  { name: "AP 5", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17221820786502649384/17221820786502649384_649384.m3u8" },
  { name: "AP-6", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17232177413648649384/17232177413648649384_649384.m3u8" },
  { name: "Doubt Class + Coordinate Geometry 1", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17233045919559649384/17233045919559649384_649384.m3u8" },
  { name: "Coordinate Geometry | Lecture 2", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17233925378345649384/17233925378345649384_649384.m3u8" },
  { name: "Coordinate Geometry | Lecture 3", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17235632149748649384/17235632149748649384_649384.m3u8" },
  { name: "Coordinate Geometry | Lecture 4", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17236484366039649384/17236484366039649384_649384.m3u8" },
  { name: "Coordinate Geometry | Lecture 5", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17237360518467649384/17237360518467649384_649384.m3u8" },
  { name: "Doubt Solving class", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17238223313872649384/17238223313872649384_649384.m3u8" },
  { name: "DPP 15-18 Discussion", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17241697415906649384/17241697415906649384_649384.m3u8" },
  { name: "Half Yearly Revision | Triangles 1", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17242547994359649384/17242547994359649384_649384.m3u8" },
  { name: "Half Yearly Revision | Triangles 2", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17244274567171649384/17244274567171649384_649384.m3u8" },
  { name: "Half Yearly Revision | Triangles 3", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17247722436004649384/17247722436004649384_649384.m3u8" },
  { name: "Half Yearly Revision | Triangles 4", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17248593366655649384/17248593366655649384_649384.m3u8" },
  { name: "Half Yearly Revision | Pair Of Linear Eq 1", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17250319205142649384/17250319205142649384_649384.m3u8" },
  { name: "Half Yearly Revision | Pair Of Linear Eq 2", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17253766884728649384/17253766884728649384_649384.m3u8" },
  { name: "Half Yearly Revision | Pair Of Linear Eq 3", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17254641166348649384/17254641166348649384_649384.m3u8" },
  { name: "Half Yearly Revision | Quadratic Eq 1", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17256365147619649384/17256365147619649384_649384.m3u8" },
  { name: "Half Yearly Revision | Quadratic Eq 2", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17259823471606649384/17259823471606649384_649384.m3u8" },
  { name: "Half Yearly Revision | Real Number Important Questions", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17260692492874649384/17260692492874649384_649384.m3u8" },
  { name: "Half Yearly Revision | Polynomials Important Questions", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17265878073193649384/17265878073193649384_649384.m3u8" },
  { name: "Circles | Lecture 1", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17266735317556649384/17266735317556649384_649384.m3u8" },
  { name: "Circles | Lecture 2", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17267604948096649384/17267604948096649384_649384.m3u8" },
  { name: "Circle|Lecture 3", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/17268452417301649384/17268452417301649384_649384.m3u8" },
  { name: "Circles | Lecture 4", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/172736464482251815381/172736464482251815381_815381.m3u8" },
  { name: "Area Related to Circles | Lecture 1", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/172745146062961815381/172745146062961815381_815381.m3u8" },
  { name: "Area Related to Circles | Lecture 2", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/172770146155001815381/172770146155001815381_815381.m3u8" },
  { name: "Area Related to Circles | Lecture 3", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/172779782424231815381/172779782424231815381_815381.m3u8" },
  { name: "Area Related to Circles | Lecture 4", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/1727794800/1727794800_794800.m3u8" },
  { name: "NCERT and DPPs discussion |Surface Area and Volume | Lecture 1", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/1727800200/1727800200_800200.m3u8" },
  { name: "Surface Area and Volume | Lecture 2", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/172840157790441815381/172840157790441815381_815381.m3u8" },
  { name: "Surface Area and Volume | Lecture 3", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/172857459049321815381/172857459049321815381_815381.m3u8" },
  { name: "Surface Area and Volume | Lecture 4", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/172866101963571815381/172866101963571815381_815381.m3u8" },
  { name: "Statistics | Lecture 1", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/172900628539191815381/172900628539191815381_815381.m3u8" },
  { name: "Statistics | Lecture 2", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/172918054741191815381/172918054741191815381_815381.m3u8" },
  { name: "Statistics | Lecture 3", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/172926652637711815381/172926652637711815381_815381.m3u8" },
  { name: "Doubt Solving Class", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/172961122145341815381/172961122145341815381_815381.m3u8" },
  { name: "Probability | Lecture 1", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/172969790150071815381/172969790150071815381_815381.m3u8" },
  { name: "Probability | Lecture 2 ~ Official Last Class", m3u8Url: "https://d1qcficr3lu37x.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/172978423973451815381/172978423973451815381_815381.m3u8" }
],
    },
  };

  const handleLectureClick = (lecture) => {
    if (lecture.youtubeUrl) {
      window.location.href = lecture.youtubeUrl;
    }
  };

  return (
    <div className="chapter-lectures-container">
      <img src={mlogo} alt="Logo" className="big-logo" />
      <h2>{subject} - Chapter {parseInt(chapterIndex) + 1}</h2>
      <div className="lecture-boxes">
        {chapterLectures[subject]?.[chapterIndex]?.map((lecture, index) => {
          if (lecture.redirect) {
            return (
              <div
                key={index}
                onClick={() => window.location.href = lecture.redirect}
                className="lecture-box"
                style={{ cursor: "pointer" }}
              >
                {lecture.name} (PDF)
              </div>
            );
          } else if (lecture.youtubeUrl) {
            return (
              <div
                key={index}
                onClick={() => handleLectureClick(lecture)}
                className="lecture-box"
                style={{ cursor: "pointer" }}
              >
                {lecture.name} (YouTube)
              </div>
            );
          } else if (lecture.m3u8Url) {
            return (
              <Link
                key={index}
                to={`/video/${subject}/${chapterIndex}`}
                state={{
                  chapterName: lecture.name,
                  m3u8Url: lecture.m3u8Url,
                  notesUrl: lecture.notesUrl,
                }}
                className="lecture-box"
                onClick={() => {
              // Store chapter name and index in localStorage for later use
              localStorage.setItem("lectureName", lecture.name);  // Store chapter name
            }}
              >
                {lecture.name}
              </Link>
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default ChapterLectures;
