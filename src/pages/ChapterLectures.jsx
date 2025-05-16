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
      1: [
  { name: "DPP #1", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/835153668013576300.pdf" },
  { name: "DPP #2", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/381212617807938400.pdf" },
  { name: "DPP #3", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/329223029297522940.pdf" },
  { name: "DPP #4", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/678852496560783000.pdf" },
  { name: "DPP #5", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/63107337858534300.pdf" },
  { name: "DPP #6", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540/course_pdf/3129400773834954336531200.pdf" },
  { name: "DPP #7", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/238082511822435800.pdf" },
  { name: "DPP #8", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/824854236457198700.pdf" },
  { name: "DPP #9", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/80277616854577550.pdf" },
  { name: "DPP #10", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/703570703178416800.pdf" },
  { name: "DPP #11", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/208624261630370200.pdf" },
  { name: "DPP #12", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/706526584385632800.pdf" },
  { name: "DPP #13", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540/course_pdf/1822529290791847707045100.pdf" },
  { name: "DPP #14", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/884839899057485800.pdf" },
  { name: "DPP #15", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/196696848955207170.pdf" },
  { name: "DPP #16", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/863916778900802400.pdf" },
  { name: "DPP #17", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/416110119302752900.pdf" },
  { name: "DPP #18", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/604166130475383000.pdf" },
  { name: "DPP #19", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/219025147750256450.pdf" },
  { name: "DPP #20", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/475656270734817400.pdf" },
  { name: "DPP #21", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/94091378978015280.pdf" },
  { name: "DPP #22", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/336668950700609150.pdf" },
  { name: "Real numbers Lec -1", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540/course_pdf/6230635122537064325240740.pdf" },
  { name: "Real Numbers Lec-2", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/135103066473446740.pdf" },
  { name: "Real Numbers Lec-3", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540/course_pdf/690919728011606794847700.pdf" },
  { name: "Doubt Class #1", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/790234280047601800.pdf" },
  { name: "Polynomials Lec - 1", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/290881990736756160.pdf" },
  { name: "Polynomials Lec -2", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/731613206030621300.pdf" },
  { name: "Polynomials Lec-3", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/78725336893875760.pdf" },
  { name: "Polynomials Lec-4", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/597321843357252000.pdf" },
  { name: "Pair of Linear equations L1", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/845888074171907600.pdf" },
  { name: "Pair of Linear equations L2", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/625760234282012200.pdf" },
  { name: "Pair of Linear equations in 2 Var L3", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/544596013533881200.pdf" },
  { name: "Pair of Linear equations Lec-4", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/97799956365074940.pdf" },
  { name: "Pair of Linear equations Lec-5", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/486560734477693200.pdf" },
  { name: "Quadratic equation Lec-1", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/329011771486915500.pdf" },
  { name: "Quatratic Equation Lec-2", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/393977804442221500.pdf" },
  { name: "Quadratic equation Lec-3", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/216803358346372640.pdf" },
  { name: "Quadratic Equation Lec-4", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/393415283543932540.pdf" },
  { name: "Quadratic Equations LEC -5", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/93583526450562720.pdf" },
  { name: "Quadratic Equation L-6", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/252697913981793630.pdf" },
  { name: "Triangles L1", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/623255636232658000.pdf" },
  { name: "Triangles Lec-2", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/648705782383389600.pdf" },
  { name: "Triangles Lec-3", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/162042040158885250.pdf" },
  { name: "Triangles Lec -4", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/568036343387820500.pdf" },
  { name: "Triangles -5", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/798524544013263900.pdf" },
  { name: "Triangles lec-6", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/103096393506383620.pdf" },
  { name: "Trigonometry L1", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/4362477226461148.pdf" },
  { name: "Trigonometry L2", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540/course_pdf/7271462221742069344368480.pdf" },
  { name: "Trigonometry L3", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/861008178055158100.pdf" },
  { name: "Trigonometry L4", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/450501175274632300.pdf" },
  { name: "Trigonometry L6", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/175936271789777180.pdf" },
  { name: "Trigonometry L5", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/122926094615589920.pdf" },
  { name: "Trigonometry L7", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540/course_pdf/5586561660855814408264800.pdf" },
  { name: "Trigonometry L8", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/364008081090451800.pdf" },
  { name: "Trigonometry L9", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/819686080059700400.pdf" },
  { name: "Trigonometry L10", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/431750639421205760.pdf" },
  { name: "Trigonometry L11", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/239673018623187400.pdf" },
  { name: "Trigonometry L12", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/975154679924461.pdf" },
  { name: "Some applications of trigno 1", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/512926501736074900.pdf" },
  { name: "Some applications of trigno 2", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/611427423414864100.pdf" },
  { name: "Some applications of trigno 3", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/873331498872368500.pdf" },
  { name: "AP Lecture 1", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/691255944417134200.pdf" },
  { name: "AP Lecture 2", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/521867257207995500.pdf" },
  { name: "AP lecture 3", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/762607086944557300.pdf" },
  { name: "AP lecture 4", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/583316739505975900.pdf" },
  { name: "AP lecture 5", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/807796521436509400.pdf" },
  { name: "AP lecture 6", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/787441533413798800.pdf" },
  { name: "Coordinate Geometry -1", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/224169593634472930.pdf" },
  { name: "Coordinate Geometry -2", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/369471802807785860.pdf" },
  { name: "Coordinate Geometry -3", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/38119925274719570.pdf" },
  { name: "Coordinate geometry-4", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/100683109742101940.pdf" },
  { name: "Coordinate geometry-5", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/717126006237391600.pdf" },
  { name: "Revision Triangles 1", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/649343919790321500.pdf" },
  { name: "Revision Triangles 2", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/236240495358860830.pdf" },
  { name: "Revision Triangles 3", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540/course_pdf/7539682845200152696543700.pdf" },
  { name: "Revision Pair of Lin EQ in 2 Variable -1", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/717483559620722600.pdf" },
  { name: "Revision Pair of Lin EQ in 2 Variable -2", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/247209010049102370.pdf" },
  { name: "Revision Pair of Lin EQ in 2 Variable -3", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/803490408055500700.pdf" },
  { name: "Half yearly Rev Quad Eq-1", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/261604684923940960.pdf" },
  { name: "Half yearly Rev Quad Eq-2", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/184830469946913820.pdf" },
  { name: "Half Yearly Revision Polynomials", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/9450476571404098.pdf" },
  { name: "Half Yearly Revision Real Numbers", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/192240876121614880.pdf" },
  { name: "Circles lecture 1", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/11369366272154546.pdf" },
  { name: "Circles Lecture 2", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/377403691742728900.pdf" },
  { name: "Circles Lecture 3", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/436095432456412900.pdf" },
  { name: "Circles|Lecture 4", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/751449086239369200.pdf" },
  { name: "Area Related to circle 1", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/547119871881596100.pdf" },
  { name: "Area related to circles 2", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/148027105869355200.pdf" },
  { name: "Area Related to Circles 3", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/168687237586328800.pdf" },
  { name: "Area Related to Circle 4", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/161890699284516130.pdf" },
  { name: "Surface are and Volume 2", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/401146922456167740.pdf" },
  { name: "Surface Area and Volume 3", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/325266053793366700.pdf" },
  { name: "Surface area and volume 4", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/300110822767090500.pdf" },
  { name: "Statistics - 1", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/183254743766069220.pdf" },
  { name: "Statistics - 2", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/577608819872976500.pdf" },
  { name: "Statistics - 3", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/100042547533631360.pdf" },
  { name: "Probability - 2", redirect: "https://d3cx6qbbd4cbso.cloudfront.net/540admin_v1/file_manager/pdf/701525411240676600.pdf" }
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
