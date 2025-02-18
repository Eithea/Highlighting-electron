import React, { useState, useRef, useCallback } from "react";

import useResult from "../hooks/useResult";
import useRoute from "../hooks/useRoute";
import Header from "../components/Header/Header";
import { GiPlayButton } from "react-icons/gi";
import "./Home.scss";

const Home = () => {
  const inputValue = document.getElementById("link");
  const urlInput = useRef();

  const { logged, onLogout } = useResult();
  const { url, setUrl } = useResult();
  const { requestResult } = useRoute();
  const [active0, setActive0] = useState(true);
  const [active1, setActive1] = useState(false);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);

  const onChangeUrl = useCallback((e) => {
    const value = e.target.value;
    console.log(value);
    setUrl(value);
  });

  function linkCheck() {
    console.log(url);
    if (!url) {
      alert("빈 값입니다. 입력창에 유튜브 주소를 입력해 주세요.");
      focusUrl();
      return;
    }
    else {
      const isYT = url.substr(0, 32) === "https://www.youtube.com/watch?v=";
      const isTW = url.substr(0, 29) === "https://www.twitch.tv/videos/";

      if (isYT) {
        requestResult(url.substr(0, 43));
        setUrl(url.substr(0, 43));
        return;
      }
      if (isTW) {
        requestResult(url.substr(0, 39));
        setUrl(url.substr(0, 39));       
        return;
      }
      alert("올바른 주소가 아닙니다. 유튜브, 트위치 다시보기 링크를 입력해 주세요.");
      focusUrl();
    }
  }

  function focusUrl() {
    if (inputValue === null) return;
    inputValue.value = "";
    urlInput.current.focus();
  }

  const onClickGuide = (e) => {
    const id = e.target.id;
    switch (id) {
      case "zero":
        activeZero();
        break;
      case "first":
        activeFirst();
        break;
      case "second":
        activeSecond();
        break;
      case "third":
        activeThird();
        break;
      default:
    }
  };

  const viewChange = () => {
    document.getElementById("guidline").scrollIntoView({ behavior: "smooth" });
  };
  const activeZero = () => {
    setActive0(true);
    setActive1(false);
    setActive2(false);
    setActive3(false);
  };

  const activeFirst = () => {
    setActive0(false);
    setActive1(true);
    setActive2(false);
    setActive3(false);
  };

  const activeSecond = () => {
    setActive0(false);
    setActive1(false);
    setActive2(true);
    setActive3(false);
  };

  const activeThird = () => {
    setActive0(false);
    setActive1(false);
    setActive2(false);
    setActive3(true);
  };

  return (
    <div>
      <Header logged={logged} onLogout={onLogout} />
      <div className="HomeContainer">
        <div className="UpperContainer">
          <div className="upper_left_container">
            {/* 좌상단 소개 페이지 */}
            <div>
              <h1 className="HC1_heading anim">
                <img className="HC1-logo" src="Logo.png" alt="Logo" />
                HIGHLIGHTING
              </h1>
              <p className="HC1-p1">
                장면 <span className="point3">하나하나 넘기며 확인</span>하고,{" "}
                <br />
                시청자 반응은 어땠는지{" "}
                <span className="point3">채팅도 다시 체크</span>하고, <br />
                <span className="point2"> 불편하지 않았나요?</span>
              </p>
              <p className="HC1-p1">
                <span className="point1">하이라이팅(HIGHLIGHTING)</span>을
                써보세요! <br />
                방송의 <span className="point3">다시보기 링크</span>만 입력하면
                이용할 수 있습니다
              </p>
              <p className="HC1-p2">
                <span className="point2">
                  화면과 볼륨의 변화, 채팅 빈도, 키워드 출현, 후원 통계
                </span>{" "}
                등<br />
                길고 긴 방송 속에서 특별한 부분들을 찾는 기능들을 제공하고
                <br />
                <span className="point2">필요한 장면만 골라</span> 가져갈 수
                있어요
              </p>
              <p className="HC1-p3">
                {" "}
                하단 <span className="point1">가이드라인</span> 에서 사용법을
                알아보세요 :
                <span className="point2" onClick={viewChange}>
                  클릭!
                </span>
              </p>
              <p className="HC1-p4">
                Creating and Providing Services :{" "}
                <span className="point1">Team HIGHLIGHTING</span>
              </p>
            </div>
            {/* 좌상단 소개 페이지 */}
          </div>
          <div className="upper_right_container">
            {/* 우상단 URL 입력창 */}
            <div className="Home_urlInput">
            <h1> <img className="inputLogo" src="Logo.png" alt="Logo" onClick={linkCheck} /> </h1>
              <input
                className="InputBar"
                ref={urlInput}
                placeholder="다시보기 영상 URL을 입력해주세요"
                onChange={onChangeUrl}
                id="link"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    linkCheck();
                  }
                }}
              />
              <h3>
                ⚠ 채팅 내역이 존재하는{" "}
                <span className="point">다시보기 스트리밍 영상</span> 이 아니면
                분석이 불가능합니다.
              </h3>
              <button className="resultButton" onClick={linkCheck}>
                <span>분석 시작!</span>
              </button>
            </div>
            {/* 우상단 URL 입력창 */}
          </div>
        </div>

        <div className="LowerContainer">
          <div className="lower_left_container">
            {/* 좌하단 가이드라인 */}
            <div className="Home_introduction_heading_wrap">
              <h2 id="guidline"> 단계별 가이드라인 </h2>
            </div>
            <ul className="Home_list">
              <li className="Home_list-item">
                <div>
                  <p
                    className={
                      "Home_list-content" + " " + (active0 ? "is-active" : "")
                    }
                    id="zero"
                    onMouseEnter={onClickGuide}
                  >
                    0단계 - 홈페이지
                  </p>
                  <p
                    className={
                      "Home_list-sub" + " " + (active0 ? "sub-active" : "")
                    }
                  >
                    다시보기 영상 링크만으로 영상을 분석 후 편집에 도움이 되는
                    데이터들을 제공합니다.
                  </p>
                </div>
              </li>

              <li className="Home_list-item">
                <div className="Home_list-content-wrap">
                  <p
                    className={
                      "Home_list-content" + " " + (active1 ? "is-active" : "")
                    }
                    id="first"
                    onMouseEnter={onClickGuide}
                  >
                    1단계 - 키워드 검색 기능
                  </p>
                  <p
                    className={
                      "Home_list-sub" + " " + (active1 ? "sub-active" : "")
                    }
                  >
                    결과 페이지는 여러 기능을 포함하고 있습니다.(채울 내용 :
                    차트등의 결과페이지 이미지로 안내) 우선 키워드 검색 기능에
                    대해 알아봅시다.
                  </p>
                </div>
              </li>

              <li className="Home_list-item">
                <div className="Home_list-item-image"></div>
                <div className="Home_list-content-wrap">
                  <p
                    className={
                      "Home_list-content" + " " + (active2 ? "is-active" : "")
                    }
                    id="second"
                    onMouseEnter={onClickGuide}
                  >
                    2단계 - 북마크 기능 사용법
                  </p>
                  <p
                    className={
                      "Home_list-sub" + " " + (active2 ? "sub-active" : "")
                    }
                  >
                    내가 원하는 부분을 컷으로 보관할 수 있습니다.
                  </p>
                </div>
              </li>

              <li className="Home_list-item">
                <div className="Home_list-content-wrap">
                  <p
                    className={
                      "Home_list-content" + " " + (active3 ? "is-active" : "")
                    }
                    id="third"
                    onMouseEnter={onClickGuide}
                  >
                    3단계 - 익스텐션 기능
                  </p>
                  <p
                    className={
                      "Home_list-sub" + " " + (active3 ? "sub-active" : "")
                    }
                  >
                    저희 웹서비스는 익스텐션 기능또한 제공하고 있습니다.
                  </p>
                  <a className="UPscroll">
                    <br />
                    <br />
                    <br />
                    <span
                      className="point2"
                      onClick={() => {
                        document
                          .getElementById("Home")
                          .scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      상단
                    </span>
                    으로 돌아가기
                  </a>
                </div>
              </li>
            </ul>
            {/* 좌하단 가이드라인 */}
          </div>
          <div className="lower_right_container">
            {/* 우하단 내용 컨테이너 */}
            <div className="Home_GuidelineContainer" id="guideContainer">
              {active0 ? (
                <div className="GuideLine_content">
                  <h2>HIGHLIGHTING 사용방법</h2>
                  <div className="guide_content_box">
                    <img className="step0" src="Step0.png" alt = "step" />
                    <p className="guide_content_p1">
                      1.메인페이지 URL창에 유튜브 다시보기 URL을 입력한다.
                    </p>
                    <p className="guide_content_p2">2.결과보기 클릭!</p>
                  </div>
                  <div className="guide_button_box">
                    <GiPlayButton
                      className="previousButton"
                      onClick={() => {
                        activeThird();
                        viewChange();
                      }}
                    />{" "}
                    <GiPlayButton
                      className="nextButton"
                      onClick={() => {
                        activeFirst();
                        viewChange();
                      }}
                    />
                  </div>
                </div>
              ) : (
                ""
              )}
              {active1 ? (
                <div className="GuideLine_content">
                  <h2>키워드 검색 기능</h2>
                  <div className="guide_content_box">
                    <p className="guide_content_p1">내용 박스</p>
                  </div>
                  <div className="guide_button_box">
                    <GiPlayButton
                      className="previousButton"
                      onClick={() => {
                        activeZero();
                        viewChange();
                      }}
                    />{" "}
                    <GiPlayButton
                      className="nextButton"
                      onClick={() => {
                        activeSecond();
                        viewChange();
                      }}
                    />
                  </div>
                </div>
              ) : (
                ""
              )}
              {active2 ? (
                <div className="GuideLine_content">
                  <h2>북마크 기능</h2>
                  <div className="guide_content_box">
                    <p className="guide_content_p1"> 대충 북마크 내용 박스</p>
                  </div>
                  <div className="guide_button_box">
                    <GiPlayButton
                      className="previousButton"
                      onClick={() => {
                        activeFirst();
                        viewChange();
                      }}
                    />{" "}
                    <GiPlayButton
                      className="nextButton"
                      onClick={() => {
                        activeThird();
                        viewChange();
                      }}
                    />
                  </div>
                </div>
              ) : (
                ""
              )}
              {active3 ? (
                <div className="GuideLine_content">
                  <h2>HIGHLIGHTING - 크롬 익스텐션</h2>
                  <div className="guide_content_box">
                    <p className="guide_content_p1">대충 익스텐션 내용</p>
                  </div>
                  <div className="guide_button_box">
                    <GiPlayButton
                      className="previousButton"
                      onClick={activeSecond}
                    />{" "}
                    <GiPlayButton className="nextButton" onClick={activeZero} />
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            {/* 우하단 내용 컨테이너 */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;